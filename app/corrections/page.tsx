import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corrections Policy",
  description:
    "How Hipsana corrects mistakes in its HIPAA guidance: what counts as a correction, where corrections appear, and how to report an error.",
  alternates: { canonical: "https://hipsana.com/corrections" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Corrections Policy · Hipsana",
    description:
      "How Hipsana corrects mistakes in its HIPAA guidance: what counts as a correction, where corrections appear, and how to report an error.",
    url: "https://hipsana.com/corrections",
    type: "website",
    images: [
      {
        url: "https://hipsana.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Hipsana: HIPAA & cybersecurity for independent dental practices.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Corrections Policy · Hipsana",
    description:
      "How Hipsana corrects mistakes in its HIPAA guidance: what counts as a correction, where corrections appear, and how to report an error.",
    images: ["https://hipsana.com/og-default.png"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://hipsana.com/corrections",
  name: "Corrections Policy",
  url: "https://hipsana.com/corrections",
  description:
    "How Hipsana corrects mistakes in its HIPAA guidance, including what counts as a correction, where corrections appear, and how to report an error.",
  isPartOf: { "@id": "https://hipsana.com/#website" },
  about: { "@id": "https://hipsana.com/#organization" },
  publisher: { "@id": "https://hipsana.com/#organization" },
  datePublished: "2026-06-18",
  dateModified: "2026-06-18",
  inLanguage: "en-US",
};

export default function CorrectionsPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Corrections policy</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          How we correct mistakes, in plain language.
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: June 18, 2026</p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          The short version: when something we published turns out to be wrong,
          we fix it and say plainly what changed, with the date attached. We
          would rather correct a mistake in the open than let it stand. If you
          find an error in our HIPAA guidance, a wrong figure, a recommendation
          that has gone stale, or a source we should have cited, tell us. We
          check it against the regulator’s own text and correct the page when a
          change is warranted. Here is what we count as a correction and where
          corrections appear.
        </p>

        <h2>Why we correct in the open</h2>
        <p>
          We write about a subject where one wrong detail can cost a practice
          real money. A misread penalty figure or an outdated requirement is not
          a small thing when a dentist is deciding what to do next. So accuracy
          matters to us more than looking flawless, and a visible correction is
          not an embarrassment to bury. It is the part of the work that earns the
          right to be trusted on everything else. We would rather you watch us
          fix an error than wonder whether we ever would.
        </p>

        <h2>What we treat as a correction</h2>
        <p>
          Not every edit is a correction, so we separate three things. A
          correction fixes a statement that was factually wrong when we published
          it, such as a mis-stated HIPAA section, an incorrect penalty amount, or
          a requirement we described inaccurately. A clarification rewrites
          something that was accurate but easy to misread, where the facts did
          not change but the wording needed to. A routine update reflects the
          world moving on, a rule that changed or fresh guidance from a
          regulator, rather than a mistake on our part. The first two are marked
          as described below. A routine update is carried by the article’s “last
          updated” date.
        </p>

        <h2>Where a correction appears</h2>
        <p>
          When we correct a substantive error, we note it on the affected article
          itself, near the bottom, with the date and a plain description of what
          changed. If the error was serious enough to have misled a reader, we
          also flag it at the top of the article so no one has to go looking. We
          do not quietly replace the wrong text with the right text and act as
          though the page always read that way. The article’s “last updated” date
          reflects a real review of the content, not a cosmetic touch.
        </p>
        <p>
          Each correction stays on the article it belongs to, where a reader is
          most likely to see it. This page is also the single place we record
          material corrections, so there is one public account of what changed
          and when. When we make one, it will appear here with the date and what
          was corrected. As of June 2026, we have not had to record a material
          correction.
        </p>

        <h2>How quickly we fix things</h2>
        <p>
          We correct an error as soon as we have confirmed the right answer
          against the source, which usually means reading the regulation or the
          HHS resolution agreement again rather than trusting a summary. There is
          no statute of limitations on this. It does not matter whether the
          mistake went live last week or a year ago. If it is wrong, it gets
          fixed.
        </p>

        <h2>How to tell us about an error</h2>
        <p>
          If you spot something wrong, stale, or missing a source, email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a> and point us
          to the article and the exact claim. The more precise you are, the
          faster we can check it. We read every message of this kind and check
          the claim against the primary source before replying. You can also
          reach us through our <a href="/contact">contact page</a>.
        </p>

        <h2>What we will not do</h2>
        <p>
          We will not edit a substantive error out of an article and pretend the
          page always read correctly. We will not leave a mistake we know about
          uncorrected because fixing it is inconvenient. We will not let a
          referral fee decide whether, or how plainly, a correction gets made.
          How we make money is set out in full on our{" "}
          <a href="/disclosure">Disclosure</a> page, and the wider sourcing and
          verification discipline behind every article is on our{" "}
          <a href="/editorial-standards">Editorial Standards</a> page.
        </p>

        <h2>Educational content disclaimer</h2>
        <p>
          Hipsana provides informational content about cybersecurity and HIPAA
          compliance. We are not attorneys, compliance officers, or healthcare
          professionals. Nothing here is legal, regulatory, medical, or financial
          advice. For questions specific to your practice, consult a qualified
          professional. Regulations change; verify current requirements with the
          relevant regulator (HHS, OCR, FTC) before acting.
        </p>
      </div>
    </section>
  );
}
