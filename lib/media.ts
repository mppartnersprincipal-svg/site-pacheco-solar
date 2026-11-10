import manifest from "@/lib/media/manifest.json";

export type MediaKey = keyof typeof manifest;
export type MediaEntry = { src: string; width: number; height: number; bytes: number; blurDataURL: string; alt: string };

/** Entrada do manifesto gerado por scripts/media/optimize-images.mjs (só em Server Components). */
export function img(key: MediaKey): MediaEntry {
  const m = (manifest as Record<string, MediaEntry>)[key];
  if (!m) throw new Error(`Imagem fora do manifesto: ${key}. Rode node scripts/media/optimize-images.mjs`);
  return m;
}

/** Variante tolerante: null quando a foto ainda não entrou no acervo. */
export function imgOpcional(key: string): MediaEntry | null {
  return (manifest as Record<string, MediaEntry>)[key] ?? null;
}

/** Props prontas para <Image> (src, width, height, placeholder blur). */
export function imageProps(key: MediaKey, alt: string) {
  const m = img(key);
  return { src: m.src, width: m.width, height: m.height, alt, placeholder: "blur" as const, blurDataURL: m.blurDataURL };
}

/** Hero da home: vídeo institucional 16:9 (hero-final.mp4, 26 s em loop). O poster 1280×720 serve aos dois tamanhos. */
export const VIDEOS = {
  hero: { mp4: "/videos/hero.mp4", webm: "/videos/hero.webm", poster: "/videos/hero.webp", width: 1280, height: 720 },
  heroMobile: { mp4: "/videos/hero-mobile.mp4", webm: "/videos/hero-mobile.webm", poster: "/videos/hero.webp", width: 854, height: 480 },
} as const;

/** Clipes da galeria "estrutura em campo" (9:16, 540×960, ≤ 8 s). Classificação = pastas do Drive (Pedro, 10/11/2026): todos estes clipes vêm da pasta SOLO DUPLA, então são solo dupla. */
export const CLIPES = [
  { id: "solo-dupla-1638", legenda: "Solo dupla · estrutura montada" },
  { id: "solo-dupla-1639", legenda: "Solo dupla · perfis e módulos" },
  { id: "solo-dupla-1640", legenda: "Solo dupla · fileiras montadas" },
  { id: "solo-dupla-1651", legenda: "Solo dupla · vista geral da usina" },
  { id: "solo-dupla-2715", legenda: "Solo dupla · detalhe da fixação" },
  { id: "solo-dupla-2716", legenda: "Solo dupla · estrutura em campo" },
  { id: "solo-dupla-3956", legenda: "Solo dupla · módulos fixados" },
  { id: "solo-dupla-3957", legenda: "Solo dupla · perfis de aço" },
  { id: "solo-dupla-3958", legenda: "Solo dupla · close dos perfis" },
  { id: "solo-dupla-3959", legenda: "Solo dupla · fixação dos módulos" },
  { id: "solo-dupla-3960", legenda: "Solo dupla · usina com brita" },
].map((c) => ({ ...c, mp4: `/videos/${c.id}.mp4`, webm: `/videos/${c.id}.webm`, poster: `/videos/${c.id}.webp`, width: 540, height: 960 }));

/**
 * Seleção de /estruturas-de-solo (Pedro, 10/11/2026: "imagem repetida"): 2715/2716 são a mesma tomada e
 * 3957–3960 quase iguais, então fica um clipe por cena: linear com módulos, dupla com módulos,
 * dupla por baixo (postes) e dupla montada sem módulos.
 */
const IDS_CLIPES_SOLO = ["solo-dupla-2715", "solo-dupla-3956", "solo-dupla-3960", "solo-dupla-1638"] as const;
export const CLIPES_SOLO = IDS_CLIPES_SOLO.map((id) => {
  const clipe = CLIPES.find((c) => c.id === id);
  if (!clipe) throw new Error(`Clipe fora da lista CLIPES: ${id}`);
  return clipe;
});
