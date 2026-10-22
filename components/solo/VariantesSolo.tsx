"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { animated, useTransition } from "@react-spring/web";
import { WaButton } from "@/components/cta/WaButton";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { IconEstaca, IconTrilho } from "@/components/icons";
import type { Linha } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export interface ImagemVariante {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
}

export interface VarianteSoloItem {
  id: string;
  nome: string;
  descricao: string;
  imagem: ImagemVariante;
  linha: Linha;
  cta: string;
}

interface VariantesSoloProps {
  itens: VarianteSoloItem[];
  rotuloTablist: string;
  rotuloConfiguracao: string;
  legendaFoto: string;
  placas: readonly string[];
  className?: string;
}

/**
 * Segmented control Linear | Dupla (tablist acessível, setas do teclado) que
 * troca a foto com crossfade (useTransition) e a descrição. A descrição vem
 * de content/solo.ts (literal, inclusive o [PREENCHER]).
 */
export function VariantesSolo({ itens, rotuloTablist, rotuloConfiguracao, legendaFoto, placas, className }: VariantesSoloProps) {
  const [ativo, setAtivo] = useState(0);
  const baseId = useId();
  const tabsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const atual = itens[ativo];

  const transicoes = useTransition(ativo, {
    from: { opacity: 0, transform: "scale(1.02)" },
    enter: { opacity: 1, transform: "scale(1)" },
    leave: { opacity: 0, transform: "scale(1)" },
    config: { tension: 200, friction: 28 },
  });

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const proximo = (ativo + delta + itens.length) % itens.length;
    setAtivo(proximo);
    tabsRef.current[proximo]?.focus();
  };

  return (
    <div className={cn("grid items-start gap-10 lg:grid-cols-12 lg:gap-12", className)}>
      {/* Coluna de texto */}
      <div className="lg:col-span-5">
        <div role="tablist" aria-label={rotuloTablist} className="inline-flex rounded-xl border border-linha bg-superficie p-1">
          {itens.map((v, i) => {
            const selecionada = i === ativo;
            return (
              <button
                key={v.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-aba-${v.id}`}
                aria-selected={selecionada}
                aria-controls={`${baseId}-painel-${v.id}`}
                tabIndex={selecionada ? 0 : -1}
                onClick={() => setAtivo(i)}
                onKeyDown={onKeyDown}
                className={cn(
                  "inline-flex min-h-11 cursor-pointer items-center gap-2 px-5 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
                  selecionada ? "rounded-xl bg-laranja text-preto" : "text-aco hover:text-branco"
                )}
              >
                {i === 0 ? <IconTrilho className="size-4" /> : <IconEstaca className="size-4" />}
                {v.nome}
              </button>
            );
          })}
        </div>

        {itens.map((v, i) => (
          <div
            key={v.id}
            role="tabpanel"
            id={`${baseId}-painel-${v.id}`}
            aria-labelledby={`${baseId}-aba-${v.id}`}
            hidden={i !== ativo}
            className="mt-8"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-laranja-texto">
              {String(i + 1).padStart(2, "0")} · {rotuloConfiguracao}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold leading-tight sm:text-4xl">{v.nome}</h3>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-aco">{v.descricao}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {placas.map((p) => (
                <PlacaIdentificacao key={p} size="sm">
                  {p}
                </PlacaIdentificacao>
              ))}
            </div>
            <div className="mt-8">
              <WaButton linha={v.linha} ctaId={`variante-${v.id}`} posicao="variantes-solo">
                {v.cta}
              </WaButton>
            </div>
          </div>
        ))}
      </div>

      {/* Foto com crossfade */}
      <div className="lg:col-span-7">
        <figure className="relative rounded-2xl overflow-hidden border border-linha bg-superficie">
          <div className="relative aspect-[4/5] w-full sm:aspect-[4/3] lg:aspect-[5/4]">
            {transicoes((style, idx) => {
              const v = itens[idx];
              return (
                <animated.div style={style} className="absolute inset-0 will-change-transform">
                  <Image
                    src={v.imagem.src}
                    alt={v.imagem.alt}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    placeholder={v.imagem.blurDataURL ? "blur" : undefined}
                    blurDataURL={v.imagem.blurDataURL}
                    className="object-cover"
                  />
                </animated.div>
              );
            })}
            <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-fundo/90 to-transparent" />
          </div>
          <figcaption className="absolute bottom-0 left-0 flex items-center gap-3 px-4 py-3 font-mono text-[11px] uppercase tracking-[0.16em] text-branco">
            <span aria-hidden className="inline-block h-px w-8 bg-laranja" />
            {atual.nome} · {legendaFoto}
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
