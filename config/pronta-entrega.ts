/**
 * Textos da barra "Pronta entrega". Regra de fidelidade: sempre "na maior
 * parte do tempo" + convite a consultar disponibilidade; nunca status de estoque.
 * Fontes: briefing 360º (diferencial nº 1, descrição da expedição) e site atual.
 */
export const PRONTA_ENTREGA_ITENS = [
  "Na maior parte do tempo temos pronta entrega",
  "Expedição organizada e separada aguardando transporte",
  "Entregamos em todo o Brasil com logística eficiente",
  "Kits completos e itens avulsos",
] as const;

export const PRONTA_ENTREGA_POR_LINHA = {
  solo: "Estrutura de solo: na maior parte do tempo temos pronta entrega — consulte a disponibilidade",
  telhado: "Linha Titan: na maior parte do tempo temos pronta entrega — consulte a disponibilidade",
  kits: "Kits e itens avulsos: na maior parte do tempo temos pronta entrega — consulte a disponibilidade",
  vedacap: "Vedacap em pronta entrega — aluzinco natural, branco e preto — consulte a disponibilidade",
} as const;

export const PRONTA_ENTREGA_CTA = "Consultar disponibilidade";
