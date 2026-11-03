import { HeroVideo } from "@/components/home/HeroVideo";
import { Proposito } from "@/components/home/Proposito";
import { LinhasDeProduto } from "@/components/home/LinhasDeProduto";
import { SobreResumo } from "@/components/home/SobreResumo";
import { ObrasDestaque } from "@/components/home/ObrasDestaque";
import { Diferenciais } from "@/components/home/Diferenciais";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { ProvaSocial } from "@/components/home/ProvaSocial";
import { CtaFinal } from "@/components/cta/CtaFinal";
import { TITLE_DEFAULT, buildMetadata } from "@/lib/seo";
import { VIDEOS } from "@/lib/media";
import { SITE } from "@/lib/site";

/** O template "%s | Pacheco Solar" do layout não vale para a própria página raiz: título completo aqui. */
export const metadata = buildMetadata({
  title: TITLE_DEFAULT,
  description: SITE.descricao,
  path: "/",
});

/** Home — 9 blocos enxutos (versão de 22/10/2026, referência aprovada pelo Lucas). */
export default function Home() {
  return (
    <>
      <HeroVideo hero={VIDEOS.hero} heroMobile={VIDEOS.heroMobile} />
      <Proposito />
      <LinhasDeProduto />
      <SobreResumo />
      <ObrasDestaque />
      <Diferenciais />
      <ComoFunciona />
      <ProvaSocial />
      <CtaFinal ctaId="cta-final-home" />
    </>
  );
}
