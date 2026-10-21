"use client";

import { animated, useInView, useSpring, useTrail } from "@react-spring/web";
import { cn } from "@/lib/utils";

const ORIGENS = [36, 88, 140, 192, 244];
const DESTINO_X = 330;
const DESTINO_Y = 140;

interface ConvergenciaFornecedoresProps {
  className?: string;
  rotuloDestino: string;
}

/**
 * SVG decorativo: vários pontos à esquerda (fornecedores soltos) convergem em
 * um único trilho laranja à direita (Pacheco). Linhas desenham por
 * stroke-dashoffset ao entrar na tela (useTrail), depois o trilho (useSpring).
 */
export function ConvergenciaFornecedores({ className, rotuloDestino }: ConvergenciaFornecedoresProps) {
  const [ref, inView] = useInView({ once: true, amount: 0.4 });

  const linhas = useTrail(ORIGENS.length, {
    offset: inView ? 0 : 1,
    pontoOpacity: inView ? 1 : 0,
    config: { tension: 70, friction: 22 },
  });

  const trilho = useSpring({
    offset: inView ? 0 : 1,
    delay: 450,
    config: { tension: 80, friction: 22 },
  });

  const rotulo = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translate3d(0,0,0)" : "translate3d(0,6px,0)",
    delay: 800,
    config: { tension: 200, friction: 24 },
  });

  return (
    <svg
      ref={ref}
      aria-hidden
      viewBox="0 0 600 280"
      className={cn("h-auto w-full", className)}
      preserveAspectRatio="xMidYMid meet"
    >
      {linhas.map((style, i) => {
        const y = ORIGENS[i];
        return (
          <g key={y}>
            <animated.circle cx="24" cy={y} r="5" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-aco" style={{ opacity: style.pontoOpacity }} />
            <animated.path
              d={`M30 ${y} C 150 ${y}, 200 ${DESTINO_Y}, ${DESTINO_X} ${DESTINO_Y}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="1"
              pathLength={1}
              strokeDashoffset={style.offset}
              className="text-aco/70"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        );
      })}

      {/* Trilho único (perfil com gaveta lateral) */}
      <animated.path
        d={`M${DESTINO_X} ${DESTINO_Y} H470 L478 ${DESTINO_Y - 6} H520 L528 ${DESTINO_Y} H580`}
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray="1"
        pathLength={1}
        strokeDashoffset={trilho.offset}
        className="text-laranja"
        vectorEffect="non-scaling-stroke"
      />
      <animated.path
        d={`M478 ${DESTINO_Y + 6} H520`}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeDasharray="1"
        pathLength={1}
        strokeDashoffset={trilho.offset}
        className="text-laranja/60"
        vectorEffect="non-scaling-stroke"
      />
      <animated.circle cx={DESTINO_X} cy={DESTINO_Y} r="7" fill="currentColor" className="text-laranja" style={{ opacity: trilho.offset.to((o) => 1 - o) }} />

      <animated.text
        x="580"
        y={DESTINO_Y + 34}
        textAnchor="end"
        fill="currentColor"
        className="font-mono text-[11px] uppercase tracking-[0.2em] text-branco"
        style={rotulo}
      >
        {rotuloDestino}
      </animated.text>
    </svg>
  );
}
