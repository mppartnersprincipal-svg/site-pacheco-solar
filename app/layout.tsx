import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { CookieBanner } from "@/components/layout/CookieBanner";
import { BotaoWhatsAppInteligente } from "@/components/cta/BotaoWhatsAppInteligente";
import { MotionProvider } from "@/components/motion/MotionProvider";
import { GtmNoScript, TrackingProvider } from "@/components/tracking/TrackingProvider";
import { JsonLd } from "@/components/seo/JsonLd";
import { ORGANIZATION_JSONLD, SITE_NAME, TITLE_DEFAULT } from "@/lib/seo";
import { img } from "@/lib/media";
import { SITE, SITE_URL } from "@/lib/site";
import "./globals.css";

// Archivo (display, pesada e fechada) + Manrope (corpo): o mesmo par da referência aprovada pelo Lucas
const archivo = Archivo({ subsets: ["latin"], weight: ["600", "700", "800"], variable: "--font-archivo", display: "swap" });
const manrope = Manrope({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: TITLE_DEFAULT, template: `%s | ${SITE_NAME}` },
  description: SITE.descricao,
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: SITE_NAME,
    title: TITLE_DEFAULT,
    description: SITE.descricao,
  },
  twitter: { card: "summary_large_image", title: TITLE_DEFAULT, description: SITE.descricao },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const logo = img("logos/pacheco-branco");
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-fundo text-branco">
        <GtmNoScript />
        <a
          href="#conteudo"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-laranja focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-branco"
        >
          Pular para o conteúdo
        </a>
        <Header logo={{ src: logo.src, width: logo.width, height: logo.height }} />
        <main id="conteudo" className="flex-1">
          {children}
        </main>
        <Footer logo={{ src: logo.src, width: logo.width, height: logo.height }} />
        <BotaoWhatsAppInteligente />
        <CookieBanner />
        <TrackingProvider />
        <SmoothScroll />
        <MotionProvider />
        <JsonLd data={ORGANIZATION_JSONLD} />
      </body>
    </html>
  );
}
