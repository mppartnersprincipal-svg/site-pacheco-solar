import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconTelha } from "@/components/icons";
import { VEDACAP_ALUZINCO } from "@/content/vedacap";

interface PorQueAluzincoProps {
  /** Foto REAL do Vedacap. Sem foto, os argumentos ocupam a largura toda (nada de render de estrutura aqui). */
  foto?: { src: string; width: number; height: number; blurDataURL?: string };
}

/**
 * Seção "por-que-aluzinco": os 4 argumentos do roteiro em placas numeradas
 * (navy) e, ao lado, a foto real do Vedacap quando existir. O render do mini trilho
 * saiu a pedido do Pedro (10/11/2026): mostrava estrutura, não o produto.
 */
export function PorQueAluzinco({ foto }: PorQueAluzincoProps) {
  return (
    <section
      id="por-que-aluzinco"
      data-linha="vedacap"
      className="bg-superficie py-20 sm:py-28"
    >
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-12">
          <div
            className={foto ? "lg:col-span-7" : "lg:col-span-12 lg:max-w-4xl"}
          >
            <SectionHeading
              eyebrow={VEDACAP_ALUZINCO.eyebrow}
              title={VEDACAP_ALUZINCO.titulo}
              destaque="Mesmo material"
            />
            <ol className="divide-y divide-linha border-y border-linha">
              {VEDACAP_ALUZINCO.argumentos.map((a, i) => (
                <Reveal
                  key={a.titulo}
                  as="li"
                  delay={i * 80}
                  className="grid grid-cols-[3rem_1fr] gap-4 py-5 sm:grid-cols-[4rem_1fr]"
                >
                  <span className="flex h-12 items-center justify-center rounded-xl bg-navy font-mono text-sm font-medium text-branco sm:h-14">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold leading-snug text-branco sm:text-xl">
                      {a.titulo}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-aco sm:text-base">
                      {a.texto}
                    </p>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
          {foto && (
            <Reveal delay={160} className="lg:col-span-5 lg:sticky lg:top-24">
              <figure className="rounded-2xl bg-placa-clara p-2">
                <div className="relative aspect-[4/5] w-full overflow-hidden">
                  <Image
                    src={foto.src}
                    alt={VEDACAP_ALUZINCO.imagemAlt}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    placeholder={foto.blurDataURL ? "blur" : undefined}
                    blurDataURL={foto.blurDataURL}
                    className="object-cover object-center"
                  />
                </div>
                <figcaption className="flex items-center gap-2 px-2 pt-2 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-preto/60">
                  <IconTelha className="size-4 text-navy" />
                  {VEDACAP_ALUZINCO.imagemLegenda}
                </figcaption>
              </figure>
            </Reveal>
          )}
        </div>
      </Container>
    </section>
  );
}
