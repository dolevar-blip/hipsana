import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "What Hipsana collects when you use the HIPAA Security Risk Scorecard, why we collect it, who we share it with, how long we keep it, and how to request deletion.",
  alternates: {
    canonical: "/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <section className="container-page py-20 md:py-24">
      <div className="prose-hipsana">
        <p className="eyebrow mb-3">Privacy</p>
        <h1 className="font-display text-4xl tracking-tight md:text-5xl">
          What we collect, and who we share it with.
        </h1>

        <p className="mt-6 text-sm text-muted">Last updated: June 3, 2026</p>

        <p className="mt-6 text-lg leading-relaxed text-muted">
          Hipsana (&ldquo;we,&rdquo; &ldquo;us&rdquo;) publishes educational
          content about cybersecurity and HIPAA compliance for healthcare
          practices, and offers a free HIPAA Security Risk Scorecard and review.
          This policy explains what information we collect when you use this
          site or our Scorecard, why we collect it, and who we share it with.
        </p>

        <p>
          If you have any question about this policy, email us at{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>.
        </p>

        <h2>What we collect</h2>
        <p>When you use our Scorecard or book a review, you give us:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Your practice name and the U.S. state your practice is in.</li>
          <li>Your email address.</li>
          <li>
            Your answers to the Scorecard questions (yes / no / not sure).
          </li>
          <li>If you book a call: your name and the time you select.</li>
        </ul>
        <p className="mt-6">
          When you visit the site, we also automatically receive standard
          technical information such as your IP address, browser type, and the
          pages you view. This is normal for any website and helps it run and
          stay secure.
        </p>

        <h2>What we do not collect</h2>
        <p>
          We do not collect patient information or any Protected Health
          Information (PHI). The Scorecard asks only about how your practice
          handles security, never about your patients. Please do not send us
          patient data. We are an educational publisher and a referral service;
          we are not a HIPAA &ldquo;covered entity&rdquo; or &ldquo;business
          associate,&rdquo; and we do not handle PHI.
        </p>

        <h2>Why we collect it</h2>
        <p>We use your information to:</p>
        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            Calculate and send you your Scorecard result and a written review.
          </li>
          <li>Schedule and hold your free risk review.</li>
          <li>
            Connect you with a vetted specialist partner who conducts the review
            (see below).
          </li>
          <li>Respond to your messages.</li>
          <li>Understand how the site is used so we can improve it.</li>
        </ul>

        <h2>Who we share it with</h2>
        <p>
          To deliver the free review, we share your details with one vetted
          specialist partner who carries out the assessment and may follow up
          with you. We share your information with that one partner only. We do
          not sell your information or pass it to multiple companies.
        </p>
        <p>
          We may also share information with the service providers that run our
          tools (for example, our form, scheduling, email, and analytics
          providers) strictly so those tools work, and with authorities if the
          law requires it.
        </p>

        <h2>Analytics and cookies</h2>
        <p>
          We use Google Analytics to see, in aggregate, how visitors use the
          site, such as which pages are read. We also use Microsoft Clarity,
          which produces heatmaps and session recordings (replays of how
          visitors move through our pages) so we can find where the site is
          confusing and improve it. These tools may set cookies. You can block
          or delete cookies in your browser settings, and you can opt out of
          Google Analytics using Google&rsquo;s browser add-on.
        </p>

        <h2>How long we keep it</h2>
        <p>
          We keep your information for as long as we need it to provide the
          review and stay in touch about it, and in any case no longer than 24
          months after your last contact with us, unless you ask us to delete it
          sooner.
        </p>

        <h2>Your choices</h2>
        <p>
          You can ask us to show you the information we hold about you, correct
          it, or delete it. Email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a> and we will
          act on your request within a reasonable time. You can also unsubscribe
          from any email we send using the link in that email.
        </p>

        <h2>Changes to this policy</h2>
        <p>
          If we change how we handle your information, we will update this page
          and change the &ldquo;Last updated&rdquo; date above.
        </p>

        <h2>Contact</h2>
        <p>
          Hipsana. For any question about your data, email{" "}
          <a href="mailto:hello@hipsana.com">hello@hipsana.com</a>.
        </p>
      </div>
    </section>
  );
}
