/**
 * Blocos que SÓ entram no ar com dado confirmado pelo cliente (regra nº 1 do
 * CLAUDE.md da Pacheco: nunca inventar dado factual). Virar para `true` só
 * depois de preencher o conteúdo correspondente em content/.
 */
export const FLAGS = {
  /** Contadores animados (os números confirmados vivem em content/home.ts: NUMEROS_PROVA) */
  contadores: false,
  /** Faixa de logos PROWATT · SN · MC · ORION — só com os arquivos de logo */
  parceiros: false,
  /** Filtro "Telhado" em /projetos-atendidos — fotos reais de telhado metálico e cerâmico (nov/2026) */
  filtroTelhadoObras: true,
  /** "Atendimento presencial" em /contato — consta no briefing, não confirmado */
  atendimentoPresencial: false,
  /** Nome do cliente/cidade do projeto em destaque (Luca Engenharia · Cocalinho) — só com autorização */
  citarObraCocalinho: false,
  /** Legendas com cidade/UF nas fotos e clipes — só quando houver os dados */
  legendasComLocal: false,
} as const;
