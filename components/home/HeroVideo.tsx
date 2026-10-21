"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { animated, useTrail } from "@react-spring/web";
import { WaButton } from "@/components/cta/WaButton";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Container } from "@/components/ui/Container";
import { buttonClasses } from "@/components/ui/Button";
import { HERO } from "@/content/home";
import { cn } from "@/lib/utils";

export interface FonteVideo {
  mp4: string;
  webm: string;
  poster: string;
  width: number;
  height: number;
}

interface HeroVideoProps {
  /** 9:16 — fundo full-bleed no mobile (<768px) */
  mobile: FonteVideo;
  /** 4:5 — painel emoldurado no desktop */
  desktop: FonteVideo;
}

type Modo = "ssr" | "poster" | "mobile" | "desktop";

const MQ_DESKTOP = "(min-width: 768px)";
const ITENS_TRAIL = 5; // eyebrow → h1 → sub → CTAs → placas

/**
 * Hero da home com o vídeo vertical real (acervo SOLO DUPLA). SSR entrega só os
 * posters (next/image priority = LCP); após montar decide: reduced-motion ou
 * saveData → poster; <768px → vídeo 9:16 de fundo; ≥768px → painel 4:5.
 * Entrada do texto em useTrail (só transform/opacity).
 */
export function HeroVideo({ mobile, desktop }: HeroVideoProps) {
  const [modo, setModo] = useState<Modo>("ssr");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    if (reduce || saveData) {
      setModo("poster");
      return;
    }
    const mq = window.matchMedia(MQ_DESKTOP);
    const aplicar = () => setModo(mq.matches ? "desktop" : "mobile");
    aplicar();
    mq.addEventListener("change", aplicar);
    return () => mq.removeEventListener("change", aplicar);
  }, []);

  const trail = useTrail(ITENS_TRAIL, {
    from: { opacity: 0, transform: "translate3d(0,22px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0,0)" },
    delay: 60,
    config: { tension: 230, friction: 28 },
  });

  return (
    <section id="hero" data-linha="geral" className="relative overflow-hidden bg-fundo grade-modulos">
      {/* Mobile: vídeo/poster 9:16 full-bleed por trás do texto */}
      <div aria-hidden className="absolute inset-0 md:hidden">
        <Image
          src={mobile.poster}
          alt=""
          fill
          priority
          sizes="(max-width: 767px) 100vw, 1px"
          quality={60}
          className="object-cover object-center"
        />
        {modo === "mobile" ? <VideoLoop fonte={mobile} className="absolute inset-0 h-full w-full object-cover object-center" /> : null}
        <div className="absolute inset-0 vinheta" />
        <div className="absolute inset-0 bg-gradient-to-t from-fundo via-fundo/80 to-fundo/20" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pt-28 pb-16 md:grid md:min-h-0 md:grid-cols-12 md:items-center md:gap-10 md:py-20 lg:py-28">
        <div className="md:col-span-7">
          <animated.p style={trail[0]} className="mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-laranja sm:text-xs">
            {HERO.eyebrow}
          </animated.p>
          <animated.h1 style={trail[1]} className="max-w-3xl font-display text-[2.5rem] font-bold leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
            {HERO.titulo}
          </animated.h1>
          <animated.p style={trail[2]} className="mt-5 max-w-2xl text-base leading-relaxed text-branco/85 sm:text-lg">
            {HERO.subtitulo}
          </animated.p>
          <animated.div style={trail[3]} className="mt-8 flex flex-wrap items-center gap-3">
            <WaButton ctaId="hero-primario" posicao="hero" linha="geral">
              {HERO.ctaPrimario}
            </WaButton>
            <TrackedLink
              href={HERO.ctaSecundarioHref}
              ctaId="hero-secundario"
              track={{ kind: "nav", destino: HERO.ctaSecundarioHref }}
              className={buttonClasses("secondary", "lg")}
            >
              {HERO.ctaSecundario}
              <ArrowDown className="size-4" aria-hidden />
            </TrackedLink>
          </animated.div>
          <animated.div style={trail[4]} className="mt-8">
            <ul className="flex flex-wrap gap-2" aria-label="Diferenciais">
              {HERO.placas.map((p) => (
                <li key={p}>
                  <PlacaIdentificacao size="sm">{p}</PlacaIdentificacao>
                </li>
              ))}
            </ul>
            <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-aco">
              {HERO.microcopy.horario} ·{" "}
              <TrackedLink
                href={`tel:${HERO.microcopy.telefoneE164}`}
                ctaId="hero-telefone"
                track={{ kind: "phone", phone: HERO.microcopy.telefone }}
                className="inline-flex min-h-11 items-center text-branco underline-offset-4 hover:text-laranja hover:underline"
              >
                {HERO.microcopy.telefone}
              </TrackedLink>
            </p>
          </animated.div>
        </div>

        {/* Desktop: painel 4:5 emoldurado em chapa chanfrada */}
        <div className="hidden md:col-span-5 md:block">
          <figure className="relative mx-auto max-w-[420px] lg:max-w-none">
            <div className="chanfro border border-linha bg-chapa p-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-superficie">
                <Image
                  src={desktop.poster}
                  alt={HERO.videoAria}
                  fill
                  priority
                  sizes="(min-width: 1280px) 440px, (min-width: 768px) 40vw, 1px"
                  quality={75}
                  className="object-cover"
                />
                {modo === "desktop" ? <VideoLoop fonte={desktop} className="absolute inset-0 h-full w-full object-cover" /> : null}
                <div aria-hidden className="absolute inset-0 vinheta opacity-60" />
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-aco">
              <span>{HERO.legendaVideo}</span>
              <span aria-hidden className="h-px flex-1 mx-4 bg-linha" />
              <span className="text-laranja">● REC</span>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}

/** <video> mudo em loop com fade-in quando consegue tocar; só é montado no cliente. */
function VideoLoop({ fonte, className }: { fonte: FonteVideo; className?: string }) {
  const [pronto, setPronto] = useState(false);
  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={fonte.poster}
      width={fonte.width}
      height={fonte.height}
      aria-label={HERO.videoAria}
      onCanPlayThrough={() => setPronto(true)}
      onPlaying={() => setPronto(true)}
      className={cn("transition-opacity duration-700", pronto ? "opacity-100" : "opacity-0", className)}
    >
      <source src={fonte.mp4} type="video/mp4" />
      <source src={fonte.webm} type="video/webm" />
    </video>
  );
}
