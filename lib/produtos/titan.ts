/**
 * Linha Titan — estrutura para telhado ("Estruturas Tecnológicas").
 * FONTES: manuais de instalação Linha Titan (fibrocimento e telhado metálico),
 * renders 3D do acervo, briefing para Claude (materiais) e ELEMENTOS.pdf.
 * REGRA: não afirmar "fabricamos" (fabricação própria de telhado: [PREENCHER]).
 * Dados numéricos só os dos manuais; nada calculado.
 */
import type { MediaKey } from "@/lib/media";

export type TipoTelhado = "ceramico" | "fibrocimento" | "metalico";

export type ComponenteTitan = {
  nome: string;
  /** Quantidade no layout de 4 módulos do Projeto Executivo (quando o manual informa) */
  qtdLayout4?: number;
  /** Divergência documentada entre páginas do manual */
  nota?: string;
  material?: string;
};

export type VarianteTitan = {
  id: TipoTelhado;
  slug: string;
  nome: string;
  nomeCurto: string;
  /** Linha do site atual/briefing que descreve a aplicação */
  descricao: string;
  componentes: ComponenteTitan[];
  renderGeral: MediaKey;
  renderClose: MediaKey;
  manualPdf?: { href: string; label: string };
  /** Mensagem do WhatsApp (chave de lib/whatsapp.ts) */
  linha: "telhado-ceramico" | "telhado-fibrocimento" | "telhado-metalico";
  /** Regras de fixação literais do manual */
  regras: string[];
  temManual: boolean;
};

export const TITAN = {
  nome: "Linha Titan",
  eyebrow: "LINHA TITAN · ESTRUTURAS TECNOLÓGICAS",
  /** Site atual */
  frase: "Soluções adaptáveis para telhados residenciais e comerciais.",
  /** Briefing para Claude — materiais citados (escopados à Linha Titan) */
  materiais: [
    { nome: "Alumínio estrutural 6005", fonte: "briefing" },
    { nome: "Parafusos em aço inox", fonte: "briefing" },
    { nome: "Mini trilhos com ventilação", fonte: "briefing" },
  ],
  /** Manual: torque de aperto */
  torque: [
    { parafuso: "Parafuso M10", valor: "3 daN.m" },
    { parafuso: "Parafuso M8", valor: "0,82 daN.m" },
  ],
  /** Manual: distância entre apoios por isopleta de vento (NBR-6123) — só a tabela, nunca o mapa */
  isopleta: [
    { faixa: "45–50 m/s", velocidadeMin: 45, velocidadeMax: 50, distanciaM: 1.3 },
    { faixa: "40–45 m/s", velocidadeMin: 40, velocidadeMax: 45, distanciaM: 1.4 },
    { faixa: "35–40 m/s", velocidadeMin: 35, velocidadeMax: 40, distanciaM: 1.5 },
    { faixa: "30–35 m/s", velocidadeMin: 30, velocidadeMax: 35, distanciaM: 1.6 },
  ],
  isopletaNota:
    "Para locais onde não seja possível manter a distância entre apoios recomendada pelo manual do módulo, pode-se adotar as distâncias acima, conforme a isopleta de vento (NBR-6123) em que o local de instalação se enquadra.",
  /** Manual: ferramentas e cuidados */
  ferramentas: ["Parafusadeira", "Bits para porca M8 e M4", "Chave para parafuso sextavado M8", "Chave para parafuso sextavado M10"],
  cuidados: [
    "Verificar o correto esquadrejamento da estrutura.",
    "Ao final da instalação, fazer a inspeção visual para validar se todos os elementos estão fixados de forma correta.",
    "Antes de iniciar qualquer fixação, verifique no manual de instalação do módulo quais as distâncias de apoio recomendadas.",
  ],
  /** Manual: passo a passo (3 etapas) */
  passos: [
    {
      titulo: "Fixando a estrutura",
      fibrocimento: [
        "Realize o pré-furo na telha e na estrutura de madeira utilizando uma broca de 7 mm.",
        "Introduza a haste estrutural no furo e fixe-a firmemente.",
        "Utilize o sistema de regulagem da própria haste para ajustar as alturas e distâncias conforme necessário.",
        "Posicione o perfil de alumínio e prenda-o ao suporte com o parafuso T M8, inserido pela abertura lateral do perfil.",
      ],
      metalico: [
        "Instale a espuma EPDM de vedação entre o trilho e a telha nos pontos onde a telha será perfurada.",
        "Perfure o trilho e a telha com os parafusos autobrocantes, fixando os mini trilhos com no mínimo 4 parafusos.",
        "Continue a fixação dos mini-trilhos seguindo o alinhamento dos dois primeiros de referência até obter o tamanho da fileira desejada.",
      ],
    },
    {
      titulo: "Fixando os módulos",
      todos: [
        "Posicione o módulo sobre os perfis de alumínio.",
        "Inicie a fixação pela lateral do módulo utilizando os grampos finais.",
        "Posicione o próximo módulo e prenda-o com o grampo intermediário.",
        "Após concluir a instalação de todos os módulos ao longo do trilho, finalize a fixação com o grampo final na outra extremidade da fileira.",
      ],
    },
    {
      titulo: "Emendas e microinversor",
      fibrocimento: [
        "Insira a emenda na gaveta lateral do perfil.",
        "Utilize dois parafusos autobrocantes para fazer a fixação da emenda.",
        "Insira a continuação do perfil e atarraxe mais dois parafusos no outro perfil para completar a instalação da emenda.",
      ],
      metalico: [
        "Kit para fixar o microinversor vendido separadamente.",
        "Faça a fixação das chapas retas nos mini trilhos utilizando os parafusos martelo M8.",
        "Do outro lado, conecte o microinversor junto às chapas retas com parafuso martelo M8.",
        "Deixe o microinversor posicionado abaixo do módulo para garantir uma melhor proteção; posicione a parte inferior do micro apoiada ao telhado para melhorar sua sustentação.",
      ],
    },
  ],
} as const;

