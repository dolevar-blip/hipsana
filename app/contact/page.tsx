import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hipsana. Email hello@hipsana.com for questions, corrections, partnership inquiries, or feedback.",
};

export default function ContactPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Contact</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          Get in touch.
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          The fastest way to reach us is email. We read every message and reply
          to most within two business days.
        </p>

        <div className="mt-10 rounded-lg border border-muted-border bg-muted-bg p-7">
          <div className="eyebrow mb-2">Email</div>
          <a
            href="mailto:hello@hipsana.com"
            className="font-display text-2xl text-ink hover:text-teal"
          >
            hello@hipsana.com
          </a>
        </div>

        <h2>What we can help with</h2>
        <p>
          Corrections to anything we&rsquo;ve published. Suggestions for
          products you&rsquo;d like to see reviewed. Partnership and outreach
          inquiries from cybersecurity vendors serving the healthcare market.
          Feedback on how we can make our reviews more useful.
        </p>

        <h2>What we can&rsquo;t help with</h2>
        <p>
          We can&rsquo;t answer specific compliance questions about your
          practice &mdash; that requires a licensed attorney, compliance
          consultant, or your accountant, depending on the question. We
          can&rsquo;t troubleshoot software you&rsquo;ve already purchased; the
          vendor&rsquo;s support team is the right place for that. We
          can&rsquo;t recommend whether to sign a specific BAA; that&rsquo;s a
          legal question.
        </p>

        <h2>For media and partnership inquiries</h2>
        <p>
          Use the same address. Put &ldquo;partnership&rdquo; or
          &ldquo;media&rdquo; in the subject line and we&rsquo;ll route it
          accordingly.
        </p>

        <p className="text-sm text-muted">
          Please do not send protected health information (PHI) by email.
          Hipsana is a publisher, not a healthcare service, and our email is
          not configured for PHI handling.
        </p>
      </div>
    </section>
  );
}
