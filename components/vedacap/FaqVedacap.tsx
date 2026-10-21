import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { FAQ_VEDACAP_SECAO } from "@/content/vedacap";
import { FAQ_VEDACAP } from "@/lib/faq";

/** Seção "faq-vedacap": perguntas do Vedacap (mesmo array alimenta o FAQPage). */
export function FaqVedacap() {
  return (
    <section id="faq-vedacap" data-linha="vedacap" className="bg-superficie py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={FAQ_VEDACAP_SECAO.eyebrow} title={FAQ_VEDACAP_SECAO.titulo} />
        <Reveal delay={80}>
          <AccordionObjecoes itens={FAQ_VEDACAP} linha="vedacap" posicao="faq-vedacap" className="max-w-3xl" />
        </Reveal>
      </Container>
    </section>
  );
}
