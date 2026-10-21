/**
 * Lint de fidelidade: varre content/, lib/produtos, lib/faq, components/ e app/
 * em busca de termos proibidos (CLAUDE.md do cliente) e lista os [PREENCHER]
 * restantes em docs/PENDENCIAS.md. Falha (exit 1) se achar termo proibido.
 * Uso: node scripts/lint-copy.mjs
 */
import { promises as fs } from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const DIRS = ["content", "lib", "components", "app", "config"];
const EXT = new Set([".ts", ".tsx", ".mdx", ".md"]);

/** [regex, motivo] — só o que a regra do cliente proíbe no site público. */
const PROIBIDOS = [
  [/\b3x\b/i, 'comparativo "3x mais resistente" removido (CLAUDE.md do cliente, set/2026)'],
  [/galvanizado a fogo/i, "comparação com galvanizado removida"],
  [/galvalume/i, "marca registrada da ArcelorMittal — não usar em peça pública"],
  [/\bR\$\s?\d/, "preço no site é proibido (tabela só pelo WhatsApp)"],
  [/\bpix\b/i, "forma de pagamento é informação interna"],
  [/\bcarport\b/i, "Carport está em estudo — não publicar"],
  [/\b(pratyc|isoeste|hiper estruturas|metal light|ccm estruturas)\b/i, "não citar concorrentes"],
  [/conta de luz/i, "não prometer economia na conta de luz"],
  [/\bfabricamos\b/i, '"fabricamos" só em /sobre (content/sobre.ts e SITE_ATUAL.sobre2) — nunca para a Linha Titan'],
];

/** Exceções por arquivo/linha: a frase literal do site atual ("Fabricamos estruturas…") só vive em /sobre. */
function excecao(rel, line, re) {
  if (re.source !== "\\bfabricamos\\b") return false;
  const arquivo = rel.replace(/\\/g, "/");
  return arquivo === "content/sobre.ts" || (arquivo === "content/institucional.ts" && /sobre2|Fabricamos estruturas metálicas robustas/.test(line));
}

const achados = [];
const pendencias = [];

async function walk(dir) {
  let entries = [];
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const e of entries) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "node_modules" || e.name === ".next") continue;
      await walk(p);
    } else if (EXT.has(path.extname(e.name))) {
      await lint(p);
    }
  }
}

async function lint(file) {
  const rel = path.relative(ROOT, file);
  const text = await fs.readFile(file, "utf8");
  const lines = text.split(/\r?\n/);
  lines.forEach((line, i) => {
    // ignora linhas de comentário que documentam a própria regra
    const ehComentario = /^\s*(\/\/|\*|\/\*)/.test(line);
    for (const [re, motivo] of PROIBIDOS) {
      if (re.test(line) && !ehComentario && !/lint-copy/.test(rel) && !excecao(rel, line, re)) achados.push({ rel, n: i + 1, motivo, line: line.trim() });
    }
    const m = line.match(/\[PREENCHER[^\]]*\]/g);
    if (m) for (const x of m) pendencias.push({ rel, n: i + 1, texto: x });
  });
}

for (const d of DIRS) await walk(path.join(ROOT, d));

const doc = [
  "# Pendências [PREENCHER] — Pacheco Solar",
  "",
  "Gerado por `node scripts/lint-copy.mjs`. Cada item é um dado que o site NÃO inventa e que precisa de confirmação do cliente (Lucas) via Pedro.",
  "",
  `Total: ${pendencias.length}`,
  "",
  ...pendencias.map((p) => `- \`${p.rel}:${p.n}\` — ${p.texto}`),
  "",
].join("\n");
await fs.mkdir(path.join(ROOT, "docs"), { recursive: true });
await fs.writeFile(path.join(ROOT, "docs/PENDENCIAS.md"), doc);

if (achados.length) {
  console.error(`\n✗ ${achados.length} termo(s) proibido(s):`);
  for (const a of achados) console.error(`  ${a.rel}:${a.n} — ${a.motivo}\n    ${a.line}`);
  process.exit(1);
}
console.log(`✓ nenhum termo proibido · ${pendencias.length} [PREENCHER] listados em docs/PENDENCIAS.md`);
