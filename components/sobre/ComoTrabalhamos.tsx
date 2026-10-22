import { Camera } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { EstacaTimeline } from "@/components/nicho/EstacaTimeline";
import { FORCAS } from "@/content/institucional";
import { SOBRE_COMO_TRABALHAMOS, SOBRE_SETORES } from "@/content/sobre";

/**
 * Como trabalhamos: h2 e parágrafo literais do site atual, 5 setores em trilho
 * (EstacaTimeline), placeholders tipográficos para as fotos de fábrica
 * (pendência em content/sobre.ts) e as 3 forças do briefing como placas.
 */
export function ComoTrabalhamos() {
  const { fotosLegendas, fotosPlaceholder } = SOBRE_COMO_TRABALHAMOS;
  return (
    <section id="como-trabalhamos" data-linha="equipe" className="relative bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={SOBRE_COMO_TRABALHAMOS.eyebrow} title={SOBRE_COMO_TRABALHAMOS.titulo} subtitle={SOBRE_COMO_TRABALHAMOS.paragrafo} />

        <Reveal>
          <h3 className="mb-8 font-display text-xl font-semibold text-branco sm:text-2xl">{SOBRE_COMO_TRABALHAMOS.setoresTitulo}</h3>
        </Reveal>
        <div className="lg:[&_ol]:grid-cols-5">
          <EstacaTimeline passos={SOBRE_SETORES} />
        </div>

        {/* Placeholders das fotos de fábrica/galpão/expedição/equipe */}
        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label={fotosPlaceholder}>
          {fotosLegendas.map((legenda, i) => (
            <Reveal key={legenda} as="li" delay={i * 80}>
              <div className="rounded-2xl flex aspect-[4/3] flex-col justify-between border border-dashed border-linha bg-superficie p-4 vinheta">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.18em] text-aco">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <Camera className="size-4" aria-hidden />
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-branco">{legenda}</p>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-aco/80">{fotosPlaceholder}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* Forças (SWOT do briefing) */}
        <div className="mt-16 grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <Reveal>
              <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{SOBRE_COMO_TRABALHAMOS.forcasTitulo}</p>
            </Reveal>
            <ul className="flex flex-col gap-3">
              {FORCAS.map((f, i) => (
                <Reveal key={f} as="li" delay={i * 80}>
                  <PlacaIdentificacao variant={i === 0 ? "laranja" : "contorno"} className="max-w-full whitespace-normal normal-case! tracking-[0.04em]!">
                    {f}
                  </PlacaIdentificacao>
                </Reveal>
              ))}
            </ul>
          </div>
          <Reveal delay={200} className="lg:col-span-4 lg:justify-self-end">
            <WaButton linha="equipe" ctaId="como-trabalhamos-comercial" posicao="como-trabalhamos">
              {SOBRE_COMO_TRABALHAMOS.cta}
            </WaButton>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
