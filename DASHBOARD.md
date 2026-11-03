# Painel `/dashboard` — Pacheco Solar

Painel interno de métricas do site, no padrão M|P (mesmo modelo da Sólida Transporte, Nova
Ferragista e Pádua Corretora), portado para Next.js 16. Uso interno da Pacheco Solar e da M|P.

```
Página ──dataLayer──▶ GTM (GTM-WKV5QM3B) ──▶ GA4 (G-BMVXR9D8X9) + Google Ads + Meta Pixel
   └──lib/tracker.ts──▶ POST /api/collect ──▶ Supabase (pacheco_sessions / pacheco_events)
/dashboard (senha) ──▶ funções pacheco_* (Supabase) + Google Ads API (via MCC) + GA4 Data API
```

## Acesso

- URL: `https://pachecosolar.com.br/dashboard` (até a troca de DNS: `https://site-pacheco-solar.vercel.app/dashboard`)
- Login: senha única (`DASHBOARD_PASSWORD`). O cookie `pacheco_dash` (httpOnly, assinado com
  `DASHBOARD_SECRET`) vale 30 dias. `proxy.ts` redireciona quem não está logado para `/dashboard/login`.
- `X-Robots-Tag: noindex` + `Cache-Control: private, no-store` em `/dashboard*` (next.config.ts).
- Senha errada responde "Senha incorreta." após 400 ms.

## O que o painel mostra

| Seção | Fonte | Observação |
|---|---|---|
| KPIs (visitas, páginas, tempos, WhatsApp, telefone, conversão) | `pacheco_kpis` | delta vs. período anterior de mesmo tamanho |
| Google Ads (investimento, impressões, cliques, CTR, CPC, conversões, custo/conv., campanhas) | Google Ads API (REST searchStream) | conta do cliente via MCC; só leitura |
| GA4 (sessões, usuários, novos, eventos-chave, engajamento, duração, eventos, canais, páginas de entrada) | GA4 Data API (conta de serviço) | só quem aceitou cookies |
| Visitas por dia · De onde vêm | `pacheco_daily`, `pacheco_by_channel` | canais: google_ads, meta_ads, google_organic, other_search, social, referral, direct |
| Novo × recorrente · Consentimento · Funil | `pacheco_visitors`, `pacheco_consent`, `pacheco_funnel` | funil: visita → scroll_50 → click_whatsapp |
| Dispositivo · WhatsApp por linha | `pacheco_by_device`, `pacheco_buttons` | linha = `linha` do `click_whatsapp` (solo, telhado, kit, avulso, vedacap…) |
| Botões de WhatsApp (linha × origem, linha × posição, cta_id × origem) | `pacheco_buttons` | |
| Jornadas | `pacheco_journeys` | trilha página → página → botão; filtro por linha escolhida |
| Páginas · Tempo e leitura | `pacheco_top_pages` | tempo visível e scroll máximo (page_leave) |
| Seções vistas | `pacheco_sections` | `section_view` por `<section id>` |
| Horários (heatmap) · Cidades | `pacheco_heatmap`, `pacheco_geo` | geo pelos headers da Vercel (sem IP guardado) |
| Campanhas no site | `pacheco_campaigns` | sessões google_ads/meta_ads por utm_campaign/term/content |
| Tudo que foi clicado · Ao vivo | `pacheco_clicks`, `pacheco_recent` | ao vivo atualiza a cada 30 s (server action) |

Filtros na URL: `?periodo=hoje|7d|30d|90d|custom&de=AAAA-MM-DD&ate=AAAA-MM-DD&origem=<canal>`.
Datas em horário de Brasília (UTC-3 fixo).

## Coletor (`lib/tracker.ts` → `app/api/collect/route.ts`)

- Anônimo: sem cookie, sem IP (hash em memória só para rate limit), sem user-agent cru.
- Sessão = UUID em `sessionStorage` (`pacheco-col`), renova após 30 min parado.
- Visitante = UUID em `localStorage` (`pacheco-v`, 13 meses) — apagado se a pessoa escolher "Só o essencial".
- Eventos próprios: `page_view`, `page_leave` {duration_ms, max_scroll_pct}, `click` {tag, text, href, track, section}.
- Todo `push` do `lib/analytics.ts` (click_whatsapp, click_phone, click_email, click_cta, section_view,
  scroll_25/50/75/100, navigation_click, video_play, file_download, cookie_consent) também vai ao coletor.
