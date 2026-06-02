// app/articles/[slug]/page.tsx
// Dynamic article route. Server-rendered (no "use client") so all text is in
// the initial HTML — required for SEO per 00b §13.7. Reads from content/articles.ts.

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllArticles,
  getArticleBySlug,
  type Article,
  type Block,
  type InlineRun,
} from "@/content/articles";

const SITE_URL = "https://hipsana.com";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

// Pre-render a static page for every article (published + draft) at build time.
export function generateStaticParams(): { slug: string }[] {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

// Per-page metadata: title, description, explicit canonical to hipsana.com, and
// noindex for drafts. metadataBase (in app/layout.tsx) resolves the relative
// canonical to the absolute hipsana.com URL.
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = getArticleBySlug(params.slug);
  if (!article) return {};

  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/articles/${article.slug}`,
      type: "article",
    },
    ...(article.status === "draft"
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

function renderRuns(runs: InlineRun[]) {
  return runs.map((run, i) => {
    if (typeof run === "string") return <span key={i}>{run}</span>;
    if ("strong" in run) return <strong key={i}>{run.strong}</strong>;
    return (
      <a key={i} href={run.href}>
        {run.text}
      </a>
    );
  });
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={i}>{block.text}</h2>;
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "p":
      return <p key={i}>{renderRuns(block.runs)}</p>;
    case "quote":
      return (
        <blockquote
          key={i}
          className="my-6 border-l-2 border-teal pl-4 italic text-muted"
        >
          {renderRuns(block.runs)}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={i} className="my-5 list-disc space-y-2 pl-6">
          {block.items.map((item, j) => (
            <li key={j}>{renderRuns(item)}</li>
          ))}
        </ul>
      );
  }
}

function faqJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

function articleJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Person", name: article.author },
    publisher: { "@type": "Organization", name: "Hipsana" },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const hasFaq = article.faq.length > 0;

  return (
    <article className="container-page py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd(article)) }}
      />
      {hasFaq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(article)) }}
        />
      )}

      <div className="prose-hipsana">
        <p className="eyebrow mb-3">HIPAA &amp; Compliance</p>
        <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
          {article.title}
        </h1>
        <p className="mb-10 text-sm text-muted">
          By {article.author} · Updated {formatDate(article.dateModified)}
        </p>

        {article.body.map((block, i) => renderBlock(block, i))}

        {hasFaq && (
          <section className="mt-14">
            <h2>Frequently asked questions</h2>
            {article.faq.map((item, i) => (
              <div key={i} className="mt-6">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
              </div>
            ))}
          </section>
        )}
      </div>

      <aside className="mt-16 rounded-lg border border-muted-border bg-muted-bg p-8">
        <p className="font-display text-xl font-semibold text-ink">
          Not sure where your practice stands?
        </p>
        <p className="mt-2 max-w-prose text-muted">
          Answer 10 quick questions and get a free HIPAA Security Risk score for
          your practice. No cost, no commitment.
        </p>
        <Link href="/scorecard" className="btn-primary mt-5">
          Take the free Scorecard →
        </Link>
      </aside>
    </article>
  );
}
