import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { InstagramIcon } from "@/components/icons";
import { Container } from "@/components/ui/Container";
import { ChapaCard } from "@/components/ui/ChapaCard";
import { PlacaIdentificacao } from "@/components/cta/PlacaIdentificacao";
import { WaButton } from "@/components/cta/WaButton";
import { Reveal } from "@/components/motion/Reveal";
import { TrackedLink } from "@/components/tracking/TrackedLink";
import { QrWhatsApp } from "@/components/contato/QrWhatsApp";
import { FLAGS } from "@/config/feature-flags";
import { SITE } from "@/lib/site";
import { CONTATO_HERO } from "@/content/contato";

const LINK =
  "flex min-h-11 items-center gap-3 py-2 text-base text-branco transition-colors hover:text-laranja-texto focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-azul-idv";

/**
 * Hero de /contato: h1, cartão central com os canais oficiais (lib/site.ts)
 * e QR code do WhatsApp só no desktop. Sem formulário (CTA único).
 */
export function HeroContato() {
  return (
    <section id="hero-contato" data-linha="geral" className="relative overflow-hidden bg-fundo grade-modulos">
      <Container className="py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-start lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal imediato>
              <p className="mb-3 font-mono text-xs font-medium uppercase tracking-[0.2em] text-laranja-texto">{CONTATO_HERO.eyebrow}</p>
            </Reveal>
            <Reveal imediato delay={80}>
              <h1 className="font-display text-4xl font-bold leading-[1.02] sm:text-5xl lg:text-6xl">{CONTATO_HERO.titulo}</h1>
            </Reveal>
            <Reveal imediato delay={160}>
              <p className="mt-5 max-w-md text-base leading-relaxed text-aco sm:text-lg">{CONTATO_HERO.subtitulo}</p>
            </Reveal>
            <Reveal imediato delay={220}>
              <div className="mt-6 flex flex-wrap gap-2">
                <PlacaIdentificacao size="sm" variant="laranja">
                  WhatsApp
                </PlacaIdentificacao>
                <PlacaIdentificacao size="sm">Engenharia própria</PlacaIdentificacao>
                <PlacaIdentificacao size="sm">Entrega em todo o Brasil</PlacaIdentificacao>
              </div>
            </Reveal>
            <Reveal imediato delay={300} className="mt-10">
              <QrWhatsApp />
            </Reveal>
          </div>

          <Reveal imediato delay={140} className="lg:col-span-7">
            <ChapaCard numero="CANAIS" className="p-6 sm:p-9">
              <WaButton linha="geral" ctaId="contato-whatsapp" posicao="hero-contato" className="w-full sm:w-auto">
                {CONTATO_HERO.ctaWhatsApp}
              </WaButton>

              <ul className="mt-8 divide-y divide-linha border-t border-linha">
                <li>
                  <TrackedLink
                    href={`tel:${SITE.telefone.e164}`}
                    ctaId="contato-telefone"
                    track={{ kind: "phone", phone: SITE.telefone.display }}
                    className={LINK}
                  >
                    <Phone className="size-5 shrink-0 text-laranja" aria-hidden />
                    <span className="font-display font-semibold">{CONTATO_HERO.ctaLigar}</span>
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink href={`mailto:${SITE.email}`} ctaId="contato-email" track={{ kind: "email", email: SITE.email }} className={LINK}>
                    <Mail className="size-5 shrink-0 text-laranja" aria-hidden />
                    <span>
                      <span className="sr-only">{CONTATO_HERO.rotuloEmail}: </span>
                      {SITE.email}
                    </span>
                  </TrackedLink>
                </li>
                <li>
                  <TrackedLink
                    href={SITE.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    ctaId="contato-instagram"
                    track={{ kind: "social", rede: "instagram" }}
                    className={LINK}
                  >
                    <InstagramIcon className="size-5 shrink-0 text-laranja" />
                    <span>
                      <span className="sr-only">{CONTATO_HERO.rotuloInstagram}: </span>
                      {SITE.instagram.handle}
                    </span>
                  </TrackedLink>
                </li>
                <li className="flex min-h-11 items-center gap-3 py-2 text-base text-aco">
                  <Clock className="size-5 shrink-0 text-laranja" aria-hidden />
                  {SITE.horario}
                </li>
                {FLAGS.atendimentoPresencial ? (
                  <li className="flex min-h-11 items-center gap-3 py-2 text-base text-aco">
                    <MapPin className="size-5 shrink-0 text-laranja" aria-hidden />
                    {CONTATO_HERO.presencial}
                  </li>
                ) : null}
              </ul>
            </ChapaCard>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
