import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { FAQ_HOME } from "@/lib/faq";
import { OBJECOES } from "@/content/home";

/**
 * Seção 9 — as 7 perguntas do integrador (FAQ_HOME) no accordion de grampo;
 * cada resposta vira "Perguntar isso no WhatsApp". O FAQPage vem do mesmo array.
 */
export function Objecoes() {
  return (
    <section id="objecoes" data-linha="geral" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={OBJECOES.eyebrow} title={OBJECOES.titulo} subtitle={OBJECOES.subtitulo} destaque="antes de fechar" className="mb-0 lg:sticky lg:top-28" />
          </div>
          <Reveal delay={80} className="lg:col-span-7">
            <AccordionObjecoes itens={FAQ_HOME} linha="geral" posicao="objecoes" />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
