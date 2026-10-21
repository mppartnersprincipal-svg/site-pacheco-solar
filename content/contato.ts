/**
 * Copy da página /contato. Canais só de lib/site.ts; mensagens só de
 * lib/whatsapp.ts; o que não existe fica marcado como pendência (PREENCHER).
 */
import { SITE } from "@/lib/site";
import type { Linha } from "@/lib/whatsapp";

export const CONTATO_META = {
  // fonte: blueprint (/contato) + lib/site.ts
  title: "Contato — fale com quem entende",
  description: `Orçamentos e suporte técnico pelo WhatsApp ${SITE.telefone.display}, em horário comercial. Atalhos por linha (solo, Linha Titan, kits, itens avulsos e Vedacap), endereço em Aparecida de Goiânia/GO e e-mail oficial.`,
};

export const CONTATO_HERO = {
  // fonte: blueprint (hero-contato) + lib/site.ts (horário, telefone)
  eyebrow: "Contato · Atendimento ao integrador",
  titulo: "Fale com quem entende",
  subtitulo: "Atendimento em horário comercial. Orçamentos e suporte técnico pelo WhatsApp.",
  ctaWhatsApp: `Chamar no WhatsApp ${SITE.telefone.display}`,
  ctaLigar: `Ligar ${SITE.telefone.display}`,
  rotuloEmail: "E-mail",
  rotuloInstagram: "Instagram",
  /** Só entra no ar com FLAGS.atendimentoPresencial = true (briefing360, a confirmar). */
  presencial: "Atendimento presencial [PREENCHER confirmar horário e agendamento]",
  qrLegenda: "Aponte a câmera do celular",
  qrTitulo: "WhatsApp pelo QR code",
};

export type Atalho = { linha: Linha; titulo: string; descricao: string };

/** 8 atalhos por linha — títulos do blueprint; descrições só com frases permitidas. */
export const CONTATO_ATALHOS: Atalho[] = [
  // fonte: blueprint (atalhos-por-linha) + site atual (soluções) + CLAUDE.md do cliente
  { linha: "solo", titulo: "Estrutura de solo", descricao: "Linear ou dupla · usinas e fazendas" },
  { linha: "telhado", titulo: "Linha Titan", descricao: "Telhado cerâmico, fibrocimento e metálico" },
  { linha: "kit", titulo: "Kit completo", descricao: "Estrutura e fixação no mesmo pedido" },
  { linha: "avulso", titulo: "Item avulso", descricao: "Grampos, parafusos, hastes, clipes e placas" },
  { linha: "vedacap", titulo: "Vedacap", descricao: "Aluzinco natural, branco e preto" },
  { linha: "vedacap-lojista", titulo: "Sou lojista", descricao: "Tabela de atacado só pelo WhatsApp" },
  { linha: "engenharia", titulo: "Dúvida técnica com a engenharia", descricao: "Engenharia própria, do pré ao pós-venda" },
  {
    linha: "pronta-entrega",
    titulo: "Confirmar pronta entrega",
    descricao: "Na maior parte do tempo temos pronta entrega. Consulte a disponibilidade.",
  },
];

export const CONTATO_ATALHOS_SECAO = {
  // fonte: blueprint (atalhos-por-linha)
  eyebrow: "Atalhos",
  titulo: "Atalhos por linha.",
  subtitulo: "Cada botão abre o WhatsApp com a mensagem da linha já preenchida: é só completar os campos.",
};

export const CONTATO_ENDERECO = {
  // fonte: blueprint (endereco-mapa) + lib/site.ts + DIFERENCIAIS 06 (site atual)
  eyebrow: "Endereço",
  titulo: "Onde estamos.",
  destaque: "Localização estratégica no centro do Brasil.",
  texto: "Entregamos em todo o Brasil com logística eficiente e suporte técnico de ponta a ponta.",
  rotuloCnpj: "CNPJ",
  rotuloMapa: "Abrir no Google Maps",
};

export const CONTATO_O_QUE_ENVIAR = {
  // fonte: blueprint (o-que-enviar) + lib/whatsapp.ts (campos das mensagens); checklist oficial [PREENCHER]
  eyebrow: "Antes de chamar",
  titulo: "O que enviar para agilizar.",
  subtitulo: "Os campos que a mensagem do WhatsApp já pede.",
  itens: [
    "Tipo de obra: solo ou telhado (e o tipo de telhado: cerâmico, fibrocimento ou metálico)",
    "Quantidade e modelo dos módulos",
    "Cidade/UF da obra",
    "Layout ou projeto, se houver",
  ],
  nota: "[PREENCHER: confirmar com o comercial]",
  cta: "Enviar pelo WhatsApp",
};

export const CONTATO_FAQ = {
  // fonte: blueprint (faq-atendimento); itens em lib/faq.ts (FAQ_CONTATO)
  eyebrow: "Atendimento",
  titulo: "Perguntas sobre o atendimento.",
};

export const CONTATO_CTA_FINAL = {
  // fonte: blueprint (/contato) + lib/site.ts
  titulo: "Fale direto com o comercial pelo WhatsApp.",
  subtitulo: `${SITE.telefone.display} · horário comercial.`,
  rotulo: "Chamar no WhatsApp",
};
