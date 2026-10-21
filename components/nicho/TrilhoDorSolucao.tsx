"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { animated, useSpring, useSprings } from "@react-spring/web";
import { IconGrampo } from "@/components/icons";
import { cn } from "@/lib/utils";

export type ParDorSolucao = { dor: string; solucao: string; detalhe?: string; href?: string };

/** Fração da altura da viewport onde fica a "linha de leitura" que ativa cada par. */
const LINHA_DE_LEITURA = 0.62;

/**
 * Mapa dor → solução dirigido pelo scroll: o trilho laranja cresce conforme a
 * página desce e cada par "fecha" (grampo aparece, dor é riscada, solução entra)
 * quando cruza a linha de leitura — e reabre ao voltar. Só transform/opacity;
 * scroll listener com requestAnimationFrame. Sob prefers-reduced-motion fica
 * tudo no estado final.
 */
export function TrilhoDorSolucao({ pares, className }: { pares: ParDorSolucao[]; className?: string }) {
  const listRef = useRef<HTMLOListElement>(null);
  const itemRefs = useRef<Array<HTMLLIElement | null>>([]);
  const [fill, setFill] = useState(0);
  const [ativos, setAtivos] = useState<boolean[]>(() => pares.map(() => false));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const raf = requestAnimationFrame(() => {
        setFill(1);
        setAtivos(pares.map(() => true));
      });
      return () => cancelAnimationFrame(raf);
    }
    let scheduled = false;
    const measure = () => {
      scheduled = false;
      const linha = window.innerHeight * LINHA_DE_LEITURA;
      const r = list.getBoundingClientRect();
      setFill(Math.min(1, Math.max(0, (linha - r.top) / r.height)));
      setAtivos(
        itemRefs.current.map((el) => {
          if (!el) return false;
          const ir = el.getBoundingClientRect();
          return ir.top + ir.height * 0.45 < linha;
        })
      );
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pares]);

  const trilho = useSpring({ transform: `scaleY(${fill})`, config: { tension: 170, friction: 26 } });
  const springs = useSprings(
    pares.length,
    pares.map((_, i) => ({
      dorX: ativos[i] ? 0 : -16,
      dorOpacity: ativos[i] ? 1 : 0.35,
      risco: ativos[i] ? 1 : 0,
      grampo: ativos[i] ? 1 : 0.4,
      solX: ativos[i] ? 0 : 24,
      solOpacity: ativos[i] ? 1 : 0,
      delay: ativos[i] ? 60 : 0,
      config: { tension: 240, friction: 24 },
    }))
  );

  return (
    <ol ref={listRef} className={cn("relative", className)}>
      {/* Trilho: fundo apagado + preenchimento laranja que acompanha o scroll */}
      <div aria-hidden className="absolute top-0 bottom-0 left-4 w-0.5 bg-linha sm:left-1/2 sm:-translate-x-1/2">
        <animated.div style={trilho} className="h-full w-full origin-top bg-laranja" />
      </div>
      {pares.map((p, i) => {
        const s = springs[i];
        return (
          <li
            key={p.dor}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            className="relative grid gap-3 py-6 pl-12 sm:grid-cols-2 sm:gap-10 sm:pl-0"
          >
            {/* Grampo que "fecha" no trilho */}
            <animated.span
              aria-hidden
              style={{ transform: s.grampo.to((v) => `translate3d(-50%,0,0) scale(${v})`), opacity: s.grampo.to((v) => 0.3 + v * 0.7) }}
              className="absolute top-7 left-4 flex items-center justify-center bg-fundo p-1 sm:left-1/2"
            >
              <IconGrampo className="size-6 text-laranja" />
            </animated.span>

            {/* Dor (riscada ao resolver) */}
            <animated.div
              style={{ transform: s.dorX.to((x) => `translate3d(${x}px,0,0)`), opacity: s.dorOpacity }}
              className="sm:pr-14 sm:text-right"
            >
              <span className="font-mono text-xs text-aco">{String(i + 1).padStart(2, "0")}</span>
              <p className="relative mt-1 inline-block font-display text-lg text-aco">
                {p.dor}
                <animated.span
                  aria-hidden
                  style={{ transform: s.risco.to((v) => `scaleX(${v})`) }}
                  className="absolute top-1/2 left-0 h-0.5 w-full origin-left bg-laranja/80 sm:origin-right"
                />
              </p>
            </animated.div>

            {/* Solução */}
            <animated.div
              style={{ transform: s.solX.to((x) => `translate3d(${x}px,0,0)`), opacity: s.solOpacity }}
              className="sm:pl-14"
            >
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
            </animated.div>
          </li>
        );
      })}
    </ol>
  );
}
