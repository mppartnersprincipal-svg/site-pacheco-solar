import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { CONTATO_ATALHOS, CONTATO_ATALHOS_SECAO } from "@/content/contato";

/**
 * 8 atalhos por linha: cada placa é um WaButton (variant secondary) estilizado
 * como card chanfrado; a mensagem vem de lib/whatsapp.ts (MENSAGENS[linha]).
 */
export function AtalhosPorLinha() {
  return (
    <section id="atalhos-por-linha" data-linha="geral" className="relative bg-superficie">
      <TrilhoDivisor ativo className="absolute top-0 right-0 left-0" />
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={CONTATO_ATALHOS_SECAO.eyebrow} title={CONTATO_ATALHOS_SECAO.titulo} subtitle={CONTATO_ATALHOS_SECAO.subtitulo} />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CONTATO_ATALHOS.map((a, i) => (
            <Reveal key={a.linha} as="li" delay={i * 60} className="flex">
              <WaButton
                linha={a.linha}
                ctaId={`atalho-${a.linha}`}
                posicao="atalhos-por-linha"
                variant="secondary"
                withIcon={false}
                className="chanfro! h-full w-full min-h-40 flex-col items-start! justify-between! bg-chapa p-5! text-left hover:border-laranja! hover:bg-chapa!"
              >
                <span className="flex w-full items-center justify-between font-mono text-[11px] font-normal tracking-[0.2em] text-aco">
                  {String(i + 1).padStart(2, "0")}
                  <ArrowUpRight className="size-4 text-laranja" aria-hidden />
                </span>
                <span className="mt-6 block">
                  <span className="block font-display text-lg font-semibold leading-tight text-branco">{a.titulo}</span>
                  <span className="mt-2 block font-sans text-sm font-normal leading-snug tracking-normal text-aco">{a.descricao}</span>
                </span>
              </WaButton>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
