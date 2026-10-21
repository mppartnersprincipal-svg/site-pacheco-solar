import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { EstacaTimeline } from "@/components/nicho/EstacaTimeline";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { IconGrampo } from "@/components/icons";
import { COMO_PEDIR } from "@/content/solo";
import { PROCESSO_COMPRA } from "@/content/institucional";

/**
 * Checklist do que mandar no WhatsApp (dados [PREENCHER] com o comercial) +
 * timeline do processo de compra (PROCESSO_COMPRA). Server Component.
 */
export function ComoPedir() {
  return (
    <section id="como-pedir" data-linha="solo" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={COMO_PEDIR.eyebrow} title={COMO_PEDIR.titulo} className="mb-8" />
          </div>
          <Reveal className="lg:col-span-7">
            <ChapaCard numero="CHECKLIST" className="p-0 sm:p-0">
              <ol className="divide-y divide-linha">
                {COMO_PEDIR.checklist.map((item, i) => (
                  <li key={item} className="flex items-center gap-4 px-6 py-4 sm:px-7">
                    <span className="flex size-8 shrink-0 items-center justify-center border border-laranja/60 font-mono text-xs text-laranja-texto tabular">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-base font-semibold text-branco sm:text-lg">{item}</span>
                    <IconGrampo className="ml-auto size-4 shrink-0 text-aco/60" />
                  </li>
                ))}
              </ol>
              <p className="border-t border-linha px-6 py-4 font-mono text-xs uppercase tracking-[0.14em] text-aco sm:px-7">{COMO_PEDIR.nota}</p>
            </ChapaCard>
            <div className="mt-6">
              <WaButton linha="solo" ctaId="como-pedir-enviar-dados" posicao="como-pedir">
                {COMO_PEDIR.cta}
              </WaButton>
            </div>
          </Reveal>
        </div>

        <TrilhoDivisor className="my-14 sm:my-20" ativo />

        <Reveal>
          <h3 className="mb-10 font-display text-2xl font-bold sm:text-3xl">{COMO_PEDIR.processoTitulo}</h3>
        </Reveal>
        <EstacaTimeline passos={PROCESSO_COMPRA.map((p) => ({ titulo: p.titulo, texto: p.texto }))} />
      </Container>
    </section>
  );
}
