import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { ConvergenciaFornecedores } from "@/components/kits/ConvergenciaFornecedores";
import { UM_FORNECEDOR } from "@/content/kits";

/**
 * Seção "um-fornecedor": dor (vários fornecedores) à esquerda, SVG de
 * convergência no centro e solução (Pacheco) à direita.
 */
export function UmFornecedor() {
  return (
    <section id="um-fornecedor" data-linha="kit" className="bg-fundo py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={UM_FORNECEDOR.eyebrow} title={UM_FORNECEDOR.titulo} destaque="dor de cabeça" />
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-aco">{UM_FORNECEDOR.esquerda.rotulo}</p>
            <p className="mt-3 font-display text-xl leading-snug text-aco line-through decoration-laranja/60 decoration-2 sm:text-2xl">
              {UM_FORNECEDOR.esquerda.texto}
            </p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-4">
            <ConvergenciaFornecedores rotuloDestino={UM_FORNECEDOR.direita.rotulo} className="mx-auto max-w-md lg:max-w-none" />
          </Reveal>
          <Reveal delay={160} className="lg:col-span-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-laranja">{UM_FORNECEDOR.direita.rotulo}</p>
            <p className="mt-3 font-display text-xl font-semibold leading-snug text-branco sm:text-2xl">{UM_FORNECEDOR.direita.texto}</p>
            <div className="mt-8">
              <WaButton linha="kit" ctaId="um-fornecedor-centralizar" posicao="um-fornecedor">
                {UM_FORNECEDOR.cta}
              </WaButton>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
