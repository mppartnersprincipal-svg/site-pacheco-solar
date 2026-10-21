import Link from "next/link";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon, IconArco } from "@/components/icons";
import { WaButton } from "@/components/cta/WaButton";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Container } from "@/components/ui/Container";
import { FOOTER_LINKS, ROTAS, SITE } from "@/lib/site";
import { AnoAtual } from "@/components/layout/AnoAtual";

type Logo = { src: string; width: number; height: number };

/** Rodapé: marca + selos, navegação, contatos oficiais (lib/site.ts), CNPJ e política. */
export function Footer({ logo }: { logo: Logo }) {
  const link =
    "transition-colors hover:text-branco focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv";

  return (
    <footer className="relative border-t border-linha/60 bg-superficie text-aco">
      {/* Arco solar como marca d'água */}
      <IconArco className="pointer-events-none absolute -top-6 right-6 h-24 w-48 text-laranja/10" />
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image src={logo.src} alt="Pacheco Solar" width={logo.width} height={logo.height} className="h-auto w-40" />
          <p className="mt-4 text-sm leading-relaxed">
            Indústria de estruturas metálicas para sistemas fotovoltaicos: usinas de solo, Linha Titan para telhado,
            kits completos, itens avulsos e Vedacap. Da indústria para sua obra.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <PlacaIdentificacao size="sm">Pronta entrega</PlacaIdentificacao>
            <PlacaIdentificacao size="sm">Engenharia própria</PlacaIdentificacao>
            <PlacaIdentificacao size="sm">Entrega em todo o Brasil</PlacaIdentificacao>
          </div>
        </div>

        <nav aria-label="Navegação do rodapé">
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-branco">Navegação</h2>
          <ul className="flex flex-col gap-2.5">
            {FOOTER_LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={`text-sm ${link}`}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-branco">Contato</h2>
          <ul className="flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2.5">
              <Phone className="mt-0.5 size-4 shrink-0 text-laranja" aria-hidden />
              <div>
                <p className="font-medium text-branco">WhatsApp e telefone</p>
                <TrackedLink
                  href={`tel:${SITE.telefone.e164}`}
                  ctaId="footer-telefone"
                  track={{ kind: "phone", phone: SITE.telefone.display }}
                  className={link}
                >
                  {SITE.telefone.display}
                </TrackedLink>
              </div>
            </li>
            <li className="flex items-start gap-2.5">
              <Mail className="mt-0.5 size-4 shrink-0 text-laranja" aria-hidden />
              <TrackedLink
                href={`mailto:${SITE.email}`}
                ctaId="footer-email"
                track={{ kind: "email", email: SITE.email }}
                className={link}
              >
                {SITE.email}
              </TrackedLink>
            </li>
            <li className="flex items-start gap-2.5">
              <InstagramIcon className="mt-0.5 size-4 shrink-0 text-laranja" />
              <TrackedLink
                href={SITE.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="footer-instagram"
                track={{ kind: "social", rede: "instagram" }}
                className={link}
              >
                {SITE.instagram.handle}
              </TrackedLink>
            </li>
            <li className="flex items-start gap-2.5">
              <Clock className="mt-0.5 size-4 shrink-0 text-laranja" aria-hidden />
              <span>{SITE.horario}</span>
            </li>
          </ul>
          <WaButton ctaId="footer-whatsapp" posicao="footer" size="md" className="mt-5">
            Pedir orçamento
          </WaButton>
        </div>

        <div>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-[0.14em] text-branco">Onde estamos</h2>
          <div className="flex items-start gap-2.5 text-sm">
            <MapPin className="mt-0.5 size-4 shrink-0 text-laranja" aria-hidden />
            <address className="not-italic leading-relaxed">
              {SITE.endereco.logradouro}
              <br />
              {SITE.endereco.bairro}, {SITE.endereco.cidade}/{SITE.endereco.uf}
              <br />
              CEP {SITE.endereco.cep}
            </address>
          </div>
          <TrackedLink
            href={SITE.endereco.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            ctaId="footer-mapa"
            track={{ kind: "maps" }}
            className={`mt-3 inline-block text-sm font-semibold text-laranja underline-offset-4 hover:underline`}
          >
            Abrir no Google Maps
          </TrackedLink>
          <p className="mt-5 font-mono text-xs leading-relaxed">
            {SITE.razaoSocial}
            <br />
            CNPJ {SITE.cnpj}
            <br />
            Localização estratégica no centro do Brasil.
          </p>
        </div>
      </Container>

      <div className="border-t border-linha/60">
        <Container className="flex flex-col items-center justify-between gap-3 py-5 text-xs sm:flex-row">
          <p>© <AnoAtual /> Pacheco Solar. Todos os direitos reservados.</p>
          <Link href={ROTAS.privacidade} className={link}>
            Política de Privacidade
          </Link>
        </Container>
      </div>
    </footer>
  );
}
