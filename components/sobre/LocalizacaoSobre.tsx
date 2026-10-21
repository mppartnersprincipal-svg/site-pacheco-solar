import { ExternalLink, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { Reveal } from "@/components/motion/Reveal";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { buttonClasses } from "@/components/ui/Button";
import { MapaPresenca } from "@/components/sobre/MapaPresenca";
import { SITE } from "@/lib/site";
import { SOBRE_LOCALIZACAO } from "@/content/sobre";

/** Localização: endereço oficial (lib/site.ts), mapa de presença em SVG e link para o Google Maps. */
export function LocalizacaoSobre() {
  return (
    <section id="localizacao" data-linha="equipe" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              eyebrow={SOBRE_LOCALIZACAO.eyebrow}
              title={SOBRE_LOCALIZACAO.titulo}
              subtitle={SOBRE_LOCALIZACAO.texto}
              destaque="centro do Brasil"
              className="mb-8"
            />
            <Reveal delay={120}>
              <address className="not-italic">
                <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-aco">{SOBRE_LOCALIZACAO.rotuloEndereco}</p>
                <p className="flex items-start gap-3 text-base leading-relaxed text-branco sm:text-lg">
                  <MapPin className="mt-1 size-5 shrink-0 text-laranja" aria-hidden />
                  <span>
                    {SITE.endereco.logradouro}, {SITE.endereco.bairro}
                    <br />
                    {SITE.endereco.cidade}/{SITE.endereco.uf} · CEP {SITE.endereco.cep}
                  </span>
                </p>
              </address>
            </Reveal>
            <Reveal delay={180}>
              <div className="mt-6 flex flex-wrap gap-2">
                <PlacaIdentificacao size="sm" variant="laranja">
                  {SITE.endereco.cidade}/{SITE.endereco.uf}
                </PlacaIdentificacao>
                <PlacaIdentificacao size="sm">Entrega em todo o Brasil</PlacaIdentificacao>
              </div>
            </Reveal>
            <Reveal delay={240}>
              <TrackedLink
                href={SITE.endereco.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="localizacao-maps"
                track={{ kind: "maps" }}
                className={`${buttonClasses("secondary", "md")} mt-8`}
              >
                <ExternalLink className="size-4" aria-hidden />
                {SOBRE_LOCALIZACAO.rotuloMapa}
              </TrackedLink>
            </Reveal>
          </div>
          <Reveal delay={160} className="lg:col-span-6">
            <MapaPresenca />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
