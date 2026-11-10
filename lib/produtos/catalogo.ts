/**
 * Catálogo das linhas de produto, itens avulsos, kits e Vedacap.
 * FONTES: briefing 360º (produtos principais), briefing para Claude (linhas),
 * site atual (frases), ELEMENTOS.pdf, CLAUDE.md do cliente (Vedacap, avulsos),
 * roteiros VEDACAP (3 versões, aplicação).
 * REGRAS: itens avulsos só os da lista oficial; nenhum preço; nenhum número inventado.
 */
import type { MediaKey } from "@/lib/media";
import type { Linha } from "@/lib/whatsapp";
import { ROTAS } from "@/lib/site";

export type LinhaProduto = {
  id: "solo" | "telhado" | "kits" | "avulsos" | "vedacap";
  numero: string;
  nome: string;
  nomeCurto: string;
  /** Frase literal do site atual (ou da ficha, quando o site não tem) */
  frase: string;
  fonte: string;
  chips: string[];
  href: string;
  imagem: MediaKey;
  imagemAlt: string;
  linha: Linha;
  novo?: boolean;
};

export const LINHAS: LinhaProduto[] = [
  {
    id: "solo",
    numero: "01",
    nome: "Estrutura de Solo para Placa Solar",
    nomeCurto: "Solo",
    frase: "Suporte seguro e eficiente para grandes Projetos",
    fonte: "site atual",
    chips: ["Solo Linear", "Solo Dupla", "Zonas rurais"],
    href: ROTAS.solo,
    imagem: "solo-dupla/img-3961",
    imagemAlt: "Estrutura de solo dupla vista por baixo dos módulos, com perfis de aço e brita",
    linha: "solo",
  },
  {
    id: "telhado",
    numero: "02",
    nome: "Estrutura para Telhado — Linha Titan",
    nomeCurto: "Telhado",
    frase: "Soluções adaptáveis para telhados residenciais e comerciais",
    fonte: "site atual",
    chips: ["Cerâmico", "Fibrocimento", "Metálico"],
    href: ROTAS.telhado,
    imagem: "telhado/titan-metalico-modulo-transparente",
    imagemAlt: "Render da Linha Titan em telhado metálico com módulos transparentes mostrando os mini trilhos",
    linha: "telhado",
  },
  {
    id: "kits",
    numero: "03",
    nome: "Kits Completos",
    nomeCurto: "Kits",
    frase: "Tudo em um só fornecedor",
    fonte: "briefing para Claude (centralização de compras)",
    chips: ["Estrutura + fixação", "Menos fornecedores"],
    href: ROTAS.kits,
    imagem: "telhado/titan-grampo-intermediario",
    imagemAlt: "Render de grampo intermediário fixando módulos no perfil da Linha Titan",
    linha: "kit",
  },
  {
    id: "avulsos",
    numero: "04",
    nome: "Itens Avulsos",
    nomeCurto: "Avulsos",
    frase: "Placas de identificação, parafusos, grampos e muito mais.",
    fonte: "site atual",
    chips: ["Grampos", "Hastes", "Mini trilhos", "Suporte L", "Placas"],
    href: `${ROTAS.kits}#itens-avulsos`,
    // clamps-01 (clipe de solo) saiu: clipe não é mais item avulso (lista do Pedro, 10/11/2026)
    imagem: "telhado/titan-grampo-intermediario",
    imagemAlt: "Grampo intermediário fixando dois módulos no perfil",
    linha: "avulso",
  },
  {
    id: "vedacap",
    numero: "05",
    nome: "Vedacap",
    nomeCurto: "Vedacap",
    frase: "A goteira não vem da telha. Vem do parafuso.",
    fonte: "roteiros Vedacap",
    chips: ["Aluzinco natural", "Branco", "Preto"],
    href: ROTAS.vedacap,
    imagem: "logos/vedacap-branco",
    imagemAlt: "Logo do Vedacap",
    linha: "vedacap",
    novo: true,
  },
];

/**
 * Cards da home (22/10/2026): 3 linhas — kits e avulsos viram um card só, como na
 * página /kits-e-itens-avulsos; o Vedacap entra como faixa "Novo" abaixo dos cards.
 */
