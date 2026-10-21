"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Foto = { src: string; width: number; height: number; blurDataURL?: string; alt: string };

/**
 * Slider antes/depois com o "cabo" em forma de estaca. Só transform/clip-path;
 * acessível por teclado (role=slider, setas) e com fallback lado a lado se as
 * fotos tiverem proporções diferentes (`ladoALado`).
 */
export function AntesDepoisEstaca({
  antes,
  depois,
  legenda,
  ladoALado = false,
  className,
}: {
  antes: Foto;
  depois: Foto;
  legenda?: string;
  ladoALado?: boolean;
  className?: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  if (ladoALado) {
    return (
      <figure className={cn("grid gap-3 sm:grid-cols-2", className)}>
        {[antes, depois].map((f, i) => (
          <div key={i} className="relative chanfro overflow-hidden bg-superficie">
            <Image src={f.src} alt={f.alt} width={f.width} height={f.height} quality={60} placeholder={f.blurDataURL ? "blur" : undefined} blurDataURL={f.blurDataURL} sizes="(min-width: 640px) 50vw, 100vw" className="h-full w-full object-cover" />
            <span className="absolute top-3 left-3 bg-fundo/80 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">{i === 0 ? "Antes" : "Depois"}</span>
          </div>
        ))}
        {legenda ? <figcaption className="font-mono text-xs uppercase tracking-[0.14em] text-aco sm:col-span-2">{legenda}</figcaption> : null}
      </figure>
    );
  }

  const update = (clientX: number) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };

  return (
    <figure className={className}>
      <div
        ref={ref}
        className="relative aspect-[3/2] w-full touch-pan-y select-none chanfro overflow-hidden bg-superficie"
        onPointerDown={(e) => {
          (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
          update(e.clientX);
        }}
        onPointerMove={(e) => e.buttons === 1 && update(e.clientX)}
      >
        <Image src={depois.src} alt={depois.alt} fill quality={60} sizes="(min-width: 1024px) 60vw, 100vw" placeholder={depois.blurDataURL ? "blur" : undefined} blurDataURL={depois.blurDataURL} className="object-cover" />
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Image src={antes.src} alt={antes.alt} fill quality={60} sizes="(min-width: 1024px) 60vw, 100vw" placeholder={antes.blurDataURL ? "blur" : undefined} blurDataURL={antes.blurDataURL} className="object-cover" />
        </div>
        <span className="absolute top-3 left-3 bg-fundo/80 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">Antes</span>
        <span className="absolute top-3 right-3 bg-fundo/80 px-2 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">Depois</span>
        {/* Estaca (handle) */}
        <div aria-hidden className="absolute inset-y-0 w-0.5 bg-laranja" style={{ left: `${pos}%` }}>
          <span className="absolute top-1/2 left-1/2 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-laranja text-preto shadow-lg shadow-black/40">
            <span className="font-mono text-xs font-bold">◂▸</span>
          </span>
        </div>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label="Comparar antes e depois"
          className="absolute inset-x-0 bottom-0 h-8 w-full cursor-ew-resize opacity-0"
        />
      </div>
      {legenda ? <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-aco">{legenda}</figcaption> : null}
    </figure>
  );
}
