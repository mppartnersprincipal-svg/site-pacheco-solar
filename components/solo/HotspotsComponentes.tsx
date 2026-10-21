"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { animated, useSpring } from "@react-spring/web";
import { WaButton } from "@/components/cta/WaButton";
import { IconGrampo } from "@/components/icons";
import { mensagemItem } from "@/lib/whatsapp";
import { slugify } from "@/lib/utils";
import { cn } from "@/lib/utils";

export interface FotoHotspots {
  src: string;
  width: number;
  height: number;
  blurDataURL?: string;
  alt: string;
}

export interface PinComponente {
  numero: string;
  nome: string;
  /** Posição em % da largura/altura da foto */
  x: number;
  y: number;
}

interface HotspotsComponentesProps {
  foto: FotoHotspots;
  pins: PinComponente[];
  nota: string;
  rotuloLista: string;
  rotuloComponente: string;
  ctaItem: string;
  className?: string;
}

/**
 * Pins numerados sobre a foto real (posições em %) com popover "Pedir este
 * item" (WhatsApp, linha avulso). Pulso CSS só no pin ativo. No mobile a
 * lista numerada abaixo da foto faz o papel do popover.
 */
export function HotspotsComponentes({ foto, pins, nota, rotuloLista, rotuloComponente, ctaItem, className }: HotspotsComponentesProps) {
  const [ativo, setAtivo] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
      <figure className="lg:col-span-7">
        <div className="relative chanfro overflow-hidden border border-linha bg-superficie">
          <div className="relative aspect-[3/4] w-full">
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              placeholder={foto.blurDataURL ? "blur" : undefined}
              blurDataURL={foto.blurDataURL}
              className="object-cover"
            />
            {pins.map((pin, i) => (
              <Pin
                key={pin.nome}
                pin={pin}
                index={i}
                ativo={ativo === i}
                baseId={baseId}
                rotuloComponente={rotuloComponente}
                ctaItem={ctaItem}
                onToggle={() => setAtivo(ativo === i ? null : i)}
                onClose={() => setAtivo(null)}
              />
            ))}
          </div>
        </div>
        <figcaption className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-aco">{nota}</figcaption>
      </figure>

      {/* Lista numerada: única no mobile, complementar no desktop */}
      <ol className="divide-y divide-linha border-y border-linha lg:col-span-5" aria-label={rotuloLista}>
        {pins.map((pin, i) => {
          const selecionado = ativo === i;
          return (
            <li key={pin.nome} className={cn("py-4 transition-colors", selecionado && "bg-superficie/60")}>
              <button
                type="button"
                onClick={() => setAtivo(selecionado ? null : i)}
                aria-pressed={selecionado}
                className="flex min-h-11 w-full cursor-pointer items-center gap-4 px-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
              >
                <span
                  className={cn(
                    "flex size-9 shrink-0 items-center justify-center border font-mono text-xs font-medium tabular transition-colors",
                    selecionado ? "border-laranja bg-laranja text-preto" : "border-linha text-laranja"
                  )}
                >
                  {pin.numero}
                </span>
                <span className="font-display text-lg font-semibold text-branco">{pin.nome}</span>
                <IconGrampo className={cn("ml-auto size-5 shrink-0 text-aco transition-transform", selecionado && "rotate-45 text-laranja")} />
              </button>
              <div className="acordeao-painel" data-aberto={selecionado}>
                <div className="px-2">
                  <div className="pt-3 pb-2">
                    <WaButton
                      linha="avulso"
                      mensagem={mensagemItem(pin.nome)}
                      item={pin.nome}
                      ctaId={`hotspot-lista-${slugify(pin.nome)}`}
                      posicao="componentes-solo"
                      size="md"
                    >
                      {ctaItem}
                    </WaButton>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

interface PinProps {
  pin: PinComponente;
  index: number;
  ativo: boolean;
  baseId: string;
  rotuloComponente: string;
  ctaItem: string;
  onToggle: () => void;
  onClose: () => void;
}

function Pin({ pin, index, ativo, baseId, rotuloComponente, ctaItem, onToggle, onClose }: PinProps) {
  const popoverId = `${baseId}-popover-${index}`;
  const style = useSpring({
    opacity: ativo ? 1 : 0,
    transform: ativo ? "translate3d(0,0,0)" : "translate3d(0,8px,0)",
    config: { tension: 260, friction: 24 },
  });
  // Popover abre para o lado com mais espaço
  const esquerda = pin.x > 55;
  const acima = pin.y > 60;

  return (
    <div className="absolute" style={{ left: `${pin.x}%`, top: `${pin.y}%` }}>
      <button
        type="button"
        aria-expanded={ativo}
        aria-controls={popoverId}
        aria-label={`${pin.numero} · ${pin.nome}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Escape" && ativo) onClose();
        }}
        className="relative flex size-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv"
      >
        {ativo ? <span aria-hidden className="absolute inset-1 rounded-full bg-laranja animate-pulso motion-reduce:hidden" /> : null}
        <span
          className={cn(
            "relative flex size-8 items-center justify-center rounded-full border-2 font-mono text-xs font-medium tabular shadow-lg shadow-black/50 transition-colors",
            ativo ? "border-laranja bg-laranja text-preto" : "border-branco bg-fundo/85 text-branco hover:border-laranja"
          )}
        >
          {pin.numero}
        </span>
      </button>
      <animated.div
        id={popoverId}
        role="group"
        aria-label={pin.nome}
        style={style}
        className={cn(
          "absolute z-10 hidden w-56 chanfro-sm border border-linha bg-chapa p-4 shadow-xl shadow-black/50 lg:block",
          !ativo && "pointer-events-none",
          esquerda ? "right-6" : "left-6",
          acima ? "bottom-6" : "top-6"
        )}
        aria-hidden={!ativo}
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-laranja">{pin.numero} · {rotuloComponente}</p>
        <p className="mt-1 font-display text-base font-semibold text-branco">{pin.nome}</p>
        <WaButton
          linha="avulso"
          mensagem={mensagemItem(pin.nome)}
          item={pin.nome}
          ctaId={`hotspot-${slugify(pin.nome)}`}
          posicao="componentes-solo"
          size="md"
          className="mt-3 w-full"
        >
          {ctaItem}
        </WaButton>
      </animated.div>
    </div>
  );
}