export type LinhaHome = {
  id: "solo" | "telhado" | "kits";
  numero: string;
  nome: string;
  frase: string;
  href: string;
  imagem: MediaKey;
  imagemAlt: string;
};

export const LINHAS_HOME: LinhaHome[] = [
  {
    id: "solo",
    numero: "01",
    nome: "Estrutura de Solo",
    frase: "Estrutura de solo para placa solar, monoposte linear ou dupla, para usinas e fazendas.",
    href: ROTAS.solo,
    imagem: "solo-dupla/img-3961",
    imagemAlt: "Estrutura de solo dupla vista por baixo dos módulos, com perfis de aço e brita",
  },
  {
    id: "telhado",
    numero: "02",
    nome: "Telhado — Linha Titan",
    frase: "Estrutura para painel solar em telhado cerâmico, fibrocimento e metálico, com mini trilho.",
    href: ROTAS.telhado,
    imagem: "obras-telhado/telhado-metalico",
    imagemAlt: "Linha Titan instalada em telhado metálico, com mini trilhos fixados antes dos módulos",
  },
  {
    id: "kits",
    numero: "03",
    nome: "Kits e Itens Avulsos",
    frase: "Kit de fixação para placa solar e itens avulsos em um só fornecedor.",
    href: ROTAS.kits,
    imagem: "solo-dupla/clamps-01",
    imagemAlt: "Clipe de fixação e grampo sob módulo em estrutura de solo",
  },
];

export type ItemAvulso = {
  slug: string;
  nome: string;
  uso: "telhado" | "solo" | "ambos";
  imagem?: MediaKey;
  imagemAlt?: string;
  /** Observação de fidelidade quando a imagem é um recorte de render e não foto do item */
  nota?: string;
  /** true = a imagem é uma logo (centralizada com respiro, sem recorte) */
  logo?: boolean;
};

/**
 * Lista OFICIAL de itens avulsos, na ordem passada pelo Pedro (10/11/2026). Nada além destes.
 * Imagem só quando um render mostra a própria peça em destaque; sem imagem, o card mostra o ícone.
 * Fotos individuais das peças ainda não existem no acervo nem no Drive.
 */
export const ITENS_AVULSOS: ItemAvulso[] = [
  { slug: "parafuso-martelo", nome: "Parafuso martelo", uso: "telhado" },
  { slug: "haste-metal", nome: "Haste metal", uso: "telhado" },
  { slug: "haste-madeira", nome: "Haste madeira", uso: "telhado", imagem: "telhado/titan-fibrocimento-close", imagemAlt: "Haste atravessando a telha de fibrocimento até a terça de madeira" },
  { slug: "mini-trilho-baixo", nome: "Mini trilho baixo", uso: "telhado" },
  { slug: "mini-trilho-alto", nome: "Mini trilho alto", uso: "telhado", imagem: "telhado/titan-metalico-minitrilho-close", imagemAlt: "Mini trilho alto fixado na telha metálica" },
  { slug: "suporte-l", nome: "Suporte L", uso: "telhado", imagem: "telhado/titan-ceramico-grampo-close", imagemAlt: "Suporte L fixando o perfil sobre a telha cerâmica" },
  { slug: "grampo-intermediario", nome: "Grampo intermediário", uso: "ambos", imagem: "telhado/titan-grampo-intermediario", imagemAlt: "Grampo intermediário entre dois módulos" },
  { slug: "grampo-final", nome: "Grampo final", uso: "ambos" },
  { slug: "placa-de-identificacao", nome: "Placa de identificação", uso: "ambos" },
  { slug: "vedacap", nome: "Vedacap", uso: "telhado", imagem: "vedacap/vedacap-pecas", imagemAlt: "Peças do Vedacap em aluzinco sobre um painel solar" },
];

