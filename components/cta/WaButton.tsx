"use client";

import { WhatsAppIcon } from "@/components/icons";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui/Button";
import { readUtms, trackWhatsAppClick } from "@/lib/analytics";
import { MENSAGENS, comRef, waLink, type Linha } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/**
 * Link de WhatsApp (único CTA do site). Dispara `click_whatsapp` com cta_id,
 * posição, linha e, quando houver, item/público/cor. `mensagem` sobrescreve a
 * mensagem padrão da linha (catálogo, FAQ, cores do Vedacap).
 */
export function WaButton({
  linha = "geral",
  mensagem,
  ctaId,
  posicao,
  item,
  publico,
  cor,
  variant = "primary",
  size = "lg",
  withIcon = true,
  withRef = false,
  className,
  children,
}: {
  linha?: Linha;
  mensagem?: string;
  /** Identificador único do botão (ex.: "hero-primario", "card-solo") */
  ctaId: string;
  /** Posição/seção onde o botão vive (ex.: "hero", "cta-final", "faq") */
  posicao: string;
  item?: string;
  publico?: string;
  cor?: string;
  variant?: ButtonVariant | "link";
  size?: ButtonSize;
  withIcon?: boolean;
  /** Anexa "ref: utm_campaign" à mensagem (só o botão flutuante usa) */
  withRef?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const base = mensagem ?? MENSAGENS[linha];
  const href = waLink(withRef ? comRef(base, readUtmsSafe()) : base);
  const classes =
    variant === "link"
      ? cn("inline-flex items-center gap-2 font-display font-semibold text-laranja underline-offset-4 hover:underline", className)
      : cn(buttonClasses(variant, size), className);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={ctaId}
      className={classes}
      onClick={() => trackWhatsAppClick({ cta_id: ctaId, posicao, linha, item, publico, cor })}
    >
      {withIcon ? <WhatsAppIcon className={size === "lg" ? "size-5" : "size-4"} /> : null}
      {children}
    </a>
  );
}

function readUtmsSafe(): string | undefined {
  if (typeof window === "undefined") return undefined;
  return readUtms().utm_campaign;
}
