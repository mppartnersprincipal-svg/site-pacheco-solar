/**
 * Obras realizadas e depoimentos.
 * FONTES: pastas do acervo (Obras Realizadas, Estrutura de solo, Estrutura de FAZENDA).
 * Classificação (Pedro, 10/11/2026; substitui a de 02/11): usina com brita (IMG_39xx) = SOLO DUPLA (pasta do Drive);
 * terra vermelha IMG_27xx (2711–2716) = SOLO DUPLA (pasta do Drive; Pedro, 10/11/2026: "se está como dupla no Drive ela é dupla");
 * estruturas sem módulos IMG_16xx (1638–1654, dois postes por mesa) = SOLO DUPLA; "Obra com estruturas Lineares" = SOLO LINEAR.
 * Depoimentos e parceiros vêm do site atual. Cidade/UF, cliente e ano de cada obra
 * só entram com autorização (config/feature-flags.ts).
 */
import type { MediaKey } from "@/lib/media";
import { FLAGS } from "@/config/feature-flags";

export type FiltroObra = "todas" | "solo-dupla" | "solo-linear" | "fazenda" | "telhado";

export type FotoObra = {
  key: MediaKey;
  alt: string;
  tipo: Exclude<FiltroObra, "todas">;
  /** Legenda de campo (TIPO · descrição) */
  legenda: string;
  retrato?: boolean;
};

export const FOTOS_OBRAS: FotoObra[] = [
  { key: "obras-fazenda-01/foto-285cf49e", alt: "Usina de solo em pasto com fileiras de módulos", tipo: "fazenda", legenda: "Usina de solo em fazenda" },
  { key: "obras-fazenda-01/foto-18b8ca3e", alt: "Estacas e perfis montados em fazenda", tipo: "fazenda", legenda: "Estrutura montada em fazenda", retrato: true },
  { key: "obras-fazenda-01/foto-546da35f", alt: "Módulos fixados na estrutura de solo", tipo: "fazenda", legenda: "Módulos fixados", retrato: true },
  { key: "obras-fazenda-01/foto-9cca7157", alt: "Fileira de módulos em usina de solo", tipo: "fazenda", legenda: "Fileira de módulos", retrato: true },
  { key: "obras-fazenda-01/foto-1bda315d", alt: "Vista da usina de solo em fazenda", tipo: "fazenda", legenda: "Usina de solo" },
  { key: "obras-fazenda-01/foto-f833c097", alt: "Detalhe da estrutura de solo em fazenda", tipo: "fazenda", legenda: "Detalhe da estrutura" },
  { key: "solo-dupla/img-2713", alt: "Estrutura de solo dupla com módulos fixados, em usina de terra vermelha", tipo: "solo-dupla", legenda: "Solo dupla · usina em terra vermelha", retrato: true },
  { key: "solo-dupla/img-3966", alt: "Perfis de aço e cabeamento sob os módulos da estrutura dupla", tipo: "solo-dupla", legenda: "Solo dupla · por baixo dos módulos", retrato: true },
  { key: "solo-dupla/img-3977", alt: "Estrutura de solo dupla com módulos fixados, em usina com brita", tipo: "solo-dupla", legenda: "Solo dupla · usina com brita", retrato: true },
  { key: "solo-dupla/img-2711", alt: "Fileiras de módulos em estrutura de solo dupla, em usina de terra vermelha", tipo: "solo-dupla", legenda: "Solo dupla · fileiras", retrato: true },
  { key: "solo-dupla/img-3963", alt: "Estrutura de solo dupla vista lateral", tipo: "solo-dupla", legenda: "Solo dupla · vista lateral", retrato: true },
  { key: "solo-dupla/img-1654", alt: "Estruturas de solo dupla montadas, ainda sem módulos, em terra vermelha", tipo: "solo-dupla", legenda: "Solo dupla · estruturas montadas", retrato: true },
  { key: "obras-lineares/card-1", alt: "Estacas cravadas e alinhadas para estrutura linear", tipo: "solo-linear", legenda: "Solo linear · estacas cravadas", retrato: true },
  { key: "obras-lineares/card-5", alt: "Fileiras de módulos em estrutura linear", tipo: "solo-linear", legenda: "Solo linear · fileiras prontas" },
  { key: "obras-lineares/card-2", alt: "Montagem da estrutura linear", tipo: "solo-linear", legenda: "Solo linear · montagem" },
  { key: "obras-lineares/card-3", alt: "Perfis da estrutura linear montados", tipo: "solo-linear", legenda: "Solo linear · perfis montados" },
  { key: "obras-lineares/card-4", alt: "Estrutura linear com módulos", tipo: "solo-linear", legenda: "Solo linear · módulos fixados" },
  { key: "solo-linear/linear-post-01", alt: "Estrutura de solo linear com céu azul", tipo: "solo-linear", legenda: "Solo linear · em campo", retrato: true },
  // fazenda-01/02 saíram (10/11/2026): são cópias das fotos 9cca7157 e 546da35f da Cocalinho e repetiam na galeria
  { key: "fazenda/fazenda-10", alt: "Mesa de módulos em estrutura de solo, em fazenda de terra vermelha", tipo: "fazenda", legenda: "Fazenda · módulos fixados" },
  { key: "fazenda/fazenda-04", alt: "Estrutura de solo montada sobre bases de concreto, ainda sem módulos", tipo: "fazenda", legenda: "Fazenda · estrutura montada" },
  { key: "fazenda/fazenda-03", alt: "Estrutura de solo montada em fazenda, ainda sem módulos", tipo: "fazenda", legenda: "Fazenda · estrutura" },
  { key: "obras-telhado/telhado-metalico", alt: "Linha Titan em telhado metálico, mini trilhos fixados antes dos módulos", tipo: "telhado", legenda: "Titan · telhado metálico", retrato: true },
  { key: "obras-telhado/telhado-ceramico", alt: "Linha Titan em telhado cerâmico, perfis fixados sobre as telhas", tipo: "telhado", legenda: "Titan · telhado cerâmico", retrato: true },
];

