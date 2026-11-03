/**
 * Tipos das linhas retornadas pelas funções `pacheco_*` do Supabase
 * (supabase/migrations/0001_pacheco_analytics.sql) e rótulos humanos usados
 * no /dashboard. Sem dependência de servidor — pode ser importado em client
 * components.
 */
import type { Channel } from "@/lib/attribution";

export type { Channel };

export type KpisRow = {
  sessions: number;
  page_views: number;
  avg_session_ms: number;
  avg_page_ms: number;
  wa_clicks: number;
  phone_clicks: number;
  wa_sessions: number;
  conv_rate: number;
};

export type DailyRow = { day: string; sessions: number; page_views: number; wa_clicks: number };
export type HeatmapRow = { dow: number; hour: number; sessions: number };
export type ChannelRow = { channel: Channel; sessions: number; wa_clicks: number };
export type DeviceRow = { device: string; sessions: number };
export type PageRow = { path: string; title: string | null; views: number; avg_ms: number; avg_scroll: number };
export type GeoRow = { country: string | null; region: string | null; city: string | null; sessions: number; wa_clicks: number };
export type CampaignRow = {
  channel: Channel;
  utm_campaign: string | null;
  utm_term: string | null;
  utm_content: string | null;
  sessions: number;
  wa_clicks: number;
  conv_rate: number | null;
};
export type ClickRow = { label: string | null; tag: string | null; href: string | null; clicks: number; sessions: number };
export type SectionRow = { path: string; section_id: string | null; sessions: number };
export type FunnelRow = { step: string; sessions: number };
export type VisitorRow = { kind: "new" | "returning" | "unknown"; sessions: number; wa_clicks: number };
export type ConsentRow = { choice: "accepted" | "essential" | "none"; sessions: number };
export type ButtonRow = {
  kind: "click_whatsapp" | "click_phone" | "click_email";
  cta_id: string | null;
  posicao: string | null;
  /** linha (WhatsApp) ou telefone (click_phone) */
  linha: string | null;
  channel: Channel;
  clicks: number;
  sessions: number;
};
export type TrailEvent = {
  ts: string;
  name: string;
  path: string;
  title: string | null;
  params: Record<string, string | number | boolean>;
};
export type JourneyRow = {
  id: string;
  started_at: string;
  last_seen_at: string;
  channel: Channel;
  utm_campaign: string | null;
  utm_term: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  region: string | null;
  city: string | null;
  landing_path: string;
  referrer_host: string | null;
  converted: boolean;
  is_returning: boolean;
  trail: TrailEvent[];
};
export type RecentRow = {
  ts: string;
  session_id: string;
  name: string;
  path: string;
  params: Record<string, string | number | boolean>;
  channel: Channel;
  device: string | null;
  city: string | null;
  region: string | null;
};

// ---------- Rótulos ----------

export const CHANNEL_LABELS: Record<Channel, string> = {
  google_ads: "Google Ads",
  meta_ads: "Meta Ads",
  google_organic: "Google orgânico",
  other_search: "Outros buscadores",
  social: "Redes sociais",
  referral: "Outros sites",
  direct: "Direto",
};

export const CHANNEL_ORDER: Channel[] = ["google_ads", "meta_ads", "google_organic", "other_search", "social", "referral", "direct"];

export const DEVICE_LABELS: Record<string, string> = {
  mobile: "Celular",
  tablet: "Tablet",
  desktop: "Computador",
  desconhecido: "Desconhecido",
};

export const VISITOR_LABELS: Record<string, string> = {
  new: "Primeira visita",
  returning: "Já visitou antes",
  unknown: "Sem identificação (recusou)",
};
export const CONSENT_LABELS: Record<string, string> = {
  accepted: "Aceitou cookies",
  essential: "Só o essencial",
  none: "Não respondeu",
};

/** `linha` do click_whatsapp → qual assunto/linha o visitante escolheu */
export const LINHA_LABELS: Record<string, string> = {
  geral: "Orçamento geral",
  solo: "Estrutura de solo",
  telhado: "Telhado — Linha Titan",
  kit: "Kit completo",
  avulso: "Itens avulsos",
  vedacap: "Vedacap",
  "vedacap-lojista": "Vedacap (lojista)",
  obra: "Projetos atendidos",
  equipe: "Falar com a equipe",
  "pronta-entrega": "Pronta entrega",
};

