import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { IconKit } from "@/components/icons";
import { DEPOIMENTOS_OBRAS } from "@/content/obras";
import { FLAGS } from "@/config/feature-flags";
import { DEPOIMENTOS, PARCEIROS } from "@/lib/obras";

/**
 * Depoimentos literais do site atual como "etiquetas de expedição" (carrossel
 * scroll-snap no mobile, grid no desktop) + faixa de parceiros só com FLAGS.parceiros.
 */
export function DepoimentosObras() {
  return (
    <section id="depoimentos-obras" data-linha="obra" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={DEPOIMENTOS_OBRAS.eyebrow} title={DEPOIMENTOS_OBRAS.titulo} destaque="menos dor de cabeça" />
        <ul className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {DEPOIMENTOS.map((d, i) => (
            <Reveal key={d.nome} as="li" delay={i * 70} className="w-[82vw] shrink-0 snap-start sm:w-auto">
              <blockquote className="relative flex h-full flex-col chanfro border border-linha bg-chapa p-6 sm:p-7">
                <div className="mb-5 flex items-center justify-between border-b border-dashed border-linha pb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-aco">
                  <span className="flex items-center gap-2">
                    <IconKit className="size-4 text-laranja" />
                    {d.rotulo}
                  </span>
                  <span className="tabular">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <p className="flex-1 text-base leading-relaxed text-branco">“{d.texto}”</p>
                <footer className="mt-6 flex items-center gap-3">
                  <span aria-hidden className="h-px w-8 bg-laranja" />
                  <cite className="font-display text-sm font-semibold not-italic text-branco">{d.nome}</cite>
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-aco">{DEPOIMENTOS_OBRAS.nota}</p>

        {FLAGS.parceiros ? (
          <>
            <TrilhoDivisor className="my-14" />
            <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-laranja-texto">{DEPOIMENTOS_OBRAS.parceirosTitulo}</p>
            <ul className="flex flex-wrap items-center gap-x-10 gap-y-4">
              {PARCEIROS.map((p) => (
                <li key={p} className="font-display text-xl font-bold tracking-wide text-aco">
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-aco">{DEPOIMENTOS_OBRAS.parceirosNota}</p>
          </>
        ) : null}
      </Container>
    </section>
  );
}
