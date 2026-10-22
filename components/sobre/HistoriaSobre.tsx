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
import { SOBRE_HISTORIA, SOBRE_MARCOS } from "@/content/sobre";

/**
 * História: texto literal do briefing em coluna de leitura, retrato do Lucas
 * ao lado (card 4:5, parallax leve só desktop) e timeline de 3 marcos.
 */
export function HistoriaSobre() {
  // `fill` dispensa width/height (next/image avisa se os dois forem passados)
  const m = img(SOBRE_HISTORIA.fotoKey);
  const foto = { src: m.src, alt: SOBRE_HISTORIA.fotoAlt, placeholder: "blur" as const, blurDataURL: m.blurDataURL };
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
                    className="object-cover object-[50%_15%]"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tinta/80 to-transparent" />
                  <figcaption className="absolute bottom-5 left-5">
                    <p className="font-display text-xl font-bold leading-tight text-branco">{SOBRE_HISTORIA.fotoNome}</p>
                    <p className="text-sm text-branco/75">{SOBRE_HISTORIA.fotoRotulo}</p>
                  </figcaption>
                </div>
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
