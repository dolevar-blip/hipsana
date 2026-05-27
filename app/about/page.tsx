import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Hipsana is a practical guide to HIPAA and cybersecurity for solo dental, medical, and therapy practices. Here is how we work and who we serve.",
};

export default function AboutPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">About Hipsana</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          For clinicians who run their own practice.
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          Hipsana is built for a specific reader: the dentist, physician, or
          therapist who owns a small practice, knows HIPAA is serious, and
          doesn&rsquo;t have time to read a 4,000-page federal register entry.
        </p>

        <h2>Who we serve</h2>
        <p>
          Solo practitioners and practice owners with one to ten staff. People
          who can&rsquo;t hire a full-time compliance officer, can&rsquo;t afford
          a $50,000 consulting engagement, and shouldn&rsquo;t need to. Most of
          our readers are between 35 and 58, technically literate enough to use
          modern software, but not interested in becoming IT specialists.
        </p>

        <h2>How we work</h2>
        <p>
          Every review starts with the actual regulation, not a vendor&rsquo;s
          marketing page. When we say a product is HIPAA-compliant, we&rsquo;ve
          verified the BAA (Business Associate Agreement) language, checked the
          encryption claims against current NIST guidance, and noted the
          configuration steps required &mdash; because most HIPAA violations
          happen at the configuration layer, not the product layer.
        </p>

        <p>
          When we recommend a product, we say why. When we don&rsquo;t, we say
          why not. When a free option is good enough, we recommend the free
          option even if it pays us nothing.
        </p>

        <h2>What we are not</h2>
        <p>
          We are not attorneys. We are not compliance officers. We are not
          healthcare professionals. Hipsana is a publication, not a service.
          Nothing here is legal, regulatory, medical, or financial advice. For
          questions specific to your practice, consult someone licensed to give
          you that answer.
        </p>

        <h2>How we make money</h2>
        <p>
          Hipsana earns affiliate commissions on some of the products we
          recommend. We disclose this on every page, and we maintain a strict
          rule: commission rate never affects our recommendation. When a higher-
          commission product isn&rsquo;t the right fit, we recommend a different
          one. Full details on our{" "}
          <a href="/disclosure">disclosure page</a>.
        </p>

        <h2>Contact</h2>
        <p>
          Questions, corrections, or feedback: email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>. We read
          every message and respond to most within a few business days.
        </p>
      </div>
    </section>
  );
}
