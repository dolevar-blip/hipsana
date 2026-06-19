import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-muted-border bg-muted-bg">
      <div className="container-page py-14">
        {/* Top: brand + nav */}
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-display text-lg font-semibold text-ink">
              Hipsana
            </div>
            <p className="mt-2 text-sm text-muted">
              HIPAA &amp; cybersecurity for independent practices.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            <Link href="/about" className="text-muted hover:text-ink">
              About
            </Link>
            <Link href="/editorial-standards" className="text-muted hover:text-ink">
              Editorial Standards
            </Link>
            <Link href="/corrections" className="text-muted hover:text-ink">
              Corrections
            </Link>
            <Link href="/disclosure" className="text-muted hover:text-ink">
              Disclosure
            </Link>
            <Link href="/privacy" className="text-muted hover:text-ink">
              Privacy
            </Link>
            <Link href="/terms" className="text-muted hover:text-ink">
              Terms
            </Link>
            <Link href="/contact" className="text-muted hover:text-ink">
              Contact
            </Link>
          </nav>
        </div>

        {/* Disclosures */}
        <div className="mt-12 space-y-6 border-t border-muted-border pt-8 text-xs leading-relaxed text-muted-light">
          <p>
            <strong className="font-semibold text-muted">
              How we make money:
            </strong>{" "}
            The Scorecard and review are free. If we connect you with a
            specialist and you choose to work with them, their firm pays us a
            referral fee. It never costs you anything and never changes your
            review. We share your details with that one partner only. See our{" "}
            <Link href="/disclosure" className="underline hover:text-ink">
              Disclosure
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="underline hover:text-ink">
              Privacy
            </Link>{" "}
            pages.
          </p>

          <p>
            <strong className="font-semibold text-muted">
              Educational content only:
            </strong>{" "}
            Hipsana provides informational content about cybersecurity and HIPAA
            compliance. We are not attorneys, compliance officers, or healthcare
            professionals, and nothing here is legal, regulatory, medical, or
            financial advice. For your specific situation, consult a qualified
            professional, and verify current requirements with the relevant
            regulator (HHS, OCR, FTC) before acting.
          </p>

          <p className="pt-2">
            &copy; {year} Hipsana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
