import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
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

/** Seção 6 — os 6 diferenciais do site atual em cards compactos de 3 colunas: ícone, título e uma linha. */
export function Diferenciais() {
  return (
    <section id="diferenciais" data-linha="geral" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={DIFERENCIAIS_SECAO.eyebrow} title={DIFERENCIAIS_SECAO.titulo} destaque="resolve" />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5" aria-label="Diferenciais da Pacheco Solar">
          {DIFERENCIAIS.map((d, i) => {
            const Icone = ICONES[d.numero];
            return (
              <Reveal key={d.numero} as="li" delay={i * 60}>
                <ChapaCard as="div" className="flex h-full flex-col">
                  <span aria-hidden className="flex size-11 items-center justify-center rounded-xl bg-laranja/15 text-laranja-texto">
                    <Icone className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold leading-tight text-branco sm:text-xl">{d.titulo}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-aco sm:text-base">{d.texto}</p>
                </ChapaCard>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
