"use client";

import { useId, useState } from "react";
import { IconGrampo } from "@/components/icons";
import { WaButton } from "@/components/cta/WaButton";
import { mensagemPergunta, type Linha } from "@/lib/whatsapp";
import type { Faq } from "@/lib/faq";
import { cn } from "@/lib/utils";

/**
 * FAQ do integrador: cada resposta termina em "Perguntar isso no WhatsApp"
 * (a mensagem já leva a pergunta). Abertura via grid-template-rows 0fr→1fr
 * (CSS em globals.css) — sem medir altura. Ícone de grampo gira 45°.
 */
export function AccordionObjecoes({
  itens,
  linha = "geral",
  posicao = "faq",
  className,
}: {
  itens: Faq[];
  linha?: Linha;
  posicao?: string;
  className?: string;
}) {
  const [aberto, setAberto] = useState<number | null>(0);
  const baseId = useId();

  return (
    <ul className={cn("divide-y divide-linha border-y border-linha", className)}>
      {itens.map((item, i) => {
        const isOpen = aberto === i;
        const panelId = `${baseId}-painel-${i}`;
        const btnId = `${baseId}-botao-${i}`;
        return (
          <li key={item.pergunta}>
            <h3 className="m-0">
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setAberto(isOpen ? null : i)}
                className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-display text-lg font-semibold text-branco transition-colors hover:text-laranja focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-aco">{String(i + 1).padStart(2, "0")}</span>
                  {item.pergunta}
                </span>
                <IconGrampo
                  className={cn("size-5 shrink-0 text-laranja transition-transform duration-200", isOpen && "rotate-45")}
                />
              </button>
            </h3>
            <div id={panelId} role="region" aria-labelledby={btnId} className="acordeao-painel" data-aberto={isOpen}>
              <div>
                <p className="max-w-3xl pb-4 text-base leading-relaxed text-aco">{item.resposta}</p>
                <WaButton
                  linha={linha}
                  mensagem={mensagemPergunta(item.pergunta)}
                  ctaId={`faq-${linha}-${i + 1}`}
                  posicao={posicao}
                  variant="link"
                  size="md"
                  className="mb-5"
                >
                  Perguntar isso no WhatsApp
                </WaButton>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