/** `posicao` do click_whatsapp → onde na página o botão fica */
export const POSICAO_LABELS: Record<string, string> = {
  header: "Botão do cabeçalho",
  "menu-mobile": "Menu (celular)",
  flutuante: "Botão flutuante",
  hero: "Topo da página",
  "hero-sobre": "Topo — Sobre",
  "hero-contato": "Topo — Contato",
  "cta-final": "CTA final da página",
  footer: "Rodapé",
  "como-funciona": "Como funciona (Home)",
  "como-pedir": "Como pedir",
  "como-trabalhamos": "Como trabalhamos",
  "um-fornecedor": "Um só fornecedor",
  "tabela-atacado": "Tabela de atacado",
  "solo-em-campo": "Solo em campo",
  "seletor-telhado": "Seletor de telhado",
  "pronta-entrega": "Pronta entrega",
  "para-quem": "Para quem",
  "o-que-enviar": "O que enviar",
  "materiais-titan": "Materiais Titan",
  "lista-de-materiais": "Lista de materiais",
  "kit-completo": "Kit completo",
  "itens-avulsos": "Itens avulsos",
  "componentes-solo": "Componentes de solo",
  "variantes-solo": "Variantes de solo",
  versoes: "Versões",
  "faq-vedacap": "FAQ Vedacap",
  "faq-kits": "FAQ Kits",
  "faq-atendimento": "FAQ Atendimento",
  "caso-fazenda": "Caso fazenda",
  "atalhos-por-linha": "Atalhos por linha",
  aplicacao: "Aplicação Vedacap",
  "ambiente-agressivo": "Ambiente agressivo",
  contato: "Página Contato",
};

export const EVENT_LABELS: Record<string, string> = {
  page_view: "Abriu página",
  page_leave: "Saiu da página",
  click: "Clique",
  click_whatsapp: "Clicou no WhatsApp",
  click_cta: "Clicou em CTA",
  click_phone: "Clicou no telefone",
  click_email: "Clicou no e-mail",
  navigation_click: "Navegou pelo menu",
  section_view: "Viu seção",
  video_play: "Deu play no vídeo",
  file_download: "Baixou arquivo",
  cookie_consent: "Respondeu o banner de cookies",
  scroll_25: "Rolou 25%",
  scroll_50: "Rolou 50%",
  scroll_75: "Rolou 75%",
  scroll_100: "Rolou até o fim",
};

export const FUNNEL_LABELS: Record<string, string> = {
  page_view: "Visitou o site",
  scroll_50: "Rolou metade da página",
  click_whatsapp: "Clicou para falar no WhatsApp",
};

export const PAGE_LABELS: Record<string, string> = {
  "/": "Home",
  "/estruturas-de-solo": "Estruturas de Solo",
  "/estruturas-para-telhado": "Estruturas para Telhado (Titan)",
  "/kits-e-itens-avulsos": "Kits e Itens Avulsos",
  "/vedacap": "Vedacap",
  "/projetos-atendidos": "Projetos Atendidos",
  "/sobre": "Sobre",
  "/contato": "Contato",
  "/politica-de-privacidade": "Política de Privacidade",
};

const TITLE_SUFFIX = / \| Pacheco Solar.*$/;

export function labelChannel(c: string | null | undefined) {
  return (c && CHANNEL_LABELS[c as Channel]) || c || "—";
}
export function labelDevice(d: string | null | undefined) {
  return (d && DEVICE_LABELS[d]) || d || "Desconhecido";
}
export function labelLinha(s: string | null | undefined) {
  return (s && LINHA_LABELS[s]) || s || "—";
}
export function labelPosicao(s: string | null | undefined) {
  return (s && POSICAO_LABELS[s]) || s || "—";
}
export function labelEvent(n: string) {
  return EVENT_LABELS[n] || n;
}
export function labelPage(path: string, title?: string | null) {
  if (PAGE_LABELS[path]) return PAGE_LABELS[path];
  return title ? title.replace(TITLE_SUFFIX, "") : path;
}

// ---------- Formatação pt-BR ----------

const nf = new Intl.NumberFormat("pt-BR");
export function fmtInt(n: number | null | undefined) {
  return nf.format(Math.round(Number(n ?? 0)));
}
export function fmtPct(n: number | null | undefined, digits = 1) {
  return `${Number(n ?? 0).toLocaleString("pt-BR", { maximumFractionDigits: digits })}%`;
}
/** 4200 → "4 s"; 75000 → "1 min 15 s" */
export function fmtDuration(ms: number | null | undefined) {
  const s = Math.round(Number(ms ?? 0) / 1000);
  if (s < 60) return `${s} s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return r ? `${m} min ${r} s` : `${m} min`;
  const h = Math.floor(m / 60);
  return `${h} h ${m % 60} min`;
}
export function fmtDateTime(iso: string) {
  return new Date(iso).toLocaleString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
export function fmtTime(iso: string) {
  return new Date(iso).toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}
export function fmtDay(isoDate: string) {
  const [y, m, d] = isoDate.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("pt-BR", { timeZone: "UTC", day: "2-digit", month: "short" });
}
