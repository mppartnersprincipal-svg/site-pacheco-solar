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

## Hero (vídeo institucional — 22/10/2026)

Fonte: `assets-src/videos/hero-final.mp4` (enviado pelo Lucas em "Vídeo Heroe/Pacheco Solar.mp4"), 1280×720, 25,7 s, 30 fps, com áudio. Cenas: fachada/escritório (0–10 s), fábrica (10–20 s), usina ao pôr do sol (20–25 s). O hero toca o vídeo inteiro em loop, mudo, atrás do texto (desktop e mobile).

| Arquivo | Formato | Uso | Tamanho |
|---|---|---|---|
| `public/videos/hero.mp4/.webm` | 16:9 · 1280×720 · 24 fps | telas ≥ 768px | 2,66 MB / 3,35 MB |
| `public/videos/hero-mobile.mp4/.webm` | 16:9 · 854×480 | telas < 768px | 1,06 MB / 1,51 MB |
| `public/videos/hero.webp` | 1280×720, frame de 21,5 s (usina) | poster/LCP dos dois tamanhos | 64 KB |

Para trocar o corte: editar `HERO = { file, start, dur, poster }` em `scripts/media/encode-videos.mjs` e rodar `node scripts/media/encode-videos.mjs --only=hero --force`.

## Fotos vindas do protótipo Lovable (22/10/2026)

Com autorização do Pedro, do preview `id-preview--5a1a5713-….lovable.app`: `obras-telhado/telhado-metalico.jpg` e `telhado-ceramico.jpg` (720×1600, comprimidas — pedir originais em alta ao Lucas [PREENCHER]) e `logos/pacheco-branco.png` (logo branca usada no header/footer). A foto recortada do Lucas do Lovable não pôde ser baixada (o preview exige sessão); no lugar entrou o retrato de estúdio enviado pelo Pedro em 22/10/2026 (`assets-src/images/lucas/fundador-lucas.jpg`, 2496×3744), usado em card 4:5 no bloco "Fundador" da home (chave `lucas/fundador-lucas`). Decisão do Pedro: as fotos de telhado ficam as do Lovable mesmo.

## Galeria "estrutura em campo"

`public/videos/solo-dupla-<n>.mp4/.webm` — primeiros 8 s de cada clipe, 540×960, 0,3–1,2 MB cada, com poster `.webp`. Legendas em `lib/media.ts` (`CLIPES`) — cidade/UF: `[PREENCHER]`.

## Imagens

`node scripts/media/optimize-images.mjs` gera `public/images/<grupo>/<nome>.webp` (lado maior 1200–2000 px conforme o grupo) e `lib/media/manifest.json` (largura, altura, blur). Fotos de WhatsApp (solo-linear, fazenda) ficam em no máximo 1200 px e nunca em hero.

## Pendências de acervo

- Fotos do Lucas (5, no Drive em "Design/fotos lucas 10/08") → copiar para `assets-src/images/lucas/` e rodar o otimizador.
- Fotos de produto do Vedacap nas 3 cores; fotos de fábrica/galpão/expedição/equipe; fotos reais de obras em telhado.
- SVG das logos (exportar de "Manual de Marca/PACHECO SOLAR.ai"); logos dos parceiros PROWATT, SN, MC, ORION.
