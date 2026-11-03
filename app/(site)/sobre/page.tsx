import { CtaFinal } from "@/components/cta/CtaFinal";
import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSobre } from "@/components/sobre/HeroSobre";
import { HistoriaSobre } from "@/components/sobre/HistoriaSobre";
import { MissaoVisaoProposito } from "@/components/sobre/MissaoVisaoProposito";
import { ValoresSobre } from "@/components/sobre/ValoresSobre";
import { ComoTrabalhamos } from "@/components/sobre/ComoTrabalhamos";
import { LocalizacaoSobre } from "@/components/sobre/LocalizacaoSobre";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { ROTAS } from "@/lib/site";
import { SOBRE_CTA_FINAL, SOBRE_META } from "@/content/sobre";

export const metadata = buildMetadata({
  title: SOBRE_META.title,
  description: SOBRE_META.description,
  path: ROTAS.sobre,
});

export default function SobrePage() {
  return (
    <>
      <HeroSobre />
      <HistoriaSobre />
      <MissaoVisaoProposito />
      <ValoresSobre />
      <ComoTrabalhamos />
      <LocalizacaoSobre />
      <CtaFinal
        linha="equipe"
        titulo={SOBRE_CTA_FINAL.titulo}
        subtitulo={SOBRE_CTA_FINAL.subtitulo}
        rotulo={SOBRE_CTA_FINAL.rotulo}
        ctaId="cta-final-sobre"
      />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: ROTAS.home },
            { name: SOBRE_META.title, path: ROTAS.sobre },
          ]),
        ]}
      />
    </>
  );
}
