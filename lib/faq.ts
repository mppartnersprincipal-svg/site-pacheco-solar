/**
 * Perguntas do integrador — respostas SÓ com frases da ficha de fatos
 * (briefings, site atual, manuais, CLAUDE.md do cliente). Cada resposta vira
 * um link "Perguntar isso no WhatsApp" e alimenta o Schema FAQPage.
 */
import { SITE } from "@/lib/site";

export type Faq = { pergunta: string; resposta: string; fonte: string };

/** Só perguntas com resposta confirmada: nada com [PREENCHER] vai para o accordion nem para o FAQPage. */
export function faqPublicavel<T extends { resposta: string }>(items: T[]): T[] {
  return items.filter((i) => !/\[PREENCHER/.test(i.resposta));
}

export const FAQ_HOME: Faq[] = [
  {
    pergunta: "Tem pronta entrega?",
    resposta: "Trabalhamos com pronta entrega. Consulte a disponibilidade da sua linha pelo WhatsApp.",
    fonte: "briefing 360º",
  },
  {
    pergunta: "Entregam na minha região?",
    resposta: "Entregamos em todo o Brasil com logística eficiente e suporte técnico de ponta a ponta.",
    fonte: "site atual",
  },
  {
    pergunta: "Vendem item avulso ou só kit?",
    resposta:
      "Os dois: kits completos e itens avulsos — parafuso martelo, haste metal, haste madeira, mini trilho baixo e alto, suporte L, grampos intermediário e final, placa de identificação e Vedacap.",
    fonte: "briefing para Claude + CLAUDE.md do cliente",
  },
  {
    pergunta: "Vocês vendem placas solares?",
    resposta: "Não. A Pacheco Solar não vende placa solar: vende a base estrutural do projeto — estruturas metálicas para sistemas fotovoltaicos.",
    fonte: "briefing para Claude",
  },
  {
    pergunta: "Tem suporte técnico?",
    resposta: "Sim. Engenharia própria e suporte técnico e personalizado do pré ao pós-venda: fale com quem entende.",
    fonte: "site atual + briefing para Claude",
  },
  {
    pergunta: "Para quem vocês vendem?",
    resposta:
      "Integradores de energia solar, empresas instaladoras e empresas que vendem sistemas fotovoltaicos; também revendas do setor solar, EPCs e empresas do agronegócio com projetos próprios.",
    fonte: "briefing para Claude",
  },
  {
    pergunta: "Como eu peço um orçamento?",
    resposta:
      `Pelo WhatsApp ${SITE.telefone.display}, em horário comercial. Você pede o orçamento, apresenta ao seu cliente final e, com a aprovação, o material segue para expedição e entrega.`,
    fonte: "briefing 360º (processo de compra)",
  },
];

export const FAQ_SOLO: Faq[] = [
  {
    pergunta: "Atendem projetos em fazenda e agro?",
    resposta:
      "Sim. Empresas do agronegócio com projetos próprios são público da Pacheco, com aço de qualidade premium, ideal para ambientes com atmosfera agressiva e zonas rurais.",
    fonte: "briefing para Claude + site atual",
  },
  {
    pergunta: "O que é estrutura monoposte para placa solar?",
    resposta:
      "É a estrutura de solo apoiada em uma única estaca cravada por mesa, sem base de concreto. A Pacheco fabrica monoposte em duas configurações: Solo Linear (uma fileira de módulos) e Solo Dupla (duas fileiras).",
    fonte: "acervo (fotos) + Lucas (02/11/2026)",
  },
  {
    pergunta: "Onde comprar estrutura de solo para energia solar?",
    resposta:
      "Direto da Pacheco Solar, indústria de estruturas metálicas em Aparecida de Goiânia/GO. O orçamento é pelo WhatsApp e a entrega é feita em todo o Brasil.",
    fonte: "lib/site.ts + site atual",
  },
  {
    pergunta: "Qual a diferença entre Solo Linear e Solo Dupla?",
    resposta: "Solo Linear tem uma fileira de módulos por estrutura; Solo Dupla tem duas. A engenharia indica a configuração ideal para o seu layout.",
    fonte: "acervo (fotos) + Lucas (02/11/2026)",
  },
  {
    pergunta: "Tem pronta entrega de estrutura de solo?",
    resposta: "Trabalhamos com pronta entrega. Consulte a disponibilidade pelo WhatsApp.",
    fonte: "briefing 360º",
  },
  {
    pergunta: "Entregam no meu estado?",
    resposta: "Entregamos em todo o Brasil com logística eficiente e suporte técnico de ponta a ponta.",
    fonte: "site atual",
  },
];

export const FAQ_TELHADO: Faq[] = [
  {
    pergunta: "Serve para telhado cerâmico, fibrocimento e metálico?",
    resposta:
      "Sim. A Linha Titan tem solução para telhado cerâmico, de fibrocimento e metálico (mini trilho alto), adaptável a telhados residenciais e comerciais.",
    fonte: "renders + manuais + site atual",
  },
  {
    pergunta: "Qual o torque de aperto?",
    resposta: "Parafuso M10: 3 daN.m. Parafuso M8: 0,82 daN.m.",
    fonte: "manual Linha Titan",
  },
  {
    pergunta: "Qual a distância entre apoios?",
    resposta:
      "Siga o manual de instalação do módulo. Onde não for possível manter a distância recomendada, use a tabela por isopleta de vento (NBR-6123): 45–50 m/s 1,3 m · 40–45 m/s 1,4 m · 35–40 m/s 1,5 m · 30–35 m/s 1,6 m.",
    fonte: "manual Linha Titan",
  },
  {
    pergunta: "Serve para microinversor?",
    resposta: "Sim. No telhado metálico, o kit para fixar o microinversor é vendido separadamente.",
    fonte: "manual Linha Titan (telhado metálico)",
  },
  {
    pergunta: "Tem manual de instalação?",
    resposta: "Sim: manuais da Linha Titan para telhado de fibrocimento e telhado metálico, em PDF, nesta página.",
    fonte: "acervo",
  },
  {
    pergunta: "Tem suporte para placa solar em telha de zinco ou trapezoidal?",
    resposta:
      "Sim. Para telhado metálico (telha de zinco, trapezoidal ou aluzinco) a Linha Titan usa mini trilho de alumínio fixado com parafuso brocante inox e espuma EPDM, sem furar a telha fora do ponto de fixação.",
    fonte: "manual Linha Titan (telhado metálico)",
  },
  {
    pergunta: "Serve para galpão?",
    resposta:
      "Sim. Galpões comerciais e industriais com telha metálica ou de fibrocimento usam a mesma Linha Titan, dimensionada pela engenharia conforme o layout dos módulos.",
    fonte: "site atual (telhados comerciais) + manuais",
  },
];

export const FAQ_KITS: Faq[] = [
  {
    pergunta: "O que vem no kit completo?",
    resposta:
      "Estrutura e fixação no mesmo pedido. No layout de 4 módulos da Linha Titan, por exemplo, o kit vem com 2 perfis Titan, 8 hastes estruturais, 8 suportes L, 8 parafusos martelo, 8 grampos intermediários e 4 finais (fibrocimento) ou 10 mini trilhos altos, 40 parafusos brocantes, 1 espuma EPDM, 8 grampos intermediários e 4 finais (metálico).",
    fonte: "manuais Linha Titan",
  },
  {
    pergunta: "Tem pronta entrega de avulsos?",
    resposta: "Trabalhamos com pronta entrega. Consulte a disponibilidade pelo WhatsApp.",
    fonte: "briefing 360º",
  },
  {
    pergunta: "Vendem kit mini trilho solar?",
    resposta:
      "Sim. O kit da Linha Titan para telhado metálico vem com mini trilhos de alumínio, parafusos brocantes inox, espuma EPDM e grampos intermediários e finais.",
    fonte: "manual Linha Titan (telhado metálico)",
  },
  {
    pergunta: "Vendem trilho para fixar placa solar avulso?",
    resposta:
      "Sim. O mini trilho é vendido avulso, nas versões baixo e alto, e também vem no kit da Linha Titan. Consulte a disponibilidade pelo WhatsApp.",
    fonte: "lista oficial de avulsos (Pedro, 10/11/2026)",
  },
];

export const FAQ_VEDACAP: Faq[] = [
  {
    pergunta: "Silicone não resolve a goteira do parafuso?",
    resposta: "Não adianta silicone, fita ou massa: todos são orgânicos, todos ressecam pelo mesmo motivo. O Vedacap é uma capa em aluzinco, com aplicação simples com cola PU.",
    fonte: "roteiros Vedacap",
  },
  {
    pergunta: "Serve em telha de aluzinco?",
    resposta: "Sim. O Vedacap é feito do mesmo material da telha metálica: sem corrosão galvânica e com a mesma dilatação.",
    fonte: "roteiros Vedacap",
  },
  {
    pergunta: "Serve em estrutura solar?",
    resposta: "Sim. É indicado para telhados metálicos e estruturas solares: protege a cabeça do parafuso autobrocante e a arruela de vedação do sol e da chuva.",
    fonte: "roteiros Vedacap",
  },
  {
    pergunta: "Quais cores existem?",
    resposta: "Três versões: aluzinco natural, branco e preto, para combinar com a cor da telha metálica.",
    fonte: "roteiros Vedacap",
  },
  {
    pergunta: "Qual o preço? Tem tabela de atacado?",
    resposta: `Preços e tabela de atacado para lojistas só pelo WhatsApp ${SITE.telefone.display}.`,
    fonte: "CLAUDE.md do cliente",
  },
  {
    pergunta: "Tem pronta entrega?",
    resposta: "Trabalhamos com pronta entrega do Vedacap. Consulte a disponibilidade pelo WhatsApp.",
    fonte: "roteiros Vedacap",
  },
];

export const FAQ_CONTATO: Faq[] = [
  {
    pergunta: "Qual o horário de atendimento?",
    resposta: "Horário comercial.",
    fonte: "briefing 360º",
  },
  {
    pergunta: "Atendem em todo o Brasil?",
    resposta: "Entregamos em todo o Brasil com logística eficiente e suporte técnico de ponta a ponta.",
    fonte: "site atual",
  },
  {
    pergunta: "Tem formulário de orçamento?",
    resposta: `O atendimento é pelo WhatsApp ${SITE.telefone.display} ou pelo e-mail ${SITE.email}.`,
    fonte: "decisão do projeto (CTA único)",
  },
];
