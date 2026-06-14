import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: [
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "Google-Extended",
          "PerplexityBot",
          "Perplexity-User",
        ],
        allow: "/",
      },
    ],
    sitemap: "https://hipsana.com/sitemap.xml",
  };
}
