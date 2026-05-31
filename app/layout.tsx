import type { Metadata } from "next";
import { Fraunces, DM_Sans } from "next/font/google";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
  weight: ["400", "500", "600", "700"],
});

const GA_MEASUREMENT_ID = "G-9SDHNCV0H0";

export const metadata: Metadata = {
  metadataBase: new URL("https://hipsana.com"),
  title: {
    default: "Hipsana — HIPAA & cybersecurity for solo practices",
    template: "%s · Hipsana",
  },
  description:
    "Practical HIPAA compliance and cybersecurity guidance for solo dental, medical, and therapy practices. Plain-language reviews, real product recommendations, no fluff.",
  openGraph: {
    title: "Hipsana — HIPAA & cybersecurity for solo practices",
    description:
      "Practical HIPAA compliance and cybersecurity guidance for solo dental, medical, and therapy practices.",
    url: "https://hipsana.com",
    siteName: "Hipsana",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${dmSans.variable}`}>
      <body className="min-h-screen flex flex-col">
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
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
