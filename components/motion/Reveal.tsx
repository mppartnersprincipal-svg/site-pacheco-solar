"use client";

import { animated, useInView, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "li" | "span" | "section" | "article" | "p";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
  id?: string;
  /**
   * Primeira dobra (heros): entrada por @keyframes CSS em vez de scroll. O HTML
   * do servidor já chega visível (sem opacity:0 até hidratar) e a animação
   * respeita prefers-reduced-motion pelo bloco global em globals.css.
   */
  imediato?: boolean;
}

/**
 * Entrada por scroll (fade + slide-up) com react-spring. `delay` em ms para
 * stagger; `as="li"` mantém HTML válido em listas. Só transform/opacity.
 */
export function Reveal(props: RevealProps) {
  return props.imediato ? <RevealImediato {...props} /> : <RevealScroll {...props} />;
}

function RevealImediato({ children, className, delay = 0, as: Tag = "div", id }: RevealProps) {
  return (
    <Tag className={cn("animate-entrada", className)} style={{ animationDelay: `${delay}ms` }} id={id}>
      {children}
    </Tag>
  );
}

function RevealScroll({ children, className, delay = 0, y = 24, as = "div", id }: RevealProps) {
  const [ref, inView] = useInView({ once: true, rootMargin: "0px 0px -10% 0px" });
  const style = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : `translate3d(0,${y}px,0)`,
    delay,
    config: { tension: 210, friction: 26 },
  });
  const Tag = animated[as];
  return (
    <Tag ref={ref} style={style} className={className} id={id}>
      {children}
    </Tag>
  );
}
