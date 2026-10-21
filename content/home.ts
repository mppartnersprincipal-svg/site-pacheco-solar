/**
 * Copy da HOME — objetos tipados, cada bloco com a fonte. Os componentes em
 * components/home/ só renderizam o que está aqui; nada de frase nova lá.
 * Fontes: plano aprovado (blueprint "Home — ordem final"), site atual
 * (pachecosolar.com.br), briefing 360º, briefing para Claude, CLAUDE.md do
 * cliente. O que não existe nas fontes fica [PREENCHER].
 */
import { ROTAS, SITE } from "@/lib/site";
import { ANTES_DEPOIS, DEPOIMENTOS, PARCEIROS } from "@/lib/obras";
import { HISTORIA, PROMESSA, SITE_ATUAL } from "@/content/institucional";

// ------------------------------------------------------------------ 1. hero
// fonte: blueprint "Hero (vídeo vertical)" — eyebrow, H1 (site atual), sub, placas, CTAs, microcopy
export const HERO = {
  eyebrow: "ESTRUTURAS METÁLICAS PARA ENERGIA SOLAR · DA INDÚSTRIA PARA SUA OBRA",
  titulo: SITE_ATUAL.heroTitulo,
  subtitulo:
    "Estrutura que não te deixa na mão. Estruturas para usinas de solo, Linha Titan para telhado, kits completos e itens avulsos. Pronta entrega na maior parte do tempo, engenharia própria e suporte técnico do pré ao pós-venda. Entregamos em todo o Brasil com logística eficiente.",
  placas: ["Pronta entrega", "Kits completos + avulsos", "Engenharia própria", "Entrega em todo o Brasil"],
  ctaPrimario: "Pedir orçamento no WhatsApp",
  ctaSecundario: "Ver linhas de produto",
  ctaSecundarioHref: "#linhas-de-produto",
  /** "Atendimento em horário comercial · (62) 4101-8101" — dados de lib/site.ts */
  microcopy: { horario: SITE.horario, telefone: SITE.telefone.display, telefoneE164: SITE.telefone.e164 },
  /** Legenda mono do painel de vídeo (desktop). Local do clipe: [PREENCHER] */
  legendaVideo: "SOLO DUPLA · [PREENCHER local]",
  /** Descrição do vídeo para leitores de tela (acervo SOLO DUPLA, dez/2024–mai/2025) */
  videoAria: "Estrutura de solo dupla da Pacheco Solar montada em usina, com módulos fixados nos perfis de aço",
} as const;

// ------------------------------------------------------ 3. linhas-de-produto
// fonte: blueprint (eyebrow) + site atual (H2 = diferencial 04). Cards vêm de LINHAS em lib/produtos/catalogo.ts
export const LINHAS_SECAO = {
  eyebrow: "CATÁLOGO · 05 LINHAS",
  titulo: "Seja qual for o tipo de projeto, temos a estrutura certa, precisa e compatível com o seu layout.",
  verLinha: "Ver linha",
  orcamento: "Orçamento desta linha",
  placaNovo: "Novo",
} as const;

// ----------------------------------------------------- 4. estrutura-em-campo
// fonte: blueprint (H2 = gancho validado do CLAUDE.md do cliente; sub; legendas TIPO · LOCAL · ANO)
export const CAMPO = {
  eyebrow: "PROVA DE CAMPO · SOLO LINEAR E SOLO DUPLA",
  titulo: "Resistência não é peso, é engenharia.",
  subtitulo: "Estruturas de solo linear e dupla montadas em usinas e fazendas pelo Brasil.",
  /** Sufixo das legendas de campo enquanto cidade/UF e ano não forem confirmados (config/feature-flags.ts: legendasComLocal) */
  legendaLocalAno: "[PREENCHER local] · [PREENCHER ano]",
  legendaAntesDepois: `${ANTES_DEPOIS.legenda} · [PREENCHER ano]`,
  tituloAntesDepois: "Da estaca ao módulo",
  tituloSequencia: "Sequência de montagem",
  ctaObras: "Ver obras realizadas",
  ctaObrasHref: ROTAS.obras,
  ctaWhatsApp: "Quero estrutura para a minha usina",
} as const;

// ------------------------------------------------------------ 5. dor-solucao
// fonte: ganchos validados (CLAUDE.md do cliente) + promessa central (briefing para Claude). Pares: MAPA_DOR_SOLUCAO
export const DOR_SOLUCAO = {
  eyebrow: "DOR → SOLUÇÃO",
  titulo: "Projeto parado é prejuízo.",
  subtitulo: "Fornecedor te deixa na mão por causa de um parafuso?",
  fecho: PROMESSA,
  fechoRotulo: "PROMESSA PACHECO SOLAR",
  cta: "Falar com a engenharia",
} as const;

