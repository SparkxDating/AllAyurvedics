import type { Article } from "./types";
import { articles1 } from "./articles-1";
import { articles2 } from "./articles-2";
import { articles3 } from "./articles-3";
import { articles4 } from "./articles-4";
import { shilajitArticles } from "./articles-shilajit";

export const articles: Article[] = [...articles1, ...articles2, ...articles3, ...articles4, ...shilajitArticles].sort(
  (a, b) => (a.date < b.date ? 1 : -1)
);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function readingMinutes(body: string, locale: "en" | "hi"): number {
  const words = body.split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.round(words / (locale === "hi" ? 180 : 220)));
}
