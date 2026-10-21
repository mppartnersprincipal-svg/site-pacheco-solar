"use client";

import { useState } from "react";
import { animated, useInView, useSprings } from "@react-spring/web";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Tipo = "fibrocimento" | "metalico";

type Camada = { id: string; rotulo: string };

const CAMADAS: Record<Tipo, Camada[]> = {
  fibrocimento: [
    { id: "telha", rotulo: "Telha de fibrocimento" },
    { id: "fixacao", rotulo: "Haste estrutural" },
    { id: "perfil", rotulo: "Perfil Titan" },
    { id: "grampos", rotulo: "Grampos final e intermediário" },
    { id: "modulo", rotulo: "Módulos" },
  ],
  metalico: [
    { id: "telha", rotulo: "Telha metálica" },
    { id: "fixacao", rotulo: "Espuma EPDM + parafuso brocante" },
    { id: "perfil", rotulo: "Mini-trilho" },
    { id: "grampos", rotulo: "Grampos final e intermediário" },
    { id: "modulo", rotulo: "Módulos" },
  ],
};

/** Deslocamento vertical (px no viewBox) de cada camada quando explodida */
const PASSO_EXPLOSAO = 34;
/** Largura da área desenhada; à direita ficam as cotas/legendas */
const LARGURA_DESENHO = 420;
const LARGURA_TOTAL = 640;
/** Linha de cota (y no viewBox) de cada camada, no estado montado */
const ALTURA_COTA = [272, 230, 188, 166, 154] as const;
const CONFIG = { tension: 170, friction: 24 };

export type KitExplodidoProps = {
  tipo: Tipo;
  rotulos: { montar: string; explodir: string; legenda: string };
  className?: string;
};

/**
 * Vista explodida simplificada do kit Titan (SVG): telha → fixação → perfil →
 * grampos → módulo. Monta ao entrar na tela (useSprings em translateY por
 * camada); no mobile há o botão Montar/Explodir. Só transform/opacity.
 */
