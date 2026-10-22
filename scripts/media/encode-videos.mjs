/**
 * Codifica os .mov (4K verticais, H.264) do acervo para a web.
 * Entrada: ../assets-src/videos/solo-dupla-img_XXXX.mov
 * Saída:   public/videos/<nome>.{mp4,webm,webp}  (clipes 9:16 540×960, ≤ 8 s)
 *          public/videos/hero.{mp4,webm,webp}   (16:9 1280×720, loop de 26 s) — vídeo institucional (hero-final.mp4)
 *          public/videos/hero-mobile.{mp4,webm}  (16:9 854×480) — mesmo vídeo para telas < 768px
 *          docs/midia/sheet-<nome>.jpg  (contact sheet, 1 frame a cada 2 s) para aprovação dos cortes
 * Uso: node scripts/media/encode-videos.mjs [--only=hero|clips|sheets] [--force]
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import ffmpeg from "ffmpeg-static";

const ROOT = process.cwd();
const SRC = path.resolve(ROOT, "../assets-src/videos");
const OUT = path.resolve(ROOT, "public/videos");
const DOCS = path.resolve(ROOT, "docs/midia");
const only = (process.argv.find((a) => a.startsWith("--only=")) ?? "--only=all").split("=")[1];
const FORCE = process.argv.includes("--force");

/**
 * Hero: vídeo institucional 16:9 enviado pelo Lucas (22/10/2026), 1280×720, 25,7 s.
 * Loop inteiro, sem áudio; poster no frame da usina ao pôr do sol (≈ 21,5 s).
 */
const HERO = { file: "hero-final.mp4", start: 0, dur: 26, poster: 21.5 };
const CLIP_DUR = 8;

await fs.mkdir(OUT, { recursive: true });
await fs.mkdir(DOCS, { recursive: true });

function run(args, label) {
  const r = spawnSync(ffmpeg, ["-hide_banner", "-loglevel", "error", "-y", ...args], { stdio: "inherit" });
  if (r.status !== 0) throw new Error(`ffmpeg falhou em ${label}`);
}
async function exists(p) {
  try {
    await fs.stat(p);
    return true;
  } catch {
    return false;
  }
}
const H264 = ["-c:v", "libx264", "-preset", "slow", "-profile:v", "main", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an"];
const VP9 = ["-c:v", "libvpx-vp9", "-b:v", "0", "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", "-an"];

/** Filtro de recorte/escala para um aspecto alvo a partir do 9:16 original. */
function vf(w, h) {
  return `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=24,format=yuv420p`;
}

async function encode({ input, start = 0, dur, w, h, base, crfMp4, crfWebm, posterAt = start + 1, semPoster = false }) {
  const mp4 = path.join(OUT, `${base}.mp4`);
  const webm = path.join(OUT, `${base}.webm`);
  const poster = path.join(OUT, `${base}.webp`);
  const trim = ["-ss", String(start), "-t", String(dur)];
  if (FORCE || !(await exists(mp4))) run([...trim, "-i", input, "-vf", vf(w, h), ...H264, "-crf", String(crfMp4), mp4], `${base}.mp4`);
  if (FORCE || !(await exists(webm))) run([...trim, "-i", input, "-vf", vf(w, h), ...VP9, "-crf", String(crfWebm), webm], `${base}.webm`);
  if (semPoster) {
    const sizes = await Promise.all([mp4, webm].map(async (p) => ((await fs.stat(p)).size / 1048576).toFixed(2)));
    console.log(`${base}: mp4 ${sizes[0]} MB · webm ${sizes[1]} MB`);
    return;
  }
  if (FORCE || !(await exists(poster))) run(["-ss", String(posterAt), "-i", input, "-frames:v", "1", "-vf", `scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h}`, "-c:v", "libwebp", "-quality", "75", poster], `${base}.webp`);
  const sizes = await Promise.all([mp4, webm, poster].map(async (p) => ((await fs.stat(p)).size / 1048576).toFixed(2)));
  console.log(`${base}: mp4 ${sizes[0]} MB · webm ${sizes[1]} MB · poster ${sizes[2]} MB`);
}

const files = (await fs.readdir(SRC)).filter((f) => f.toLowerCase().endsWith(".mov")).sort();

if (only === "all" || only === "sheets") {
  for (const f of files) {
    const base = path.basename(f, path.extname(f)).replace("solo-dupla-img_", "solo-dupla-");
    const sheet = path.join(DOCS, `sheet-${base}.jpg`);
    if (FORCE || !(await exists(sheet))) {
      run(["-i", path.join(SRC, f), "-vf", "fps=1/2,scale=160:-2,tile=6x2", "-frames:v", "1", "-q:v", "4", sheet], `sheet ${base}`);
      console.log(`contact sheet: ${path.relative(ROOT, sheet)}`);
    }
  }
}

if (only === "all" || only === "hero") {
  const input = path.join(SRC, HERO.file);
  // hero.webp (1280×720) é o poster/LCP dos dois tamanhos; o mobile usa o mesmo poster
  await encode({ input, start: HERO.start, dur: HERO.dur, w: 1280, h: 720, base: "hero", crfMp4: 28, crfWebm: 33, posterAt: HERO.poster });
  await encode({ input, start: HERO.start, dur: HERO.dur, w: 854, h: 480, base: "hero-mobile", crfMp4: 30, crfWebm: 35, semPoster: true });
}

if (only === "all" || only === "clips") {
  for (const f of files) {
    const base = path.basename(f, path.extname(f)).replace("solo-dupla-img_", "solo-dupla-");
    await encode({ input: path.join(SRC, f), start: 0, dur: CLIP_DUR, w: 540, h: 960, base, crfMp4: 30, crfWebm: 35 });
  }
}
console.log("vídeos: concluído");
