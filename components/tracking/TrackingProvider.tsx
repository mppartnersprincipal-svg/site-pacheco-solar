"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  CONSENT_EVENT,
  GTM_ID,
  captureUtms,
  pushConsent,
  readConsent,
  trackScroll,
  trackSectionView,
} from "@/lib/analytics";

const SCROLL_MARKS = [25, 50, 75, 100] as const;

/**
 * Tracking (padrão M|P): carrega o GTM, aplica Consent Mode v2, captura UTMs,
 * envia page_view por rota e os eventos de engajamento scroll_* e section_view.
 * GA4, Google Ads e Meta Pixel vivem DENTRO do container (gtm/).
 */
export function TrackingProvider() {
  const pathname = usePathname();
  const scrollFired = useRef<Set<number>>(new Set());

  // Consent Mode default (negado) antes do gtm.js + UTMs da entrada
  useEffect(() => {
    pushConsent("default", false);
    captureUtms();
    const sync = () => {
      if (readConsent()?.accepted === true) pushConsent("update", true);
    };
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  // page_view por rota (a tag GA4 no GTM fica com send_page_view = false)
  useEffect(() => {
    const id = window.setTimeout(() => {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "page_view",
        page_path: pathname,
        page_location: window.location.href,
        page_title: document.title,
      });
    }, 0);
    return () => window.clearTimeout(id);
  }, [pathname]);

  // scroll_25/50/75/100 — uma vez por página
  useEffect(() => {
    scrollFired.current = new Set();
    let scheduled = false;
    const measure = () => {
      scheduled = false;
      const doc = document.documentElement;
      const total = Math.max(doc.scrollHeight, document.body?.scrollHeight ?? 0) - window.innerHeight;
      if (total <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / total) * 100));
      for (const mark of SCROLL_MARKS) {
        if (pct >= mark && !scrollFired.current.has(mark)) {
          scrollFired.current.add(mark);
          trackScroll(mark);
        }
      }
    };
    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      requestAnimationFrame(measure);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  // section_view — toda <section id> visível a 40%, uma vez por página
  useEffect(() => {
    const seen = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting && id && !seen.has(id)) {
            seen.add(id);
            trackSectionView(id);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.4 }
    );
    const timer = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>("section[id]").forEach((el) => observer.observe(el));
    }, 300);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, [pathname]);

  if (!GTM_ID) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  );
}

/** Fallback sem JavaScript — logo após a abertura do <body>. */
export function GtmNoScript() {
  if (!GTM_ID) return null;
  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
        title="Google Tag Manager"
      />
    </noscript>
  );
}
