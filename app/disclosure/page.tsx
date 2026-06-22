import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "How Hipsana makes money: a referral fee from the specialist we connect you with, and our rule that it never changes what your review says.",
  alternates: { canonical: "/disclosure" },
  openGraph: {
    title: "Disclosure · Hipsana",
    description:
      "How Hipsana makes money: a referral fee from the specialist we connect you with, and our rule that it never changes what your review says.",
    url: "https://hipsana.com/disclosure",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Hipsana: HIPAA & cybersecurity for independent healthcare practices.",
      },
    ],
  },
};

export default function DisclosurePage() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Disclosure &amp; methodology</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          How we make money, in plain terms.
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          The short version: when we connect you with a specialist and you hire
          them, we get paid. That never changes what your Scorecard or review
          tells you. Here are the details.
        </p>

        <h2>How the free review is paid for</h2>
        <p>
          The Scorecard and the written review are free to you. If your review
          surfaces gaps you want help with, we may introduce you to a
          compliance specialist who does that work, when there&rsquo;s a fit. If you choose to hire them,
          their firm pays us a referral fee.
        </p>
        <p>
          You never pay us, and the fee never changes what your review says. If
          the honest finding is that your practice is in good shape, that is
          what we tell you, referral or not.
        </p>

        <h2>How we choose a specialist</h2>
        <p>
          We do not hand you to whoever pays the most. A specialist has to clear
          a real bar before we introduce you to them:
        </p>
        <p>
          <strong>Coverage where you are.</strong> They can serve a practice in
          your area, not just one distant region.
        </p>
        <p>
          <strong>Built for small practices.</strong> A one-to-ten-person
          office, not a hospital system with its own compliance team.
        </p>
        <p>
          <strong>Clear, upfront pricing.</strong> A written quote before you
          commit.
        </p>
        <p>
          <strong>A clean reputation.</strong> No pattern of complaints or
          bad-faith dealing.
        </p>
        <p>
          The introduction is ours to make; the decision is yours. Do your own
          due diligence before hiring anyone. We do not control how a specialist
          runs their business, and we do not warrant their work, their conduct,
          or any result.
        </p>

        <h2>How we handle your information</h2>
        <p>
          To deliver the review, we share your details with that one specialist
          partner and no one else. We do not sell or rent your information to data brokers, hand it to multiple companies, or share it for unrelated advertising. What we
          collect, why, how long we keep it, and how to have it deleted is laid
          out on our <a href="/privacy">Privacy page</a>.
        </p>

        <h2>How we decide what to tell you</h2>
        <p>
          Whether we are scoring your practice or writing about a tool, we use
          the same yardstick: what the HIPAA Security Rule actually requires,
          what fits a one-to-ten-person practice, the real cost over a year, and
          how much day-to-day friction it adds.
        </p>
        <p>
          The referral fee is not on that list. When the right answer earns us
          nothing, that is still the answer we give.
        </p>

        <h2>What we will not do</h2>
        <p>
          We will not bury disclosures in tiny gray text. We will not accept
          payment in exchange for a better score or a favorable write-up. We
          will not call any product &ldquo;100% HIPAA compliant,&rdquo; because
          none is. Compliance depends on how you configure and use it, and
          anyone who tells you otherwise is selling something.
        </p>

        <h2>Educational content disclaimer</h2>
        <p>
          Hipsana provides informational content about cybersecurity and HIPAA
          compliance. We are not attorneys, compliance officers, or healthcare
          professionals. Nothing here is legal, regulatory, medical, or
          financial advice. For questions specific to your practice, consult a
          qualified professional. Regulations change; verify current
          requirements with the relevant regulator (HHS, OCR, FTC) before
          acting.
        </p>

        <h2>Questions or corrections</h2>
        <p>
          If you spot an error, a stale recommendation, or a conflict of
          interest we should disclose, email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>. We respond
          to corrections within a few business days and note material changes
          with a date.
        </p>
      </div>
    </section>
  );
}

