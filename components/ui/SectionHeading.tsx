import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

/** Cabeçalho de seção: eyebrow mono + H2 display + subtítulo. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  destaque,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  /** Palavra do título a destacar em laranja (primeira ocorrência) */
  destaque?: string;
}) {
  const parts = destaque && title.includes(destaque) ? title.split(destaque) : null;
  return (
    <Reveal className={cn("mb-10 max-w-3xl sm:mb-14", align === "center" ? "mx-auto text-center" : "text-left", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl font-bold leading-[1.05] sm:text-4xl lg:text-5xl">
        {parts ? (
          <>
            {parts[0]}
            <span className="text-laranja">{destaque}</span>
            {parts.slice(1).join(destaque)}
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-aco sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