export const VARIANTES_TITAN: VarianteTitan[] = [
  {
    id: "ceramico",
    slug: "ceramico",
    nome: "Telhado cerâmico",
    nomeCurto: "Cerâmico",
    descricao: "Perfil de alumínio, haste estrutural e grampos — sem manual publicado no acervo.",
    componentes: [
      { nome: "Perfil de alumínio" },
      { nome: "Haste estrutural" },
      { nome: "Grampo intermediário" },
      { nome: "Grampo final" },
    ],
    renderGeral: "telhado/titan-ceramico-vista-geral",
    renderClose: "telhado/titan-ceramico-grampo-close",
    linha: "telhado-ceramico",
    regras: ["Quantidades por layout e manual do cerâmico: [PREENCHER]"],
    temManual: false,
  },
  {
    id: "fibrocimento",
    slug: "fibrocimento",
    nome: "Telhado de fibrocimento",
    nomeCurto: "Fibrocimento",
    descricao: "Perfil Titan, Chapa L, haste estrutural inox, parafuso martelo e grampos final e intermediário.",
    componentes: [
      { nome: "Perfil Titan", qtdLayout4: 2, material: "alumínio" },
      { nome: "Haste estrutural (completa)", qtdLayout4: 8, material: "inox" },
      { nome: "Chapa L", material: "inox", nota: "Página Componentes do manual: 8 unidades" },
      { nome: "Parafuso martelo", nota: "Página Componentes do manual: 8 unidades" },
      {
        nome: "Grampo intermediário",
        qtdLayout4: 6,
        nota: "[PREENCHER: conciliar 6 ou 8 — o Projeto Executivo lista 6 e a página Componentes lista 8]",
      },
      { nome: "Grampo final", qtdLayout4: 4 },
    ],
    renderGeral: "telhado/titan-fibrocimento-vista-geral",
    renderClose: "telhado/titan-fibrocimento-close",
    manualPdf: { href: "/manuais/manual-titan-fibrocimento.pdf", label: "Manual Linha Titan — fibrocimento (PDF)" },
    linha: "telhado-fibrocimento",
    regras: ["Obrigatório a utilização de 4 hastes estruturais (fixadores) para cada perfil de 4800 mm."],
    temManual: true,
  },
  {
    id: "metalico",
    slug: "metalico",
    nome: "Telhado metálico (mini-trilho alto)",
    nomeCurto: "Metálico",
    descricao: "Mini trilho, espuma EPDM de vedação, parafuso brocante inox e grampos final e intermediário.",
    componentes: [
      { nome: "Mini-trilho (alto)", qtdLayout4: 10, material: "alumínio" },
      { nome: "Parafuso brocante", qtdLayout4: 40, material: "inox" },
      { nome: "Espuma EPDM de vedação", qtdLayout4: 1 },
      {
        nome: "Grampo intermediário",
        qtdLayout4: 6,
        nota: "[PREENCHER: conciliar 6 ou 8 — o Projeto Executivo lista 6 e a página Componentes lista 8]",
      },
      { nome: "Grampo final", qtdLayout4: 4 },
    ],
    renderGeral: "telhado/titan-metalico-vista-geral",
    renderClose: "telhado/titan-metalico-minitrilho-close",
    manualPdf: { href: "/manuais/manual-titan-telhado-metalico.pdf", label: "Manual Linha Titan — telhado metálico (PDF)" },
    linha: "telhado-metalico",
    regras: [
      "Fixar os mini trilhos com no mínimo 4 parafusos autobrocantes.",
      "A distância entre mini-trilhos e seus espaçamentos deve respeitar o manual de cada módulo solar.",
      "Kit para fixar o microinversor vendido separadamente.",
    ],
    temManual: true,
  },
];

export function varianteTitan(id: TipoTelhado): VarianteTitan {
  const v = VARIANTES_TITAN.find((x) => x.id === id);
  if (!v) throw new Error(`Variante Titan desconhecida: ${id}`);
  return v;
}
