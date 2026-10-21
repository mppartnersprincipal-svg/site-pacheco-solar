/**
 * Blocos que SÓ entram no ar com dado confirmado pelo cliente (regra nº 1 do
 * CLAUDE.md da Pacheco: nunca inventar dado factual). Virar para `true` só
 * depois de preencher o conteúdo correspondente em content/.
 */
export const FLAGS = {
  /** Contadores (+25 MW, painéis fixados, estados, toneladas) — valores [PREENCHER] */
  contadores: false,
  /** Faixa de logos PROWATT · SN · MC · ORION — arquivos de logo [PREENCHER] */
  parceiros: false,
  /** Filtro "Telhado" em /obras — não há fotos reais de telhado instalado [PREENCHER] */
  filtroTelhadoObras: false,
  /** "Atendimento presencial" em /contato — consta no briefing, confirmar [PREENCHER] */
  atendimentoPresencial: false,
  /** Nome do cliente/cidade da obra em destaque (Luca Engenharia · Cocalinho) — autorização [PREENCHER] */
  citarObraCocalinho: false,
  /** Legendas com cidade/UF nas fotos e clipes — dados [PREENCHER] */
  legendasComLocal: false,
} as const;
