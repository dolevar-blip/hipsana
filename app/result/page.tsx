import type { Metadata } from "next";
import Link from "next/link";
import ReviewBookingEmbed from "@/components/ReviewBookingEmbed";
import ScanReveal from "@/components/ScanReveal";

export const metadata: Metadata = {
  title: "Your HIPAA Security Scorecard result",
  // Per-user, post-submit page. Never indexed, and do not leak the answers/email
  // in the URL to the embedded Cal.com widget via the Referer header.
  robots: { index: false, follow: false },
  referrer: "no-referrer",
};

type Tier = "top" | "mid";

type Control = {
  key: string; // URL param name piped by Tally
  severity: number; // lower = more severe = lead priority
  shortLabel: string; // used in the "We also couldn't confirm" line
  tier: Tier;
  leadBody: string; // follows a connector ("Your biggest exposure is" / "The one to confirm is")
};

// Order of `severity` is the lead-selection order. Required-vs-addressable framing is
// deliberate: "required" only where it currently is; encryption / 2FA / auto-lock are
// framed as proposed-mandatory, not current law.
const CONTROLS: Control[] = [
  {
    key: "c_risk",
    severity: 1,
    tier: "top",
    shortLabel: "a current Risk Analysis",
    leadBody:
      "your Risk Analysis: we couldn't confirm a current one is on file. It's the first thing OCR asks for in an investigation, and the failure OCR cites most often. A small practice with no Risk Analysis on file settled with OCR for $100,000.",
  },
  {
    key: "c_baa",
    severity: 2,
    tier: "top",
    shortLabel: "signed BAAs",
    leadBody:
      "your vendor agreements: we couldn't confirm you have signed BAAs with every vendor that stores or handles patient data on your behalf. They're required, and OCR routinely asks for them when it investigates a breach.",
  },
  {
    key: "c_mfa",
    severity: 3,
    tier: "mid",
    shortLabel: "two-factor login",
    leadBody:
      "two-factor login: we couldn't confirm it's on for your email and practice software. It's the strongest defense against the phishing behind most health-data breaches, and it's proposed to become mandatory under the updated Security Rule.",
  },
  {
    key: "c_enc",
    severity: 4,
    tier: "mid",
    shortLabel: "device encryption",
    leadBody:
      "device encryption: we couldn't confirm patient data is encrypted on all your devices. Unencrypted devices are a leading cause of reportable breaches, and it's proposed to become mandatory under the updated Security Rule.",
  },
  {
    key: "c_logins",
    severity: 5,
    tier: "mid",
    shortLabel: "separate logins for each user",
    leadBody:
      "access: we couldn't confirm everyone with access to patient data has their own login. Unique logins are required, and shared accounts are a direct violation.",
  },
  {
    key: "c_email",
    severity: 6,
    tier: "mid",
    shortLabel: "email with a vendor BAA and encryption",
    leadBody:
      "email: we couldn't confirm yours is set up for patient information the right way, with a vendor BAA and encryption. Email is a common leak point for small practices.",
  },
  {
    key: "c_backup",
    severity: 7,
    tier: "mid",
    shortLabel: "a tested backup",
    leadBody:
      "your backup: we couldn't confirm it's been tested. A tested backup is the difference between a bad day and a closed practice if ransomware hits.",
  },
  {
    key: "c_breach",
    severity: 8,
    tier: "mid",
    shortLabel: "a written breach-response plan",
    leadBody:
      "your breach-response plan: we couldn't confirm you have a written one. It's required, and it lets you respond fast and correctly when something goes wrong.",
  },
  {
    key: "c_train",
    severity: 9,
    tier: "mid",
    shortLabel: "annual HIPAA training",
    leadBody:
      "training: we couldn't confirm everyone who handles patient data has completed it. Workforce security training is required, and an annual refresh is the common standard.",
  },
  {
    key: "c_lock",
    severity: 10,
    tier: "mid",
    shortLabel: "device auto-lock",
    leadBody:
      "device auto-lock: we couldn't confirm all your devices lock with a password. It's the simplest protection against a lost or unattended device, and it's proposed to become mandatory under the updated Security Rule.",
  },
];

type SP = Record<string, string | string[] | undefined>;

function param(sp: SP, key: string): string | undefined {
  const v = sp[key];
  return Array.isArray(v) ? v[0] : v;
}

// A control is "confirmed" only on an explicit Yes. "No", "Not sure", or missing => a gap.
function isConfirmed(v: string | undefined): boolean {
  return typeof v === "string" && v.trim().toLowerCase() === "yes";
}

function joinLabels(labels: string[]): string {
  if (labels.length === 1) return labels[0];
  return `${labels.slice(0, -1).join(", ")}, and ${labels[labels.length - 1]}`;
}

const BAND_META: Record<
  "high" | "gaps" | "strong" | "clear",
  { label: string; color: string }
> = {
  high: { label: "Significant gaps", color: "#DC2626" },
  gaps: { label: "Some gaps", color: "#D97706" },
  strong: { label: "Strong", color: "#1D4ED8" },
  clear: { label: "All clear", color: "#059669" },
};

