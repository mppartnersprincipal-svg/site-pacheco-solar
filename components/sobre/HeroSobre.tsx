import { PageHero } from "@/components/ui/PageHero";
import { WaButton } from "@/components/cta/WaButton";
import { img } from "@/lib/media";
import { SOBRE_HERO } from "@/content/sobre";

/**
 * Hero de /sobre: foto real de obra (solo dupla) ao fundo até existir a foto
 * do Lucas no acervo (pendência em content/sobre.ts). Overlay só na área de texto.
 * A <section> externa leva id + data-linha (PageHero não expõe esses atributos);
 * o IntersectionObserver do botão flutuante e o section_view leem essa section.
 */
export function HeroSobre() {
  const foto = img("solo-dupla/img-3963");
  return (
    <section id="hero-sobre" data-linha="equipe" aria-label={SOBRE_HERO.titulo}>
      <PageHero
        eyebrow={SOBRE_HERO.eyebrow}
        title={SOBRE_HERO.titulo}
        subtitle={SOBRE_HERO.subtitulo}
        image={{ src: foto.src, width: foto.width, height: foto.height, blurDataURL: foto.blurDataURL }}
        imageAlt={SOBRE_HERO.fotoAlt}
        imagePosition="70% 40%"
        placas={SOBRE_HERO.placas}
      >
        <WaButton linha="equipe" ctaId="hero-sobre" posicao="hero-sobre">
          {SOBRE_HERO.cta}
        </WaButton>
      </PageHero>
    </section>
  );
}
