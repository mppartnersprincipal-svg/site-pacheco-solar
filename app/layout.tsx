import type { Metadata } from "next";
import { Archivo, Manrope } from "next/font/google";
import { SITE_NAME, TITLE_DEFAULT } from "@/lib/seo";
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

/**
 * Raiz: só html/body, fontes e CSS. O site público vive em app/(site)
 * (header, footer, GTM, Lenis…) e o painel interno em app/(painel)/dashboard.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${archivo.variable} ${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-fundo text-branco">{children}</body>
    </html>
  );
}
