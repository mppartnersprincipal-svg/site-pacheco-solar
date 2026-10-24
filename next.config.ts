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
  async headers() {
    return [
      { source: "/:path*", headers: SECURITY_HEADERS },
      {
        // Assets estáticos (fotos, vídeos, manuais): imutáveis por nome de arquivo
        source: "/(images|videos|manuais)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
    ];
  },
};

export default nextConfig;
