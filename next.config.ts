import type { NextConfig } from "next";

// Sem CSP de propósito: quebraria GTM e Meta Pixel
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    // AVIF primeiro: ~30–40% menor que WebP nas fotos de obra
    formats: ["image/avif", "image/webp"],
    // Next 16 exige declarar qualities não-default; 60 nos heros sob overlay
    qualities: [60, 75, 85],
    minimumCacheTTL: 2678400, // 31 dias — regra: trocou o arquivo, troca o nome
  },
  // URLs do site WordPress antigo (sitemap de 03/11/2026) → páginas novas. 301 preserva a query
  // (gclid/UTMs dos anúncios que ainda apontem para as LPs antigas).
  async redirects() {
    const home = ["/estruturas", "/estruturas-2025", "/estruturas-2025-jun-25", "/novo-modelo", "/2022/10/04/hello-world", "/category/uncategorized"];
    return [
      ...home.map((source) => ({ source, destination: "/", permanent: true })),
      { source: "/wp-sitemap:rest*.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/feed", destination: "/", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Painel interno: nunca indexar nem guardar em cache
        source: "/dashboard/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
          { key: "Cache-Control", value: "private, no-store" },
        ],
      },
      { source: "/dashboard", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }, { key: "Cache-Control", value: "private, no-store" }] },
      {
        // Assets estáticos (fotos, vídeos, manuais): imutáveis por nome de arquivo
        source: "/(images|videos|manuais)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
