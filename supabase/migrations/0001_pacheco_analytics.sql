-- ============================================================
-- Dashboard first-party do site Pacheco Solar (/dashboard)
-- Projeto Supabase compartilhado da M|P (khipnjfbxjgvmjvyxero): tudo aqui
-- começa com pacheco_. Idempotente: pode rodar de novo sem perder dados.
--
-- Privacidade: nenhuma linha guarda IP, cookie, nome ou user-agent cru.
-- O id da sessão é aleatório e vive só na aba do visitante; o visitor_id é
-- um código aleatório no localStorage (13 meses) e não existe para quem
-- escolheu "Só o essencial" no banner.
--
-- Acesso: RLS ligado sem policies → anon/authenticated não leem nem escrevem.
-- O site grava (/api/collect) e lê (/dashboard) com a service role.
-- ============================================================

create extension if not exists pgcrypto;

-- ---------- Sessões (1 linha por aba/visita) ----------
create table if not exists public.pacheco_sessions (
  id             uuid primary key,
  visitor_id     uuid,
  is_returning   boolean not null default false,
  started_at     timestamptz not null default now(),
  last_seen_at   timestamptz not null default now(),
  landing_path   text not null,
  referrer_host  text,
  channel        text not null check (channel in
                   ('google_ads','meta_ads','google_organic','other_search','social','referral','direct')),
  utm_source     text,
  utm_medium     text,
  utm_campaign   text,
  utm_term       text,
  utm_content    text,
  has_gclid      boolean not null default false,
  device         text check (device in ('mobile','tablet','desktop')),
  browser        text,
  os             text,
  country        text,
  region         text,
  city           text,
  screen_w       smallint,
  screen_h       smallint,
  lang           text,
  page_views     integer not null default 0,
  events         integer not null default 0,
  converted      boolean not null default false,
  -- true quando a linha foi criada pelo fallback do coletor (eventos chegaram antes da sessão)
  is_skeleton    boolean not null default false
);
alter table public.pacheco_sessions add column if not exists is_skeleton boolean not null default false;

create index if not exists pacheco_sessions_started_idx on public.pacheco_sessions (started_at desc);
create index if not exists pacheco_sessions_channel_idx on public.pacheco_sessions (channel, started_at desc);
create index if not exists pacheco_sessions_geo_idx     on public.pacheco_sessions (region, city);
create index if not exists pacheco_sessions_visitor_idx on public.pacheco_sessions (visitor_id, started_at desc)
  where visitor_id is not null;

-- ---------- Eventos ----------
create table if not exists public.pacheco_events (
  id          bigint generated always as identity primary key,
  session_id  uuid not null references public.pacheco_sessions (id) on delete cascade,
  ts          timestamptz not null default now(),
  name        text not null,
  path        text not null,
  title       text,
  params      jsonb not null default '{}'::jsonb
);

create index if not exists pacheco_events_ts_idx      on public.pacheco_events (ts desc);
create index if not exists pacheco_events_name_ts_idx on public.pacheco_events (name, ts desc);
create index if not exists pacheco_events_session_idx on public.pacheco_events (session_id, ts);
create index if not exists pacheco_events_path_idx    on public.pacheco_events (path, ts desc);
create index if not exists pacheco_events_params_idx  on public.pacheco_events using gin (params jsonb_path_ops);

-- ---------- Triggers ----------
create or replace function public.pacheco_bump_session()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  update public.pacheco_sessions
     set last_seen_at = greatest(last_seen_at, new.ts),
         page_views   = page_views + (new.name = 'page_view')::int,
         events       = events + 1,
         converted    = converted or new.name in ('click_whatsapp', 'click_phone')
   where id = new.session_id;
  return new;
end;
$$;
drop trigger if exists pacheco_events_bump on public.pacheco_events;
create trigger pacheco_events_bump after insert on public.pacheco_events
  for each row execute function public.pacheco_bump_session();

-- Teto de eventos por sessão (abuso): acima disso o insert é ignorado em silêncio
create or replace function public.pacheco_cap_events()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if (select events from public.pacheco_sessions where id = new.session_id) >= 2000 then
    return null;
  end if;
  return new;
end;
$$;
drop trigger if exists pacheco_events_cap on public.pacheco_events;
create trigger pacheco_events_cap before insert on public.pacheco_events
  for each row execute function public.pacheco_cap_events();

create or replace function public.pacheco_mark_returning()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.visitor_id is not null then
    new.is_returning := exists (
      select 1 from public.pacheco_sessions s where s.visitor_id = new.visitor_id and s.id <> new.id);
  end if;
  return new;
