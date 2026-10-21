/**
 * Copy da página /vedacap. Objetos tipados; cada bloco traz a fonte. Fatos do
 * produto vêm de lib/produtos/catalogo.ts (VEDACAP); nada é inventado — o que
 * falta fica literalmente PREENCHER.
 * - roteirosVedacap = "Roteiros VEDACAP" (Drive, set/2026)
 * - claudeMd = CLAUDE.md do cliente (set/2026)
 * - blueprint = plano aprovado (bom-dia-claude-seguinte-peppy-sunset.md)
 * - prontaEntrega = config/pronta-entrega.ts (ressalva obrigatória)
 */
import { PRONTA_ENTREGA_POR_LINHA } from "@/config/pronta-entrega";
import { VEDACAP } from "@/lib/produtos/catalogo";
import { ROTAS } from "@/lib/site";

export const VEDACAP_SEO = {
  // fonte: blueprint (h1 com nome do produto) + roteirosVedacap (definição) + prontaEntrega
  title: "Vedacap — capa em aluzinco para a cabeça do parafuso em telhado metálico",
  description: `${VEDACAP.definicao} Três versões: aluzinco natural, branco e preto. Temos o Vedacap a pronta entrega — consulte a disponibilidade. Aplicação simples com cola PU.`,
  path: ROTAS.vedacap,
  categoria: "Fixação para telhado metálico",
} as const;

export const VEDACAP_HERO = {
  // fonte: roteirosVedacap (eyebrow, headline, definição, 3 versões, pronta entrega) + prontaEntrega (ressalva)
  eyebrow: VEDACAP.eyebrow,
  /** Prefixo sr-only: o h1 semântico carrega o nome do produto + keyword (blueprint); a headline fica visível dentro do h1 */
  nomeSrOnly: "Vedacap — capa em aluzinco para a cabeça do parafuso em telhado metálico. ",
  headline: VEDACAP.headline,
  sub: `${VEDACAP.definicao} Três versões: aluzinco natural, branco e preto. Pronta entrega: consulte a disponibilidade.`,
  placas: ["Novo", "Aluzinco", "Pronta entrega"],
  cta: "Pedir Vedacap no WhatsApp",
  logoAlt: "Vedacap — logo",
  corte: {
    // fonte: roteirosVedacap (nomes das peças) + blueprint (legenda PREENCHER)
    titulo: "Corte transversal",
    toggleSem: "Sem Vedacap",
    toggleCom: "Com Vedacap",
    corLabel: "Cor da capa",
    legenda: "[PREENCHER foto real do produto nas 3 cores]",
    rotulos: {
      telha: "Telha metálica",
      parafuso: "Parafuso autobrocante",
      arruela: "Arruela de vedação",
      capa: "Vedacap",
      sol: "Sol",
      chuva: "Chuva",
      goteira: "Goteira",
    },
  },
} as const;

export const VEDACAP_PROBLEMA = {
  // fonte: roteirosVedacap (VEDACAP.problema, VEDACAP.argumentos, VEDACAP.publicos) + blueprint (3 cards)
  eyebrow: "01 · O PROBLEMA",
  titulo: "A borracha de vedação resseca em cerca de 10 anos.",
  intro: VEDACAP.problema,
  cards: [
    {
      id: "sol-chuva",
      icone: "sol" as const,
      titulo: "Sol e chuva na cabeça do parafuso",
      texto: "A borracha de vedação do parafuso resseca em cerca de 10 anos.",
    },
    {
      id: "goteira",
      icone: "chuva" as const,
      titulo: "A goteira aparece e o retrabalho é do telhadista",
      texto: "Ela racha, abre uma fresta e a chuva entra pelo furo.",
    },
    {
      id: "garantia",
      icone: "garantia" as const,
      titulo: "O integrador assinou uma garantia que passa por esse parafuso",
      texto: VEDACAP.publicos[0].texto,
    },
  ],
} as const;

export const VEDACAP_ALUZINCO = {
  // fonte: roteirosVedacap (VEDACAP.argumentos)
  eyebrow: "02 · POR QUE ALUZINCO",
  titulo: "Mesmo material da telha.",
  argumentos: VEDACAP.argumentos,
  imagemAlt: "Render do mini trilho da Linha Titan fixado com parafuso brocante em telha metálica",
  imagemLegenda: "RENDER · LINHA TITAN · TELHA METÁLICA",
} as const;

export const VEDACAP_APLICACAO = {
  // fonte: roteirosVedacap + claudeMd ("aplicação simples com cola PU"; "não adianta silicone, fita ou massa"; passo a passo PREENCHER)
  eyebrow: "03 · APLICAÇÃO",
  titulo: "Aplicação simples com cola PU.",
  aviso: "Não adianta silicone, fita ou massa: todos são orgânicos, todos ressecam pelo mesmo motivo.",
  passoAPasso: VEDACAP.passoAPasso,
  nota: "Indicado para telhados metálicos e estruturas solares.",
  cta: "Tirar dúvida de aplicação",
  /** Pergunta enviada via mensagemPergunta() — fonte: blueprint */
  pergunta: "Como é o passo a passo de aplicação do Vedacap com cola PU?",
} as const;

export const VEDACAP_VERSOES = {
  // fonte: roteirosVedacap (3 versões) + blueprint (PREENCHER foto por cor)
  eyebrow: "04 · VERSÕES",
  titulo: "Três versões: aluzinco natural, branco e preto.",
  sub: "Para combinar com a cor da telha metálica.", // fonte: lib/faq.ts (FAQ_VEDACAP "Quais cores existem?") — uso restrito a telhado metálico
  versoes: VEDACAP.versoes,
  ctaPrefixo: "Pedir na cor",
  fotoPendente: "[PREENCHER foto de produto por cor]",
} as const;

export const VEDACAP_PUBLICOS = {
  // fonte: roteirosVedacap + claudeMd (VEDACAP.publicos; tabela de atacado pelo WhatsApp)
  eyebrow: "05 · PARA QUEM",
  titulo: "Para integrador, telhadista e lojista.",
  publicos: VEDACAP.publicos,
  ctas: {
    integrador: "Pedir Vedacap",
    telhadista: "Falar sobre o Vedacap",
    lojista: "Pedir tabela de atacado",
  } as const,
} as const;

export const FAQ_VEDACAP_SECAO = {
  // fonte: blueprint (faq-vedacap)
  eyebrow: "06 · PERGUNTAS",
  titulo: "O que perguntam sobre o Vedacap.",
} as const;

export const VEDACAP_ATACADO = {
  // fonte: claudeMd (tabela de atacado para lojistas, só pelo WhatsApp) + VEDACAP.publicos[2]
  eyebrow: "LOJISTA DE MATERIAL DE CONSTRUÇÃO",
  texto: VEDACAP.publicos[2].texto,
  cta: "Tabela de atacado (lojista)",
} as const;

export const VEDACAP_CTA_FINAL = {
  // fonte: roteirosVedacap (headline) + prontaEntrega (texto da barra, com ressalva)
  titulo: VEDACAP.headline,
  subtitulo: PRONTA_ENTREGA_POR_LINHA.vedacap,
  rotulo: "Pedir Vedacap no WhatsApp",
  ctaId: "cta-final-vedacap",
} as const;
