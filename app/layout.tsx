import type { Metadata } from "next";
import { Lexend, IBM_Plex_Sans } from "next/font/google";
import Script from "next/script";
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

const GA_MEASUREMENT_ID = "G-9SDHNCV0H0";
const CLARITY_PROJECT_ID = "x0hl18yf1z";

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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
        <ScrollToTop />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_PROJECT_ID}");
          `}
        </Script>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
