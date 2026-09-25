"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { RemedyCategory } from "@/content/types";
import { CategoryIcon } from "./illustrations";
import { cn } from "@/lib/utils";

export type RemedyListItem = {
  slug: string;
  category: RemedyCategory;
  time: number;
  title: string;
  summary: string;
  /** extra searchable text (ingredients, both languages) */
  keywords: string;
};

type Strings = {
  searchPlaceholder: string;
  searchLabel: string;
  allCategories: string;
  categoryLabel: string;
  noResults: string;
  results: string;
  readMore: string;
  minutes: string;
  loadMore: string;
  showing: string;
  of: string;
};

const PAGE_SIZE = 24;

export function RemedyBrowser({
  locale,
  items,
  categories,
  strings,
  initialCategory = "all",
}: {
  locale: string;
  items: RemedyListItem[];
  categories: { value: RemedyCategory; label: string; count: number }[];
  strings: Strings;
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string>(initialCategory);
  const [limit, setLimit] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (!q) return true;
      return `${item.title} ${item.summary} ${item.keywords}`.toLowerCase().includes(q);
    });
  }, [items, query, category]);

  const labelFor = (c: RemedyCategory) => categories.find((x) => x.value === c)?.label ?? c;

  const selectCategory = (value: string) => {
    setCategory(value);
    setLimit(PAGE_SIZE);
    const url = new URL(window.location.href);
    if (value === "all") url.searchParams.delete("category");
    else url.searchParams.set("category", value);
    window.history.replaceState(null, "", url.toString());
  };

  return (
    <div>
      <div className="rounded-2xl border border-border bg-card p-4 shadow-sm sm:p-5">
        <label htmlFor="remedy-search" className="sr-only">
          {strings.searchLabel}
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
          <Input
            id="remedy-search"
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setLimit(PAGE_SIZE);
            }}
            placeholder={strings.searchPlaceholder}
            className="h-12 rounded-xl bg-background pl-11 text-base md:text-base"
          />
        </div>
        <div className="mt-4" role="group" aria-label={strings.categoryLabel}>
          <div className="flex flex-wrap gap-2">
            {[{ value: "all", label: strings.allCategories, count: items.length }, ...categories].map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => selectCategory(c.value)}
                  aria-pressed={active}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-background text-foreground/80 hover:border-primary/40 hover:text-primary"
                  )}
                >
                  {c.label} <span className={cn("ml-0.5 text-xs", active ? "text-primary-foreground/70" : "text-muted-foreground")}>{c.count}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
        {filtered.length > limit
          ? `${strings.showing} ${limit} ${strings.of} ${filtered.length} ${strings.results}`
          : `${filtered.length} ${strings.results}`}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-border bg-card p-10 text-center text-muted-foreground">{strings.noResults}</p>
      ) : (
        <>
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.slice(0, limit).map((item) => (
            <li key={item.slug}>
              <Link
                href={`/${locale}/remedies/${item.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="flex items-center justify-between gap-3">
                  <CategoryIcon category={item.category} />
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" aria-hidden="true" />
                    {item.time} {strings.minutes}
                  </span>
                </div>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-leaf">{labelFor(item.category)}</p>
                <h2 className="mt-1 text-lg font-semibold leading-snug group-hover:text-primary">{item.title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{item.summary}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                  {strings.readMore}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {filtered.length > limit && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setLimit((l) => l + PAGE_SIZE)}
              className="inline-flex h-11 items-center rounded-full border border-primary/30 bg-card px-6 text-sm font-semibold text-primary shadow-sm transition-colors hover:border-primary hover:bg-secondary"
            >
              {strings.loadMore} ({filtered.length - limit})
            </button>
          </div>
        )}
        </>
      )}
    </div>
  );
}
