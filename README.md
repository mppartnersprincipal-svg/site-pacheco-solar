# Site — Pacheco Solar

Site institucional multi-página da [Pacheco Solar](https://pachecosolar.com.br) (estruturas metálicas para sistemas fotovoltaicos), feito pela M|P Assessoria. Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · @react-spring/web · Lenis.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm run lint
node scripts/lint-copy.mjs                # termos proibidos + lista de [PREENCHER] (docs/PENDENCIAS.md)
node scripts/media/optimize-images.mjs    # ../assets-src/images → public/images + lib/media/manifest.json
node scripts/media/encode-videos.mjs      # ../assets-src/videos → public/videos + docs/midia (contact sheets)
```

- Regras do projeto e estrutura: `CLAUDE.md`
- Tracking (GTM/GA4/Ads/Pixel): `docs/TRACKING.md`
- Mídia e cortes do hero: `docs/MIDIA.md`
- Pendências com o cliente: `docs/PENDENCIAS.md`

Variáveis de ambiente: ver `.env.example`.
