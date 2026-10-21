import { ExternalLink, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { MapaPresenca } from "@/components/sobre/MapaPresenca";
import { SITE } from "@/lib/site";
import { CONTATO_ENDERECO } from "@/content/contato";

/** Onde estamos: endereço completo + CNPJ (lib/site.ts), mapa de presença e link para o Google Maps. */
export function EnderecoMapa() {
  return (
    <section id="endereco-mapa" data-linha="geral" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <Reveal className="order-2 lg:order-1 lg:col-span-6">
            <MapaPresenca />
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-6">
            <SectionHeading eyebrow={CONTATO_ENDERECO.eyebrow} title={CONTATO_ENDERECO.titulo} className="mb-8" />
            <Reveal delay={100}>
              <address className="flex items-start gap-3 not-italic">
                <MapPin className="mt-1 size-5 shrink-0 text-laranja" aria-hidden />
                <div>
                  <p className="text-base leading-relaxed text-branco sm:text-lg">{SITE.endereco.completo}</p>
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.16em] text-aco">
                    {CONTATO_ENDERECO.rotuloCnpj} {SITE.cnpj}
                  </p>
                </div>
              </address>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 font-display text-xl font-semibold text-branco sm:text-2xl">{CONTATO_ENDERECO.destaque}</p>
              <p className="mt-2 max-w-prose text-base leading-relaxed text-aco">{CONTATO_ENDERECO.texto}</p>
            </Reveal>
            <Reveal delay={220}>
              <TrackedLink
                href={SITE.endereco.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                ctaId="endereco-maps"
                track={{ kind: "maps" }}
                className={`${buttonClasses("secondary", "md")} mt-8`}
              >
                <ExternalLink className="size-4" aria-hidden />
                {CONTATO_ENDERECO.rotuloMapa}
              </TrackedLink>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
