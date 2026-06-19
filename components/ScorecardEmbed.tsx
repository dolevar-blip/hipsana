"use client";

import { useEffect, useRef } from "react";

const TALLY_FORM_ID = "Y5kGdq";
const TALLY_EMBED_SRC = `https://tally.so/embed/${TALLY_FORM_ID}?alignLeft=1&hideTitle=1&transparentBackground=1&dynamicHeight=1`;
const WIDGET_SCRIPT_SRC = "https://tally.so/widgets/embed.js";

export default function ScorecardEmbed() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const firstPageViewSeen = useRef(false);

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

    // 2) Listen for Tally's page-change events to scroll the form to the top.
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
      // trigger the route-based <ScrollToTop/>; the new question can land below
      // the page hero, at the bottom of the viewport. On each page change we
      // scroll the form to the top so the question is featured. The very first
      // FormPageView is the page shown on load, so we skip it (no yank before
      // the visitor acts); every later page view is a real navigation.
      if (payload.event === "Tally.FormPageView") {
        if (!firstPageViewSeen.current) {
          firstPageViewSeen.current = true;
        } else {
          const reduceMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
          ).matches;
          iframeRef.current?.scrollIntoView({
            behavior: reduceMotion ? "auto" : "smooth",
            block: "start",
          });
        }
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
