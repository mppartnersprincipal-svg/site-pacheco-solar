import QRCode from "qrcode";
import { waLinhaLink } from "@/lib/whatsapp";
import { CONTATO_HERO } from "@/content/contato";

/**
 * QR code do wa.me (linha "geral") gerado no servidor em SVG. Só aparece em
 * telas ≥ 1024px (no celular o botão já abre o WhatsApp). "use cache": o
 * resultado é determinístico e entra no shell estático do Cache Components.
 */
export async function QrWhatsApp() {
  "use cache";
  const svg = await QRCode.toString(waLinhaLink("geral"), {
    type: "svg",
    margin: 1,
    color: { dark: "#0f0f10", light: "#e9eaec" },
  });
  return (
    <figure className="hidden lg:block">
      <div className="chanfro border border-placa-clara/60 bg-placa-clara p-5 text-preto">
        <div
          role="img"
          aria-label={`${CONTATO_HERO.qrTitulo}: ${CONTATO_HERO.qrLegenda}`}
          className="mx-auto w-44 [&>svg]:h-auto [&>svg]:w-full"
          dangerouslySetInnerHTML={{ __html: svg }}
        />
        <figcaption className="mt-4 text-center">
          <p className="font-display text-sm font-semibold text-preto">{CONTATO_HERO.qrTitulo}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-preto/60">{CONTATO_HERO.qrLegenda}</p>
        </figcaption>
      </div>
    </figure>
  );
}
