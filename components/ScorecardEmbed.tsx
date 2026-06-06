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
      // trigger the route-based <ScrollToTop/>; the new question sits low in the
      // iframe (below Tally's cover image) and stays off-screen. On each page
      // change, scroll the form to the top of the viewport so the question shows.
      // Guard on scrollY > 100 (the user has scrolled down to the form) so we
      // never yank the page during the initial load while the hero is on screen.
      if (payload.event === "Tally.FormPageView" && window.scrollY > 100) {
        iframeRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
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
