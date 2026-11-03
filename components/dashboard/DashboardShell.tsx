import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { logout } from "@/app/(painel)/dashboard/actions";
import { SITE } from "@/lib/site";

/** Topo fixo do painel: marca, link para o site e sair. */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-surface/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-base font-bold text-ink">{SITE.nome}</span>
            <span className="text-xs font-semibold tracking-[0.18em] text-brand-action uppercase">Painel</span>
          </div>
          <div className="flex items-center gap-1">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
            >
              Ver site
              <ExternalLink aria-hidden className="size-3.5" />
            </Link>
            <form action={logout}>
              <button
                type="submit"
                className="inline-flex min-h-9 cursor-pointer items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-ink-muted transition-colors hover:bg-surface-alt hover:text-ink"
              >
                <LogOut aria-hidden className="size-3.5" />
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
