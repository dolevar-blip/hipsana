import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The plain-language terms for using Hipsana: what the free Scorecard and review are, how specialist introductions work, and the limits of our responsibility.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms of Service · Hipsana",
    description:
      "The plain-language terms for using Hipsana: what the free Scorecard and review are, how specialist introductions work, and the limits of our responsibility.",
    url: "https://hipsana.com/terms",
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

export default function TermsPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Terms of service</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          The terms, in plain language.
        </h1>

        <p className="mt-4 text-sm text-muted">Last updated: June 16, 2026</p>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          These terms cover how you can use Hipsana and what you can expect from
          us. We have kept them in plain language, the same way we write
          everything else here. By using this site, the Scorecard, or the
          review, you agree to what follows.
        </p>

        <h2>What Hipsana is</h2>
        <p>
          Hipsana is an educational publisher and a referral service. We provide
          free information about HIPAA and cybersecurity, a free Scorecard that
          estimates where your practice stands against the HIPAA Security Rule,
          and a free written review. When you want help closing a gap, we can
          introduce you to a vetted specialist. We are not attorneys, compliance
          officers, or healthcare professionals. We are not a HIPAA
          &ldquo;covered entity&rdquo; or &ldquo;business associate,&rdquo; and
          we do not handle protected health information (PHI).
        </p>

        <h2>The Scorecard and review are informational</h2>
        <p>
          The Scorecard and the written review are a starting point for
          understanding your risk. They are informational only. They are not
          legal, regulatory, compliance, medical, or financial advice, and they
          are not a substitute for a professional engagement when your situation
          calls for one. A high score is not a certification, and nothing on
          this site means your practice is &ldquo;HIPAA compliant.&rdquo;
          Compliance depends on how you actually configure and use your systems.
          Regulations change, so verify current requirements with the relevant
          regulator (HHS, OCR, FTC) before acting.
        </p>

        <h2>Introductions to specialists</h2>
        <p>
          If your review surfaces gaps you want help with, we may introduce you
          to one vetted specialist who does that work. The introduction is
          optional, and the choice is always yours. The specialist is an
          independent company: they, not Hipsana, are responsible for the
          services they provide, the agreement you sign with them, and the
          results of their work. If you choose to hire them, their firm pays us
          a referral fee. It never costs you anything and never changes what
          your review says. Our <a href="/disclosure">Disclosure page</a>{" "}
          explains this in full.
        </p>

        <h2>Using the site fairly</h2>
        <p>
          Please use Hipsana for its intended purpose. Do not send us patient
          data or any PHI; the Scorecard asks only about how your practice
          operates, never about individual patients. Do not misuse the site, try
          to break or overload it, scrape it with automated tools, or use it to
          do anything unlawful. If someone uses the site in these ways, we may
          limit or block their access to it.
        </p>

        <h2>Our content</h2>
        <p>
          The writing, design, Scorecard, the Hipsana name and logo, and other
          materials on this site belong to Hipsana or are used with permission.
          You are welcome to read our pages and share links to them. Please do
          not copy, republish, or reuse our content, name, or logo for your own
          commercial purposes without our written permission.
        </p>

        <h2>Other sites and tools we link to</h2>
        <p>
          We sometimes link to other websites and tools, including some
          affiliate links that we label. We do not control those third parties
          and are not responsible for their content, products, or practices.
          Visiting them is at your own discretion and subject to their own
          terms.
        </p>

        <h2>No warranties</h2>
        <p>
          We work hard to keep our information accurate and current, but Hipsana
          and the people who work on it provide the site, the Scorecard, and the
          review &ldquo;as is&rdquo; and &ldquo;as available,&rdquo; without
          warranties of any kind. We do not warrant that the content is
          complete, current, or error-free, that the site will always be
          available, or that using it will produce any particular result.
        </p>

        <h2>Our liability</h2>
        <p>
          To the maximum extent allowed by law, Hipsana and the people who work
          on it (its owner, staff, and contractors) are not liable for any
          indirect, incidental, or consequential loss arising from your use of
          the site, the Scorecard, the review, or any introduction we make.
          Because everything we offer you is free, our total liability to you
          for any claim is limited to one hundred US dollars ($100).
        </p>

        <h2>Covering claims from misuse</h2>
        <p>
          If your misuse of the site, or your breach of these terms, leads to a
          claim against us, you agree to cover the reasonable costs we incur as
          a result.
        </p>

        <h2>Changes to these terms</h2>
        <p>
          If we change these terms, we will post the new version here and update
          the &ldquo;Last updated&rdquo; date at the top. If a change is
          significant, we will make that clear. Continuing to use the site after
          a change means you accept the updated terms.
        </p>

        <h2>If part of these terms cannot be enforced</h2>
        <p>
          If a court decides that any part of these terms cannot be enforced,
          the rest of the terms still apply. Only the part that cannot be
          enforced is set aside, and everything else stays in effect.
        </p>

        <h2>The whole agreement</h2>
        <p>
          These terms, together with our{" "}
          <a href="/disclosure">Disclosure</a> and{" "}
          <a href="/privacy">Privacy</a> pages, make up the entire agreement
          between you and Hipsana about your use of the site, and they replace
          anything said or written before on the subject.
        </p>

        <h2>Which law applies</h2>
        <p>
          These terms are governed by the laws of the State of Israel, where
          Hipsana operates, without regard to conflict-of-law rules. Any dispute
          relating to these terms or to your use of the site will be handled by
          the competent courts located in Israel.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>.
        </p>
      </div>
    </section>
  );
}
