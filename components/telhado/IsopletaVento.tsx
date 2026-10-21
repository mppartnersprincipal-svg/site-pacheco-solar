"use client";

import { useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

export type DegrauIsopleta = { faixa: string; velocidadeMin: number; velocidadeMax: number; distanciaM: number };

export type IsopletaVentoProps = {
  degraus: DegrauIsopleta[];
  nota: string;
  rotulos: { titulo: string; ajuda: string; unidade: string; rotuloDistancia: string };
};

const LARGURA = 480;
const ALTURA = 220;
const MARGEM_X = 16;
const ALTURA_MIN = 70;
const ALTURA_MAX = 180;

/**
 * Tabela de isopleta do manual (NBR-6123) como gráfico de 4 degraus em SVG:
 * quanto maior a velocidade do vento, menor a distância entre apoios. Botões
 * aria-pressed selecionam o degrau; o destaque desliza com useSpring. Nunca
 * reproduz o mapa da norma — só a tabela.
 */
export function IsopletaVento({ degraus, nota, rotulos }: IsopletaVentoProps) {
  const [ativo, setAtivo] = useState(0);
  const distancias = degraus.map((d) => d.distanciaM);
  const min = Math.min(...distancias);
  const max = Math.max(...distancias);
  const larguraDegrau = (LARGURA - MARGEM_X * 2) / degraus.length;
  const alturaDe = (d: number) => ALTURA_MIN + ((d - min) / (max - min || 1)) * (ALTURA_MAX - ALTURA_MIN);
  const degrau = degraus[ativo];

  const destaque = useSpring({
    transform: `translate3d(${MARGEM_X + ativo * larguraDegrau}px,0,0)`,
    config: { tension: 240, friction: 26 },
  });
  const valor = useSpring({ n: degrau.distanciaM, config: { tension: 180, friction: 24 } });

  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-laranja">{rotulos.titulo}</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-12 sm:items-end">
        <div className="sm:col-span-8">
          <svg viewBox={`0 0 ${LARGURA} ${ALTURA}`} role="img" aria-label={`${rotulos.titulo}: ${degraus.map((d) => `${d.faixa} ${d.distanciaM} ${rotulos.unidade}`).join("; ")}`} className="h-auto w-full">
            {/* Destaque deslizante do degrau ativo (transform) */}
            <animated.rect style={destaque} x={0} y={0} width={larguraDegrau} height={ALTURA} fill="#d35400" opacity={0.12} />
            {degraus.map((d, i) => {
              const h = alturaDe(d.distanciaM);
              const x = MARGEM_X + i * larguraDegrau;
              const selecionado = i === ativo;
              return (
                <g key={d.faixa}>
                  <rect x={x + 4} y={ALTURA - 28 - h} width={larguraDegrau - 8} height={h} fill={selecionado ? "#d35400" : "#26282b"} stroke={selecionado ? "#d35400" : "#3a3d42"} strokeWidth={1.5} />
                  <text x={x + larguraDegrau / 2} y={ALTURA - 36 - h} textAnchor="middle" fill={selecionado ? "#ffffff" : "#9aa3ad"} fontSize={15} fontWeight={600} style={{ fontFamily: "var(--font-display)" }}>
                    {d.distanciaM.toLocaleString("pt-BR")} {rotulos.unidade}
                  </text>
                  <text x={x + larguraDegrau / 2} y={ALTURA - 10} textAnchor="middle" fill="#9aa3ad" fontSize={11} style={{ fontFamily: "var(--font-mono)" }}>
                    {d.faixa}
                  </text>
                </g>
              );
            })}
            <line x1={MARGEM_X} x2={LARGURA - MARGEM_X} y1={ALTURA - 28} y2={ALTURA - 28} stroke="#3a3d42" strokeWidth={2} />
          </svg>
        </div>
        <div className="sm:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-aco">{degrau.faixa}</p>
          <p className="mt-1 font-display text-5xl font-bold leading-none tabular text-branco">
            <animated.span>{valor.n.to((n) => n.toFixed(1).replace(".", ","))}</animated.span>
            <span className="ml-1 text-2xl text-laranja">{rotulos.unidade}</span>
          </p>
          <p className="mt-1 text-sm text-aco">{rotulos.rotuloDistancia}</p>
        </div>
      </div>

      <p className="mt-4 text-xs text-aco">{rotulos.ajuda}</p>
      <div role="group" aria-label={rotulos.titulo} className="mt-2 flex flex-wrap gap-2">
        {degraus.map((d, i) => (
          <button
            key={d.faixa}
            type="button"
            aria-pressed={i === ativo}
            onClick={() => setAtivo(i)}
            className={cn(
              "min-h-11 cursor-pointer border px-4 font-mono text-xs tabular transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
              i === ativo ? "border-laranja bg-laranja text-preto" : "border-linha text-aco hover:border-aco hover:text-branco"
            )}
          >
            {d.faixa}
          </button>
        ))}
      </div>
      <p className="mt-5 max-w-2xl text-sm leading-relaxed text-aco">{nota}</p>
    </div>
  );
}
