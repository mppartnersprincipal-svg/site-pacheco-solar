"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { animated, useTransition } from "@react-spring/web";
import { Button } from "@/components/ui/Button";
import { readConsent, trackConsent, writeConsent } from "@/lib/analytics";
import { ROTAS } from "@/lib/site";

/**
 * Banner LGPD. "Aceitar" libera analytics/ads no Consent Mode v2; "Só o
 * essencial" mantém o site funcional com o GTM em modo sem cookies.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => {
      try {
        if (!readConsent()) setVisible(true);
      } catch {
        // storage indisponível
      }
    }, 1200);
    return () => window.clearTimeout(t);
  }, []);

  const decide = (accepted: boolean) => {
    trackConsent(accepted);
    writeConsent(accepted);
    setVisible(false);
  };

  const transitions = useTransition(visible, {
    from: { opacity: 0, transform: "translate3d(0,16px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,16px,0)" },
    config: { tension: 220, friction: 26 },
  });

  return transitions((style, show) =>
    show ? (
      <animated.div
        style={style}
        role="region"
        aria-label="Aviso de cookies"
        className="fixed inset-x-3 bottom-20 z-50 mx-auto max-w-2xl chanfro-sm border border-linha bg-superficie p-4 shadow-2xl shadow-black/50 sm:bottom-6 sm:left-6 sm:mx-0 sm:flex sm:items-center sm:gap-5 sm:p-5"
      >
        <p className="text-sm leading-relaxed text-aco">
          Usamos cookies para medir o desempenho do site e das campanhas. Detalhes na{" "}
          <Link href={ROTAS.privacidade} className="font-semibold text-branco underline-offset-2 hover:underline">
            Política de Privacidade
          </Link>
          .
        </p>
        <div className="mt-3 flex shrink-0 items-center gap-2 sm:mt-0">
          <button
            type="button"
            onClick={() => decide(false)}
            className="cursor-pointer px-3 py-2 text-sm font-semibold text-aco transition-colors hover:text-branco focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
          >
            Só o essencial
          </button>
          <Button size="md" onClick={() => decide(true)}>
            Aceitar
          </Button>
        </div>
      </animated.div>
    ) : null
  );
}
