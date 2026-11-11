/**
 * Copy da página /estruturas-de-solo. Os componentes SÓ renderizam o que está
 * aqui; nada de frase nova dentro de components/solo. Cada bloco traz a fonte.
 * - siteAtual = pachecosolar.com.br (transcrição de 21/10/2026)
 * - briefing360 / briefingClaude = briefings do cliente
 * - claudeMd = CLAUDE.md do cliente (set/2026)
 * - plano = blueprint aprovado (plans/bom-dia-claude-seguinte-peppy-sunset.md)
 */
import type { MediaKey } from "@/lib/media";
import { SOLO } from "@/lib/produtos/catalogo";
import { ROTAS } from "@/lib/site";

/** Hero — fonte: siteAtual (frase e "Aço de qualidade premium…"), briefing360 (pronta entrega), plano. */
export const HERO_SOLO = {
  eyebrow: SOLO.eyebrow,
  titulo: SOLO.nome,
  subtitulo:
    "Estrutura metálica de solo fabricada pela Pacheco Solar: monoposte linear e dupla para usina fotovoltaica, fazenda e zona rural. Aço de qualidade premium, ideal para ambientes com atmosfera agressiva. Pronta entrega sob consulta.",
  placas: ["Pronta entrega sob consulta", "Solo Linear", "Solo Dupla", "Monoposte", "Entrega em todo o Brasil"],
  imagem: "solo-dupla/img-3961" as MediaKey,
  imagemAlt: "Estrutura de solo dupla vista por baixo dos módulos, com perfis de aço e brita",
  cta: "Pedir orçamento de solo no WhatsApp",
  linkObras: { label: "Ver projetos", href: ROTAS.obras },
} as const;

/** Variantes — fonte: acervo (fotos Solo Linear / Solo Dupla). */
export const VARIANTES_SOLO = {
  eyebrow: "CONFIGURAÇÕES · 02",
  titulo: "Estrutura de solo linear ou dupla para o layout da sua usina.",
  subtitulo: "Seja qual for o tipo de projeto, temos a estrutura certa, precisa e compatível com o seu layout.", // fonte: siteAtual (diferencial 04)
  rotuloTablist: "Configuração da estrutura de solo",
  rotuloConfiguracao: "Configuração",
  legendaFoto: "Usina de solo",
  placas: ["Pronta entrega sob consulta", "Entrega em todo o Brasil"], // fonte: briefing360 + siteAtual
  itens: SOLO.variantes.map((v) => ({
    id: v.id,
    nome: v.nome,
    descricao: v.descricao,
    imagem: v.imagem,
    imagemAlt: v.imagemAlt,
    linha: v.linha,
    cta: `Orçamento de ${v.nome}`,
  })),
} as const;

/** Componentes — fonte: SOLO.componentes (acervo); frase dos avulsos: plano. */
export const COMPONENTES_SOLO = {
  eyebrow: "COMPONENTES · ITENS AVULSOS",
  titulo: "Da indústria para sua obra: cada peça com nome.",
  subtitulo: "Precisa só da peça? Vendemos itens avulsos.", // fonte: plano (componentes-solo)
  foto: "solo-dupla/img-3966" as MediaKey,
  fotoAlt: "Perfis de aço e cabeamento sob os módulos de uma estrutura de solo dupla",
  /**
   * Posições aproximadas (% da foto).
   * `avulso` = true só para peças da lista oficial (ITENS_AVULSOS: clipe de fixação e grampos);
   * perfil e estaca são componentes da estrutura e nunca abrem a mensagem de item avulso.
   */
  pins: [
    { numero: "01", nome: SOLO.componentes[0], x: 50, y: 42, avulso: false },
    { numero: "02", nome: SOLO.componentes[1], x: 30, y: 30, avulso: true },
    { numero: "03", nome: SOLO.componentes[2], x: 68, y: 26, avulso: true },
    { numero: "04", nome: SOLO.componentes[3], x: 46, y: 80, avulso: false },
  ],
  nota: "Toque em cada ponto para ver a peça.",
  rotuloLista: "Componentes da estrutura de solo",
  rotuloComponente: "Componente",
  ctaItem: "Pedir este item",
  /** Peças que não são avulsas: CTA de orçamento da estrutura (linha "solo") */
  ctaEstrutura: "Orçamento da estrutura de solo",
  notaEstrutura: "Componente da estrutura",
  linkAvulsos: { label: "Ver todos os itens avulsos", href: `${ROTAS.kits}#itens-avulsos` },
} as const;

