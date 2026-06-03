// app/articles/page.tsx
// The /articles index. Server-rendered list of published articles.
// Lives alongside app/articles/[slug]/page.tsx (static segment vs dynamic segment).

import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArticles } from "@/content/articles";

const SITE_URL = "https://hipsana.com";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export const metadata: Metadata = {
  title: "Articles",
  description:
    "Plain-language HIPAA and cybersecurity guidance for solo dental, medical, and therapy practices. Every regulatory claim is checked against HHS, OCR, or NIST.",
  alternates: { canonical: "/articles" },
  openGraph: {
    title: "Articles · Hipsana",
    description:
      "Plain-language HIPAA and cybersecurity guidance for solo dental, medical, and therapy practices.",
    url: `${SITE_URL}/articles`,
    type: "website",
  },
};

export default function ArticlesIndexPage() {
  const articles = getPublishedArticles();

  return (
    <div className="container-page py-16 md:py-24">
      <div className="max-w-prose">
        <p className="eyebrow mb-3">Articles</p>
        <h1 className="text-3xl font-semibold leading-tight md:text-4xl">
          HIPAA, in plain language.
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          Practical guidance for solo dental, medical, and therapy practices.
          Every regulatory claim is checked against HHS, OCR, or NIST before it
          goes live.
        </p>
      </div>

      <div className="mt-14 max-w-prose">
        {articles.length === 0 ? (
          <p className="text-muted">New articles are on the way.</p>
        ) : (
          <ul className="border-t border-muted-border">
            {articles.map((article) => (
              <li key={article.slug} className="border-b border-muted-border">
                <Link
                  href={`/articles/${article.slug}`}
                  className="group block py-7"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-muted-light">
                    {formatDate(article.dateModified)}
                  </p>
                  <h2 className="mt-2 font-display text-xl font-semibold text-ink transition-colors group-hover:text-teal md:text-2xl">
                    {article.title}
                  </h2>
                  <p className="mt-2 text-[16px] leading-relaxed text-muted">
                    {article.description}
                  </p>
                  <span className="mt-3 inline-block text-sm font-medium text-teal">
                    Read &rarr;
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
