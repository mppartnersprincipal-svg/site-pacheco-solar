import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { Reveal } from "@/components/motion/Reveal";
import { MISSAO, PROPOSITO, VISAO } from "@/content/institucional";
import { SOBRE_MVP } from "@/content/sobre";

const BLOCOS = [
  { numero: "01", rotulo: SOBRE_MVP.rotulos.missao, texto: MISSAO.texto, variant: "laranja" as const },
  { numero: "02", rotulo: SOBRE_MVP.rotulos.visao, texto: VISAO.texto, variant: "contorno" as const },
  { numero: "03", rotulo: SOBRE_MVP.rotulos.proposito, texto: PROPOSITO.texto, variant: "navy" as const },
];

/** Missão, visão e propósito literais (briefing360) em três chapas com placa de identificação. */
export function MissaoVisaoProposito() {
  return (
    <section id="missao-visao-proposito" data-linha="equipe" className="bg-fundo grade-modulos">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={SOBRE_MVP.eyebrow} title={SOBRE_MVP.titulo} />
        <ul className="grid gap-5 lg:grid-cols-3">
          {BLOCOS.map((b, i) => (
            <Reveal key={b.rotulo} as="li" delay={i * 90} className="flex">
              <ChapaCard numero={b.numero} className="flex w-full flex-col" interactive>
                <PlacaIdentificacao variant={b.variant} className="self-start">
                  {b.rotulo}
                </PlacaIdentificacao>
                <h3 className="sr-only">{b.rotulo}</h3>
                <p className="mt-6 text-base leading-relaxed text-aco">{b.texto}</p>
              </ChapaCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
