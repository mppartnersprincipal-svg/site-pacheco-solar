import { cn } from "@/lib/utils";

type Variant = "laranja" | "contorno" | "navy" | "clara";

/**
 * Badge inspirado no produto "placa de identificação" (item avulso da Pacheco):
 * retângulo com dois furos nos cantos e texto em caixa-alta. Usado como selo
 * (Pronta entrega, Engenharia própria, Entrega em todo o Brasil, Linha Titan, Novo).
 */
export function PlacaIdentificacao({
  children,
  variant = "contorno",
  className,
  size = "md",
}: {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm" | "md";
}) {
  const variants: Record<Variant, string> = {
    laranja: "bg-laranja text-preto border-laranja",
    contorno: "bg-transparent text-branco border-aco/60",
    navy: "bg-navy text-branco border-navy",
    clara: "bg-placa-clara text-preto border-placa-clara",
  };
  return (
    <span
      className={cn(
        "relative inline-flex items-center gap-2 border font-display font-semibold uppercase tracking-[0.14em]",
        size === "sm" ? "px-3 py-1 text-[10px]" : "px-4 py-1.5 text-xs",
        variants[variant],
        className
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-50" />
      {children}
      <span aria-hidden className="size-1.5 rounded-full bg-current opacity-50" />
    </span>
  );
}
