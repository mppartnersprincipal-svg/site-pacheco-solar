import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { FAQ_KITS_SECAO } from "@/content/kits";
import { FAQ_KITS } from "@/lib/faq";

/** Seção "faq-kits": perguntas de kits e avulsos (mesmo array alimenta o FAQPage). */
export function FaqKits() {
  return (
    <section id="faq-kits" data-linha="kit" className="bg-fundo py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={FAQ_KITS_SECAO.eyebrow} title={FAQ_KITS_SECAO.titulo} />
        <Reveal delay={80}>
          <AccordionObjecoes itens={FAQ_KITS} linha="kit" posicao="faq-kits" className="max-w-3xl" />
        </Reveal>
      </Container>
    </section>
  );
}
