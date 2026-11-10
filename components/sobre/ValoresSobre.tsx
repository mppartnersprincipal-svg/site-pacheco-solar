import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { VALORES } from "@/content/institucional";
import { SOBRE_VALORES } from "@/content/sobre";

/**
 * Os 5 valores do manual de cultura (nov/2026): só título e resumo, os 5 numa linha no desktop largo.
 * As listas "o que fazemos" (VALORES[].fazemos) saíram do card a pedido do Pedro (10/11/2026).
 */
export function ValoresSobre() {
  return (
    <section id="valores" data-linha="equipe" className="relative overflow-hidden bg-superficie">
      <ArcoSolar className="absolute -top-16 left-1/2 h-[60%] w-[120%] -translate-x-1/2 text-laranja/10 sm:w-[90%]" espessura={2} />
      <Container className="relative py-20 sm:py-28">
        <SectionHeading eyebrow={SOBRE_VALORES.eyebrow} title={SOBRE_VALORES.titulo} subtitle={SOBRE_VALORES.subtitulo} destaque="praticado" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5" aria-label="Valores da Pacheco Solar">
          {VALORES.map((v, i) => (
            <Reveal key={v.nome} as="li" delay={i * 70}>
              <ChapaCard numero={String(i + 1).padStart(2, "0")} className="flex h-full flex-col">
                <h3 className="pr-8 font-display text-lg font-bold leading-tight text-branco">{v.nome}</h3>
                <p className="mt-3 text-sm leading-relaxed text-aco">{v.texto}</p>
              </ChapaCard>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
