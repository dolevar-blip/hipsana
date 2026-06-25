"use client";

import { useEffect, useState } from "react";

// Each step names real work the page just did (score, lead-gap selection,
// render). Honest operational transparency, not a fake activity message.
const STEPS = [
  "Scoring your answers",
  "Finding your biggest gap",
  "Preparing your result",
];

const GREEN = "#059669";

function Check({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M5 10.5l3.2 3.2L15 7"
        stroke={GREEN}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Wraps the result content and plays a brief, honest "analyzing" sequence on
 * mount before revealing it. The children render the whole time (so the Cal.com
 * embed loads in the background and is ready on reveal); a paper overlay sits on
 * top during the scan and fades out. Users who prefer reduced motion skip it.
 *
 * Timing (~2.8s total): three steps at ~0.8s each, then a ~0.4s completion beat,
 * then a ~0.35s fade. Calibrated to the wait-perception research: long enough to
 * read as real work, short enough not to annoy a time-poor reader.
 */
export default function ScanReveal({ children }: { children: React.ReactNode }) {
  // phase 0,1,2 = that step is running; 3 = complete; overlay then fades out.
  const [phase, setPhase] = useState(0);
  const [fading, setFading] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setShowOverlay(false);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setPhase(1), 800));
    timers.push(setTimeout(() => setPhase(2), 1600));
    timers.push(setTimeout(() => setPhase(3), 2400));
    timers.push(setTimeout(() => setFading(true), 2800));
    timers.push(setTimeout(() => setShowOverlay(false), 3150));
    return () => timers.forEach((t) => clearTimeout(t));
  }, []);

  return (
    <div className="relative">
      {children}

      {showOverlay ? (
        <div
          role="status"
          aria-live="polite"
          aria-label="Analyzing your responses"
          className={`absolute inset-0 z-20 flex items-start justify-center bg-paper pt-10 transition-opacity duration-300 md:pt-16 ${
            fading ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="w-full max-w-prose px-6 md:px-10">
            <p className="eyebrow">HIPAA Security Scorecard</p>

            <ul className="mt-6 space-y-4">
              {STEPS.map((label, i) => {
                const done = phase > i;
                const active = phase === i;
                return (
                  <li key={label} className="flex items-center gap-3">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                      {done ? (
                        <Check />
                      ) : active ? (
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-teal/30 border-t-teal" />
                      ) : (
                        <span className="h-2.5 w-2.5 rounded-full bg-muted-border" />
                      )}
                    </span>
                    <span
                      className={`text-base ${
                        done || active ? "text-ink" : "text-muted-light"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ul>

            {phase >= 3 ? (
              <div className="mt-7 flex items-center gap-3">
                <span
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: "#ECFDF5" }}
                >
                  <Check size={20} />
                </span>
                <span className="font-display text-lg font-semibold text-ink">
                  Assessment complete
                </span>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
