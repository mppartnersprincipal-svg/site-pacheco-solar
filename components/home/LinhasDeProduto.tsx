import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { TrilhoDivisor } from "@/components/nicho/TrilhoDivisor";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { LINHAS, type LinhaProduto } from "@/lib/produtos/catalogo";
import { imageProps } from "@/lib/media";
import { LINHAS_SECAO } from "@/content/home";
import { cn } from "@/lib/utils";

/** Renders 3D ficam em card claro ("ficha técnica"); fotos reais em chapa escura; Vedacap em navy. */
const FUNDO_IMAGEM: Record<LinhaProduto["id"], string> = {
  solo: "bg-superficie",
  telhado: "bg-placa-clara",
  kits: "bg-placa-clara",
  avulsos: "bg-superficie",
  vedacap: "bg-navy",
};

/** Grid 12 colunas: 01 e 02 com 6; 03, 04 e 05 com 4 (lg). No md, 2 por linha e o 05 ocupa a largura. */
const COLUNAS: Record<LinhaProduto["id"], string> = {
  solo: "md:col-span-6",
  telhado: "md:col-span-6",
  kits: "md:col-span-6 lg:col-span-4",
  avulsos: "md:col-span-6 lg:col-span-4",
  vedacap: "md:col-span-12 lg:col-span-4",
};

/**
 * Seção 3 — índice do catálogo (05 linhas). Mobile: carrossel scroll-snap;
 * desktop: grid 12 colunas. Cada card tem "Ver linha" e "Orçamento desta linha".
 */
export function LinhasDeProduto() {
  return (
    <section id="linhas-de-produto" data-linha="geral" className="scroll-mt-20 bg-fundo">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={LINHAS_SECAO.eyebrow} title={LINHAS_SECAO.titulo} destaque="estrutura certa" />
        <TrilhoDivisor className="mb-10 sm:mb-12" ativo />
        <ul
          aria-label="Linhas de produto"
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-12 md:overflow-visible md:px-0 md:pb-0 md:gap-5"
        >
          {LINHAS.map((item, i) => (
            <Reveal key={item.id} as="li" delay={i * 60} className={cn("w-[82vw] max-w-[380px] shrink-0 snap-start md:w-auto md:max-w-none", COLUNAS[item.id])}>
              <CardLinha item={item} grande={item.id === "solo" || item.id === "telhado"} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}

function CardLinha({ item, grande }: { item: LinhaProduto; grande: boolean }) {
  const foto = imageProps(item.imagem, item.imagemAlt);
  const isVedacap = item.id === "vedacap";
  return (
    <ChapaCard as="article" numero={item.numero} interactive className="group flex h-full flex-col">
      {/* Imagem sangrando até as bordas da chapa (anula o padding do ChapaCard) */}
      <div className={cn("relative -mx-6 -mt-6 overflow-hidden sm:-mx-7 sm:-mt-7", FUNDO_IMAGEM[item.id], grande ? "aspect-[16/10]" : "aspect-[4/3]")}>
        <Image
          src={foto.src}
          alt={foto.alt}
          width={foto.width}
          height={foto.height}
          quality={60}
          placeholder={isVedacap ? undefined : foto.placeholder}
          blurDataURL={isVedacap ? undefined : foto.blurDataURL}
          sizes={grande ? "(min-width: 1280px) 580px, (min-width: 768px) 50vw, 82vw" : "(min-width: 1280px) 380px, (min-width: 768px) 50vw, 82vw"}
          className={cn(
            "h-full w-full transition-transform duration-500 ease-out motion-safe:lg:group-hover:scale-[1.03]",
            isVedacap ? "object-contain p-10" : "object-cover"
          )}
        />
        {item.novo ? (
          <PlacaIdentificacao variant="laranja" size="sm" className="absolute top-4 left-4">
            {LINHAS_SECAO.placaNovo}
          </PlacaIdentificacao>
        ) : null}
        {!isVedacap ? <div aria-hidden className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-chapa to-transparent" /> : null}
      </div>
      <div className="flex flex-1 flex-col pt-6 sm:pt-7">
        <h3 className={cn("font-display font-bold leading-tight text-branco", grande ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl")}>{item.nome}</h3>
        <p className="mt-2 text-base leading-relaxed text-aco">{item.frase}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Variantes">
          {item.chips.map((chip) => (
            <li key={chip} className="border border-linha px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-aco">
              {chip}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-6">
          <WaButton linha={item.linha} ctaId={`card-${item.id}`} posicao="linhas-de-produto" size="md">
            {LINHAS_SECAO.orcamento}
          </WaButton>
          <LinkInterno href={item.href} ctaId={`card-${item.id}-ver`} variant="texto">
            {LINHAS_SECAO.verLinha}
            <ArrowRight className="size-4" aria-hidden />
          </LinkInterno>
        </div>
      </div>
    </ChapaCard>
  );
}
