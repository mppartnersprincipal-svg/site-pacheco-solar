# Tracking — Pacheco Solar (padrão M|P)

## Arquitetura

```
Página ──dataLayer──▶ GTM ──▶ GA4 (eventos) + Google Ads (conversões) + Meta Pixel
```

- GTM carregado por `components/tracking/TrackingProvider.tsx` (next/script, afterInteractive) + `<noscript>` no `app/layout.tsx`.
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
| `scroll_25` … `scroll_100` | profundidade, uma vez por página | `percent` |
| `section_view` | `<section id>` ≥ 40% visível, uma vez | `section_id` |
| `video_play` | primeiro play de cada clipe | `video_id`, `trigger` (`auto`/`tap`) |
| `file_download` | PDF dos manuais | `file` |
| `cookie_consent` | decisão no banner | `consent_choice` |

UTMs (`utm_source/medium/campaign/term/content`, `gclid`, `fbclid`) são lidos na entrada, guardados 30 min em `sessionStorage` (`pacheco-s`) e anexados a todo evento. O botão flutuante acrescenta `ref: <utm_campaign>` ao fim da mensagem do WhatsApp.

## O que o Pedro precisa fazer

1. Criar/obter: `GTM-XXXXXXX`, `G-XXXXXXXXXX` (GA4), conversão do Google Ads (`AW-XXXXXXXXX` + rótulo) e o ID do Meta Pixel.
2. Gerar o container importável:
   ```bash
   python ~/.claude/skills/lp-tracking-dashboard/scripts/gtm_container.py \
     --gtm GTM-XXXXXXX --ga4 G-XXXXXXXXXX --name pachecosolar.com.br \
     --conv "Clique no WhatsApp|AW-XXXXXXXXX|ROTULO|click_whatsapp" \
     --out gtm/GTM-XXXXXXX-importar.json
   ```
   GTM → Administrador → Importar contêiner → arquivo → espaço de trabalho existente → **Mesclar + Substituir conflitantes** → Visualizar (testar um clique no WhatsApp) → Enviar → Publicar.
3. Na Google Tag (GA4) do container: `send_page_view = false` (o site envia `page_view` por rota). Adicionar as tags de `scroll_*`, `section_view`, `video_play`, `file_download`, `click_phone` como eventos GA4 se o gerador não as criar.
4. GA4: marcar `click_whatsapp` como evento-chave. Meta: tag de `Contact` disparada por `click_whatsapp`.
5. Vercel: variáveis `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_SITE_URL=https://pachecosolar.com.br` → **redeploy** (variáveis só valem depois de redeploy).
6. Conferir no ar: `https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX` contém `G-…` e `__awct` só depois de publicado.

## Teste local

```bash
npm run dev
# abrir http://localhost:3000/?utm_source=teste&utm_medium=cpc&utm_campaign=lancamento
# no console: window.dataLayer  → page_view, section_view, scroll_25..., click_whatsapp com utm_* e cta_id
```

## Fase 2 (opcional)

Coletor first-party + `/dashboard` com login (skill `lp-tracking-dashboard`, modelo `site-solida-transporte`): renomear os eventos do SQL para os nomes acima, permitir dígitos em `NAME_RE` (`scroll_75`) e adicionar o canal `meta_ads` (`lib/attribution.ts` já tem).
