import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "preto";
export type ButtonSize = "md" | "lg";

const base =
  "inline-flex max-w-full items-center justify-center gap-2 rounded-full text-center font-sans font-semibold leading-snug transition-[background-color,border-color,color,transform,box-shadow] duration-200 cursor-pointer select-none " +
  "hover:-translate-y-px active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv";

/*
 * Contraste: laranja oklch(58% .19 38) com texto branco ≈ 4,6:1 (AA) — por isso o
 * laranja dos botões é um pouco mais fechado que o laranja-texto dos eyebrows.
 */
const variants: Record<ButtonVariant, string> = {
  primary: "bg-laranja text-branco shadow-lg shadow-laranja/25 hover:bg-laranja-hover hover:shadow-laranja/40",
  secondary: "border border-branco/25 bg-transparent text-branco hover:border-branco/60 hover:bg-branco/10",
  ghost: "bg-transparent text-branco underline-offset-4 hover:text-laranja-texto",
  preto: "bg-tinta text-branco hover:bg-superficie",
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
