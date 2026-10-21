"use client";

import { useState } from "react";
import { animated, useReducedMotion, useSpring } from "@react-spring/web";
import { cn } from "@/lib/utils";

export type VersaoCorte = { id: string; nome: string; swatch: string };

interface VedacapCorteProps {
  versoes: readonly VersaoCorte[];
  rotulos: {
    telha: string;
    parafuso: string;
    arruela: string;
    capa: string;
    sol: string;
    chuva: string;
    goteira: string;
  };
  toggleSem: string;
  toggleCom: string;
  corLabel: string;
  legenda: string;
  titulo: string;
}

/** Preenchimento da capa por versão (id de VEDACAP.versoes). */
const FILL_CAPA: Record<string, string> = {
  natural: "url(#vc-aluzinco)",
  branco: "#ffffff",
  preto: "#1c1c1c",
};

const PARAFUSO_X = 100;
const TELHA_TOPO = 170;
const CHUVA_X = [372, 404, 436];

/**
 * Corte transversal em SVG: telha trapezoidal → parafuso autobrocante →
 * arruela de vedação → capa Vedacap. Toggle "sem / com Vedacap" (a capa
 * encaixa com translateY via useSpring) e seletor das 3 cores (aria-pressed).
 * Chuva e goteira animam só transform/opacity; sob reduced-motion o
 * react-spring pula para o estado final.
 */
