import { Ban, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { IconTelha } from "@/components/icons";
import { VEDACAP_APLICACAO } from "@/content/vedacap";
import { mensagemPergunta } from "@/lib/whatsapp";

/**
 * Seção "aplicacao": título à esquerda; à direita o aviso em chapa laranja (silicone/fita/massa),
 * a indicação de uso e o convite para receber o passo a passo pelo WhatsApp.
 * O card "Passo a passo oficial" com um passo só saiu a pedido do Pedro (10/11/2026);
 * volta como lista numerada quando o passo a passo oficial do Lucas chegar.
 */
export function AplicacaoVedacap() {
  return (
    <section id="aplicacao" data-linha="vedacap" className="bg-fundo py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={VEDACAP_APLICACAO.eyebrow} title={VEDACAP_APLICACAO.titulo} destaque="cola PU" className="mb-0 sm:mb-0" />
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={80}>
              <p role="note" className="flex items-center gap-3 rounded-xl bg-laranja px-5 py-4 font-display text-lg font-semibold text-preto sm:text-xl">
                <Ban className="size-5 shrink-0" aria-hidden strokeWidth={2} />
                {VEDACAP_APLICACAO.aviso}
              </p>
            </Reveal>
            <Reveal delay={140}>
              <ul className="mt-6 space-y-3 text-base leading-relaxed text-aco">
                <li className="flex items-start gap-3">
                  <IconTelha className="mt-1 size-5 shrink-0 text-laranja" />
                  {VEDACAP_APLICACAO.nota}
                </li>
                <li className="flex items-start gap-3">
                  <MessageCircle className="mt-1 size-5 shrink-0 text-laranja" aria-hidden />
                  {VEDACAP_APLICACAO.passoAPassoWhatsapp}
                </li>
              </ul>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8">
                <WaButton linha="vedacap" mensagem={mensagemPergunta(VEDACAP_APLICACAO.pergunta)} ctaId="aplicacao-vedacap-duvida" posicao="aplicacao" variant="secondary">
                  {VEDACAP_APLICACAO.cta}
                </WaButton>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
