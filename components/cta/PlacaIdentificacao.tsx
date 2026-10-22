import { cn } from "@/lib/utils";

type Variant = "laranja" | "contorno" | "navy" | "clara";

/**
 * Selo em pílula (Pronta entrega, Engenharia própria, Linha Titan, Novo…).
 * Texto em caixa-alta, borda 1px; a variante laranja é o badge "Novo".
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
    laranja: "bg-laranja text-branco border-laranja",
    contorno: "bg-branco/10 text-branco border-branco/15 backdrop-blur-sm",
    navy: "bg-navy text-branco border-navy",
    clara: "bg-placa-clara text-preto border-placa-clara",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border font-sans font-semibold uppercase tracking-[0.12em]",
        size === "sm" ? "px-3 py-1 text-[10px]" : "px-4 py-1.5 text-xs",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
