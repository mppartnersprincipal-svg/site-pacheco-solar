"use client";

import { animated, useInView, useSpring } from "@react-spring/web";

/**
 * Contador animado. Só deve ser usado com valor CONFIRMADO (feature flag
 * `contadores`). O valor final fica no DOM (sr-only) para SEO/leitores de tela;
 * o span animado é decorativo e só conta quando entra na tela.
 */
export function Counter({
  to,
  prefix = "",
  suffix = "",
  className,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const [ref, inView] = useInView({ once: true, amount: 0.5 });
  const { n } = useSpring({
    from: { n: 0 },
    n: inView ? to : 0,
    config: { tension: 60, friction: 22 },
  });
  const format = (v: number) => `${prefix}${Math.round(v).toLocaleString("pt-BR")}${suffix}`;
  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{format(to)}</span>
      <animated.span aria-hidden className="tabular">
        {n.to(format)}
      </animated.span>
    </span>
  );
}
