import type { Remedy, RemedyCategory } from "./types";
import { remedyCategories } from "./types";
import { remediesA } from "./remedies-a";
import { remediesB } from "./remedies-b";
import { remediesC } from "./remedies-c";
import { extraRemedies } from "./remedies-extra";
import { seoRemedies } from "./remedies-seo";
import { illustratedRemedies } from "./remedies-new";
import { assertRemedies } from "./schema";

export const remedies: Remedy[] = [...remediesA, ...remediesB, ...remediesC, ...extraRemedies, ...seoRemedies, ...illustratedRemedies];

if (typeof window === "undefined") {
  assertRemedies(remedies);
}

export function getRemedy(slug: string): Remedy | undefined {
  return remedies.find((r) => r.slug === slug);
}

export function getFeaturedRemedies(limit = 6): Remedy[] {
  return remedies.filter((r) => r.featured).slice(0, limit);
}

export function getRelatedRemedies(remedy: Remedy, limit = 3): Remedy[] {
  if (remedy.related?.length) {
    const picked = remedy.related.map((s) => getRemedy(s)).filter((r): r is Remedy => Boolean(r));
    if (picked.length) return picked;
  }
  const same = remedies.filter((r) => r.category === remedy.category && r.slug !== remedy.slug);
  const others = remedies.filter((r) => r.category !== remedy.category && r.featured);
  return [...same, ...others].slice(0, limit);
}

export function countByCategory(): Record<RemedyCategory, number> {
  const out = Object.fromEntries(remedyCategories.map((category) => [category, 0])) as Record<RemedyCategory, number>;
  for (const remedy of remedies) out[remedy.category] += 1;
  return out;
}
