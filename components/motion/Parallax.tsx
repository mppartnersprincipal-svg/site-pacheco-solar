"use client";

import { animated, useSpring } from "@react-spring/web";
import { useScrollProgress } from "@/lib/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

/**
 * Parallax leve (±`amount` px) só em desktop com ponteiro fino; estático no
 * mobile e sob reduced-motion. Apenas transform.
 */
export function Parallax({
  children,
  amount = 16,
  className,
}: {
  children: React.ReactNode;
  amount?: number;
  className?: string;
}) {
  const { ref, progress, enabled } = useScrollProgress<HTMLDivElement>(1024);
  const style = useSpring({
    transform: enabled ? `translate3d(0,${(0.5 - progress) * 2 * amount}px,0)` : "translate3d(0,0,0)",
    config: { tension: 120, friction: 30 },
  });
  return (
    <animated.div ref={ref} style={style} className={cn("will-change-transform", className)}>
      {children}
    </animated.div>
  );
}
