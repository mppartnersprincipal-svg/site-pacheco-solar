import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { FAQ_CONTATO } from "@/lib/faq";
import { CONTATO_FAQ } from "@/content/contato";

/** FAQ do atendimento (FAQ_CONTATO) — o Schema FAQPage é emitido pela página com o mesmo array. */
export function FaqAtendimento() {
  return (
    <section id="faq-atendimento" data-linha="geral" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={CONTATO_FAQ.eyebrow} title={CONTATO_FAQ.titulo} />
        <AccordionObjecoes itens={FAQ_CONTATO} linha="geral" posicao="faq-atendimento" className="max-w-3xl" />
      </Container>
    </section>
  );
}
