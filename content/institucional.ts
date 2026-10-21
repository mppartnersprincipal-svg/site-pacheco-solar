/**
 * Textos institucionais LITERAIS. Cada bloco traz a fonte. Não parafrasear.
 * - briefing360 = BRIEFING COMPLETO - PACHECO SOLAR (jun/2025)
 * - briefingClaude = BRIEFING PARA CLAUDE (estratégico)
 * - siteAtual = pachecosolar.com.br (transcrição de 21/10/2026)
 * - claudeMd = CLAUDE.md do cliente (set/2026)
 */
import { ROTAS } from "@/lib/site";

export const MISSAO = {
  texto:
    "Ser a base confiável e estratégica para nossos parceiros integradores, oferecendo soluções inovadoras e de excelência em projetos de energia solar em todo o Brasil. Nosso compromisso é priorizar a resolução das demandas de nossos parceiros, fornecendo um atendimento ágil e assertivo, com foco na qualidade, sustentabilidade e na constante busca por soluções que superem expectativas.",
  fonte: "briefing360",
};

export const VISAO = {
  texto:
    "Ser reconhecida como símbolo de robustez, qualidade e inovação, liderando a fabricação de estruturas para painéis solares no Brasil. Além disso, desempenhar um papel fundamental e de grande impacto na promoção de energia limpa, contribuindo para a sustentabilidade em todo o território nacional.",
  fonte: "briefing360",
};

export const PROPOSITO = {
  texto:
    "Contribuir com o desenvolvimento sustentável, levando estruturas confiáveis para sustentar painéis solares e usinas em cada canto do nosso Brasil.",
  fonte: "briefing360",
};

export const VALORES = [
  { nome: "Qualidade", texto: "Buscamos constantemente melhorar nossos produtos e serviços, sempre com foco na excelência." },
  { nome: "Sustentabilidade", texto: "Trabalhamos com energia limpa e renovável, promovendo práticas que respeitem o meio ambiente." },
  { nome: "Ética", texto: "Atuamos com transparência, honestidade e respeito em todas as nossas ações e relacionamentos." },
  { nome: "Inovação", texto: "Valorizamos e incentivamos a criatividade e a busca por novas soluções." },
  { nome: "Compromisso", texto: "Estamos comprometidos com a satisfação dos nossos clientes e o desenvolvimento de soluções eficazes e seguras." },
  { nome: "Respeito", texto: "Promovemos um ambiente de trabalho respeitoso e colaborativo para todos os nossos colaboradores." },
] as const;
export const VALORES_FONTE = "briefing360";

export const PALAVRAS_CHAVE = ["Agilidade", "Qualidade", "Compromisso"] as const;

export const HISTORIA = {
  /** Reescrita mínima em 3ª pessoa do texto do briefing (sem dados novos). */
  texto:
    "Antes de fundar a Pacheco Solar, Lucas Pacheco era sócio de uma empresa que realizava instalação de energia solar. Vendo a dificuldade de encontrar produtos de qualidade ou empresas que realmente atendem os prazos e se interessam em resolver os desafios enfrentados nas obras referentes a estruturas fotovoltaicas, fundou a Pacheco Solar para se tornar um parceiro estratégico 100% focado no integrador. Desde então a Pacheco Solar vem se especializando cada vez mais, trazendo tecnologia e inovação para levar as melhores soluções de estruturas para os integradores de todo o Brasil.",
  fonte: "briefing360 (storytelling)",
  anoFundacao: "[PREENCHER ano de fundação]",
  posVenda: "No pós-venda, o próprio fundador entra em contato para saber como foi a experiência.",
  posVendaFonte: "briefing360 (pós-venda: 'Proprietário entra em contato para saber como foi a experiência')",
};

export const SETORES = [
  { nome: "Comercial", texto: "Orçamento e atendimento ao integrador." },
  { nome: "Produção", texto: "Fabricação das estruturas metálicas." },
  { nome: "Financeiro e logística", texto: "Faturamento e transporte." },
  { nome: "Diretoria", texto: "Lucas Pacheco, fundador." },
  {
    nome: "Expedição",
    texto: "O material produzido vai para a expedição, fica organizado e separado aguardando transporte.",
  },
] as const;
export const SETORES_FONTE = "briefing360 (departamentos) — textos curtos descritivos; a frase da expedição é literal";

/** Site atual — hero e bloco "Sobre" (literais). */
export const SITE_ATUAL = {
  heroTitulo: "Estruturas Metálicas para Energia Solar de Alta Performance",
  heroSub: "Garanta mais eficiência e segurança para seus projetos de usinas solares com qualidade inigualável.",
  sobre1: "Há mais de 5 anos, a Pacheco Solar vem sendo o braço direito dos integradores que buscam agilidade, qualidade e confiança.",
  sobre2:
    "Fabricamos estruturas metálicas robustas, com tecnologia e precisão para garantir segurança, durabilidade e montagem facilitada em qualquer tipo de projeto, do residencial ao de grande porte.",
  sobre3:
    "Na Pacheco Solar, você conta com um time comprometido em entregar o melhor em estruturas metálicas, com foco total na qualidade e no cumprimento dos prazos da sua obra.",
  fechamento:
    "Garanta o fechamento de mais obras, oferecendo diferenciais e qualidade para seus clientes. Conte com a Pacheco Solar como sua aliada.",
  fonte: "siteAtual",
};

