"use client";

import Link from "next/link";
import { trackNavigation } from "@/lib/analytics";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface LinkInternoProps {
  href: string;
  /** Origem do clique (vira `origem` em navigation_click e data-cta) */
  ctaId: string;
  variant?: ButtonVariant | "texto";
  size?: ButtonSize;
  className?: string;
  children: React.ReactNode;
}

/**
 * Link interno com navegação client-side (next/link + prefetch) e o mesmo
 * evento `navigation_click` do Header. Para âncoras na mesma página use
 * <TrackedLink track={{ kind: "nav" }}>; para WhatsApp, <WaButton>.
 */
export function LinkInterno({ href, ctaId, variant = "secondary", size = "lg", className, children }: LinkInternoProps) {
  const classes =
    variant === "texto"
      ? cn("inline-flex min-h-11 items-center gap-2 font-display font-semibold text-branco underline-offset-4 hover:text-laranja-texto hover:underline", className)
      : cn(buttonClasses(variant, size), className);
  return (
    <Link href={href} data-cta={ctaId} className={classes} onClick={() => trackNavigation({ destino: href, origem: ctaId })}>
      {children}
    </Link>
  );
}
