import Link from "next/link";

const pillars = [
  {
    title: "Plain-language reviews",
    body:
      "We translate HIPAA jargon into the language a busy clinician actually thinks in. No three-page preamble before the recommendation.",
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
            Hipsana is a practical guide to cybersecurity and HIPAA for clinicians
            who run their own practice. Reviews you can read in ten minutes,
            recommendations you can implement in an afternoon.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link href="/about" className="btn-primary">
              How we work
            </Link>
            <Link href="/disclosure" className="btn-secondary">
              Our disclosure policy
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

      {/* Coming soon */}
      <section className="container-page py-20 md:py-24">
        <div className="max-w-2xl">
          <p className="eyebrow mb-3">What&rsquo;s next</p>
          <h2 className="font-display text-3xl tracking-tight md:text-4xl">
            First reviews and tools coming soon.
          </h2>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
            We&rsquo;re building this site in public. The first round of reviews is
            in progress, and the first interactive tool &mdash; a breach-exposure
            checker for clinical practices &mdash; will launch alongside them.
          </p>
          <p className="mt-5 text-[17px] leading-relaxed text-muted">
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
