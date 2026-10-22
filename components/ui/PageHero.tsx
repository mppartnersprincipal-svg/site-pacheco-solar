import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { cn } from "@/lib/utils";

type Img = { src: string; width: number; height: number; blurDataURL?: string };

/**
 * Hero das páginas internas: foto real full-bleed com o gradiente do hero
 * (escuro à esquerda, foto respirando à direita) ou render em card claro;
 * eyebrow laranja, H1 display, sub curto, selos em pílula e CTAs.
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
    <section className="relative overflow-hidden bg-fundo">
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
          <div aria-hidden className="absolute inset-0 gradiente-hero" />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-fundo to-transparent" />
        </>
      ) : (
        <div aria-hidden className="absolute inset-0 brilho opacity-60" />
      )}
      <Container className={cn("relative py-24 sm:py-32", render && "grid items-center gap-10 lg:grid-cols-12")}>
        <div className={cn(render && "lg:col-span-7")}>
          <Reveal imediato>
            <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-laranja-texto">{eyebrow}</p>
          </Reveal>
          <Reveal imediato delay={80}>
            <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">{title}</h1>
          </Reveal>
          {subtitle ? (
            <Reveal imediato delay={160}>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-branco/80 sm:text-lg">{subtitle}</p>
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
            <div className="overflow-hidden rounded-2xl bg-placa-clara p-2">
              <Image
                src={image.src}
                alt={imageAlt ?? ""}
                width={image.width}
                height={image.height}
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                placeholder={image.blurDataURL ? "blur" : undefined}
                blurDataURL={image.blurDataURL}
                className="h-auto w-full rounded-xl"
              />
            </div>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
