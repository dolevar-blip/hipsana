import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Accessibility Statement",
  description:
    "How Hipsana works to keep this site usable for everyone, the accessibility steps we take, and how to reach us if you find any part hard to use.",
  alternates: { canonical: "https://hipsana.com/accessibility" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Accessibility Statement · Hipsana",
    description:
      "How Hipsana works to keep this site usable for everyone, the accessibility steps we take, and how to reach us if you find any part hard to use.",
    url: "https://hipsana.com/accessibility",
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
    title: "Accessibility Statement · Hipsana",
    description:
      "How Hipsana works to keep this site usable for everyone, the accessibility steps we take, and how to reach us if you find any part hard to use.",
    images: ["https://hipsana.com/og-default.png"],
  },
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://hipsana.com/accessibility",
  name: "Accessibility Statement",
  url: "https://hipsana.com/accessibility",
  description:
    "How Hipsana works to keep its website usable for people who rely on assistive technology, the accessibility measures in place, and how to report a barrier.",
  isPartOf: { "@id": "https://hipsana.com/#website" },
  about: { "@id": "https://hipsana.com/#organization" },
  publisher: { "@id": "https://hipsana.com/#organization" },
  datePublished: "2026-06-19",
  dateModified: "2026-06-19",
  inLanguage: "en-US",
};

export default function AccessibilityPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Accessibility statement</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          How we keep this site usable, in plain language.
        </h1>
        <p className="mt-4 text-sm text-muted">Last updated: June 19, 2026</p>
        <p className="mt-8 text-lg leading-relaxed text-muted">
          The short version: we want anyone to be able to use this site,
          including people who rely on a keyboard, a screen reader, or another
          assistive technology. This page explains what we do toward that, where
          parts of the site depend on tools we did not build, and how to reach
          us if something gets in your way. If any part is hard to use, we want
          to hear about it, and we will help you get what you came for another
          way.
        </p>

        <h2>What we aim for</h2>
        <p>
          We build Hipsana to follow the Web Content Accessibility Guidelines,
          known as WCAG, version 2.1 at level AA. We treat those guidelines as
          our reference for what an accessible site should do, and as the
          standard we work toward as the site changes. We do not claim the site
          is flawless against them. Where we fall short, we would rather know and
          fix it than pretend otherwise. The guidelines themselves are published
          by the{" "}
          <a href="https://www.w3.org/WAI/standards-guidelines/wcag/" target="_blank" rel="noopener noreferrer">World Wide Web Consortium</a>, the group that maintains them.
        </p>

        <h2>What we have built in</h2>
        <p>
          We have built several things into the site with this in mind. We
          design it to be navigated with a keyboard alone, with a visible focus
          outline so you can see where you are as you move, and a
          &ldquo;skip to content&rdquo; link near the top so keyboard and
          screen-reader users can jump past the menu straight to the page. We
          size and color text for readability, and we check it against the
          contrast level WCAG AA asks for. We provide written descriptions for
          images that convey information, wherever they are used. We build pages
          with plain, ordered headings and labeled regions, so assistive
          technology can make sense of their structure. And when you have asked
          your device or browser for reduced motion, we honor that setting and
          hold our animations back.
        </p>

        <h2>Where parts of the site rely on other tools</h2>
        <p>
          Two of the most useful things here, the HIPAA Security Scorecard and
          the option to book a review, run on outside services that we embed in
          our pages: the form is built with Tally, and the booking calendar with
          Cal.com. We chose tools that support accessibility, but we do not
          control every detail of how they render, and we will not pretend
          otherwise. So we built a plain way around them: on both the Scorecard
          and the booking page, you can email us instead, and we will send you
          the questions or set up your review by hand. You never have to get
          through a third-party widget to reach us.
        </p>

        <h2>If something gets in your way</h2>
        <p>
          If any part of this site is hard to use, or assistive technology does
          not behave the way it should, please tell us. Email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>, describe the
          page and what went wrong, and the more specific you are, the faster we
          can help. We read every message of this kind, and we aim to respond
          within five business days. If you cannot complete the Scorecard or book
          a review through the site, we will get you the same information, and
          the same review, another way. You can also reach us through our{" "}
          <a href="/contact">contact page</a>.
        </p>

        <h2>What we will not do</h2>
        <p>
          We will not claim this site is perfectly accessible or finished. We
          will not treat an embedded third-party tool as an excuse to ignore a
          barrier you run into, when we can always help you another way. We will
          not leave an accessibility problem we know about sitting unaddressed
          because fixing it is inconvenient. How we make money is set out in full
          on our <a href="/disclosure">Disclosure</a> page.
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
