import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { PROCESSO_COMPRA } from "@/content/institucional";
import { COMO_FUNCIONA } from "@/content/home";
import { semPendencia } from "@/lib/utils";

/**
 * Seção 7 — processo de compra em 4 passos (briefing 360º) como stepper
 * horizontal: círculos numerados ligados por uma linha, 4 colunas no desktop.
 * Os marcadores [PREENCHER] do content não aparecem para o visitante.
 */
export function ComoFunciona() {
  return (
    <section id="como-funciona" data-linha="geral" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={COMO_FUNCIONA.eyebrow} title={COMO_FUNCIONA.titulo} destaque="sem burocracia" />
        <ol className="relative grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8" aria-label="Passos do processo de compra">
          <span aria-hidden className="absolute top-6 right-0 left-0 hidden h-px bg-linha lg:block" />
          {PROCESSO_COMPRA.map((passo, i) => (
            <Reveal key={passo.titulo} as="li" delay={i * 80} className="relative">
              <span className="relative inline-flex size-12 items-center justify-center rounded-full border border-laranja/60 bg-fundo font-sans text-sm font-bold text-laranja-texto">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold leading-tight text-branco">{passo.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-aco sm:text-base">{semPendencia(passo.texto)}</p>
            </Reveal>
          ))}
        </ol>
        <Reveal delay={100}>
          <div className="mt-14">
            <WaButton linha="geral" ctaId="como-funciona-passo-1" posicao="como-funciona">
              {COMO_FUNCIONA.cta}
            </WaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
