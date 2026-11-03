import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CtaFinal } from "@/components/cta/CtaFinal";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroTelhado } from "@/components/telhado/HeroTelhado";
import { SeletorTelhado, type VarianteSeletor } from "@/components/telhado/SeletorTelhado";
import { ListaDeMateriais, type VarianteLista } from "@/components/telhado/ListaDeMateriais";
import { FichaTecnica } from "@/components/telhado/FichaTecnica";
import { PassoAPasso } from "@/components/telhado/PassoAPasso";
import { MateriaisTitan } from "@/components/telhado/MateriaisTitan";
import { VedacapCross } from "@/components/telhado/VedacapCross";
import {
  BREADCRUMB_TELHADO,
  CTA_TELHADO,
  DADOS_TECNICOS,
  FAQ_TELHADO_HEADING,
  LISTA_DE_MATERIAIS,
  MATERIAIS_TITAN,
  PASSO_A_PASSO,
  SELETOR_TELHADO,
  TELHADO_META,
} from "@/content/telhado";
import { FAQ_TELHADO } from "@/lib/faq";
import { img, imageProps } from "@/lib/media";
import { TITAN, VARIANTES_TITAN } from "@/lib/produtos/titan";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, productJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: TELHADO_META.title,
  description: TELHADO_META.description,
  path: TELHADO_META.path,
});

export default function EstruturasParaTelhadoPage() {
  // Imagens resolvidas no servidor (manifesto) e passadas como props simples ao cliente
  const variantesSeletor: VarianteSeletor[] = VARIANTES_TITAN.map((v) => ({
    id: v.id,
    nome: v.nome,
    nomeCurto: v.nomeCurto,
    descricao: v.descricao,
    componentes: v.componentes,
    regras: v.regras,
    linha: v.linha,
    manualPdf: v.manualPdf,
    renderGeral: imageProps(v.renderGeral, `Render da Linha Titan em ${v.nome.toLowerCase()} — vista geral`),
    renderClose: imageProps(v.renderClose, `Render da Linha Titan em ${v.nome.toLowerCase()} — detalhe da fixação`),
    cta: SELETOR_TELHADO.cta[v.id],
  }));

  const variantesLista: VarianteLista[] = VARIANTES_TITAN.flatMap((v) =>
    v.id === "fibrocimento" || v.id === "metalico"
      ? [{ id: v.id, nome: v.nome, nomeCurto: v.nomeCurto, componentes: v.componentes }]
      : []
  );

  const jsonLd = [
    breadcrumbJsonLd([...BREADCRUMB_TELHADO]),
    productJsonLd({
      name: TELHADO_META.title,
      description: TELHADO_META.description,
      image: img(TELHADO_META.imagem).src,
      path: TELHADO_META.path,
      category: "Estrutura para telhado",
    }),
    faqJsonLd(FAQ_TELHADO),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />

      <HeroTelhado />

      {/* Seletor de telhado */}
      <section id="seletor-telhado" data-linha="telhado" className="bg-fundo">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={SELETOR_TELHADO.eyebrow} title={SELETOR_TELHADO.titulo} subtitle={SELETOR_TELHADO.subtitulo} destaque="telhado" />
          <SeletorTelhado
            variantes={variantesSeletor}
            rotulos={{
              componentes: SELETOR_TELHADO.rotuloComponentes,
              regras: SELETOR_TELHADO.rotuloRegras,
              quantidade: SELETOR_TELHADO.rotuloQuantidade,
              semManual: SELETOR_TELHADO.semManual,
            }}
          />
        </Container>
      </section>


      {/* Lista de materiais */}
      <section id="lista-de-materiais" data-linha="telhado" className="bg-superficie">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={LISTA_DE_MATERIAIS.eyebrow} title={LISTA_DE_MATERIAIS.titulo} subtitle={LISTA_DE_MATERIAIS.subtitulo} destaque="4 módulos" />
          <ListaDeMateriais
            variantes={variantesLista}
            rotulos={{
              caption: LISTA_DE_MATERIAIS.caption,
              colunas: LISTA_DE_MATERIAIS.colunas,
              semQuantidade: LISTA_DE_MATERIAIS.semQuantidade,
              rodape: LISTA_DE_MATERIAIS.rodape,
              cta: LISTA_DE_MATERIAIS.cta,
              explodido: LISTA_DE_MATERIAIS.explodido,
            }}
          />
        </Container>
      </section>


      {/* Dados técnicos */}
      <section id="dados-tecnicos-titan" data-linha="telhado" className="bg-fundo grade-modulos">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={DADOS_TECNICOS.eyebrow} title={DADOS_TECNICOS.titulo} subtitle={DADOS_TECNICOS.subtitulo} destaque="engenharia" />
          <FichaTecnica />
        </Container>
      </section>


      {/* Passo a passo */}
      <section id="passo-a-passo" data-linha="telhado" className="bg-superficie">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={PASSO_A_PASSO.eyebrow} title={PASSO_A_PASSO.titulo} subtitle={PASSO_A_PASSO.subtitulo} destaque="passo a passo" />
          <PassoAPasso
            etapas={TITAN.passos.map((p) => ({
              titulo: p.titulo,
              todos: "todos" in p ? p.todos : undefined,
              fibrocimento: "fibrocimento" in p ? p.fibrocimento : undefined,
              metalico: "metalico" in p ? p.metalico : undefined,
            }))}
            nota={PASSO_A_PASSO.nota}
            rotulos={{ todos: PASSO_A_PASSO.rotuloTodos, abas: PASSO_A_PASSO.abas }}
          />
        </Container>
      </section>


      {/* Materiais */}
      <section id="materiais-titan" data-linha="telhado" className="bg-fundo">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={MATERIAIS_TITAN.eyebrow} title={MATERIAIS_TITAN.titulo} subtitle={MATERIAIS_TITAN.subtitulo} destaque="Linha Titan" />
          <MateriaisTitan />
        </Container>
      </section>

      <VedacapCross />

      {/* FAQ */}
      <section id="faq-telhado" data-linha="telhado" className="bg-superficie">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={FAQ_TELHADO_HEADING.eyebrow} title={FAQ_TELHADO_HEADING.titulo} destaque="antes de fechar" />
          <AccordionObjecoes itens={FAQ_TELHADO} linha="telhado" posicao="faq-telhado" />
        </Container>
      </section>

      <CtaFinal linha="telhado" titulo={CTA_TELHADO.titulo} subtitulo={CTA_TELHADO.subtitulo} rotulo={CTA_TELHADO.rotulo} ctaId={CTA_TELHADO.ctaId} />
    </>
  );
}
