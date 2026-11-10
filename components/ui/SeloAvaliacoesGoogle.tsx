import { ArrowUpRight } from "lucide-react";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { GoogleG, Estrelas } from "@/components/ui/Google";
import { AVALIACOES_GOOGLE } from "@/lib/obras";
import { cn } from "@/lib/utils";

interface SeloAvaliacoesGoogleProps {
  /** Identificador do clique no tracking (um por seção) */
  ctaId: string;
  className?: string;
}

/** Selo "4,9 ★★★★★ · 41 avaliações no Google", com link para o perfil da Pacheco no Google. */
export function SeloAvaliacoesGoogle({ ctaId, className }: SeloAvaliacoesGoogleProps) {
  return (
    <TrackedLink
      href={AVALIACOES_GOOGLE.url}
      target="_blank"
      rel="noopener noreferrer"
      ctaId={ctaId}
      track={{ kind: "social", rede: "google-avaliacoes" }}
      className={cn(
        "group inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl border border-linha bg-chapa px-5 py-4 transition-colors hover:border-ciano focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ciano",
        className
      )}
    >
      <GoogleG className="size-9" />
      <span className="flex items-center gap-3">
        <span className="font-display text-3xl font-extrabold leading-none text-branco">{AVALIACOES_GOOGLE.nota}</span>
        <span className="flex flex-col gap-1">
          <Estrelas className="h-4" rotulo={`Nota ${AVALIACOES_GOOGLE.nota} de 5 no Google`} />
          <span className="text-sm text-aco">
            {AVALIACOES_GOOGLE.total} avaliações no Google
          </span>
        </span>
      </span>
      <ArrowUpRight className="size-4 text-aco transition-colors group-hover:text-ciano" aria-hidden />
    </TrackedLink>
  );
}
