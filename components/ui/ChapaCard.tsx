import { cn } from "@/lib/utils";

/**
 * Cartão-padrão do site: "chapa" petróleo com cantos arredondados, borda 1px e
 * numeração opcional (01–06). No hover só a borda muda e o card sobe 2px.
 */
export function ChapaCard({
  numero,
  className,
  children,
  as: Tag = "div",
  claro = false,
  interactive = false,
}: {
  numero?: string;
  className?: string;
  children: React.ReactNode;
  as?: "div" | "li" | "article";
  /** Variante "ficha técnica": fundo claro para renders com fundo cinza */
  claro?: boolean;
  interactive?: boolean;
}) {
  return (
    <Tag
      className={cn(
        "relative rounded-2xl border p-6 transition-[border-color,transform] duration-200 sm:p-7",
        claro ? "border-placa-clara/60 bg-placa-clara text-preto" : "border-linha bg-chapa text-branco",
        interactive && "hover:-translate-y-0.5 hover:border-laranja/60",
        className
      )}
    >
      {numero ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-4 right-5 font-mono text-xs font-semibold tracking-[0.2em]",
            claro ? "text-preto/40" : "text-laranja-texto"
          )}
        >
          {numero}
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
