"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { trackVideoPlay } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export type Clipe = { id: string; legenda: string; mp4: string; webm: string; poster: string; width: number; height: number };

/**
 * Faixa horizontal de clipes reais (9:16, mudos, preload none). No desktop um
 * IntersectionObserver dá play em quem está ≥ 60% visível (máx. 2 tocando);
 * no mobile ou com saveData/reduced-motion, toque-para-tocar com poster.
 */
export function GaleriaEmCampo({ clipes, className }: { clipes: Clipe[]; className?: string }) {
  const [auto, setAuto] = useState(false);
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
    setAuto(window.innerWidth >= 768 && !reduce && !saveData);
  }, []);

  return (
    <ul className={cn("scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0", className)}>
      {clipes.map((c) => (
        <li key={c.id} className="w-[62vw] shrink-0 snap-start sm:w-64 lg:w-72">
          <ClipeEmCampo clipe={c} auto={auto} />
        </li>
      ))}
    </ul>
  );
}

const MAX_TOCANDO = 2;
let tocando = 0;

function ClipeEmCampo({ clipe, auto }: { clipe: Clipe; auto: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [reported, setReported] = useState(false);

  const report = (trigger: "auto" | "tap") => {
    if (reported) return;
    setReported(true);
    trackVideoPlay({ video_id: clipe.id, trigger });
  };

  useEffect(() => {
    const el = ref.current;
    if (!el || !auto) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
          if (tocando >= MAX_TOCANDO || playing) return;
          tocando++;
          el.play().then(() => {
            setPlaying(true);
            report("auto");
          }).catch(() => {
            tocando--;
          });
        } else if (playing) {
          el.pause();
          tocando = Math.max(0, tocando - 1);
          setPlaying(false);
        }
      },
      { threshold: [0, 0.6] }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (playing) tocando = Math.max(0, tocando - 1);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auto, playing]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => {
        setPlaying(true);
        report("tap");
      }).catch(() => {});
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <figure className="group relative chanfro-sm overflow-hidden bg-superficie">
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="none"
        poster={clipe.poster}
        width={clipe.width}
        height={clipe.height}
        className="aspect-[9/16] w-full object-cover"
        aria-label={clipe.legenda}
      >
        <source src={clipe.mp4} type="video/mp4" />
        <source src={clipe.webm} type="video/webm" />
      </video>
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? `Pausar: ${clipe.legenda}` : `Reproduzir: ${clipe.legenda}`}
        className={cn(
          "absolute inset-0 flex items-center justify-center bg-fundo/20 transition-opacity focus-visible:outline-2 focus-visible:outline-azul-idv",
          playing ? "opacity-0 hover:opacity-100" : "opacity-100"
        )}
      >
        <span className="flex size-14 items-center justify-center rounded-full bg-laranja text-preto shadow-lg shadow-black/40">
          <Play className="ml-0.5 size-6" aria-hidden />
        </span>
      </button>
      <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fundo/90 to-transparent px-3 pb-3 pt-10 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">
        {clipe.legenda}
      </figcaption>
    </figure>
  );
}
