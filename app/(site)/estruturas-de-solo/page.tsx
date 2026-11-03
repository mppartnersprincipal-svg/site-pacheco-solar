import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { WaButton } from "@/components/cta/WaButton";
import { CtaFinal } from "@/components/cta/CtaFinal";
import { AccordionObjecoes } from "@/components/nicho/AccordionObjecoes";
import { JsonLd } from "@/components/seo/JsonLd";
import { VariantesSolo } from "@/components/solo/VariantesSolo";
import { HotspotsComponentes } from "@/components/solo/HotspotsComponentes";
import { AmbienteAgressivo } from "@/components/solo/AmbienteAgressivo";
import { SoloEmCampo } from "@/components/solo/SoloEmCampo";
import { ComoPedir } from "@/components/solo/ComoPedir";
import { HERO_SOLO, VARIANTES_SOLO, COMPONENTES_SOLO, FAQ_SOLO_HEADING, CTA_FINAL_SOLO, META_SOLO } from "@/content/solo";
import { FAQ_SOLO } from "@/lib/faq";
import { img, imageProps } from "@/lib/media";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, productJsonLd } from "@/lib/seo";
import { ROTAS } from "@/lib/site";

export const metadata = buildMetadata({ title: META_SOLO.title, description: META_SOLO.description, path: ROTAS.solo });

export default function EstruturasDeSoloPage() {
  const heroImg = img(HERO_SOLO.imagem);
  const variantes = VARIANTES_SOLO.itens.map((v) => ({
    id: v.id,
    nome: v.nome,
    descricao: v.descricao,
    linha: v.linha,
    cta: v.cta,
    imagem: imageProps(v.imagem, v.imagemAlt),
  }));
  const fotoComponentes = imageProps(COMPONENTES_SOLO.foto, COMPONENTES_SOLO.fotoAlt);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: ROTAS.home },
            { name: "Estruturas de solo", path: ROTAS.solo },
          ]),
          productJsonLd({
            name: HERO_SOLO.titulo,
            description: META_SOLO.description,
            image: heroImg.src,
            path: ROTAS.solo,
            category: "Estruturas metálicas para sistemas fotovoltaicos",
          }),
          faqJsonLd(FAQ_SOLO),
        ]}
      />

      {/* O PageHero não expõe id/data-linha; a section externa garante section_view e o botão flutuante. */}
      <section id="hero-solo" data-linha="solo">
        <PageHero
          eyebrow={HERO_SOLO.eyebrow}
          title={HERO_SOLO.titulo}
          subtitle={HERO_SOLO.subtitulo}
          image={{ src: heroImg.src, width: heroImg.width, height: heroImg.height, blurDataURL: heroImg.blurDataURL }}
          imageAlt={HERO_SOLO.imagemAlt}
          imagePosition="center 40%"
          placas={[...HERO_SOLO.placas]}
        >
          <WaButton linha="solo" ctaId="hero-solo" posicao="hero">
            {HERO_SOLO.cta}
          </WaButton>
          <Link href={HERO_SOLO.linkObras.href} className={buttonClasses("secondary", "lg")}>
            {HERO_SOLO.linkObras.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </PageHero>
      </section>


      <section id="variantes-solo" data-linha="solo" className="bg-fundo">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={VARIANTES_SOLO.eyebrow} title={VARIANTES_SOLO.titulo} subtitle={VARIANTES_SOLO.subtitulo} destaque="Duas configurações" />
          <VariantesSolo
            itens={variantes}
            rotuloTablist={VARIANTES_SOLO.rotuloTablist}
            rotuloConfiguracao={VARIANTES_SOLO.rotuloConfiguracao}
            legendaFoto={VARIANTES_SOLO.legendaFoto}
            placas={VARIANTES_SOLO.placas}
          />
        </Container>
      </section>


      <section id="componentes-solo" data-linha="solo" className="bg-superficie">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={COMPONENTES_SOLO.eyebrow} title={COMPONENTES_SOLO.titulo} subtitle={COMPONENTES_SOLO.subtitulo} destaque="cada peça com nome" />
          <HotspotsComponentes
            foto={fotoComponentes}
            pins={[...COMPONENTES_SOLO.pins]}
            nota={COMPONENTES_SOLO.nota}
            rotuloLista={COMPONENTES_SOLO.rotuloLista}
            rotuloComponente={COMPONENTES_SOLO.rotuloComponente}
            ctaItem={COMPONENTES_SOLO.ctaItem}
            ctaEstrutura={COMPONENTES_SOLO.ctaEstrutura}
            notaEstrutura={COMPONENTES_SOLO.notaEstrutura}
          />
          <div className="mt-10">
            <Link href={COMPONENTES_SOLO.linkAvulsos.href} className="inline-flex min-h-11 items-center gap-2 font-display font-semibold text-laranja-texto underline-offset-4 hover:underline">
              {COMPONENTES_SOLO.linkAvulsos.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Container>
      </section>

      <AmbienteAgressivo />

      <SoloEmCampo />

      <ComoPedir />

      <section id="faq-solo" data-linha="solo" className="bg-fundo">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={FAQ_SOLO_HEADING.eyebrow} title={FAQ_SOLO_HEADING.titulo} />
          <AccordionObjecoes itens={FAQ_SOLO} linha="solo" posicao="faq-solo" />
        </Container>
      </section>

      <CtaFinal linha="solo" titulo={CTA_FINAL_SOLO.titulo} subtitulo={CTA_FINAL_SOLO.subtitulo} rotulo={CTA_FINAL_SOLO.rotulo} ctaId={CTA_FINAL_SOLO.ctaId} />
    </>
  );
}
