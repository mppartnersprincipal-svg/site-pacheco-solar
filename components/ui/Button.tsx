import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "preto";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex max-w-full items-center justify-center gap-2 chanfro-sm text-center font-display font-semibold leading-snug tracking-wide transition-[background-color,border-color,color,transform] duration-200 cursor-pointer select-none " +
  "hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv";

/*
 * Contraste: laranja #D35400 com texto #0F0F10 ≈ 4,6:1 (AA para texto ≥ 18px bold —
 * por isso os botões usam font-semibold e nunca texto pequeno).
 */
const variants: Record<ButtonVariant, string> = {
  primary: "bg-laranja text-preto hover:bg-laranja-hover",
  secondary: "border border-linha bg-transparent text-branco hover:border-aco hover:bg-branco/5",
  ghost: "bg-transparent text-branco underline-offset-4 hover:text-laranja-texto",
  preto: "bg-preto text-branco hover:bg-superficie",
};

const sizes: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 py-2.5 text-sm",
  lg: "min-h-13 px-7 py-3.5 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md") {
  return cn(base, variants[variant], sizes[size]);
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
}) {
  return <button type={type} className={cn(buttonClasses(variant, size), className)} {...props} />;
}
