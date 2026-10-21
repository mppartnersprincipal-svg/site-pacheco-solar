import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { GaleriaEmCampo } from "@/components/nicho/GaleriaEmCampo";
import { AntesDepoisEstaca } from "@/components/nicho/AntesDepoisEstaca";
import { SequenciaMontagem } from "@/components/nicho/SequenciaMontagem";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { CLIPES, imageProps } from "@/lib/media";
import { ANTES_DEPOIS, SEQUENCIA_MONTAGEM } from "@/lib/obras";
import { CAMPO } from "@/content/home";

const QTD_CLIPES = 6;

/**
 * Seção 4 — prova de campo: clipes reais (SOLO DUPLA), antes/depois da obra em
 * fazenda (fotos com proporções diferentes → lado a lado) e a sequência de
 * montagem estacas → perfis → módulos. Legendas TIPO · LOCAL · ANO.
 */
export function EstruturaEmCampo() {
  const clipes = CLIPES.slice(0, QTD_CLIPES).map((c) => ({ ...c, legenda: `${c.legenda} · ${CAMPO.legendaLocalAno}` }));
  const antes = imageProps(ANTES_DEPOIS.antes.key, ANTES_DEPOIS.antes.alt);
  const depois = imageProps(ANTES_DEPOIS.depois.key, ANTES_DEPOIS.depois.alt);
  const etapas = SEQUENCIA_MONTAGEM.map((e) => ({ ...imageProps(e.key, e.alt), etapa: e.etapa }));

  return (
    <section id="estrutura-em-campo" data-linha="solo" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={CAMPO.eyebrow} title={CAMPO.titulo} subtitle={CAMPO.subtitulo} destaque="engenharia" />

        <Reveal>
          <GaleriaEmCampo clipes={clipes} />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-16 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{CAMPO.tituloAntesDepois}</p>
            <AntesDepoisEstaca antes={antes} depois={depois} legenda={CAMPO.legendaAntesDepois} ladoALado />
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5">
            <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{CAMPO.tituloSequencia}</p>
            <SequenciaMontagem etapas={etapas} />
            <p className="mt-3 font-mono text-xs uppercase tracking-[0.14em] text-aco">Solo linear · {CAMPO.legendaLocalAno}</p>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-linha pt-8">
            <WaButton linha="solo" ctaId="campo-solo" posicao="estrutura-em-campo">
              {CAMPO.ctaWhatsApp}
            </WaButton>
            <LinkInterno href={CAMPO.ctaObrasHref} ctaId="campo-obras">
              {CAMPO.ctaObras}
              <ArrowRight className="size-4" aria-hidden />
            </LinkInterno>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
