"use client";

import { useState } from "react";
import Image from "next/image";
import { animated, useTrail } from "@react-spring/web";
import { IconGrampo } from "@/components/icons";
import { WaButton } from "@/components/cta/WaButton";
import { ITENS_AVULSOS_SECAO } from "@/content/kits";
import { mensagemItem } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export type ItemCatalogo = {
  slug: string;
  nome: string;
  uso: "telhado" | "solo" | "ambos";
  imagem?: { src: string; width: number; height: number; blurDataURL?: string };
  imagemAlt?: string;
  nota?: string;
};

type Filtro = "todos" | "telhado" | "solo";

interface CatalogoAvulsosProps {
  itens: ItemCatalogo[];
}

/**
 * Grid dos 7 itens avulsos oficiais com filtro Todos | Telhado | Solo
 * (aria-pressed). Imagens 1:1 resolvidas no servidor; item sem imagem mostra
 * placeholder com ícone do nicho e "PREENCHER foto". Botão por item com a
 * mensagem mensagemItem(nome) e `item` = slug no evento click_whatsapp.
 */
export function CatalogoAvulsos({ itens }: CatalogoAvulsosProps) {
  const [filtro, setFiltro] = useState<Filtro>("todos");
  const filtrados = itens.filter((i) => filtro === "todos" || i.uso === filtro || i.uso === "ambos");

  const [trail] = useTrail(
    filtrados.length,
    () => ({
      from: { opacity: 0, transform: "translate3d(0,14px,0)" },
      to: { opacity: 1, transform: "translate3d(0,0,0)" },
      reset: true,
      config: { tension: 260, friction: 26 },
    }),
    [filtro]
  );

  return (
    <div>
      <div role="group" aria-label="Filtrar itens avulsos" className="flex flex-wrap gap-2">
        {ITENS_AVULSOS_SECAO.filtros.map((f) => {
          const on = filtro === f.id;
          return (
            <button
              key={f.id}
              type="button"
              aria-pressed={on}
              onClick={() => setFiltro(f.id as Filtro)}
              className={cn(
                "min-h-11 chanfro-sm px-5 font-display text-sm font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv",
                on ? "bg-laranja text-preto" : "border border-linha text-branco hover:border-aco"
              )}
            >
              {f.label}
            </button>
          );
        })}
        <p className="ml-auto self-center font-mono text-xs text-aco" aria-live="polite">
          {String(filtrados.length).padStart(2, "0")} / {String(itens.length).padStart(2, "0")} itens
        </p>
      </div>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trail.map((style, i) => {
          const item = filtrados[i];
          if (!item) return null;
          return (
            <animated.li key={item.slug} style={style} className="flex">
              <article className="group flex w-full flex-col chanfro border border-linha bg-chapa transition-colors hover:border-laranja">
                <div className="relative aspect-square w-full overflow-hidden bg-placa-clara">
                  {item.imagem ? (
                    <Image
                      src={item.imagem.src}
                      alt={item.imagemAlt ?? item.nome}
                      fill
                      sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      placeholder={item.imagem.blurDataURL ? "blur" : undefined}
                      blurDataURL={item.imagem.blurDataURL}
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center gap-3 bg-superficie grade-modulos text-aco">
                      <IconGrampo className="size-12 text-laranja" />
                      <span className="font-mono text-[11px] uppercase tracking-[0.16em]">{ITENS_AVULSOS_SECAO.fotoPendente}</span>
                    </div>
                  )}
                  <span className="absolute top-3 left-3 bg-fundo/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-branco">
                    {ITENS_AVULSOS_SECAO.usoLabel[item.uso]}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-lg font-semibold leading-snug text-branco">{item.nome}</h3>
                    <span className="font-mono text-[11px] text-aco">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  {item.nota ? <p className="mt-1 font-mono text-[11px] text-aco">{item.nota}</p> : null}
                  <div className="mt-auto pt-5">
                    <WaButton
                      linha="avulso"
                      mensagem={mensagemItem(item.nome)}
                      item={item.slug}
                      ctaId={`avulso-${item.slug}`}
                      posicao="itens-avulsos"
                      size="md"
                      className="w-full"
                    >
                      {ITENS_AVULSOS_SECAO.ctaItem}
                    </WaButton>
                  </div>
                </div>
              </article>
            </animated.li>
          );
        })}
      </ul>
    </div>
  );
}
