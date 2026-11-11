import Image from "next/image";
import { LoginForm } from "@/components/dashboard/LoginForm";
import { img } from "@/lib/media";
import { SITE } from "@/lib/site";

export const metadata = { title: { absolute: "Entrar no painel | Pacheco Solar" } };

export default function LoginPage() {
  const logo = img("logos/pacheco-gradiente");
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <Image src={logo.src} alt={SITE.nome} width={logo.width} height={logo.height} priority className="mx-auto h-14 w-auto" />
          <span aria-hidden className="faixa-sol mx-auto mt-5 block h-1 w-12 rounded-full" />
          <h1 className="mt-5 font-display text-2xl font-bold text-ink">Painel do site</h1>
          <p className="mt-1 text-sm text-ink-muted">Visitas, origens e cliques no WhatsApp — uso interno.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
