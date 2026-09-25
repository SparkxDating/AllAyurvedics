import type { Remedy, RemedyCategory } from "./types";
import { remediesA } from "./remedies-a";
import { remediesB } from "./remedies-b";
import { remediesC } from "./remedies-c";

export const remedies: Remedy[] = [...remediesA, ...remediesB, ...remediesC];

export function getRemedy(slug: string): Remedy | undefined {
  return remedies.find((r) => r.slug === slug);
}

export function getFeaturedRemedies(limit = 6): Remedy[] {
  return remedies.filter((r) => r.featured).slice(0, limit);
}

export function getRelatedRemedies(remedy: Remedy, limit = 3): Remedy[] {
  const same = remedies.filter((r) => r.category === remedy.category && r.slug !== remedy.slug);
  const others = remedies.filter((r) => r.category !== remedy.category && r.featured);
  return [...same, ...others].slice(0, limit);
}

export function countByCategory(): Record<RemedyCategory, number> {
  const out = {} as Record<RemedyCategory, number>;
  for (const r of remedies) out[r.category] = (out[r.category] ?? 0) + 1;
  return out;
}
