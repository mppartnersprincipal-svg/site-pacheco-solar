import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { EstacaTimeline } from "@/components/nicho/EstacaTimeline";
import { LinkInterno } from "@/components/tracking/LinkInterno";
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
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={SOBRE_HISTORIA.eyebrow} title={SOBRE_HISTORIA.titulo} destaque="na obra" className="mb-8 sm:mb-10" />
            <Reveal delay={120}>
              <p className="max-w-prose text-base leading-relaxed text-branco/85 sm:text-lg">{SOBRE_HISTORIA.texto}</p>
            </Reveal>
            <Reveal delay={200}>
              <LinkInterno href={ROTAS.obras} ctaId="historia-ver-obras" variant="texto" className="mt-8 text-laranja-texto">
                {SOBRE_HISTORIA.linkObras}
                <ArrowRight className="size-4" aria-hidden />
              </LinkInterno>
            </Reveal>
          </div>

          <Reveal delay={160} className="lg:col-span-5">
            <Parallax amount={12}>
              <figure className="relative">
                <div className="rounded-2xl relative aspect-[4/5] overflow-hidden border border-linha bg-chapa">
                  <Image
                    {...foto}
                    alt={foto.alt}
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
                <p className="rounded-xl mt-3 inline-block border border-dashed border-linha px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] text-aco">
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
