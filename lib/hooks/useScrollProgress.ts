"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Progresso (0→1) de um elemento atravessando a viewport: 0 quando o topo
 * entra pela base da tela, 1 quando a base sai pelo topo. Scroll listener +
 * requestAnimationFrame; desligado em telas < `minWidth` ou reduced-motion
 * (devolve `enabled=false` e progresso 1 = estado final).
 */
export function useScrollProgress<T extends HTMLElement>(minWidth = 1024) {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const wide = window.innerWidth >= minWidth;
    if (reduce || !wide) {
      setEnabled(false);
      setProgress(1);
      return;
    }
    setEnabled(true);
    let scheduled = false;
    const measure = () => {
      scheduled = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const total = r.height + vh;
      const p = (vh - r.top) / total;
      setProgress(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [minWidth]);

  return { ref, progress, enabled };
}
