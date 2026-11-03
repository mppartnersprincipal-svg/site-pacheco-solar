"use client";

import { animated, useInView, useSpring } from "@react-spring/web";
import { fmtInt } from "@/lib/analytics-types";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { useReducedMotion } from "../useReducedMotion";
import { CHART } from "./chartTheme";

const COLORS = [CHART.ink, CHART.brandSoft, CHART.whatsapp];

function Bar({ pct, color, delay }: { pct: number; color: string; delay: number }) {
  const [ref, inView] = useInView({ once: true });
  const reduceMotion = useReducedMotion();
  const style = useSpring({
    from: { width: "0%" },
    to: { width: inView ? `${Math.max(pct, 1)}%` : "0%" },
    delay,
    immediate: reduceMotion,
    config: { duration: 800, easing: (t: number) => 1 - Math.pow(1 - t, 3) },
  });
  return (
    <div ref={ref} className="h-3 w-full overflow-hidden rounded-full bg-surface-alt">
      <animated.div className="h-full rounded-full" style={{ ...style, background: color }} />
    </div>
  );
}

/** Funil em barras horizontais decrescentes, com % do topo e taxa entre etapas. */
export function FunnelBars({ steps }: { steps: Array<{ label: string; value: number }> }) {
  const top = steps[0]?.value ?? 0;
  if (!top) return <EmptyState compact hint="" />;

  return (
    <ol className="space-y-4">
      {steps.map((s, i) => {
        const pct = Math.round((s.value / top) * 100);
        const prev = i > 0 ? steps[i - 1].value : null;
        const stepRate = prev ? Math.round((s.value / prev) * 100) : null;
        return (
          <li key={s.label}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
              <span className="font-semibold text-ink">{s.label}</span>
              <span className="text-ink-muted tabular-nums">
                <span className="font-bold text-ink">{fmtInt(s.value)}</span> · {pct}%
                {stepRate !== null ? <span className="ml-1 text-xs">({stepRate}% da etapa anterior)</span> : null}
              </span>
            </div>
            <Bar pct={pct} color={COLORS[i % COLORS.length]} delay={i * 120} />
          </li>
        );
      })}
    </ol>
  );
}
