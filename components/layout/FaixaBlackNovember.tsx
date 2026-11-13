"use client";

import { Fragment, useSyncExternalStore } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { waLink } from "@/lib/whatsapp";

/**
 * Faixa rotativa da Black November (campanha de nov/2026, criativos da Camille
 * no Drive: "PACHECO SOLAR 3 BLACK NOVEMBER"). Fica acima do header, rola junto
 * com a página e leva ao WhatsApp. Some sozinha a partir de BLACK_NOVEMBER_FIM;
 * depois da campanha, remover o componente do layout.
 */
const BLACK_NOVEMBER_FIM = Date.parse("2026-12-01T00:00:00-03:00");

const MENSAGEM_BLACK_NOVEMBER =
  "Olá, Pacheco Solar! Vim pelo site e quero aproveitar a Black November.\nItem: ___\nQuantidade: ___\nCidade/UF: ___";

/** Quantas vezes a frase se repete em cada metade do trilho (cobre telas largas). */
const REPETICOES = 4;

const semInscricao = () => () => {};
const campanhaAtiva = () => Date.now() < BLACK_NOVEMBER_FIM;
/** Cache Components proíbe Date.now() no prerender: o servidor sempre renderiza e o navegador decide. */
const ativaNoServidor = () => true;

function Frase() {
  return (
    <span className="flex shrink-0 items-center gap-4 pr-4 sm:gap-6 sm:pr-6">
      <span className="font-display text-sm font-black italic tracking-tight sm:text-[15px]">
        BLACK <span className="faixa-sol bg-clip-text text-transparent">NOVEMBER</span>
      </span>
      <Separador />
      <span className="font-display text-xs font-bold tracking-[0.18em] sm:text-[13px]">
        PACHECO <span className="font-normal">SOLAR</span>
      </span>
      <Separador />
      <span className="text-xs font-semibold uppercase tracking-wide sm:text-[13px]">
        Itens com <span className="text-laranja-texto">5% e 10% OFF</span>
      </span>
      <Separador />
      <span className="text-xs font-semibold uppercase tracking-wide text-branco/80 underline-offset-4 group-hover:text-branco group-hover:underline sm:text-[13px]">
        Chame no WhatsApp
      </span>
      <Separador />
    </span>
  );
}

function Separador() {
  return <span aria-hidden className="faixa-sol size-1.5 shrink-0 rounded-full" />;
}

export function FaixaBlackNovember() {
  const ativa = useSyncExternalStore(semInscricao, campanhaAtiva, ativaNoServidor);
  if (!ativa) return null;

  const metade = Array.from({ length: REPETICOES }, (_, i) => <Frase key={i} />);

  return (
    <a
      href={waLink(MENSAGEM_BLACK_NOVEMBER)}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="faixa-black-november"
      aria-label="Black November Pacheco Solar: itens com 5% e 10% de desconto. Chamar no WhatsApp"
      onClick={() => trackWhatsAppClick({ cta_id: "faixa-black-november", posicao: "faixa-topo", linha: "geral" })}
      className="group relative block overflow-hidden border-b border-laranja/40 bg-tinta py-2 text-branco focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-azul-idv"
    >
      <span aria-hidden className="flex w-max animate-marquee-fast group-hover:[animation-play-state:paused] group-focus-visible:[animation-play-state:paused]">
        {[0, 1].map((copia) => (
          <Fragment key={copia}>{metade}</Fragment>
        ))}
      </span>
      {/* Bordas esfumadas para a frase entrar e sair suave */}
      <span aria-hidden className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-linear-to-r from-tinta to-transparent sm:w-16" />
      <span aria-hidden className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-linear-to-l from-tinta to-transparent sm:w-16" />
    </a>
  );
}
