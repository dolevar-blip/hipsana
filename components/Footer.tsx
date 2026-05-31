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
              HIPAA &amp; cybersecurity for solo practices.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-7 gap-y-2 text-sm">
            <Link href="/about" className="text-muted hover:text-ink">
              About
            </Link>
            <Link href="/disclosure" className="text-muted hover:text-ink">
              Disclosure
            </Link>
            <Link href="/privacy" className="text-muted hover:text-ink">
              Privacy
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
              Affiliate disclosure:
            </strong>{" "}
            Hipsana participates in affiliate programs for some of the products
            we review. If you sign up for a product through one of our links, we
            may earn a commission at no additional cost to you. Our
            recommendations are not influenced by commission rates. We only
            recommend products we&rsquo;ve tested or have direct experience with.
            See our{" "}
            <Link href="/disclosure" className="underline hover:text-ink">
              full disclosure policy
            </Link>
            .
          </p>

          <p>
            <strong className="font-semibold text-muted">
              Educational content only:
            </strong>{" "}
            Hipsana provides informational content about cybersecurity practices
            and compliance frameworks. We are not attorneys, compliance officers,
            or healthcare professionals. Nothing on this site constitutes legal,
            regulatory, medical, or financial advice. For questions specific to
            your practice, consult a qualified professional. Regulations change;
            verify current requirements with the relevant regulator (HHS, OCR,
            FTC, etc.) before acting on any information here.
          </p>

          <p className="pt-2">
            &copy; {year} Hipsana. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
