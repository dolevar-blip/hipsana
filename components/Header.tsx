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
      <div className="container-page flex h-16 items-center gap-6">
        <Link
          href="/"
          className="flex-none font-display text-xl font-semibold tracking-tight text-ink transition-colors hover:text-teal"
        >
          Hipsana
        </Link>

        <nav className="flex min-w-0 flex-1 items-center justify-start gap-6 overflow-x-auto md:justify-end [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
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
    </header>
  );
}
