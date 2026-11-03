import { LoginForm } from "@/components/dashboard/LoginForm";
import { SITE } from "@/lib/site";

export const metadata = { title: { absolute: "Entrar no painel | Pacheco Solar" } };

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-brand-action uppercase">{SITE.nome}</p>
          <h1 className="mt-2 font-display text-2xl font-bold text-ink">Painel do site</h1>
          <p className="mt-1 text-sm text-ink-muted">Visitas, origens e cliques no WhatsApp — uso interno.</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