export function VedacapCorte({ versoes, rotulos, toggleSem, toggleCom, corLabel, legenda, titulo }: VedacapCorteProps) {
  const [com, setCom] = useState(true);
  const [cor, setCor] = useState(versoes[0]?.id ?? "natural");
  // Sob prefers-reduced-motion os loops ficam parados no quadro final (sem reinício por frame)
  const reduzir = useReducedMotion() ?? false;

  const capa = useSpring({
    from: { y: -70, opacity: 0 },
    y: com ? 0 : -70,
    opacity: com ? 1 : 0,
    config: { tension: 170, friction: 20 },
  });

  const chuva = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    loop: !reduzir,
    pause: reduzir,
    config: { duration: 1500 },
  });

  const goteira = useSpring({
    from: { g: 0 },
    to: { g: 1 },
    loop: !reduzir,
    pause: com || reduzir,
    config: { duration: 1300 },
  });

  const trincas = useSpring({ opacity: com ? 0 : 1, config: { tension: 200, friction: 24 } });

  return (
    <figure className="chanfro border border-branco/10 bg-fundo/70 p-4 sm:p-5">
      <figcaption className="mb-3 flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-aco">
        <span>{titulo}</span>
        <span aria-live="polite" className={cn(com ? "text-laranja-texto" : "text-aco")}>
          {com ? toggleCom : toggleSem}
        </span>
      </figcaption>

      <svg viewBox="0 0 480 300" role="img" aria-label={`${titulo}: ${rotulos.telha}, ${rotulos.parafuso}, ${rotulos.arruela} e ${rotulos.capa}`} className="h-auto w-full">
        <defs>
          <linearGradient id="vc-aluzinco" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#8d949c" />
            <stop offset="0.48" stopColor="#e6e9ec" />
            <stop offset="1" stopColor="#8d949c" />
          </linearGradient>
          <clipPath id="vc-acima-telha">
            <rect x="0" y="0" width="480" height={TELHA_TOPO - 2} />
          </clipPath>
        </defs>

        {/* Sol */}
        <g className="text-laranja" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="54" cy="48" r="16" stroke="none" />
          <path d="M54 20v8M54 68v8M26 48h8M74 48h8M34 28l6 6M68 62l6 6M34 68l6-6M68 34l6-6" fill="none" />
        </g>
        <text x="54" y="96" textAnchor="middle" fill="#9aa3ad" className="font-mono text-[10px] uppercase tracking-[0.18em]">
          {rotulos.sol}
        </text>

        {/* Chuva (3 gotas em fase) */}
        <g clipPath="url(#vc-acima-telha)" className="text-azul-idv" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {CHUVA_X.map((x, i) => (
            <animated.path
              key={x}
              d={`M${x} 16v14`}
              style={{
                opacity: chuva.t.to((v) => {
                  const p = (v + i * 0.33) % 1;
                  return p < 0.85 ? 0.9 : 0;
                }),
                transform: chuva.t.to((v) => `translateY(${((v + i * 0.33) % 1) * 130}px)`),
              }}
            />
          ))}
        </g>
        <text x="404" y="96" textAnchor="middle" fill="#9aa3ad" className="font-mono text-[10px] uppercase tracking-[0.18em]">
          {rotulos.chuva}
        </text>

        {/* Haste do parafuso (atrás da telha) */}
        <rect x={PARAFUSO_X - 4} y="166" width="8" height="66" fill="#aeb4ba" />
        <g stroke="#5b6168" strokeWidth="1.2">
          {[176, 184, 192, 200, 208, 216, 224].map((y) => (
            <line key={y} x1={PARAFUSO_X - 4} y1={y} x2={PARAFUSO_X + 4} y2={y - 3} />
          ))}
        </g>

        {/* Telha trapezoidal */}
        <path
          d="M0 200 H40 L70 170 H130 L160 200 H220 L250 170 H310 L340 200 H400 L430 170 H480"
          fill="none"
          stroke="#7d848c"
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <path
          d="M0 196 H38 L68 166 H132 L162 196 H218 L248 166 H312 L342 196 H398 L428 166 H480"
          fill="none"
          stroke="#c9ced3"
          strokeWidth="1"
          strokeLinejoin="round"
          opacity="0.7"
        />
        <text x="472" y="236" textAnchor="end" fill="#9aa3ad" className="font-mono text-[10px] uppercase tracking-[0.18em]">
          {rotulos.telha}
        </text>

        {/* Arruela de vedação (EPDM) + trincas quando sem Vedacap */}
        <rect x={PARAFUSO_X - 14} y="160" width="28" height="7" rx="1" fill="#2a2d31" stroke="#3a3d42" />
        <animated.g style={trincas} stroke="#d35400" strokeWidth="1.2" strokeLinecap="round">
          <path d={`M${PARAFUSO_X - 10} 161 l3 5`} />
          <path d={`M${PARAFUSO_X + 2} 160 l-2 6`} />
          <path d={`M${PARAFUSO_X + 9} 162 l2 4`} />
        </animated.g>

        {/* Cabeça sextavada */}
        <path
          d={`M${PARAFUSO_X - 10} 160 V152 L${PARAFUSO_X - 6} 148 H${PARAFUSO_X + 6} L${PARAFUSO_X + 10} 152 V160 Z`}
          fill="#c9ced3"
          stroke="#5b6168"
          strokeWidth="1"
        />

        {/* Goteira (só sem Vedacap) */}
        <animated.g
          style={{
            opacity: goteira.g.to((v) => (com ? 0 : v < 0.8 ? 0.95 : 0)),
            transform: goteira.g.to((v) => `translateY(${v * 60}px)`),
          }}
        >
          <path d={`M${PARAFUSO_X} 214 q-4 6 0 10 q4 -4 0 -10`} fill="#0686a4" />
        </animated.g>
        <animated.text
          x={PARAFUSO_X + 14}
          y="268"
          fill="#d35400"
          className="font-mono text-[10px] uppercase tracking-[0.18em]"
          style={{ opacity: trincas.opacity }}
        >
          {rotulos.goteira}
        </animated.text>

        {/* Capa Vedacap (encaixa com translateY) */}
        <animated.g style={{ opacity: capa.opacity, transform: capa.y.to((v) => `translateY(${v}px)`) }}>
          <path
            d={`M${PARAFUSO_X - 18} 170 V158 Q${PARAFUSO_X - 18} 136 ${PARAFUSO_X} 134 Q${PARAFUSO_X + 18} 136 ${PARAFUSO_X + 18} 158 V170 Z`}
            fill={FILL_CAPA[cor] ?? FILL_CAPA.natural}
            stroke={cor === "preto" ? "#5b6168" : "#6b7280"}
            strokeWidth="1.2"
          />
          <path d={`M${PARAFUSO_X - 10} 150 Q${PARAFUSO_X - 4} 141 ${PARAFUSO_X + 4} 141`} fill="none" stroke="#ffffff" strokeWidth="1" opacity={cor === "preto" ? 0.25 : 0.7} />
        </animated.g>

        {/* Cotas / rótulos à direita */}
        <g stroke="#3a3d42" strokeWidth="1" strokeDasharray="2 3">
          <line x1={PARAFUSO_X + 20} y1="140" x2="176" y2="124" />
          <line x1={PARAFUSO_X + 10} y1="152" x2="176" y2="146" />
          <line x1={PARAFUSO_X + 14} y1="164" x2="176" y2="168" />
        </g>
        <g fill="#9aa3ad" className="font-mono text-[10px] uppercase tracking-[0.18em]">
          <animated.text x="182" y="128" style={{ opacity: capa.opacity }} fill="#ffffff">
            {rotulos.capa}
          </animated.text>
          <text x="182" y="150">
            {rotulos.parafuso}
          </text>
          <text x="182" y="172">
            {rotulos.arruela}
          </text>
        </g>
      </svg>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div role="group" aria-label={titulo} className="flex gap-2">
          <button
            type="button"
            aria-pressed={!com}
            onClick={() => setCom(false)}
            className={cn(
              "min-h-11 flex-1 chanfro-sm px-3 font-display text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
              !com ? "bg-branco text-preto" : "border border-branco/30 text-branco hover:border-branco/60"
            )}
          >
            {toggleSem}
          </button>
          <button
            type="button"
            aria-pressed={com}
            onClick={() => setCom(true)}
            className={cn(
              "min-h-11 flex-1 chanfro-sm px-3 font-display text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
              com ? "bg-laranja text-preto" : "border border-branco/30 text-branco hover:border-branco/60"
            )}
          >
            {toggleCom}
          </button>
        </div>
        <div role="group" aria-label={corLabel} className="flex items-center gap-2 sm:justify-end">
          <span className="mr-1 font-mono text-[10px] uppercase tracking-[0.18em] text-aco">{corLabel}</span>
          {versoes.map((v) => {
            const on = v.id === cor;
            return (
              <button
                key={v.id}
                type="button"
                aria-pressed={on}
                aria-label={v.nome}
                title={v.nome}
                onClick={() => setCor(v.id)}
                className={cn(
                  "flex size-11 items-center justify-center chanfro-sm border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
                  on ? "border-laranja" : "border-branco/20 hover:border-branco/50"
                )}
              >
                <span aria-hidden className={cn("block size-6 chanfro-sm", v.swatch)} />
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-laranja-texto">{legenda}</p>
    </figure>
  );
}
