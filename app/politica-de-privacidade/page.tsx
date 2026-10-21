import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { ROTAS, SITE } from "@/lib/site";
import {
  PRIVACIDADE_DIREITOS_CONTATO,
  PRIVACIDADE_INTRO,
  PRIVACIDADE_META,
  PRIVACIDADE_RODAPE,
  PRIVACIDADE_SECOES,
  PRIVACIDADE_TITULO,
} from "@/content/privacidade";

export const metadata: Metadata = {
  ...buildMetadata({ title: PRIVACIDADE_META.title, description: PRIVACIDADE_META.description, path: ROTAS.privacidade }),
  robots: { index: true, follow: true },
};

/** Página de leitura (LGPD): sem animação, sem data-linha, tipografia de prosa. */
export default function PoliticaDePrivacidadePage() {
  return (
    <article className="bg-fundo">
      <Container className="py-20 sm:py-28">
        <header className="max-w-prose">
          <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja">LGPD · Lei nº 13.709/2018</p>
          <h1 className="font-display text-4xl font-bold leading-[1.02] sm:text-5xl">{PRIVACIDADE_TITULO}</h1>
          <p className="mt-6 text-base leading-relaxed text-aco sm:text-lg">{PRIVACIDADE_INTRO}</p>
        </header>

        <div className="mt-12 flex max-w-prose flex-col gap-12 border-t border-linha pt-12">
          {PRIVACIDADE_SECOES.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-titulo`}>
              <p className="font-mono text-xs tracking-[0.2em] text-aco/70">{String(i + 1).padStart(2, "0")}</p>
              <h2 id={`${s.id}-titulo`} className="mt-2 font-display text-2xl font-semibold leading-tight text-branco sm:text-3xl">
                {s.titulo}
              </h2>
              {s.paragrafos.map((p) => (
                <p key={p} className="mt-4 text-base leading-relaxed text-aco">
                  {p}
                </p>
              ))}
              {s.lista ? (
                <ul className="mt-4 flex flex-col gap-2 pl-5 text-base leading-relaxed text-aco marker:text-laranja">
                  {s.lista.map((item) => (
                    <li key={item} className="list-disc">
                      {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              {s.id === "seus-direitos" ? <p className="mt-4 text-base leading-relaxed text-aco">{PRIVACIDADE_DIREITOS_CONTATO}</p> : null}
            </section>
          ))}
        </div>

        <footer className="mt-12 max-w-prose border-t border-linha pt-6 font-mono text-xs uppercase tracking-[0.14em] text-aco/80">
          <p>{PRIVACIDADE_RODAPE.revisao}</p>
          <p className="mt-2">{PRIVACIDADE_RODAPE.atualizacao}</p>
          <p className="mt-2 normal-case tracking-normal">
            {SITE.razaoSocial} · CNPJ {SITE.cnpj}
          </p>
        </footer>
      </Container>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Início", path: ROTAS.home },
            { name: PRIVACIDADE_TITULO, path: ROTAS.privacidade },
          ]),
        ]}
      />
    </article>
  );
}
