import { cn } from "@/lib/utils";

/**
 * Cartão-padrão do site: "chapa" #26282B com cantos chanfrados (corte de perfil),
 * borda 1px e numeração mono opcional (01–06). Sem sombra animada: só a borda
 * muda no hover (transition de cor).
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
        "relative chanfro border p-6 transition-colors duration-200 sm:p-7",
        claro ? "border-placa-clara/60 bg-placa-clara text-preto" : "border-linha bg-chapa text-branco",
        interactive && "hover:border-laranja",
        className
      )}
    >
      {numero ? (
        <span
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-4 right-5 font-mono text-xs tracking-[0.2em]",
            claro ? "text-preto/40" : "text-aco/70"
          )}
        >
          {numero}
        </span>
      ) : null}
      {children}
    </Tag>
  );
}
