"use client";

import { useState } from "react";
import { animated, useTransition } from "@react-spring/web";
import type { VarianteKit } from "@/content/kits";
import { cn } from "@/lib/utils";

interface TabelaKitTitanProps {
  variantes: readonly VarianteKit[];
  colunas: { item: string; qtd: string; material: string };
}

/**
 * Lista de materiais compacta do layout de 4 módulos da Linha Titan: toggle
 * fibrocimento/metálico (aria-pressed) com crossfade por useTransition. As
 * notas PREENCHER dos manuais ficam visíveis como rodapé da tabela.
 */
export function TabelaKitTitan({ variantes, colunas }: TabelaKitTitanProps) {
  const [ativa, setAtiva] = useState(variantes[0]?.id);
  const variante = variantes.find((v) => v.id === ativa) ?? variantes[0];

  const transitions = useTransition(variante, {
    keys: (v) => v.id,
    from: { opacity: 0, transform: "translate3d(0,8px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-8px,0)" },
    config: { tension: 240, friction: 26 },
    exitBeforeEnter: true,
  });

  const notas = variante.componentes.filter((c) => c.nota).map((c) => ({ nome: c.nome, nota: c.nota as string }));

  return (
    <div>
      <div role="group" aria-label="Tipo de telhado" className="flex flex-wrap gap-2">
        {variantes.map((v) => {
          const on = v.id === variante.id;
          return (
            <button
              key={v.id}
              type="button"
              aria-pressed={on}
              onClick={() => setAtiva(v.id)}
              className={cn(
                "min-h-11 rounded-xl px-4 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
                on ? "bg-laranja text-preto" : "border border-linha text-branco hover:border-aco"
              )}
            >
              {v.nome}
            </button>
          );
        })}
      </div>

      <div className="relative mt-5">
        {transitions((style, v) => (
          <animated.div style={style}>
            <table className="w-full border-collapse text-left text-sm">
              <caption className="sr-only">
                Componentes do layout de 4 módulos — {v.nome}
              </caption>
              <thead>
                <tr className="border-b border-linha font-mono text-[11px] uppercase tracking-[0.16em] text-aco">
                  <th scope="col" className="py-2 pr-3 font-medium">
                    {colunas.item}
                  </th>
                  <th scope="col" className="py-2 pr-3 text-right font-medium">
                    {colunas.qtd}
                  </th>
                  <th scope="col" className="hidden py-2 font-medium sm:table-cell">
                    {colunas.material}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-linha/70">
                {v.componentes.map((c, i) => (
                  <tr key={c.nome}>
                    <td className="py-2.5 pr-3 text-branco">
                      <span className="mr-2 font-mono text-[11px] text-aco">{String(i + 1).padStart(2, "0")}</span>
                      {c.nome}
                      {c.nota ? (
                        <sup className="ml-1 font-mono text-[10px] text-laranja-texto" aria-label="ver nota">
                          *
                        </sup>
                      ) : null}
                    </td>
                    <td className="py-2.5 pr-3 text-right font-mono tabular text-branco">{c.qtd ?? "—"}</td>
                    <td className="hidden py-2.5 text-aco sm:table-cell">{c.material ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </animated.div>
        ))}
      </div>

      {notas.length ? (
        <ul className="mt-4 space-y-1.5 border-t border-linha pt-3 font-mono text-[11px] leading-relaxed text-laranja-texto">
          {notas.map((n) => (
            <li key={n.nome}>
              * {n.nome}: {n.nota}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
