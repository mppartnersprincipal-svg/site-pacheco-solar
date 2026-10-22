"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Download } from "lucide-react";
import { animated, useSpring, useTransition } from "@react-spring/web";
import { IconHaste, IconTelha, IconTrilho } from "@/components/icons";
import { WaButton } from "@/components/cta/WaButton";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { buttonClasses } from "@/components/ui/Button";
import { trackCta } from "@/lib/analytics";
import type { TipoTelhado } from "@/lib/produtos/titan";
import type { Linha } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

export type ImagemResolvida = { src: string; width: number; height: number; alt: string; blurDataURL: string };

export type VarianteSeletor = {
  id: TipoTelhado;
  nome: string;
  nomeCurto: string;
  descricao: string;
  componentes: Array<{ nome: string; qtdLayout4?: number; nota?: string; material?: string }>;
  regras: string[];
  linha: Linha;
  manualPdf?: { href: string; label: string };
  renderGeral: ImagemResolvida;
  renderClose: ImagemResolvida;
  cta: string;
};

export type SeletorTelhadoProps = {
  variantes: VarianteSeletor[];
  rotulos: { componentes: string; regras: string; quantidade: string; semManual: string };
};

const HASHES: ReadonlySet<string> = new Set<TipoTelhado>(["ceramico", "fibrocimento", "metalico"]);
const PICTOGRAMAS: Record<TipoTelhado, (p: { className?: string }) => React.ReactElement> = {
  ceramico: IconHaste,
  fibrocimento: IconTelha,
  metalico: IconTrilho,
};
const INDICADOR_BASE_PX = 100;

