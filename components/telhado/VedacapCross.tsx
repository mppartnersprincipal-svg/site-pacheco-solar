import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { buttonClasses } from "@/components/ui/Button";
import { VEDACAP_CROSS } from "@/content/telhado";
import { imageProps } from "@/lib/media";

/** Faixa navy de cross-sell do Vedacap (telhado metálico → proteger o parafuso). */
export function VedacapCross() {
  const logo = imageProps("logos/vedacap-branco", VEDACAP_CROSS.logoAlt);
  return (
    <section id="vedacap-cross" data-linha="vedacap" className="relative overflow-hidden bg-navy text-branco">
      <div aria-hidden className="absolute inset-0 grade-modulos opacity-70" />
      <Container className="relative grid items-center gap-8 py-16 sm:py-20 lg:grid-cols-12">
        <Reveal className="lg:col-span-3">
          <div className="mx-auto w-28 sm:w-36 lg:mx-0 lg:w-40">
            <Image {...logo} sizes="(min-width: 1024px) 160px, 144px" className="h-auto w-full" />
          </div>
        </Reveal>
        <div className="lg:col-span-9">
          <Reveal>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-branco/70">{VEDACAP_CROSS.eyebrow}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="max-w-2xl font-display text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">{VEDACAP_CROSS.titulo}</h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-branco/85 sm:text-lg">
              {VEDACAP_CROSS.texto} <span className="font-semibold text-branco">{VEDACAP_CROSS.prontaEntrega}</span>
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-7">
              <TrackedLink
                href={VEDACAP_CROSS.href}
                ctaId="vedacap-cross-conhecer"
                track={{ kind: "nav", destino: VEDACAP_CROSS.href }}
                className={buttonClasses("primary", "lg")}
              >
                {VEDACAP_CROSS.link}
                <ArrowRight className="size-5" aria-hidden />
              </TrackedLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
