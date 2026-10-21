"use client";

import { animated, useInView, useSpring } from "@react-spring/web";

type RevealTag = "div" | "li" | "span" | "section" | "article" | "p";

/**
 * Entrada por scroll (fade + slide-up) com react-spring. `delay` em ms para
 * stagger; `as="li"` mantém HTML válido em listas. Só transform/opacity.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: RevealTag;
  id?: string;
}) {
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
