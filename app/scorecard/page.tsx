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
  twitter: {
    card: "summary_large_image",
    title: "Free HIPAA Security Scorecard · Hipsana",
    description:
      "Check 10 core HIPAA Security Rule controls and get your practice's score out of 100, plus a written review.",
    images: ["/og-scorecard.png"],
  },
};

const questions = [
  "Do you have signed BAAs with all your vendors?",
  "Have you completed a HIPAA risk analysis in the last 12 months?",
  "Is patient data encrypted on all your devices?",
  "Do you use two-factor login (2FA) for email and patient software?",
  "Do you have a tested backup and recovery plan?",
  "Has everyone who handles patient data completed HIPAA training in the last 12 months?",
  "Do you have a written breach-response plan?",
  "Is your practice email HIPAA-compliant?",
  "Does everyone with access to patient data have their own login (no shared accounts)?",
  "Do all devices auto-lock with a password?",
];

export default function ScorecardPage() {
  return (
    <>
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
            This free Scorecard checks the 10 HIPAA controls that matter most for an
            independent practice.
          </p>
          <p className="prose-hipsana mt-6">
            In about three minutes you get a score out of 100 and a written review
            of your biggest gaps.
          </p>
          <p className="mt-6 text-sm text-muted">
            This is an educational self-assessment based only on your answers, not
            an audit or legal advice, and a high score doesn&rsquo;t mean your
            practice is compliant.
          </p>
        </div>

        <div className="mt-12 max-w-prose">
          <ScorecardEmbed />
        </div>

        <p className="mt-6 max-w-prose text-sm text-muted">
          We use your answers to prepare your review. The Scorecard asks only
          about your practice&rsquo;s security setup, so there&rsquo;s no need to
          enter patient names, records, or any other patient information.
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

      {/* What's in the Scorecard: questions, scoring, and a sample review.
          Full-bleed tinted section (mirrors the site's footer treatment) so it
          reads as a distinct module from the form above. */}
      <section className="border-t border-muted-border bg-muted-bg">
        <div className="container-page py-14 md:py-20">
          <div className="max-w-prose">
            <p className="eyebrow">What&rsquo;s in the Scorecard</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              The 10 questions, and how they&rsquo;re scored.
            </h2>
            <p className="prose-hipsana mt-6">
              Every question is a yes/no about how your practice handles patient
              data. Here is exactly what you&rsquo;ll be asked, so nothing is a
              surprise.
            </p>

            <ol className="mt-6 list-none space-y-3">
              {questions.map((q, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-[17px] leading-relaxed text-ink"
                >
                  <span className="font-semibold text-teal">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>

            <h3 className="mt-12 text-xl font-semibold">How your score works</h3>
            <p className="prose-hipsana mt-4">
              Each Scorecard answer adds up to a score out of 100. Two controls carry
              the most weight: a Business Associate Agreement and a Security Risk
              Analysis. They count for 14 points each; the other eight controls count
              for 9 points each.
            </p>
            <p className="prose-hipsana mt-4">
              These two weigh more because each one, on its own, has repeatedly drawn
              HIPAA enforcement. The HHS Office for Civil Rights (OCR) names a missing
              or inadequate risk analysis as the most common Security Rule violation
              it finds. A single missing Business Associate Agreement led to a
              $750,000 OCR settlement (Raleigh Orthopaedic Clinic).
            </p>
            <p className="prose-hipsana mt-4">
              The heavier weighting reflects how often these two gaps show up in real
              enforcement, not a ranking of which HIPAA rules matter more. The
              Scorecard measures your practice&rsquo;s risk exposure, not whether you
              are legally compliant.
            </p>

            <h3 className="mt-12 text-xl font-semibold">A sample review</h3>
            <p className="prose-hipsana mt-4">
              Here is the kind of written review a practice gets back after the
              Scorecard. This example is illustrative, not a real practice.
            </p>
            <div className="mt-5 rounded-xl border border-muted-border bg-paper p-6">
              <p className="text-base font-semibold text-ink">
                Score: 72 / 100 &mdash; some gaps to close.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-ink">
                  Your biggest gap: no risk analysis in the last 12 months.
                </span>{" "}
                A HIPAA Security Risk Analysis is the failure OCR cites most often,
                and it is one of the first documents an investigator asks for. A
                current one maps where patient data lives and what could expose it. If
                you have never run one, that is the highest-value place to start.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-ink">
                  Next: a vendor without a signed BAA.
                </span>{" "}
                Any vendor that stores or handles patient data on your behalf needs a
                Business Associate Agreement on file. List the vendors that handle
                patient data for you, then check which agreements you actually have.
              </p>
              <p className="mt-4 text-[15px] leading-relaxed text-muted">
                <span className="font-semibold text-ink">What is working:</span>{" "}
                two-factor login and device encryption already put you ahead of many
                small practices.
              </p>
              <p className="mt-4 text-[13px] leading-relaxed text-muted">
                This is a starting point for understanding your risk, not legal advice
                or a finding that you are or are not compliant.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
