import { TITAN } from "@/lib/produtos/titan";
import { cn } from "@/lib/utils";

const LARGURA = 1200;
const ALTURA = 420;
const DEGRAU_LARGURA = LARGURA / TITAN.isopleta.length;
const ALTURA_MIN = 120;
const ALTURA_MAX = 360;

/**
 * Grafismo de fundo do hero: a tabela de isopleta do manual desenhada como 4
 * degraus (quanto maior o vento, menor a distância entre apoios). SVG estático,
 * navy a 10%, decorativo. Nunca reproduz o mapa da NBR-6123.
 */
export function IsopletaGrafismo({ className }: { className?: string }) {
  const distancias = TITAN.isopleta.map((d) => d.distanciaM);
  const min = Math.min(...distancias);
  const max = Math.max(...distancias);
  const alturaDe = (d: number) => ALTURA_MIN + ((d - min) / (max - min)) * (ALTURA_MAX - ALTURA_MIN);

  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${LARGURA} ${ALTURA}`}
      preserveAspectRatio="xMaxYMax slice"
      className={cn("pointer-events-none text-navy", className)}
    >
      {TITAN.isopleta.map((d, i) => {
        const h = alturaDe(d.distanciaM);
        const x = i * DEGRAU_LARGURA;
        return (
          <g key={d.faixa}>
            <rect x={x} y={ALTURA - h} width={DEGRAU_LARGURA - 2} height={h} fill="currentColor" opacity={0.1} />
            <line
              x1={x}
              x2={x + DEGRAU_LARGURA - 2}
              y1={ALTURA - h}
              y2={ALTURA - h}
              stroke="currentColor"
              strokeWidth={2}
              opacity={0.35}
            />
          </g>
        );
      })}
      {/* Haste estrutural (linha de cota) atravessando os degraus */}
      <line x1={0} x2={LARGURA} y1={ALTURA - 1} y2={ALTURA - 1} stroke="currentColor" strokeWidth={2} opacity={0.3} />
    </svg>
  );
}
