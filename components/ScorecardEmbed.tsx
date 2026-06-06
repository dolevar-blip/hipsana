"use client";

import { useEffect, useRef } from "react";

const TALLY_FORM_ID = "Y5kGdq";
const TALLY_EMBED_SRC = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
const WIDGET_SCRIPT_SRC = "https://tally.so/widgets/embed.js";

export default function ScorecardEmbed() {
  const startFired = useRef(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // 1) Load Tally's embed script so the iframe auto-resizes to its content.
    const loadEmbeds = () => {
      const w = window as any;
      if (typeof w.Tally !== "undefined") {
        w.Tally.loadEmbeds();
        return;
      }
      document
        .querySelectorAll<HTMLIFrameElement>(
          "iframe[data-tally-src]:not([src])"
        )
        .forEach((el) => {
          el.src = el.dataset.tallySrc as string;
        });
    };

    if (typeof (window as any).Tally !== "undefined") {
      loadEmbeds();
    } else if (!document.querySelector(`script[src="${WIDGET_SCRIPT_SRC}"]`)) {
      const script = document.createElement("script");
      script.src = WIDGET_SCRIPT_SRC;
      script.onload = loadEmbeds;
      script.onerror = loadEmbeds;
      document.body.appendChild(script);
    } else {
      loadEmbeds();
    }

    // 2) Listen for Tally's form events and forward them to GA4.
    const handleMessage = (event: MessageEvent) => {
      let payload: any = event.data;
      if (typeof payload === "string") {
        if (payload.indexOf("Tally.") === -1) return;
        try {
          payload = JSON.parse(payload);
        } catch {
          return;
        }
      }
      if (!payload || typeof payload !== "object") return;

      // Tally renders inside an inline iframe, so advancing a step does NOT
      // trigger the route-based <ScrollToTop/>. On each page change, pull the
      // form's top into view so the new question is visible. Guard on top < 0
      // (form already scrolled past) so we never yank the page on first load.
      if (payload.event === "Tally.FormPageView") {
        const node = iframeRef.current;
        if (node && node.getBoundingClientRect().top < 0) {
          node.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }

      const gtag = (window as any).gtag;
      if (typeof gtag !== "function") return;

      if (payload.event === "Tally.FormLoaded" && !startFired.current) {
        startFired.current = true;
        gtag("event", "scorecard_start");
      }
      if (payload.event === "Tally.FormSubmitted") {
        gtag("event", "scorecard_complete");
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <iframe
      ref={iframeRef}
      data-tally-src={TALLY_EMBED_SRC}
      loading="lazy"
      width="100%"
      height={500}
      title="HIPAA Security Risk Scorecard"
      style={{ border: 0 }}
    />
  );
}
