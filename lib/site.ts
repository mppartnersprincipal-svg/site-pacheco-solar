/**
 * Dados oficiais da Pacheco Solar — ÚNICA fonte de verdade para contato,
 * endereço e identidade. Fontes: briefing 360º (jun/2025) e CLAUDE.md do
 * cliente (set/2026). Nada aqui pode ser alterado sem confirmação do Pedro.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://pachecosolar.com.br";

export const SITE = {
  nome: "Pacheco Solar",
  razaoSocial: "Pacheco Solar Indústria e Comércio",
  cnpj: "42.329.007/0001-70",
  /** Telefone e WhatsApp oficiais (o mesmo número atende ligação e WhatsApp). */
  telefone: {
    display: "(62) 4101-8101",
    e164: "+556241018101",
    /** Formato usado em wa.me (sem "+") */
    wa: "556241018101",
  },
  email: "adm@pachecosolar.com.br",
  instagram: {
    handle: "@solar.pacheco",
    url: "https://www.instagram.com/solar.pacheco/",
  },
  endereco: {
    logradouro: "R. Monsenhor Celso, Quadra 72, Lote 08",
    bairro: "Vila Santa",
    cidade: "Aparecida de Goiânia",
    uf: "GO",
    cep: "74912-590",
    /** Linha única para footer/contato */
    completo:
      "R. Monsenhor Celso, Quadra 72, Lote 08, Vila Santa, Aparecida de Goiânia/GO, CEP 74912-590",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=R.+Monsenhor+Celso+Quadra+72+Lote+08+Vila+Santa+Aparecida+de+Goi%C3%A2nia+GO+74912-590",
  },
  /** Briefing: "Horário de Funcionamento: Horário Comercial" (horas exatas: [PREENCHER]) */
  horario: "Atendimento em horário comercial",
  /** Descrição institucional (briefing + site atual), usada em metadata e Schema.org */
  descricao:
    "Indústria de estruturas metálicas para sistemas fotovoltaicos em Aparecida de Goiânia/GO: estruturas para usinas de solo, Linha Titan para telhado, kits completos, itens avulsos e Vedacap. Pronta entrega na maior parte do tempo, engenharia própria, suporte técnico do pré ao pós-venda e entrega em todo o Brasil.",
  fundador: "Lucas Pacheco",
} as const;

/** Rotas públicas (ordem do menu). */
export const ROTAS = {
  home: "/",
  solo: "/estruturas-de-solo",
  telhado: "/estruturas-para-telhado",
  kits: "/kits-e-itens-avulsos",
  vedacap: "/vedacap",
  obras: "/obras",
  sobre: "/sobre",
  contato: "/contato",
  privacidade: "/politica-de-privacidade",
} as const;

export const NAV_LINKS = [
  { label: "Solo", href: ROTAS.solo },
  { label: "Telhado", href: ROTAS.telhado },
  { label: "Kits e avulsos", href: ROTAS.kits },
  { label: "Vedacap", href: ROTAS.vedacap, badge: "Novo" },
  { label: "Obras", href: ROTAS.obras },
  { label: "Sobre", href: ROTAS.sobre },
  { label: "Contato", href: ROTAS.contato },
] as const;

export const FOOTER_LINKS = [
  { label: "Início", href: ROTAS.home },
  { label: "Estruturas de solo", href: ROTAS.solo },
  { label: "Estruturas para telhado — Linha Titan", href: ROTAS.telhado },
  { label: "Kits completos e itens avulsos", href: ROTAS.kits },
  { label: "Vedacap", href: ROTAS.vedacap },
  { label: "Obras realizadas", href: ROTAS.obras },
  { label: "Sobre a Pacheco Solar", href: ROTAS.sobre },
  { label: "Contato", href: ROTAS.contato },
] as const;
