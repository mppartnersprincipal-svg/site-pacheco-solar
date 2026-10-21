/**
 * CTA único do site: WhatsApp (62) 4101-8101 (decisão do Pedro, 21/10/2026 —
 * sem formulário). Cada contexto tem uma mensagem pré-preenchida com campos
 * para o integrador completar; a qualificação do lead vem daí.
 *
 * [PREENCHER] Mensagens e checklist de dados a validar com o comercial da Pacheco.
 */
import { SITE } from "@/lib/site";

export type Linha =
  | "geral"
  | "solo"
  | "solo-linear"
  | "solo-dupla"
  | "telhado"
  | "telhado-ceramico"
  | "telhado-fibrocimento"
  | "telhado-metalico"
  | "kit"
  | "avulso"
  | "vedacap"
  | "vedacap-lojista"
  | "vedacap-telhadista"
  | "engenharia"
  | "pronta-entrega"
  | "obra"
  | "equipe";

const SAUDACAO = "Olá, Pacheco Solar! Vim pelo site";

export const MENSAGENS: Record<Linha, string> = {
  geral: `${SAUDACAO} e quero um orçamento de estrutura.\nTipo de obra (solo/telhado): ___\nQtd de módulos: ___\nCidade/UF: ___`,
  solo: `${SAUDACAO} e quero orçamento de ESTRUTURA PARA USINA DE SOLO.\nLinear ou dupla: ___\nQtd de módulos: ___\nCidade/UF: ___`,
  "solo-linear": `${SAUDACAO} e quero orçamento de ESTRUTURA DE SOLO LINEAR.\nQtd de módulos: ___\nCidade/UF: ___`,
  "solo-dupla": `${SAUDACAO} e quero orçamento de ESTRUTURA DE SOLO DUPLA.\nQtd de módulos: ___\nCidade/UF: ___`,
  telhado: `${SAUDACAO} e quero orçamento da LINHA TITAN para telhado.\nTipo de telhado (cerâmico/fibrocimento/metálico): ___\nQtd de módulos: ___\nCidade/UF: ___`,
  "telhado-ceramico": `${SAUDACAO} e quero orçamento da LINHA TITAN para TELHADO CERÂMICO.\nQtd de módulos: ___\nCidade/UF: ___`,
  "telhado-fibrocimento": `${SAUDACAO} e quero orçamento da LINHA TITAN para TELHADO DE FIBROCIMENTO.\nQtd de módulos: ___\nCidade/UF: ___`,
  "telhado-metalico": `${SAUDACAO} e quero orçamento da LINHA TITAN para TELHADO METÁLICO (mini-trilho).\nQtd de módulos: ___\nCidade/UF: ___`,
  kit: `${SAUDACAO} e quero orçamento de KIT COMPLETO.\nSolo ou telhado: ___\nQtd de módulos: ___\nCidade/UF: ___`,
  avulso: `${SAUDACAO} e preciso de ITENS AVULSOS.\nItem: ___\nQuantidade: ___\nCidade/UF: ___`,
  vedacap: `${SAUDACAO} e quero orçamento de VEDACAP.\nCor (aluzinco natural/branco/preto): ___\nQuantidade: ___\nCidade/UF: ___`,
  "vedacap-lojista": `${SAUDACAO}. Sou lojista de material de construção e quero a tabela de atacado do VEDACAP.\nLoja/cidade: ___`,
  "vedacap-telhadista": `${SAUDACAO}. Sou telhadista e quero saber mais sobre o VEDACAP.\nQuantidade aproximada: ___\nCidade/UF: ___`,
  engenharia: `${SAUDACAO} e tenho uma dúvida técnica para a engenharia.\nLinha (solo/telhado/kit/Vedacap): ___\nDúvida: ___`,
  "pronta-entrega": `${SAUDACAO} e quero confirmar disponibilidade em pronta entrega.\nItem (solo / telhado Titan / kit / item avulso / Vedacap): ___\nQuantidade: ___`,
  obra: `${SAUDACAO} e quero uma estrutura como a da obra que vi no site.\nObra: ___\nQtd de módulos: ___\nCidade/UF: ___`,
  equipe: `${SAUDACAO} e quero falar com a equipe da Pacheco Solar.`,
};

/** Mensagem para um item avulso específico (catálogo). */
export function mensagemItem(nomeDoItem: string) {
  return `${SAUDACAO} e preciso do item avulso: ${nomeDoItem}.\nQuantidade: ___\nCidade/UF: ___`;
}

/** Mensagem a partir de uma pergunta do FAQ. */
export function mensagemPergunta(pergunta: string) {
  return `${SAUDACAO} e tenho uma pergunta: ${pergunta}`;
}

export type CorVedacap = "aluzinco natural" | "branco" | "preto";

/** Mensagem por cor do Vedacap. */
export function mensagemVedacapCor(cor: CorVedacap) {
  return `${SAUDACAO} e quero orçamento de VEDACAP na cor ${cor}.\nQuantidade: ___\nCidade/UF: ___`;
}

/**
 * Anexa a origem da campanha ao fim da mensagem ("ref: utm_campaign") para
 * o comercial e o gestor de tráfego fecharem o funil. Único ponto em que a
 * campanha entra na mensagem; o restante da atribuição fica no GA4/Ads.
 */
export function comRef(mensagem: string, ref?: string | null) {
  const limpo = (ref ?? "").replace(/[^\w\s\-./|]/g, "").trim().slice(0, 60);
  return limpo ? `${mensagem}\n\nref: ${limpo}` : mensagem;
}

export function waLink(mensagem: string, numero: string = SITE.telefone.wa) {
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;
}

/** Atalho: link da linha (opcionalmente com ref de campanha). */
export function waLinhaLink(linha: Linha, ref?: string | null) {
  return waLink(comRef(MENSAGENS[linha], ref));
}
