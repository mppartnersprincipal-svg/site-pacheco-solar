import { Phone, Mail } from "lucide-react";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { WaButton } from "@/components/cta/WaButton";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
import type { Linha } from "@/lib/whatsapp";

/**
 * Fechamento de página: faixa ciano com o arco solar e a marca d'água, H2 de
 * posicionamento, botão laranja de WhatsApp e os canais oficiais.
 * id="cta-final" é o sinal para o botão flutuante sumir.
 */
export function CtaFinal({
  eyebrow = "ORÇAMENTO GRATUITO",
  titulo = "Você vende. A Pacheco entrega.",
  subtitulo = "Garanta o fechamento de mais obras, oferecendo diferenciais e qualidade para seus clientes. Conte com a Pacheco Solar como sua aliada.",
  linha = "geral",
  rotulo = "Pedir orçamento no WhatsApp",
  ctaId = "cta-final",
}: {
  eyebrow?: string;
  titulo?: string;
  subtitulo?: string;
  linha?: Linha;
  rotulo?: string;
  ctaId?: string;
}) {
  const canal =
    "inline-flex items-center gap-2 px-2 py-3 font-sans font-semibold text-tinta underline-offset-4 hover:underline focus-visible:outline-tinta";
  return (
    <section id="cta-final" data-linha={linha} className="relative overflow-hidden bg-ciano text-tinta">
      <ArcoSolar className="absolute -top-10 right-[-10%] h-[140%] w-[70%] text-tinta/15" espessura={2} />
      <p aria-hidden className="pointer-events-none absolute right-6 bottom-4 hidden select-none font-display text-[8rem] font-extrabold leading-none tracking-tight text-branco/10 xl:block">
        PACHECO
      </p>
      <Container className="relative grid gap-10 py-20 sm:py-28 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-8">
          <Reveal>
            <p className="mb-4 font-sans text-xs font-bold uppercase tracking-[0.2em] text-tinta/70">{eyebrow}</p>
          </Reveal>
          <Reveal delay={60}>
            <h2 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.02] text-branco sm:text-5xl lg:text-6xl">{titulo}</h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-tinta/80">{subtitulo}</p>
          </Reveal>
        </div>
        <Reveal delay={200} className="lg:col-span-4 lg:justify-self-end">
          <div className="flex flex-col items-start gap-3">
            <WaButton linha={linha} ctaId={ctaId} posicao="cta-final">
              {rotulo}
            </WaButton>
            <div className="flex flex-wrap items-center gap-x-2">
              <TrackedLink href={`tel:${SITE.telefone.e164}`} ctaId={`${ctaId}-telefone`} track={{ kind: "phone", phone: SITE.telefone.display }} className={canal}>
                <Phone className="size-4" aria-hidden />
                {SITE.telefone.display}
              </TrackedLink>
              <TrackedLink href={`mailto:${SITE.email}`} ctaId={`${ctaId}-email`} track={{ kind: "email", email: SITE.email }} className={canal}>
                <Mail className="size-4" aria-hidden />
                {SITE.email}
              </TrackedLink>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