- Desligado em `/dashboard`, `/api`, `navigator.webdriver` e UAs de bot. Lotes via `sendBeacon`
  (text/plain, 204); gravação em `after()`.
- Rate limit por sessão (120/min) e por IP-hash (600/min), por instância; só aceita `Origin`/`Sec-Fetch-Site`
  do próprio site; teto de 2.000 eventos por sessão (trigger `pacheco_cap_events`). Os limites fortes devem ficar
  no **WAF da Vercel** (Firewall → Rate limiting em `/api/collect` e `/dashboard/login`) — ver "Segurança".

## Banco (Supabase `khipnjfbxjgvmjvyxero`, prefixo `pacheco_`)

Migration: `supabase/migrations/0001_pacheco_analytics.sql` (idempotente). Tabelas `pacheco_sessions`,
`pacheco_events`; triggers de contagem/`converted`/`is_returning`; funções `pacheco_*`; RLS ligado
sem policies (só a service role lê/escreve). Retenção: `select pacheco_purge(13)` apaga sessões com
mais de 13 meses (rodar à mão ou agendar no Supabase).

Dados de teste (visitas com `utm_content=qa-seed`):
```sql
delete from public.pacheco_sessions where utm_content = 'qa-seed';
```

## Variáveis de ambiente (Vercel → Production; depois REDEPLOY)

| Variável | Valor / onde pegar |
|---|---|
| `SUPABASE_URL` | `https://khipnjfbxjgvmjvyxero.supabase.co` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase → Project Settings → API → service_role (secret) |
| `DASHBOARD_PASSWORD` | senha do painel (≥ 8 caracteres) |
| `DASHBOARD_SECRET` | 32+ caracteres aleatórios (`openssl rand -base64 32`) |
| `GOOGLE_ADS_DEVELOPER_TOKEN`, `GOOGLE_ADS_CLIENT_ID`, `GOOGLE_ADS_CLIENT_SECRET`, `GOOGLE_ADS_REFRESH_TOKEN` | mesmos da MCC da M|P (usados na Sólida/Nova Ferragista) |
| `GOOGLE_ADS_CUSTOMER_ID` | `5180248909` (conta Pacheco Solar 518-024-8909) |
| `GOOGLE_ADS_LOGIN_CUSTOMER_ID` | `6039892603` (MCC 603-989-2603) |
| `GA4_PROPERTY_ID` | ID numérico da propriedade do GA4 (Administrador → Detalhes da propriedade) |
| `GOOGLE_SERVICE_ACCOUNT_JSON` | JSON completo da chave da conta de serviço `dashboard-ga4@…`; adicionar o e-mail dela como **Leitor** na propriedade |

Sem `SUPABASE_*` o coletor aceita e descarta (204) e o painel mostra o aviso "Coletor ainda não
conectado". Sem `DASHBOARD_*` o login avisa que falta configurar. Sem `GOOGLE_ADS_*`/`GA4_*` as
seções mostram "Conexão pendente".

## Segurança (revisão de 03/11/2026)

- Login: senha única + cookie HMAC. Tentativas erradas: 10 por IP ou 50 no total em 15 min bloqueiam por 15 min
  (memória da instância). Recomendado: `DASHBOARD_PASSWORD` com 16+ caracteres e regra de rate limit no WAF da
  Vercel para `/dashboard/login` (ex.: 20 req/min por IP).
- Logout apaga o cookie, mas um cookie roubado vale até expirar (30 dias). Para revogar todos: trocar
  `DASHBOARD_SECRET` e fazer redeploy.
- Coletor: sem dado pessoal; limites por instância + Origin do próprio site + teto por sessão. Para abuso
  distribuído, regra de rate limit no WAF da Vercel em `/api/collect` (ex.: 120 req/min por IP).
- `visitor_id` é criado na primeira visita e apagado se a pessoa escolher "Só o essencial" (mesmo
  comportamento da Sólida).

## Conferência depois do deploy

1. `/dashboard` → redireciona para `/dashboard/login`; senha errada → "Senha incorreta."; certa → painel.
2. Visita de teste: `https://pachecosolar.com.br/?utm_source=teste&utm_medium=qa&utm_content=qa-seed`
   → clicar num botão de WhatsApp → aparece em "Ao vivo" e em "Botões".
3. `select count(*) from public.pacheco_sessions;` no Supabase.
4. Seção Google Ads mostra a conta **Pacheco Solar** (não a M|P); seção GA4 mostra sessões.
5. Apagar o teste com o `delete` acima.
