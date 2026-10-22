import { CloudRain, FileSignature } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { IconSol } from "@/components/icons";
import { VEDACAP_PROBLEMA } from "@/content/vedacap";

/** Grafismo de telha metálica (nervuras verticais a 3,5%). */
const TELHA_STYLE = {
  backgroundImage: "repeating-linear-gradient(90deg, rgb(255 255 255 / 0.035) 0 2px, transparent 2px 48px)",
} as const;

function Icone({ tipo, className }: { tipo: "sol" | "chuva" | "garantia"; className?: string }) {
  if (tipo === "sol") return <IconSol className={className} />;
  if (tipo === "chuva") return <CloudRain className={className} aria-hidden strokeWidth={1.5} />;
  return <FileSignature className={className} aria-hidden strokeWidth={1.5} />;
}

/** Seção "problema-parafuso": o fato do ressecamento em 3 cards numerados. */
export function ProblemaParafuso() {
  return (
    <section id="problema-parafuso" data-linha="vedacap" className="bg-fundo py-20 sm:py-28" style={TELHA_STYLE}>
      <Container>
        <SectionHeading eyebrow={VEDACAP_PROBLEMA.eyebrow} title={VEDACAP_PROBLEMA.titulo} subtitle={VEDACAP_PROBLEMA.intro} destaque="cerca de 10 anos" />
        <ul className="grid gap-4 md:grid-cols-3">
          {VEDACAP_PROBLEMA.cards.map((c, i) => (
            <Reveal key={c.id} as="li" delay={i * 90} className="flex">
              <ChapaCard numero={String(i + 1).padStart(2, "0")} className="flex w-full flex-col">
                <span className="flex size-12 items-center justify-center rounded-xl bg-navy text-branco">
                  <Icone tipo={c.icone} className="size-6" />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-branco">{c.titulo}</h3>
                <p className="mt-3 text-sm leading-relaxed text-aco">{c.texto}</p>
              </ChapaCard>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
