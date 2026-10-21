import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { FLAGS } from "@/config/feature-flags";
import { CONTADORES, PROVA_SOCIAL } from "@/content/home";

/** Tipos literais do `as const` viram boolean aqui para o código dos blocos ficar pronto sem ser inalcançável. */
const mostrarParceiros: boolean = FLAGS.parceiros;
const mostrarContadores: boolean = FLAGS.contadores;

/**
 * Seção 8 — depoimentos literais do site atual como "etiquetas de expedição"
 * (carrossel no mobile, grid no desktop) + cartão "Quem responde". Parceiros
 * e contadores só com feature flag ligada (dados [PREENCHER]).
 */
export function ProvaSocial() {
  const contadoresComValor = CONTADORES.filter((c): c is typeof c & { valor: number } => typeof c.valor === "number");
  return (
    <section id="prova-social" data-linha="geral" className="bg-superficie">
      <Container className="py-20 sm:py-28">
        <SectionHeading eyebrow={PROVA_SOCIAL.eyebrow} title={PROVA_SOCIAL.titulo} destaque="menos dor de cabeça" />

        {mostrarContadores && contadoresComValor.length > 0 ? (
          <ul className="mb-12 grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Números">
            {contadoresComValor.map((c) => (
              <li key={c.rotulo} className="border-l-2 border-laranja pl-4">
                <Counter to={c.valor} prefix={c.prefixo} suffix={c.sufixo} className="font-display text-4xl font-bold text-branco" />
                <p className="mt-1 text-sm text-aco">{c.rotulo}</p>
              </li>
            ))}
          </ul>
        ) : null}

        <ul
          aria-label="Depoimentos de clientes"
          className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 md:pb-0 md:gap-5 lg:grid-cols-3"
        >
          {PROVA_SOCIAL.depoimentos.map((d, i) => (
            <Reveal key={d.nome} as="li" delay={i * 50} className="w-[82vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none">
              <Etiqueta indice={i + 1} total={PROVA_SOCIAL.depoimentos.length} nome={d.nome} rotulo={d.rotulo} texto={d.texto} />
            </Reveal>
          ))}
          <Reveal as="li" delay={PROVA_SOCIAL.depoimentos.length * 50} className="w-[82vw] max-w-[360px] shrink-0 snap-start md:w-auto md:max-w-none">
            <QuemResponde />
          </Reveal>
        </ul>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-aco">{PROVA_SOCIAL.notaDepoimentos}</p>

        {mostrarParceiros ? (
          <div className="mt-14 border-t border-linha pt-8">
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-aco">{PROVA_SOCIAL.parceiros.eyebrow}</p>
            <ul className="flex flex-wrap gap-x-10 gap-y-4 font-display text-lg font-semibold uppercase tracking-wide text-aco" aria-label="Parceiros">
              {PROVA_SOCIAL.parceiros.nomes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
          </div>
        ) : null}
      </Container>
    </section>
  );
}

/** Depoimento como etiqueta de expedição: placa clara, furos, numeração e texto literal. */
function Etiqueta({ indice, total, nome, rotulo, texto }: { indice: number; total: number; nome: string; rotulo: string; texto: string }) {
  const num = (n: number) => String(n).padStart(2, "0");
  return (
    <figure className="relative flex h-full flex-col chanfro bg-placa-clara p-6 text-preto sm:p-7">
      <span aria-hidden className="absolute top-3 left-3 size-2 rounded-full bg-preto/15" />
      <span aria-hidden className="absolute top-3 right-3 size-2 rounded-full bg-preto/15" />
      <div className="flex items-center justify-between border-b border-dashed border-preto/20 pb-3 font-mono text-[11px] uppercase tracking-[0.18em] text-preto/60">
        <span>{PROVA_SOCIAL.etiqueta}</span>
        <span className="tabular">
          {num(indice)}/{num(total)}
        </span>
      </div>
      <blockquote className="flex-1 pt-4">
        <p className="text-base leading-relaxed text-preto/90">“{texto}”</p>
      </blockquote>
      <figcaption className="mt-5 flex flex-wrap items-center gap-2">
        <PlacaIdentificacao variant="laranja" size="sm">
          {nome}
        </PlacaIdentificacao>
        <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-preto/60">{rotulo}</span>
      </figcaption>
    </figure>
  );
}

/** Cartão "Quem responde": fundador no pós-venda. Foto [PREENCHER] → bloco tipográfico com o arco solar. */
function QuemResponde() {
  const q = PROVA_SOCIAL.quemResponde;
  return (
    <article className="relative flex h-full flex-col overflow-hidden chanfro border border-navy bg-navy p-6 text-branco sm:p-7">
      <ArcoSolar className="absolute -right-10 -bottom-8 h-40 w-64 text-branco/15" espessura={4} />
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-branco/70">{q.eyebrow}</p>
      <h3 className="mt-3 font-display text-2xl font-bold leading-tight sm:text-3xl">{q.nome}</h3>
      <p className="mt-3 max-w-sm text-base leading-relaxed text-branco/85">{q.texto}</p>
      <p className="relative mt-auto pt-8 font-mono text-[11px] uppercase tracking-[0.14em] text-branco/60">{q.fotoPendente}</p>
    </article>
  );
}
