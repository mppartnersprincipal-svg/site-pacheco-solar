import { JsonLd } from "@/components/seo/JsonLd";
import { HeroKits } from "@/components/kits/HeroKits";
import { KitCompleto } from "@/components/kits/KitCompleto";
import { ItensAvulsos } from "@/components/kits/ItensAvulsos";
import type { ItemCatalogo } from "@/components/kits/CatalogoAvulsos";
import { UmFornecedor } from "@/components/kits/UmFornecedor";
import { ProntaEntregaExpedicao } from "@/components/kits/ProntaEntregaExpedicao";
import { FaqKits } from "@/components/kits/FaqKits";
import { KITS_SEO } from "@/content/kits";
import { FAQ_KITS } from "@/lib/faq";
import { img } from "@/lib/media";
import { ITENS_AVULSOS, LINHAS } from "@/lib/produtos/catalogo";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, productJsonLd } from "@/lib/seo";
import { ROTAS } from "@/lib/site";

export const metadata = buildMetadata({
  title: KITS_SEO.title,
  description: KITS_SEO.description,
  path: KITS_SEO.path,
});

const OG_IMAGE = "/opengraph-image";

function plain(key: Parameters<typeof img>[0]) {
  const m = img(key);
  return { src: m.src, width: m.width, height: m.height, blurDataURL: m.blurDataURL };
}

export default function KitsEItensAvulsosPage() {
  const linhaKits = LINHAS.find((l) => l.id === "kits");

  const itens: ItemCatalogo[] = ITENS_AVULSOS.map((i) => ({
    slug: i.slug,
    nome: i.nome,
    uso: i.uso,
    imagem: i.imagem ? plain(i.imagem) : undefined,
    imagemAlt: i.imagemAlt,
    nota: i.nota,
    logo: i.logo,
  }));

  const jsonLd = [
    breadcrumbJsonLd([
      { name: "Início", path: ROTAS.home },
      { name: "Kits e itens avulsos", path: ROTAS.kits },
    ]),
    productJsonLd({
      name: "Kit completo para estrutura solar",
      description: linhaKits?.frase ?? "Tudo em um só fornecedor",
      image: linhaKits ? img(linhaKits.imagem).src : OG_IMAGE,
      path: ROTAS.kits,
      category: "Kits completos",
    }),
    ...ITENS_AVULSOS.map((i) =>
      productJsonLd({
        name: i.nome,
        description: `${i.nome} — item avulso para estrutura solar (${i.uso === "ambos" ? "solo e telhado" : i.uso}).`,
        // Sem foto própria, usa a imagem padrão do site (não a foto de outra peça)
        image: i.imagem ? img(i.imagem).src : OG_IMAGE,
        // sem `sku`: o slug da URL não é código de produto real (códigos do ERP: [PREENCHER])
        path: `${ROTAS.kits}#itens-avulsos-${i.slug}`,
        category: "Itens avulsos",
      })
    ),
    faqJsonLd(FAQ_KITS),
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroKits render={plain("telhado/titan-grampo-intermediario")} />
      <KitCompleto />
      <ItensAvulsos itens={itens} />
      <UmFornecedor />
      <ProntaEntregaExpedicao foto={plain("solo-dupla/img-2713")} />
      <FaqKits />
    </>
  );
}
