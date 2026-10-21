"use client";

import { trackCta, trackEmailClick, trackNavigation, trackPhoneClick } from "@/lib/analytics";

type Kind =
  | { kind: "phone"; phone: string }
  | { kind: "email"; email: string }
  | { kind: "social"; rede: string }
  | { kind: "maps" }
  | { kind: "download"; arquivo: string }
  | { kind: "nav"; destino: string };

/**
 * Link comum com evento no clique: tel:, mailto:, rede social, mapa, download
 * de manual ou navegação interna. Para WhatsApp use <WaButton>.
 */
export function TrackedLink({
  track,
  ctaId,
  onClick,
  children,
  ...rest
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & { track: Kind; ctaId: string }) {
  return (
    <a
      data-cta={ctaId}
      {...rest}
      onClick={(e) => {
        switch (track.kind) {
          case "phone":
            trackPhoneClick({ phone: track.phone, cta_id: ctaId });
            break;
          case "email":
            trackEmailClick({ email: track.email, cta_id: ctaId });
            break;
          case "social":
            trackCta({ cta_id: ctaId, tipo: "social", valor: track.rede });
            break;
          case "maps":
            trackCta({ cta_id: ctaId, tipo: "mapa" });
            break;
          case "download":
            trackCta({ cta_id: ctaId, tipo: "download", valor: track.arquivo });
            break;
          case "nav":
            trackNavigation({ destino: track.destino, origem: ctaId });
            break;
        }
        onClick?.(e);
      }}
    >
      {children}
    </a>
  );
}
