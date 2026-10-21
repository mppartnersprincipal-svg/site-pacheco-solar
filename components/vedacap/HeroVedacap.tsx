import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { WaButton } from "@/components/cta/WaButton";
import { VedacapCorte } from "@/components/vedacap/VedacapCorte";
import { VEDACAP_HERO } from "@/content/vedacap";
import { VEDACAP } from "@/lib/produtos/catalogo";

interface HeroVedacapProps {
  logo: { src: string; width: number; height: number; blurDataURL?: string };
}

/**
 * Hero do Vedacap: fundo navy com brilho "aluzinco" sutil, logo branco (só
 * sobre navy), h1 semântico com o nome do produto (sr-only) + headline
 * visual, placas e o corte transversal interativo.
 */
export function HeroVedacap({ logo }: HeroVedacapProps) {
  const placaVariant = (p: string) => (p === "Novo" ? "laranja" : p === "Aluzinco" ? "clara" : "contorno");
  return (
    <section id="hero-vedacap" data-linha="vedacap" className="relative overflow-hidden bg-navy grade-modulos">
      <div aria-hidden className="pointer-events-none absolute -top-24 right-[-8%] size-[28rem] rounded-full aluzinco opacity-[0.14] blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -bottom-32 left-[-10%] size-[22rem] rounded-full aluzinco opacity-[0.08] blur-3xl" />
      <Container className="relative grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <Image
              src={logo.src}
              alt={VEDACAP_HERO.logoAlt}
              width={logo.width}
              height={logo.height}
              priority
              sizes="140px"
              placeholder={logo.blurDataURL ? "blur" : undefined}
              blurDataURL={logo.blurDataURL}
              className="h-auto w-[120px] sm:w-[140px]"
            />
          </Reveal>
          <Reveal delay={60}>
            <p className="mt-6 mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-branco/80">{VEDACAP_HERO.eyebrow}</p>
          </Reveal>
          <Reveal delay={120}>
            <h1 className="max-w-2xl font-display text-4xl font-bold leading-[1.02] text-branco sm:text-5xl lg:text-6xl">
              <span className="sr-only">{VEDACAP_HERO.nomeSrOnly}</span>
              {VEDACAP_HERO.headline}
            </h1>
          </Reveal>
          <Reveal delay={180}>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-branco/80 sm:text-lg">{VEDACAP_HERO.sub}</p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-6 flex flex-wrap gap-2">
              {VEDACAP_HERO.placas.map((p) => (
                <PlacaIdentificacao key={p} size="sm" variant={placaVariant(p)}>
                  {p}
                </PlacaIdentificacao>
              ))}
            </div>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-8">
              <WaButton linha="vedacap" ctaId="hero-vedacap" posicao="hero">
                {VEDACAP_HERO.cta}
              </WaButton>
            </div>
          </Reveal>
        </div>
        <Reveal delay={220} className="lg:col-span-6">
          <VedacapCorte
            versoes={VEDACAP.versoes}
            rotulos={VEDACAP_HERO.corte.rotulos}
            titulo={VEDACAP_HERO.corte.titulo}
            toggleSem={VEDACAP_HERO.corte.toggleSem}
            toggleCom={VEDACAP_HERO.corte.toggleCom}
            corLabel={VEDACAP_HERO.corte.corLabel}
            legenda={VEDACAP_HERO.corte.legenda}
          />
        </Reveal>
      </Container>
    </section>
  );
}
