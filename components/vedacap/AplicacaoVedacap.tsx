import { Ban } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { IconTelha } from "@/components/icons";
import { VEDACAP_APLICACAO } from "@/content/vedacap";
import { mensagemPergunta } from "@/lib/whatsapp";

/**
 * Seção "aplicacao": aviso em chapa laranja (frase do roteiro sobre silicone/fita/massa), passo a
 * passo oficial ainda PREENCHER (visível) e nota de indicação.
 */
export function AplicacaoVedacap() {
  return (
    <section id="aplicacao" data-linha="vedacap" className="bg-fundo py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={VEDACAP_APLICACAO.eyebrow} title={VEDACAP_APLICACAO.titulo} destaque="cola PU" className="mb-6 sm:mb-8" />
            <Reveal delay={80}>
              <p role="note" className="inline-flex items-center gap-3 chanfro-sm bg-laranja px-5 py-3.5 font-display text-lg font-semibold text-preto">
                <Ban className="size-5 shrink-0" aria-hidden strokeWidth={2} />
                {VEDACAP_APLICACAO.aviso}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 flex items-start gap-3 text-base leading-relaxed text-aco">
                <IconTelha className="mt-1 size-5 shrink-0 text-laranja" />
                {VEDACAP_APLICACAO.nota}
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <WaButton linha="vedacap" mensagem={mensagemPergunta(VEDACAP_APLICACAO.pergunta)} ctaId="aplicacao-vedacap-duvida" posicao="aplicacao" variant="secondary">
                  {VEDACAP_APLICACAO.cta}
                </WaButton>
              </div>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-7">
            <ChapaCard numero="PASSO A PASSO" className="h-full">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-laranja-texto">Passo a passo oficial</p>
              <ol className="mt-5 space-y-3">
                <li className="flex items-start gap-4">
                  <span className="flex size-9 shrink-0 items-center justify-center chanfro-sm border border-linha font-mono text-xs text-aco">01</span>
                  <p className="pt-1.5 font-mono text-sm leading-relaxed text-laranja-texto">{VEDACAP_APLICACAO.passoAPasso}</p>
                </li>
              </ol>
            </ChapaCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
