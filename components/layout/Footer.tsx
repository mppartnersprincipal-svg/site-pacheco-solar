import Link from "next/link";
import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { WaButton } from "@/components/cta/WaButton";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Container } from "@/components/ui/Container";
import { ROTAS, SITE } from "@/lib/site";
import { AnoAtual } from "@/components/layout/AnoAtual";

type Logo = { src: string; width: number; height: number };

const LINHAS_FOOTER = [
  { label: "Estrutura de Solo", href: ROTAS.solo },
  { label: "Telhado — Linha Titan", href: ROTAS.telhado },
  { label: "Kits e Itens Avulsos", href: ROTAS.kits },
  { label: "Vedacap", href: ROTAS.vedacap },
] as const;

const INSTITUCIONAL_FOOTER = [
  { label: "Obras", href: ROTAS.obras },
  { label: "Sobre", href: ROTAS.sobre },
  { label: "Contato", href: ROTAS.contato },
  { label: "Política de Privacidade", href: ROTAS.privacidade },
] as const;

/** Rodapé em 3 colunas (marca · linhas · fale com a gente) + barra com dados oficiais (lib/site.ts). */
export function Footer({ logo }: { logo: Logo }) {
  const link =
    "transition-colors hover:text-branco focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv";
  const titulo = "mb-5 font-sans text-xs font-bold uppercase tracking-[0.2em] text-branco/60";

  return (
    <footer className="bg-tinta text-aco">
      <Container className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Image src={logo.src} alt="Pacheco Solar" width={logo.width} height={logo.height} className="h-auto w-36" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Estruturas metálicas para energia solar. Da indústria para sua obra, com entrega em todo o Brasil.
          </p>
        </div>

        <nav aria-label="Linhas de produto">
          <h2 className={titulo}>Linhas</h2>
          <ul className="flex flex-col gap-3">
            {LINHAS_FOOTER.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`text-sm ${link}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={titulo}>Fale com a gente</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li>
              <WaButton
                ctaId="footer-whatsapp"
                posicao="footer"
                variant="link"
                className={`font-sans text-sm font-normal text-aco hover:no-underline ${link}`}
              >
                WhatsApp
              </WaButton>
            </li>
            <li>
              <TrackedLink
                href={`tel:${SITE.telefone.e164}`}
                ctaId="footer-telefone"
                track={{ kind: "phone", phone: SITE.telefone.display }}
                className={`inline-flex items-center gap-2.5 ${link}`}
              >
                <Phone className="size-4 shrink-0" aria-hidden />
                {SITE.telefone.display}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                href={`mailto:${SITE.email}`}
                ctaId="footer-email"
                track={{ kind: "email", email: SITE.email }}
                className={`inline-flex items-center gap-2.5 ${link}`}
              >
                <Mail className="size-4 shrink-0" aria-hidden />
                {SITE.email}
              </TrackedLink>
            </li>
            <li>
              <TrackedLink
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="footer-instagram"
                track={{ kind: "social", rede: "instagram" }}
                className={`inline-flex items-center gap-2.5 ${link}`}
              >
                <InstagramIcon className="size-4 shrink-0" />
                {SITE.instagram.handle}
              </TrackedLink>
            </li>
          </ul>
          <p className="mt-5 text-xs text-aco/80">{SITE.horario}</p>
        </div>
      </Container>

      <div className="border-t border-linha">
        <Container className="flex flex-col gap-4 py-6 text-xs text-aco/80 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl leading-relaxed">
            <p>
              {SITE.razaoSocial} · CNPJ {SITE.cnpj}
            </p>
            <p>
              <TrackedLink
                href={SITE.endereco.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="footer-mapa"
                track={{ kind: "maps" }}
                className={link}
              >
                {SITE.endereco.completo}
              </TrackedLink>
            </p>
          </div>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {INSTITUCIONAL_FOOTER.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              © <AnoAtual /> Pacheco Solar
            </li>
          </ul>
        </Container>
      </div>
    </footer>
  );
}
