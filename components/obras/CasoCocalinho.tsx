import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { WaButton } from "@/components/cta/WaButton";
import { AntesDepoisEstaca } from "@/components/nicho/AntesDepoisEstaca";
import { SequenciaMontagem } from "@/components/nicho/SequenciaMontagem";
import { CASO_COCALINHO } from "@/content/obras";
import { imageProps } from "@/lib/media";
import { ANTES_DEPOIS, SEQUENCIA_MONTAGEM } from "@/lib/obras";

/**
 * Caso em destaque: par antes/depois (lado a lado — proporções diferentes) +
 * sequência de montagem. A legenda nunca cita cliente nem cidade enquanto
 * FLAGS.citarObraCocalinho for false (content/obras.ts resolve o texto).
 */
export function CasoCocalinho() {
  const antes = imageProps(ANTES_DEPOIS.antes.key, ANTES_DEPOIS.antes.alt);
  const depois = imageProps(ANTES_DEPOIS.depois.key, ANTES_DEPOIS.depois.alt);
  const etapas = SEQUENCIA_MONTAGEM.map((e) => ({ ...imageProps(e.key, e.alt), etapa: e.etapa }));

  return (
    <section id="caso-fazenda" data-linha="obra" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={CASO_COCALINHO.eyebrow} title={CASO_COCALINHO.titulo} subtitle={CASO_COCALINHO.subtitulo} destaque="módulo" />
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-7">
            <AntesDepoisEstaca antes={antes} depois={depois} legenda={CASO_COCALINHO.legenda} ladoALado />
          </Reveal>
          <Reveal delay={120} className="lg:col-span-5">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-laranja-texto">{CASO_COCALINHO.sequenciaTitulo}</p>
            <SequenciaMontagem etapas={etapas} />
          </Reveal>
        </div>
        <Reveal delay={200} className="mt-10">
          <WaButton linha="obra" ctaId="caso-fazenda-obra-parecida" posicao="caso-fazenda">
            {CASO_COCALINHO.cta}
          </WaButton>
        </Reveal>
      </Container>
    </section>
  );
}
