import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { imageProps } from "@/lib/media";
import { OBRAS_DESTAQUE } from "@/lib/obras";
import { OBRAS_SECAO } from "@/content/home";

/** Seção 5 — três obras reais (solo, telhado metálico, telhado cerâmico) e o link para /obras. */
export function ObrasDestaque() {
  return (
    <section id="obras-destaque" data-linha="obra" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={OBRAS_SECAO.eyebrow} title={OBRAS_SECAO.titulo} destaque="engenharia" className="mb-0 sm:mb-0" />
          <Reveal className="shrink-0 pb-1">
            <LinkInterno href={OBRAS_SECAO.ctaHref} ctaId="obras-destaque-ver-todas" variant="texto">
              {OBRAS_SECAO.cta}
              <ArrowRight className="size-4" aria-hidden />
            </LinkInterno>
          </Reveal>
        </div>
        <ul className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-6 sm:mt-14" aria-label="Obras em destaque">
          {OBRAS_DESTAQUE.map((obra, i) => {
            const foto = imageProps(obra.key, obra.alt);
            return (
              <Reveal key={obra.key} as="li" delay={i * 80}>
                <figure className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-linha bg-chapa">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    quality={60}
                    placeholder={foto.placeholder}
                    blurDataURL={foto.blurDataURL}
                    sizes="(min-width: 1280px) 400px, (min-width: 640px) 33vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
                  />
                  <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-tinta/80 to-transparent" />
                  <figcaption className="absolute bottom-4 left-4 rounded-full border border-branco/15 bg-tinta/70 px-3.5 py-1.5 font-sans text-xs font-semibold text-branco backdrop-blur-sm">
                    {obra.legenda}
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
