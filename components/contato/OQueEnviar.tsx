import { IconEstaca } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { CONTATO_O_QUE_ENVIAR } from "@/content/contato";

/** Checklist do que mandar no WhatsApp (campos das mensagens de lib/whatsapp.ts); versão oficial do comercial pendente (nota em content/contato.ts). */
export function OQueEnviar() {
  return (
    <section id="o-que-enviar" data-linha="geral" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={CONTATO_O_QUE_ENVIAR.eyebrow} title={CONTATO_O_QUE_ENVIAR.titulo} subtitle={CONTATO_O_QUE_ENVIAR.subtitulo} className="mb-6" />
            <Reveal delay={160}>
              <WaButton linha="geral" ctaId="o-que-enviar-whatsapp" posicao="o-que-enviar">
                {CONTATO_O_QUE_ENVIAR.cta}
              </WaButton>
            </Reveal>
          </div>
          <Reveal delay={120} className="lg:col-span-7">
            <ChapaCard numero="CHECKLIST">
              <ol className="flex flex-col divide-y divide-linha">
                {CONTATO_O_QUE_ENVIAR.itens.map((item, i) => (
                  <li key={item} className="flex items-start gap-4 py-4 first:pt-0 last:pb-0">
                    <span className="flex size-9 shrink-0 items-center justify-center border border-linha text-laranja">
                      <IconEstaca className="size-4" />
                    </span>
                    <span>
                      <span className="block font-mono text-[11px] tracking-[0.2em] text-aco/70">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mt-0.5 block text-base leading-relaxed text-branco">{item}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <p className="mt-6 border-t border-dashed border-linha pt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-aco/80">
                {CONTATO_O_QUE_ENVIAR.nota}
              </p>
            </ChapaCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
