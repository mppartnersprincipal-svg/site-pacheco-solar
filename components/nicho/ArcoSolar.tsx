"use client";

import { animated, useInView, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

/**
 * O arco "SOLAR" da logo como ornamento: desenha com stroke-dashoffset ao
 * entrar na tela (uma spring, propriedade barata). Decorativo (aria-hidden).
 */
export function ArcoSolar({ className, cor = "currentColor", espessura = 3 }: { className?: string; cor?: string; espessura?: number }) {
  const [ref, inView] = useInView({ once: true, amount: 0.3 });
  const { offset } = useSpring({ offset: inView ? 0 : 1, config: { tension: 60, friction: 24 } });
  return (
    <svg ref={ref} aria-hidden viewBox="0 0 400 120" preserveAspectRatio="none" className={cn("pointer-events-none", className)}>
      <animated.path
        d="M8 112 C 110 -10, 290 -10, 392 112"
        fill="none"
        stroke={cor}
        strokeWidth={espessura}
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={offset}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
