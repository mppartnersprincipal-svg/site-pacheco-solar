import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { Reveal } from "@/components/motion/Reveal";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { LINHAS_HOME, VEDACAP, type LinhaHome } from "@/lib/produtos/catalogo";
import { imageProps } from "@/lib/media";
import { ROTAS } from "@/lib/site";
import { LINHAS_SECAO } from "@/content/home";

/**
 * Seção 3 — 3 cards de foto (solo, telhado, kits e avulsos) + faixa "Novo" do
 * Vedacap. Mobile: carrossel scroll-snap; desktop: 3 colunas. O card inteiro é
 * o link para a linha; o orçamento fica no header, no botão flutuante e no fechamento.
 */
export function LinhasDeProduto() {
  const vedacapLogo = imageProps("logos/vedacap-branco", "Logo do Vedacap");
  return (
    <section id="linhas-de-produto" data-linha="geral" className="scroll-mt-20 bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={LINHAS_SECAO.eyebrow} title={LINHAS_SECAO.titulo} destaque="estrutura certa" />
        <ul
          aria-label="Linhas de produto"
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0 md:gap-6"
        >
          {LINHAS_HOME.map((item, i) => (
            <Reveal key={item.id} as="li" delay={i * 80} className="w-[80vw] max-w-[380px] shrink-0 snap-start md:w-auto md:max-w-none">
              <CardLinha item={item} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={240} className="mt-6">
          <Link
            href={ROTAS.vedacap}
            data-cta="card-vedacap"
            className="group flex flex-col gap-6 overflow-hidden rounded-2xl border border-navy bg-navy p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-ciano sm:flex-row sm:items-center sm:justify-between sm:p-8"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
              <PlacaIdentificacao variant="laranja" size="sm" className="w-fit">
                {LINHAS_SECAO.placaNovo}
              </PlacaIdentificacao>
              <div>
                <p className="font-display text-2xl font-bold text-branco sm:text-3xl">{VEDACAP.nome}</p>
                <p className="mt-1 text-base text-branco/80">{VEDACAP.headline}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <Image src={vedacapLogo.src} alt={vedacapLogo.alt} width={vedacapLogo.width} height={vedacapLogo.height} className="hidden h-14 w-auto opacity-90 lg:block" />
              <span className="inline-flex items-center gap-2 font-sans font-semibold text-branco">
                {LINHAS_SECAO.vedacapCta}
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}

function CardLinha({ item }: { item: LinhaHome }) {
  const foto = imageProps(item.imagem, item.imagemAlt);
  return (
    <LinkInterno href={item.href} ctaId={`card-${item.id}`} variant="texto" className="group block h-full min-h-0 p-0 hover:no-underline">
      <article className="relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl border border-linha bg-chapa transition-[border-color,transform] duration-200 group-hover:-translate-y-0.5 group-hover:border-laranja/60">
        <Image
          src={foto.src}
          alt={foto.alt}
          fill
          quality={60}
          placeholder={foto.placeholder}
          blurDataURL={foto.blurDataURL}
          sizes="(min-width: 1280px) 400px, (min-width: 768px) 33vw, 80vw"
          className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta via-tinta/55 to-tinta/5" />
        <div className="relative p-6 sm:p-7">
          <p className="font-sans text-xs font-bold tracking-[0.2em] text-laranja-texto">{item.numero}</p>
          <h3 className="mt-2 font-display text-2xl font-bold leading-tight text-branco sm:text-3xl">{item.nome}</h3>
          <p className="mt-2 text-base text-branco/80">{item.frase}</p>
          <span className="mt-5 inline-flex items-center gap-2 font-sans font-semibold text-branco">
            {LINHAS_SECAO.verLinha}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
          </span>
        </div>
      </article>
    </LinkInterno>
  );
}
