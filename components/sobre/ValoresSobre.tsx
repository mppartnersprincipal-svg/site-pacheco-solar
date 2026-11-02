import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { VALORES } from "@/content/institucional";
import { SOBRE_VALORES } from "@/content/sobre";
import { cn } from "@/lib/utils";

/** Os 5 valores do manual de cultura (nov/2026): título, resumo e os "fazemos" literais. Grade 3 + 2 no desktop. */
export function ValoresSobre() {
  return (
    <section id="valores" data-linha="equipe" className="relative overflow-hidden bg-superficie">
      <ArcoSolar className="absolute -top-16 left-1/2 h-[60%] w-[120%] -translate-x-1/2 text-laranja/10 sm:w-[90%]" espessura={2} />
      <Container className="relative py-20 sm:py-28">
        <SectionHeading eyebrow={SOBRE_VALORES.eyebrow} title={SOBRE_VALORES.titulo} subtitle={SOBRE_VALORES.subtitulo} destaque="praticado" />
        <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-6 lg:gap-5" aria-label="Valores da Pacheco Solar">
          {VALORES.map((v, i) => (
            <Reveal key={v.nome} as="li" delay={i * 70} className={cn("lg:col-span-2", i === 3 && "lg:col-start-2")}>
              <ChapaCard numero={String(i + 1).padStart(2, "0")} className="flex h-full flex-col">
                <h3 className="pr-10 font-display text-xl font-bold leading-tight text-branco sm:text-2xl">{v.nome}</h3>
                <p className="mt-3 text-sm leading-relaxed text-aco sm:text-base">{v.texto}</p>
                <ul className="mt-5 flex flex-col gap-2 border-t border-linha pt-5" aria-label="O que fazemos">
                  {v.fazemos.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-branco/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-laranja-texto" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
              </ChapaCard>
            </Reveal>
          ))}
        </ol>
      </Container>
    </section>
  );
}