/** "Por que escolher a Pacheco Solar?" — site atual; o 03 sem a comparação numérica (regra claudeMd). */
export const DIFERENCIAIS = [
  { numero: "01", titulo: "Da indústria para sua obra", texto: "Compre direto de quem fabrica e entende de estruturas." },
  { numero: "02", titulo: "Pronta entrega, agilidade na obra", texto: "Na maior parte do tempo temos pronta entrega: menos tempo de espera, mais eficiência no cronograma de instalação." },
  { numero: "03", titulo: "Aço de qualidade premium", texto: "Ideal para ambientes com atmosfera agressiva e zonas rurais." },
  { numero: "04", titulo: "Estruturas para solo e telhado", texto: "Seja qual for o tipo de projeto, temos a estrutura certa, precisa e compatível com o seu layout." },
  { numero: "05", titulo: "Atendimento técnico e personalizado", texto: "Fale com quem entende: suporte direto da nossa equipe de engenharia, pronta para orientar você do pré ao pós-venda." },
  { numero: "06", titulo: "Presença nacional", texto: "Entregamos em todo o Brasil com logística eficiente e suporte técnico de ponta a ponta." },
] as const;
export const DIFERENCIAIS_FONTE = "siteAtual (02 com a ressalva 'na maior parte do tempo' do briefing360)";

/** Pilares de comunicação — briefingClaude; textos compostos só com frases permitidas. */
export const PILARES = [
  { nome: "Velocidade", texto: "Na maior parte do tempo temos pronta entrega: menos tempo de espera, mais eficiência no cronograma." },
  { nome: "Confiabilidade", texto: "Engenharia própria e suporte técnico do pré ao pós-venda." },
  { nome: "Facilidade", texto: "Kits completos e itens avulsos: centralização de compras, menos fornecedores." },
  { nome: "Segurança", texto: "Material premium (liga estrutural + inox). Aço de qualidade premium, ideal para ambientes com atmosfera agressiva e zonas rurais." },
  { nome: "Suporte", texto: "Parceria técnica antes, durante e depois da obra. Fale com quem entende." },
] as const;

export const GANCHOS = [
  "Projeto parado é prejuízo",
  "Fornecedor te deixa na mão por causa de um parafuso?",
  "Estrutura barata sai caro",
  "Fragmentar fornecedor = dor de cabeça",
  "Resistência não é peso, é engenharia",
  "Enquanto outros atrasam, você entrega",
] as const;

export const FRASES_POSICIONAMENTO = [
  "Fornecedor que resolve, não complica",
  "Estrutura que não te deixa na mão",
  "Mais obra entregue, menos dor de cabeça",
  "Seu projeto começa na estrutura certa",
  "Você vende. A Pacheco entrega.",
] as const;

export const PROMESSA = "Você não perde prazo, não perde dinheiro e não passa aperto na obra.";
export const POSICIONAMENTO = "Fornecedor técnico e confiável que resolve o problema do integrador.";
export const INSIGHT = "O integrador não compra estrutura. Compra obra entregue no prazo, menos dor de cabeça, menos risco e mais lucro.";

/** Dores da persona "O Integrador Operacional" — briefingClaude. */
export const DORES = [
  "Obra travada por falta de peça",
  "Fornecedor que não entrega no prazo",
  "Retrabalho por erro estrutural",
  "Logística bagunçada com vários fornecedores",
] as const;

/** Mapa dor → solução — briefingClaude (proposta de valor). */
export const MAPA_DOR_SOLUCAO = [
  { dor: "Obra travada", solucao: "Pronta entrega", detalhe: "Na maior parte do tempo temos pronta entrega.", href: `${ROTAS.kits}#pronta-entrega` },
  { dor: "Falta de peça", solucao: "Kits completos + itens avulsos", detalhe: "Grampos, parafusos, hastes, clipes e placas de identificação.", href: ROTAS.kits },
  { dor: "Erro técnico", solucao: "Suporte de engenharia", detalhe: "Engenharia própria, do pré ao pós-venda.", href: ROTAS.contato },
  { dor: "Baixa qualidade", solucao: "Material premium", detalhe: "Liga estrutural + inox.", href: ROTAS.telhado },
  { dor: "Logística ruim", solucao: "Centralização de compras", detalhe: "Tudo em um só fornecedor, entrega em todo o Brasil.", href: ROTAS.kits },
] as const;

/** Processo de compra — briefing360 (forma genérica publicável). */
export const PROCESSO_COMPRA = [
  { titulo: "Você pede o orçamento no WhatsApp", texto: "Diga o tipo de obra e a quantidade de módulos. [PREENCHER: checklist do comercial]" },
  { titulo: "Apresenta ao seu cliente final", texto: "O integrador mostra o orçamento para o cliente dele analisar." },
  {
    titulo: "Aprovação",
    texto:
      "Com a aprovação, o pedido entra em produção — ou, quando há disponibilidade em pronta entrega (na maior parte do tempo), segue direto para a expedição. Consulte a disponibilidade.",
  },
  { titulo: "Expedição e entrega rápida", texto: "O material fica organizado e separado aguardando transporte. Entrega rápida, principalmente em Goiás." },
] as const;

export const FORCAS = [
  "Local estratégico (centro do Brasil)",
  "Rápida solução dos desafios diários (desburocratização da informação)",
  "Compromissados em resolver as dores dos nossos clientes e não apenas gerar lucro",
] as const;
export const FORCAS_FONTE = "briefing360 (SWOT — forças)";

/** Público — briefingClaude. */
export const PUBLICO = {
  principal: ["Integradores de energia solar", "Empresas instaladoras", "Empresas que vendem sistemas fotovoltaicos"],
  secundario: ["Revendas do setor solar", "EPCs (Engineering, Procurement and Construction)", "Empresas do agronegócio com projetos próprios"],
} as const;
