/**
 * Tracking — padrão M|P Assessoria (CLAUDE.md global):
 * GTM é o container central; GA4, Google Ads e Meta Pixel ficam DENTRO do GTM.
 * Tudo que o site sabe vai para o `dataLayer` com os nomes abaixo.
 *
 * Catálogo de eventos (nome → parâmetros):
 * - page_view        { page_path, page_location, page_title }       — load + navegação SPA
 * - cookie_consent   { consent_choice: "accepted" | "essential" }
 * - click_whatsapp   { cta_id, posicao, linha, item?, publico?, cor?, page, utm_* } — CONVERSÃO PRINCIPAL
 * - click_cta        { cta_id, tipo, valor?, page }                  — abas, downloads, mapa, "ver linha"
 * - click_phone      { phone, cta_id, page }                        — conversão secundária
 * - click_email      { email, cta_id, page }
 * - navigation_click { destino, origem, page }
 * - scroll_25 / scroll_50 / scroll_75 / scroll_100 { page }
 * - section_view     { section_id, page }                          — uma vez por seção
 * - video_play       { video_id, trigger: "auto" | "tap", page }
 * - file_download    { file, page }
 *
 * Consent Mode v2: `default` negado no primeiro render; o GTM carrega sempre
 * (modo avançado — pings sem cookie) e o banner envia `update` ao aceitar.
 * [PREENCHER] Pedro decide se prefere carregar o GTM só após o aceite (padrão Sólida).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const CONSENT_KEY = "pacheco-cookie-consent";
export const CONSENT_EVENT = "pacheco-consent-change";
export const UTM_KEY = "pacheco-s";
const UTM_TTL_MS = 30 * 60 * 1000;

export type ConsentState = { accepted: boolean; at: number };

export function readConsent(): ConsentState | null {
  try {
    const raw = localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as ConsentState) : null;
  } catch {
    return null;
  }
}

export function writeConsent(accepted: boolean) {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ accepted, at: Date.now() }));
  } catch {
    // storage indisponível — segue sem persistir
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/**
 * Google Consent Mode v2 — empurra `arguments` no dataLayer (é o formato que
 * o GTM reconhece). `default` ANTES do gtm.js; `update` quando o usuário decide.
 */
export function pushConsent(command: "default" | "update", granted: boolean) {
  if (typeof window === "undefined") return;
  const state = granted ? "granted" : "denied";
  const payload = {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state,
    functionality_storage: "granted",
    security_storage: "granted",
    ...(command === "default" ? { wait_for_update: 500 } : {}),
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(toArguments("consent", command, payload));
}

function toArguments(...args: unknown[]): IArguments {
  void args;
  // eslint-disable-next-line prefer-rest-params
  return arguments;
}

// ---------------------------------------------------------------- UTMs
export type Utms = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: boolean;
  fbclid?: boolean;
};

type StoredUtms = { at: number; utms: Utms };

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;

/** Lê os UTMs da URL de entrada e guarda por 30 min (sessionStorage). */
export function captureUtms(): Utms {
  if (typeof window === "undefined") return {};
  const q = new URLSearchParams(window.location.search);
  const found: Utms = {};
  for (const k of UTM_KEYS) {
    const v = q.get(k);
    if (v) found[k] = v.slice(0, 150);
  }
  if (q.has("gclid") || q.has("gbraid") || q.has("wbraid")) found.gclid = true;
  if (q.has("fbclid")) found.fbclid = true;

  const stored = readUtms();
  const utms = Object.keys(found).length ? found : stored;
  try {
    const payload: StoredUtms = { at: Date.now(), utms };
    sessionStorage.setItem(UTM_KEY, JSON.stringify(payload));
  } catch {
    // sem storage
  }
  return utms;
}

export function readUtms(): Utms {
  try {
    const raw = sessionStorage.getItem(UTM_KEY);
    if (!raw) return {};
    const s = JSON.parse(raw) as StoredUtms;
    if (Date.now() - s.at > UTM_TTL_MS) return {};
    return s.utms ?? {};
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------- dataLayer
type Params = Record<string, string | number | boolean | undefined>;

function withContext(params: Params): Params {
  const utms = readUtms();
  return {
    ...params,
    page: window.location.pathname,
    ...(utms.utm_source ? { utm_source: utms.utm_source } : {}),
    ...(utms.utm_medium ? { utm_medium: utms.utm_medium } : {}),
    ...(utms.utm_campaign ? { utm_campaign: utms.utm_campaign } : {}),
    ...(utms.utm_term ? { utm_term: utms.utm_term } : {}),
    ...(utms.utm_content ? { utm_content: utms.utm_content } : {}),
  };
}

function push(event: string, params: Params) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

/** Evento genérico. */
export function trackEvent(name: string, params: Params = {}) {
  push(name, withContext(params));
}

export function trackConsent(accepted: boolean) {
  push("cookie_consent", { consent_choice: accepted ? "accepted" : "essential" });
}

/** CONVERSÃO PRINCIPAL — todo clique em link de WhatsApp. */
export function trackWhatsAppClick(p: {
  cta_id: string;
  posicao: string;
  linha: string;
  item?: string;
  publico?: string;
  cor?: string;
}) {
  push("click_whatsapp", withContext(p));
}

export function trackCta(p: { cta_id: string; tipo: string; valor?: string }) {
  push("click_cta", withContext(p));
}

export function trackPhoneClick(p: { phone: string; cta_id: string }) {
  push("click_phone", withContext(p));
}

export function trackEmailClick(p: { email: string; cta_id: string }) {
  push("click_email", withContext(p));
}

export function trackNavigation(p: { destino: string; origem: string }) {
  push("navigation_click", withContext(p));
}

export function trackSectionView(sectionId: string) {
  push("section_view", withContext({ section_id: sectionId }));
}

export function trackScroll(pct: 25 | 50 | 75 | 100) {
  push(`scroll_${pct}`, withContext({ percent: pct }));
}

export function trackVideoPlay(p: { video_id: string; trigger: "auto" | "tap" }) {
  push("video_play", withContext(p));
}

export function trackFileDownload(file: string) {
  push("file_download", withContext({ file }));
}
