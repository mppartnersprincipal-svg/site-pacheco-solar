import { Download } from "lucide-react";
import { IsopletaVento } from "@/components/telhado/IsopletaVento";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Reveal } from "@/components/motion/Reveal";
import { buttonClasses } from "@/components/ui/Button";
import { DADOS_TECNICOS } from "@/content/telhado";
import { TITAN, VARIANTES_TITAN } from "@/lib/produtos/titan";

/**
 * Prancha "ficha técnica" da Linha Titan (Server Component): bloco-título mono,
 * cards de torque, isopleta interativa, regras por variante, ferramentas,
 * cuidados e os 2 manuais em PDF. Dados: lib/produtos/titan.ts (manuais).
 */
export function FichaTecnica() {
  const r = DADOS_TECNICOS.rotulos;
  const manuais = VARIANTES_TITAN.flatMap((v) => (v.manualPdf ? [{ ...v.manualPdf, id: v.id }] : []));
  const regrasPorVariante = VARIANTES_TITAN.map((v) => ({ id: v.id, nome: v.nomeCurto, regras: v.regras }));

  return (
    <Reveal>
      <div className="chanfro border border-linha bg-superficie">
        {/* Bloco-título (carimbo de prancha) */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-linha px-5 py-4 sm:px-8">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-branco sm:text-xs">{DADOS_TECNICOS.blocoTitulo}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aco">Rev. manual · {TITAN.nome}</p>
        </div>

        <div className="grid gap-px bg-linha lg:grid-cols-12">
          {/* Torque */}
          <div className="bg-superficie px-5 py-7 sm:px-8 lg:col-span-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-laranja-texto">{r.torque}</p>
            <ul className="mt-5 space-y-5">
              {TITAN.torque.map((t) => (
                <li key={t.parafuso} className="border-l-2 border-laranja pl-4">
                  <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-aco">{t.parafuso}</p>
                  <p className="mt-1 font-display text-4xl font-bold leading-none tabular text-branco sm:text-5xl">{t.valor}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Isopleta */}
          <div className="bg-superficie px-5 py-7 sm:px-8 lg:col-span-8">
            <IsopletaVento
              degraus={[...TITAN.isopleta]}
              nota={TITAN.isopletaNota}
              rotulos={{ titulo: r.isopleta, ajuda: r.isopletaAjuda, unidade: r.unidadeDistancia, rotuloDistancia: r.rotuloDistancia }}
            />
          </div>

          {/* Regras por variante */}
          <div className="bg-superficie px-5 py-7 sm:px-8 lg:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-laranja-texto">{r.regras}</p>
            <dl className="mt-4 space-y-4">
              {regrasPorVariante.map((v) => (
                <div key={v.id}>
                  <dt className="font-display text-sm font-semibold uppercase tracking-wide text-branco">{v.nome}</dt>
                  {v.regras.map((regra) => (
                    <dd key={regra} className="mt-1.5 flex gap-3 text-sm leading-relaxed text-aco">
                      <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-laranja" />
                      {regra}
                    </dd>
                  ))}
                </div>
              ))}
            </dl>
          </div>

          {/* Ferramentas e cuidados */}
          <div className="grid gap-8 bg-superficie px-5 py-7 sm:grid-cols-2 sm:px-8 lg:col-span-6">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-laranja-texto">{r.ferramentas}</p>
              <ul className="mt-4 space-y-2">
                {TITAN.ferramentas.map((f, i) => (
                  <li key={f} className="flex gap-3 text-sm text-branco/90">
                    <span className="font-mono text-xs text-aco">{String(i + 1).padStart(2, "0")}</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-laranja-texto">{r.cuidados}</p>
              <ul className="mt-4 space-y-2">
                {TITAN.cuidados.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-aco">
                    <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-laranja" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Downloads */}
        <div className="flex flex-wrap items-center gap-3 border-t border-linha px-5 py-5 sm:px-8">
          <p className="mr-2 font-mono text-xs uppercase tracking-[0.18em] text-aco">{r.downloads}</p>
          {manuais.map((m) => (
            <TrackedLink
              key={m.id}
              href={m.href}
              download
              ctaId={`ficha-tecnica-manual-${m.id}`}
              track={{ kind: "download", arquivo: m.href }}
              className={buttonClasses("secondary", "md")}
            >
              <Download className="size-4" aria-hidden />
              {m.label}
            </TrackedLink>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
