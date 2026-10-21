import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { WaButton } from "@/components/cta/WaButton";
import { CtaFinal } from "@/components/cta/CtaFinal";
import { GaleriaEmCampo } from "@/components/nicho/GaleriaEmCampo";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { JsonLd } from "@/components/seo/JsonLd";
import { GaleriaObras } from "@/components/obras/GaleriaObras";
import { CasoCocalinho } from "@/components/obras/CasoCocalinho";
import { DepoimentosObras } from "@/components/obras/DepoimentosObras";
import { HERO_OBRAS, GALERIA_OBRAS, VIDEOS_OBRAS, CTA_FINAL_OBRAS, META_OBRAS } from "@/content/obras";
import { CLIPES, img, imageProps } from "@/lib/media";
import { FOTOS_OBRAS } from "@/lib/obras";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { ROTAS } from "@/lib/site";

export const metadata = buildMetadata({ title: META_OBRAS.title, description: META_OBRAS.description, path: ROTAS.obras });

export default function ObrasPage() {
  const heroImg = img(HERO_OBRAS.imagem);
  const fotos = FOTOS_OBRAS.map((f) => ({ key: f.key, tipo: f.tipo, legenda: f.legenda, ...imageProps(f.key, f.alt) }));

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: ROTAS.home },
            { name: "Obras realizadas", path: ROTAS.obras },
          ]),
        ]}
      />

      {/* O PageHero não expõe id/data-linha; a section externa garante section_view e o botão flutuante. */}
      <section id="hero-obras" data-linha="obra">
        <PageHero
          eyebrow={HERO_OBRAS.eyebrow}
          title={HERO_OBRAS.titulo}
          subtitle={HERO_OBRAS.subtitulo}
          image={{ src: heroImg.src, width: heroImg.width, height: heroImg.height, blurDataURL: heroImg.blurDataURL }}
          imageAlt={HERO_OBRAS.imagemAlt}
          imagePosition="center 60%"
          placas={[...HERO_OBRAS.placas]}
        >
          <WaButton linha="obra" ctaId="hero-obras" posicao="hero">
            {HERO_OBRAS.cta}
          </WaButton>
          <Link href={HERO_OBRAS.linkSolo.href} className={buttonClasses("secondary", "lg")}>
            {HERO_OBRAS.linkSolo.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </PageHero>
      </section>

      <section id="galeria-obras" data-linha="obra" className="bg-fundo">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={GALERIA_OBRAS.eyebrow} title={GALERIA_OBRAS.titulo} subtitle={GALERIA_OBRAS.subtitulo} destaque="engenharia" />
          <GaleriaObras
            fotos={fotos}
            filtros={GALERIA_OBRAS.filtros}
            rotuloFiltros={GALERIA_OBRAS.rotuloFiltros}
            rotuloLista={GALERIA_OBRAS.rotuloLista}
            lightbox={GALERIA_OBRAS.lightbox}
          />
          {GALERIA_OBRAS.notaLegendas ? (
            <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-aco">{GALERIA_OBRAS.notaLegendas}</p>
          ) : null}
        </Container>
      </section>

      <CasoCocalinho />

      <TrilhoDivisor />

      <section id="videos-obras" data-linha="obra" className="bg-fundo">
        <Container className="py-20 sm:py-28">
          <SectionHeading eyebrow={VIDEOS_OBRAS.eyebrow} title={VIDEOS_OBRAS.titulo} subtitle={VIDEOS_OBRAS.subtitulo} destaque="campo" />
          <GaleriaEmCampo clipes={CLIPES} />
          {VIDEOS_OBRAS.notaLocal ? <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-aco">{VIDEOS_OBRAS.notaLocal}</p> : null}
        </Container>
      </section>

      <DepoimentosObras />

      <CtaFinal linha="obra" titulo={CTA_FINAL_OBRAS.titulo} subtitulo={CTA_FINAL_OBRAS.subtitulo} rotulo={CTA_FINAL_OBRAS.rotulo} ctaId={CTA_FINAL_OBRAS.ctaId} />
    </>
  );
}
