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
    nome: "Estrutura para Usinas de Solo",
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
    frase: "Placas de Identificação, parafusos grampos e muito mais.",
    fonte: "site atual",
    chips: ["Grampos", "Parafusos", "Hastes", "Clipes", "Placas"],
    href: `${ROTAS.kits}#itens-avulsos`,
    imagem: "solo-dupla/clamps-01",
    imagemAlt: "Clipe de fixação e grampo sob módulo em estrutura de solo",
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

export type ItemAvulso = {
  slug: string;
  nome: string;
  uso: "telhado" | "solo" | "ambos";
  imagem?: MediaKey;
  imagemAlt?: string;
  /** Observação de fidelidade quando a imagem é um recorte de render e não foto do item */
  nota?: string;
};

/** Lista OFICIAL de itens avulsos (CLAUDE.md do cliente + briefing). Nada além destes. */
export const ITENS_AVULSOS: ItemAvulso[] = [
  { slug: "grampo-intermediario", nome: "Grampo intermediário", uso: "ambos", imagem: "telhado/titan-grampo-intermediario", imagemAlt: "Grampo intermediário entre dois módulos" },
  { slug: "grampo-final", nome: "Grampo final", uso: "ambos", imagem: "telhado/titan-ceramico-grampo-close", imagemAlt: "Grampo final na extremidade do módulo", nota: "recorte de render" },
  { slug: "parafuso-brocante-inox", nome: "Parafuso brocante inox", uso: "telhado", imagem: "telhado/titan-metalico-minitrilho-close", imagemAlt: "Mini trilho fixado com parafuso brocante", nota: "recorte de render" },
  { slug: "parafuso-martelo", nome: "Parafuso martelo", uso: "telhado", imagem: "telhado/titan-fibrocimento-close", imagemAlt: "Perfil Titan com parafuso martelo", nota: "recorte de render" },
  { slug: "haste-estrutural-inox", nome: "Haste estrutural inox", uso: "telhado", imagem: "telhado/titan-fibrocimento-close", imagemAlt: "Haste estrutural atravessando a telha de fibrocimento", nota: "recorte de render" },
  { slug: "clipe-de-fixacao", nome: "Clipe de fixação (solo)", uso: "solo", imagem: "solo-dupla/clamps-02", imagemAlt: "Clipe de fixação de solo sob o módulo" },
  { slug: "placas-de-identificacao", nome: "Placas de identificação e sinalização", uso: "ambos", nota: "[PREENCHER foto do item]" },
];

/** Vedacap — fatos dos roteiros/CLAUDE.md. Passo a passo oficial: [PREENCHER]. */
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
    { titulo: "Custa menos de 1% do valor da obra", texto: "E protege a garantia de 25 anos que o integrador assinou." },
  ],
  problema: "A borracha de vedação do parafuso resseca em cerca de 10 anos. Ela racha, abre uma fresta e a chuva entra pelo furo.",
  versoes: [
    { id: "natural", nome: "Aluzinco natural", cor: "aluzinco natural" as const, swatch: "aluzinco" },
    { id: "branco", nome: "Branco", cor: "branco" as const, swatch: "bg-branco" },
    { id: "preto", nome: "Preto", cor: "preto" as const, swatch: "bg-preto border border-linha" },
  ],
  publicos: [
    { id: "integrador", nome: "Integrador solar", texto: "Toda instalação solar em telhado metálico usa parafuso autobrocante que perfura a telha. O Vedacap protege a cabeça do parafuso e a borracha de vedação — e a garantia de 25 anos que você assinou.", linha: "vedacap" as const },
    { id: "telhadista", nome: "Telhadista", texto: "Quando a borracha do parafuso abre, é você quem sobe no telhado de novo. O Vedacap protege essa borracha do sol: seu seguro contra retrabalho.", linha: "vedacap-telhadista" as const },
    { id: "lojista", nome: "Lojista de material de construção", texto: "Todo cliente que compra parafuso autobrocante para telhado metálico precisa de proteção. Tabela de atacado pelo WhatsApp.", linha: "vedacap-lojista" as const },
  ],
  prontaEntrega: "Temos o Vedacap a pronta entrega.",
  passoAPasso: "[PREENCHER: passo a passo oficial de aplicação]",
} as const;

/** Estrutura de solo — fatos do briefing/CLAUDE.md e do acervo fotográfico. */
export const SOLO = {
  nome: "Estrutura para Usinas de Solo",
  eyebrow: "LINHA SOLO · SOLO LINEAR E SOLO DUPLA",
  frase: "Suporte seguro e eficiente para grandes Projetos",
  variantes: [
    {
      id: "linear",
      nome: "Solo Linear",
      descricao: "[PREENCHER: descrição técnica da configuração linear]",
      imagem: "solo-linear/linear-wa-01" as MediaKey,
      imagemAlt: "Estrutura de solo linear com módulos em pasto",
      linha: "solo-linear" as const,
    },
    {
      id: "dupla",
      nome: "Solo Dupla",
      descricao: "[PREENCHER: descrição técnica da configuração dupla]",
      imagem: "solo-dupla/img-2713" as MediaKey,
      imagemAlt: "Estrutura de solo dupla em usina com brita",
      linha: "solo-dupla" as const,
    },
  ],
  /** Componentes vistos nas fotos; nomes oficiais: [PREENCHER validação do Lucas] */
  componentes: ["Perfil de aço", "Clipe de fixação de solo", "Grampo", "Estaca cravada"],
  ambienteAgressivo:
    "Aço de qualidade premium, ideal para ambientes com atmosfera agressiva e zonas rurais.",
} as const;