/** Vedacap — fatos dos roteiros/CLAUDE.md. */
export const VEDACAP = {
  nome: "Vedacap",
  eyebrow: "NOVO ITEM DA LINHA DE FIXAÇÃO PACHECO SOLAR",
  headline: "A goteira não vem da telha. Vem do parafuso.",
  definicao:
    "Capa em aluzinco que protege a cabeça do parafuso autobrocante e a arruela de vedação do sol e da chuva em telhado metálico.",
  argumentos: [
    { titulo: "Mesmo material da telha", texto: "Sem corrosão galvânica e com a mesma dilatação da telha metálica." },
    { titulo: "Aplicação simples com cola PU", texto: "Não adianta silicone, fita ou massa: todos são orgânicos, todos ressecam pelo mesmo motivo." },
    { titulo: "Indicado para telhados metálicos e estruturas solares", texto: "Protege a fixação que o integrador assinou na garantia." },
    // Oculto a pedido do Pedro (10/11/2026): "Custa menos de 1% do valor da obra" / "garantia de 25 anos" (sem fonte confirmada)
  ],
  problema: "A borracha de vedação do parafuso resseca em cerca de 10 anos. Ela racha, abre uma fresta e a chuva entra pelo furo.",
  versoes: [
    { id: "natural", nome: "Aluzinco natural", cor: "aluzinco natural" as const, swatch: "aluzinco" },
    { id: "branco", nome: "Branco", cor: "branco" as const, swatch: "bg-branco" },
    { id: "preto", nome: "Preto", cor: "preto" as const, swatch: "bg-preto border border-linha" },
  ],
  publicos: [
    { id: "integrador", nome: "Integrador solar", texto: "Toda instalação solar em telhado metálico usa parafuso autobrocante que perfura a telha. O Vedacap protege a cabeça do parafuso e a borracha de vedação — e a garantia que você assinou.", linha: "vedacap" as const },
    { id: "telhadista", nome: "Telhadista", texto: "Quando a borracha do parafuso abre, é você quem sobe no telhado de novo. O Vedacap protege essa borracha do sol: seu seguro contra retrabalho.", linha: "vedacap-telhadista" as const },
    { id: "lojista", nome: "Lojista de material de construção", texto: "Todo cliente que compra parafuso autobrocante para telhado metálico precisa de proteção. Tabela de atacado pelo WhatsApp.", linha: "vedacap-lojista" as const },
  ],
  prontaEntrega: "Vedacap com pronta entrega sob consulta.",
  passoAPasso: "Aplicação simples com cola PU, sem silicone, fita ou massa. O passo a passo completo é enviado pelo comercial no WhatsApp.",
} as const;

/** Estrutura de solo — fatos do briefing/CLAUDE.md e do acervo fotográfico. */
export const SOLO = {
  nome: "Estrutura de Solo para Placa Solar",
  eyebrow: "ESTRUTURA DE SOLO · MONOPOSTE LINEAR E DUPLA · USINAS E FAZENDAS",
  frase: "Suporte seguro e eficiente para grandes Projetos",
  variantes: [
    {
      id: "linear",
      nome: "Solo Linear",
      descricao: "Estrutura monoposte com uma fileira de módulos: suporte para placa solar no solo em áreas estreitas e propriedades rurais.",
      // Estrutura montada com módulos (pasta SOLO LINEAR do Drive); a anterior (linear-wa-01) só tinha estacas
      imagem: "solo-linear/linear-post-01" as MediaKey,
      imagemAlt: "Estrutura de solo linear monoposte montada, com os módulos fixados sobre o perfil de aço",
      linha: "solo-linear" as const,
    },
    {
      id: "dupla",
      nome: "Solo Dupla",
      descricao: "Duas fileiras de módulos por estrutura: estrutura de solo para usina solar de médio e grande porte, com melhor aproveitamento da área.",
      // Usina com brita (pasta SOLO DUPLA do Drive)
      imagem: "solo-dupla/img-3969" as MediaKey,
      imagemAlt: "Estrutura de solo dupla montada em usina com brita, mesa longa de módulos sobre os perfis de aço",
      linha: "solo-dupla" as const,
    },
  ],
  /** Componentes vistos nas fotos do acervo. */
  componentes: ["Perfil de aço", "Clipe de fixação de solo", "Grampo", "Estaca cravada"],
  ambienteAgressivo:
    "Aço de qualidade premium, ideal para ambientes com atmosfera agressiva e zonas rurais.",
} as const;
