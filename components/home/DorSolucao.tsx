import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { TrilhoDorSolucao } from "@/components/nicho/TrilhoDorSolucao";
import { IconGrampo } from "@/components/icons";
import { MAPA_DOR_SOLUCAO } from "@/content/institucional";
import { DOR_SOLUCAO } from "@/content/home";

/**
 * Seção 5 — mapa dor → solução no trilho (5 pares do briefing para Claude) e
 * o fecho com a promessa central em destaque. CTA para a engenharia.
 */
export function DorSolucao() {
  return (
    <section id="dor-solucao" data-linha="geral" className="relative overflow-hidden bg-fundo grade-modulos">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={DOR_SOLUCAO.eyebrow} title={DOR_SOLUCAO.titulo} subtitle={DOR_SOLUCAO.subtitulo} destaque="prejuízo" />

        <TrilhoDorSolucao pares={[...MAPA_DOR_SOLUCAO]} className="mx-auto max-w-4xl" />

        <Reveal delay={80}>
          <blockquote className="relative mx-auto mt-14 max-w-4xl chanfro border-l-4 border-laranja bg-chapa px-6 py-8 sm:px-10 sm:py-10">
            <IconGrampo aria-hidden className="absolute top-5 right-5 size-8 text-laranja/40" />
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-laranja-texto">{DOR_SOLUCAO.fechoRotulo}</p>
            <p className="mt-3 max-w-3xl font-display text-2xl font-bold leading-[1.1] text-branco sm:text-3xl lg:text-4xl">{DOR_SOLUCAO.fecho}</p>
            <div className="mt-8">
              <WaButton linha="engenharia" ctaId="dor-solucao-engenharia" posicao="dor-solucao" variant="primary">
                {DOR_SOLUCAO.cta}
              </WaButton>
            </div>
          </blockquote>
        </Reveal>
      </Container>
    </section>
  );
}
