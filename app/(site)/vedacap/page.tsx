import { JsonLd } from "@/components/seo/JsonLd";
import { HeroVedacap } from "@/components/vedacap/HeroVedacap";
import { ProblemaParafuso } from "@/components/vedacap/ProblemaParafuso";
import { PorQueAluzinco } from "@/components/vedacap/PorQueAluzinco";
import { AplicacaoVedacap } from "@/components/vedacap/AplicacaoVedacap";
import { VersoesVedacap } from "@/components/vedacap/VersoesVedacap";
import { ParaQuem } from "@/components/vedacap/ParaQuem";
import { FaqVedacap } from "@/components/vedacap/FaqVedacap";
import { AtacadoLojista } from "@/components/vedacap/AtacadoLojista";
import { VEDACAP_SEO } from "@/content/vedacap";
import { FAQ_VEDACAP } from "@/lib/faq";
import { img } from "@/lib/media";
import { VEDACAP } from "@/lib/produtos/catalogo";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, productJsonLd } from "@/lib/seo";
import { ROTAS } from "@/lib/site";

export const metadata = buildMetadata({
  title: VEDACAP_SEO.title,
  description: VEDACAP_SEO.description,
  path: VEDACAP_SEO.path,
});

function plain(key: Parameters<typeof img>[0]) {
  const m = img(key);
  return { src: m.src, width: m.width, height: m.height, blurDataURL: m.blurDataURL };
}

export default function VedacapPage() {
  const logo = plain("logos/vedacap-branco");

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Início", path: ROTAS.home },
      { name: VEDACAP.nome, path: ROTAS.vedacap },
    ]),
    productJsonLd({
      name: VEDACAP.nome,
      description: VEDACAP.definicao,
      image: logo.src,
      path: ROTAS.vedacap,
      category: VEDACAP_SEO.categoria,
    }),
    faqJsonLd(FAQ_VEDACAP),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroVedacap logo={logo} />
      <ProblemaParafuso />
      {/* Foto real: quadro do reel "2 PACHECO SOLAR" (Drive › Posts VEDACAP), 10/11/2026 */}
      <PorQueAluzinco foto={plain("vedacap/vedacap-painel")} />
      <AplicacaoVedacap />
      <VersoesVedacap />
      <ParaQuem />
      <FaqVedacap />
      <AtacadoLojista />
    </>
  );
}
