/**
 * Perguntas do integrador — respostas SÓ com frases da ficha de fatos
 * (briefings, site atual, manuais, CLAUDE.md do cliente). Cada resposta vira
 * um link "Perguntar isso no WhatsApp" e alimenta o Schema FAQPage.
 */
export type Faq = { pergunta: string; resposta: string; fonte: string };

export const FAQ_HOME: Faq[] = [
  {
    pergunta: "Tem pronta entrega?",
    resposta: "Na maior parte do tempo temos pronta entrega. Consulte a disponibilidade da sua linha pelo WhatsApp.",
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
      "Os dois: kits completos e itens avulsos — grampos intermediários e finais, parafusos (brocante inox e martelo), hastes estruturais inox, clipes de fixação e placas de identificação.",
    fonte: "briefing para Claude + CLAUDE.md do cliente",
  },
  {
    pergunta: "Vocês vendem placas solares?",
    resposta: "Não. Fabricamos e comercializamos estruturas metálicas para sistemas fotovoltaicos: a base estrutural do projeto solar.",
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
      "Pelo WhatsApp (62) 4101-8101, em horário comercial. Você pede o orçamento, apresenta ao seu cliente final e, com a aprovação, o material segue para expedição e entrega.",
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
    pergunta: "Qual a diferença entre Solo Linear e Solo Dupla?",
    resposta: "São as duas configurações da linha de solo. A especificação técnica de cada uma está em confirmação: [PREENCHER].",
    fonte: "acervo (fotos) — especificações [PREENCHER]",
  },
  {
    pergunta: "Tem pronta entrega de estrutura de solo?",
    resposta: "Na maior parte do tempo temos pronta entrega. Consulte a disponibilidade pelo WhatsApp.",
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
      "Sim. A Linha Titan tem solução para telhado cerâmico, de fibrocimento e metálico (mini-trilho alto), adaptável a telhados residenciais e comerciais.",
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
];

export const FAQ_KITS: Faq[] = [
  {
    pergunta: "O que vem no kit completo?",
    resposta:
      "Estrutura e fixação no mesmo pedido. No layout de 4 módulos da Linha Titan, por exemplo, o manual lista perfis, hastes, grampos intermediários e finais (fibrocimento) ou mini-trilhos, parafusos brocantes, espuma EPDM e grampos (metálico).",
    fonte: "manuais Linha Titan",
  },
  {
    pergunta: "Vendem quantidade pequena de itens avulsos?",
    resposta: "Política de quantidade mínima: [PREENCHER]. Fale com o comercial pelo WhatsApp.",
    fonte: "[PREENCHER]",
  },
  {
    pergunta: "Posso misturar itens de solo e telhado no mesmo pedido?",
    resposta: "[PREENCHER]. Fale com o comercial pelo WhatsApp.",
    fonte: "[PREENCHER]",
  },
  {
    pergunta: "Tem pronta entrega de avulsos?",
    resposta: "Na maior parte do tempo temos pronta entrega. Consulte a disponibilidade pelo WhatsApp.",
    fonte: "briefing 360º",
  },
];

export const FAQ_VEDACAP: Faq[] = [
  {
    pergunta: "Posso usar silicone para aplicar o Vedacap?",
    resposta: "Não. A aplicação é simples, com cola PU.",
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
    resposta: "Três versões: aluzinco natural, branco e preto, para combinar com qualquer telhado.",
    fonte: "roteiros Vedacap",
  },
  {
    pergunta: "Qual o preço? Tem tabela de atacado?",
    resposta: "Preços e tabela de atacado para lojistas só pelo WhatsApp (62) 4101-8101.",
    fonte: "CLAUDE.md do cliente",
  },
  {
    pergunta: "Tem pronta entrega?",
    resposta: "Temos o Vedacap a pronta entrega. Consulte a disponibilidade pelo WhatsApp.",
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
    resposta: "O atendimento é pelo WhatsApp (62) 4101-8101 ou pelo e-mail adm@pachecosolar.com.br.",
    fonte: "decisão do projeto (CTA único)",
  },
];
