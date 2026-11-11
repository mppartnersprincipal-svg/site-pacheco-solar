/**
 * Copy da HOME — objetos tipados, cada bloco com a fonte. Os componentes em
 * components/home/ só renderizam o que está aqui; nada de frase nova lá.
 * Fontes: frases de posicionamento e ganchos validados (CLAUDE.md do cliente),
 * site atual (pachecosolar.com.br), briefing 360º, briefing para Claude.
 * Versão enxuta de 22/10/2026 (feedback do Lucas: "muita informação"): 9 blocos,
 * uma frase por bloco, nenhum [PREENCHER] visível ao visitante.
 */
import { ROTAS, SITE } from "@/lib/site";
import { DEPOIMENTOS } from "@/lib/obras";
import { HISTORIA, PROPOSITO } from "@/content/institucional";

// ------------------------------------------------------------------ 1. hero
// fonte: FRASES_POSICIONAMENTO (H1) + pilares/diferenciais do site atual (sub)
export const HERO = {
  /** H1 da home (exibido em caixa-alta via CSS) — keyword principal das campanhas */
  eyebrow: "Estruturas metálicas para energia solar",
  titulo: "Estrutura que não te deixa na mão.",
  /** Trecho do título em laranja (última ocorrência) */
  tituloDestaque: "na mão.",
  /** Duas linhas: o "\n" vira quebra (whitespace-pre-line no HeroVideo) */
  subtitulo:
    "Soluções: solo, telhado, kits e itens avulsos.\nFabricante com engenharia própria e entrega em todo o Brasil!",
  ctaPrimario: "Pedir orçamento no WhatsApp",
  ctaSecundario: "Ver linhas de produto",
  ctaSecundarioHref: "#linhas-de-produto",
  /** Descrição do vídeo institucional para leitores de tela (fachada, fábrica e usina) */
  videoAria: "Vídeo institucional da Pacheco Solar: fachada da fábrica, equipe na produção das estruturas e usina de solo ao pôr do sol",
} as const;

// -------------------------------------------------------------- 2. propósito
// fonte: PROPOSITO (briefing 360º, literal)
export const PROPOSITO_SECAO = {
  eyebrow: "NOSSO PROPÓSITO",
  texto: PROPOSITO.texto,
} as const;

// ------------------------------------------------------ 3. linhas-de-produto
// fonte: site atual (H2 = recorte do diferencial 04). Cards vêm de LINHAS_HOME em lib/produtos/catalogo.ts
export const LINHAS_SECAO = {
  eyebrow: "CATÁLOGO · 03 LINHAS + VEDACAP",
  titulo: "Seja qual for o projeto, temos a estrutura solar certa.",
  /** Termos das campanhas que caem na home (estrutura metálica, suporte para placa solar, fixação) */
  subtitulo: "Estrutura metálica e suporte para placa solar no solo e no telhado, kit de fixação e itens avulsos, com engenharia própria e entrega em todo o Brasil.",
  verLinha: "Ver linha",
  placaNovo: "Novo",
  vedacapCta: "Conhecer o Vedacap",
} as const;

// ------------------------------------------------------------ 4. fundador
// fonte: blueprint (H2) + HISTORIA (briefing 360º, literal)
export const SOBRE_RESUMO = {
  eyebrow: "QUEM ESTÁ POR TRÁS",
  titulo: "Fundada por quem já esteve na obra.",
  historia: HISTORIA.texto,
  fundador: SITE.fundador,
  fundadorRotulo: "Fundador · Pacheco Solar",
  /** Retrato de estúdio do Lucas (assets-src/images/lucas/fundador-lucas.jpg, 22/10/2026) */
  fotoKey: "lucas/fundador-lucas",
  fotoAlt: "Lucas Pacheco, fundador da Pacheco Solar",
  ctaSobre: "Conhecer a Pacheco",
  ctaSobreHref: ROTAS.sobre,
} as const;

// ------------------------------------------------------------ 5. obras
// Projetos grandes, um por card (PROJETOS_DESTAQUE em lib/obras.ts). O gancho
// "Resistência não é peso, é engenharia." fica só em /projetos-atendidos (estava repetido).
export const OBRAS_SECAO = {
  eyebrow: "PROJETOS ATENDIDOS",
  titulo: "Usinas que levam estrutura Pacheco.",
  /** Trecho do título em laranja */
  destaque: "estrutura Pacheco",
  rotuloPaineis: "painéis",
  cta: "Ver projetos atendidos",
  ctaHref: ROTAS.obras,
} as const;

// ------------------------------------------------------------ 6. diferenciais
// fonte: frase de posicionamento (CLAUDE.md do cliente); itens: DIFERENCIAIS (site atual) em content/institucional.ts
export const DIFERENCIAIS_SECAO = {
  eyebrow: "POR QUE A PACHECO SOLAR",
  titulo: "Fornecedor que resolve, não complica.",
} as const;

// ----------------------------------------------------------- 7. como-funciona
// fonte: blueprint (H2) + briefing 360º (processo de compra = PROCESSO_COMPRA)
export const COMO_FUNCIONA = {
  eyebrow: "COMO FUNCIONA",
  titulo: "Do orçamento à expedição, sem burocracia.",
  cta: "Começar pelo passo 1",
} as const;

// ------------------------------------------------------------ 8. prova-social
// fonte: frase de posicionamento (CLAUDE.md do cliente); depoimentos literais do site atual (lib/obras.ts)
export const PROVA_SOCIAL = {
  eyebrow: "CLIENTES SATISFEITOS EM TODO O BRASIL",
  titulo: "Mais obra entregue, menos dor de cabeça.",
  depoimentos: DEPOIMENTOS,
} as const;

/** Números de prova social confirmados pelo Lucas (WhatsApp, 02/11/2026). */
export const NUMEROS_PROVA = [
  { valor: "+3 mil", rotulo: "integradores atendidos" },
  { valor: "+100 mil", rotulo: "painéis fixados em todo o Brasil" },
] as const;

// ------------------------------------------------------------ 9. cta-final
// fonte: frase de posicionamento + fechamento do site atual (CtaFinal usa os defaults)
export const CTA_FINAL = {
  eyebrow: "ORÇAMENTO GRATUITO",
} as const;

// ------------------------------------------------------------- 9. faq
// 11/11/2026: FAQ da home com os termos das campanhas (FAQ_HOME em lib/faq.ts) + FAQPage JSON-LD
export const FAQ_HOME_HEADING = {
  eyebrow: "PERGUNTAS FREQUENTES",
  titulo: "Estrutura e suporte para placa solar: o que o integrador pergunta.",
} as const;
