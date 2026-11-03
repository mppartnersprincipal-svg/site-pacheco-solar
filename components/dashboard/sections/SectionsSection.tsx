import { getSections, type Range } from "@/lib/analytics-queries";
import { fmtInt, labelPage } from "@/lib/analytics-types";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { DataTable, InlineBar } from "@/components/dashboard/DataTable";
import { EmptyState } from "@/components/dashboard/EmptyState";

/** Quais seções de cada página o visitante chegou a ver (section_view). */
export async function SectionsSection({ range }: { range: Range }) {
  const rows = (await getSections(range)).slice(0, 30);
  const max = Math.max(0, ...rows.map((r) => Number(r.sessions)));

  return (
    <ChartCard id="secoes" title="Seções vistas" description="Até onde o visitante desce em cada página — por bloco com id" className="h-full">
      {!rows.length ? (
        <EmptyState compact hint="" />
      ) : (
        <DataTable
          dense
          minWidth={360}
          rows={rows}
          rowKey={(r) => `${r.path}-${r.section_id}`}
          columns={[
            {
              key: "section",
              header: "Seção",
              render: (r) => (
                <div className="min-w-48">
                  <p className="font-semibold text-ink">{r.section_id ?? "—"}</p>
                  <p className="text-xs text-ink-muted">{labelPage(r.path)}</p>
                </div>
              ),
            },
            {
              key: "sessions",
              header: "Visitas",
              align: "right",
              render: (r) => (
                <div className="min-w-20">
                  <span className="font-semibold">{fmtInt(r.sessions)}</span>
                  <InlineBar value={Number(r.sessions)} max={max} />
                </div>
              ),
            },
          ]}
        />
      )}
    </ChartCard>
  );
}
