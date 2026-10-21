import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { MATERIAIS_TITAN } from "@/content/telhado";
import { imageProps } from "@/lib/media";

/**
 * Três close-ups dos renders emoldurados em bg-placa-clara com legenda mono
 * (os materiais citados no briefing, escopados à Linha Titan).
 */
export function MateriaisTitan() {
  return (
    <>
      <ul className="grid gap-5 sm:grid-cols-3">
        {MATERIAIS_TITAN.itens.map((item, i) => {
          const img = imageProps(item.imagem, item.alt);
          return (
            <Reveal key={item.imagem} as="li" delay={i * 90}>
              <figure className="chanfro bg-placa-clara p-2 text-preto">
                <Image {...img} alt={img.alt} sizes="(min-width: 640px) 33vw, 100vw" className="h-auto w-full" />
                <figcaption className="flex items-baseline justify-between gap-3 px-2 pt-3 pb-1">
                  <span className="font-display text-base font-semibold">{item.legenda}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-preto/50">{String(i + 1).padStart(2, "0")}</span>
                </figcaption>
              </figure>
            </Reveal>
          );
        })}
      </ul>
      <Reveal delay={300} className="mt-8">
        <WaButton linha="telhado" ctaId="materiais-titan-lista" posicao="materiais-titan" variant="link" size="md">
          {MATERIAIS_TITAN.cta}
        </WaButton>
      </Reveal>
    </>
  );
}
