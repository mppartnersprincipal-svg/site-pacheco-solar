/**
 * Copy da página /kits-e-itens-avulsos. Objetos tipados; cada bloco traz a
 * fonte. Nada aqui é inventado: o que falta fica literalmente PREENCHER.
 * - blueprint = plano aprovado (bom-dia-claude-seguinte-peppy-sunset.md)
 * - briefingClaude = BRIEFING PARA CLAUDE (ganchos validados, centralização de compras)
 * - briefing360 = BRIEFING COMPLETO (expedição, pronta entrega)
 * - siteAtual = pachecosolar.com.br (diferencial 02)
 * - manuais = manuais da Linha Titan (quantidades do layout de 4 módulos)
 */
import { SETORES } from "@/content/institucional";
import { PRONTA_ENTREGA_CTA } from "@/config/pronta-entrega";
import { VARIANTES_TITAN, type TipoTelhado } from "@/lib/produtos/titan";
import { ROTAS } from "@/lib/site";

export const KITS_SEO = {
  // fonte: blueprint (h1 com keyword) + briefingClaude + CLAUDE.md do cliente (lista oficial de avulsos)
  title: "Kits Completos e Itens Avulsos para Estrutura Solar",
  description:
    "Kit completo para a obra e item avulso para a montagem não parar: grampos intermediários e finais, parafusos brocante inox e martelo, hastes estruturais inox, clipes de fixação e placas de identificação. Na maior parte do tempo temos pronta entrega — consulte a disponibilidade. Entregamos em todo o Brasil.",
  path: ROTAS.kits,
} as const;

export const KITS_HERO = {
  // fonte: blueprint (hero-kits) + briefingClaude (gancho "Fornecedor te deixa na mão por causa de um parafuso?")
  eyebrow: "KITS COMPLETOS · ITENS AVULSOS",
  titulo: "Kits Completos e Itens Avulsos para Estrutura Solar",
  sub: "Fornecedor te deixa na mão por causa de um parafuso? Tudo em um só fornecedor: o kit completo para a obra e o item avulso para a montagem não parar. Centralize suas compras.",
  placas: ["Pronta entrega", "Kit completo", "Itens avulsos"],
  ctaKit: "Pedir kit completo",
  ctaAvulso: "Pedir item avulso",
  imagemAlt: "Render de grampo intermediário fixando dois módulos no perfil da Linha Titan",
  legendaRender: "RENDER · LINHA TITAN · GRAMPO INTERMEDIÁRIO",
} as const;

export type ComponenteKit = { nome: string; qtd?: number; material?: string; nota?: string };
export type VarianteKit = { id: TipoTelhado; nome: string; componentes: ComponenteKit[] };

/** Layout de 4 módulos da Linha Titan — só o que os manuais listam (fonte: manuais). */
function varianteKit(id: TipoTelhado): VarianteKit {
  const v = VARIANTES_TITAN.find((x) => x.id === id);
  if (!v) throw new Error(`Variante Titan desconhecida: ${id}`);
  return {
    id,
    nome: v.nomeCurto,
    componentes: v.componentes.map((c) => ({ nome: c.nome, qtd: c.qtdLayout4, material: c.material, nota: c.nota })),
  };
}

export const KIT_COMPLETO = {
  // fonte: blueprint (kit-completo) + briefingClaude ("Tudo em um só fornecedor") + briefing360 (expedição)
  eyebrow: "01 · KIT COMPLETO",
  titulo: "Tudo em um só fornecedor.",
  bullets: [
    "Estrutura + fixação no mesmo pedido",
    "Menos fornecedores, menos risco de faltar peça",
    "Expedição organizada e separada aguardando transporte",
  ],
  exemplo: {
    // fonte: manuais Linha Titan (Projeto Executivo, layout de 4 módulos)
    eyebrow: "EXEMPLO REAL · LINHA TITAN · LAYOUT DE 4 MÓDULOS",
    titulo: "O que o manual lista no kit de telhado",
    variantes: [varianteKit("fibrocimento"), varianteKit("metalico")],
    colunas: { item: "Item", qtd: "Qtd.", material: "Material" },
    rodape: "Quantidades do Projeto Executivo dos manuais da Linha Titan para o layout de 4 módulos.",
    linkTelhado: { label: "Ver a Linha Titan completa", href: ROTAS.telhado },
  },
  kitSolo: "Kit de solo: [PREENCHER composição]",
  cta: "Pedir kit completo",
} as const;

export const ITENS_AVULSOS_SECAO = {
  // fonte: blueprint (catalogo-avulsos) + CLAUDE.md do cliente (lista oficial)
  eyebrow: "02 · ITENS AVULSOS",
  titulo: "Faltou peça? Vendemos avulso.",
  sub: "Placas de Identificação, parafusos grampos e muito mais.", // fonte: siteAtual (literal)
  filtros: [
    { id: "todos", label: "Todos" },
    { id: "telhado", label: "Telhado" },
    { id: "solo", label: "Solo" },
  ],
  usoLabel: { telhado: "Telhado", solo: "Solo", ambos: "Solo · Telhado" },
  ctaItem: "Pedir este item · quantidade: ___",
  fotoPendente: "[PREENCHER foto]",
  notaRender: "recorte de render",
  aviso: "Precisa de outro componente (mini trilho, Chapa L, espuma EPDM)? Consulte a disponibilidade pelo WhatsApp. [PREENCHER: política de venda avulsa desses componentes]",
} as const;

export const UM_FORNECEDOR = {
  // fonte: briefingClaude (gancho "Fragmentar fornecedor = dor de cabeça", dores da persona, centralização de compras) + siteAtual (presença nacional)
  eyebrow: "03 · CENTRALIZAÇÃO DE COMPRAS",
  titulo: "Fragmentar fornecedor = dor de cabeça.",
  esquerda: {
    rotulo: "VÁRIOS FORNECEDORES",
    texto: "Vários fornecedores: prazos diferentes, fretes diferentes, peça que não chega.",
  },
  direita: {
    rotulo: "PACHECO SOLAR",
    texto: "Pacheco: kit completo + itens avulsos, entrega em todo o Brasil com logística eficiente e suporte de ponta a ponta.",
  },
  cta: "Centralizar minhas compras",
} as const;

const EXPEDICAO = SETORES.find((s) => s.nome === "Expedição");

export const PRONTA_ENTREGA_SECAO = {
  // fonte: briefing360 (pronta entrega "na maior parte do tempo"; frase literal da expedição) + siteAtual (diferencial 02)
  eyebrow: "04 · EXPEDIÇÃO",
  titulo: "Na maior parte do tempo temos pronta entrega.",
  expedicao: EXPEDICAO?.texto ?? "O material produzido vai para a expedição, fica organizado e separado aguardando transporte.",
  beneficio: "Menos tempo de espera, mais eficiência no cronograma.",
  ressalva: "Consulte a disponibilidade da sua linha pelo WhatsApp.",
  fotoLegenda: "[PREENCHER foto da expedição]",
  fotoAlt: "Estrutura de solo dupla em usina com brita — foto provisória até a foto da expedição",
  cta: PRONTA_ENTREGA_CTA,
} as const;

export const FAQ_KITS_SECAO = {
  // fonte: blueprint (faq-kits)
  eyebrow: "05 · PERGUNTAS",
  titulo: "O que o integrador pergunta antes de pedir.",
} as const;

export const KITS_CTA_FINAL = {
  // fonte: briefingClaude (frase de posicionamento) + blueprint
  titulo: "Fornecedor que resolve, não complica.",
  rotulo: "Pedir kit ou peça no WhatsApp",
  ctaId: "cta-final-kits",
} as const;
