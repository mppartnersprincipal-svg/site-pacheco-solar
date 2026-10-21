"use client";

import Link from "next/link";
import { animated, useInView, useTrail } from "@react-spring/web";
import { IconGrampo } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ParDorSolucao = { dor: string; solucao: string; detalhe?: string; href?: string };

/**
 * Mapa dor → solução em um trilho vertical: à esquerda a dor (riscada ao
 * resolver), no centro um grampo que "fecha", à direita a solução.
 */
export function TrilhoDorSolucao({ pares, className }: { pares: ParDorSolucao[]; className?: string }) {
  const [ref, inView] = useInView({ once: true, amount: 0.2 });
  const trail = useTrail(pares.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(-16px,0,0)",
    config: { tension: 260, friction: 24 },
  });

  return (
    <ol ref={ref} className={cn("relative", className)}>
      <div aria-hidden className="absolute top-0 bottom-0 left-4 w-0.5 bg-linha sm:left-1/2 sm:-translate-x-1/2">
        <div className={cn("w-full origin-top bg-laranja transition-transform duration-1000 ease-out", inView ? "h-full scale-y-100" : "h-full scale-y-0")} />
      </div>
      {trail.map((style, i) => {
        const p = pares[i];
        return (
          <animated.li key={p.dor} style={style} className="relative grid gap-3 py-6 pl-12 sm:grid-cols-2 sm:gap-10 sm:pl-0">
            <span aria-hidden className="absolute top-7 left-4 flex -translate-x-1/2 items-center justify-center bg-fundo p-1 sm:left-1/2">
              <IconGrampo className={cn("size-6 text-laranja transition-transform duration-500", inView ? "scale-100" : "scale-50")} />
            </span>
            <div className="sm:pr-14 sm:text-right">
              <span className="font-mono text-xs text-aco">{String(i + 1).padStart(2, "0")}</span>
              <p className={cn("mt-1 font-display text-lg text-aco transition-[text-decoration-color] duration-700", inView && "line-through decoration-laranja/70")}>
                {p.dor}
              </p>
            </div>
            <div className="sm:pl-14">
              <p className="font-display text-xl font-semibold text-branco">
                {p.href ? (
                  <Link href={p.href} className="underline-offset-4 hover:text-laranja hover:underline">
                    {p.solucao}
                  </Link>
                ) : (
                  p.solucao
                )}
              </p>
              {p.detalhe ? <p className="mt-1 text-sm leading-relaxed text-aco">{p.detalhe}</p> : null}
            </div>
          </animated.li>
        );
      })}
    </ol>
  );
}
