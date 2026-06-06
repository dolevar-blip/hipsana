import type { Metadata } from "next";
import Link from "next/link";
import ScorecardEmbed from "@/components/ScorecardEmbed";

export const metadata: Metadata = {
  title: "Free HIPAA Security Scorecard",
  description:
    "A free 3-minute Scorecard that checks 10 core HIPAA Security Rule controls, scores your solo practice out of 100, and sends a written review.",
  alternates: {
    canonical: "/scorecard",
  },
  openGraph: {
    title: "Free HIPAA Security Scorecard · Hipsana",
    description:
      "Check 10 core HIPAA Security Rule controls and get your practice's score out of 100, plus a written review.",
    url: "https://hipsana.com/scorecard",
    type: "website",
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
          see on its own. In three minutes, get your score and a written review
          of what to fix &mdash; free, and no sales call.
        </p>
      </div>

      <div className="mt-12 max-w-prose">
        <ScorecardEmbed />
      </div>

      <p className="mt-6 max-w-prose text-sm text-muted">
        We use your answers to prepare your review. See how we handle your
        details in our{" "}
        <Link href="/privacy" className="underline hover:text-ink">
          Privacy Policy
        </Link>
        .
      </p>
    </div>
  );
}
