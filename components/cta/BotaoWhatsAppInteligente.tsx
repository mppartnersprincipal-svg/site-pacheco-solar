"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { animated, useSpring } from "@react-spring/web";
import { WhatsAppIcon } from "@/components/icons";
import { readUtms, trackWhatsAppClick } from "@/lib/analytics";
import { MENSAGENS, comRef, waLink, type Linha } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

/** Rótulo por linha — Record completo: uma linha nova em lib/whatsapp.ts sem rótulo falha no TypeScript. */
const ROTULOS: Record<Linha, string> = {
  geral: "Pedir orçamento",
  solo: "Orçamento de solo",
  "solo-linear": "Orçamento de solo",
  "solo-dupla": "Orçamento de solo",
  telhado: "Orçamento Titan",
  "telhado-ceramico": "Orçamento Titan",
  "telhado-fibrocimento": "Orçamento Titan",
  "telhado-metalico": "Orçamento Titan",
  kit: "Pedir kit completo",
  avulso: "Pedir item avulso",
  vedacap: "Pedir Vedacap",
  "vedacap-lojista": "Tabela de atacado",
  "vedacap-telhadista": "Pedir Vedacap",
  engenharia: "Falar com a engenharia",
  "pronta-entrega": "Consultar pronta entrega",
  obra: "Quero uma obra assim",
  equipe: "Falar com a equipe",
};

/**
 * Botão flutuante único: troca rótulo e mensagem conforme a <section data-linha>
 * visível; no mobile vira barra inferior de 56px; some quando o #cta-final entra.
 * Anexa "ref: utm_campaign" à mensagem para o comercial fechar o funil.
 */
export function BotaoWhatsAppInteligente() {
  const pathname = usePathname();
  const [linha, setLinha] = useState<Linha>("geral");
  const [visible, setVisible] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [ref, setRef] = useState<string | undefined>(undefined);

  // Troca de rota volta ao estado inicial (ajuste de estado derivado de prop, durante o render)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setLinha("geral");
    setHidden(false);
  }

  useEffect(() => {
    const t = window.setTimeout(() => {
      setRef(readUtms().utm_campaign);
      setVisible(true);
    }, 600);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    let io: IntersectionObserver | null = null;
    const timer = window.setTimeout(() => {
      const sections = Array.from(document.querySelectorAll<HTMLElement>("section[data-linha]"));
      const final = document.getElementById("cta-final");
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.target === final) {
              setHidden(e.isIntersecting);
              continue;
            }
            if (e.isIntersecting) {
              const l = (e.target as HTMLElement).dataset.linha as Linha | undefined;
              if (l && l in MENSAGENS) setLinha(l);
            }
          }
        },
        { threshold: 0.35 }
      );
      sections.forEach((s) => io?.observe(s));
      if (final) io.observe(final);
    }, 300);
    return () => {
      window.clearTimeout(timer);
      io?.disconnect();
    };
  }, [pathname]);

  const show = visible && !hidden;
  const style = useSpring({
    opacity: show ? 1 : 0,
    transform: show ? "translate3d(0,0,0)" : "translate3d(0,24px,0)",
    config: { tension: 220, friction: 24 },
  });
  const rotulo = ROTULOS[linha];
  const href = waLink(comRef(MENSAGENS[linha], ref));
  const onClick = () => trackWhatsAppClick({ cta_id: "flutuante", posicao: "flutuante", linha });

  return (
    <animated.div
      style={style}
      className={cn("fixed inset-x-0 bottom-0 z-40 sm:inset-x-auto sm:right-6 sm:bottom-6", !show && "pointer-events-none")}
      aria-hidden={!show}
    >
      {/* Mobile: barra inferior fixa */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        data-cta="flutuante-barra"
        onClick={onClick}
        tabIndex={show ? 0 : -1}
        className="flex min-h-14 items-center justify-center gap-2 bg-laranja px-4 font-display text-base font-semibold text-preto shadow-[0_-8px_24px_rgb(0_0_0/0.4)] [padding-bottom:env(safe-area-inset-bottom)] sm:hidden"
      >
        <WhatsAppIcon className="size-5" />
        {rotulo}
      </a>
      {/* Desktop: botão flutuante com pulso */}
      <div className="relative hidden sm:block">
        <span aria-hidden className="absolute inset-0 rounded-full bg-laranja animate-pulso motion-reduce:hidden" />
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="flutuante"
          onClick={onClick}
          tabIndex={show ? 0 : -1}
          className="relative flex min-h-14 items-center gap-3 rounded-full bg-laranja py-3 pr-6 pl-4 font-display text-sm font-semibold text-preto shadow-lg shadow-black/40 transition-colors hover:bg-laranja-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
        >
          <WhatsAppIcon className="size-6" />
          {rotulo}
        </a>
      </div>
    </animated.div>
  );
}
