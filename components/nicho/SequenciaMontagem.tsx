"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { animated, useInView, useTransition } from "@react-spring/web";
import { cn } from "@/lib/utils";

type Etapa = { src: string; width: number; height: number; blurDataURL?: string; alt: string; etapa: string };

/**
 * Scrubber de etapas (estacas → perfis → módulos): botões com aria-pressed,
 * crossfade com useTransition, auto-avanço a cada 4 s só enquanto visível e
 * sem reduced-motion.
 */
export function SequenciaMontagem({ etapas, className }: { etapas: Etapa[]; className?: string }) {
  const [i, setI] = useState(0);
  const [ref, inView] = useInView({ amount: 0.5 });

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setInterval(() => setI((x) => (x + 1) % etapas.length), 4000);
    return () => window.clearInterval(t);
  }, [inView, etapas.length]);

  const transitions = useTransition(i, {
    from: { opacity: 0, transform: "translate3d(12px,0,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(-12px,0,0)" },
    config: { tension: 220, friction: 26 },
    exitBeforeEnter: true,
  });

  return (
    <div ref={ref} className={cn("grid gap-4", className)}>
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-superficie">
        {transitions((style, idx) => {
          const e = etapas[idx];
          return (
            <animated.div style={style} className="absolute inset-0">
              <Image src={e.src} alt={e.alt} fill quality={60} sizes="(min-width: 1024px) 50vw, 100vw" placeholder={e.blurDataURL ? "blur" : undefined} blurDataURL={e.blurDataURL} className="object-cover" />
            </animated.div>
          );
        })}
      </div>
      <ol className="flex gap-2" aria-label="Etapas da montagem">
        {etapas.map((e, idx) => (
          <li key={e.etapa} className="flex-1">
            <button
              type="button"
              aria-pressed={i === idx}
              onClick={() => setI(idx)}
              className={cn(
                "w-full border-t-2 pt-2 text-left font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus-visible:outline-2 focus-visible:outline-azul-idv",
                i === idx ? "border-laranja text-branco" : "border-linha text-aco hover:text-branco"
              )}
            >
              {String(idx + 1).padStart(2, "0")} · {e.etapa}
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
