import { Phone, Mail } from "lucide-react";
import { ArcoSolar } from "@/components/nicho/ArcoSolar";
import { WaButton } from "@/components/cta/WaButton";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/lib/site";
import type { Linha } from "@/lib/whatsapp";

/**
 * Fechamento de página: bloco full-bleed laranja com o arco solar desenhando,
 * H2 de posicionamento, canais oficiais e o botão de WhatsApp da linha.
 * id="cta-final" é o sinal para o botão flutuante sumir.
 */
export function CtaFinal({
  titulo = "Você vende. A Pacheco entrega.",
  subtitulo = "Garanta o fechamento de mais obras, oferecendo diferenciais e qualidade para seus clientes. Conte com a Pacheco Solar como sua aliada.",
  linha = "geral",
  rotulo = "Pedir orçamento no WhatsApp",
  ctaId = "cta-final",
}: {
  titulo?: string;
  subtitulo?: string;
  linha?: Linha;
  rotulo?: string;
  ctaId?: string;
}) {
  return (
    <section id="cta-final" data-linha={linha} className="relative overflow-hidden bg-laranja text-preto">
      <ArcoSolar className="absolute -top-10 right-[-10%] h-[140%] w-[70%] text-preto/15" espessura={2} />
      <Container className="relative py-20 sm:py-28">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-bold leading-[1.02] text-preto sm:text-5xl lg:text-6xl">{titulo}</h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-preto/80">{subtitulo}</p>
        </Reveal>
        <Reveal delay={200}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <WaButton linha={linha} ctaId={ctaId} posicao="cta-final" variant="preto">
              {rotulo}
            </WaButton>
            <TrackedLink
              href={`tel:${SITE.telefone.e164}`}
              ctaId={`${ctaId}-telefone`}
              track={{ kind: "phone", phone: SITE.telefone.display }}
              className="inline-flex items-center gap-2 px-2 py-3 font-display font-semibold text-preto underline-offset-4 hover:underline"
            >
              <Phone className="size-4" aria-hidden />
              Ligar {SITE.telefone.display}
            </TrackedLink>
            <TrackedLink
              href={`mailto:${SITE.email}`}
              ctaId={`${ctaId}-email`}
              track={{ kind: "email", email: SITE.email }}
              className="inline-flex items-center gap-2 px-2 py-3 font-display font-semibold text-preto underline-offset-4 hover:underline"
            >
              <Mail className="size-4" aria-hidden />
              {SITE.email}
            </TrackedLink>
          </div>
        </Reveal>
        <Reveal delay={260}>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-preto/70">
            {SITE.horario} · {SITE.instagram.handle} · {SITE.endereco.cidade}/{SITE.endereco.uf}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
