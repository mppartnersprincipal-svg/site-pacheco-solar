import { cn } from "@/lib/utils";

/**
 * Mapa de presença: contorno simplificado do Brasil (polígono estilizado,
 * ~30 vértices em projeção equiretangular: x = (lon + 74) * 10, y = (6 - lat) * 10)
 * com pino laranja em Aparecida de Goiânia/GO e dois anéis em arco solar.
 * SVG estático em Server Component; o pulso é CSS (transform/opacity).
 * Não é um mapa de navegação: o link "Abrir no Google Maps" fica ao lado.
 */
const CONTORNO =
  "224,16 196,10 160,6 140,8 118,16 100,22 84,36 70,45 52,48 41,58 38,80 41,102 22,118 1,135 4,148 10,155 30,160 56,166 87,170 108,186 118,200 135,210 150,228 164,250 170,276 184,296 194,315 180,334 164,362 182,384 206,397 222,384 235,370 246,352 255,336 266,318 277,300 296,294 320,290 332,278 337,263 346,236 355,190 372,160 392,132 391,140 380,118 355,97 326,90 297,85 276,76 255,70 246,56 240,45 232,30";

/** Aparecida de Goiânia/GO ≈ lon -49,2 · lat -16,8 */
const PINO = { x: 248, y: 228 };

export function MapaPresenca({ className, legenda = "Aparecida de Goiânia/GO" }: { className?: string; legenda?: string }) {
  return (
    <figure className={cn("relative rounded-2xl border border-linha bg-chapa grade-modulos p-4 sm:p-6", className)}>
      <svg viewBox="0 0 400 410" role="img" aria-labelledby="mapa-presenca-titulo" className="mx-auto h-auto w-full max-w-md">
        <title id="mapa-presenca-titulo">{`Mapa do Brasil com a Pacheco Solar marcada em ${legenda}, no centro do país`}</title>
        <defs>
          <pattern id="mapa-grade" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M24 0H0V24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-branco/10" />
          </pattern>
        </defs>
        {/* Contorno */}
        <polygon points={CONTORNO} fill="url(#mapa-grade)" className="text-branco" />
        <polygon
          points={CONTORNO}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
          className="text-aco/70"
          vectorEffect="non-scaling-stroke"
        />
        {/* Anéis em arco solar (dois arcos concêntricos abertos em cima, como o "SOLAR" da logo) */}
        <g className="text-laranja" fill="none" stroke="currentColor" strokeLinecap="round" vectorEffect="non-scaling-stroke">
          <path d={`M${PINO.x - 44} ${PINO.y + 18} A 48 48 0 1 1 ${PINO.x + 44} ${PINO.y + 18}`} strokeWidth="1.5" opacity="0.5" />
          <path d={`M${PINO.x - 72} ${PINO.y + 30} A 78 78 0 1 1 ${PINO.x + 72} ${PINO.y + 30}`} strokeWidth="1" opacity="0.3" />
        </g>
        {/* Pulso (CSS, só transform/opacity) */}
        <circle
          cx={PINO.x}
          cy={PINO.y}
          r="14"
          className="fill-laranja/40 animate-pulso motion-reduce:animate-none"
          style={{ transformOrigin: `${PINO.x}px ${PINO.y}px`, transformBox: "view-box" }}
        />
        {/* Pino */}
        <circle cx={PINO.x} cy={PINO.y} r="7" className="fill-laranja" />
        <circle cx={PINO.x} cy={PINO.y} r="2.5" className="fill-preto" />
        {/* Legenda do pino */}
        <text
          x={PINO.x + 16}
          y={PINO.y + 4}
          className="fill-branco font-mono"
          fontSize="11"
          letterSpacing="1"
        >
          {legenda.toUpperCase()}
        </text>
      </svg>
      <figcaption className="mt-3 flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-aco">
        <span>Centro do Brasil</span>
        <span className="flex items-center gap-2">
          <span aria-hidden className="inline-block size-2 rounded-full bg-laranja" />
          Pacheco Solar
        </span>
      </figcaption>
    </figure>
  );
}
