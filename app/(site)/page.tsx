import { HeroVideo } from "@/components/home/HeroVideo";
import { Proposito } from "@/components/home/Proposito";
import { LinhasDeProduto } from "@/components/home/LinhasDeProduto";
import { SobreResumo } from "@/components/home/SobreResumo";
import { ObrasDestaque } from "@/components/home/ObrasDestaque";
import { Diferenciais } from "@/components/home/Diferenciais";
import { ComoFunciona } from "@/components/home/ComoFunciona";
import { ProvaSocial } from "@/components/home/ProvaSocial";
import { FaqHome } from "@/components/home/FaqHome";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_HOME } from "@/lib/faq";
import { TITLE_DEFAULT, buildMetadata, faqJsonLd } from "@/lib/seo";
import { VIDEOS } from "@/lib/media";
import { SITE } from "@/lib/site";

/** O título da home já traz a marca; `absolute` evita o template "%s | Pacheco Solar" do layout. */
export const metadata = buildMetadata({
  title: TITLE_DEFAULT,
  description: SITE.descricao,
  path: "/",
  absolute: true,
});

/** Home — blocos enxutos (versão de 22/10/2026, aprovada pelo Lucas) + FAQ fechado com FAQPage JSON-LD (11/11/2026, SEO/Ads). */
export default function Home() {
  return (
    <>
      <JsonLd data={[faqJsonLd(FAQ_HOME)]} />
      <HeroVideo hero={VIDEOS.hero} heroMobile={VIDEOS.heroMobile} />
      <Proposito />
      <LinhasDeProduto />
      <SobreResumo />
      <ObrasDestaque />
      <Diferenciais />
      <ComoFunciona />
      <ProvaSocial />
      <FaqHome />
    </>
  );
}
