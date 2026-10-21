import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { EstacaTimeline } from "@/components/nicho/EstacaTimeline";
import { PROCESSO_COMPRA } from "@/content/institucional";
import { COMO_FUNCIONA } from "@/content/home";

/**
 * Seção 7 — processo de compra em 4 passos (briefing 360º) na timeline de
 * estacas; rodapé literal das forças e CTA para começar pelo passo 1.
 */
export function ComoFunciona() {
  const passos = PROCESSO_COMPRA.map((p) => ({ titulo: p.titulo, texto: p.texto }));
  return (
    <section id="como-funciona" data-linha="geral" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={COMO_FUNCIONA.eyebrow} title={COMO_FUNCIONA.titulo} destaque="sem burocracia" />
        <EstacaTimeline passos={passos} className="mt-4" />
        <Reveal delay={100}>
          <div className="mt-14 flex flex-col gap-6 border-t border-linha pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl font-display text-xl font-semibold leading-snug text-branco sm:text-2xl">{COMO_FUNCIONA.rodape}</p>
            <WaButton linha="geral" ctaId="como-funciona-passo-1" posicao="como-funciona" className="shrink-0">
              {COMO_FUNCIONA.cta}
            </WaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