/** Ambiente agressivo — fonte: gancho validado (claudeMd), SOLO.ambienteAgressivo (siteAtual), briefingClaude (dores/pilares). */
export const AMBIENTE_AGRESSIVO = {
  eyebrow: "ZONAS RURAIS · AGRO",
  titulo: "Estrutura barata sai caro.",
  subtitulo: SOLO.ambienteAgressivo,
  bullets: [
    { titulo: "Fazendas com amônia e agrotóxico", texto: "Ambientes agressivos são uma das dores do integrador em obra rural." }, // fonte: briefingClaude (dores da persona)
    { titulo: "Aço de qualidade premium", texto: "Aço de qualidade premium, ideal para ambientes com atmosfera agressiva e zonas rurais." }, // fonte: siteAtual (diferencial 03) — materiais 6005/inox são só da Linha Titan
    { titulo: "Engenharia própria e suporte técnico", texto: "Fale com quem entende: suporte direto da nossa equipe de engenharia, do pré ao pós-venda." }, // fonte: siteAtual (diferencial 05)
  ],
  fotos: [
    // fazenda-01/02 trocadas (10/11/2026): eram cópias de fotos da Cocalinho que já aparecem em "Solo em campo" nesta página
    { key: "fazenda/fazenda-03" as MediaKey, alt: "Estrutura de solo montada em fazenda, ainda sem módulos", legenda: "Fazenda · estrutura de solo" },
    { key: "fazenda/fazenda-08" as MediaKey, alt: "Mesa de módulos em estrutura de solo, em fazenda de terra vermelha", legenda: "Fazenda · módulos fixados" },
    { key: "fazenda/fazenda-05" as MediaKey, alt: "Detalhe dos perfis de aço da estrutura de solo sobre base de concreto", legenda: "Fazenda · detalhe da estrutura" },
  ],
  cta: "Tenho obra em fazenda",
} as const;

/** Solo em campo — fonte: gancho validado (claudeMd), plano (estrutura-em-campo), FLAGS.citarObraCocalinho. */
export const SOLO_EM_CAMPO = {
  eyebrow: "PROVA DE CAMPO",
  titulo: "Enquanto outros atrasam, você entrega.",
  subtitulo: "Estruturas de solo linear e dupla montadas em usinas e fazendas pelo Brasil.",
  linkObras: { label: "Ver projetos atendidos", href: ROTAS.obras },
  cta: "Pedir orçamento de solo",
} as const;

/** Como pedir — fonte: lib/whatsapp.ts (campos da mensagem), briefing360 (processo de compra). */
export const COMO_PEDIR = {
  eyebrow: "ORÇAMENTO PELO WHATSAPP",
  titulo: "Para agilizar seu orçamento, mande junto:",
  checklist: ["Quantidade e modelo dos módulos", "Configuração: linear ou dupla", "Cidade/UF da obra", "Layout ou projeto, se houver"],
  processoTitulo: "Do orçamento à expedição, sem burocracia.", // fonte: plano (como-funciona)
  cta: "Enviar dados pelo WhatsApp",
} as const;

/** FAQ — fonte: lib/faq.ts (FAQ_SOLO); título do plano (objecoes). */
export const FAQ_SOLO_HEADING = {
  eyebrow: "FAQ · SOLO",
  titulo: "O que todo integrador pergunta antes de fechar.",
} as const;

/** CTA final — fonte: frase de posicionamento (claudeMd) + SITE.descricao. */
export const CTA_FINAL_SOLO = {
  titulo: "Seu projeto começa na estrutura certa.",
  subtitulo:
    "Estrutura para usina de solo com pronta entrega sob consulta, engenharia própria e entrega em todo o Brasil.",
  rotulo: "Pedir orçamento de solo no WhatsApp",
  ctaId: "cta-final-solo",
} as const;

/** Metadata — fonte: siteAtual + briefing360 (composição só com frases permitidas). */
export const META_SOLO = {
  title: "Estrutura de Solo para Placa Solar: Linear e Dupla",
  description:
    "Estrutura de solo para placa solar e usina fotovoltaica: monoposte linear (uma fileira) e dupla (duas fileiras). Aço de qualidade premium para fazendas e ambientes agressivos. Fabricante em Goiânia, pronta entrega sob consulta e entrega em todo o Brasil.",
} as const;
