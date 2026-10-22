import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { imgOpcional } from "@/lib/media";
import { SOBRE_RESUMO } from "@/content/home";

/**
 * Seção 4 — o fundador. Esquerda: foto recortada do Lucas sobre um disco ciano
 * com o arco solar laranja (enquanto a foto não entra no acervo, o disco fica
 * com as iniciais); direita: H2 + história literal do briefing + 1 link.
 */
export function SobreResumo() {
  const foto = imgOpcional(SOBRE_RESUMO.fotoKey);
  return (
    <section id="sobre-resumo" data-linha="equipe" className="relative overflow-hidden bg-superficie">
      <p aria-hidden className="pointer-events-none absolute -right-10 bottom-6 hidden select-none font-display text-[9rem] font-extrabold leading-none tracking-tight text-branco/[0.04] xl:block">
        PACHECO
      </p>
      <Container className="relative py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <figure className="relative mx-auto w-full max-w-[400px]">
              <div className="relative aspect-square">
                <div className="absolute inset-[8%] rounded-full bg-ciano" />
                <ArcoSolar className="absolute inset-x-[-2%] top-[-1%] z-10 h-[56%] w-[104%] text-laranja" espessura={4} />
                <div className="absolute inset-x-[8%] top-[-10%] bottom-[8%] z-20 overflow-hidden rounded-b-full">
                  {foto ? (
                    <Image
                      src={foto.src}
                      alt={SOBRE_RESUMO.fotoAlt}
                      width={foto.width}
                      height={foto.height}
                      sizes="(min-width: 1024px) 400px, 80vw"
                      className="mx-auto h-full w-auto object-contain object-bottom"
                    />
                  ) : (
                    <span className="flex h-full items-end justify-center pb-[18%] font-display text-7xl font-extrabold text-tinta/80" aria-hidden>
                      LP
                    </span>
                  )}
                </div>
              </div>
              <figcaption className="absolute bottom-[8%] left-0 rounded-xl border border-linha bg-tinta/90 px-4 py-3 backdrop-blur-sm">
                <p className="font-display text-lg font-bold leading-tight text-branco">{SOBRE_RESUMO.fundador}</p>
                <p className="text-xs text-aco">{SOBRE_RESUMO.fundadorRotulo}</p>
              </figcaption>
            </figure>
          </Reveal>

          <div className="lg:col-span-7">
            <SectionHeading eyebrow={SOBRE_RESUMO.eyebrow} title={SOBRE_RESUMO.titulo} destaque="na obra" className="mb-6" />
            <Reveal delay={80}>
              <p className="max-w-2xl text-base leading-relaxed text-branco/80 sm:text-lg">{SOBRE_RESUMO.historia}</p>
            </Reveal>
            <Reveal delay={160}>
              <div className="mt-8">
                <LinkInterno href={SOBRE_RESUMO.ctaSobreHref} ctaId="sobre-resumo-conhecer">
                  {SOBRE_RESUMO.ctaSobre}
                  <ArrowRight className="size-4" aria-hidden />
                </LinkInterno>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
