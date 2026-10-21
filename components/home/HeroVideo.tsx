"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown } from "lucide-react";
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
/** Folga após o evento load antes de montar o vídeo do hero */
const ATRASO_VIDEO_MS = 800;
/** Stagger da primeira dobra (eyebrow → h1 → sub → CTAs → placas) em @keyframes CSS: o HTML já chega visível. */
const ENTRADA = [0, 60, 120, 180, 240].map((ms) => ({ animationDelay: `${ms}ms` }));

/**
 * Hero da home com o vídeo vertical real (acervo SOLO DUPLA). SSR entrega só os
 * posters (next/image priority = LCP); após montar decide: reduced-motion ou
 * saveData → poster; <768px → vídeo 9:16 de fundo; ≥768px → painel 4:5.
 * Entrada do texto por CSS (animate-entrada, só transform/opacity) — nada fica
 * com opacity 0 à espera da hidratação.
 */
export function HeroVideo({ mobile, desktop }: HeroVideoProps) {
  const [modo, setModo] = useState<Modo>("ssr");
  /** O <video> (1,5 MB) só entra depois do load da página + folga, para não disputar banda com o poster (LCP). */
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
        {modo === "mobile" && videoLiberado ? <VideoLoop fonte={mobile} className="absolute inset-0 h-full w-full object-cover object-center" /> : null}
        <div className="absolute inset-0 vinheta" />
        <div className="absolute inset-0 bg-gradient-to-t from-fundo via-fundo/80 to-fundo/20" />
      </div>

      <Container className="relative flex min-h-[calc(100svh-4rem)] flex-col justify-end pt-28 pb-16 md:grid md:min-h-0 md:grid-cols-12 md:items-center md:gap-10 md:py-20 lg:py-28">
        <div className="md:col-span-7">
          <p style={ENTRADA[0]} className="animate-entrada mb-4 font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-laranja-texto sm:text-xs">
            {HERO.eyebrow}
          </p>
          <h1 style={ENTRADA[1]} className="animate-entrada max-w-3xl font-display text-[2.5rem] font-bold leading-[1.02] sm:text-5xl lg:text-6xl xl:text-7xl">
            {HERO.titulo}
          </h1>
          <p style={ENTRADA[2]} className="animate-entrada mt-5 max-w-2xl text-base leading-relaxed text-branco/85 sm:text-lg">
            {HERO.subtitulo}
          </p>
          <div style={ENTRADA[3]} className="animate-entrada mt-8 flex flex-wrap items-center gap-3">
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
          <div style={ENTRADA[4]} className="animate-entrada mt-8">
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
                className="inline-flex min-h-11 items-center text-branco underline-offset-4 hover:text-laranja-texto hover:underline"
              >
                {HERO.microcopy.telefone}
              </TrackedLink>
            </p>
          </div>
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
                {modo === "desktop" && videoLiberado ? <VideoLoop fonte={desktop} className="absolute inset-0 h-full w-full object-cover" /> : null}
                <div aria-hidden className="absolute inset-0 vinheta opacity-60" />
              </div>
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.16em] text-aco">
              <span>{HERO.legendaVideo}</span>
              <span aria-hidden className="h-px flex-1 mx-4 bg-linha" />
              <span className="text-laranja-texto">● REC</span>
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
