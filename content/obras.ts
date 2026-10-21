/**
 * Copy da página /obras. Os componentes SÓ renderizam o que está aqui.
 * Fontes: siteAtual (depoimentos, "Clientes Satisfeitos em Todo o Brasil",
 * fechamento), claudeMd (ganchos e frases de posicionamento), plano (blueprint
 * de /obras), lib/obras.ts (fotos, antes/depois, sequência, depoimentos).
 * Nome do cliente e cidade da obra em destaque só com FLAGS.citarObraCocalinho.
 */
import type { MediaKey } from "@/lib/media";
import type { FiltroObra } from "@/lib/obras";
import { FLAGS } from "@/config/feature-flags";
import { ROTAS } from "@/lib/site";

/** Hero — fonte: plano (h1), claudeMd (frase de posicionamento), plano (sub). */
export const HERO_OBRAS = {
  eyebrow: "OBRAS REALIZADAS · USINAS DE SOLO E FAZENDAS",
  titulo: "Obras realizadas",
  subtitulo: "Mais obra entregue, menos dor de cabeça. Estruturas de solo em usinas e fazendas pelo Brasil.",
  placas: ["Solo Linear", "Solo Dupla", "Fazenda", "Entrega em todo o Brasil"],
  imagem: "obras-cocalinho/cocalinho-285cf49e" as MediaKey,
  imagemAlt: "Usina de solo em pasto com fileiras de módulos fotovoltaicos",
  cta: "Quero uma estrutura como essa",
  linkSolo: { label: "Ver estruturas de solo", href: ROTAS.solo },
} as const;

/** Galeria — fonte: gancho validado (claudeMd), plano (estrutura-em-campo); filtros do plano. "Telhado" só com FLAGS.filtroTelhadoObras. */
export const GALERIA_OBRAS = {
  eyebrow: "GALERIA",
  titulo: "Resistência não é peso, é engenharia.",
  subtitulo: "Estruturas de solo linear e dupla montadas em usinas e fazendas pelo Brasil.",
  filtros: [
    { id: "todas", label: "Todas" },
    { id: "solo-dupla", label: "Solo Dupla" },
    { id: "solo-linear", label: "Solo Linear" },
    { id: "fazenda", label: "Fazenda" },
    ...(FLAGS.filtroTelhadoObras ? [{ id: "telhado" as const, label: "Telhado" }] : []),
  ] as Array<{ id: FiltroObra; label: string }>,
  notaLegendas: FLAGS.legendasComLocal ? null : "Legendas TIPO · LOCAL · ANO — cidade/UF e ano de cada obra: [PREENCHER]",
  rotuloFiltros: "Filtrar obras",
  rotuloLista: "Fotos das obras",
  lightbox: { fechar: "Fechar", anterior: "Foto anterior", proxima: "Próxima foto", rotulo: "Foto da obra ampliada" },
} as const;

/** Caso em destaque — fonte: lib/obras.ts (par antes/depois e sequência), plano. Nunca citar cliente/cidade sem autorização. */
export const CASO_COCALINHO = {
  eyebrow: "CASO EM DESTAQUE",
  titulo: "Da estaca ao módulo.",
  subtitulo: "Estrutura de solo montada em fazenda: estacas cravadas, perfis e módulos fixados.", // fonte: legendas das fotos (lib/obras.ts)
  legenda: FLAGS.citarObraCocalinho
    ? "Obra em fazenda [PREENCHER cidade/UF, cliente e potência]"
    : "Obra em fazenda [PREENCHER cidade/UF, cliente e potência — autorização]",
  sequenciaTitulo: "Sequência de montagem",
  cta: "Tenho uma obra parecida",
} as const;

/** Vídeos — fonte: plano (videos-obras), lib/media.ts (CLIPES). */
export const VIDEOS_OBRAS = {
  eyebrow: "VÍDEOS · SOLO DUPLA",
  titulo: "Estrutura em campo.",
  subtitulo: "Clipes reais de estrutura de solo dupla montada em usina.", // fonte: legendas de lib/media.ts
  notaLocal: FLAGS.legendasComLocal ? null : "Cidade/UF dos clipes: [PREENCHER]",
} as const;

/** Depoimentos — fonte: siteAtual (título da seção literal; textos em lib/obras.ts). */
export const DEPOIMENTOS_OBRAS = {
  eyebrow: "CLIENTES SATISFEITOS EM TODO O BRASIL",
  titulo: "Mais obra entregue, menos dor de cabeça.",
  nota: "Pareamento nome ↔ depoimento inferido pela ordem do site atual: [PREENCHER confirmar]",
  parceirosTitulo: "Parceiros",
  parceirosNota: "Logos dos parceiros: [PREENCHER arquivos]",
} as const;

/** CTA final — fonte: gancho validado (claudeMd) + fechamento do siteAtual. */
export const CTA_FINAL_OBRAS = {
  titulo: "Enquanto outros atrasam, você entrega.",
  subtitulo:
    "Garanta o fechamento de mais obras, oferecendo diferenciais e qualidade para seus clientes. Conte com a Pacheco Solar como sua aliada.",
  rotulo: "Quero uma estrutura como essa",
  ctaId: "cta-final-obras",
} as const;

/** Metadata — composição só com frases permitidas (plano + siteAtual). */
export const META_OBRAS = {
  title: "Obras realizadas",
  description:
    "Obras realizadas pela Pacheco Solar: estruturas de solo linear e dupla montadas em usinas e fazendas pelo Brasil. Fotos, vídeos e depoimentos de clientes.",
} as const;
