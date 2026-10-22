import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { PROVA_SOCIAL } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Seção 8 — os 5 depoimentos literais do site atual em grade "bento" (o
 * primeiro ocupa 2 colunas no desktop). Sem estrelas nem números: só o que o
 * cliente escreveu e o nome.
 */
export function ProvaSocial() {
  return (
    <section id="prova-social" data-linha="geral" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={PROVA_SOCIAL.eyebrow} title={PROVA_SOCIAL.titulo} destaque="menos dor de cabeça" />
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5" aria-label="Depoimentos de clientes">
          {PROVA_SOCIAL.depoimentos.map((d, i) => (
            <Reveal key={d.nome} as="li" delay={i * 60} className={cn(i === 0 && "lg:col-span-2")}>
              <ChapaCard as="div" className="flex h-full flex-col">
                <Quote className="size-6 text-laranja-texto" aria-hidden />
                <blockquote className="mt-4 flex-1">
                  <p className={cn("leading-relaxed text-branco/90", i === 0 ? "text-lg sm:text-xl" : "text-base")}>“{d.texto}”</p>
                </blockquote>
                <figcaption className="mt-6 font-sans text-sm font-semibold text-ciano">{d.nome}</figcaption>
              </ChapaCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
