const SECTIONS = [
  { id: "kpis", label: "Visão geral" },
  { id: "google-ads", label: "Google Ads" },
  { id: "ga4", label: "GA4" },
  { id: "origem", label: "Origem" },
  { id: "botoes", label: "Botões" },
  { id: "jornadas", label: "Jornadas" },
  { id: "paginas", label: "Páginas" },
  { id: "secoes", label: "Seções" },
  { id: "horarios", label: "Horários" },
  { id: "geo", label: "Cidades" },
  { id: "campanhas", label: "Campanhas no site" },
  { id: "ao-vivo", label: "Ao vivo" },
];

/** Âncoras das seções (sticky abaixo do topo do painel). */
export function SectionNav() {
  return (
    <nav
      aria-label="Seções do dashboard"
      className="sticky top-14 z-30 -mx-4 overflow-x-auto border-b border-line bg-surface-alt/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8"
    >
      <ul className="flex gap-1 py-2 text-sm">
        {SECTIONS.map((s) => (
          <li key={s.id} className="shrink-0">
            <a
              href={`#${s.id}`}
              className="inline-flex min-h-8 items-center rounded-full px-3 font-semibold text-ink-muted transition-colors hover:bg-brand-tint hover:text-brand-hover"
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
