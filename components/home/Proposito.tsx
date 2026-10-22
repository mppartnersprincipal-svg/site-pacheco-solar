"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { PROPOSITO_SECAO } from "@/content/home";
import { cn } from "@/lib/utils";

/**
 * Seção 2 — propósito (briefing 360º, literal) em tipografia grande. As palavras
 * "acendem" da esquerda para a direita conforme o bloco atravessa a tela
 * (scroll + requestAnimationFrame, só cor). Sem JS ou com reduced-motion o
 * texto fica todo branco.
 */
export function Proposito() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [progresso, setProgresso] = useState(1);
  const palavras = PROPOSITO_SECAO.texto.split(" ");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let agendado = false;
    const medir = () => {
      agendado = false;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 quando o topo do parágrafo está a 85% da tela, 1 quando a base chega a 35%
      const inicio = vh * 0.85;
      const fim = vh * 0.35;
      const p = (inicio - r.top) / (r.height + inicio - fim);
      setProgresso(Math.min(1, Math.max(0, p)));
    };
    const onScroll = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(medir);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const acesas = Math.round(progresso * palavras.length);

  return (
    <section id="proposito" data-linha="geral" className="relative overflow-hidden bg-fundo">
      <div aria-hidden className="absolute inset-0 brilho opacity-40" />
      <Container className="relative py-24 sm:py-32">
        <p className="mb-6 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-laranja-texto">{PROPOSITO_SECAO.eyebrow}</p>
        <p ref={ref} className="max-w-5xl font-display text-3xl font-bold leading-[1.1] sm:text-5xl lg:text-6xl" aria-label={PROPOSITO_SECAO.texto}>
          {palavras.map((palavra, i) => (
            <span key={i} aria-hidden className={cn("transition-colors duration-300", i < acesas ? "text-branco" : "text-branco/25")}>
              {palavra}
              {i < palavras.length - 1 ? " " : ""}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
