/**
 * Ícones próprios: marcas (WhatsApp, Instagram — o lucide não tem) e motivos do
 * nicho em stroke 1.5px (grampo, trilho, estaca, módulo, sol, parafuso, telha, kit).
 * Todos recebem `className` e são decorativos (aria-hidden) salvo indicação.
 */
type IconProps = { className?: string; title?: string };

function Svg({ className, title, children, viewBox = "0 0 24 24" }: IconProps & { children: React.ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      className={className}
    >
      {title ? <title>{title}</title> : null}
      {children}
    </svg>
  );
}

export function WhatsAppIcon({ className, title }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden={title ? undefined : true} role={title ? "img" : undefined} className={className}>
      {title ? <title>{title}</title> : null}
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function InstagramIcon(p: IconProps) {
  return (
    <Svg {...p}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </Svg>
  );
}

/** Grampo intermediário: "chapéu" em U invertido com parafuso central. */
export function IconGrampo(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 14h4v-4h8v4h4" />
      <path d="M4 14v4h16v-4" />
      <path d="M12 6v4" />
      <circle cx="12" cy="5" r="1.5" />
    </Svg>
  );
}

/** Perfil/trilho de alumínio com a gaveta lateral. */
export function IconTrilho(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 8h18v8H3z" />
      <path d="M3 11h4v2H3" />
      <path d="M17 11h4v2h-4" />
    </Svg>
  );
}

/** Estaca cravada no solo. */
export function IconEstaca(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3v14" />
      <path d="M9 3h6" />
      <path d="M4 17c2-1.5 4-1.5 6 0s4 1.5 6 0 4-1.5 4 0" />
      <path d="M4 21h16" />
    </Svg>
  );
}

/** Módulo fotovoltaico inclinado sobre estrutura. */
export function IconModulo(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 15 7 6h14l-4 9z" />
      <path d="M8 6v9M13 6v9" />
      <path d="M5.5 10.5h12" />
      <path d="M11 15v5M15 15v5M8 20h10" />
    </Svg>
  );
}

/** Sol (arco da logo). */
export function IconSol(p: IconProps) {
  return (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </Svg>
  );
}

/** Arco "SOLAR" da logo isolado (ornamento). */
export function IconArco(p: IconProps) {
  return (
    <Svg {...p} viewBox="0 0 48 24">
      <path d="M4 20c6-10 34-10 40 0" strokeWidth={2.5} />
    </Svg>
  );
}

/** Parafuso brocante. */
export function IconParafuso(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M8 4h8l-1 3H9z" />
      <path d="M10 7v10l2 4 2-4V7" />
      <path d="M10 10h4M10 13h4M10 16h4" />
    </Svg>
  );
}

/** Telha metálica trapezoidal. */
export function IconTelha(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M2 16l3-5h3l3 5h2l3-5h3l3 5" />
      <path d="M2 16h20" />
    </Svg>
  );
}

/** Kit completo (caixa de expedição com etiqueta). */
export function IconKit(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 8l9-4 9 4v9l-9 4-9-4z" />
      <path d="M3 8l9 4 9-4M12 12v9" />
      <path d="M7.5 6l9 4" />
    </Svg>
  );
}

/** Haste estrutural (linha de cota). */
export function IconHaste(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M12 3v18" />
      <path d="M9 6l3-3 3 3M9 18l3 3 3-3" />
      <path d="M6 12h12" />
    </Svg>
  );
}

/** Capacete do integrador/instalador. */
export function IconCapacete(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M4 16a8 8 0 0 1 16 0" />
      <path d="M2 16h20" />
      <path d="M10 8v-3h4v3" />
      <path d="M4 16v2h16v-2" />
    </Svg>
  );
}

/** Loja de material de construção. */
export function IconLoja(p: IconProps) {
  return (
    <Svg {...p}>
      <path d="M3 9l2-5h14l2 5" />
      <path d="M3 9h18v3a3 3 0 0 1-6 0 3 3 0 0 1-6 0 3 3 0 0 1-6 0z" />
      <path d="M5 14v6h14v-6" />
      <path d="M10 20v-4h4v4" />
    </Svg>
  );
}
