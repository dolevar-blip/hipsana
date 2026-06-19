"use client";

import { useEffect } from "react";

const CAL_LINK = "hipsana/free-review";
const CAL_EMBED_SRC = "https://app.cal.com/embed/embed.js";
const BRAND = "#1D4ED8";

type Props = {
  email?: string;
  name?: string;
};

/**
 * Inline Cal.com booking widget for the result page.
 * Prefills the attendee's email + practice name (passed from the URL) via the
 * embed config object, which is Cal.com's reliable prefill path for inline embeds.
 */
export default function ReviewBookingEmbed({ email, name }: Props) {
  useEffect(() => {
    // Official Cal.com initializer: sets up window.Cal and loads embed.js once.
    (function (C: any, A: string, L: string) {
      const p = (a: any, ar: any) => {
        a.q.push(ar);
      };
      const d = C.document;
      C.Cal =
        C.Cal ||
        function () {
          const cal = C.Cal;
          const ar = arguments as any;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api: any = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window as any, CAL_EMBED_SRC, "init");

    const Cal = (window as any).Cal;
    if (typeof Cal !== "function") return;

    Cal("init", { origin: "https://cal.com" });

    const config: Record<string, string> = {};
    if (email) config.email = email;
    if (name) config.name = name;

    Cal("inline", {
      elementOrSelector: "#review-cal-inline",
      calLink: CAL_LINK,
      config,
    });

    Cal("ui", {
      hideEventTypeDetails: false,
      styles: { branding: { brandColor: BRAND } },
    });
  }, [email, name]);

  return (
    <div
      id="review-cal-inline"
      role="region"
      aria-label="Book your free 15-minute review"
      style={{ minHeight: 600, width: "100%", overflow: "auto" }}
    />
  );
}
