"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scroll (Lenis) no window. Como o Lenis rola a própria janela, os
 * listeners nativos de scroll (header, profundidade de scroll) continuam
 * funcionando. `anchors: true` trata os links #id (deep-links do seletor de
 * telhado) com offset do header fixo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const lenis = new Lenis({
      autoRaf: true,
      lerp: reduce ? 1 : 0.1,
      smoothWheel: !reduce,
      anchors: { offset: -88 },
    });
    return () => lenis.destroy();
  }, []);
  return null;
}
