import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Mountain, ShoppingBag } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { shilajitArticles } from "@/content/articles-shilajit";
import { getProduct } from "@/content/products";
import { PriceBlock } from "@/components/product-bits";
import { cn } from "@/lib/utils";

export const SHILAJIT_PRODUCT_SLUG = "himalayan-shilajit-resin-10g";

export const shilajitUrls = (locale: Locale) => ({
  hub: `/${locale}/shilajit`,
  product: `/${locale}/products/${SHILAJIT_PRODUCT_SLUG}`,
  lp: `/${locale}/lp/shilajit`,
});

const S = {
  en: {
    guides: "Shilajit guides",
    guidesText: "Benefits, how to take it, pure vs fake, forms, side effects and price — in plain language.",
    hub: "Complete shilajit guide",
    buyTitle: "Himalayan shilajit resin from our shop",
    view: "View product",
    order: "Order now – UPI / WhatsApp",
    callout: "Curious about shilajit?",
    calloutText: "Read our shilajit guide: traditional benefits, how to take it, how to spot pure shilajit, side effects and price.",
    read: "Read guide",
  },
  hi: {
    guides: "शिलाजीत गाइड",
    guidesText: "फायदे, खाने का तरीका, असली-नकली की पहचान, रूप, नुकसान और कीमत — आसान भाषा में।",
    hub: "पूरी शिलाजीत गाइड",
    buyTitle: "हमारी दुकान से हिमालयन शिलाजीत रेज़िन",
    view: "उत्पाद देखें",
    order: "अभी ऑर्डर करें – UPI / WhatsApp",
    callout: "शिलाजीत के बारे में जानना चाहते हैं?",
    calloutText: "हमारी शिलाजीत गाइड पढ़ें: पारंपरिक फायदे, खाने का तरीका, असली शिलाजीत की पहचान, नुकसान और कीमत।",
    read: "गाइड पढ़ें",
  },
} as const;

export function shilajitStrings(locale: Locale) {
  return S[locale];
}

/** Grid of the six shilajit guides (optionally excluding the current one) */
export function ShilajitGuides({
  locale,
  exclude,
  heading,
  headingLevel = "h2",
  showHubLink = true,
  className,
}: {
  locale: Locale;
  exclude?: string;
  heading?: string;
  headingLevel?: "h2" | "h3";
  showHubLink?: boolean;
  className?: string;
}) {
  const s = S[locale];
  const list = shilajitArticles.filter((a) => a.slug !== exclude);
  const H = headingLevel;
  return (
    <section aria-label={heading ?? s.guides} className={cn("rounded-2xl border border-border bg-card p-6", className)}>
      <H className="flex items-center gap-2 text-xl font-semibold text-primary">
        <BookOpen className="size-5 text-leaf" aria-hidden="true" />
        {heading ?? s.guides}
      </H>
      <p className="mt-1 text-sm text-muted-foreground">{s.guidesText}</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {list.map((a) => (
          <li key={a.slug}>
            <Link
              href={`/${locale}/articles/${a.slug}`}
              className="group block h-full rounded-xl border border-border bg-background p-4 transition-colors hover:border-primary/40 hover:bg-secondary/40"
            >
              <span className="font-semibold leading-snug text-foreground group-hover:text-primary">{a[locale].title}</span>
              <span className="mt-1 line-clamp-2 block text-sm text-muted-foreground">{a[locale].excerpt}</span>
            </Link>
          </li>
        ))}
      </ul>
      {showHubLink && (
        <Link href={shilajitUrls(locale).hub} className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {s.hub}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      )}
    </section>
  );
}

/** Product box linking to the product page and the order (landing) page */
export function ShilajitBuyBox({ locale, dict, className }: { locale: Locale; dict: Dictionary; className?: string }) {
  const product = getProduct(SHILAJIT_PRODUCT_SLUG);
  if (!product) return null;
  const t = product[locale];
  const img = product.media?.images[0];
  const u = shilajitUrls(locale);
  const s = S[locale];
  return (
    <aside aria-label={s.buyTitle} className={cn("rounded-2xl border border-clay/30 bg-clay/[0.05] p-5 sm:p-6", className)}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-leaf">
        <ShoppingBag className="size-4" aria-hidden="true" />
        {s.buyTitle}
      </p>
      <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-center">
        {img && (
          <Link href={u.product} className="shrink-0">
            <Image
              src={img.src}
              alt={t.imageAlt?.[0] ?? t.name}
              width={img.width}
              height={img.height}
              sizes="112px"
              className="size-28 rounded-xl border border-border bg-white object-contain p-1"
            />
          </Link>
        )}
        <div className="min-w-0">
          <Link href={u.product} className="text-lg font-semibold leading-snug text-primary hover:underline">
            {t.name}
          </Link>
          <p className="mt-1 text-sm text-muted-foreground">
            {t.size} · {t.short}
          </p>
          <PriceBlock product={product} locale={locale} dict={dict} size="sm" className="mt-2" />
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              href={u.lp}
              className="inline-flex h-10 items-center gap-1 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              {s.order}
            </Link>
            <Link href={u.product} className="inline-flex h-10 items-center gap-1 rounded-lg border border-border bg-background px-4 text-sm font-medium hover:bg-muted">
              {s.view}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </aside>
  );
}

/** Small callout for related remedy pages and hubs */
export function ShilajitCallout({ locale, className }: { locale: Locale; className?: string }) {
  const s = S[locale];
  return (
    <aside className={cn("flex gap-3 rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5", className)}>
      <Mountain className="mt-0.5 size-5 shrink-0 text-clay" aria-hidden="true" />
      <div>
        <p className="font-semibold text-foreground">{s.callout}</p>
        <p className="mt-1 text-sm text-muted-foreground">{s.calloutText}</p>
        <Link href={shilajitUrls(locale).hub} className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {s.read}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </aside>
  );
}
