import Image from "next/image";
import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/(painel)/dashboard/actions";
import { img } from "@/lib/media";
import { SITE } from "@/lib/site";

/** Topo fixo do painel: logo da Pacheco, link para o site e sair. Faixa inferior no gradiente da logo. */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const logo = img("logos/pacheco-gradiente");
  return (
    <>
      <header className="sticky top-0 z-40 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="flex items-center gap-3" aria-label={`${SITE.nome} — painel`}>
            <Image src={logo.src} alt={SITE.nome} width={logo.width} height={logo.height} priority className="h-8 w-auto" />
            <span aria-hidden className="h-5 w-px bg-line" />
            <span className="text-xs font-semibold tracking-[0.18em] text-brand-action uppercase">Painel</span>
          </Link>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-muted transition-colors hover:bg-brand-tint hover:text-brand-hover"
            >
              Ver site
              <ExternalLink aria-hidden className="size-3.5" />
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-muted transition-colors hover:bg-brand-tint hover:text-brand-hover"
              >
                <LogOut aria-hidden className="size-3.5" />
                Sair
              </button>
            </form>
          </div>
        </div>
        <span aria-hidden className="faixa-sol absolute inset-x-0 bottom-0 h-[3px]" />
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
