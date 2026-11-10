import Image from "next/image";
import { ArrowRight, MapPin } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { LinkInterno } from "@/components/tracking/LinkInterno";
import { imageProps } from "@/lib/media";
import { PROJETOS_DESTAQUE, type ProjetoDestaque } from "@/lib/obras";
import { OBRAS_SECAO } from "@/content/home";

/** Posição de cada card no bento (lg): 1º grande à esquerda, 2º largo em cima, 3º e 4º embaixo. */
const CELULAS_BENTO = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-2",
  "lg:col-span-2",
  "",
  "",
] as const;

const SIZES_GRANDE = "(min-width: 1024px) 600px, (min-width: 640px) 100vw, 100vw";
const SIZES_PEQUENO = "(min-width: 1024px) 300px, (min-width: 640px) 50vw, 100vw";

interface CardProjetoProps {
  projeto: ProjetoDestaque;
  grande: boolean;
}

function CardProjeto({ projeto, grande }: CardProjetoProps) {
  const foto = imageProps(projeto.key, projeto.alt);
  return (
    <figure className="group relative h-full min-h-[22rem] overflow-hidden rounded-2xl border border-linha bg-chapa lg:min-h-0">
      <Image
        src={foto.src}
        alt={foto.alt}
        fill
        quality={75}
        placeholder={foto.placeholder}
        blurDataURL={foto.blurDataURL}
        sizes={grande ? SIZES_GRANDE : SIZES_PEQUENO}
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.04]"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-tinta/90 via-tinta/30 to-transparent" />
      <figcaption className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5 sm:p-6">
        <span className="rounded-full border border-branco/15 bg-tinta/70 px-3.5 py-1.5 font-sans text-xs font-semibold text-laranja-texto backdrop-blur-sm">
          {projeto.estrutura}
        </span>
        {projeto.paineis !== null && (
          <p className="font-display font-extrabold leading-none text-branco">
            <span className={grande ? "text-5xl sm:text-6xl" : "text-4xl"}>{projeto.paineis.toLocaleString("pt-BR")}</span>{" "}
            <span className="font-sans text-base font-semibold text-branco/80">{OBRAS_SECAO.rotuloPaineis}</span>
          </p>
        )}
        {projeto.cidade !== null && (
          <p className="flex items-center gap-1.5 font-sans text-sm font-medium text-branco/85">
            <MapPin className="size-4 text-laranja-texto" aria-hidden />
            {projeto.cidade}
          </p>
        )}
      </figcaption>
    </figure>
  );
}

/** Seção 5 — projetos grandes atendidos (bento: tipo de estrutura, nº de painéis, cidade) e link para /projetos-atendidos. */
export function ObrasDestaque() {
  return (
    <section id="obras-destaque" data-linha="obra" className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading eyebrow={OBRAS_SECAO.eyebrow} title={OBRAS_SECAO.titulo} destaque={OBRAS_SECAO.destaque} className="mb-0 sm:mb-0" />
          <Reveal className="shrink-0 pb-1">
            <LinkInterno href={OBRAS_SECAO.ctaHref} ctaId="obras-destaque-ver-todas" variant="texto">
              {OBRAS_SECAO.cta}
              <ArrowRight className="size-4" aria-hidden />
            </LinkInterno>
          </Reveal>
        </div>
        <ul
          className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 lg:grid-rows-[17rem_17rem]"
          aria-label="Projetos atendidos em destaque"
        >
          {PROJETOS_DESTAQUE.map((projeto, i) => (
            <Reveal key={projeto.id} as="li" delay={i * 80} className={CELULAS_BENTO[i] ?? ""}>
              <CardProjeto projeto={projeto} grande={i === 0} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
