import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { buttonClasses } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { GaleriaEmCampo } from "@/components/nicho/GaleriaEmCampo";
import { SOLO_EM_CAMPO } from "@/content/solo";
import { FLAGS } from "@/config/feature-flags";
import { CLIPES, imageProps } from "@/lib/media";
import { FOTOS_OBRAS } from "@/lib/obras";
import { cn } from "@/lib/utils";

const FOTOS_CAMPO = 6;

/**
 * Prova de campo da linha de solo: clipes reais (GaleriaEmCampo) + grid de 6
 * fotos da obra em fazenda. Enquanto FLAGS.citarObraCocalinho for false, a
 * legenda não cita cliente nem cidade e a nota de autorização fica visível.
 */
export function SoloEmCampo() {
  const fotos = FOTOS_OBRAS.filter((f) => f.tipo === "fazenda" && f.key.startsWith("obras-cocalinho/"))
    .slice(0, FOTOS_CAMPO)
    .map((f) => ({ ...imageProps(f.key, f.alt), legenda: f.legenda, retrato: f.retrato === true }));

  return (
    <section id="solo-em-campo" data-linha="solo" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={SOLO_EM_CAMPO.eyebrow} title={SOLO_EM_CAMPO.titulo} subtitle={SOLO_EM_CAMPO.subtitulo} destaque="você entrega" />

        <GaleriaEmCampo clipes={CLIPES.slice(4)} />

        <ul className="mt-10 grid grid-flow-dense auto-rows-[160px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-3 sm:gap-4 lg:auto-rows-[240px]">
          {fotos.map((f, i) => (
            <Reveal key={f.src} as="li" delay={i * 60} className={cn("relative chanfro-sm overflow-hidden border border-linha bg-superficie", f.retrato && "row-span-2")}>
              <Image src={f.src} alt={f.alt} fill sizes="(min-width: 640px) 33vw, 50vw" placeholder="blur" blurDataURL={f.blurDataURL} className="object-cover" />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-fundo/90 to-transparent px-3 pb-2.5 pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-branco">
                {f.legenda}
              </span>
            </Reveal>
          ))}
        </ul>

        {!FLAGS.citarObraCocalinho ? (
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.14em] text-aco">{SOLO_EM_CAMPO.notaAutorizacao}</p>
        ) : null}

        <Reveal delay={200} className="mt-10 flex flex-wrap items-center gap-3">
          <WaButton linha="solo" ctaId="solo-em-campo-orcamento" posicao="solo-em-campo">
            {SOLO_EM_CAMPO.cta}
          </WaButton>
          <Link href={SOLO_EM_CAMPO.linkObras.href} className={buttonClasses("secondary", "lg")}>
            {SOLO_EM_CAMPO.linkObras.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
