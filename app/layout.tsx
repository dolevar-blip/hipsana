import type { Metadata } from "next";
import { Lexend } from "next/font/google";
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

const GA_MEASUREMENT_ID = "G-9SDHNCV0H0";
const CLARITY_PROJECT_ID = "x0hl18yf1z";

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
    <html lang="en" className={lexend.variable}>
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