export interface ProjetoDestaque {
  /** Identificador estável (key do React e do tracking) */
  id: string;
  key: MediaKey;
  alt: string;
  /** Tipo de estrutura, sempre visível no card */
  estrutura: string;
  /** "Cidade · UF" — null esconde a linha (só com dado confirmado pelo cliente) */
  cidade: string | null;
  /** Quantidade de painéis do projeto — null esconde o número */
  paineis: number | null;
}

/**
 * Projetos da home (10/11/2026, pedido do Pedro): só as usinas grandes, um projeto por card,
 * com cidade, nº de painéis e tipo de estrutura. Cidade e nº de painéis ficam null até o
 * Lucas confirmar (regra nº 1: nunca inventar dado); o card esconde o que estiver null.
 */
export const PROJETOS_DESTAQUE: ProjetoDestaque[] = [
  {
    id: "cocalinho",
    key: "obras-fazenda-01/foto-980e700e",
    alt: "Vista aérea de usina solar de solo em fazenda, com mesas de módulos sobre estrutura Pacheco",
    estrutura: "Estrutura de solo",
    cidade: FLAGS.citarObraCocalinho ? "Cocalinho · MT" : null,
    paineis: null,
  },
  {
    id: "usina-brita",
    key: "solo-dupla/img-3981",
    alt: "Fileiras longas de módulos em estrutura de solo dupla, em usina com brita",
    estrutura: "Solo Dupla",
    cidade: null,
    paineis: null,
  },
  {
    id: "usina-eucaliptos",
    key: "obras-lineares/lineares-wa-07",
    alt: "Mesas de módulos em estrutura de solo linear, com eucaliptos ao fundo",
    estrutura: "Solo Linear",
    cidade: null,
    paineis: null,
  },
  {
    id: "usina-terra-vermelha",
    key: "solo-dupla/img-2711",
    alt: "Usina com estrutura de solo dupla, fileiras de módulos sobre terra vermelha",
    estrutura: "Solo Dupla",
    cidade: null,
    paineis: null,
  },
];

/** Par antes/depois (mesmo local, verificado no acervo) — obra em fazenda (pasta obras-fazenda-01; nome real só com FLAGS.citarObraCocalinho). */
export const ANTES_DEPOIS = {
  antes: { key: "obras-fazenda-01/foto-18b8ca3e" as MediaKey, alt: "Antes: estacas e perfis montados" },
  depois: { key: "obras-fazenda-01/foto-546da35f" as MediaKey, alt: "Depois: módulos fixados na estrutura" },
  legenda: "Da estaca ao módulo · projeto em fazenda",
};

/** Sequência de montagem (mesmo local, confirmar): estacas → perfis → módulos. */
export const SEQUENCIA_MONTAGEM = [
  { key: "obras-lineares/card-1" as MediaKey, alt: "Etapa 1: estacas cravadas e alinhadas", etapa: "Estacas cravadas" },
  { key: "obras-lineares/lineares-wa-01" as MediaKey, alt: "Etapa 2: perfis montados sobre as estacas", etapa: "Perfis montados" },
  { key: "obras-lineares/card-5" as MediaKey, alt: "Etapa 3: fileiras de módulos prontas", etapa: "Módulos fixados" },
];

/**
 * Avaliações REAIS do perfil da Pacheco Solar no Google (lidas em 10/11/2026, pedido do Pedro).
 * Só 5 estrelas, texto literal (sem corrigir o cliente), sem as que citam preço (regra do site)
 * e sem datas relativas ("há 8 meses" envelhece). Nota geral e total também conferidos no perfil.
 */
export const AVALIACOES_GOOGLE = {
  nota: "4,9",
  total: 41,
  /** Perfil da empresa no Google Maps (cid = 0xfc06b371234e634c) */
  url: "https://www.google.com/maps?cid=18160399845923119948",
  rotulo: "Avaliação no Google",
} as const;

export const DEPOIMENTOS = [
  {
    nome: "Marcus Gomes",
    texto:
      "A estrutura de fixação do sistema fotovoltaico adquirida apresentou excelente qualidade construtiva, com bom acabamento, alinhamento adequado. Os materiais demonstram ser resistentes e compatíveis com a aplicação, transmitindo segurança e confiabilidade quanto à durabilidade e desempenho estrutural. De modo geral, a estrutura atendeu plenamente às expectativas, evidenciando um padrão técnico satisfatório.",
    rotulo: AVALIACOES_GOOGLE.rotulo,
  },
  {
    nome: "Kayo Lucas",
    texto: "Atendimento impecável, produto de altíssima qualidade e compromisso com prazo de entrega. Estou muito satisfeito com o serviço prestado.",
    rotulo: AVALIACOES_GOOGLE.rotulo,
  },
  { nome: "Lucas Emanuel Graciano", texto: "Empresa extremamente séria e com materiais de ótima qualidade.", rotulo: AVALIACOES_GOOGLE.rotulo },
  { nome: "Cleyson Santos", texto: "Suporte nota 10 super satisfeito, pessoal oferece todo suporte entrega super rápida", rotulo: AVALIACOES_GOOGLE.rotulo },
  { nome: "Michell Pires", texto: "Material muito bom, atendimento diferenciado responde rápido o WhatsApp.", rotulo: AVALIACOES_GOOGLE.rotulo },
] as const;

/** Parceiros do site atual — faixa oculta por feature flag até ter as logos. */
export const PARCEIROS = ["PROWATT", "SN", "MC", "ORION"] as const;
