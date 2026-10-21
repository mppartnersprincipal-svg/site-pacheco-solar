@AGENTS.md

# Site — Pacheco Solar

Site institucional multi-página da Pacheco Solar (indústria de estruturas metálicas para sistemas fotovoltaicos, Aparecida de Goiânia/GO), cliente da M|P Assessoria. Substitui o WordPress one-page de pachecosolar.com.br.

> Contexto completo do cliente (regras inegociáveis, dados, estratégia): `C:\Users\pedro\Documents\Clientes\Pacheco Solar\CLAUDE.md`.
> Plano aprovado (arquitetura, blueprint, pendências): `C:\Users\pedro\.claude\plans\bom-dia-claude-seguinte-peppy-sunset.md`.

---

## Regras de fidelidade (não negociáveis)

1. **Nunca inventar dado factual.** Tudo que não vier dos briefings/site atual/manuais/CLAUDE.md do cliente fica `[PREENCHER]` em `content/` e listado em `docs/PENDENCIAS.md`.
2. **Proibido:** "3x mais resistente"/"galvanizado a fogo", citar concorrentes, falar com consumidor final, preço/ticket/forma de pagamento, "fabricamos" para a Linha Titan, Carport, números de prova sem confirmação.
3. **Pronta entrega** sempre "na maior parte do tempo" + "consulte disponibilidade".
4. **Itens avulsos** = grampos (intermediário/final), parafusos (brocante inox, martelo), hastes estruturais inox, clipes de fixação (solo), placas de identificação/sinalização. EPDM, mini trilho e Chapa L são componentes de kit.
5. **Vedacap:** "aplicação simples com cola PU; não usar silicone"; passo a passo oficial `[PREENCHER]`; 3 versões: aluzinco natural, branco e preto; preço só no WhatsApp.
6. **Contato oficial** só em `lib/site.ts`: (62) 4101-8101 · adm@pachecosolar.com.br · @solar.pacheco.
7. **CTA único = WhatsApp** (sem formulário). Toda mensagem em `lib/whatsapp.ts`.
8. `node scripts/lint-copy.mjs` precisa passar antes de qualquer deploy.

---

## Cliente

| Campo | Valor |
|-------|-------|
| Cliente | Pacheco Solar Indústria e Comércio (CNPJ 42.329.007/0001-70) |
| Segmento | Indústria de estruturas metálicas para sistemas fotovoltaicos (B2B — integradores) |
| Objetivo do site | Posicionar como "parceiro de execução" e gerar orçamentos pelo WhatsApp |
| WhatsApp | (62) 4101-8101 |
| URL de produção | https://pachecosolar.com.br (Vercel; DNS gerido pelo Pedro) |

---

## Stack

| Tecnologia | Versão | Função |
|---|---|---|
| Next.js | 16.4 | Framework (App Router, Cache Components, Turbopack) |
| React | 19.3 | UI |
| TypeScript | 5 | Tipagem |
| Tailwind CSS | 4.3 (`@tailwindcss/turbopack`) | Estilização — tokens em `app/globals.css` (`@theme`) |
| @react-spring/web | 10 | Animações (só transform/opacity; `Globals.skipAnimation` sob reduced-motion) |
| Lenis | 1.3 | Smooth scroll (`components/layout/SmoothScroll.tsx`) |
| lucide-react | 1.61 | Ícones genéricos (ícones do nicho em `components/icons/`) |
| sharp / ffmpeg-static | dev | Pipeline de mídia (`scripts/media/`) |

---

## Estrutura

