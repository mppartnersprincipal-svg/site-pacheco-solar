import { Suspense } from "react";
import { redirect } from "next/navigation";
import { isLoggedIn } from "@/lib/dashboard/auth";
import {
  analyticsConfigured,
  getByChannel,
  getByDevice,
  getButtons,
  getDaily,
  getKpis,
  getRange,
  getTopPages,
  previousRange,
  type SearchParams,
} from "@/lib/analytics-queries";
import { fmtDuration, fmtInt, fmtPct, labelChannel, labelDevice, labelLinha, labelPage } from "@/lib/analytics-types";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import { DashboardFilters } from "@/components/dashboard/DashboardFilters";
import { SectionNav } from "@/components/dashboard/SectionNav";
import { KpiGrid } from "@/components/dashboard/KpiGrid";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { EmptyState } from "@/components/dashboard/EmptyState";
import { DataTable, InlineBar } from "@/components/dashboard/DataTable";
import { CardSkeleton } from "@/components/dashboard/Skeleton";
import { DailyAreaChart } from "@/components/dashboard/charts/DailyAreaChart";
import { DonutChart } from "@/components/dashboard/charts/DonutChart";
import { HorizontalBars } from "@/components/dashboard/charts/HorizontalBars";
import { CHANNEL_COLORS, DEVICE_COLORS } from "@/components/dashboard/charts/chartTheme";
import { AudienceSection } from "@/components/dashboard/sections/AudienceSection";
import { ButtonsSection } from "@/components/dashboard/sections/ButtonsSection";
import { CampaignsSection } from "@/components/dashboard/sections/CampaignsSection";
import { ClicksSection } from "@/components/dashboard/sections/ClicksSection";
import { Ga4Section } from "@/components/dashboard/sections/Ga4Section";
import { GeoSection } from "@/components/dashboard/sections/GeoSection";
import { GoogleAdsSection } from "@/components/dashboard/sections/GoogleAdsSection";
import { HeatmapSection } from "@/components/dashboard/sections/HeatmapSection";
import { JourneysSection } from "@/components/dashboard/sections/JourneysSection";
import { LiveSection } from "@/components/dashboard/sections/LiveSection";
import { SectionsSection } from "@/components/dashboard/sections/SectionsSection";

