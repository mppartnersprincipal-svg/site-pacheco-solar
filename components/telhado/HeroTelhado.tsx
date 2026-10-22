import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { WaButton } from "@/components/cta/WaButton";
import { IsopletaGrafismo } from "@/components/telhado/IsopletaGrafismo";
import { HERO_TELHADO, TELHADO_META } from "@/content/telhado";
import { imageProps } from "@/lib/media";

/**
 * Hero da Linha Titan: mesmo layout do <PageHero render> (texto 7/5 + render em
 * card claro), mas com id/data-linha na <section> (botão flutuante e section_view)
 * e a isopleta como grafismo de fundo — o PageHero não expõe esses pontos.
 */
export function HeroTelhado() {
  const render = imageProps(TELHADO_META.imagem, TELHADO_META.imagemAlt);
  return (
    <section id="hero-telhado" data-linha="telhado" className="relative overflow-hidden bg-fundo grade-modulos">
      <IsopletaGrafismo className="absolute right-0 bottom-0 h-[70%] w-full max-w-[1400px] lg:h-full" />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-fundo via-fundo/70 to-transparent" />
      <Container className="relative grid items-center gap-10 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal imediato>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{HERO_TELHADO.eyebrow}</p>
          </Reveal>
          <Reveal imediato delay={80}>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">{HERO_TELHADO.titulo}</h1>
          </Reveal>
          <Reveal imediato delay={160}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-aco sm:text-lg">{HERO_TELHADO.subtitulo}</p>
          </Reveal>
          <Reveal imediato delay={220}>
            <div className="mt-6 flex flex-wrap gap-2">
              {HERO_TELHADO.placas.map((p, i) => (
                <PlacaIdentificacao key={p} size="sm" variant={i === HERO_TELHADO.placas.length - 1 ? "navy" : "contorno"}>
                  {p}
                </PlacaIdentificacao>
              ))}
            </div>
          </Reveal>
          <Reveal imediato delay={280}>
            <div className="mt-8 flex flex-wrap gap-3">
              <WaButton linha="telhado" ctaId="hero-telhado" posicao="hero">
                {HERO_TELHADO.cta}
              </WaButton>
            </div>
          </Reveal>
        </div>
        <Reveal imediato delay={200} className="lg:col-span-5">
          <figure className="rounded-2xl bg-placa-clara p-2">
            <Image {...render} alt={render.alt} priority sizes="(min-width: 1024px) 40vw, 100vw" className="h-auto w-full" />
            <figcaption className="px-2 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-preto/60">
              Linha Titan · Telhado metálico · Render
            </figcaption>
          </figure>
        </Reveal>
      </Container>
    </section>
  );
}