export function KitExplodido({ tipo, rotulos, className }: KitExplodidoProps) {
  const [ref, inView] = useInView({ once: true, amount: 0.4 });
  /** null = segue a entrada na tela; true/false = escolha manual pelo botão */
  const [manual, setManual] = useState<boolean | null>(null);
  const montado = manual ?? inView;
  const camadas = CAMADAS[tipo];

  const springs = useSprings(
    camadas.length,
    camadas.map((_, i) => ({
      transform: montado ? "translate3d(0,0,0)" : `translate3d(0,${-PASSO_EXPLOSAO * i}px,0)`,
      config: CONFIG,
    }))
  );
  const rotulosSprings = useSprings(
    camadas.length,
    camadas.map((_, i) => ({
      opacity: montado ? 0 : 1,
      transform: montado ? "translate3d(8px,0,0)" : `translate3d(0,${-PASSO_EXPLOSAO * i}px,0)`,
      config: CONFIG,
    }))
  );

  return (
    <div ref={ref} className={cn("relative", className)}>
      <svg
        viewBox={`0 0 ${LARGURA_TOTAL} 330`}
        role="img"
        aria-label={`${rotulos.legenda} — ${camadas.map((c) => c.rotulo).join(", ")}`}
        className="h-auto w-full"
      >
        {/* 0 · Telha */}
        <animated.g style={springs[0]}>
          {tipo === "fibrocimento" ? (
            <path
              d="M20 262 q22 -22 44 0 t44 0 t44 0 t44 0 t44 0 t44 0 t44 0 v30 H20 z"
              fill="currentColor"
              className="text-chapa"
              stroke="#3a3d42"
              strokeWidth={1.5}
            />
          ) : (
            <path
              d="M20 292 V262 l16 -14 h30 l16 14 h30 l16 -14 h30 l16 14 h30 l16 -14 h30 l16 14 h30 l16 -14 h20 v44 z"
              fill="currentColor"
              className="text-chapa"
              stroke="#3a3d42"
              strokeWidth={1.5}
            />
          )}
        </animated.g>

        {/* 1 · Fixação: hastes (fibrocimento) ou EPDM + parafusos (metálico) */}
        <animated.g style={springs[1]}>
          {tipo === "fibrocimento"
            ? [60, 150, 240, 330].map((x) => (
                <g key={x}>
                  <rect x={x - 3} y={196} width={6} height={60} fill="#9aa3ad" />
                  <rect x={x - 9} y={206} width={18} height={6} fill="#d35400" />
                  <circle cx={x} cy={200} r={5} fill="#e9eaec" />
                </g>
              ))
            : [70, 200, 330].map((x) => (
                <g key={x}>
                  <rect x={x - 34} y={244} width={68} height={6} fill="#1a4b8c" />
                  {[-22, -8, 8, 22].map((dx) => (
                    <rect key={dx} x={x + dx - 2} y={222} width={4} height={22} fill="#9aa3ad" />
                  ))}
                </g>
              ))}
        </animated.g>

        {/* 2 · Perfil Titan (longo) ou mini-trilhos */}
        <animated.g style={springs[2]}>
          {tipo === "fibrocimento" ? (
            <g>
              <rect x={30} y={178} width={360} height={20} fill="#9aa3ad" />
              <rect x={30} y={185} width={360} height={6} fill="#6b737c" />
            </g>
          ) : (
            [70, 200, 330].map((x) => (
              <g key={x}>
                <rect x={x - 36} y={178} width={72} height={22} fill="#9aa3ad" />
                <rect x={x - 36} y={186} width={72} height={6} fill="#6b737c" />
              </g>
            ))
          )}
        </animated.g>

        {/* 3 · Grampos: final · intermediário · final */}
        <animated.g style={springs[3]}>
          {[46, 210, 374].map((x, i) => (
            <g key={x}>
              <path
                d={`M${x - 12} 176 v-12 h24 v12`}
                fill="none"
                stroke="#d35400"
                strokeWidth={4}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
              <rect x={x - 2} y={150} width={4} height={14} fill="#e9eaec" />
              {i === 1 ? <rect x={x - 24} y={168} width={48} height={4} fill="#d35400" /> : null}
            </g>
          ))}
        </animated.g>

        {/* 4 · Módulos */}
        <animated.g style={springs[4]}>
          {[48, 216].map((x) => (
            <g key={x}>
              <rect x={x} y={146} width={156} height={16} fill="#1a4b8c" stroke="#e9eaec" strokeWidth={1.5} />
              {[26, 52, 78, 104, 130].map((dx) => (
                <line key={dx} x1={x + dx} x2={x + dx} y1={147} y2={161} stroke="#e9eaec" strokeWidth={1} opacity={0.5} />
              ))}
            </g>
          ))}
        </animated.g>

        {/* Cotas e legendas mono à direita, só no estado explodido */}
        {camadas.map((c, i) => {
          const y = ALTURA_COTA[i];
          return (
            <animated.g key={c.id} style={rotulosSprings[i]}>
              <line x1={LARGURA_DESENHO} x2={LARGURA_DESENHO + 14} y1={y} y2={y} stroke="#9aa3ad" strokeWidth={1} />
              <text x={LARGURA_DESENHO + 20} y={y + 4} fill="#9aa3ad" fontSize={10} letterSpacing={1} style={{ fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                {String(i + 1).padStart(2, "0")} {c.rotulo}
              </text>
            </animated.g>
          );
        })}
      </svg>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-aco">{rotulos.legenda}</p>
        <Button
          variant="secondary"
          size="md"
          aria-pressed={montado}
          onClick={() => setManual(!montado)}
          className="lg:hidden"
        >
          {montado ? rotulos.explodir : rotulos.montar}
        </Button>
        <Button
          variant="ghost"
          size="md"
          aria-pressed={montado}
          onClick={() => setManual(!montado)}
          className="hidden lg:inline-flex"
        >
          {montado ? rotulos.explodir : rotulos.montar}
        </Button>
      </div>
    </div>
  );
}
