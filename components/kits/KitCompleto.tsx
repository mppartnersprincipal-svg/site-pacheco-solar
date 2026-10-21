import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { IconGrampo, IconKit } from "@/components/icons";
import { TabelaKitTitan } from "@/components/kits/TabelaKitTitan";
import { KIT_COMPLETO } from "@/content/kits";

/**
 * Seção "kit-completo": argumento do kit (bullets com grampo) à esquerda e,
 * à direita, a lista de materiais compacta do layout de 4 módulos da Titan.
 */
export function KitCompleto() {
  const { exemplo } = KIT_COMPLETO;
  return (
    <section id="kit-completo" data-linha="kit" className="bg-fundo py-20 sm:py-28">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <SectionHeading eyebrow={KIT_COMPLETO.eyebrow} title={KIT_COMPLETO.titulo} destaque="um só fornecedor" className="mb-8 sm:mb-10" />
            <Reveal delay={80}>
              <ul className="space-y-4">
                {KIT_COMPLETO.bullets.map((b, i) => (
                  <li key={b} className="flex items-start gap-4">
                    <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center chanfro-sm bg-chapa text-laranja">
                      <IconGrampo className="size-5" />
                    </span>
                    <div>
                      <span className="font-mono text-[11px] text-aco">{String(i + 1).padStart(2, "0")}</span>
                      <p className="font-display text-lg font-semibold leading-snug text-branco">{b}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-8 inline-flex items-center gap-2 border-l-2 border-laranja pl-4 font-mono text-xs text-aco">
                <IconKit className="size-4 shrink-0 text-laranja" />
                {KIT_COMPLETO.kitSolo}
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8">
                <WaButton linha="kit" ctaId="kit-completo-pedir" posicao="kit-completo">
                  {KIT_COMPLETO.cta}
                </WaButton>
              </div>
            </Reveal>
          </div>

          <Reveal delay={120} className="lg:col-span-7">
            <ChapaCard numero="4 MÓDULOS" className="h-full">
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-laranja-texto">{exemplo.eyebrow}</p>
              <h3 className="mt-2 font-display text-xl font-semibold text-branco sm:text-2xl">{exemplo.titulo}</h3>
              <div className="mt-6">
                <TabelaKitTitan variantes={exemplo.variantes} colunas={exemplo.colunas} />
              </div>
              <p className="mt-5 text-xs leading-relaxed text-aco">{exemplo.rodape}</p>
              <LinkInterno href={exemplo.linkTelhado.href} ctaId="kit-completo-ver-titan" variant="texto" className="mt-4 text-sm text-laranja-texto">
                {exemplo.linkTelhado.label}
                <ArrowRight className="size-4" aria-hidden />
              </LinkInterno>
            </ChapaCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