// ------------------------------------------------------------ 6. diferenciais
// fonte: frase de posicionamento (CLAUDE.md do cliente); itens: DIFERENCIAIS (site atual) em content/institucional.ts
export const DIFERENCIAIS_SECAO = {
  eyebrow: "POR QUE ESCOLHER A PACHECO SOLAR",
  titulo: "Fornecedor que resolve, não complica.",
  subtitulo: "Agilidade, qualidade e compromisso — do pré ao pós-venda.", // fonte: PALAVRAS_CHAVE + diferencial 05 (site atual)
} as const;

// ----------------------------------------------------------- 7. como-funciona
// fonte: blueprint (H2) + briefing 360º (processo de compra = PROCESSO_COMPRA; rodapé literal das forças)
export const COMO_FUNCIONA = {
  eyebrow: "PROCESSO DE COMPRA · 04 PASSOS",
  titulo: "Do orçamento à expedição, sem burocracia.",
  rodape: "Desburocratização da informação e rápida solução dos desafios diários.",
  cta: "Começar pelo passo 1",
} as const;

// ------------------------------------------------------------ 8. prova-social
// fonte: frase de posicionamento (CLAUDE.md do cliente); depoimentos literais do site atual (lib/obras.ts)
export const PROVA_SOCIAL = {
  eyebrow: "CLIENTES SATISFEITOS EM TODO O BRASIL",
  titulo: "Mais obra entregue, menos dor de cabeça.",
  etiqueta: "DEPOIMENTO",
  depoimentos: DEPOIMENTOS,
  /** Pareamento nome↔texto inferido pela ordem do site atual: [PREENCHER confirmar] */
  notaDepoimentos: "Depoimentos de clientes da Pacheco Solar.",
  quemResponde: {
    eyebrow: "QUEM RESPONDE",
    nome: `${SITE.fundador}, fundador`,
    texto: HISTORIA.posVenda,
    fotoPendente: "[PREENCHER foto do Lucas Pacheco]",
  },
  parceiros: {
    eyebrow: "PARCEIROS",
    nomes: PARCEIROS,
    /** Logos dos parceiros: [PREENCHER arquivos] (config/feature-flags.ts: parceiros) */
  },
} as const;

/** Contadores do site atual — rótulos literais, valores [PREENCHER] (config/feature-flags.ts: contadores). */
export const CONTADORES: ReadonlyArray<{ rotulo: string; valor: number | null; prefixo?: string; sufixo?: string }> = [
  { rotulo: "Painéis solares fixados", valor: null }, // fonte: site atual — valor [PREENCHER]
  { rotulo: "Estados atendidos", valor: null }, // fonte: site atual — valor [PREENCHER]
  { rotulo: "Toneladas de aço transformados em estruturas", valor: null }, // fonte: site atual — valor [PREENCHER]
  { rotulo: "MW instalados pelo Brasil", valor: null, prefixo: "+" }, // fonte: posts/Sebrae ("+25 MW") — confirmar [PREENCHER]
];

// ---------------------------------------------------------------- 9. objecoes
// fonte: blueprint (H2); perguntas/respostas: FAQ_HOME em lib/faq.ts
export const OBJECOES = {
  eyebrow: "ANTES DE FECHAR",
  titulo: "O que todo integrador pergunta antes de fechar.",
  subtitulo: "Respostas diretas de quem entende da obra. Se faltar algo, pergunte no WhatsApp.",
} as const;

// ------------------------------------------------------------ 10. sobre-resumo
// fonte: blueprint (H2) + HISTORIA (briefing 360º) + SITE_ATUAL.sobre1 (site atual); ano [PREENCHER]
export const SOBRE_RESUMO = {
  eyebrow: "SOBRE A PACHECO SOLAR",
  titulo: "Fundada por quem já esteve na obra.",
  historia: HISTORIA.texto,
  sobre1: SITE_ATUAL.sobre1,
  anoFundacaoRotulo: "FUNDAÇÃO",
  anoFundacao: HISTORIA.anoFundacao,
  fundador: SITE.fundador,
  fundadorRotulo: "FUNDADOR",
  localRotulo: "SEDE",
  local: `${SITE.endereco.cidade}/${SITE.endereco.uf}`,
  fotoPendente: "[PREENCHER foto do Lucas Pacheco 4:5]",
  ctaSobre: "Conhecer a Pacheco",
  ctaSobreHref: ROTAS.sobre,
  ctaWhatsApp: "Falar com o time",
} as const;
