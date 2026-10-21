import type { MetadataRoute } from "next";
import { ROTAS, SITE_URL } from "@/lib/site";

const LAST_MODIFIED = "2026-10-21";

const ROTAS_PUBLICAS: Array<{ path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }> = [
  { path: ROTAS.home, priority: 1, changeFrequency: "weekly" },
  { path: ROTAS.solo, priority: 0.9, changeFrequency: "monthly" },
  { path: ROTAS.telhado, priority: 0.9, changeFrequency: "monthly" },
  { path: ROTAS.kits, priority: 0.8, changeFrequency: "monthly" },
  { path: ROTAS.vedacap, priority: 0.8, changeFrequency: "monthly" },
  { path: ROTAS.obras, priority: 0.7, changeFrequency: "monthly" },
  { path: ROTAS.sobre, priority: 0.6, changeFrequency: "monthly" },
  { path: ROTAS.contato, priority: 0.8, changeFrequency: "monthly" },
  { path: ROTAS.privacidade, priority: 0.2, changeFrequency: "yearly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROTAS_PUBLICAS.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency,
    priority,
  }));
}
