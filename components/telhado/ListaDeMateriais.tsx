"use client";

import { useState } from "react";
import { KitExplodido } from "@/components/telhado/KitExplodido";
import { WaButton } from "@/components/cta/WaButton";
import { trackCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Tipo = "fibrocimento" | "metalico";

export type VarianteLista = {
  id: Tipo;
  nome: string;
  nomeCurto: string;
  componentes: Array<{ nome: string; qtdLayout4?: number; nota?: string; material?: string }>;
};

export type ListaDeMateriaisProps = {
  variantes: VarianteLista[];
  rotulos: {
    caption: string;
    colunas: { item: string; material: string; qtd: string; nota: string };
    semQuantidade: string;
    rodape: string;
    cta: string;
    explodido: { montar: string; explodir: string; legenda: string };
  };
};

/**
 * Tabela do layout de 4 módulos (Projeto Executivo) com toggle
 * Fibrocimento | Metálico e a vista explodida do kit ao lado. A nota de
 * conciliação 6 vs 8 fica visível como [PREENCHER] na coluna Nota.
 */
export function ListaDeMateriais({ variantes, rotulos }: ListaDeMateriaisProps) {
  const [tipo, setTipo] = useState<Tipo>(variantes[0].id);
  const ativa = variantes.find((v) => v.id === tipo) ?? variantes[0];

  const trocar = (id: Tipo) => {
    if (id === tipo) return;
    setTipo(id);
    trackCta({ cta_id: `lista-de-materiais-${id}`, tipo: "aba", valor: id });
  };

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-7">
        {/* Toggle segmentado */}
        <div role="group" aria-label="Tipo de telhado" className="inline-flex border border-linha bg-superficie p-1">
          {variantes.map((v) => (
            <button
              key={v.id}
              type="button"
              aria-pressed={v.id === tipo}
              onClick={() => trocar(v.id)}
              className={cn(
                "min-h-11 cursor-pointer px-5 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
                v.id === tipo ? "bg-laranja text-preto" : "text-aco hover:text-branco"
              )}
            >
              {v.nomeCurto}
            </button>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[520px] border-collapse text-left text-sm">
            <caption className="caption-bottom pt-3 text-left font-mono text-[11px] leading-relaxed text-aco">
              {rotulos.caption} — {ativa.nome}.
            </caption>
            <thead>
              <tr className="border-b border-laranja font-mono text-[11px] uppercase tracking-[0.16em] text-laranja">
                <th scope="col" className="py-3 pr-4 font-medium">{rotulos.colunas.item}</th>
                <th scope="col" className="py-3 pr-4 font-medium">{rotulos.colunas.material}</th>
                <th scope="col" className="py-3 pr-4 text-right font-medium">{rotulos.colunas.qtd}</th>
                <th scope="col" className="py-3 font-medium">{rotulos.colunas.nota}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-linha">
              {ativa.componentes.map((c, i) => (
                <tr key={c.nome} className="align-top">
                  <th scope="row" className="py-3 pr-4 font-medium text-branco">
                    <span className="mr-3 font-mono text-xs text-aco">{String(i + 1).padStart(2, "0")}</span>
                    {c.nome}
                  </th>
                  <td className="py-3 pr-4 font-mono text-xs uppercase tracking-[0.12em] text-aco">{c.material ?? "—"}</td>
                  <td className="py-3 pr-4 text-right font-display text-xl font-bold tabular text-branco">
                    {c.qtdLayout4 !== undefined ? c.qtdLayout4 : <span className="text-aco">{rotulos.semQuantidade}</span>}
                  </td>
                  <td className="py-3 text-xs leading-snug text-aco">{c.nota ?? ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-5 max-w-xl text-sm leading-relaxed text-aco">{rotulos.rodape}</p>
        <div className="mt-6">
          <WaButton linha="kit" ctaId="lista-de-materiais-kit" posicao="lista-de-materiais">
            {rotulos.cta}
          </WaButton>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="chanfro border border-linha bg-superficie p-4 sm:p-6">
          <KitExplodido key={tipo} tipo={tipo} rotulos={rotulos.explodido} />
        </div>
      </div>
    </div>
  );
}
