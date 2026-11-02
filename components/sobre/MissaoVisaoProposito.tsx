import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { Reveal } from "@/components/motion/Reveal";
import { META_2030, MISSAO, PROPOSITO, TAGLINE_CULTURA, VISAO } from "@/content/institucional";
import { SOBRE_MVP } from "@/content/sobre";

const BLOCOS = [
  { numero: "01", rotulo: SOBRE_MVP.rotulos.proposito, texto: PROPOSITO.texto, variant: "laranja" as const },
  { numero: "02", rotulo: SOBRE_MVP.rotulos.missao, texto: MISSAO.texto, variant: "contorno" as const },
  { numero: "03", rotulo: SOBRE_MVP.rotulos.visao, texto: VISAO.texto, variant: "navy" as const },
];

/** Propósito, missão e visão literais do manual de cultura (nov/2026) + a grande meta até 2030. */
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
                <p className="mt-6 font-display text-xl font-semibold leading-snug text-branco sm:text-2xl">{b.texto}</p>
              </ChapaCard>
            </Reveal>
          ))}
        </ul>
        <Reveal delay={300}>
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-ciano/40 bg-navy p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <p className="font-sans text-xs font-bold uppercase tracking-[0.2em] text-ciano">{META_2030.rotulo} · 2030</p>
              <p className="mt-2 font-display text-2xl font-bold leading-tight text-branco sm:text-3xl">{META_2030.texto}</p>
            </div>
            <p className="shrink-0 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-branco/70">{TAGLINE_CULTURA}</p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
