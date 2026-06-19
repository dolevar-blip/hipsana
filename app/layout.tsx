import type { Metadata } from "next";
import { Lexend, IBM_Plex_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const lexend = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lexend",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hipsana.com"),
  title: {
    default: "Hipsana — HIPAA & cybersecurity for independent practices",
    template: "%s · Hipsana",
  },
  description:
    "Practical HIPAA compliance and cybersecurity guidance for independent dental, medical, and therapy practices. Plain-language risk reviews from primary sources.",
  openGraph: {
    title: "Hipsana — HIPAA & cybersecurity for independent practices",
    description:
      "Practical HIPAA compliance and cybersecurity guidance for independent dental, medical, and therapy practices.",
    url: "https://hipsana.com",
    siteName: "Hipsana",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Hipsana — HIPAA & cybersecurity for independent dental, medical, and therapy practices.",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const siteJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://hipsana.com/#organization",
      name: "Hipsana",
      url: "https://hipsana.com",
      logo: "https://hipsana.com/logo.png",
      description:
        "HIPAA guidance and a free Security Scorecard for independent dental, medical, and therapy practices. Regulatory claims trace to primary sources, and every source is named.",
      founder: { "@type": "Person", name: "Dolev Arama" },
      email: "hello@hipsana.com",
      publishingPrinciples: "https://hipsana.com/editorial-standards",
    },
    {
      "@type": "WebSite",
      "@id": "https://hipsana.com/#website",
      url: "https://hipsana.com",
      name: "Hipsana",
      description:
        "Practical HIPAA compliance and cybersecurity guidance for independent dental, medical, and therapy practices.",
      publisher: { "@id": "https://hipsana.com/#organization" },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${lexend.variable} ${ibmPlexSans.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-teal focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-paper"
        >
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <ScrollToTop />
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex-1 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
        >
          {children}
        </main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
