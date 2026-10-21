import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { WaButton } from "@/components/cta/WaButton";
import { KITS_HERO } from "@/content/kits";

interface HeroKitsProps {
  render: { src: string; width: number; height: number; blurDataURL?: string };
}

/**
 * Hero de /kits-e-itens-avulsos: mesma anatomia do PageHero (variante render em
 * card claro), mas com id/data-linha na <section> para o botão flutuante e o
 * section_view. Dois CTAs: kit (linha "kit") e avulso (linha "avulso").
 */
export function HeroKits({ render }: HeroKitsProps) {
  return (
    <section id="hero-kits" data-linha="kit" className="relative overflow-hidden bg-fundo grade-modulos">
      <Container className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal imediato>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{KITS_HERO.eyebrow}</p>
          </Reveal>
          <Reveal imediato delay={80}>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">{KITS_HERO.titulo}</h1>
          </Reveal>
          <Reveal imediato delay={160}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-aco sm:text-lg">{KITS_HERO.sub}</p>
          </Reveal>
          <Reveal imediato delay={220}>
            <div className="mt-6 flex flex-wrap gap-2">
              {KITS_HERO.placas.map((p) => (
                <PlacaIdentificacao key={p} size="sm">
                  {p}
                </PlacaIdentificacao>
              ))}
            </div>
          </Reveal>
          <Reveal imediato delay={280}>
            <div className="mt-8 flex flex-wrap gap-3">
              <WaButton linha="kit" ctaId="hero-kits-kit" posicao="hero">
                {KITS_HERO.ctaKit}
              </WaButton>
              <WaButton linha="avulso" ctaId="hero-kits-avulso" posicao="hero" variant="secondary">
                {KITS_HERO.ctaAvulso}
              </WaButton>
            </div>
          </Reveal>
        </div>
        <Reveal imediato delay={200} className="lg:col-span-5">
          <figure className="chanfro bg-placa-clara p-2">
            <Image
              src={render.src}
              alt={KITS_HERO.imagemAlt}
              width={render.width}
              height={render.height}
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              placeholder={render.blurDataURL ? "blur" : undefined}
              blurDataURL={render.blurDataURL}
              className="h-auto w-full"
            />
            <figcaption className="px-2 pt-2 pb-1 font-mono text-[11px] uppercase tracking-[0.16em] text-preto/60">
              {KITS_HERO.legendaRender}
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
