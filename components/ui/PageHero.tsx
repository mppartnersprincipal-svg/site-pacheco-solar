import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { cn } from "@/lib/utils";

type Img = { src: string; width: number; height: number; blurDataURL?: string };

/**
 * Hero das páginas internas: foto real (overlay só na área de texto, nunca
 * duotone) ou render em card claro; eyebrow mono, H1, sub, placas e CTAs.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt,
  imagePosition = "center",
  placas,
  children,
  render = false,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  image?: Img;
  imageAlt?: string;
  imagePosition?: string;
  placas?: string[];
  children?: React.ReactNode;
  /** true = render 3D em card claro ao lado (em vez de foto de fundo) */
  render?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-fundo grade-modulos">
      {image && !render ? (
        <>
          <Image
            src={image.src}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            quality={60}
            placeholder={image.blurDataURL ? "blur" : undefined}
            blurDataURL={image.blurDataURL}
            className="object-cover"
            style={{ objectPosition: imagePosition }}
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-fundo via-fundo/85 to-fundo/30" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-fundo via-transparent to-fundo/40" />
        </>
      ) : null}
      <Container className={cn("relative py-20 sm:py-28", render && "grid items-center gap-10 lg:grid-cols-12")}>
        <div className={cn(render && "lg:col-span-7")}>
          <Reveal imediato>
            <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{eyebrow}</p>
          </Reveal>
          <Reveal imediato delay={80}>
            <h1 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">{title}</h1>
          </Reveal>
          {subtitle ? (
            <Reveal imediato delay={160}>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-aco sm:text-lg">{subtitle}</p>
            </Reveal>
          ) : null}
          {placas?.length ? (
            <Reveal imediato delay={220}>
              <div className="mt-6 flex flex-wrap gap-2">
                {placas.map((p) => (
                  <PlacaIdentificacao key={p} size="sm">
                    {p}
                  </PlacaIdentificacao>
                ))}
              </div>
            </Reveal>
          ) : null}
          {children ? (
            <Reveal imediato delay={280}>
              <div className="mt-8 flex flex-wrap gap-3">{children}</div>
            </Reveal>
          ) : null}
        </div>
        {image && render ? (
          <Reveal imediato delay={200} className="lg:col-span-5">
            <div className="chanfro bg-placa-clara p-2">
              <Image
                src={image.src}
                alt={imageAlt ?? ""}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder={image.blurDataURL ? "blur" : undefined}
                blurDataURL={image.blurDataURL}
                className="h-auto w-full"
              />
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
