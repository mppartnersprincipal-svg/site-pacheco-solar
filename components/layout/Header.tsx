"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
    <span className="rounded-full bg-laranja px-1.5 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wider text-branco">
      {children}
    </span>
  );
}

const semInscricao = () => () => {};
const montadoNoCliente = () => true;
const montadoNoServidor = () => false;

/**
 * Header fixo: logo branca | navegação centralizada | CTA em pílula. Fundo
 * petróleo translúcido com blur; a linha laranja do topo é uma barra de
 * progresso de leitura em CSS puro (.progresso-scroll).
 */
export function Header({ logo }: { logo: Logo }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mounted = useSyncExternalStore(semInscricao, montadoNoCliente, montadoNoServidor);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Troca de rota fecha o drawer (ajuste de estado derivado de prop, durante o render)
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
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
        "sticky top-0 z-40 border-b border-linha bg-fundo/75 backdrop-blur-md transition-shadow",
        scrolled && "shadow-lg shadow-tinta/40"
      )}
    >
      <div aria-hidden className="progresso-scroll h-0.5 w-full bg-laranja" />
      <Container
        className={cn(
          "grid grid-cols-[auto_1fr_auto] items-center gap-4 transition-[padding] duration-300",
          scrolled ? "py-2.5" : "py-4"
        )}
      >
        <Link
          href={ROTAS.home}
          aria-label="Pacheco Solar, página inicial"
          className="shrink-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azul-idv"
        >
          <Image
            src={logo.src}
            alt="Pacheco Solar"
            width={logo.width}
            height={logo.height}
            priority
            className={cn("h-auto transition-[width] duration-300", scrolled ? "w-28" : "w-32 sm:w-36")}
          />
        </Link>

        <nav aria-label="Navegação principal" className="hidden justify-center lg:flex">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => trackNavigation({ destino: link.href, origem: "header" })}
                  className={cn(
                    "relative inline-flex items-center gap-1.5 py-1 font-sans text-sm font-medium transition-colors hover:text-branco focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-azul-idv",
                    isActive(link.href)
                      ? "text-branco after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-laranja"
                      : "text-branco/75"
                  )}
                >
                  {link.label}
                  {"badge" in link && link.badge ? <Badge>{link.badge}</Badge> : null}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex shrink-0 items-center justify-end gap-2">
          <WaButton ctaId="header-whatsapp" posicao="header" size="md" withIcon={false} className="max-sm:hidden">
            Pedir orçamento
          </WaButton>
          <WaButton ctaId="header-whatsapp-mobile" posicao="header" size="md" className="px-3! sm:hidden">
            <span className="sr-only">WhatsApp</span>
          </WaButton>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={open}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-branco transition-colors hover:bg-branco/10 focus-visible:outline-2 focus-visible:outline-azul-idv lg:hidden"
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
                  className="absolute inset-0 bg-tinta/70 backdrop-blur-sm"
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
                    <Image src={logo.src} alt="Pacheco Solar" width={logo.width} height={logo.height} className="h-auto w-28" />
                    <button
                      ref={closeRef}
                      type="button"
                      onClick={() => setOpen(false)}
                      aria-label="Fechar menu"
                      className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-branco hover:bg-branco/10 focus-visible:outline-2 focus-visible:outline-azul-idv"
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
                              "flex items-center justify-between rounded-xl px-3 py-3 font-sans text-lg font-semibold transition-colors hover:bg-branco/5 focus-visible:outline-2 focus-visible:outline-azul-idv",
                              isActive(link.href) ? "bg-branco/5 text-branco" : "text-branco/75 hover:text-branco"
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
                  <p className="mt-3 text-center text-xs text-aco">
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
