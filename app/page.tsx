import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  description:
    "A free HIPAA Security Scorecard for independent dental, medical, and therapy practices. Find your gaps in minutes, plus a written review and specialist intro.",
  alternates: { canonical: "/" },
};

const pillars = [
  {
    title: "Plain-language risk findings",
    body:
      "We translate the HIPAA Security Rule into the handful of gaps that actually put your practice at risk. The answer comes first, the jargon stays out.",
  },
  {
    title: "Independent-practice scale",
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
      <section className="container-page pt-12 pb-20 md:pt-16 md:pb-28">
        <div className="max-w-3xl">
          <p className="eyebrow mb-5">For independent dental, medical, and therapy practices</p>
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

      {/* Common questions */}
      <section className="border-t border-muted-border">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">Common questions</p>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              What practice owners ask first.
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              Three of the questions we hear most, each answered plainly and
              built on a real OCR case sourced to HHS or NIST.
            </p>

            <ul className="mt-10 space-y-6">
              <li>
                <Link
                  href="/articles/what-happens-if-dental-practice-fails-hipaa-audit"
                  className="font-display text-lg text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
                >
                  What happens if a dental practice fails a HIPAA audit?
                </Link>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  What a random audit actually triggers, and what a finding costs
                  a small practice.
                </p>
              </li>
              <li>
                <Link
                  href="/articles/how-much-does-a-hipaa-risk-assessment-cost-for-a-dental-practice"
                  className="font-display text-lg text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
                >
                  How much does a HIPAA risk assessment cost?
                </Link>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  What the free HHS tool covers, and when paying a specialist is
                  worth it.
                </p>
              </li>
              <li>
                <Link
                  href="/articles/is-chatgpt-hipaa-compliant-dental-practice"
                  className="font-display text-lg text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
                >
                  Is ChatGPT HIPAA compliant for a dental practice?
                </Link>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">
                  Where everyday AI tools quietly create a HIPAA gap, and the one
                  test that settles it.
                </p>
              </li>
            </ul>

            <p className="mt-10 text-[17px] leading-relaxed text-muted">
              Or skip ahead and{" "}
              <Link
                href="/scorecard"
                className="text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
              >
                see where your own practice stands &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Proof from the public record */}
      <section className="border-t border-muted-border bg-teal-subtle">
        <div className="container-page py-16 md:py-20">
          <div className="max-w-3xl">
            <p className="eyebrow mb-3">From the public record</p>
            <h2 className="font-display text-3xl tracking-tight md:text-4xl">
              What a missing risk analysis actually costs
            </h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">
              In 2020, a solo physician&rsquo;s practice settled with HHS for
              $100,000 and two years of federal monitoring. The trigger
              wasn&rsquo;t a hacker or a stolen laptop. OCR found the practice
              had never completed one basic document:{" "}
              <Link
                href="/articles/do-dental-practices-need-hipaa-risk-assessment"
                className="text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
              >
                the risk analysis the HIPAA Security Rule requires
              </Link>
              . To OCR, a solo physician and a solo dentist answer to the same
              baseline. The free Scorecard checks whether that document, and the
              gaps around it, exist in yours.
            </p>

            <figure className="mt-8">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ocr-hipaa-settlement-porter-risk-analysis.webp"
                alt="Excerpts from the HHS Office for Civil Rights resolution agreement with Steven A. Porter, M.D., P.C., a solo practice, with the cited failure to conduct a risk analysis and the $100,000 settlement highlighted."
                width={1500}
                height={562}
                loading="lazy"
                decoding="async"
                className="h-auto w-full rounded-xl border border-muted-border"
              />
              <figcaption className="mt-3 text-sm leading-[1.6] text-muted">
                Source: U.S. Department of Health and Human Services, Office for
                Civil Rights.{" "}
                <a
                  href="https://www.hhs.gov/about/news/2020/03/03/health-care-provider-pays-100000-settlement-ocr-failing-implement-hipaa.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal underline decoration-teal/30 underline-offset-2 hover:decoration-teal"
                >
                  Press release, March 3, 2020
                </a>{" "}
                (the practice of Steven A. Porter, M.D.). Highlights added by
                Hipsana.
              </figcaption>
            </figure>

            <div className="mt-10 rounded-xl border border-muted-border bg-white p-6">
              <p className="eyebrow mb-2">Report</p>
              <h3 className="font-display text-xl text-ink">
                <Link
                  href="/articles/dental-hipaa-breach-and-enforcement-report"
                  className="transition-colors hover:text-teal"
                >
                  Dental HIPAA Breach and Enforcement Report (2026)
                </Link>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">
                We read the public HHS breach and enforcement data so you
                don&rsquo;t have to: how dental practices actually get breached,
                and the one failure OCR keeps fining them for.
              </p>
              <Link
                href="/articles/dental-hipaa-breach-and-enforcement-report"
                className="mt-3 inline-block text-sm font-medium text-teal"
              >
                Read the report &rarr;
              </Link>
            </div>
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
