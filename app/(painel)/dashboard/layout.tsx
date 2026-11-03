import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Painel | Pacheco Solar" },
  robots: { index: false, follow: false, nocache: true },
};

/** Painel interno: tema claro (tokens ink/line/surface) e sem o chrome do site. */
export default function PainelLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-painel className="min-h-screen flex-1 font-sans">
      {children}
    </div>
  );
}
