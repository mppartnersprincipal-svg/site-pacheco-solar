/**
 * Política de Privacidade (LGPD — Lei nº 13.709/2018). Texto padrão M|P
 * adaptado ao stack do site (GTM, GA4, Meta Pixel, Google Ads, UTMs, WhatsApp).
 * Dados da empresa só de lib/site.ts. Revisão jurídica pendente (ver rodapé).
 */
import { SITE, SITE_URL } from "@/lib/site";

export const PRIVACIDADE_META = {
  // fonte: blueprint (/politica-de-privacidade)
  title: "Política de Privacidade",
  description: `Como a ${SITE.razaoSocial} trata os dados de navegação e de contato de quem acessa ${SITE_URL}, conforme a LGPD.`,
};

export type SecaoPrivacidade = { id: string; titulo: string; paragrafos: string[]; lista?: string[] };

export const PRIVACIDADE_TITULO = "Política de Privacidade";

export const PRIVACIDADE_INTRO =
  `Esta política explica quais dados são coletados quando você acessa ${SITE_URL}, para que eles são usados e quais são os seus direitos, nos termos da Lei Geral de Proteção de Dados Pessoais (LGPD, Lei nº 13.709/2018).`;

export const PRIVACIDADE_SECOES: SecaoPrivacidade[] = [
  {
    id: "quem-somos",
    titulo: "Quem somos",
    paragrafos: [
      `O site ${SITE_URL} é mantido pela ${SITE.razaoSocial}, inscrita no CNPJ sob o nº ${SITE.cnpj}, com sede na ${SITE.endereco.completo}. A empresa é a controladora dos dados pessoais tratados neste site.`,
      `Contato para assuntos de privacidade: ${SITE.email}.`,
    ],
  },
  {
    id: "quais-dados-coletamos",
    titulo: "Quais dados coletamos",
    paragrafos: [
      "Dados de navegação, coletados de forma automática por meio do Google Tag Manager e das ferramentas Google Analytics 4, Meta Pixel e Google Ads:",
    ],
    lista: [
      "páginas visitadas e tempo de permanência;",
      "cliques em botões e links (WhatsApp, telefone, e-mail, downloads de manuais);",
      "origem da visita (site de referência, mecanismo de busca, campanha) e parâmetros UTM (utm_source, utm_medium, utm_campaign, utm_term, utm_content);",
      "dados técnicos do dispositivo e do navegador, como tipo de aparelho, sistema operacional, resolução de tela e endereço IP, usado de forma truncada pelas ferramentas de medição.",
    ],
  },
  {
    id: "dados-enviados-pelo-whatsapp",
    titulo: "Dados que você envia pelo WhatsApp",
    paragrafos: [
      "O site não possui formulário. O contato é feito pelo WhatsApp ou pelo e-mail oficial. Ao chamar no WhatsApp, você envia à Pacheco Solar os dados que escolher informar na conversa, como nome, empresa, telefone, cidade/UF e detalhes da obra (tipo de estrutura e quantidade de módulos). Esses dados são usados exclusivamente para responder ao seu pedido de orçamento ou de suporte técnico.",
      "A conversa acontece no aplicativo WhatsApp, cujo tratamento de dados segue a política de privacidade da própria plataforma.",
    ],
  },
  {
    id: "cookies-e-consentimento",
    titulo: "Cookies e consentimento",
    paragrafos: [
      "Na primeira visita, um banner oferece duas opções: \"Aceitar\", que autoriza o uso de cookies de medição e de publicidade, e \"Só o essencial\", que mantém apenas o necessário para o funcionamento do site.",
      "Usamos o Consent Mode do Google: enquanto você não aceitar, as ferramentas de medição e de anúncios operam sem armazenar cookies e sem identificar o seu dispositivo. A sua escolha fica salva no navegador e pode ser alterada a qualquer momento limpando os dados do site.",
      "Os parâmetros UTM da campanha que trouxe você até aqui são guardados temporariamente no armazenamento de sessão do navegador, apenas para medir a origem do contato.",
    ],
  },
  {
    id: "finalidade",
    titulo: "Finalidade do tratamento",
    paragrafos: ["Os dados são tratados para:"],
    lista: [
      "medir o desempenho do site e das campanhas de marketing (tráfego, origem das visitas, conversões);",
      "atender pedidos de orçamento e de suporte técnico feitos pelo WhatsApp ou e-mail;",
      "melhorar a navegação e o conteúdo do site.",
    ],
  },
  {
    id: "compartilhamento",
    titulo: "Compartilhamento",
    paragrafos: [
      "Os dados de navegação são processados pelo Google (Google Tag Manager, Google Analytics 4 e Google Ads) e pela Meta (Meta Pixel), que atuam como operadores, conforme as políticas de privacidade de cada empresa.",
      "A Pacheco Solar não vende dados pessoais e não os compartilha com terceiros para finalidades diferentes das descritas nesta política, salvo por obrigação legal ou ordem de autoridade competente.",
    ],
  },
  {
    id: "seus-direitos",
    titulo: "Seus direitos",
    paragrafos: ["Nos termos da LGPD, você pode, a qualquer momento, solicitar:"],
    lista: [
      "confirmação da existência de tratamento e acesso aos seus dados;",
      "correção de dados incompletos, inexatos ou desatualizados;",
      "anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade com a lei;",
      "informação sobre o compartilhamento dos seus dados;",
      "revogação do consentimento.",
    ],
  },
  {
    id: "alteracoes",
    titulo: "Alterações nesta política",
    paragrafos: [
      "Esta política pode ser atualizada para refletir mudanças nas ferramentas usadas pelo site ou na legislação. A versão vigente é sempre a publicada nesta página, com a data da última atualização indicada abaixo.",
    ],
  },
];

export const PRIVACIDADE_DIREITOS_CONTATO = `Para exercer qualquer um desses direitos, escreva para ${SITE.email}.`;

export const PRIVACIDADE_RODAPE = {
  revisao: "[PREENCHER revisão jurídica]",
  atualizacao: "Última atualização: [PREENCHER data]",
};
