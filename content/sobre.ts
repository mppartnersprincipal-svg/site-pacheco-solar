/**
 * Copy da página /sobre. Só frases literais de content/institucional.ts,
 * lib/site.ts e do blueprint do plano; o que não existe fica marcado como pendência (PREENCHER).
 */
import { SITE } from "@/lib/site";
import { HISTORIA, PALAVRAS_CHAVE, SETORES, SITE_ATUAL } from "@/content/institucional";
import type { Passo } from "@/components/nicho/EstacaTimeline";

export const SOBRE_META = {
  // fonte: blueprint (/sobre) + lib/site.ts (descrição institucional)
  title: "Sobre: indústria de estruturas solares em Goiânia",
  description:
    "Pacheco Solar: fabricante de estruturas metálicas para energia solar em Aparecida de Goiânia/GO, fundada por quem já esteve na obra. Estrutura de solo, Linha Titan para telhado e kits de fixação, com entrega em todo o Brasil.",
};

export const SOBRE_HERO = {
  // fonte: blueprint (hero-sobre) + SITE_ATUAL.sobre1 + PALAVRAS_CHAVE (ano de fundação fora, decisão do Pedro 22/10/2026)
  eyebrow: "Quem somos · Fabricante de estruturas metálicas para energia solar em Goiânia",
  titulo: "Sobre a Pacheco Solar",
  subtitulo: `${SITE_ATUAL.sobre1} Indústria de estruturas solares em Aparecida de Goiânia/GO, com entrega em todo o Brasil.`,
  placas: [...PALAVRAS_CHAVE],
  cta: "Falar com a Pacheco",
  fotoAlt: "Estrutura de solo dupla da Pacheco Solar montada em usina fotovoltaica com brita",
};

export const SOBRE_HISTORIA = {
  // fonte: blueprint (historia) + HISTORIA.texto (briefing360, literal)
  eyebrow: "História",
  titulo: "Fundada por quem já esteve na obra.",
  texto: HISTORIA.texto,
  linkObras: "Ver projetos atendidos",
  /** Retrato de estúdio (assets-src/images/lucas/fundador-lucas.jpg, 22/10/2026) */
  fotoKey: "lucas/fundador-lucas" as const,
  fotoAlt: "Lucas Pacheco, fundador da Pacheco Solar",
  fotoNome: SITE.fundador,
  fotoRotulo: "Fundador · Pacheco Solar",
};

/**
 * Marcos da timeline — caminho passado pelo Pedro (10/11/2026), sem anos visíveis
 * (referência interna: até 2020 integrador · 2021 · 2022 · 2023 · 2024 · 2025 · 2026).
 * Linha Titan: "lançamento", nunca "fabricamos" (regra nº 2 do CLAUDE.md).
 */
export const SOBRE_MARCOS: Passo[] = [
  { titulo: "Na obra, como integrador", texto: "Sentindo na pele a falta de produto de qualidade e de fornecedor que cumpre prazo." },
  { titulo: "Nasce a Pacheco Solar", texto: "Um parceiro estratégico 100% focado no integrador." },
  { titulo: "Vira indústria", texto: "Fabricação própria da estrutura de solo." },
  { titulo: "Mais espaço e software", texto: "Ampliação do espaço e investimento em softwares de gestão." },
  { titulo: "Tecnologia e IA", texto: "Agentes de IA para automatizar e organizar os processos." },
  { titulo: "Linha Titan", texto: "Lançamento das estruturas para telhado." },
  { titulo: "Vedacap", texto: "Novo item da linha de fixação." },
];

export const SOBRE_MVP = {
  // fonte: blueprint (missao-visao-proposito); textos vêm de MISSAO/VISAO/PROPOSITO (briefing360)
  eyebrow: "Missão · Visão · Propósito",
  titulo: "O que guia a Pacheco Solar.",
  rotulos: { missao: "Missão", visao: "Visão", proposito: "Propósito" },
};

export const SOBRE_VALORES = {
  // fonte: manual de cultura (nov/2026); itens vêm de VALORES
  eyebrow: "Nossos valores",
  titulo: "Cultura não é o que está escrito, é o que é praticado todos os dias.",
  subtitulo: "Cinco valores que definem como trabalhamos, como tomamos decisões e como buscamos resultado para o integrador.",
};

export const SOBRE_COMO_TRABALHAMOS = {
  // fonte: SITE_ATUAL.sobre3 (h2, literal) + SITE_ATUAL.sobre2 (parágrafo, literal) + SETORES + FORCAS (briefing360)
  eyebrow: "Como trabalhamos",
  titulo: SITE_ATUAL.sobre3,
  paragrafo: SITE_ATUAL.sobre2,
  setoresTitulo: "Cinco setores, um só fornecedor.",
  forcasTitulo: "Forças",
  cta: "Falar com o comercial",
};

/** Setores como passos da EstacaTimeline (nome + texto curto de SETORES). */
export const SOBRE_SETORES: Passo[] = SETORES.map((s) => ({ titulo: s.nome, texto: s.texto }));

export const SOBRE_LOCALIZACAO = {
  // fonte: blueprint (localizacao) + DIFERENCIAIS 06 (site atual, literal) + lib/site.ts
  eyebrow: "Localização",
  titulo: "Localização estratégica no centro do Brasil.",
  texto: "Entregamos em todo o Brasil com logística eficiente e suporte de ponta a ponta.",
  rotuloEndereco: "Endereço",
  rotuloMapa: "Abrir no Google Maps",
};

export const SOBRE_CTA_FINAL = {
  // fonte: blueprint (cta-sobre) + DIFERENCIAIS 05 (site atual)
  titulo: "Fale com quem entende.",
  subtitulo: "Suporte técnico e personalizado do pré ao pós-venda.",
  rotulo: "Chamar no WhatsApp",
};
