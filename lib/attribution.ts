/**
 * Classificação da origem da sessão (pago × orgânico × direto…). Função pura,
 * reaproveitada do site-solida-transporte com o canal `meta_ads` (fbclid).
 * Usada na Fase 2 (coletor first-party /api/collect).
 */
export const CHANNELS = [
  "google_ads",
  "meta_ads",
  "google_organic",
  "other_search",
  "social",
  "referral",
  "direct",
] as const;

export type Channel = (typeof CHANNELS)[number];

export type AttributionInput = {
  gclid: boolean;
  fbclid?: boolean;
  utmSource?: string | null;
  utmMedium?: string | null;
  utmTerm?: string | null;
  referrerHost?: string | null;
  siteHost?: string | null;
};

const SEARCH_HOSTS = /(^|\.)(bing|yahoo|duckduckgo|ecosia|yandex|baidu|ask)\./i;
const SOCIAL_HOSTS =
  /(^|\.)(facebook|instagram|linkedin|twitter|x|t|youtube|youtu|tiktok|whatsapp|wa|pinterest|threads)\.(com|me|be|co)$/i;
const PAID_MEDIUMS = new Set(["cpc", "ppc", "paid", "paidsearch", "paid_search", "sem"]);
const META_SOURCES = /facebook|instagram|meta|fb|ig/i;

export function classifyChannel(input: AttributionInput): Channel {
  const source = (input.utmSource ?? "").toLowerCase();
  const medium = (input.utmMedium ?? "").toLowerCase();
  const ref = (input.referrerHost ?? "").toLowerCase();
  const site = (input.siteHost ?? "").toLowerCase();

  if (input.gclid) return "google_ads";
  if (input.fbclid) return "meta_ads";

  const rawValueTrack = /\{\w+\}/.test(input.utmTerm ?? "");
  const fromAdsPanel = ref === "ads.google.com";
  if (fromAdsPanel || rawValueTrack) return "direct";

  if (source.includes("google") && PAID_MEDIUMS.has(medium)) return "google_ads";
  if (META_SOURCES.test(source) && (PAID_MEDIUMS.has(medium) || medium === "paidsocial")) {
    return "meta_ads";
  }
  if (medium === "social" || medium === "paidsocial") return "social";

  if (ref && site && (ref === site || ref.endsWith("." + site) || site.endsWith("." + ref))) {
    return "direct";
  }
  if (/(^|\.)google\./i.test(ref)) return "google_organic";
  if (SEARCH_HOSTS.test(ref)) return "other_search";
  if (SOCIAL_HOSTS.test(ref)) return "social";
  if (ref) return "referral";
  if (source) return "referral";
  return "direct";
}

export function hostOf(url: string | null | undefined): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "") || null;
  } catch {
    return null;
  }
}
