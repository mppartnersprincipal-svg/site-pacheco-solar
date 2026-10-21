import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { EstacaTimeline } from "@/components/nicho/EstacaTimeline";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { img } from "@/lib/media";
import { ROTAS } from "@/lib/site";
import { SOBRE_HERO, SOBRE_HISTORIA, SOBRE_MARCOS } from "@/content/sobre";

/**
 * História: texto literal do briefing em coluna de leitura, foto de obra ao
 * lado (chanfrada, parallax leve só desktop) e timeline de 3 marcos em estacas.
 */
export function HistoriaSobre() {
  // `fill` dispensa width/height (next/image avisa se os dois forem passados)
  const m = img("solo-dupla/img-3963");
  const foto = { src: m.src, alt: SOBRE_HERO.fotoAlt, placeholder: "blur" as const, blurDataURL: m.blurDataURL };
  return (
    <section id="historia" data-linha="equipe" className="relative bg-superficie">
      <TrilhoDivisor className="absolute top-0 right-0 left-0" />
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={SOBRE_HISTORIA.eyebrow} title={SOBRE_HISTORIA.titulo} destaque="na obra" className="mb-8 sm:mb-10" />
            <Reveal delay={120}>
              <p className="max-w-prose text-base leading-relaxed text-aco sm:text-lg">{SOBRE_HISTORIA.texto}</p>
            </Reveal>
            <Reveal delay={200}>
              <TrackedLink
                href={ROTAS.obras}
                ctaId="historia-ver-obras"
                track={{ kind: "nav", destino: ROTAS.obras }}
                className="mt-8 inline-flex min-h-11 items-center gap-2 font-display font-semibold text-laranja underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
              >
                {SOBRE_HISTORIA.linkObras}
                <ArrowRight className="size-4" aria-hidden />
              </TrackedLink>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-5">
            <Parallax amount={12}>
              <figure className="relative">
                <div className="chanfro relative aspect-[4/5] overflow-hidden border border-linha bg-chapa">
                  <Image
                    {...foto}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    quality={75}
                    className="object-cover"
                    style={{ objectPosition: "60% 50%" }}
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-fundo/90 to-transparent" />
                  <figcaption className="absolute bottom-4 left-5 font-mono text-[11px] uppercase tracking-[0.18em] text-branco">
                    {SOBRE_HISTORIA.legendaFoto}
                  </figcaption>
                </div>
                <p className="chanfro-sm mt-3 inline-block border border-dashed border-linha px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-aco">
                  {SOBRE_HERO.fotoLucas}
                </p>
              </figure>
            </Parallax>
          </Reveal>
        </div>

        <div className="mt-16 sm:mt-20 lg:[&_ol]:grid-cols-3">
          <EstacaTimeline passos={SOBRE_MARCOS} />
        </div>
      </Container>
    </section>
  );
}
