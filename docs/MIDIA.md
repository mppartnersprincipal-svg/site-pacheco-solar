# Mídia — cortes de vídeo para aprovação

Acervo original: `C:\Users\pedro\Desktop\Site - Pacheco Solar\assets-src\videos\` (cópia dos `.mov` da pasta "Estrutura de SOLO DUPLA"; `IMG_1638 (1)` e `IMG_1640 (1)` eram duplicatas e ficaram fora).
Todos os 11 clipes são **verticais** (iPhone 3840×2160 com rotação de 90° → exibição 2160×3840), H.264, 30 fps.

## Contact sheets (1 frame a cada 2 s)

Abra `docs/midia/sheet-<clipe>.jpg` para escolher os trechos:

| Clipe | Duração | Sheet |
|---|---|---|
| solo-dupla-1638 | 21 s | `docs/midia/sheet-solo-dupla-1638.jpg` |
| solo-dupla-1651 | 21 s | `docs/midia/sheet-solo-dupla-1651.jpg` |
| solo-dupla-1640 | 17 s | `docs/midia/sheet-solo-dupla-1640.jpg` |
| solo-dupla-3958 | 11 s | `docs/midia/sheet-solo-dupla-3958.jpg` |
| solo-dupla-1639 · 3956 · 3957 · 3960 | 8 s | `docs/midia/sheet-solo-dupla-<n>.jpg` |
| solo-dupla-2716 | 7 s | `docs/midia/sheet-solo-dupla-2716.jpg` |
| solo-dupla-2715 · 3959 | 5 s | `docs/midia/sheet-solo-dupla-<n>.jpg` |

## Hero (provisório — trocar após aprovação)

Hoje o hero usa **IMG_1638, dos 2 s aos 14 s** (`HERO` em `scripts/media/encode-videos.mjs`):

| Arquivo | Formato | Uso | Tamanho |
|---|---|---|---|
| `public/videos/hero-mobile.mp4/.webm` + `.webp` | 9:16 · 720×1280 | fundo full-bleed no celular | 1,45 MB (mp4) |
| `public/videos/hero-desktop.mp4/.webm` + `.webp` | 4:5 · 864×1080 | painel ao lado do texto no desktop (recomendado) | 1,83 MB (mp4) |
| `public/videos/hero-wide.mp4/.webm` + `.webp` | 16:9 · 1280×720 | **opção B**: fundo full-bleed no desktop com corte central (descarta 2/3 do quadro) | 1,56 MB (mp4) |

**Decisão do Pedro:** (a) manter o painel 4:5 no desktop ou (b) usar o `hero-wide` como fundo; (c) qual clipe/trecho vira o hero (ou montagem de 2–3 trechos de 4 s).

Para trocar: editar `HERO = { file, start, dur }` no script e rodar `node scripts/media/encode-videos.mjs --only=hero --force`.
Para uma montagem de vários trechos: gerar cada trecho com `--only=hero` em arquivos separados e concatenar com o ffmpeg (`-filter_complex xfade`), ou pedir o corte à Camille e salvar como `assets-src/videos/hero-final.mov`.

## Galeria "estrutura em campo"

`public/videos/solo-dupla-<n>.mp4/.webm` — primeiros 8 s de cada clipe, 540×960, 0,3–1,2 MB cada, com poster `.webp`. Legendas em `lib/media.ts` (`CLIPES`) — cidade/UF: `[PREENCHER]`.

## Imagens

`node scripts/media/optimize-images.mjs` gera `public/images/<grupo>/<nome>.webp` (lado maior 1200–2000 px conforme o grupo) e `lib/media/manifest.json` (largura, altura, blur). Fotos de WhatsApp (solo-linear, fazenda) ficam em no máximo 1200 px e nunca em hero.

## Pendências de acervo

- Fotos do Lucas (5, no Drive em "Design/fotos lucas 10/08") → copiar para `assets-src/images/lucas/` e rodar o otimizador.
- Fotos de produto do Vedacap nas 3 cores; fotos de fábrica/galpão/expedição/equipe; fotos reais de obras em telhado.
- SVG das logos (exportar de "Manual de Marca/PACHECO SOLAR.ai"); logos dos parceiros PROWATT, SN, MC, ORION.
