import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "A free HIPAA Security Scorecard for solo dental, medical, and therapy practices. Find your gaps in minutes, then get a written review and an intro to a vetted specialist.",
};

const pillars = [
  {
    title: "Plain-language risk findings",
    body:
      "We translate the HIPAA Security Rule into the handful of gaps that actually put your practice at risk. The answer comes first, the jargon stays out.",
  },
  {
    title: "Solo-practice scale",
    body:
      "Enterprise security tools are designed for IT departments you don&rsquo;t have. We focus on what works for a one-to-ten-person practice.",
  },
  {
    title: "Cited, not invented",
    body:
      "Every regulatory claim points back to HHS, OCR, or NIST. We qualify what we can&rsquo;t verify and tell you where we drew the line.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="container-page pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">For solo dental, medical, and therapy practices</p>
          <h1 className="font-display text-[2.75rem] leading-[1.05] tracking-tight md:text-[3.75rem]">
            HIPAA shouldn&rsquo;t require a compliance officer you can&rsquo;t afford.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted">
            Hipsana helps clinicians who run their own practice find the HIPAA
            gaps that put them at risk, then fix them. Start with a free Security
            Scorecard: ten questions, about three minutes, a score and a written
            review at the end.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/scorecard" className="btn-primary">
              Check my practice &rarr;
            </Link>
            <Link href="/about" className="btn-secondary">
              How we work
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="border-t border-muted-border bg-muted-bg">
        <div className="container-page py-20 md:py-24">
          <p className="eyebrow mb-3">What makes us different</p>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Three things we won&rsquo;t compromise on.
          </h2>

          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {pillars.map((pillar, idx) => (
              <div key={pillar.title}>
                <div className="font-display text-sm text-teal">
                  0{idx + 1}
                </div>
                <h3 className="mt-3 font-display text-xl text-ink">
                  {pillar.title}
                </h3>
                <p
                  className="mt-3 text-[15px] leading-relaxed text-muted"
                  dangerouslySetInnerHTML={{ __html: pillar.body }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Start with the Scorecard */}
      <section className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            Start with the free HIPAA Scorecard.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            Answer ten yes/no questions about how your practice handles patient
            data. You&rsquo;ll get a score out of 100 and a written review of your
            biggest gaps, plus the option to book a short risk review and an
            intro to a vetted specialist if you want help. About three minutes.
          </p>

          <div className="mt-8">
            <Link href="/scorecard" className="btn-primary">
              Check my practice &rarr;
            </Link>
          </div>

          <p className="mt-8 text-[17px] leading-relaxed text-muted">
            For questions, partnership inquiries, or feedback, the address is{" "}
            <a
              href="mailto:hello@hipsana.com"
              className="text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
            >
              hello@hipsana.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
