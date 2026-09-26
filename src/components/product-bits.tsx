import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import type { Product } from "@/content/types";
import { discountPercent } from "@/content/products";
import { cn } from "@/lib/utils";

export function formatInr(amount: number, locale: Locale) {
  return `₹${amount.toLocaleString(locale === "hi" ? "hi-IN" : "en-IN")}`;
}

export function PriceBlock({
  product,
  locale,
  dict,
  size = "lg",
  className,
}: {
  product: Product;
  locale: Locale;
  dict: Dictionary;
  size?: "lg" | "sm";
  className?: string;
}) {
  if (!product.price) {
    return <span className={cn("text-clay", className)}>{dict.products.priceOnEnquiry}</span>;
  }
  const off = discountPercent(product);
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1", className)}>
      <span className={cn("font-semibold text-foreground", size === "lg" ? "text-3xl" : "text-lg")}>{formatInr(product.price, locale)}</span>
      {product.mrp && product.mrp > product.price && (
        <span className={cn("text-muted-foreground", size === "lg" ? "text-base" : "text-sm")}>
          {dict.products.mrp} <s>{formatInr(product.mrp, locale)}</s>
        </span>
      )}
      {off ? (
        <span
          className={cn(
            "rounded-full bg-leaf/15 font-semibold text-leaf",
            size === "lg" ? "px-2.5 py-0.5 text-sm" : "px-2 py-0.5 text-xs",
          )}
        >
          {off}% {dict.products.off}
        </span>
      ) : null}
    </span>
  );
}

/** Soft "From our shop" block shown on relevant remedy posts and hubs */
export function ShopPromo({ products, locale, dict, className }: { products: Product[]; locale: Locale; dict: Dictionary; className?: string }) {
  if (!products.length) return null;
  return (
    <aside aria-label={dict.products.fromShop} className={cn("rounded-2xl border border-border bg-card p-5", className)}>
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-leaf">
        <ShoppingBag className="size-4" aria-hidden="true" />
        {dict.products.fromShop}
      </p>
      <ul className="mt-3 space-y-4">
        {products.map((p) => {
          const t = p[locale];
          const img = p.media?.images[0];
          return (
            <li key={p.slug} className="flex gap-4">
              {img && (
                <Link href={`/${locale}/products/${p.slug}`} className="shrink-0">
                  <Image
                    src={img.src}
                    alt={t.imageAlt?.[0] ?? t.name}
                    width={img.width}
                    height={img.height}
                    sizes="80px"
                    className="size-20 rounded-xl border border-border bg-white object-contain p-1"
                  />
                </Link>
              )}
              <div className="min-w-0">
                <Link href={`/${locale}/products/${p.slug}`} className="font-semibold leading-snug hover:text-primary">
                  {t.name}
                </Link>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{t.short}</p>
                <div className="mt-2 flex flex-wrap items-center gap-3">
                  <PriceBlock product={p} locale={locale} dict={dict} size="sm" />
                  <Link href={`/${locale}/products/${p.slug}`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                    {dict.products.viewProduct}
                    <ArrowRight className="size-4" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}

/** Wide single-product feature, used on the home page when only one product is featured */
export function ProductSpotlight({ product, locale, dict }: { product: Product; locale: Locale; dict: Dictionary }) {
  const t = product[locale];
  const img = product.media?.images[0];
  return (
    <div className="grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
      {img && (
        <Link href={`/${locale}/products/${product.slug}`} className="block bg-white p-6">
          <Image
            src={img.src}
            alt={t.imageAlt?.[0] ?? t.name}
            width={img.width}
            height={img.height}
            sizes="(min-width: 768px) 420px, 100vw"
            className="mx-auto aspect-square h-auto w-full max-w-sm object-contain"
          />
        </Link>
      )}
      <div className="flex flex-col justify-center p-6 sm:p-8">
        {product.brand && <p className="text-xs font-semibold uppercase tracking-wide text-leaf">{product.brand}</p>}
        <h3 className="mt-1 text-2xl font-semibold text-primary">
          <Link href={`/${locale}/products/${product.slug}`} className="hover:underline">
            {t.name}
          </Link>
        </h3>
        <p className="mt-2 text-muted-foreground">{t.short}</p>
        <p className="mt-3 text-sm font-medium text-foreground/80">{t.size}</p>
        <PriceBlock product={product} locale={locale} dict={dict} className="mt-2" />
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/products/${product.slug}`}
            className="inline-flex h-11 items-center gap-1 rounded-lg bg-primary px-5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {dict.products.viewProduct}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
          <Link
            href={`/${locale}/enquiry?product=${product.slug}`}
            className="inline-flex h-11 items-center rounded-lg border border-border px-5 text-sm font-medium hover:bg-muted"
          >
            {dict.products.enquire}
          </Link>
        </div>
      </div>
    </div>
  );
}
