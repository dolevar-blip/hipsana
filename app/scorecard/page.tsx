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
    <div className="container-page py-16 md:py-24">
      <div className="max-w-prose">
        <p className="eyebrow">Free HIPAA Security Scorecard</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
          One HIPAA Audit Could Cost You Six Figures.
        </h1>
        <p className="prose-hipsana mt-6">
          Most solo practices have two or three HIPAA gaps they cannot see. This
          Scorecard checks 10 core HIPAA Security Rule controls and scores your
          practice out of 100.
        </p>
        <p className="prose-hipsana mt-4">
          When you finish, you get a written review by email and the option to
          book a short risk review with a vetted specialist. It takes about
          three minutes, and there is no cost.
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
