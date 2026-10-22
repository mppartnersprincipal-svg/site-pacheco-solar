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
 * Seção 4 — o fundador. Esquerda: retrato do Lucas (estúdio, 2:3) em card 4:5
 * com o disco ciano e o arco solar laranja por trás; direita: H2 + história
 * literal do briefing + 1 link. Sem a foto no manifesto, mostra as iniciais.
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
            <figure className="relative mx-auto w-full max-w-[420px]">
              {/* Acentos atrás da foto: disco ciano e arco solar laranja */}
              <div aria-hidden className="absolute -bottom-6 -left-6 size-44 rounded-full bg-ciano/90" />
              <ArcoSolar className="absolute -top-8 -right-4 h-40 w-[80%] text-laranja" espessura={4} />
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-linha bg-chapa">
                {foto ? (
                  <Image
                    src={foto.src}
                    alt={SOBRE_RESUMO.fotoAlt}
                    fill
                    quality={75}
                    placeholder="blur"
                    blurDataURL={foto.blurDataURL}
                    sizes="(min-width: 1024px) 420px, 90vw"
                    className="object-cover object-[50%_15%]"
                  />
                ) : (
                  <span className="flex h-full items-center justify-center font-display text-7xl font-extrabold text-branco/20" aria-hidden>
                    LP
                  </span>
                )}
                <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-tinta/80 to-transparent" />
                <figcaption className="absolute bottom-5 left-5">
                  <p className="font-display text-xl font-bold leading-tight text-branco">{SOBRE_RESUMO.fundador}</p>
                  <p className="text-sm text-branco/75">{SOBRE_RESUMO.fundadorRotulo}</p>
                </figcaption>
              </div>
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
