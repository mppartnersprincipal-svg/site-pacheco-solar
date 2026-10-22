"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
import { WaButton } from "@/components/cta/WaButton";
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
  /** 16:9 1280×720 — telas ≥ 768px */
  hero: FonteVideo;
  /** 16:9 854×480 — telas < 768px */
  heroMobile: FonteVideo;
}

type Modo = "ssr" | "poster" | "mobile" | "desktop";

const MQ_DESKTOP = "(min-width: 768px)";
/** Folga após o evento load antes de montar o vídeo do hero */
const ATRASO_VIDEO_MS = 800;
/** Stagger da primeira dobra (eyebrow → h1 → sub → CTAs) em @keyframes CSS: o HTML já chega visível. */
const ENTRADA = [0, 60, 120, 180].map((ms) => ({ animationDelay: `${ms}ms` }));

/**
 * Hero da home: vídeo institucional 16:9 em loop atrás do texto (desktop e
 * mobile), com o gradiente do hero por cima. O servidor entrega só o poster
 * (next/image priority = LCP); após montar decide: reduced-motion ou saveData →
 * poster; senão escolhe a fonte pelo breakpoint e monta o <video> 800 ms depois
 * do load. Entrada do texto por CSS (animate-entrada, só transform/opacity).
 */
export function HeroVideo({ hero, heroMobile }: HeroVideoProps) {
  const [modo, setModo] = useState<Modo>("ssr");
  const [videoLiberado, setVideoLiberado] = useState(false);

  useEffect(() => {
    let timer = 0;
    const liberar = () => {
      timer = window.setTimeout(() => setVideoLiberado(true), ATRASO_VIDEO_MS);
    };
    if (document.readyState === "complete") liberar();
    else window.addEventListener("load", liberar, { once: true });
    return () => {
      window.removeEventListener("load", liberar);
      window.clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    const mq = window.matchMedia(MQ_DESKTOP);
    const aplicar = () => setModo(reduce || saveData ? "poster" : mq.matches ? "desktop" : "mobile");
    // Decisão após a hidratação (um frame), nunca síncrona dentro do efeito
    const raf = requestAnimationFrame(aplicar);
    mq.addEventListener("change", aplicar);
    return () => {
      cancelAnimationFrame(raf);
      mq.removeEventListener("change", aplicar);
    };
  }, []);

  const fonte = modo === "mobile" ? heroMobile : modo === "desktop" ? hero : null;
  const [antes, depois] = dividirTitulo(HERO.titulo, HERO.tituloDestaque);

  return (
    <section id="hero" data-linha="geral" className="relative overflow-hidden bg-tinta">
      {/* Fundo: poster (LCP) → vídeo em loop, com o gradiente do hero por cima */}
      <div aria-hidden className="absolute inset-0">
        <Image src={hero.poster} alt="" fill priority sizes="100vw" quality={75} className="object-cover object-center" />
        {fonte && videoLiberado ? <VideoLoop key={fonte.mp4} fonte={fonte} className="absolute inset-0 h-full w-full object-cover object-center" /> : null}
        <div className="absolute inset-0 gradiente-hero" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-fundo to-transparent" />
      </div>

      <Container className="relative flex min-h-[calc(88svh-4rem)] flex-col justify-center py-24 sm:py-32 lg:min-h-[calc(92svh-4.5rem)]">
        <div className="max-w-3xl">
          <p style={ENTRADA[0]} className="animate-entrada mb-5 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-laranja-texto">
            {HERO.eyebrow}
          </p>
          <h1 style={ENTRADA[1]} className="animate-entrada font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
            {antes}
            <span className="text-laranja-texto">{depois}</span>
          </h1>
          <p style={ENTRADA[2]} className="animate-entrada mt-6 max-w-xl text-base leading-relaxed text-branco/80 sm:text-lg">
            {HERO.subtitulo}
          </p>
          <div style={ENTRADA[3]} className="animate-entrada mt-9 flex flex-wrap items-center gap-3">
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
          </div>
        </div>
      </Container>
    </section>
  );
}

/** "Estrutura que não te deixa na mão." → ["Estrutura que não te deixa ", "na mão."] */
function dividirTitulo(titulo: string, destaque: string): [string, string] {
  const i = titulo.lastIndexOf(destaque);
  return i < 0 ? [titulo, ""] : [titulo.slice(0, i), titulo.slice(i)];
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
      width={fonte.width}
      height={fonte.height}
      aria-label={HERO.videoAria}
      onCanPlayThrough={() => setPronto(true)}
      onPlaying={() => setPronto(true)}
      className={cn("transition-opacity duration-1000", pronto ? "opacity-100" : "opacity-0", className)}
    >
      <source src={fonte.mp4} type="video/mp4" />
      <source src={fonte.webm} type="video/webm" />
    </video>
  );
}
