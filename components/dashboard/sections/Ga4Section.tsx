import { Activity, Clock, Target, TrendingDown, TrendingUp, UserPlus, Users } from "lucide-react";
import type { Range } from "@/lib/analytics-queries";
import { getGa4Report } from "@/lib/dashboard/reports";
import { fmtDuration, fmtInt, labelEvent } from "@/lib/analytics-types";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable, InlineBar } from "@/components/dashboard/DataTable";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { cn } from "@/lib/utils";

const percentage = new Intl.NumberFormat("pt-BR", { style: "percent", maximumFractionDigits: 1 });

function formatDate(value: string) {
  return value.split("-").reverse().join("/");
}

function Delta({ value, previous }: { value: number; previous: number }) {
  if (!previous) return null;
  const delta = ((value - previous) / previous) * 100;
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold", delta >= 0 ? "bg-whatsapp/10 text-[#157a3d]" : "bg-brand-tint text-brand-hover")}>
      {delta >= 0 ? <TrendingUp aria-hidden className="size-3" /> : <TrendingDown aria-hidden className="size-3" />}
      {delta >= 0 ? "+" : ""}
      {delta.toLocaleString("pt-BR", { maximumFractionDigits: 0 })}%
    </span>
  );
}

/** O que o Google Analytics 4 mediu (só visitantes que aceitaram cookies). */
export async function Ga4Section({ range, previous }: { range: Range; previous: Range }) {
  const report = await getGa4Report(range, previous);

  if (report.status !== "ready") {
    return (
      <ChartCard id="ga4" title="Google Analytics 4" description="Sessões, usuários e eventos-chave medidos pelo GA4">
        <EmptyState compact title={report.status === "not_configured" ? "Conexão com o GA4 pendente" : "Não foi possível carregar o GA4"} hint={report.message} />
      </ChartCard>
    );
  }

  const t = report.totals;
  const p = report.previous;
  const cards = [
    { label: "Sessões", value: fmtInt(t.sessions), prev: <Delta value={t.sessions} previous={p.sessions} />, icon: Activity, hint: "Visitas medidas pelo GA4" },
    { label: "Usuários", value: fmtInt(t.users), prev: <Delta value={t.users} previous={p.users} />, icon: Users, hint: "Pessoas distintas" },
    { label: "Novos usuários", value: fmtInt(t.newUsers), prev: <Delta value={t.newUsers} previous={p.newUsers} />, icon: UserPlus, hint: "Primeira visita no período" },
    { label: "Eventos-chave", value: fmtInt(t.keyEvents), prev: <Delta value={t.keyEvents} previous={p.keyEvents} />, icon: Target, hint: "Conversões marcadas no GA4" },
    { label: "Taxa de engajamento", value: percentage.format(t.engagementRate), prev: null, icon: Activity, hint: "Sessões engajadas ÷ sessões" },
    { label: "Duração média", value: fmtDuration(t.averageSessionDuration * 1000), prev: null, icon: Clock, hint: "Tempo médio por sessão" },
  ];
  const maxChannel = Math.max(0, ...report.channels.map((c) => c.sessions));
  const maxLanding = Math.max(0, ...report.landingPages.map((c) => c.sessions));

  return (
    <ChartCard
      id="ga4"
      title="Google Analytics 4"
      description={`Propriedade ${report.propertyId} · ${formatDate(report.from)} a ${formatDate(report.to)}${report.thresholded ? " · alguns dados foram ocultados pelo limite de privacidade do Google" : ""}`}
    >
      <div className="space-y-5">
        <p className="text-sm text-ink-muted">
          O GA4 só enxerga quem aceitou cookies no banner; o painel acima mede todas as visitas. O filtro de origem não se aplica aqui.
        </p>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ label, value, prev, icon: Icon, hint }) => (
            <div key={label} className="flex min-w-0 flex-col gap-3 rounded-2xl border border-line bg-surface p-5">
              <dt className="flex items-center justify-between gap-3">
                <span className="text-sm font-semibold text-ink-muted">{label}</span>
                <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink">
                  <Icon aria-hidden className="size-4" />
                </span>
              </dt>
              <dd className="font-display text-3xl font-bold tracking-tight break-words text-ink tabular-nums">{value}</dd>
              <dd className="flex items-center gap-2 text-xs text-ink-muted">
                {prev}
                <span>{hint}</span>
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-6 xl:grid-cols-3">
          <div>
            <h3 className="mb-2 font-sans text-sm font-bold text-ink">Eventos do site no GA4</h3>
            <DataTable
              dense
              minWidth={280}
              rows={report.events}
              rowKey={(e) => e.name}
              columns={[
                { key: "name", header: "Evento", render: (e) => <span className="font-semibold text-ink">{labelEvent(e.name)}</span> },
                { key: "count", header: "Período", align: "right", render: (e) => fmtInt(e.count) },
                { key: "prev", header: "Anterior", align: "right", render: (e) => <span className="text-ink-muted">{fmtInt(e.previous)}</span> },
              ]}
            />
          </div>
          <div>
            <h3 className="mb-2 font-sans text-sm font-bold text-ink">Canais (grupo padrão do GA4)</h3>
            {report.channels.length ? (
              <DataTable
                dense
                minWidth={280}
                rows={report.channels}
                rowKey={(c) => c.key}
                columns={[
                  {
                    key: "k",
                    header: "Canal",
                    render: (c) => (
                      <div className="min-w-32">
                        <p className="font-semibold text-ink">{c.key}</p>
                        <InlineBar value={c.sessions} max={maxChannel} />
                      </div>
                    ),
                  },
                  { key: "s", header: "Sessões", align: "right", render: (c) => fmtInt(c.sessions) },
                  { key: "e", header: "Eventos-chave", align: "right", render: (c) => fmtInt(c.keyEvents) },
                ]}
              />
            ) : (
              <EmptyState compact hint="" />
            )}
          </div>
          <div>
            <h3 className="mb-2 font-sans text-sm font-bold text-ink">Páginas de entrada</h3>
            {report.landingPages.length ? (
              <DataTable
                dense
                minWidth={280}
                rows={report.landingPages}
                rowKey={(c) => c.key}
                columns={[
                  {
                    key: "k",
                    header: "Página",
                    render: (c) => (
                      <div className="min-w-32">
                        <p className="truncate font-semibold text-ink" title={c.key}>
                          {c.key}
                        </p>
                        <InlineBar value={c.sessions} max={maxLanding} />
                      </div>
                    ),
                  },
                  { key: "s", header: "Sessões", align: "right", render: (c) => fmtInt(c.sessions) },
                  { key: "e", header: "Eventos-chave", align: "right", render: (c) => fmtInt(c.keyEvents) },
                ]}
              />
            ) : (
              <EmptyState compact hint="" />
            )}
          </div>
        </div>
      </div>
    </ChartCard>
  );
}
