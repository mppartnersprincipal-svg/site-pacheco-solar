import { IconGrampo } from "@/components/icons";
import { WaButton } from "@/components/cta/WaButton";
import { PRONTA_ENTREGA_CTA, PRONTA_ENTREGA_ITENS, PRONTA_ENTREGA_POR_LINHA } from "@/config/pronta-entrega";
import { cn } from "@/lib/utils";

/**
 * Faixa laranja "Pronta entrega" (home) ou variante por linha (páginas de
 * produto). Marquee em CSS puro com o conteúdo duplicado; pausa em hover e
 * fica estática sob prefers-reduced-motion.
 */
export function BarraProntaEntrega({
  variante,
  className,
}: {
  variante?: keyof typeof PRONTA_ENTREGA_POR_LINHA;
  className?: string;
}) {
  const itens = variante ? [PRONTA_ENTREGA_POR_LINHA[variante]] : [...PRONTA_ENTREGA_ITENS];
  const lista = (ariaHidden: boolean) => (
    <ul
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 font-display text-sm font-semibold tracking-wide text-preto whitespace-nowrap"
    >
      {itens.map((t, i) => (
        <li key={`${t}-${i}`} className="flex items-center gap-3">
          <IconGrampo className="size-4 shrink-0" />
          {t}
        </li>
      ))}
    </ul>
  );

  return (
    <div className={cn("flex items-stretch bg-laranja text-preto", className)} role="region" aria-label="Pronta entrega">
      <div className="group relative min-w-0 flex-1 overflow-hidden">
        <div className="flex w-max animate-marquee py-3 group-hover:[animation-play-state:paused] motion-reduce:animate-none sm:py-3.5">
          {lista(false)}
          {lista(true)}
          {lista(true)}
        </div>
      </div>
      <div className="flex shrink-0 items-center border-l border-preto/20 px-3 sm:px-5">
        <WaButton
          linha="pronta-entrega"
          ctaId={`barra-pronta-entrega${variante ? `-${variante}` : ""}`}
          posicao="barra-pronta-entrega"
          variant="preto"
          size="md"
          withIcon={false}
        >
          {PRONTA_ENTREGA_CTA}
        </WaButton>
      </div>
    </div>
  );
}
