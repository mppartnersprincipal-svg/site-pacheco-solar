"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { animated, useTransition } from "@react-spring/web";
import type { FiltroObra } from "@/lib/obras";
import { cn } from "@/lib/utils";

export interface FotoGaleria {
  key: string;
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
  tipo: Exclude<FiltroObra, "todas">;
  legenda: string;
}

export interface FiltroGaleria {
  id: FiltroObra;
  label: string;
}

export interface RotulosLightbox {
  fechar: string;
  anterior: string;
  proxima: string;
  rotulo: string;
}

interface GaleriaObrasProps {
  fotos: FotoGaleria[];
  filtros: FiltroGaleria[];
  rotuloFiltros: string;
  rotuloLista: string;
  lightbox: RotulosLightbox;
  className?: string;
}

/**
 * Galeria filtrável (chips aria-pressed) em masonry por CSS columns, cards
 * chanfrados com legenda mono e lightbox em <dialog> nativo (Esc, clique no
 * backdrop, foco devolvido ao card). Troca de filtro com crossfade/scale.
 */
export function GaleriaObras({ fotos, filtros, rotuloFiltros, rotuloLista, lightbox, className }: GaleriaObrasProps) {
  const [filtro, setFiltro] = useState<FiltroObra>("todas");
  const [aberta, setAberta] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const origemRef = useRef<HTMLButtonElement | null>(null);

  const visiveis = filtro === "todas" ? fotos : fotos.filter((f) => f.tipo === filtro);

  const grades = useTransition(filtro, {
    from: { opacity: 0, transform: "scale(0.98)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(0.98)" },
    config: { tension: 220, friction: 26 },
    exitBeforeEnter: true,
  });

  // Sincroniza o <dialog> com o estado
  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (aberta !== null && !d.open) d.showModal();
    if (aberta === null && d.open) d.close();
  }, [aberta]);

  const abrir = (idx: number, origem: HTMLButtonElement) => {
    origemRef.current = origem;
    setAberta(idx);
  };

  const fechar = () => {
    setAberta(null);
    origemRef.current?.focus();
  };

  const mover = (delta: number) => {
    if (aberta === null || visiveis.length === 0) return;
    setAberta((visiveis.length + aberta + delta) % visiveis.length);
  };

  const atual = aberta !== null ? visiveis[aberta] : null;

  return (
    <div className={className}>
      <div role="group" aria-label={rotuloFiltros} className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {filtros.map((f) => {
          const ativo = f.id === filtro;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={ativo}
              onClick={() => {
                setFiltro(f.id);
                setAberta(null);
              }}
              className={cn(
                "inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-xl border px-4 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
                ativo ? "border-laranja bg-laranja text-preto" : "border-linha bg-transparent text-aco hover:border-aco hover:text-branco"
              )}
            >
              <span aria-hidden className={cn("size-1.5 rounded-full", ativo ? "bg-preto/60" : "bg-laranja")} />
              {f.label}
            </button>
          );
        })}
      </div>

      <div className="relative mt-8">
        {grades((style, id) => {
          const lista = id === "todas" ? fotos : fotos.filter((f) => f.tipo === id);
          return (
            <animated.ul style={style} className="columns-2 gap-3 will-change-transform sm:columns-3 sm:gap-4" aria-label={rotuloLista}>
              {lista.map((f, i) => (
                <li key={f.key} className="mb-3 break-inside-avoid sm:mb-4">
                  <button
                    type="button"
                    onClick={(e) => abrir(i, e.currentTarget)}
                    aria-label={`${lightbox.rotulo}: ${f.legenda}`}
                    className="group relative block w-full cursor-zoom-in rounded-xl overflow-hidden border border-linha bg-superficie text-left transition-colors hover:border-laranja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
                  >
                    <Image
                      src={f.src}
                      alt={f.alt}
                      width={f.width}
                      height={f.height}
                      placeholder={f.blurDataURL ? "blur" : undefined}
                      blurDataURL={f.blurDataURL}
                      sizes="(min-width: 640px) 33vw, 50vw"
                      className="h-auto w-full transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fundo/90 to-transparent px-3 pb-2.5 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">
                      {f.legenda}
                    </span>
                  </button>
                </li>
              ))}
            </animated.ul>
          );
        })}
      </div>

      <dialog
        ref={dialogRef}
        aria-label={lightbox.rotulo}
        data-lenis-prevent
        onClose={fechar}
        onClick={(e) => {
          if (e.target === e.currentTarget) fechar();
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") mover(1);
          if (e.key === "ArrowLeft") mover(-1);
        }}
        className="m-auto max-h-[100dvh] w-full max-w-5xl bg-transparent p-0 text-branco backdrop:bg-fundo/90 backdrop:backdrop-blur-sm"
      >
        {atual ? (
          <figure className="relative flex max-h-[100dvh] flex-col items-center p-4 sm:p-8">
            <div className="relative w-full">
              <Image
                key={atual.key}
                src={atual.src}
                alt={atual.alt}
                width={atual.width}
                height={atual.height}
                sizes="100vw"
                placeholder={atual.blurDataURL ? "blur" : undefined}
                blurDataURL={atual.blurDataURL}
                className="mx-auto max-h-[78dvh] w-auto max-w-full rounded-2xl object-contain"
              />
            </div>
            <figcaption className="mt-4 flex w-full flex-wrap items-center justify-between gap-3 font-mono text-xs uppercase tracking-[0.14em] text-aco">
              <span>{atual.legenda}</span>
              <span className="tabular">
                {String((aberta ?? 0) + 1).padStart(2, "0")} / {String(visiveis.length).padStart(2, "0")}
              </span>
            </figcaption>
            <div className="absolute top-4 right-4 flex gap-2 sm:top-8 sm:right-8">
              <button
                type="button"
                onClick={() => mover(-1)}
                aria-label={lightbox.anterior}
                className="flex size-11 cursor-pointer items-center justify-center border border-linha bg-fundo/80 text-branco transition-colors hover:border-laranja hover:text-laranja-texto focus-visible:outline-2 focus-visible:outline-azul-idv"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={() => mover(1)}
                aria-label={lightbox.proxima}
                className="flex size-11 cursor-pointer items-center justify-center border border-linha bg-fundo/80 text-branco transition-colors hover:border-laranja hover:text-laranja-texto focus-visible:outline-2 focus-visible:outline-azul-idv"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={fechar}
                aria-label={lightbox.fechar}
                autoFocus
                className="flex size-11 cursor-pointer items-center justify-center bg-laranja text-preto transition-colors hover:bg-laranja-hover focus-visible:outline-2 focus-visible:outline-azul-idv"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
          </figure>
        ) : null}
      </dialog>
    </div>
  );
}
