import { cn } from "@/lib/utils";

/**
 * Divisor de seção desenhado como o perfil de alumínio da Linha Titan, com o
 * rebaixo da "gaveta lateral". SVG estático (1 path), cor do trilho inativo ou laranja.
 */
export function TrilhoDivisor({ className, ativo = false }: { className?: string; ativo?: boolean }) {
  return (
    <div aria-hidden className={cn("w-full overflow-hidden", className)}>
      <svg viewBox="0 0 1200 14" preserveAspectRatio="none" className={cn("h-3.5 w-full", ativo ? "text-laranja" : "text-linha")}>
        <path
          d="M0 7 H540 L548 1 H652 L660 7 H1200"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        <path d="M548 13 H652" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  );
}
