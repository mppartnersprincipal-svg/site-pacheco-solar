import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { IconKit } from "@/components/icons";
import { PRONTA_ENTREGA_SECAO } from "@/content/kits";

interface ProntaEntregaExpedicaoProps {
  foto: { src: string; width: number; height: number; blurDataURL?: string };
}

/**
 * Seção "pronta-entrega": texto literal da expedição (briefing) + foto
 * provisória com overlay só na faixa da legenda "PREENCHER foto da expedição".
 */
export function ProntaEntregaExpedicao({ foto }: ProntaEntregaExpedicaoProps) {
  return (
    <section id="pronta-entrega" data-linha="pronta-entrega" className="bg-superficie py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="order-2 lg:order-1 lg:col-span-5">
            <figure className="relative aspect-[4/5] w-full chanfro overflow-hidden bg-chapa">
              <Image
                src={foto.src}
                alt={PRONTA_ENTREGA_SECAO.fotoAlt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder={foto.blurDataURL ? "blur" : undefined}
                blurDataURL={foto.blurDataURL}
                className="object-cover"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fundo via-fundo/80 to-transparent px-5 pt-14 pb-5 font-mono text-[11px] uppercase tracking-[0.16em] text-laranja-texto">
                {PRONTA_ENTREGA_SECAO.fotoLegenda}
              </figcaption>
            </figure>
          </Reveal>
          <div className="order-1 lg:order-2 lg:col-span-7">
            <SectionHeading eyebrow={PRONTA_ENTREGA_SECAO.eyebrow} title={PRONTA_ENTREGA_SECAO.titulo} destaque="pronta entrega" className="mb-6 sm:mb-8" />
            <Reveal delay={80}>
              <blockquote className="flex gap-4 border-l-2 border-laranja pl-5">
                <IconKit className="mt-1 size-6 shrink-0 text-laranja" />
                <p className="font-display text-xl leading-snug text-branco sm:text-2xl">{PRONTA_ENTREGA_SECAO.expedicao}</p>
              </blockquote>
            </Reveal>
            <Reveal delay={140}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-aco sm:text-lg">{PRONTA_ENTREGA_SECAO.beneficio}</p>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-aco">{PRONTA_ENTREGA_SECAO.ressalva}</p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <WaButton linha="pronta-entrega" ctaId="pronta-entrega-kits-consultar" posicao="pronta-entrega">
                  {PRONTA_ENTREGA_SECAO.cta}
                </WaButton>
                <PlacaIdentificacao size="sm">Entrega em todo o Brasil</PlacaIdentificacao>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}
