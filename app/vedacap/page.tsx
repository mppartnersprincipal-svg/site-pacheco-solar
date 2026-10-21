import { JsonLd } from "@/components/seo/JsonLd";
import { BarraProntaEntrega } from "@/components/cta/BarraProntaEntrega";
import { CtaFinal } from "@/components/cta/CtaFinal";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { HeroVedacap } from "@/components/vedacap/HeroVedacap";
import { ProblemaParafuso } from "@/components/vedacap/ProblemaParafuso";
import { PorQueAluzinco } from "@/components/vedacap/PorQueAluzinco";
import { AplicacaoVedacap } from "@/components/vedacap/AplicacaoVedacap";
import { VersoesVedacap } from "@/components/vedacap/VersoesVedacap";
import { ParaQuem } from "@/components/vedacap/ParaQuem";
import { FaqVedacap } from "@/components/vedacap/FaqVedacap";
import { AtacadoLojista } from "@/components/vedacap/AtacadoLojista";
import { VEDACAP_CTA_FINAL, VEDACAP_SEO } from "@/content/vedacap";
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
      <BarraProntaEntrega variante="vedacap" />
      <ProblemaParafuso />
      <TrilhoDivisor />
      <PorQueAluzinco render={plain("telhado/titan-metalico-minitrilho-close")} />
      <TrilhoDivisor ativo />
      <AplicacaoVedacap />
      <TrilhoDivisor />
      <VersoesVedacap />
      <ParaQuem />
      <FaqVedacap />
      <AtacadoLojista />
      <CtaFinal
        linha="vedacap"
        titulo={VEDACAP_CTA_FINAL.titulo}
        subtitulo={VEDACAP_CTA_FINAL.subtitulo}
        rotulo={VEDACAP_CTA_FINAL.rotulo}
        ctaId={VEDACAP_CTA_FINAL.ctaId}
      />
    </>
  );
}
