/**
 * Obras realizadas e depoimentos.
 * FONTES: pastas do acervo (Obras Realizadas, Estrutura de solo, Estrutura de FAZENDA)
 * e site atual (depoimentos, parceiros). Cidade/UF, cliente e ano de cada obra
 * só entram com autorização: [PREENCHER] (config/feature-flags.ts).
 */
import type { MediaKey } from "@/lib/media";

export type FiltroObra = "todas" | "solo-dupla" | "solo-linear" | "fazenda" | "telhado";

export type FotoObra = {
  key: MediaKey;
  alt: string;
  tipo: Exclude<FiltroObra, "todas">;
  /** Legenda de campo (TIPO · LOCAL · ANO) — local e ano [PREENCHER] */
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
  { key: "solo-dupla/img-2713", alt: "Estrutura de solo dupla em usina com brita", tipo: "solo-dupla", legenda: "Solo dupla · usina com brita", retrato: true },
  { key: "solo-dupla/img-3966", alt: "Perfis de aço e cabeamento sob os módulos", tipo: "solo-dupla", legenda: "Solo dupla · por baixo dos módulos", retrato: true },
  { key: "solo-dupla/img-3977", alt: "Estrutura de solo dupla com módulos fixados", tipo: "solo-dupla", legenda: "Solo dupla · módulos fixados", retrato: true },
  { key: "solo-dupla/img-2711", alt: "Fileiras duplas de módulos em usina", tipo: "solo-dupla", legenda: "Solo dupla · fileiras", retrato: true },
  { key: "solo-dupla/img-3963", alt: "Estrutura de solo dupla vista lateral", tipo: "solo-dupla", legenda: "Solo dupla · vista lateral", retrato: true },
  { key: "solo-dupla/img-1654", alt: "Usina de solo dupla com módulos fixados", tipo: "solo-dupla", legenda: "Solo dupla · usina", retrato: true },
  { key: "obras-lineares/card-1", alt: "Estacas cravadas e alinhadas para estrutura linear", tipo: "solo-linear", legenda: "Solo linear · estacas cravadas", retrato: true },
  { key: "obras-lineares/card-5", alt: "Fileiras de módulos em estrutura linear", tipo: "solo-linear", legenda: "Solo linear · fileiras prontas" },
  { key: "obras-lineares/card-2", alt: "Montagem da estrutura linear", tipo: "solo-linear", legenda: "Solo linear · montagem" },
  { key: "obras-lineares/card-3", alt: "Perfis da estrutura linear montados", tipo: "solo-linear", legenda: "Solo linear · perfis montados" },
  { key: "obras-lineares/card-4", alt: "Estrutura linear com módulos", tipo: "solo-linear", legenda: "Solo linear · módulos fixados" },
  { key: "solo-linear/linear-post-01", alt: "Estrutura de solo linear com céu azul", tipo: "solo-linear", legenda: "Solo linear · em campo", retrato: true },
  { key: "solo-linear/linear-wa-01", alt: "Estrutura de solo linear em pasto", tipo: "solo-linear", legenda: "Solo linear · pasto" },
  { key: "fazenda/fazenda-02", alt: "Perfis sendo montados em fazenda", tipo: "fazenda", legenda: "Fazenda · montagem dos perfis" },
  { key: "fazenda/fazenda-01", alt: "Estacas cravadas em fazenda", tipo: "fazenda", legenda: "Fazenda · estacas cravadas", retrato: true },
  { key: "fazenda/fazenda-03", alt: "Estrutura de solo em fazenda", tipo: "fazenda", legenda: "Fazenda · estrutura" },
];

/** Par antes/depois (mesmo local, verificado no acervo) — obra em fazenda (pasta obras-fazenda-01; nome real só com FLAGS.citarObraCocalinho). */
export const ANTES_DEPOIS = {
  antes: { key: "obras-fazenda-01/foto-18b8ca3e" as MediaKey, alt: "Antes: estacas e perfis montados" },
  depois: { key: "obras-fazenda-01/foto-546da35f" as MediaKey, alt: "Depois: módulos fixados na estrutura" },
  legenda: "Da estaca ao módulo · obra em fazenda [PREENCHER local]",
};

/** Sequência de montagem (mesmo local, confirmar): estacas → perfis → módulos. */
export const SEQUENCIA_MONTAGEM = [
  { key: "obras-lineares/card-1" as MediaKey, alt: "Etapa 1: estacas cravadas e alinhadas", etapa: "Estacas cravadas" },
  { key: "obras-lineares/lineares-wa-01" as MediaKey, alt: "Etapa 2: perfis montados sobre as estacas", etapa: "Perfis montados" },
  { key: "obras-lineares/card-5" as MediaKey, alt: "Etapa 3: fileiras de módulos prontas", etapa: "Módulos fixados" },
];

/** Depoimentos — textos LITERAIS do site atual (pachecosolar.com.br). Pareamento nome↔texto inferido pela ordem do site: [PREENCHER confirmar]. */
export const DEPOIMENTOS = [
  { nome: "Gustavo Soares", texto: "Escelente empresa, ótimos produtos, profissionais atenciosos, só tenho a agradecer pela atenção", rotulo: "Cliente" },
  { nome: "Michel Pires", texto: "Material muito bom, atendimento diferenciado responde rápido o Whatsapp", rotulo: "Cliente" },
  {
    nome: "Rhuan Rodrigues",
    texto: "Adquirimos as estruturas do solo e alta qualidade com a Pacheco e que proporcionam segurança e durabilidade em nossos projetos de Energia solar.",
    rotulo: "Cliente",
  },
  {
    nome: "Wtec Energia",
    texto:
      "Excelente empresa para quem procura agilidade, preço bom e atendimento com qualidade. Empresa super completa! Parabenizar o atendimento do Guilherme pelo suporte do começo até a entrega do produto",
    rotulo: "Cliente",
  },
  { nome: "Jose Ismar", texto: "Excelente atendimento. Material de excelente qualidade. Muito satisfeito com o atendimento de todos na empresa. Recomendo", rotulo: "Cliente" },
] as const;

/** Parceiros do site atual — logos [PREENCHER]; faixa oculta por feature flag até ter os arquivos. */
export const PARCEIROS = ["PROWATT", "SN", "MC", "ORION"] as const;
