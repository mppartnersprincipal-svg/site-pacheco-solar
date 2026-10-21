import { HeroVideo } from "@/components/home/HeroVideo";
import { LinhasDeProduto } from "@/components/home/LinhasDeProduto";
import { EstruturaEmCampo } from "@/components/home/EstruturaEmCampo";
import { DorSolucao } from "@/components/home/DorSolucao";
import { Diferenciais } from "@/components/home/Diferenciais";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { ProvaSocial } from "@/components/home/ProvaSocial";
import { Objecoes } from "@/components/home/Objecoes";
import { SobreResumo } from "@/components/home/SobreResumo";
import { BarraProntaEntrega } from "@/components/cta/BarraProntaEntrega";
import { CtaFinal } from "@/components/cta/CtaFinal";
import { JsonLd } from "@/components/seo/JsonLd";
import { TITLE_DEFAULT, buildMetadata, faqJsonLd } from "@/lib/seo";
import { VIDEOS } from "@/lib/media";
import { SITE } from "@/lib/site";
import { FAQ_HOME } from "@/lib/faq";

/** O template "%s | Pacheco Solar" do layout não vale para a própria página raiz: título completo aqui. */
export const metadata = buildMetadata({
  title: TITLE_DEFAULT,
  description: SITE.descricao,
  path: "/",
});

/** Home — 11 seções na ordem do blueprint (plano aprovado, "Home — ordem final"). */
export default function Home() {
  return (
    <>
      <HeroVideo mobile={VIDEOS.heroMobile} desktop={VIDEOS.heroDesktop} />
      <BarraProntaEntrega />
      <LinhasDeProduto />
      <EstruturaEmCampo />
      <DorSolucao />
      <Diferenciais />
      <ComoFunciona />
      <ProvaSocial />
      <Objecoes />
      <SobreResumo />
      <CtaFinal linha="geral" ctaId="cta-final-home" />
      <JsonLd data={[faqJsonLd(FAQ_HOME)]} />
    </>
  );
}