function hashParaTipo(hash: string): TipoTelhado | null {
  const h = hash.replace(/^#/, "");
  return HASHES.has(h) ? (h as TipoTelhado) : null;
}

/**
 * Abas Cerâmico | Fibrocimento | Metálico (role=tablist, setas do teclado,
 * roving tabindex). Deep-link por hash (#ceramico…) lido no cliente após a
 * montagem; a troca de aba grava o hash com history.replaceState (sem scroll).
 * Painel com useTransition (exitBeforeEnter) e indicador deslizante com useSpring.
 */
export function SeletorTelhado({ variantes, rotulos }: SeletorTelhadoProps) {
  const [ativo, setAtivo] = useState<TipoTelhado>(variantes[0].id);
  const baseId = useId();
  const tabRefs = useRef<Partial<Record<TipoTelhado, HTMLButtonElement | null>>>({});
  const listaRef = useRef<HTMLDivElement>(null);
  const [indicador, setIndicador] = useState({ x: 0, w: INDICADOR_BASE_PX });

  // Deep-link: só no cliente, depois de montar (Cache Components: nada de URL no servidor)
  useEffect(() => {
    const aplicar = () => {
      const t = hashParaTipo(window.location.hash);
      if (t) setAtivo(t);
    };
    aplicar();
    window.addEventListener("hashchange", aplicar);
    return () => window.removeEventListener("hashchange", aplicar);
  }, []);

  const medir = useCallback(() => {
    const el = tabRefs.current[ativo];
    const lista = listaRef.current;
    if (!el || !lista) return;
    setIndicador({ x: el.offsetLeft - lista.scrollLeft, w: el.offsetWidth });
  }, [ativo]);

  // scroll/resize agendados em requestAnimationFrame (mesmo padrão de lib/hooks/useScrollProgress.ts):
  // nada de layout read + setState por evento de scroll do tablist
  useEffect(() => {
    medir();
    let agendado = false;
    const agendar = () => {
      if (agendado) return;
      agendado = true;
      requestAnimationFrame(() => {
        agendado = false;
        medir();
      });
    };
    window.addEventListener("resize", agendar);
    const lista = listaRef.current;
    lista?.addEventListener("scroll", agendar, { passive: true });
    return () => {
      window.removeEventListener("resize", agendar);
      lista?.removeEventListener("scroll", agendar);
    };
  }, [medir]);

  const indicadorStyle = useSpring({
    transform: `translate3d(${indicador.x}px,0,0) scaleX(${indicador.w / INDICADOR_BASE_PX})`,
    config: { tension: 260, friction: 28 },
  });

  const selecionar = (id: TipoTelhado, focar = false) => {
    if (id !== ativo) {
      setAtivo(id);
      trackCta({ cta_id: `seletor-telhado-${id}`, tipo: "aba", valor: id });
      window.history.replaceState(null, "", `#${id}`);
    }
    if (focar) tabRefs.current[id]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const n = variantes.length;
    const alvo =
      e.key === "ArrowRight" ? (index + 1) % n
      : e.key === "ArrowLeft" ? (index - 1 + n) % n
      : e.key === "Home" ? 0
      : e.key === "End" ? n - 1
      : null;
    if (alvo === null) return;
    e.preventDefault();
    selecionar(variantes[alvo].id, true);
  };

  const varianteAtiva = variantes.find((v) => v.id === ativo) ?? variantes[0];
  const transicoes = useTransition(varianteAtiva, {
    keys: (v) => v.id,
    from: { opacity: 0, transform: "translate3d(0,14px,0)" },
    enter: { opacity: 1, transform: "translate3d(0,0,0)" },
    leave: { opacity: 0, transform: "translate3d(0,-8px,0)" },
    exitBeforeEnter: true,
    config: { tension: 240, friction: 26 },
  });

  return (
    <div>
      {/* Abas: pills roláveis no mobile, trilho com indicador no desktop */}
      <div className="relative border-b border-linha">
        <div
          ref={listaRef}
          role="tablist"
          aria-label="Tipo de telhado"
          className="flex gap-2 overflow-x-auto scrollbar-none sm:gap-0"
        >
          {variantes.map((v, i) => {
            const Picto = PICTOGRAMAS[v.id];
            const selected = v.id === ativo;
            return (
              <button
                key={v.id}
                ref={(el) => {
                  tabRefs.current[v.id] = el;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${v.id}`}
                aria-selected={selected}
                aria-controls={`${baseId}-painel-${v.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => selecionar(v.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className={cn(
                  "flex min-h-12 shrink-0 cursor-pointer items-center gap-2.5 px-4 py-3 font-display text-sm font-semibold tracking-wide transition-colors sm:min-h-14 sm:px-6 sm:text-base",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-azul-idv",
                  selected ? "text-laranja" : "text-aco hover:text-branco"
                )}
              >
                <Picto className="size-5 shrink-0" />
                {v.nomeCurto}
              </button>
            );
          })}
        </div>
        <animated.span
          aria-hidden
          style={{ ...indicadorStyle, width: INDICADOR_BASE_PX }}
          className="pointer-events-none absolute bottom-[-1px] left-0 h-0.5 origin-left bg-laranja"
        />
      </div>

      {transicoes((style, v) => (
        <animated.div
          key={v.id}
          style={style}
          role="tabpanel"
          id={`${baseId}-painel-${v.id}`}
          aria-labelledby={`${baseId}-tab-${v.id}`}
          tabIndex={0}
          className="grid gap-8 pt-8 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azul-idv lg:grid-cols-12 lg:gap-12 lg:pt-12"
        >
          {/* Render geral + close-up sobreposto */}
          <div className="relative lg:col-span-7">
            <figure className="rounded-2xl bg-placa-clara p-2">
              <Image
                src={v.renderGeral.src}
                width={v.renderGeral.width}
                height={v.renderGeral.height}
                alt={v.renderGeral.alt}
                placeholder="blur"
                blurDataURL={v.renderGeral.blurDataURL}
                sizes="(min-width: 1024px) 56vw, 100vw"
                className="h-auto w-full"
              />
              <figcaption className="px-2 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-preto/60">
                Linha Titan · {v.nome} · Render
              </figcaption>
            </figure>
            <figure className="rounded-xl absolute right-3 bottom-10 w-[38%] border border-linha bg-chapa p-1.5 shadow-[0_12px_32px_rgb(0_0_0/0.45)] sm:right-5 sm:bottom-12 sm:w-[34%]">
              <Image
                src={v.renderClose.src}
                width={v.renderClose.width}
                height={v.renderClose.height}
                alt={v.renderClose.alt}
                placeholder="blur"
                blurDataURL={v.renderClose.blurDataURL}
                sizes="(min-width: 1024px) 20vw, 38vw"
                className="h-auto w-full"
              />
              <figcaption className="px-1 pt-1.5 pb-0.5 font-mono text-[9px] uppercase tracking-[0.16em] text-aco">Close-up</figcaption>
            </figure>
          </div>

          {/* Ficha da variante */}
          <div className="lg:col-span-5">
            <h3 className="font-display text-2xl font-bold leading-tight sm:text-3xl">{v.nome}</h3>
            <p className="mt-3 text-base leading-relaxed text-aco">{v.descricao}</p>

            <p className="mt-7 flex items-baseline justify-between gap-3 font-mono text-xs uppercase tracking-[0.18em] text-laranja-texto">
              {rotulos.componentes}
              <span className="text-aco/70 normal-case tracking-normal">{rotulos.quantidade}</span>
            </p>
            <ul className="mt-2 divide-y divide-linha border-y border-linha">
              {v.componentes.map((c) => (
                <li key={c.nome} className="flex items-start justify-between gap-4 py-2.5">
                  <div className="min-w-0">
                    <span className="font-medium text-branco">{c.nome}</span>
                    {c.material ? <span className="ml-2 font-mono text-[11px] uppercase tracking-[0.12em] text-aco">{c.material}</span> : null}
                    {c.nota ? <p className="mt-0.5 text-xs leading-snug text-aco">{c.nota}</p> : null}
                  </div>
                  <span className="shrink-0 font-mono text-sm tabular text-branco">{c.qtdLayout4 !== undefined ? `× ${c.qtdLayout4}` : "—"}</span>
                </li>
              ))}
            </ul>

            <p className="mt-6 font-mono text-xs uppercase tracking-[0.18em] text-laranja-texto">{rotulos.regras}</p>
            <ul className="mt-2 space-y-2">
              {v.regras.map((r) => (
                <li key={r} className="flex gap-3 text-sm leading-relaxed text-branco/90">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-laranja" />
                  {r}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <WaButton linha={v.linha} ctaId={`seletor-telhado-${v.id}-whatsapp`} posicao="seletor-telhado" size="md">
                {v.cta}
              </WaButton>
              {v.manualPdf ? (
                <TrackedLink
                  href={v.manualPdf.href}
                  download
                  ctaId={`seletor-telhado-${v.id}-manual`}
                  track={{ kind: "download", arquivo: v.manualPdf.href }}
                  className={buttonClasses("secondary", "md")}
                >
                  <Download className="size-4" aria-hidden />
                  {v.manualPdf.label}
                </TrackedLink>
              ) : (
                <p className="font-mono text-xs text-aco">{rotulos.semManual}</p>
              )}
            </div>
          </div>
        </animated.div>
      ))}
    </div>
  );
}
