"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { animated, useTransition } from "@react-spring/web";
import { Menu, X } from "lucide-react";
import { WaButton } from "@/components/cta/WaButton";
import { Container } from "@/components/ui/Container";
import { NAV_LINKS, ROTAS, SITE } from "@/lib/site";
import { trackNavigation } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Logo = { src: string; width: number; height: number };

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-laranja px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-preto">
      {children}
    </span>
  );
}

export function Header({ logo }: { logo: Logo }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Drawer: Esc fecha, foco vai para o botão de fechar e volta ao fechar
  useEffect(() => {
    if (!open) return;
    const prev = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      prev?.focus();
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const transitions = useTransition(open, {
    from: { opacity: 0, x: 100 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: 100 },
    config: { tension: 260, friction: 28 },
  });

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-linha/60 bg-fundo/90 backdrop-blur-sm transition-shadow",
        scrolled && "shadow-lg shadow-black/30"
      )}
    >
      {/* Trilho laranja de 2px — motivo do perfil */}
      <div aria-hidden className="h-0.5 w-full bg-laranja" />
      <Container
        className={cn(
          "flex items-center justify-between gap-4 transition-[padding] duration-300",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <Link
          href={ROTAS.home}
          aria-label="Pacheco Solar, página inicial"
          className="shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azul-idv"
        >
          <Image
            src={logo.src}
            alt="Pacheco Solar"
            width={logo.width}
            height={logo.height}
            priority
            className={cn("h-auto transition-[width] duration-300", scrolled ? "w-32" : "w-36 sm:w-40")}
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden lg:block">
          <ul className="flex items-center gap-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => trackNavigation({ destino: link.href, origem: "header" })}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 py-1 font-display text-sm font-medium tracking-wide transition-colors hover:text-branco focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azul-idv",
                    isActive(link.href)
                      ? "text-branco after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:bg-laranja"
                      : "text-aco"
                  )}
                >
                  {link.label}
                  {"badge" in link && link.badge ? <Badge>{link.badge}</Badge> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <WaButton ctaId="header-whatsapp" posicao="header" size="md" className="max-sm:hidden">
            WhatsApp
          </WaButton>
          <WaButton ctaId="header-whatsapp-mobile" posicao="header" size="md" className="px-3! sm:hidden">
            <span className="sr-only">WhatsApp</span>
          </WaButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="inline-flex size-11 cursor-pointer items-center justify-center text-branco transition-colors hover:bg-branco/10 focus-visible:outline-2 focus-visible:outline-azul-idv lg:hidden"
          >
            <Menu className="size-6" aria-hidden />
          </button>
        </div>
      </Container>

      {mounted &&
        createPortal(
          transitions((style, show) =>
            show ? (
              <animated.div style={{ opacity: style.opacity }} className="fixed inset-0 z-50 lg:hidden">
                <button
                  type="button"
                  aria-label="Fechar menu"
                  tabIndex={-1}
                  className="absolute inset-0 bg-fundo/70 backdrop-blur-sm"
                  onClick={() => setOpen(false)}
                />
                <animated.div
                  role="dialog"
                  aria-modal="true"
                  aria-label="Menu de navegação"
                  style={{ transform: style.x.to((x) => `translate3d(${x}%,0,0)`) }}
                  className="absolute inset-y-0 right-0 flex w-full max-w-xs flex-col border-l border-linha bg-superficie p-6"
                >
                  <div className="mb-8 flex items-center justify-between">
                    <Image src={logo.src} alt="Pacheco Solar" width={logo.width} height={logo.height} className="h-auto w-32" />
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Fechar menu"
                      className="inline-flex size-11 cursor-pointer items-center justify-center text-branco hover:bg-branco/10 focus-visible:outline-2 focus-visible:outline-azul-idv"
                    >
                      <X className="size-6" aria-hidden />
                    </button>
                  </div>
                  <nav aria-label="Navegação principal (celular)" className="flex-1">
                    <ul className="flex flex-col gap-1">
                      {NAV_LINKS.map((link) => (
                        <li key={link.href}>
                          <Link
                            href={link.href}
                            onClick={() => {
                              trackNavigation({ destino: link.href, origem: "menu-mobile" });
                              setOpen(false);
                            }}
                            className={cn(
                              "flex items-center justify-between px-3 py-3 font-display text-lg font-medium transition-colors hover:bg-branco/5 focus-visible:outline-2 focus-visible:outline-azul-idv",
                              isActive(link.href) ? "border-l-2 border-laranja text-branco" : "text-aco hover:text-branco"
                            )}
                          >
                            {link.label}
                            {"badge" in link && link.badge ? <Badge>{link.badge}</Badge> : null}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </nav>
                  <WaButton ctaId="menu-mobile-whatsapp" posicao="menu-mobile" className="w-full">
                    Pedir orçamento no WhatsApp
                  </WaButton>
                  <p className="mt-3 text-center font-mono text-xs text-aco">
                    {SITE.telefone.display} · {SITE.horario}
                  </p>
                </animated.div>
              </animated.div>
            ) : null
          ),
          document.body
        )}
    </header>
  );
}
