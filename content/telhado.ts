/**
 * Copy da página /estruturas-para-telhado (Linha Titan). Toda frase vem de
 * lib/produtos/titan.ts, lib/produtos/catalogo.ts, lib/faq.ts ou do blueprint
 * do plano aprovado; o que falta fica literalmente como [PREENCHER ...].
 * REGRA: nunca "fabricamos" para a Linha Titan; materiais 6005/inox/mini
 * trilhos só como atributo da Linha Titan; pronta entrega sempre com ressalva.
 */
import type { MediaKey } from "@/lib/media";
import { ROTAS } from "@/lib/site";
import { TITAN, type TipoTelhado } from "@/lib/produtos/titan";
import { VEDACAP } from "@/lib/produtos/catalogo";

export const TELHADO_META = {
  // fonte: plano (arquitetura de páginas — h1 com keyword) + site atual + briefing para Claude
  title: "Estrutura para Telhado — Linha Titan",
  description:
    "Soluções adaptáveis para telhados residenciais e comerciais. Linha Titan para telhado cerâmico, de fibrocimento e metálico: alumínio estrutural 6005, parafusos em aço inox e mini trilhos com ventilação. Pronta entrega na maior parte do tempo — consulte a disponibilidade.",
  path: ROTAS.telhado,
  imagem: "telhado/titan-metalico-modulo-transparente" as MediaKey,
  imagemAlt: "Render da Linha Titan em telhado metálico com módulos transparentes mostrando os mini trilhos",
} as const;

export const HERO_TELHADO = {
  // fonte: lib/produtos/titan.ts (eyebrow) + site atual (frase) + briefing para Claude (materiais)
  eyebrow: TITAN.eyebrow,
  titulo: "Estrutura para Telhado — Linha Titan",
  subtitulo:
    "Soluções adaptáveis para telhados residenciais e comerciais. Alumínio estrutural 6005, parafusos em aço inox e mini trilhos com ventilação.",
  placas: ["Cerâmico", "Fibrocimento", "Metálico", "Manual de instalação"],
  cta: "Pedir orçamento Titan no WhatsApp",
} as const;

export const SELETOR_TELHADO = {
  // fonte: blueprint (/estruturas-para-telhado → seletor-telhado)
  eyebrow: "SELETOR · 03 TIPOS DE TELHADO",
  titulo: "Qual é o telhado da obra?",
  subtitulo: "Escolha o tipo de telhado para ver o render, os componentes do manual e o manual de instalação em PDF.",
  rotuloComponentes: "Componentes",
  rotuloRegras: "Regras do manual",
  rotuloQuantidade: "Layout de 4 módulos",
  semManual: "[PREENCHER manual de instalação do telhado cerâmico]",
  /** Rótulo do botão de WhatsApp por tipo (vai junto da mensagem de lib/whatsapp.ts) */
  cta: {
    ceramico: "Orçar para telhado cerâmico",
    fibrocimento: "Orçar para telhado de fibrocimento",
    metalico: "Orçar para telhado metálico",
  } satisfies Record<TipoTelhado, string>,
} as const;

export const LISTA_DE_MATERIAIS = {
  // fonte: plano (regra 11 — quantidades do Projeto Executivo) + manuais Linha Titan
  eyebrow: "LISTA DE MATERIAIS · PROJETO EXECUTIVO",
  titulo: "Layout de 4 módulos — o que vem no kit.",
  subtitulo: "Quantidades do Projeto Executivo dos manuais da Linha Titan, por tipo de telhado.",
  caption: "Lista de materiais da Linha Titan para o layout de 4 módulos (Projeto Executivo do manual de instalação).",
  colunas: { item: "Item", material: "Material", qtd: "Qtd. (4 módulos)", nota: "Nota" },
  semQuantidade: "—",
  rodape: "Emendas na gaveta lateral do perfil. Quantidades de outros layouts: fale com a engenharia.",
  cta: "Pedir este kit",
  explodido: { montar: "Montar", explodir: "Explodir", legenda: "Vista explodida simplificada do kit" },
} as const;

