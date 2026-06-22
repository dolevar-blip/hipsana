import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "A free HIPAA Security Scorecard and written risk review for independent dental, medical, and therapy practices, plus an intro to a specialist.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About · Hipsana",
    description:
      "A free HIPAA Security Scorecard and written risk review for independent dental, medical, and therapy practices, plus an intro to a specialist.",
    url: "https://hipsana.com/about",
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
  twitter: {
    card: "summary_large_image",
    title: "About · Hipsana",
    description:
      "A free HIPAA Security Scorecard and written risk review for independent dental, medical, and therapy practices, plus an intro to a specialist.",
    images: ["/og-default.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://hipsana.com/about#person",
  name: "Dolev Arama",
  url: "https://hipsana.com/about",
  jobTitle: "Founder",
  worksFor: { "@type": "Organization", "@id": "https://hipsana.com/#organization" },
  description:
    "Founder of Hipsana. He builds the HIPAA Risk Scorecard and writes the practice risk reviews, working from primary regulatory sources (HHS, OCR, NIST) rather than secondary summaries.",
};

export default function AboutPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">About Hipsana</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          For clinicians who run their own practice.
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          Hipsana is built for a specific person: the dentist, physician, or
          therapist who owns a small practice, knows HIPAA is serious, and
          doesn&rsquo;t have time to read hundreds of pages of federal
          regulations to find out where they stand.
        </p>

        <h2>Who we serve</h2>
        <p>
          Solo practitioners and practice owners with one to ten staff. People
          who run the whole practice themselves, know HIPAA carries real
          personal risk, and have no in-house compliance help and no time to
          build it.
        </p>

        <h2>How we work</h2>
        <p>
          It starts with the Scorecard: ten yes/no questions about how your
          practice handles patient data, scored against the HIPAA Security Rule.
          You get a number out of 100, based on your answers, and a written
          review of the gaps they point to.
        </p>
        <p>
          The review starts with the actual regulation, not a vendor&rsquo;s
          marketing page. We look at what the Security Rule requires, where
          practices often fall short, and what a fix actually involves, because
          HIPAA problems often come down to how a tool is configured, not the
          tool itself.
        </p>
        <p>
          If you want help closing those gaps, we introduce you to a compliance specialist who does that work. The Scorecard and the review
          are free.
        </p>

        <h2>The standard behind Hipsana</h2>
        <p>
          Hipsana is built to a single standard. Every regulatory claim traces
          to a primary source: the HIPAA Security Rule itself, the enforcement
          record the HHS Office for Civil Rights publishes, and NIST&rsquo;s
          security guidance. Where a figure comes from breach data or industry
          research, we name the source. Anything we cannot verify against a
          regulator, we label rather than guess. The discipline is the point. It
          lets a practice owner see exactly where they stand and confirm every
          word of it independently.
        </p>
        <p>
          Hipsana is built for a single audience:
          solo and small practices that carry a hospital&rsquo;s HIPAA
          obligations without a hospital&rsquo;s compliance department. The work
          is narrow on purpose, turning a sprawling federal rulebook into the
          handful of things that actually put a practice at risk.
        </p>

        <h2>About the author</h2>
        <p>
          Hipsana is written by its founder, Dolev Arama. He built the Scorecard
          and writes the reviews behind it. He is not an attorney, and Hipsana is
          a publisher and referral service, not a law firm or a healthcare
          provider. And he won&rsquo;t pretend to be a compliance authority. What
          he brings instead is one rule he doesn&rsquo;t break: every regulatory
          claim is traced to the regulator that made it (HHS, OCR, or NIST).
          Where a figure comes from breach data or industry research, the source
          is named, and anything he can&rsquo;t verify gets labeled, not guessed.
          That&rsquo;s the point. You never
          have to take his word for any of it: the sources are named, and you can
          open every one yourself.
        </p>

        <h2>What we are not</h2>
        <p>
          We are not attorneys, compliance officers, or healthcare
          professionals. The Scorecard and the written review are informational:
          a starting point for understanding your risk, not legal or compliance
          advice, and not a substitute for a professional engagement when your
          situation calls for one.
        </p>
        <p>
          We also don&rsquo;t handle patient data. The Scorecard asks how your
          practice operates, never about individual patients, and we never
          collect protected health information. For questions specific to your
          practice, consult someone licensed to answer them.
        </p>

        <h2>How we make money</h2>
        <p>
          When the Scorecard surfaces gaps you want help with, we connect you to
          a compliance specialist who handles that work. If you decide to
          work with them, their firm pays us a referral fee. It never costs you
          anything, and it never changes what your review says.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, corrections, or feedback: email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>. We read
          every message and respond to most within a few business days.
        </p>
      </div>

      <div className="mt-14 max-w-prose border-t border-muted-border pt-10">
        <p className="text-[17px] leading-relaxed text-muted">
          See where your practice stands. Ten questions, about three minutes.
        </p>
        <div className="mt-6">
          <Link href="/scorecard" className="btn-primary">
            Check my practice &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
