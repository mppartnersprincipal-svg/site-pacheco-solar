/**
 * Otimiza o acervo: ../assets-src/images/<grupo>/* → public/images/<grupo>/<nome>.webp
 * - aplica a orientação EXIF (fotos de iPhone), limita o lado maior a MAX_EDGE,
 *   WebP q80 (fotos) / lossless (logos PNG com alpha)
 * - gera lib/media/manifest.json com largura/altura/blurDataURL por imagem
 * Uso: node scripts/media/optimize-images.mjs [--force]
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = process.cwd();
const SRC = path.resolve(ROOT, "../assets-src/images");
const OUT = path.resolve(ROOT, "public/images");
const MANIFEST = path.resolve(ROOT, "lib/media/manifest.json");
const FORCE = process.argv.includes("--force");

/** Lado maior por grupo (fotos de WhatsApp nunca sobem de resolução; renders e iPhone até 2000px). */
const MAX_EDGE = {
  telhado: 1920,
  "solo-dupla": 2000,
  "solo-linear": 1200,
  fazenda: 1200,
  "obras-cocalinho": 2000,
  "obras-lineares": 2000,
  logos: 1200,
  lucas: 1600,
};

const manifest = {};
let feitos = 0;
let pulados = 0;

for (const grupo of await fs.readdir(SRC)) {
  const dirIn = path.join(SRC, grupo);
  if (!(await fs.stat(dirIn)).isDirectory()) continue;
  const dirOut = path.join(OUT, grupo);
  await fs.mkdir(dirOut, { recursive: true });
  const maxEdge = MAX_EDGE[grupo] ?? 1600;

  for (const file of (await fs.readdir(dirIn)).sort()) {
    const ext = path.extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(ext)) continue;
    const nome = path.basename(file, ext);
    const isPng = ext === ".png";
    const outName = `${nome}.webp`;
    const outPath = path.join(dirOut, outName);
    const key = `${grupo}/${nome}`;

    const img = sharp(path.join(dirIn, file)).rotate(); // aplica EXIF
    const meta = await img.metadata();
    const w0 = meta.width ?? 0;
    const h0 = meta.height ?? 0;
    // orientação já aplicada em .rotate(): se EXIF 5-8, troca largura/altura
    const swap = meta.orientation && meta.orientation >= 5;
    const wIn = swap ? h0 : w0;
    const hIn = swap ? w0 : h0;
    const scale = Math.min(1, maxEdge / Math.max(wIn, hIn));
    const w = Math.round(wIn * scale);
    const h = Math.round(hIn * scale);

    let exists = false;
    try {
      await fs.stat(outPath);
      exists = true;
    } catch {}

    if (!exists || FORCE) {
      const pipeline = sharp(path.join(dirIn, file)).rotate().resize({ width: w, height: h, fit: "inside", withoutEnlargement: true });
      if (isPng) await pipeline.webp({ lossless: true }).toFile(outPath);
      else await pipeline.webp({ quality: 80, effort: 5 }).toFile(outPath);
      feitos++;
    } else {
      pulados++;
    }

    const blur = await sharp(path.join(dirIn, file))
      .rotate()
      .resize(16, 16, { fit: "inside" })
      .webp({ quality: 40 })
      .toBuffer();
    const bytes = (await fs.stat(outPath)).size;
    manifest[key] = {
      src: `/images/${grupo}/${outName}`,
      width: w,
      height: h,
      bytes,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
      alt: "",
    };
  }
}

await fs.mkdir(path.dirname(MANIFEST), { recursive: true });
await fs.writeFile(MANIFEST, JSON.stringify(manifest, null, 2));
const total = Object.values(manifest).reduce((s, m) => s + m.bytes, 0);
console.log(`imagens: ${feitos} geradas, ${pulados} já existiam, ${Object.keys(manifest).length} no manifesto, ${(total / 1048576).toFixed(1)} MB em public/images`);