export const DADOS_TECNICOS = {
  // fonte: lib/produtos/titan.ts (manuais) + gancho validado do CLAUDE.md do cliente
  eyebrow: "DADOS TÉCNICOS · LINHA TITAN",
  titulo: "Resistência não é peso, é engenharia.",
  subtitulo:
    "Torque de aperto, distância entre apoios por isopleta de vento, regras de fixação, ferramentas e cuidados — conforme os manuais de instalação da Linha Titan.",
  blocoTitulo: "FICHA TÉCNICA · LINHA TITAN · CONFORME MANUAL DE INSTALAÇÃO",
  rotulos: {
    torque: "Torque de aperto",
    isopleta: "Distância entre apoios por isopleta de vento (NBR-6123)",
    isopletaAjuda: "Selecione a faixa de velocidade do vento para ver a distância entre apoios.",
    regras: "Regras de fixação",
    ferramentas: "Ferramentas",
    cuidados: "Cuidados",
    downloads: "Manuais de instalação (PDF)",
    unidadeDistancia: "m",
    rotuloDistancia: "distância entre apoios",
  },
} as const;

export const PASSO_A_PASSO = {
  // fonte: lib/produtos/titan.ts (TITAN.passos) + TITAN.cuidados (nota)
  eyebrow: "MANUAL DE INSTALAÇÃO · 03 ETAPAS",
  titulo: "Montagem passo a passo.",
  subtitulo: "As três etapas do manual da Linha Titan, para telhado de fibrocimento e telhado metálico.",
  nota: "Antes de iniciar qualquer fixação, verifique no manual do módulo as distâncias de apoio.",
  rotuloTodos: "Fibrocimento e metálico",
  abas: { fibrocimento: "Fibrocimento", metalico: "Metálico" },
} as const;

export const MATERIAIS_TITAN = {
  // fonte: briefing para Claude (materiais escopados à Linha Titan) + renders do acervo
  eyebrow: "MATERIAIS · LINHA TITAN",
  titulo: "Materiais da Linha Titan.",
  subtitulo: "Alumínio estrutural 6005, parafusos em aço inox e mini trilhos com ventilação — os materiais da Linha Titan.",
  itens: [
    { imagem: "telhado/titan-grampo-intermediario" as MediaKey, legenda: TITAN.materiais[0].nome, alt: "Render de grampo intermediário fixando módulos no perfil de alumínio da Linha Titan" },
    { imagem: "telhado/titan-fibrocimento-close" as MediaKey, legenda: TITAN.materiais[1].nome, alt: "Render do perfil Titan em telhado de fibrocimento com haste estrutural e parafuso" },
    { imagem: "telhado/titan-metalico-minitrilho-close" as MediaKey, legenda: TITAN.materiais[2].nome, alt: "Render do mini trilho da Linha Titan fixado em telha metálica" },
  ],
  cta: "Quero a lista de materiais do meu projeto",
} as const;

export const VEDACAP_CROSS = {
  // fonte: blueprint (vedacap-cross) + lib/produtos/catalogo.ts (VEDACAP) + lib/faq.ts (FAQ_VEDACAP pronta entrega)
  eyebrow: VEDACAP.eyebrow,
  titulo: "Telhado metálico? Proteja o parafuso.",
  texto: VEDACAP.definicao,
  prontaEntrega: `${VEDACAP.prontaEntrega} Consulte a disponibilidade.`,
  link: "Conhecer o Vedacap",
  href: ROTAS.vedacap,
  logoAlt: "Logo do Vedacap",
} as const;

export const FAQ_TELHADO_HEADING = {
  // fonte: blueprint (home → objecoes), reaproveitado para a Linha Titan
  eyebrow: "FAQ · LINHA TITAN",
  titulo: "O que todo integrador pergunta antes de fechar.",
} as const;

export const CTA_TELHADO = {
  // fonte: frase de posicionamento validada (CLAUDE.md do cliente) + diferenciais (briefing 360º)
  titulo: "Estrutura que não te deixa na mão.",
  subtitulo: "Linha Titan com pronta entrega na maior parte do tempo e suporte técnico do pré ao pós-venda.",
  rotulo: "Pedir orçamento Titan no WhatsApp",
  ctaId: "cta-final-telhado",
} as const;

export const BREADCRUMB_TELHADO = [
  { name: "Início", path: ROTAS.home },
  { name: TELHADO_META.title, path: ROTAS.telhado },
] as const;
