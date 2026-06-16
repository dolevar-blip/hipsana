// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/content/articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hipsana.com";
  const lastModified = "2026-06-14";

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/scorecard`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/disclosure`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2026-06-16",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = getPublishedArticles().map(
    (article) => ({
      url: `${baseUrl}/articles/${article.slug}`,
      lastModified: article.dateModified,
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [...staticRoutes, ...articleRoutes];
}
