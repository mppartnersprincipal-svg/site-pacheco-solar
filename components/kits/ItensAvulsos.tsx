import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { CatalogoAvulsos, type ItemCatalogo } from "@/components/kits/CatalogoAvulsos";
import { ITENS_AVULSOS_SECAO } from "@/content/kits";

interface ItensAvulsosProps {
  itens: ItemCatalogo[];
}

/** Seção "itens-avulsos" (data-linha="avulso"): cabeçalho + catálogo filtrável. */
export function ItensAvulsos({ itens }: ItensAvulsosProps) {
  return (
    <section id="itens-avulsos" data-linha="avulso" className="bg-superficie py-20 sm:py-28">
      <Container>
        <SectionHeading eyebrow={ITENS_AVULSOS_SECAO.eyebrow} title={ITENS_AVULSOS_SECAO.titulo} subtitle={ITENS_AVULSOS_SECAO.sub} destaque="A gente tem." />
        <Reveal delay={80}>
          <CatalogoAvulsos itens={itens} />
        </Reveal>
        <Reveal delay={120}>
          <p className="mt-8 max-w-2xl border-l-2 border-linha pl-4 text-sm leading-relaxed text-aco">{ITENS_AVULSOS_SECAO.aviso}</p>
        </Reveal>
      </Container>
    </section>
  );
}
