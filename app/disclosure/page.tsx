import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosure",
  description:
    "Hipsana&rsquo;s affiliate disclosure, review methodology, and conflict-of-interest policy. Full transparency on how we make money and how we choose recommendations.",
};

export default function DisclosurePage() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Disclosure &amp; methodology</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          Full transparency on how we make money.
        </h1>

        <p className="mt-8 text-lg leading-relaxed text-muted">
          The short version: some of the products we recommend pay us a
          commission when you sign up through our links. We disclose this on
          every page where it applies. Our recommendations are not influenced by
          commission rates.
        </p>

        <h2>Affiliate relationships</h2>
        <p>
          Hipsana participates in affiliate programs for cybersecurity and
          compliance products that serve healthcare practices. When you click an
          affiliate link on this site and sign up for the product, we may
          receive a commission. The price you pay is the same as if you had
          gone directly to the vendor.
        </p>

        <p>
          A list of the specific affiliate programs we participate in is
          maintained internally and disclosed at the article level when
          relevant. We are not paid for reviews. We do not accept money in
          exchange for favorable coverage.
        </p>

        <h2>How we choose what to recommend</h2>
        <p>
          For every product we cover, we evaluate against the same criteria:
          actual HIPAA compliance (BAA available, encryption standards meet
          current NIST guidance, audit logging present), fit for solo and small
          practices, total cost over twelve months, and the friction of
          day-to-day use.
        </p>

        <p>
          Commission rate is not on that list. When a higher-commission product
          fails the fit test for our reader, we recommend the lower-commission
          product. When the right answer is a free product that pays us
          nothing, we recommend the free product.
        </p>

        <h2>What you can expect from us</h2>
        <p>
          Inline disclosure on every page that contains affiliate links, before
          the first recommendation. The phrase &ldquo;affiliate partner&rdquo;
          will appear when applicable.
        </p>
        <p>
          A clear separation between products we&rsquo;ve used personally,
          products we&rsquo;ve evaluated but not used long-term, and products we
          mention only for context. We will tell you which category each
          recommendation falls into.
        </p>
        <p>
          An honest accounting of trade-offs. Every product has weaknesses. We
          name them.
        </p>

        <h2>What we will not do</h2>
        <p>
          We will not bury affiliate disclosures in tiny gray footer text. We
          will not accept free product access in exchange for a favorable
          review. We will not claim a product is &ldquo;100% HIPAA
          compliant,&rdquo; because no product is &mdash; compliance depends on
          how you configure and use it, and any vendor or publisher who tells
          you otherwise is selling something.
        </p>

        <h2>Educational content disclaimer</h2>
        <p>
          Hipsana provides informational content about cybersecurity practices
          and compliance frameworks. We are not attorneys, compliance officers,
          or healthcare professionals. Nothing on this site constitutes legal,
          regulatory, medical, or financial advice. For questions specific to
          your practice, consult a qualified professional. Regulations change;
          verify current requirements with the relevant regulator (HHS, OCR,
          FTC, etc.) before acting on any information here.
        </p>

        <h2>Questions or corrections</h2>
        <p>
          If you spot an error, a stale recommendation, or a conflict of
          interest we should disclose, please email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>. We respond
          to corrections within a few business days and publish updates with a
          dated note when content materially changes.
        </p>
      </div>
    </section>
  );
}
