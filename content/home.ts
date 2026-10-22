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
  eyebrow: "ESTRUTURAS METÁLICAS PARA ENERGIA SOLAR · DA INDÚSTRIA PARA SUA OBRA",
  titulo: "Estrutura que não te deixa na mão.",
  /** Trecho do título em laranja (última ocorrência) */
  tituloDestaque: "na mão.",
  subtitulo:
    "Estruturas para usinas de solo, Linha Titan para telhado, kits completos e itens avulsos. Engenharia própria e entrega em todo o Brasil.",
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
  titulo: "Seja qual for o projeto, temos a estrutura certa.",
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
  /** Foto recortada do Lucas: [PREENCHER foto do Lucas Pacheco] (lib/media: lucas/fundador-recorte) */
  fotoKey: "lucas/fundador-recorte",
  fotoAlt: "Lucas Pacheco, fundador da Pacheco Solar",
  ctaSobre: "Conhecer a Pacheco",
  ctaSobreHref: ROTAS.sobre,
} as const;

// ------------------------------------------------------------ 5. obras
// fonte: gancho validado (CLAUDE.md do cliente). Fotos: OBRAS_DESTAQUE em lib/obras.ts
export const OBRAS_SECAO = {
  eyebrow: "PROVA DE CAMPO",
  titulo: "Resistência não é peso, é engenharia.",
  cta: "Ver todas as obras",
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

/** Contadores do site atual — rótulos literais, valores [PREENCHER] (config/feature-flags.ts: contadores). Fora da home até ter os números. */
export const CONTADORES: ReadonlyArray<{ rotulo: string; valor: number | null; prefixo?: string; sufixo?: string }> = [
  { rotulo: "Painéis solares fixados", valor: null }, // fonte: site atual — valor [PREENCHER]
  { rotulo: "Estados atendidos", valor: null }, // fonte: site atual — valor [PREENCHER]
  { rotulo: "Toneladas de aço transformados em estruturas", valor: null }, // fonte: site atual — valor [PREENCHER]
  { rotulo: "MW instalados pelo Brasil", valor: null, prefixo: "+" }, // fonte: posts/Sebrae ("+25 MW") — confirmar [PREENCHER]
];

// ------------------------------------------------------------ 9. cta-final
// fonte: frase de posicionamento + fechamento do site atual (CtaFinal usa os defaults)
export const CTA_FINAL = {
  eyebrow: "ORÇAMENTO GRATUITO",
} as const;
