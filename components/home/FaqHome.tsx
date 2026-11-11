import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { FAQ_HOME_HEADING } from "@/content/home";
import { FAQ_HOME } from "@/lib/faq";

/**
 * Seção 9 da home — perguntas frequentes fechadas em acordeão (não pesa no visual enxuto da home)
 * e com os termos das campanhas do Google Ads. O FAQPage JSON-LD vem de app/(site)/page.tsx.
 */
export function FaqHome() {
  return (
    <section id="faq-home" data-linha="geral" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={FAQ_HOME_HEADING.eyebrow} title={FAQ_HOME_HEADING.titulo} />
        <AccordionObjecoes itens={FAQ_HOME} linha="geral" posicao="faq-home" />
      </Container>
    </section>
  );
}
