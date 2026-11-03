"use client";

import { useEffect, useState } from "react";
import { MapPin, Monitor, RefreshCw, Smartphone, Tablet } from "lucide-react";
import { getRecentEvents } from "@/app/(painel)/dashboard/actions";
import { fmtTime, labelChannel, labelEvent, labelLinha, labelPage, labelPosicao, type RecentRow } from "@/lib/analytics-types";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { cn } from "@/lib/utils";

const INTERVAL_MS = 30_000;

const BADGE: Record<string, string> = {
  click_whatsapp: "bg-whatsapp text-white",
  click_phone: "bg-brand-action text-white",
  click_email: "bg-ink text-white",
  click_cta: "bg-ink text-white",
  page_view: "bg-surface-alt text-ink-body",
  click: "bg-line text-ink-body",
};

function detail(r: RecentRow) {
  const p = r.params ?? {};
  switch (r.name) {
    case "click_whatsapp":
      return [labelLinha(String(p.linha ?? "")), p.item, p.posicao ? labelPosicao(String(p.posicao)) : null].filter(Boolean).join(" · ");
    case "click_phone":
      return String(p.phone ?? "");
    case "click_email":
      return String(p.email ?? "");
    case "click_cta":
      return [p.cta_id, p.tipo, p.valor].filter(Boolean).join(" · ");
    case "click":
      return String(p.track ?? p.text ?? p.href ?? "");
    case "navigation_click":
      return `${p.origem ?? ""} → ${p.destino ?? ""}`;
    case "video_play":
      return String(p.video_id ?? "");
    case "file_download":
      return String(p.file ?? "");
    case "cookie_consent":
      return p.consent_choice === "accepted" ? "aceitou" : "só o essencial";
    default:
      return "";
  }
}

export function LiveFeed({ initial }: { initial: RecentRow[] }) {
  const [rows, setRows] = useState(initial);
  const [updatedAt, setUpdatedAt] = useState<Date | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const tick = async () => {
      if (document.visibilityState === "hidden") return;
      setBusy(true);
      try {
        const next = await getRecentEvents(40);
        if (!cancelled) {
          setRows(next);
          setUpdatedAt(new Date());
        }
      } catch {
        // mantém a lista anterior
      } finally {
        if (!cancelled) setBusy(false);
      }
    };
    const id = window.setInterval(tick, INTERVAL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div>
      <div className="mb-3 flex items-center justify-between text-xs text-ink-muted">
        <span className="inline-flex items-center gap-1.5">
          <span className={cn("size-2 rounded-full bg-whatsapp", busy && "animate-pulse")} aria-hidden />
          {updatedAt ? `Atualizado às ${updatedAt.toLocaleTimeString("pt-BR")}` : "Ao vivo"}
        </span>
        <RefreshCw aria-hidden className={cn("size-3.5", busy && "animate-spin")} />
      </div>
      {!rows.length ? (
        <EmptyState compact title="Nenhum evento ainda" hint="Assim que alguém acessar o site, aparece aqui." />
      ) : (
        <ul className="max-h-[520px] space-y-1 overflow-y-auto pr-1 text-sm">
          {rows.map((r, i) => {
            const Device = r.device === "mobile" ? Smartphone : r.device === "tablet" ? Tablet : Monitor;
            const text = detail(r);
            return (
              <li key={`${r.ts}-${i}`} className="flex flex-wrap items-center gap-x-2 gap-y-1 rounded-lg px-2 py-1.5 hover:bg-surface-alt/70">
                <span className="w-16 shrink-0 text-xs text-ink-muted tabular-nums">{fmtTime(r.ts)}</span>
                <span className={cn("rounded-full px-2 py-0.5 text-xs font-semibold", BADGE[r.name] ?? "bg-surface-alt text-ink-body")}>{labelEvent(r.name)}</span>
                <span className="min-w-0 flex-1 truncate text-ink-body" title={text}>
                  {text || labelPage(r.path)}
                </span>
                <span className="hidden items-center gap-2 text-xs text-ink-muted sm:inline-flex">
                  <span>{labelChannel(r.channel)}</span>
                  <Device aria-hidden className="size-3.5" />
                  {r.city ? (
                    <span className="inline-flex items-center gap-0.5">
                      <MapPin aria-hidden className="size-3" />
                      {r.city}
                    </span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
