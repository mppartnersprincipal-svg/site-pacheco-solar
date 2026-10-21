import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { VEDACAP_VERSOES } from "@/content/vedacap";
import { mensagemVedacapCor } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Seção "versoes": 3 cards com amostra (swatch) e um botão de WhatsApp por cor. */
export function VersoesVedacap() {
  return (
    <section id="versoes" data-linha="vedacap" className="bg-superficie py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={VEDACAP_VERSOES.eyebrow} title={VEDACAP_VERSOES.titulo} subtitle={VEDACAP_VERSOES.sub} destaque="Três versões" />
        <ul className="grid gap-4 md:grid-cols-3">
          {VEDACAP_VERSOES.versoes.map((v, i) => (
            <Reveal key={v.id} as="li" delay={i * 90} className="flex">
              <article className="flex w-full flex-col chanfro border border-linha bg-chapa">
                <div className={cn("relative aspect-[4/3] w-full", v.swatch)} aria-hidden>
                  <span className="absolute top-3 left-3 bg-fundo/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-branco">
                    {String(i + 1).padStart(2, "0")} · {v.nome}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-xl font-semibold text-branco">{v.nome}</h3>
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em] text-laranja-texto">{VEDACAP_VERSOES.fotoPendente}</p>
                  <div className="mt-auto pt-5">
                    <WaButton
                      linha="vedacap"
                      mensagem={mensagemVedacapCor(v.cor)}
                      cor={v.cor}
                      ctaId={`versao-${v.id}`}
                      posicao="versoes"
                      size="md"
                      className="w-full"
                    >
                      {VEDACAP_VERSOES.ctaPrefixo} {v.nome.toLowerCase()}
                    </WaButton>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
