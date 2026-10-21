import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { IconCapacete, IconLoja, IconTelha } from "@/components/icons";
import { VEDACAP_PUBLICOS } from "@/content/vedacap";

const ICONES = {
  integrador: IconCapacete,
  telhadista: IconTelha,
  lojista: IconLoja,
} as const;

/** Seção "para-quem": 3 públicos, cada um com a linha de WhatsApp própria. */
export function ParaQuem() {
  return (
    <section id="para-quem" data-linha="vedacap" className="bg-fundo py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={VEDACAP_PUBLICOS.eyebrow} title={VEDACAP_PUBLICOS.titulo} />
        <ul className="grid gap-4 md:grid-cols-3">
          {VEDACAP_PUBLICOS.publicos.map((p, i) => {
            const Icone = ICONES[p.id];
            const lojista = p.id === "lojista";
            return (
              <Reveal key={p.id} as="li" delay={i * 90} className="flex">
                <ChapaCard numero={String(i + 1).padStart(2, "0")} className="flex w-full flex-col" interactive>
                  <span className={lojista ? "flex size-12 items-center justify-center chanfro-sm bg-navy text-branco" : "flex size-12 items-center justify-center chanfro-sm bg-laranja text-preto"}>
                    <Icone className="size-6" />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold leading-snug text-branco">{p.nome}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-aco">{p.texto}</p>
                  <div className="mt-auto pt-6">
                    <WaButton
                      linha={p.linha}
                      publico={p.id}
                      ctaId={`para-quem-${p.id}`}
                      posicao="para-quem"
                      size="md"
                      variant={lojista ? "secondary" : "primary"}
                      className="w-full"
                    >
                      {VEDACAP_PUBLICOS.ctas[p.id]}
                    </WaButton>
                  </div>
                </ChapaCard>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
