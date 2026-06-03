import Link from "next/link";

const navLinks = [
  { href: "/scorecard", label: "Scorecard" },
  { href: "/articles", label: "Articles" },
  { href: "/about", label: "About" },
  { href: "/disclosure", label: "Disclosure" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="border-b border-muted-border">
      {/* Top bar: brand + desktop nav */}
      <div className="container-page flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-display text-xl font-semibold tracking-tight text-ink transition-colors hover:text-teal"
        >
          Hipsana
        </Link>

        {/* Desktop nav (inline) */}
        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile nav: full-width horizontal scroll row */}
      <nav className="border-t border-muted-border md:hidden">
        <div className="flex gap-6 overflow-x-auto px-6 py-3 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-muted transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
