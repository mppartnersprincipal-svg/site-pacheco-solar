/**
 * Paleta dos gráficos do dashboard — segue os tokens do @theme (globals.css).
 * Recharts recebe cor via prop, então usamos hex aproximados dos tokens (não
 * CSS vars dentro de <svg fill> para manter compatibilidade com export/print).
 */
export const CHART = {
  ink: "#15303b", // petróleo escuro (= --color-ink)
  brand: "#e25a20", // laranja Pacheco (= --color-brand-action)
  brandSoft: "#f6b899",
  solLaranja: "#fe570e", // ponta laranja do gradiente da logo (= --color-sol-laranja)
  sol: "#ffb538", // ponta amarela do gradiente da logo (= --color-sol-amarelo)
  ciano: "#3f9fc4",
  whatsapp: "#25d366",
  muted: "#6b7280",
  line: "#e5e7eb",
  surfaceAlt: "#f4f6f8",
  amber: "#f59e0b",
  blue: "#3b82f6",
  meta: "#1877f2",
  violet: "#8b5cf6",
  teal: "#14b8a6",
} as const;

/** Sequência categórica (donuts/barras com várias séries). */
export const CATEGORICAL = [CHART.ink, CHART.brand, CHART.ciano, CHART.whatsapp, CHART.sol, CHART.violet, CHART.teal, CHART.muted];

/** Cores fixas por canal, para a origem ter sempre a mesma cor em todo o painel. */
export const CHANNEL_COLORS: Record<string, string> = {
  google_ads: CHART.brand,
  meta_ads: CHART.meta,
  google_organic: CHART.ink,
  other_search: CHART.blue,
  social: CHART.violet,
  referral: CHART.sol,
  direct: CHART.muted,
};

export const DEVICE_COLORS: Record<string, string> = {
  mobile: CHART.brand,
  desktop: CHART.ink,
  tablet: CHART.ciano,
  desconhecido: CHART.muted,
};

export const TOOLTIP_STYLE = {
  contentStyle: {
    borderRadius: 12,
    border: `1px solid ${CHART.line}`,
    boxShadow: "0 8px 24px rgba(21,48,59,0.10)",
    fontSize: 13,
    fontFamily: "var(--font-sans)",
  },
  labelStyle: { color: CHART.ink, fontWeight: 600 },
  itemStyle: { color: "#1f2937" },
};
