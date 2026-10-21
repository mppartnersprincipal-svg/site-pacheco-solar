import { BadgeCheck, Handshake, Leaf, Lightbulb, Scale, Users } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { VALORES } from "@/content/institucional";
import { SOBRE_VALORES } from "@/content/sobre";

const ICONES = [BadgeCheck, Leaf, Scale, Lightbulb, Handshake, Users] as const;

/** Seis valores literais (briefing360) em grade 3×2 com o arco solar como marca d'água. */
export function ValoresSobre() {
  return (
    <section id="valores" data-linha="equipe" className="relative overflow-hidden bg-superficie">
      <ArcoSolar className="absolute -top-16 left-1/2 h-[60%] w-[120%] -translate-x-1/2 text-laranja/10 sm:w-[90%]" espessura={2} />
      <Container className="relative py-20 sm:py-28">
        <SectionHeading eyebrow={SOBRE_VALORES.eyebrow} title={SOBRE_VALORES.titulo} subtitle={SOBRE_VALORES.subtitulo} destaque="compromisso" />
        <ul className="grid gap-px overflow-hidden border border-linha bg-linha sm:grid-cols-2 lg:grid-cols-3">
          {VALORES.map((v, i) => {
            const Icone = ICONES[i] ?? BadgeCheck;
            return (
              <Reveal key={v.nome} as="li" delay={i * 70} className="group bg-superficie p-6 transition-colors hover:bg-chapa sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-11 items-center justify-center border border-linha text-laranja transition-colors group-hover:border-laranja">
                    <Icone className="size-5" aria-hidden />
                  </span>
                  <span className="font-mono text-xs tracking-[0.2em] text-aco/70">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-5 font-display text-xl font-semibold text-branco">{v.nome}</h3>
                <p className="mt-2 text-sm leading-relaxed text-aco">{v.texto}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
