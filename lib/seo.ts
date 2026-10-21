import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/lib/site";

export const SITE_NAME = SITE.nome;
export const TITLE_DEFAULT = "Pacheco Solar | Estruturas metálicas para energia solar";

/** Metadata padrão de uma rota (title, description, canonical, OG/Twitter). */
export function buildMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "pt_BR",
      siteName: SITE_NAME,
      title,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/** Organization + LocalBusiness (fabricante B2B) — layout raiz. */
export const ORGANIZATION_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness"],
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  legalName: SITE.razaoSocial,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logos/pacheco-laranja.webp`,
  image: `${SITE_URL}/opengraph-image`,
  description: SITE.descricao,
  telephone: SITE.telefone.e164,
  email: SITE.email,
  taxID: SITE.cnpj,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.endereco.logradouro,
    addressLocality: SITE.endereco.cidade,
    addressRegion: SITE.endereco.uf,
    postalCode: SITE.endereco.cep,
    addressCountry: "BR",
  },
  areaServed: "BR",
  sameAs: [SITE.instagram.url],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "sales",
      telephone: SITE.telefone.e164,
      areaServed: "BR",
      availableLanguage: "Portuguese",
    },
  ],
};

/** Product sem oferta/preço (regra: preço só no WhatsApp). */
export function productJsonLd(p: { name: string; description: string; image: string; path: string; sku?: string; category?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    image: `${SITE_URL}${p.image}`,
    url: `${SITE_URL}${p.path}`,
    ...(p.sku ? { sku: p.sku } : {}),
    ...(p.category ? { category: p.category } : {}),
    brand: { "@type": "Brand", name: SITE_NAME },
    manufacturer: { "@id": `${SITE_URL}/#organization` },
  };
}

export function faqJsonLd(items: Array<{ pergunta: string; resposta: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.pergunta,
      acceptedAnswer: { "@type": "Answer", text: i.resposta },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function videoJsonLd(v: { name: string; description: string; thumbnail: string; contentUrl: string; uploadDate: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.name,
    description: v.description,
    thumbnailUrl: `${SITE_URL}${v.thumbnail}`,
    contentUrl: `${SITE_URL}${v.contentUrl}`,
    uploadDate: v.uploadDate,
  };
}
