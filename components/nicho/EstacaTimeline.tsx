"use client";

import { animated, useInView, useSpring, useTrail } from "@react-spring/web";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

export type Passo = { numero?: string; titulo: string; texto?: string };

/**
 * Linha do tempo/processo desenhada como elevação de estrutura de solo:
 * estacas verticais unidas por um perfil que se preenche de laranja conforme
 * o scroll (desktop) — no mobile é vertical e só com reveal.
 */
export function EstacaTimeline({ passos, className }: { passos: Passo[]; className?: string }) {
  const { ref, progress, enabled } = useScrollProgress<HTMLOListElement>(1024);
  const [inRef, inView] = useInView({ once: true, amount: 0.2 });
  const trail = useTrail(passos.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
    config: { tension: 210, friction: 26 },
  });
  const barra = useSpring({
    transform: `scaleX(${enabled ? Math.min(1, Math.max(0, (progress - 0.2) / 0.5)) : 1})`,
    config: { tension: 120, friction: 30 },
  });

  return (
    <div ref={inRef} className={cn("relative", className)}>
      {/* Perfil horizontal (desktop) */}
      <div aria-hidden className="absolute top-3 right-0 left-0 hidden h-0.5 bg-linha lg:block">
        <animated.div style={barra} className="h-full origin-left bg-laranja" />
      </div>
      {/* Perfil vertical (mobile) */}
      <div aria-hidden className="absolute top-0 bottom-0 left-3 w-0.5 bg-linha lg:hidden">
        <div className="h-full w-full bg-laranja" />
      </div>
      <ol ref={ref} className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
        {trail.map((style, i) => {
          const p = passos[i];
          return (
            <animated.li key={p.titulo} style={style} className="relative pl-10 lg:pl-0 lg:pt-10">
              {/* Estaca */}
              <span aria-hidden className="absolute top-0 left-0 flex size-6 items-center justify-center lg:left-0">
                <span className="size-6 rounded-full border-2 border-laranja bg-fundo" />
              </span>
              <span className="font-mono text-xs text-laranja">{p.numero ?? String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-1 font-display text-lg font-semibold text-branco">{p.titulo}</h3>
              {p.texto ? <p className="mt-2 text-sm leading-relaxed text-aco">{p.texto}</p> : null}
            </animated.li>
          );
        })}
      </ol>
    </div>
  );
}
