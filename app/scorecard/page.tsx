import type { Metadata } from "next";
import ScorecardEmbed from "@/components/ScorecardEmbed";

export const metadata: Metadata = {
  title: "Free HIPAA Security Scorecard",
  description:
    "A free 3-minute Scorecard that checks 10 core HIPAA Security Rule controls, scores your independent practice out of 100, and sends a written review.",
  alternates: {
    canonical: "/scorecard",
  },
  openGraph: {
    title: "Free HIPAA Security Scorecard · Hipsana",
    description:
      "Check 10 core HIPAA Security Rule controls and get your practice's score out of 100, plus a written review.",
    url: "https://hipsana.com/scorecard",
    type: "website",
    images: [
      {
        url: "/og-scorecard.png",
        width: 1200,
        height: 630,
        alt: "Free HIPAA Security Scorecard by Hipsana: score your practice out of 100.",
      },
    ],
  },
};

export default function ScorecardPage() {
  return (
    <div className="container-page pt-8 pb-16 md:pt-12 md:pb-24">
      <div className="max-w-prose">
        <p className="eyebrow">Free HIPAA Security Scorecard</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
          One HIPAA Audit Could Cost You Six Figures.
        </h1>
        <p className="prose-hipsana mt-6">
          Those fines almost always trace back to gaps a practice couldn&rsquo;t
          see on its own.
        </p>
        <p className="prose-hipsana mt-6">
          This free Scorecard checks the 10 HIPAA controls that matter most for a
          solo practice.
        </p>
        <p className="prose-hipsana mt-6">
          In about three minutes you get a score out of 100 and a written review
          of what to fix.
        </p>
      </div>

      <div className="mt-12 max-w-prose">
        <ScorecardEmbed />
      </div>

      <p className="mt-6 max-w-prose text-sm text-muted">
        We use your answers to prepare your review.
      </p>

      <p className="mt-3 max-w-prose text-sm text-muted">
        Prefer not to use the form, or having trouble with it? Email{" "}
        <a
          href="mailto:hello@hipsana.com"
          className="text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
        >
          hello@hipsana.com
        </a>{" "}
        and we&rsquo;ll send it another way.
      </p>
    </div>
  );
}
