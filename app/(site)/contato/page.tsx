import { JsonLd } from "@/components/seo/JsonLd";
import { HeroContato } from "@/components/contato/HeroContato";
import { AtalhosPorLinha } from "@/components/contato/AtalhosPorLinha";
import { EnderecoMapa } from "@/components/contato/EnderecoMapa";
import { OQueEnviar } from "@/components/contato/OQueEnviar";
import { FaqAtendimento } from "@/components/contato/FaqAtendimento";
import { FAQ_CONTATO } from "@/lib/faq";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd } from "@/lib/seo";
import { ROTAS } from "@/lib/site";
import { CONTATO_META } from "@/content/contato";

export const metadata = buildMetadata({
  title: CONTATO_META.title,
  description: CONTATO_META.description,
  path: ROTAS.contato,
});

/** Organization/LocalBusiness já está no layout raiz — aqui só breadcrumb + FAQPage. */
export default function ContatoPage() {
  return (
    <>
      <HeroContato />
      <AtalhosPorLinha />
      <EnderecoMapa />
      <OQueEnviar />
      <FaqAtendimento />
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: ROTAS.home },
            { name: "Contato", path: ROTAS.contato },
          ]),
          faqJsonLd(FAQ_CONTATO),
        ]}
      />
    </>
  );
}