end;
$$;
drop trigger if exists pacheco_sessions_returning on public.pacheco_sessions;
create trigger pacheco_sessions_returning before insert on public.pacheco_sessions
  for each row execute function public.pacheco_mark_returning();

-- ---------- RLS: ninguém além da service role ----------
alter table public.pacheco_sessions enable row level security;
alter table public.pacheco_events   enable row level security;
revoke all on public.pacheco_sessions from public, anon, authenticated;
revoke all on public.pacheco_events   from public, anon, authenticated;

-- ============================================================
-- Funções de agregação (America/Sao_Paulo). p_channel = null → todas.
-- ============================================================

create or replace function public.pacheco_kpis(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (sessions bigint, page_views bigint, avg_session_ms numeric, avg_page_ms numeric,
               wa_clicks bigint, phone_clicks bigint, wa_sessions bigint, conv_rate numeric)
language sql stable security invoker set search_path = public as $$
  with s as (
    select * from pacheco_sessions
    where started_at >= p_from and started_at < p_to and (p_channel is null or channel = p_channel)),
  ev as (select e.* from pacheco_events e join s on s.id = e.session_id),
  agg as (
    select
      (select count(*) from s) as sessions,
      (select count(*) from ev where name = 'page_view') as page_views,
      (select coalesce(round(avg(extract(epoch from (last_seen_at - started_at)) * 1000)), 0) from s) as avg_session_ms,
      (select coalesce(round(avg((params->>'duration_ms')::numeric)), 0) from ev
        where name = 'page_leave' and (params->>'duration_ms') ~ '^[0-9]{1,9}$') as avg_page_ms,
      (select count(*) from ev where name = 'click_whatsapp') as wa_clicks,
      (select count(*) from ev where name = 'click_phone') as phone_clicks,
      (select count(distinct session_id) from ev where name = 'click_whatsapp') as wa_sessions)
  select sessions, page_views, avg_session_ms, avg_page_ms, wa_clicks, phone_clicks, wa_sessions,
         case when sessions = 0 then 0 else round(wa_sessions::numeric / sessions * 100, 1) end
  from agg;
$$;

create or replace function public.pacheco_daily(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (day date, sessions bigint, page_views bigint, wa_clicks bigint)
language sql stable security invoker set search_path = public as $$
  with days as (
    select generate_series((p_from at time zone 'America/Sao_Paulo')::date,
      ((p_to - interval '1 second') at time zone 'America/Sao_Paulo')::date, interval '1 day')::date as day),
  s as (
    select id, (started_at at time zone 'America/Sao_Paulo')::date as day from pacheco_sessions
    where started_at >= p_from and started_at < p_to and (p_channel is null or channel = p_channel)),
  ev as (
    select e.name, (e.ts at time zone 'America/Sao_Paulo')::date as day
    from pacheco_events e join s on s.id = e.session_id where e.name in ('page_view', 'click_whatsapp'))
  select d.day,
         (select count(*) from s where s.day = d.day),
         (select count(*) from ev where ev.day = d.day and ev.name = 'page_view'),
         (select count(*) from ev where ev.day = d.day and ev.name = 'click_whatsapp')
  from days d order by d.day;
$$;

create or replace function public.pacheco_heatmap(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (dow smallint, hour smallint, sessions bigint)
language sql stable security invoker set search_path = public as $$
  select extract(dow from (started_at at time zone 'America/Sao_Paulo'))::smallint,
         extract(hour from (started_at at time zone 'America/Sao_Paulo'))::smallint, count(*)
  from pacheco_sessions
  where started_at >= p_from and started_at < p_to and (p_channel is null or channel = p_channel)
  group by 1, 2 order by 1, 2;
$$;

create or replace function public.pacheco_by_channel(p_from timestamptz, p_to timestamptz)
returns table (channel text, sessions bigint, wa_clicks bigint)
language sql stable security invoker set search_path = public as $$
  select s.channel, count(distinct s.id), count(e.id)
  from pacheco_sessions s
  left join pacheco_events e on e.session_id = s.id and e.name = 'click_whatsapp'
  where s.started_at >= p_from and s.started_at < p_to
  group by s.channel order by 2 desc;
$$;

create or replace function public.pacheco_by_device(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (device text, sessions bigint)
language sql stable security invoker set search_path = public as $$
  select coalesce(device, 'desconhecido'), count(*) from pacheco_sessions
  where started_at >= p_from and started_at < p_to and (p_channel is null or channel = p_channel)
  group by 1 order by 2 desc;
$$;

create or replace function public.pacheco_top_pages(p_from timestamptz, p_to timestamptz, p_channel text default null, p_limit int default 20)
returns table (path text, title text, views bigint, avg_ms numeric, avg_scroll numeric)
language sql stable security invoker set search_path = public as $$
  with ev as (
    select e.* from pacheco_events e join pacheco_sessions s on s.id = e.session_id
    where e.ts >= p_from and e.ts < p_to and (p_channel is null or s.channel = p_channel)
      and e.name in ('page_view', 'page_leave')),
  v as (select path, max(title) as title, count(*) as views from ev where name = 'page_view' group by path),
  l as (select path, round(avg((params->>'duration_ms')::numeric)) as avg_ms,
               round(avg((params->>'max_scroll_pct')::numeric)) as avg_scroll
        from ev where name = 'page_leave'
          and (params->>'duration_ms') ~ '^[0-9]{1,9}$' and (params->>'max_scroll_pct') ~ '^[0-9]{1,3}$'
        group by path)
  select v.path, v.title, v.views, coalesce(l.avg_ms, 0), coalesce(l.avg_scroll, 0)
  from v left join l on l.path = v.path order by v.views desc limit p_limit;
$$;

create or replace function public.pacheco_geo(p_from timestamptz, p_to timestamptz, p_channel text default null, p_limit int default 30)
returns table (country text, region text, city text, sessions bigint, wa_clicks bigint)
language sql stable security invoker set search_path = public as $$
  select s.country, s.region, s.city, count(distinct s.id), count(e.id)
  from pacheco_sessions s
  left join pacheco_events e on e.session_id = s.id and e.name = 'click_whatsapp'
  where s.started_at >= p_from and s.started_at < p_to and (p_channel is null or s.channel = p_channel)
  group by s.country, s.region, s.city order by 4 desc limit p_limit;
$$;

-- Campanhas pagas (Google Ads e Meta Ads) identificadas pelo site
create or replace function public.pacheco_campaigns(p_from timestamptz, p_to timestamptz)
returns table (channel text, utm_campaign text, utm_term text, utm_content text,
               sessions bigint, wa_clicks bigint, conv_rate numeric)
language sql stable security invoker set search_path = public as $$
  with s as (
    select * from pacheco_sessions
    where started_at >= p_from and started_at < p_to and channel in ('google_ads', 'meta_ads'))
  select s.channel, s.utm_campaign, s.utm_term, s.utm_content,
         count(distinct s.id), count(e.id),
         round(count(distinct e.session_id)::numeric / nullif(count(distinct s.id), 0) * 100, 1)
  from s left join pacheco_events e on e.session_id = s.id and e.name = 'click_whatsapp'
  group by s.channel, s.utm_campaign, s.utm_term, s.utm_content order by 5 desc;
$$;

-- Botões de WhatsApp (cta_id · posição · linha) × origem da visita
create or replace function public.pacheco_buttons(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (kind text, cta_id text, posicao text, linha text, channel text, clicks bigint, sessions bigint)
language sql stable security invoker set search_path = public as $$
  select e.name, e.params->>'cta_id', e.params->>'posicao',
         case e.name when 'click_whatsapp' then e.params->>'linha' else e.params->>'phone' end,
         s.channel, count(*), count(distinct e.session_id)
  from pacheco_events e join pacheco_sessions s on s.id = e.session_id
  where e.name in ('click_whatsapp', 'click_phone', 'click_email')
    and e.ts >= p_from and e.ts < p_to and (p_channel is null or s.channel = p_channel)
  group by 1, 2, 3, 4, 5 order by 6 desc;
$$;

-- Cliques genéricos (qualquer link/botão), pelo nome do elemento
create or replace function public.pacheco_clicks(p_from timestamptz, p_to timestamptz, p_channel text default null, p_limit int default 30)
returns table (label text, tag text, href text, clicks bigint, sessions bigint)
language sql stable security invoker set search_path = public as $$
  select coalesce(e.params->>'track', e.params->>'text', e.params->>'href'), max(e.params->>'tag'),
         max(e.params->>'href'), count(*), count(distinct e.session_id)
  from pacheco_events e join pacheco_sessions s on s.id = e.session_id
  where e.name = 'click' and e.ts >= p_from and e.ts < p_to and (p_channel is null or s.channel = p_channel)
  group by 1 order by 4 desc limit p_limit;
$$;

-- Seções vistas (section_view) e profundidade de rolagem
create or replace function public.pacheco_sections(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (path text, section_id text, sessions bigint)
language sql stable security invoker set search_path = public as $$
  select e.path, e.params->>'section_id', count(distinct e.session_id)
  from pacheco_events e join pacheco_sessions s on s.id = e.session_id
  where e.name = 'section_view' and e.ts >= p_from and e.ts < p_to and (p_channel is null or s.channel = p_channel)
  group by 1, 2 order by 3 desc;
$$;

-- Funil: visitou → rolou metade → clicou no WhatsApp
create or replace function public.pacheco_funnel(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (step text, sessions bigint)
language sql stable security invoker set search_path = public as $$
  with s as (
    select id from pacheco_sessions
    where started_at >= p_from and started_at < p_to and (p_channel is null or channel = p_channel))
  select 'page_view'::text, count(*) from s
  union all
  select 'scroll_50'::text, count(distinct e.session_id) from pacheco_events e join s on s.id = e.session_id where e.name = 'scroll_50'
  union all
  select 'click_whatsapp'::text, count(distinct e.session_id) from pacheco_events e join s on s.id = e.session_id where e.name = 'click_whatsapp';
$$;

create or replace function public.pacheco_journeys(p_from timestamptz, p_to timestamptz, p_channel text default null,
  p_only_converted boolean default true, p_limit int default 50)
returns table (id uuid, started_at timestamptz, last_seen_at timestamptz, channel text,
  utm_campaign text, utm_term text, device text, browser text, os text, region text, city text,
  landing_path text, referrer_host text, converted boolean, is_returning boolean, trail jsonb)
language sql stable security invoker set search_path = public as $$
  select s.id, s.started_at, s.last_seen_at, s.channel, s.utm_campaign, s.utm_term, s.device, s.browser, s.os,
         s.region, s.city, s.landing_path, s.referrer_host, s.converted, s.is_returning,
         coalesce((select jsonb_agg(jsonb_build_object('ts', e.ts, 'name', e.name, 'path', e.path, 'title', e.title, 'params', e.params)
                   order by e.ts, e.id) from pacheco_events e where e.session_id = s.id), '[]'::jsonb)
  from pacheco_sessions s
  where s.started_at >= p_from and s.started_at < p_to and (p_channel is null or s.channel = p_channel)
    and (not p_only_converted or s.converted)
  order by s.started_at desc limit p_limit;
$$;

create or replace function public.pacheco_recent(p_limit int default 50)
returns table (ts timestamptz, session_id uuid, name text, path text, params jsonb,
               channel text, device text, city text, region text)
language sql stable security invoker set search_path = public as $$
  select e.ts, e.session_id, e.name, e.path, e.params, s.channel, s.device, s.city, s.region
  from pacheco_events e join pacheco_sessions s on s.id = e.session_id
  where e.name not in ('page_leave', 'section_view', 'scroll_25', 'scroll_50', 'scroll_75', 'scroll_100')
  order by e.ts desc, e.id desc limit p_limit;
$$;

create or replace function public.pacheco_visitors(p_from timestamptz, p_to timestamptz, p_channel text default null)
returns table (kind text, sessions bigint, wa_clicks bigint)
language sql stable security invoker set search_path = public as $$
  select case when s.visitor_id is null then 'unknown' when s.is_returning then 'returning' else 'new' end,
         count(distinct s.id), count(e.id)
  from pacheco_sessions s
  left join pacheco_events e on e.session_id = s.id and e.name = 'click_whatsapp'
  where s.started_at >= p_from and s.started_at < p_to and (p_channel is null or s.channel = p_channel)
  group by 1 order by 2 desc;
$$;

create or replace function public.pacheco_consent(p_from timestamptz, p_to timestamptz)
returns table (choice text, sessions bigint)
language sql stable security invoker set search_path = public as $$
  with s as (select id from pacheco_sessions where started_at >= p_from and started_at < p_to),
  c as (select distinct on (e.session_id) e.session_id, e.params->>'consent_choice' as choice
        from pacheco_events e join s on s.id = e.session_id where e.name = 'cookie_consent'
        order by e.session_id, e.ts desc)
  select coalesce(c.choice, 'none'), count(*) from s left join c on c.session_id = s.id group by 1 order by 2 desc;
$$;

-- Retenção: apaga sessões (e eventos) mais antigas que N meses
create or replace function public.pacheco_purge(p_months int default 13)
returns integer language plpgsql security definer set search_path = public as $$
declare n integer;
begin
  delete from pacheco_sessions where started_at < now() - make_interval(months => p_months);
  get diagnostics n = row_count;
  return n;
end;
$$;

-- ---------- Permissões: só a service role executa ----------
do $$
declare f record;
begin
  for f in
    select p.oid::regprocedure as sig from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname like 'pacheco\_%'
  loop
    execute format('revoke all on function %s from public, anon, authenticated', f.sig);
    execute format('grant execute on function %s to service_role', f.sig);
  end loop;
end;
$$;
