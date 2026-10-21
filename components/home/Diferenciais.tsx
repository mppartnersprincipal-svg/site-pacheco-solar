import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { IconCapacete, IconHaste, IconKit, IconModulo, IconSol, IconTrilho } from "@/components/icons";
import { DIFERENCIAIS } from "@/content/institucional";
import { DIFERENCIAIS_SECAO } from "@/content/home";

type Diferencial = (typeof DIFERENCIAIS)[number];

/** Pictograma do nicho por diferencial (01–06 do site atual). */
const ICONES: Record<Diferencial["numero"], (p: { className?: string }) => React.JSX.Element> = {
  "01": IconTrilho, // da indústria para sua obra
  "02": IconKit, // pronta entrega (expedição)
  "03": IconHaste, // aço de qualidade premium
  "04": IconModulo, // solo e telhado
  "05": IconCapacete, // atendimento técnico
  "06": IconSol, // presença nacional
};

/**
 * Seção 6 — os 6 diferenciais do site atual como tabela de especificação em
 * 2 colunas: chapa numerada, pictograma, título e texto literal.
 */
export function Diferenciais() {
  return (
    <section id="diferenciais" data-linha="geral" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={DIFERENCIAIS_SECAO.eyebrow} title={DIFERENCIAIS_SECAO.titulo} subtitle={DIFERENCIAIS_SECAO.subtitulo} destaque="resolve" />
        <TrilhoDivisor className="mb-10 sm:mb-12" />
        <ol className="grid gap-4 md:grid-cols-2 md:gap-5" aria-label="Diferenciais da Pacheco Solar">
          {DIFERENCIAIS.map((d, i) => {
            const Icone = ICONES[d.numero];
            return (
              <Reveal key={d.numero} as="li" delay={i * 60}>
                <ChapaCard numero={d.numero} as="div" className="flex h-full gap-5 sm:gap-6">
                  <span aria-hidden className="flex size-12 shrink-0 items-center justify-center chanfro-sm border border-laranja/40 bg-fundo text-laranja">
                    <Icone className="size-6" />
                  </span>
                  <div className="min-w-0">
                    <h3 className="pr-8 font-display text-xl font-bold leading-tight text-branco sm:text-2xl">{d.titulo}</h3>
                    <p className="mt-2 text-base leading-relaxed text-aco">{d.texto}</p>
                  </div>
                </ChapaCard>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </section>
  );
}
