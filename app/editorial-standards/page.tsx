import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Standards",
  description:
    "How Hipsana sources, verifies, updates, and corrects its HIPAA guidance, and how we keep it independent of how we make money.",
  alternates: { canonical: "https://hipsana.com/editorial-standards" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Editorial Standards · Hipsana",
    description:
      "How Hipsana sources, verifies, updates, and corrects its HIPAA guidance, and how we keep it independent of how we make money.",
    url: "https://hipsana.com/editorial-standards",
    type: "website",
    images: [
      {
        url: "https://hipsana.com/og-default.png",
        width: 1200,
        height: 630,
        alt: "Hipsana: HIPAA & cybersecurity for independent healthcare practices.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Editorial Standards · Hipsana",
    description:
      "How Hipsana sources, verifies, updates, and corrects its HIPAA guidance, and how we keep it independent of how we make money.",
    images: ["https://hipsana.com/og-default.png"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://hipsana.com/editorial-standards",
  name: "Editorial Standards",
  url: "https://hipsana.com/editorial-standards",
  description:
    "How Hipsana sources, verifies, updates, and corrects its HIPAA guidance, and how it stays independent of how the site makes money.",
  isPartOf: { "@id": "https://hipsana.com/#website" },
  about: { "@id": "https://hipsana.com/#organization" },
  publisher: { "@id": "https://hipsana.com/#organization" },
  datePublished: "2026-06-18",
  dateModified: "2026-06-18",
  inLanguage: "en-US",
};

export default function EditorialStandardsPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Editorial standards</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          How we research and source, in plain terms.
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: June 18, 2026</p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          The short version: we hold every factual and regulatory statement on
          this site to one standard. It traces to a primary source, the agency
          that wrote the rule or recorded the case, or it gets labeled as
          unverified, never guessed. Much of the HIPAA guidance online leans on
          vendor summaries and secondhand coverage; we work from the regulator’s
          own text and link to it, so you never have to take our word for it. We
          write about a subject where one wrong detail can cost a practice real
          money, so when we are not certain, we say so. Here is how the work is
          done.
        </p>

        <h2>What Hipsana is</h2>
        <p>
          Hipsana is an educational publisher and a referral service. We are not
          a HIPAA “covered entity” or “business associate,” and we do not handle
          protected health information. The Scorecard asks how your practice
          operates, never about individual patients.
        </p>

        <h2>Who writes it</h2>
        <p>
          Hipsana is written by its founder, Dolev Arama, who is accountable for
          the accuracy of what appears here. He does not claim to be a compliance
          authority. What he holds to is the sourcing discipline below: if a
          statement cannot be traced to the regulator that made it, it does not
          go on the site. There is more about who we serve, and why, on our{" "}
          <a href="/about">About page</a>.
        </p>

        <h2>Where our facts come from</h2>
        <p>
          We rank our sources and lean on the most authoritative first. The rules
          themselves come from the government: HHS, its Office for Civil Rights,
          NIST, and the FTC. When a page states what a rule requires, we read the
          regulation’s official text rather than a summary of it, and we link to
          it so you can check the wording yourself.
        </p>
        <p>
          Below the regulators sit peer-reviewed and academic sources, used where
          a clinical or technical point calls for them. Industry data, such as
          the Verizon Data Breach Investigations Report or IBM’s breach-cost
          research, informs context and is never the basis for a legal claim. We
          cite a news report only to establish that a specific breach or
          enforcement action happened. Vendor research is treated with caution
          and is never the only source behind a claim, and industry blogs are for
          opinion, not evidence.
        </p>

        <h2>How we check a claim before it runs</h2>
        <p>
          Before a regulatory statement goes live, we verify it against the
          current official text. A citation to a specific HIPAA section is checked
          against the regulation as it reads today. A penalty figure comes only
          from the resolution agreement HHS published in that case, not from a
          secondary roundup, and we link to that agreement. We do not quote
          statistics from memory. When an article rests on an enforcement case, we
          name the practice, the year, the amount, and the specific failure, and
          we show the source document so you can confirm it yourself.
        </p>

        <h2>When we publish our own data</h2>
        <p>
          Hipsana runs a free Security Scorecard, and over time the anonymized,
          aggregated results will show patterns worth reporting, such as which
          gaps come up most often in small practices. We have not published
          findings from that data yet. When we do, we will report how many
          practices a figure is based on, describe how the data was collected and
          stripped of anything identifying, and show the patterns as they are
          rather than the ones that flatter us. Until then, we rely on the named
          enforcement cases and primary sources above.
        </p>

        <h2>When the rules are not settled</h2>
        <p>
          Some of HIPAA is in motion. When a rule is proposed but not yet final,
          we say so plainly and label it as proposed, never as current law.
          Plenty of guidance online blurs that line. We do not. When a question
          has no clear regulatory answer, we tell you that instead of inventing
          certainty. The aim is simple: you can act on what is settled, and see
          exactly where the open questions are.
        </p>

        <h2>Keeping it current</h2>
        <p>
          Every article shows the date it was published and the date it was last
          updated. We review our main articles at least once a year, and again
          whenever the rule changes, an enforcement pattern shifts, or a reader
          points out something that has gone stale. The “last updated” date
          reflects a real review of the content, not a cosmetic edit.
        </p>

        <h2>What we will not do</h2>
        <p>
          We will not publish a regulatory claim we have not checked against the
          source. We will not state a penalty figure that does not come from an
          HHS resolution agreement. We will not present a proposed rule as if it
          were already law. We will not let a referral fee change a single word of
          what an article says.
        </p>

        <h2>How money fits in</h2>
        <p>
          Hipsana is free to use. We earn a referral fee only if you choose to
          work with a specialist we introduce you to, and that fee never changes
          what a review or an article says. The full detail is on our{" "}
          <a href="/disclosure">Disclosure</a> page.
        </p>

        <h2>Correcting mistakes</h2>
        <p>
          We get things wrong sometimes, and we would rather fix a mistake quickly
          than pretend it did not happen. If you spot an error, a stale
          recommendation, or a source we should have cited, email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a> and tell us
          what is wrong. We check it against the source, correct the page when it
          is warranted, and note material changes with a date.
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
