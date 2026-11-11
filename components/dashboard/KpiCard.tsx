"use client";

import { animated, useInView, useSpring } from "@react-spring/web";
import { TrendingDown, TrendingUp, type LucideIcon } from "lucide-react";
import { fmtDuration, fmtInt, fmtPct } from "@/lib/analytics-types";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "./useReducedMotion";

export type KpiFormat = "int" | "pct" | "duration";

function format(v: number, f: KpiFormat) {
  if (f === "pct") return fmtPct(v);
  if (f === "duration") return fmtDuration(v);
  return fmtInt(v);
}

/**
 * Card de KPI com contagem animada (react-spring) e delta em relação ao
 * período anterior.
 */
export function KpiCard({
  label,
  value,
  previous,
  format: fmt = "int",
  icon: Icon,
  accent = "ink",
  hint,
}: {
  label: string;
  value: number;
  previous?: number | null;
  format?: KpiFormat;
  icon: LucideIcon;
  accent?: "ink" | "brand" | "sol" | "whatsapp";
  hint?: string;
}) {
  const [ref, inView] = useInView({ once: true, rootMargin: "-20px" });
  const reduceMotion = useReducedMotion();
  const { n } = useSpring({
    from: { n: 0 },
    to: { n: inView ? value : 0 },
    immediate: reduceMotion,
    config: { duration: 1200, easing: (t: number) => 1 - Math.pow(1 - t, 3) },
  });

  let delta: number | null = null;
  if (previous != null && previous > 0) delta = ((value - previous) / previous) * 100;
  else if (previous === 0 && value > 0) delta = 100;

  const accentClasses = {
    ink: "bg-ink/5 text-ink",
    brand: "bg-brand-tint text-brand-action",
    sol: "faixa-sol text-white shadow-[0_4px_12px_rgba(254,87,14,0.25)]",
    whatsapp: "bg-whatsapp/10 text-whatsapp",
  }[accent];

  return (
    <div ref={ref} className="flex flex-col gap-3 rounded-2xl border border-line bg-surface p-5 transition-[box-shadow,border-color] hover:border-brand-action/25 hover:shadow-[0_8px_24px_rgba(226,90,32,0.10)]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-muted">{label}</p>
        <span className={cn("inline-flex size-9 shrink-0 items-center justify-center rounded-full", accentClasses)}>
          <Icon aria-hidden className="size-4" />
        </span>
      </div>
      <animated.p className="font-display text-3xl font-bold tracking-tight text-ink tabular-nums">
        {n.to((v) => format(fmt === "pct" ? Math.round(v * 10) / 10 : Math.round(v), fmt))}
      </animated.p>
      <div className="flex min-h-5 items-center gap-2 text-xs">
        {delta !== null ? (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold",
              delta >= 0 ? "bg-whatsapp/10 text-[#157a3d]" : "bg-brand-tint text-brand-hover"
            )}
          >
            {delta >= 0 ? <TrendingUp aria-hidden className="size-3" /> : <TrendingDown aria-hidden className="size-3" />}
            {delta >= 0 ? "+" : ""}
            {delta.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%
          </span>
        ) : null}
        <span className="text-ink-muted">{hint ?? (delta !== null ? "vs. período anterior" : "")}</span>
      </div>
    </div>
  );
}
