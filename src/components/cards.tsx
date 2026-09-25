import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Article, Product, Remedy } from "@/content/types";
import { readingMinutes } from "@/content/articles";
import { CategoryIcon, ProductIllustration } from "./illustrations";
import { Badge } from "@/components/ui/badge";

export function RemedyCard({ remedy, locale, dict }: { remedy: Remedy; locale: Locale; dict: Dictionary }) {
  const t = remedy[locale];
  return (
    <Link
      href={`/${locale}/remedies/${remedy.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="flex items-center justify-between gap-3">
        <CategoryIcon category={remedy.category} />
        <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
          <Clock className="size-3.5" aria-hidden="true" />
          {remedy.time} {locale === "hi" ? "मिनट" : "min"}
        </span>
      </div>
      <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-leaf">{dict.categories[remedy.category]}</p>
      <h3 className="mt-1 text-lg font-semibold leading-snug text-foreground group-hover:text-primary">{t.title}</h3>
      <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t.summary}</p>
      <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
        {dict.remedies.readMore}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function ArticleCard({ article, locale, dict }: { article: Article; locale: Locale; dict: Dictionary }) {
  const t = article[locale];
  const date = new Date(article.date).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });
  return (
    <Link
      href={`/${locale}/articles/${article.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
    >
      <div className="leaf-pattern relative h-28 bg-secondary">
        <div className="absolute inset-x-5 bottom-3 flex flex-wrap gap-1.5">
          {article.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-card/90 px-2.5 py-0.5 text-xs font-medium capitalize text-primary">
              {tag}
            </span>
          ))}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs text-muted-foreground">
          {date} · {readingMinutes(t.body, locale)} {dict.articles.minRead}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug group-hover:text-primary">{t.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{t.excerpt}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
          {dict.articles.readMore}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
        </span>
      </div>
    </Link>
  );
}

export function SampleBadge({ label }: { label: string }) {
  return (
    <Badge className="h-auto whitespace-normal border border-turmeric/40 bg-turmeric-soft px-2.5 py-1 text-left text-[0.7rem] font-semibold text-[#6b4a0c]">
      {label}
    </Badge>
  );
}

export function ProductCard({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const t = product[locale];
  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <Link href={`/${locale}/products/${product.slug}`} className="relative block">
        <ProductIllustration product={product} className="aspect-[5/4] w-full" />
        <div className="absolute left-3 top-3 right-3">
          <SampleBadge label={dict.products.sampleBadge} />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug">
          <Link href={`/${locale}/products/${product.slug}`} className="hover:text-primary">
            {t.name}
          </Link>
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">{t.short}</p>
        <p className="mt-3 text-sm font-medium text-foreground/80">
          {t.size} · {dict.products.priceOnEnquiry}
        </p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="inline-flex h-9 items-center rounded-lg border border-border px-3 text-sm font-medium hover:bg-muted"
          >
            {dict.products.details}
          </Link>
          <Link
            href={`/${locale}/enquiry?product=${product.slug}`}
            className="inline-flex h-9 items-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {dict.products.enquire}
          </Link>
        </div>
      </div>
    </div>
  );
}
