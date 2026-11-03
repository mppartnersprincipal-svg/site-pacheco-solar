import Link from "next/link";
import { ChevronRight, Download, Mail, MapPin, MessageCircle, Monitor, MousePointerClick, Phone, PlayCircle, Smartphone, Tablet } from "lucide-react";
import { getJourneys, withParams, type Range, type SearchParams } from "@/lib/analytics-queries";
import { LINHA_LABELS, fmtDateTime, fmtDuration, fmtTime, labelChannel, type JourneyRow } from "@/lib/analytics-types";
import { genericClicks, summarizeTrail, type JourneyStep } from "@/lib/journey";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { cn } from "@/lib/utils";

const STEP_STYLE: Record<JourneyStep["kind"], string> = {
  page: "bg-surface-alt text-ink-body",
  whatsapp: "bg-whatsapp text-white",
  phone: "bg-brand-action text-white",
  email: "bg-ink text-white",
  cta: "bg-ink/10 text-ink",
  video: "bg-blue-50 text-blue-700",
  download: "bg-violet-50 text-violet-700",
};

const STEP_ICON: Partial<Record<JourneyStep["kind"], typeof MessageCircle>> = {
  whatsapp: MessageCircle,
  phone: Phone,
  email: Mail,
  cta: MousePointerClick,
  video: PlayCircle,
  download: Download,
};

function DeviceIcon({ device }: { device: string | null }) {
  const Icon = device === "mobile" ? Smartphone : device === "tablet" ? Tablet : Monitor;
  return <Icon aria-hidden className="size-3.5" />;
}

function originLine(j: JourneyRow) {
  const parts = [labelChannel(j.channel)];
  if (j.utm_campaign) parts.push(`campanha ${j.utm_campaign}`);
  if (j.utm_term) parts.push(`termo "${j.utm_term}"`);
  if (!j.utm_campaign && j.referrer_host) parts.push(j.referrer_host);
  return parts.join(" · ");
}

/** Caminho de cada lead: origem → páginas → botão de WhatsApp clicado. */
export async function JourneysSection({ range, sp }: { range: Range; sp: SearchParams }) {
  const all = (Array.isArray(sp.jornadas) ? sp.jornadas[0] : sp.jornadas) === "todas";
  const linhaFilter = (Array.isArray(sp.linha) ? sp.linha[0] : sp.linha) || null;

  const rows = await getJourneys(range, !all, 60);
  const filtered = linhaFilter ? rows.filter((j) => j.trail.some((e) => e.name === "click_whatsapp" && e.params?.linha === linhaFilter)) : rows;
  const linhasPresentes = new Set(rows.flatMap((j) => j.trail.filter((e) => e.name === "click_whatsapp").map((e) => String(e.params?.linha ?? ""))));
  const linhas = Object.entries(LINHA_LABELS).filter(([id]) => linhasPresentes.has(id));

  const chip = (active: boolean) =>
    cn("inline-flex min-h-8 items-center rounded-full px-3 text-xs font-semibold transition-colors", active ? "bg-ink text-white" : "bg-surface-alt text-ink-body hover:bg-line");

  return (
    <ChartCard
      id="jornadas"
      title="Jornadas — o caminho de cada lead"
      description="De onde veio, o que viu e em qual botão de WhatsApp clicou"
      action={
        <div className="flex flex-wrap items-center justify-end gap-1.5">
          <Link href={withParams(sp, { jornadas: null })} className={chip(!all)} scroll={false}>
            Só quem clicou
          </Link>
          <Link href={withParams(sp, { jornadas: "todas" })} className={chip(all)} scroll={false}>
            Todas as visitas
          </Link>
        </div>
      }
    >
      {linhas.length ? (
        <div className="mb-4 flex flex-wrap items-center gap-1.5">
          <span className="mr-1 text-xs font-semibold text-ink-muted">Linha escolhida:</span>
          <Link href={withParams(sp, { linha: null })} className={chip(!linhaFilter)} scroll={false}>
            Qualquer
          </Link>
          {linhas.map(([id, label]) => (
            <Link key={id} href={withParams(sp, { linha: id })} className={chip(linhaFilter === id)} scroll={false}>
              {label}
            </Link>
          ))}
        </div>
      ) : null}

      {!filtered.length ? (
        <EmptyState
          compact
          title={all ? "Nenhuma visita no período" : "Nenhum lead clicou em WhatsApp ou telefone no período"}
          hint={all ? "" : 'Veja "Todas as visitas" para acompanhar quem navegou sem clicar.'}
        />
      ) : (
        <ol className="divide-y divide-line">
          {filtered.map((j) => {
            const steps = summarizeTrail(j.trail);
            const clicks = genericClicks(j.trail);
            const duration = new Date(j.last_seen_at).getTime() - new Date(j.started_at).getTime();
            return (
              <li key={j.id} className="py-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
                  <span className="font-semibold text-ink">{fmtDateTime(j.started_at)}</span>
                  <span className={cn("rounded-full px-2 py-0.5 font-semibold", j.channel === "google_ads" || j.channel === "meta_ads" ? "bg-brand-tint text-brand-hover" : "bg-surface-alt text-ink-body")}>
                    {originLine(j)}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <DeviceIcon device={j.device} />
                    {[j.browser, j.os].filter(Boolean).join(" · ")}
                  </span>
                  {j.city || j.region ? (
                    <span className="inline-flex items-center gap-1">
                      <MapPin aria-hidden className="size-3.5" />
                      {[j.city, j.region].filter(Boolean).join(" - ")}
                    </span>
                  ) : null}
                  <span>{fmtDuration(duration)} no site</span>
                  {j.is_returning ? <span className="rounded-full bg-ink/5 px-2 py-0.5 font-semibold text-ink">já visitou antes</span> : null}
                </div>

                <ol className="mt-2 flex flex-wrap items-center gap-1.5">
                  {steps.map((s, i) => {
                    const Icon = STEP_ICON[s.kind];
                    return (
                      <li key={i} className="flex items-center gap-1.5">
                        {i > 0 ? <ChevronRight aria-hidden className="size-3.5 text-ink-muted/60" /> : null}
                        <span className={cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold", STEP_STYLE[s.kind])} title={fmtTime(s.ts)}>
                          {Icon ? <Icon aria-hidden className="size-3" /> : null}
                          {s.label}
                          {s.detail ? <span className="font-normal opacity-80">({s.detail})</span> : null}
                        </span>
                      </li>
                    );
                  })}
                </ol>

                {clicks.length ? (
                  <details className="mt-2 text-xs">
                    <summary className="cursor-pointer text-ink-muted hover:text-ink">
                      {clicks.length} {clicks.length === 1 ? "clique" : "cliques"} em botões e links
                    </summary>
                    <ul className="mt-1.5 space-y-0.5 pl-3 text-ink-body">
                      {clicks.map((c, i) => (
                        <li key={i}>
                          <span className="text-ink-muted tabular-nums">{fmtTime(c.ts)}</span> · {c.label} <span className="text-ink-muted">em {c.page}</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </li>
            );
          })}
        </ol>
      )}
    </ChartCard>
  );
}