export default async function DashboardPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  // O proxy.ts já redireciona; esta checagem cobre o caso de o proxy não rodar.
  if (!(await isLoggedIn())) redirect("/dashboard/login");

  const sp = await searchParams;
  const range = getRange(sp);
  const prev = previousRange(range);
  const configured = analyticsConfigured();

  const [kpis, prevKpis, daily, byChannel, byDevice, topPages, buttons] = await Promise.all([
    getKpis(range),
    getKpis(prev),
    getDaily(range),
    getByChannel(range),
    getByDevice(range),
    getTopPages(range, 12),
    getButtons(range),
  ]);

  const hasData = kpis.sessions > 0;

  const waByLinha = Object.values(
    buttons
      .filter((b) => b.kind === "click_whatsapp")
      .reduce<Record<string, { name: string; value: number }>>((acc, r) => {
        const key = r.linha ?? "—";
        return { ...acc, [key]: { name: labelLinha(key), value: (acc[key]?.value ?? 0) + Number(r.clicks) } };
      }, {})
  );
  const maxViews = Math.max(0, ...topPages.map((p) => Number(p.views)));

  return (
    <DashboardShell>
      <div className="space-y-6">
        <div id="kpis" className="flex flex-wrap items-end justify-between gap-4 scroll-mt-28">
          <div>
            <h1 className="font-display text-2xl font-bold sm:text-3xl">Dashboard</h1>
            <p className="mt-1 text-sm text-ink-muted">
              Comportamento dos visitantes · {range.label}
              {range.channel ? ` · ${labelChannel(range.channel)}` : ""}
            </p>
          </div>
        </div>

        <SectionNav />

        <DashboardFilters period={range.period} channel={range.channel} de={range.de} ate={range.ate} />

        {!configured ? (
          <EmptyState
            title="Coletor ainda não conectado ao Supabase"
            hint="Defina SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY na Vercel, rode a migration supabase/migrations/0001_pacheco_analytics.sql e faça um novo deploy."
          />
        ) : null}

        <KpiGrid kpis={kpis} previous={prevKpis} />

        {configured && !hasData ? (
          <EmptyState title="Nenhuma visita registrada no período" hint="Os dados aparecem aqui assim que alguém acessar o site. Tente outro período ou remova o filtro de origem." />
        ) : null}

        <Suspense key={`ads-${range.from.toISOString()}-${range.to.toISOString()}`} fallback={<CardSkeleton height={400} />}>
          <GoogleAdsSection range={range} />
        </Suspense>

        <Suspense key={`ga4-${range.from.toISOString()}-${range.to.toISOString()}`} fallback={<CardSkeleton height={400} />}>
          <Ga4Section range={range} previous={prev} />
        </Suspense>

        {/* Visitas por dia + origem */}
        <div className="grid gap-4 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ChartCard id="visitas" title="Visitas por dia" description="Sessões (área) e cliques no WhatsApp (linha verde, eixo da direita)" className="h-full">
              {hasData ? <DailyAreaChart data={daily} /> : <EmptyState compact hint="" />}
            </ChartCard>
          </div>
          <ChartCard
            id="origem"
            title="De onde vêm as visitas"
            description={range.channel ? "Todas as origens no período (este gráfico ignora o filtro de origem)" : "Google Ads × Meta Ads × orgânico × direto × redes"}
            className="h-full"
          >
            <DonutChart
              totalLabel="visitas"
              data={byChannel.map((c) => ({
                name: labelChannel(c.channel),
                value: Number(c.sessions),
                color: CHANNEL_COLORS[c.channel],
                hint: `${fmtInt(c.wa_clicks)} cliques no WhatsApp`,
              }))}
            />
          </ChartCard>
        </div>

        {/* Novo × recorrente · consentimento · funil */}
        <Suspense fallback={<CardSkeleton height={220} />}>
          <AudienceSection range={range} />
        </Suspense>

        {/* Dispositivo · WhatsApp por linha */}
        <div className="grid gap-4 md:grid-cols-2">
          <ChartCard id="dispositivo" title="Dispositivo" description="Celular, computador ou tablet" className="h-full">
            <DonutChart totalLabel="visitas" data={byDevice.map((d) => ({ name: labelDevice(d.device), value: Number(d.sessions), color: DEVICE_COLORS[d.device] }))} />
          </ChartCard>
          <ChartCard id="whatsapp-linha" title="WhatsApp por linha" description="Qual linha de produto o visitante escolheu ao clicar" className="h-full">
            <DonutChart totalLabel="cliques" data={waByLinha} emptyTitle="Nenhum clique no WhatsApp" />
          </ChartCard>
        </div>

        {/* Botões nomeados */}
        <Suspense fallback={<CardSkeleton height={320} />}>
          <ButtonsSection range={range} />
        </Suspense>

        {/* Jornadas */}
        <Suspense fallback={<CardSkeleton height={400} />}>
          <JourneysSection range={range} sp={sp} />
        </Suspense>

        {/* Páginas */}
        <div className="grid gap-4 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ChartCard id="paginas" title="Páginas mais vistas" description="Top 10 por visualizações" className="h-full">
              <HorizontalBars valueLabel="Visualizações" data={topPages.map((p) => ({ name: labelPage(p.path, p.title), value: Number(p.views) }))} />
            </ChartCard>
          </div>
          <div className="lg:col-span-3">
            <ChartCard id="paginas-tempo" title="Tempo e leitura por página" description="Quanto tempo o visitante fica e até onde rola cada página" className="h-full">
              {topPages.length ? (
                <DataTable
                  rows={topPages}
                  rowKey={(p) => p.path}
                  dense
                  columns={[
                    {
                      key: "page",
                      header: "Página",
                      render: (p) => (
                        <div className="min-w-40">
                          <p className="truncate font-semibold text-ink" title={p.path}>
                            {labelPage(p.path, p.title)}
                          </p>
                          <p className="truncate text-xs text-ink-muted">{p.path}</p>
                        </div>
                      ),
                    },
                    {
                      key: "views",
                      header: "Views",
                      align: "right",
                      render: (p) => (
                        <div className="min-w-24">
                          <span className="font-semibold text-ink">{fmtInt(p.views)}</span>
                          <InlineBar value={Number(p.views)} max={maxViews} />
                        </div>
                      ),
                    },
                    { key: "time", header: "Tempo médio", align: "right", render: (p) => fmtDuration(p.avg_ms) },
                    { key: "scroll", header: "Scroll médio", align: "right", render: (p) => fmtPct(p.avg_scroll, 0) },
                  ]}
                />
              ) : (
                <EmptyState compact hint="" />
              )}
            </ChartCard>
          </div>
        </div>

        {/* Seções + horários */}
        <div className="grid gap-4 xl:grid-cols-2">
          <Suspense fallback={<CardSkeleton height={220} />}>
            <SectionsSection range={range} />
          </Suspense>
          <Suspense fallback={<CardSkeleton height={220} />}>
            <HeatmapSection range={range} />
          </Suspense>
        </div>

        {/* Geografia + campanhas */}
        <div className="grid gap-4 xl:grid-cols-2">
          <Suspense fallback={<CardSkeleton height={220} />}>
            <GeoSection range={range} />
          </Suspense>
          <Suspense fallback={<CardSkeleton height={220} />}>
            <CampaignsSection range={range} />
          </Suspense>
        </div>

        {/* Cliques + ao vivo */}
        <div className="grid gap-4 xl:grid-cols-2">
          <Suspense fallback={<CardSkeleton height={320} />}>
            <ClicksSection range={range} />
          </Suspense>
          <Suspense fallback={<CardSkeleton height={320} />}>
            <LiveSection />
          </Suspense>
        </div>
      </div>
    </DashboardShell>
  );
}
