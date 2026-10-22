import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { IconLoja } from "@/components/icons";
import { VEDACAP_ATACADO } from "@/content/vedacap";

/**
 * Faixa navy "tabela-atacado" logo acima do CTA final: segundo botão da
 * página, com a linha "vedacap-lojista" (o flutuante também troca aqui).
 */
export function AtacadoLojista() {
  return (
    <section id="tabela-atacado" data-linha="vedacap-lojista" className="relative overflow-hidden bg-navy py-14 sm:py-16">
      <div aria-hidden className="pointer-events-none absolute -top-20 right-[-6%] size-[20rem] rounded-full aluzinco opacity-[0.1] blur-3xl" />
      <Container className="relative">
        <Reveal>
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-branco/10 text-branco">
                <IconLoja className="size-6" />
              </span>
              <div>
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-branco/70">{VEDACAP_ATACADO.eyebrow}</p>
                <p className="mt-2 max-w-xl font-display text-xl font-semibold leading-snug text-branco sm:text-2xl">{VEDACAP_ATACADO.texto}</p>
              </div>
            </div>
            <WaButton linha="vedacap-lojista" publico="lojista" ctaId="tabela-atacado-lojista" posicao="tabela-atacado" className="shrink-0">
              {VEDACAP_ATACADO.cta}
            </WaButton>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
