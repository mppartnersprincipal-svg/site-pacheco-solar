"use client";

import { useState } from "react";
import { animated, useInView, useTrail } from "@react-spring/web";
import { trackCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Tipo = "fibrocimento" | "metalico";

export type EtapaPasso = {
  titulo: string;
  /** Passos comuns às duas variantes (quando o manual não separa) */
  todos?: readonly string[];
  fibrocimento?: readonly string[];
  metalico?: readonly string[];
};

export type PassoAPassoProps = {
  etapas: EtapaPasso[];
  nota: string;
  rotulos: { todos: string; abas: Record<Tipo, string> };
};

/**
 * As 3 etapas do manual em colunas (desktop) / empilhadas (mobile), com
 * numeração mono e toggle Fibrocimento | Metálico para as etapas em que o
 * manual separa os passos. Entrada com useTrail; só transform/opacity.
 */
export function PassoAPasso({ etapas, nota, rotulos }: PassoAPassoProps) {
  const [tipo, setTipo] = useState<Tipo>("fibrocimento");
  const [ref, inView] = useInView({ once: true, amount: 0.2 });
  const trail = useTrail(etapas.length, {
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0,20px,0)",
    config: { tension: 210, friction: 26 },
  });

  const trocar = (t: Tipo) => {
    if (t === tipo) return;
    setTipo(t);
    trackCta({ cta_id: `passo-a-passo-${t}`, tipo: "aba", valor: t });
  };

  return (
    <div ref={ref}>
      <div role="group" aria-label="Tipo de telhado" className="inline-flex border border-linha bg-superficie p-1">
        {(Object.keys(rotulos.abas) as Tipo[]).map((t) => (
          <button
            key={t}
            type="button"
            aria-pressed={t === tipo}
            onClick={() => trocar(t)}
            className={cn(
              "min-h-11 cursor-pointer px-5 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
              t === tipo ? "bg-laranja text-preto" : "text-aco hover:text-branco"
            )}
          >
            {rotulos.abas[t]}
          </button>
        ))}
      </div>

      <ol className="relative mt-8 grid gap-8 lg:grid-cols-3 lg:gap-6">
        {/* Perfil horizontal ligando as etapas (desktop) */}
        <div aria-hidden className="absolute top-5 right-0 left-0 hidden h-0.5 bg-linha lg:block" />
        {trail.map((style, i) => {
          const etapa = etapas[i];
          const passos = etapa.todos ?? etapa[tipo] ?? [];
          const comum = Boolean(etapa.todos);
          return (
            <animated.li key={etapa.titulo} style={style} className="relative lg:pt-12">
              {/* Estaca numerada */}
              <span className="relative z-10 inline-flex size-10 items-center justify-center border-2 border-laranja bg-fundo font-mono text-sm font-medium text-laranja lg:absolute lg:top-0 lg:left-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-xl font-bold sm:text-2xl lg:mt-0">{etapa.titulo}</h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-aco">{comum ? rotulos.todos : rotulos.abas[tipo]}</p>
              <ol className="mt-4 space-y-3">
                {passos.map((p, j) => (
                  <li key={p} className="flex gap-3 text-sm leading-relaxed text-branco/90">
                    <span className="shrink-0 font-mono text-xs text-laranja tabular">
                      {i + 1}.{j + 1}
                    </span>
                    {p}
                  </li>
                ))}
              </ol>
            </animated.li>
          );
        })}
      </ol>

      <p className="mt-10 border-l-2 border-laranja pl-4 text-sm leading-relaxed text-aco">{nota}</p>
    </div>
  );
}
