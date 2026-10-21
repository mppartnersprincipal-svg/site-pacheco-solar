import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { IconGrampo } from "@/components/icons";
import { AMBIENTE_AGRESSIVO } from "@/content/solo";
import { imageProps } from "@/lib/media";

/**
 * "Estrutura barata sai caro." — argumento de material premium para obra rural,
 * com 3 fotos reais de fazenda (1 grande + 2 pequenas chanfradas). Server Component.
 */
export function AmbienteAgressivo() {
  const [principal, ...secundarias] = AMBIENTE_AGRESSIVO.fotos.map((f) => ({ ...imageProps(f.key, f.alt), legenda: f.legenda }));

  return (
    <section id="ambiente-agressivo" data-linha="solo" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow={AMBIENTE_AGRESSIVO.eyebrow}
              title={AMBIENTE_AGRESSIVO.titulo}
              subtitle={AMBIENTE_AGRESSIVO.subtitulo}
              destaque="caro"
              className="mb-8"
            />
            <ul className="divide-y divide-linha border-y border-linha">
              {AMBIENTE_AGRESSIVO.bullets.map((b, i) => (
                <Reveal key={b.titulo} as="li" delay={i * 80} className="flex gap-4 py-5">
                  <span className="mt-1 flex size-8 shrink-0 items-center justify-center border border-laranja/60 text-laranja">
                    <IconGrampo className="size-4" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-branco">{b.titulo}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-aco">{b.texto}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={300} className="mt-8">
              <WaButton linha="solo" ctaId="ambiente-agressivo-fazenda" posicao="ambiente-agressivo">
                {AMBIENTE_AGRESSIVO.cta}
              </WaButton>
            </Reveal>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
            <Reveal className="col-span-2">
              <figure className="relative chanfro overflow-hidden border border-linha bg-fundo">
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src={principal.src}
                    alt={principal.alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    placeholder="blur"
                    blurDataURL={principal.blurDataURL}
                    className="object-cover"
                  />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fundo/90 to-transparent px-4 pb-3 pt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">
                  {principal.legenda}
                </figcaption>
              </figure>
            </Reveal>
            {secundarias.map((f, i) => (
              <Reveal key={f.src} delay={120 + i * 80}>
                <figure className="relative chanfro-sm overflow-hidden border border-linha bg-fundo">
                  <div className="relative aspect-[4/5] w-full">
                    <Image src={f.src} alt={f.alt} fill sizes="(min-width: 1024px) 28vw, 50vw" placeholder="blur" blurDataURL={f.blurDataURL} className="object-cover" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fundo/90 to-transparent px-3 pb-3 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">
                    {f.legenda}
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