```
app/                       rotas: / · estruturas-de-solo · estruturas-para-telhado · kits-e-itens-avulsos · vedacap · obras · sobre · contato · politica-de-privacidade
components/layout/         Header, MobileDrawer, Footer, SmoothScroll, CookieBanner
components/cta/            WaButton, BotaoWhatsAppInteligente, BarraProntaEntrega, PlacaIdentificacao
components/motion/         Reveal, Counter, Parallax, Marquee (react-spring)
components/nicho/          componentes do nicho (TrilhoDivisor, ArcoSolar, GradeModulos, TrilhoDorSolucao, EstacaTimeline, GaleriaEmCampo, AntesDepoisEstaca, SequenciaMontagem, SeletorTelhado, HotspotsComponentes, FichaTecnica, IsopletaVento, ListaDeMateriais, CatalogoAvulsos, VedacapCorte, AccordionObjecoes)
components/tracking/       TrackingProvider (GTM + Consent Mode v2 + page_view + UTMs + scroll + section_view)
components/seo/            JsonLd
components/ui/             Button, Container, SectionHeading, PageHero, ChapaCard
components/{home,solo,telhado,kits,vedacap,sobre,obras,contato}/  seções por página
lib/site.ts                dados oficiais · lib/whatsapp.ts mensagens · lib/analytics.ts eventos · lib/seo.ts metadata/schema
lib/produtos/*.ts          catálogo tipado (solo, titan, kits, avulsos, vedacap) · lib/faq/*.ts
lib/media/manifest.json    gerado por scripts/media/optimize-images.mjs (src, width, height, blurDataURL)
content/*.ts               copy por página com campo fonte e marcações [PREENCHER]
config/                    feature-flags.ts, pronta-entrega.ts
public/images · public/videos · public/manuais   gerados a partir de ../assets-src (fora do repo)
scripts/media/             optimize-images.mjs, encode-videos.mjs · scripts/lint-copy.mjs
docs/                      MIDIA.md (cortes/contact sheets), TRACKING.md, PENDENCIAS.md
```

---

## Design

| Elemento | Valor |
|----------|-------|
| Fonte display | Jost 600/700 (equivalente livre de Futura Md BT) |
| Fonte corpo | Inter 400/500 (equivalente livre de Gotham Book) |
| Fonte técnica | IBM Plex Mono (dados, legendas, numeração) |
| Cor primária | #D35400 (laranja) · hover #D65522 (IDV 2021) |
| Secundária | #1A4B8C (navy — blocos técnicos, Vedacap) |
| Fundo | #0F0F10 · superfície #1C1C1C · chapa #26282B · linha #3A3D42 |
| Texto | #FFFFFF · secundário #9AA3AD |
| Estilo | Dark industrial premium; motivos do nicho (trilho, grampo, arco solar, grade de módulos, estaca, chanfro, placa de identificação) |

---

## SEO

| Campo | Valor |
|-------|-------|
| Title pattern | `%s | Pacheco Solar` |
| Meta description | `SITE.descricao` em `lib/site.ts` |
| OG Image | `app/opengraph-image.tsx` (por página) |
| Sitemap | `/sitemap.xml` automático (`app/sitemap.ts`) |
| Structured Data | Organization + LocalBusiness (layout/contato), Product (páginas de produto), FAQPage (accordions), BreadcrumbList |

---

## Comandos

```bash
npm install
npm run dev                              # http://localhost:3000
npm run build && npm run lint
node scripts/lint-copy.mjs               # termos proibidos + lista de [PREENCHER]
node scripts/media/optimize-images.mjs   # ../assets-src/images → public/images + manifest
node scripts/media/encode-videos.mjs     # ../assets-src/videos → public/videos + docs/midia
```

---

## Trackeamento (obrigatório)

- GTM via `next/script` (afterInteractive) em `components/tracking/TrackingProvider.tsx`; Consent Mode v2 (default negado, banner atualiza).
- Eventos: `click_whatsapp` (conversão principal), `click_cta`, `click_phone`, `click_email`, `navigation_click`, `scroll_25/50/75/100`, `section_view`, `video_play`, `file_download`, `cookie_consent`, `page_view`.
- UTMs em `sessionStorage` (`pacheco-s`, 30 min) anexadas a todo evento; `ref: utm_campaign` só na mensagem do botão flutuante.
- Env: `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SITE_URL` (GA4/Pixel/Ads ficam dentro do GTM).
- Container importável: `gtm/` (gerado com `~/.claude/skills/lp-tracking-dashboard/scripts/gtm_container.py`).
- Fase 2: coletor first-party + `/dashboard` (skill `lp-tracking-dashboard`).

---

## Deploy

- Vercel · branch `main` · domínio pachecosolar.com.br (WordPress fica no ar até o DNS virar).
- Repo: github.com/mppartnersprincipal-svg/site-pacheco-solar
