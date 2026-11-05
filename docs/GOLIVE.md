# Virada de domínio — pachecosolar.com.br → Vercel

Situação em 03/11/2026: o domínio está registrado no **Registro.br**, mas a zona DNS roda nos
nameservers da **HostGator** (`ns980/ns981.hostgator.com.br`), onde também está o WordPress antigo
(IP `162.241.203.30`). O e-mail é **Google Workspace** (MX `aspmx.l.google.com`), com SPF
`v=spf1 a mx include:websitewelcome.com ~all`. Não há DKIM nem DMARC publicados.

Na Vercel, `pachecosolar.com.br` e `www.pachecosolar.com.br` (308 → apex) já estão adicionados ao
projeto `site-pacheco-solar` e verificados; falta só o DNS apontar.

## Opção A — manter o DNS na HostGator (descartada: o Pacheco não tem o login do cPanel)

cPanel da HostGator → **Zone Editor** → `pachecosolar.com.br` → Manage:

| Registro | Nome | Valor | Ação |
|---|---|---|---|
| A | `pachecosolar.com.br` | `216.150.1.1` | **editar** (hoje 162.241.203.30) |
| A | `pachecosolar.com.br` | `216.150.16.1` | **adicionar** (2º IP da Vercel) |
| CNAME | `www` | `ac133451cde9593f.vercel-dns-017.com.` | **editar** (hoje aponta para o apex) |
| AAAA | `pachecosolar.com.br` | — | apagar se existir |

Não mexer em MX, TXT, `mail`, `webmail`, `cpanel`, `ftp`. Propaga em minutos a poucas horas (TTL).
Enquanto a HostGator for paga, esta opção basta.

## Opção B — DNS no Registro.br (caminho escolhido em 05/11/2026: só há login do Registro.br)

Conferido em 05/11/2026: a zona da HostGator só tem A, CNAME www, os 5 MX do Google e o SPF
(sem DKIM, DMARC ou AAAA). Nada mais precisa ser copiado.

registro.br → login → **Domínios** → `pachecosolar.com.br` → seção **DNS** → **Alterar servidores DNS**
→ **Utilizar DNS do Registro.br** → **Editar zona** → cadastrar **todos** os registros abaixo na
mesma tela, antes de salvar (salvar publica a zona e troca os servidores de uma vez; sem os MX o
e-mail para):

| Tipo | Nome | Valor |
|---|---|---|
| A | `@` | `216.150.1.1` |
| A | `@` | `216.150.16.1` |
| CNAME | `www` | `ac133451cde9593f.vercel-dns-017.com.` |
| MX 1 | `@` | `aspmx.l.google.com.` |
| MX 5 | `@` | `alt1.aspmx.l.google.com.` |
| MX 5 | `@` | `alt2.aspmx.l.google.com.` |
| MX 10 | `@` | `alt3.aspmx.l.google.com.` |
| MX 10 | `@` | `alt4.aspmx.l.google.com.` |
| TXT | `@` | `v=spf1 include:_spf.google.com ~all` |

Depois: trocar os servidores DNS do domínio para os do Registro.br. Propagação de até 24–48 h.
Recomendado em seguida (Google Admin → Apps → Gmail → Autenticar e-mail): publicar o DKIM
(`google._domainkey` TXT) e um DMARC (`_dmarc` TXT `v=DMARC1; p=none; rua=mailto:…`).

## Depois que propagar

1. `https://pachecosolar.com.br` abre o site novo com cadeado (certificado automático da Vercel;
   pode levar alguns minutos após a propagação).
2. `https://www.pachecosolar.com.br` → 308 para o apex.
3. 301 das URLs antigas: `/estruturas/`, `/estruturas-2025/`, `/estruturas-2025-jun-25/`,
   `/novo-modelo/`, `/2022/10/04/hello-world/`, `/category/uncategorized/` → `/`;
   `wp-sitemap*.xml` → `/sitemap.xml` (next.config.ts). A query (gclid/UTMs) é preservada.
4. Google Ads: trocar as URLs finais que apontam para as LPs antigas (`/estruturas-2025-jun-25/`)
   para as páginas novas (home, `/estruturas-de-solo`, `/estruturas-para-telhado`). O 301 segura
   enquanto isso.
5. Search Console: enviar `https://pachecosolar.com.br/sitemap.xml`.
6. Painel: `https://pachecosolar.com.br/dashboard` (mesma senha). `NEXT_PUBLIC_SITE_URL` já é o
   domínio final; o coletor aceita Origin do apex e do www.
7. Depois de 30 dias estáveis: cancelar a hospedagem WordPress na HostGator (antes, migrar o DNS
   pela opção B).

Conferência rápida:
```bash
nslookup pachecosolar.com.br          # deve responder 216.150.1.1 / 216.150.16.1
curl -sI https://pachecosolar.com.br | grep -i "server\|x-vercel"   # Server: Vercel
curl -sI https://www.pachecosolar.com.br | grep -i "^HTTP\|^location"  # 308 → apex
```
