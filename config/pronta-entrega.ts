/**
 * Textos da barra "Pronta entrega". Regra de fidelidade: sempre com convite a
 * consultar a disponibilidade ("na maior parte do tempo" saiu a pedido do Pedro, 10/11/2026); nunca status de estoque.
 * Fontes: briefing 360º (diferencial nº 1, descrição da expedição) e site atual.
 */
export const PRONTA_ENTREGA_ITENS = [
  "Pronta entrega sob consulta",
  "Expedição organizada e separada aguardando transporte",
  "Entregamos em todo o Brasil com logística eficiente",
  "Kits completos e itens avulsos",
] as const;

export const PRONTA_ENTREGA_POR_LINHA = {
  solo: "Estrutura de solo: pronta entrega — consulte a disponibilidade",
  telhado: "Linha Titan: pronta entrega — consulte a disponibilidade",
  kits: "Kits e itens avulsos: pronta entrega — consulte a disponibilidade",
  vedacap: "Vedacap: pronta entrega — aluzinco natural, branco e preto — consulte a disponibilidade",
} as const;

export const PRONTA_ENTREGA_CTA = "Consultar disponibilidade";
