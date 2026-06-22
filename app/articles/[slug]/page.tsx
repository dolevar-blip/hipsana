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
  const [y, m] = iso.split("-").map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

// First in-body image: each published cornerstone carries one annotated OCR
// exhibit. Used for og:image and the BlogPosting image field; articles without
// an image block (the internal draft) simply omit both.
function getArticleImage(article: Article) {
  return article.body.find(
    (block): block is Extract<Block, { type: "image" }> => block.type === "image"
  );
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

  const image = getArticleImage(article);

  return {
    title: article.metaTitle ?? article.title,
    description: article.description,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${SITE_URL}/articles/${article.slug}`,
      type: "article",
      publishedTime: article.datePublished,
      modifiedTime: article.dateModified,
      authors: [`${SITE_URL}/about`],
      ...(image
        ? {
            images: [
              {
                url: `${SITE_URL}${image.src}`,
                width: image.width,
                height: image.height,
                alt: image.alt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.description,
      ...(image ? { images: [`${SITE_URL}${image.src}`] } : {}),
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
        <blockquote key={i} className="article-quote">
          {renderRuns(block.runs)}
        </blockquote>
      );
    case "ul":
      return (
        <ul key={i}>
          {block.items.map((item, j) => (
            <li key={j}>{renderRuns(item)}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <div key={i} className="my-10">
          {block.items.map((step, j) => (
            <div key={j} className="relative flex gap-5 pb-8 last:pb-0">
              {j < block.items.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-[18px] top-9 w-px bg-teal/20"
                />
              )}
              <div className="relative z-10 flex h-9 w-9 flex-none items-center justify-center rounded-full bg-teal text-sm font-semibold text-paper">
                {j + 1}
              </div>
              <div className="pt-1">
                <div className="font-display text-lg font-semibold text-ink">
                  {step.label}
                </div>
                <p className="mt-1 text-[16px] leading-[1.6] text-muted">
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <figure key={i} className="my-10 overflow-x-auto">
          <table className="w-full border-collapse text-left text-[15px]">
            <thead>
              <tr>
                {block.headers.map((h, j) => (
                  <th
                    key={j}
                    scope="col"
                    className="border-b-2 border-teal/30 px-3 py-2.5 font-display text-sm font-semibold text-ink"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, r) => (
                <tr key={r} className="border-b border-muted-border">
                  {row.map((cell, c) => (
                    <td
                      key={c}
                      className={
                        c === 0
                          ? "px-3 py-2.5 font-medium text-ink"
                          : "px-3 py-2.5 text-muted"
                      }
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {block.caption && (
            <figcaption className="mt-3 text-sm leading-[1.6] text-muted">
              {block.caption}
            </figcaption>
          )}
        </figure>
      );
    case "image":
      return (
        <figure key={i} className="my-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={block.src}
            alt={block.alt}
            width={block.width}
            height={block.height}
            loading="lazy"
            decoding="async"
            className="h-auto w-full rounded-xl border border-muted-border"
          />
          {block.caption && (
            <figcaption className="mt-3 text-sm leading-[1.6] text-muted">
              {renderRuns(block.caption)}
            </figcaption>
          )}
        </figure>
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
  const image = getArticleImage(article);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    ...(image ? { image: [`${SITE_URL}${image.src}`] } : {}),
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Person", "@id": `${SITE_URL}/about#person`, name: article.author, url: `${SITE_URL}/about` },
    publisher: { "@type": "Organization", name: "Hipsana", logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };
}

function breadcrumbJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Articles",
        item: `${SITE_URL}/articles`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `${SITE_URL}/articles/${article.slug}`,
      },
    ],
  };
}

function datasetJsonLd(article: Article) {
  return {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name: article.title,
    description: article.description,
    url: `${SITE_URL}/articles/${article.slug}`,
    creator: { "@type": "Organization", name: "Hipsana", url: SITE_URL },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    isAccessibleForFree: true,
    license: `${SITE_URL}/terms`,
    keywords: [
      "dental data breach",
      "HIPAA enforcement",
      "OCR Risk Analysis Initiative",
      "risk analysis",
      "healthcare data breach statistics",
    ],
  };
}

export default function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const article = getArticleBySlug(params.slug);
  if (!article) notFound();

  const body = article.body;
  const hasFaq = article.faq.length > 0;

  // Lead: the first block, if it's a paragraph, is rendered as a standfirst.
  const lead = body.length > 0 && body[0].type === "p" ? body[0] : null;

  // "The short version" heading + the list that follows it become a styled card.
  const tldrHeadingIndex = body.findIndex(
    (b) => b.type === "h2" && b.text.trim().toLowerCase() === "the short version"
  );
  const tldrListIndex =
    tldrHeadingIndex >= 0 && body[tldrHeadingIndex + 1]?.type === "ul"
      ? tldrHeadingIndex + 1
      : -1;
  const tldrItems: InlineRun[][] =
    tldrListIndex >= 0
      ? (body[tldrListIndex] as Extract<Block, { type: "ul" }>).items
      : [];

  // Blocks consumed by the lead / card, so we don't render them twice.
  const skip = new Set<number>();
  if (lead) skip.add(0);
  if (tldrHeadingIndex >= 0) skip.add(tldrHeadingIndex);
  if (tldrListIndex >= 0) skip.add(tldrListIndex);

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(article)) }}
      />
      {article.kind === "report" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd(article)) }}
        />
      )}

      <div className="mx-auto max-w-prose">
        <p className="eyebrow mb-3">
          {article.kind === "report" ? "Report" : "HIPAA & Compliance"}
        </p>
        <h1 className="mb-4 text-3xl font-semibold leading-tight md:text-4xl">
          {article.title}
        </h1>
        <p className="mb-1 text-sm text-muted">
          By{" "}
          <Link
            href="/about"
            className="underline underline-offset-2 hover:text-ink"
          >
            {article.author}
          </Link>{" "}
          · Updated {formatDate(article.dateModified)}
        </p>
        <p className="mb-8 text-sm text-muted">
          <Link
            href="/editorial-standards"
            className="underline underline-offset-2 hover:text-ink"
          >
            How we research and source
          </Link>
        </p>

        {lead && lead.type === "p" && (
          <p className="article-lead">{renderRuns(lead.runs)}</p>
        )}

        {tldrHeadingIndex >= 0 && (
          <aside className="key-takeaways">
            <p className="key-takeaways-label">The short version</p>
            <ul>
              {tldrItems.map((item, j) => (
                <li key={j}>{renderRuns(item)}</li>
              ))}
            </ul>
          </aside>
        )}

        <div className="prose-hipsana">
          {body.map((block, i) => (skip.has(i) ? null : renderBlock(block, i)))}
        </div>

        {hasFaq && (
          <section className="mt-16">
            <h2 className="font-display text-2xl tracking-tight md:text-3xl">
              Frequently asked questions
            </h2>
            <div className="mt-8">
              {article.faq.map((item, i) => (
                <div key={i} className="faq-item">
                  <h3>{item.question}</h3>
                  <p>{item.answer}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <aside className="article-cta">
          <p className="font-display text-xl font-semibold text-ink">
            Not sure where your practice stands?
          </p>
          <p className="mt-2 text-muted">
            The free HIPAA Scorecard checks 10 core controls and scores your
            practice out of 100. About three minutes, no cost.
          </p>
          <Link href="/scorecard" className="btn-primary mt-5">
            Check my practice →
          </Link>
        </aside>
      </div>
    </article>
  );
}
