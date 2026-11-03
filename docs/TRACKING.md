> **IDs em uso (levantados do site WordPress em 03/11/2026):** o site atual carrega DOIS containers. `GTM-WKV5QM3B` (via plugin PixelYourSite) tem o GA4 `G-BMVXR9D8X9`, a tag do Google Ads `AW-10868283032` e um gatilho de clique em `wa.me`; `GTM-PFQPFV9` (snippet no tema) tem o Meta Pixel `1253856145352881`. O site novo instala só o `GTM-WKV5QM3B` (`NEXT_PUBLIC_GTM_ID` na Vercel); o Pixel deve ser migrado para dentro dele na configuração do container. A conta Google Ads das campanhas é a 518-024-8909 (MCC 603-989-2603); conferir no GTM a qual conta a tag `AW-10868283032` pertence.

# Tracking — Pacheco Solar (padrão M|P)

## Arquitetura

```
Página ──dataLayer──▶ GTM ──▶ GA4 (eventos) + Google Ads (conversões) + Meta Pixel
```

- GTM carregado por `components/tracking/TrackingProvider.tsx` (next/script, afterInteractive) + `<noscript>` no `app/(site)/layout.tsx` (o `/dashboard` não carrega GTM).
- **Consent Mode v2**: `default` negado no primeiro render; o banner (`components/layout/CookieBanner.tsx`) envia `update` concedido ao "Aceitar". O GTM carrega sempre (modo avançado, pings sem cookie). Para carregar só após o aceite (padrão Sólida), condicionar o `<Script>` ao consentimento no `TrackingProvider`.
- Nenhuma tag direta (`gtag`/`fbq`) no site — tudo dentro do container.

## Eventos (dataLayer)

| Evento | Quando | Parâmetros |
|---|---|---|
| `page_view` | load e navegação SPA | `page_path`, `page_location`, `page_title` |
| `click_whatsapp` | **conversão principal** — todo `<WaButton>` e o flutuante | `cta_id`, `posicao`, `linha`, `item?`, `publico?`, `cor?`, `page`, `utm_*` |
| `click_cta` | abas, downloads de manual, mapa, redes | `cta_id`, `tipo`, `valor?` |
| `click_phone` / `click_email` | tel: / mailto: | `phone` / `email`, `cta_id` |
| `navigation_click` | links do menu/cards | `destino`, `origem` |
| `scroll_25` … `scroll_100` | profundidade, uma vez por página | `percent_scrolled` |
| `section_view` | `<section id>` ≥ 40% visível, uma vez | `section_id` |
| `video_play` | primeiro play de cada clipe | `video_id`, `trigger` (`auto`/`tap`) |
| `file_download` | PDF dos manuais | `file` |
| `cookie_consent` | decisão no banner | `consent_choice` |

UTMs (`utm_source/medium/campaign/term/content`, `gclid`, `fbclid`) são lidos na entrada, guardados 30 min em `sessionStorage` (`pacheco-s`) e anexados a todo evento. O botão flutuante acrescenta `ref: <utm_campaign>` ao fim da mensagem do WhatsApp.

Todo evento acima também vai para o coletor first-party (`lib/tracker.ts` → `/api/collect` → Supabase) que alimenta o `/dashboard` — ver `DASHBOARD.md`.

## O que o Pedro precisa fazer

1. **Importar o container** `gtm/GTM-WKV5QM3B-importar.json` (gerado em 03/11/2026 com `gtm_container.py` + parâmetros deste site): GTM → Administrador → Importar contêiner → arquivo → espaço de trabalho existente → **Mesclar + Substituir conflitantes** → Visualizar (testar um clique no WhatsApp) → Enviar → Publicar.
   Conteúdo: Google Tag GA4 (`G-BMVXR9D8X9`, `send_page_view=false`), tag de evento GA4 para todos os eventos acima com os parâmetros `cta_id, posicao, linha, item, tipo, section_id, percent_scrolled, phone, email, destino, origem, video_id, file, consent_choice, utm_*`, Vinculador + 2 tags de conversão do Google Ads, Meta Pixel `1253856145352881` (base + PageView por rota + `Contact` em `click_whatsapp`), gatilhos de evento personalizado e de mudança de histórico.
2. **Conversões do Google Ads** (conta Pacheco Solar, ID `10868283032`, confirmado em 03/11/2026) já estão no JSON: "Clique nos Botões de WhatsApp" (rótulo `YnH_CMSJsPEaEJits74o`) dispara em todo `click_whatsapp`; "Clique Botão Wpp Flutuante" (rótulo `9dSxCLWStfEaEJits74o`) só quando `cta_id = flutuante`. Como o flutuante também conta na primeira, deixar a do flutuante como conversão **secundária** no Ads (Metas → Clique Botão Wpp Flutuante → Otimização de ações) para não contar em dobro nos lances.
3. **Tags antigas no WKV5QM3B** (PixelYourSite): após publicar, pausar/apagar as tags duplicadas de GA4 e o gatilho de `wa.me` antigo (senão `page_view` e conversão contam em dobro). O container `GTM-PFQPFV9` do tema WordPress morre com a troca de DNS — o Pixel já está no WKV5QM3B pelo JSON.
4. **GA4:** marcar `click_whatsapp` como evento-chave (Administrador → Eventos).
5. **Vercel:** `NEXT_PUBLIC_GTM_ID` e `NEXT_PUBLIC_SITE_URL` já cadastradas (03/11/2026). Variáveis do painel: tabela em `DASHBOARD.md`. Toda variável nova exige **redeploy**.
6. Conferir no ar: `https://www.googletagmanager.com/gtm.js?id=GTM-WKV5QM3B` contém `G-BMVXR9D8X9`, `__awct` e `fbq` só depois de publicado (o modo Visualizar usa o workspace).

## Teste local

```bash
npm run dev
# abrir http://localhost:3000/?utm_source=teste&utm_medium=cpc&utm_campaign=lancamento
# no console: window.dataLayer  → page_view, section_view, scroll_25..., click_whatsapp com utm_* e cta_id
```

## Coletor first-party + /dashboard

Implementado em 03/11/2026 (modelo Sólida, portado para Next.js 16): `lib/tracker.ts`, `app/api/collect/route.ts`, `supabase/migrations/0001_pacheco_analytics.sql`, `app/(painel)/dashboard`, `lib/analytics-queries.ts`, `components/dashboard/`. Documentação, variáveis e checklist em `DASHBOARD.md`.
