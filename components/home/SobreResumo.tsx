import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { Parallax } from "@/components/motion/Parallax";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { SOBRE_RESUMO } from "@/content/home";

/**
 * Seção 10 — história do fundador (briefing 360º, literal) + "Há mais de 5
 * anos…" (site atual). Foto do Lucas [PREENCHER]: placeholder tipográfico 4:5
 * chanfrado com o arco solar; parallax ±12px só no desktop.
 */
export function SobreResumo() {
  return (
    <section id="sobre-resumo" data-linha="equipe" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHeading eyebrow={SOBRE_RESUMO.eyebrow} title={SOBRE_RESUMO.titulo} destaque="na obra" className="mb-8" />
            <Reveal delay={80}>
              <p className="max-w-2xl text-base leading-relaxed text-branco/85 sm:text-lg">{SOBRE_RESUMO.historia}</p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-branco/85 sm:text-lg">{SOBRE_RESUMO.sobre1}</p>
            </Reveal>
            <Reveal delay={200}>
              <dl className="mt-8 grid grid-cols-2 gap-4 border-y border-linha py-5 font-mono text-xs uppercase tracking-[0.14em] sm:grid-cols-3">
                <div>
                  <dt className="text-aco">{SOBRE_RESUMO.fundadorRotulo}</dt>
                  <dd className="mt-1 text-branco">{SOBRE_RESUMO.fundador}</dd>
                </div>
                <div>
                  <dt className="text-aco">{SOBRE_RESUMO.anoFundacaoRotulo}</dt>
                  <dd className="mt-1 text-branco">{SOBRE_RESUMO.anoFundacao}</dd>
                </div>
                <div>
                  <dt className="text-aco">{SOBRE_RESUMO.localRotulo}</dt>
                  <dd className="mt-1 text-branco">{SOBRE_RESUMO.local}</dd>
                </div>
              </dl>
            </Reveal>
            <Reveal delay={260}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <WaButton linha="equipe" ctaId="sobre-resumo-equipe" posicao="sobre-resumo">
                  {SOBRE_RESUMO.ctaWhatsApp}
                </WaButton>
                <LinkInterno href={SOBRE_RESUMO.ctaSobreHref} ctaId="sobre-resumo-conhecer">
                  {SOBRE_RESUMO.ctaSobre}
                  <ArrowRight className="size-4" aria-hidden />
                </LinkInterno>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-5">
            <Parallax amount={12}>
              <figure className="relative mx-auto aspect-[4/5] w-full max-w-[420px] overflow-hidden chanfro border border-linha bg-chapa grade-modulos">
                <ArcoSolar className="absolute inset-x-[-10%] bottom-[-6%] h-[70%] w-[120%] text-laranja/60" espessura={5} />
                <div className="absolute inset-0 flex flex-col justify-between p-6 sm:p-8">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-aco">{SOBRE_RESUMO.fundadorRotulo}</p>
                  <div>
                    <p className="font-display text-4xl font-bold leading-[0.95] text-branco sm:text-5xl">{SOBRE_RESUMO.fundador}</p>
                    <figcaption className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-aco">{SOBRE_RESUMO.fotoPendente}</figcaption>
                  </div>
                </div>
              </figure>
            </Parallax>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