function RiskMeter({
  band,
  score,
}: {
  band: "high" | "gaps" | "strong" | "clear";
  score: number;
}) {
  const meta = BAND_META[band];
  const pct = Math.max(0, Math.min(100, Number.isFinite(score) ? score : 0));
  return (
    <div className="mt-6 max-w-prose">
      <div className="flex items-center justify-between text-sm font-medium">
        <span className="text-muted">Risk level</span>
        <span style={{ color: meta.color }}>{meta.label}</span>
      </div>
      <div
        className="mt-2 h-3 w-full overflow-hidden rounded-full bg-muted-border"
        role="img"
        aria-label={`Score ${pct} out of 100: ${meta.label}`}
      >
        <div
          className="h-full rounded-full"
          style={{ width: `${pct}%`, backgroundColor: meta.color }}
        />
      </div>
      <div className="mt-1 flex justify-between text-xs text-muted-light">
        <span>0</span>
        <span>100</span>
      </div>
    </div>
  );
}

export default function ResultPage({ searchParams }: { searchParams: SP }) {
  const scoreRaw = param(searchParams, "score");
  const bemail = param(searchParams, "bemail");
  const bname = param(searchParams, "bname");

  // Graceful fallback if someone lands here without completing the Scorecard.
  if (scoreRaw === undefined) {
    return (
      <div className="container-page pt-8 pb-16 md:pt-12 md:pb-24">
        <div className="max-w-prose">
          <h1 className="text-3xl font-semibold md:text-4xl">
            Take the Scorecard first
          </h1>
          <p className="prose-hipsana mt-6">
            This page shows your results once you&rsquo;ve completed the free
            HIPAA Security Scorecard.
          </p>
          <p className="mt-8">
            <Link href="/scorecard" className="btn-primary">
              Start the Scorecard
            </Link>
          </p>
        </div>
      </div>
    );
  }

  const score = Number(scoreRaw);
  const failed = CONTROLS.filter(
    (c) => !isConfirmed(param(searchParams, c.key))
  ).sort((a, b) => a.severity - b.severity);

  let band: "high" | "gaps" | "strong" | "clear";
  if (failed.length === 0) band = "clear";
  else if (score >= 86) band = "strong";
  else if (score >= 50) band = "gaps";
  else band = "high";

  const lead = failed[0];
  const rest = failed.slice(1);

  const intro =
    band === "high"
      ? "A score this low means several of the controls OCR most commonly cites aren't in place."
      : band === "gaps"
      ? "Your foundations are partly in place, with a few gaps that carry real weight."
      : band === "strong"
      ? `That's a strong result. Most of the core controls are already in place, with ${
          failed.length === 1 ? "one worth a closer look" : "a few worth confirming"
        }.`
      : "That's a strong result, and every control we asked about is in place. Practices that score here usually still benefit from a second pair of eyes, since a scorecard can't catch everything.";

  const connector = band === "strong" ? "The one to confirm is" : "Your biggest exposure is";

  const restLine =
    rest.length === 0
      ? null
      : `We also couldn't confirm${rest.length === 1 ? " " : ": "}${joinLabels(
          rest.map((c) => c.shortLabel)
        )}.`;

  const cta =
    band === "high"
      ? "The free 15-minute review walks through what your answers flag and what each gap tends to mean for a practice your size, in plain English. If you want help closing them, we may point you to a specialist. Most of it is more fixable than it looks. It's run by us, not a salesperson, and there's nothing to buy."
      : band === "gaps"
      ? "The free 15-minute review walks through what your answers flag and what each gap tends to mean for a practice your size, in plain English. If you want help closing them, we may point you to a specialist. It's run by us, not a salesperson, and there's nothing to buy."
      : band === "strong"
      ? `The free 15-minute review goes over what's solid and walks you through ${
          failed.length === 1 ? "that point" : "those points"
        }. No pitch, nothing to buy.`
      : "If you'd like us to take that look, the free 15-minute review is yours. There's nothing to buy.";

  const emailLine =
    band === "clear"
      ? "You'll also get a short written confirmation by email."
      : "You'll also get a short written summary of your gaps by email.";

  return (
    <div className="container-page pt-8 pb-16 md:pt-12 md:pb-24">
      <ScanReveal>
      <div className="max-w-prose">
        <p className="eyebrow">Your HIPAA Security Scorecard</p>
        <h1 className="mt-3 text-3xl font-semibold md:text-5xl">
          Your practice scored {Number.isFinite(score) ? score : scoreRaw}/100.
        </h1>

        <RiskMeter band={band} score={score} />

        <p className="prose-hipsana mt-3 text-sm">
          This is an educational self-assessment based only on your answers, not
          an audit or legal advice. A high score doesn&rsquo;t mean your practice
          is compliant.
        </p>

        <p className="prose-hipsana mt-6">{intro}</p>

        {band !== "clear" && lead ? (
          <p className="prose-hipsana mt-6">
            {connector} {lead.leadBody}
          </p>
        ) : null}

        {restLine ? <p className="prose-hipsana mt-6">{restLine}</p> : null}

        <p className="prose-hipsana mt-6">{cta}</p>
      </div>

      <h2 className="mt-12 max-w-prose font-display text-2xl tracking-tight md:text-3xl">
        Book your free 15-minute review
      </h2>

      <div className="mt-6 max-w-prose">
        <ReviewBookingEmbed email={bemail} name={bname} />
      </div>

      <p className="mt-4 max-w-prose text-sm text-muted">
        Prefer not to use the calendar, or having trouble with it? Email{" "}
        <a
          href="mailto:hello@hipsana.com"
          className="text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
        >
          hello@hipsana.com
        </a>{" "}
        and we&rsquo;ll set up your review.
      </p>

      <p className="mt-6 max-w-prose text-sm italic text-muted">
        By booking, you agree we may share your details with a specialist
        if a referral makes sense. If we introduce you to one, we may be
        compensated for the referral.
      </p>

      <p className="mt-3 max-w-prose text-sm text-muted">{emailLine}</p>
      </ScanReveal>
    </div>
  );
}
