import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  BadgeCheck,
  BookOpen,
  CircleHelp,
  ClipboardList,
  CreditCard,
  HandHeart,
  MessageCircle,
  Package,
  ShieldAlert,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { locales, siteUrl } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { getBuyMode, getProduct, products } from "@/content/products";
import { getRemedy } from "@/content/remedies";
import type { Remedy } from "@/content/types";
import { ProductCard, RemedyCard, SampleBadge } from "@/components/cards";
import { ProductIllustration } from "@/components/illustrations";
import { ProductGallery } from "@/components/product-gallery";
import { PriceBlock, formatInr } from "@/components/product-bits";
import { Breadcrumbs, Container, DisclaimerNote, JsonLd } from "@/components/page-bits";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => products.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/products/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  const t = product[locale];
  const og = product.media?.ogImage;
  return buildMetadata({
    locale,
    path: `/products/${slug}`,
    title: t.metaTitle ?? t.name,
    absoluteTitle: Boolean(t.metaTitle),
    description: t.metaDescription ?? t.short,
    // Sample listings are kept out of search results.
    noIndex: product.sample,
    image: og ? { url: og, width: 1200, height: 630, alt: t.imageAlt?.[0] ?? t.name } : undefined,
  });
}

function BulletList({ items, dot = "bg-turmeric" }: { items: string[]; dot?: string }) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed">
          <span className={cn("mt-2.5 size-2 shrink-0 rounded-full", dot)} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const dict = getDictionary(locale);
  const t = product[locale];
  const others = products.filter((p) => p.slug !== slug).slice(0, 3);
  const buy = getBuyMode(product);
  const relatedRemedies = (product.relatedRemedies ?? []).map((s) => getRemedy(s)).filter((r): r is Remedy => Boolean(r));
  const pageUrl = `${siteUrl}/${locale}/products/${product.slug}`;
  const crumbs = [
    { href: `/${locale}`, label: dict.common.breadcrumbHome },
    { href: `/${locale}/products`, label: dict.nav.products },
    { label: t.name },
  ];
  const images = product.media?.images ?? [];
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";

  const sections = [
    t.about ? { key: "about", title: t.aboutTitle ?? t.name, icon: BookOpen, paragraphs: t.about.split(/\n\s*\n/) } : null,
    { key: "use", title: dict.products.howToUse, icon: HandHeart, items: t.howToUse },
    t.genuineCheck?.length ? { key: "genuine", title: dict.products.genuine, icon: BadgeCheck, items: t.genuineCheck } : null,
    t.storage?.length ? { key: "storage", title: dict.products.storage, icon: Package, items: t.storage } : null,
  ].filter(Boolean) as { key: string; title: string; icon: typeof BookOpen; items?: string[]; paragraphs?: string[] }[];

  return (
    <>
      {!product.sample && product.price ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Product",
            name: t.name,
            description: t.short,
            sku: product.slug,
            category: "Ayurvedic supplement",
            ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
            image: images.map((i) => `${siteUrl}${i.src}`),
            url: pageUrl,
            inLanguage,
            offers: {
              "@type": "Offer",
              url: pageUrl,
              price: product.price.toFixed(2),
              priceCurrency: "INR",
              availability: product.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          }}
        />
      ) : null}
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: c.href ? `${siteUrl}${c.href}` : pageUrl,
          })),
        }}
      />
      {t.faq?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage,
            mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}

      <Container className="pt-8">
        <Breadcrumbs items={crumbs} />
      </Container>

      <Container className="grid gap-10 py-8 lg:grid-cols-2">
        <div>
          {images.length ? (
            <ProductGallery
              images={images.map((img, i) => ({ ...img, alt: t.imageAlt?.[i] ?? t.name }))}
              video={
                product.media?.video
                  ? { ...product.media.video, label: t.videoLabel ?? dict.products.video }
                  : undefined
              }
              labels={{ gallery: dict.products.gallery, showImage: dict.products.showImage, showVideo: dict.products.showVideo }}
            />
          ) : (
            <div className="relative overflow-hidden rounded-3xl border border-border">
              <ProductIllustration product={product} className="aspect-square w-full" />
              {product.sample && (
                <div className="absolute left-4 top-4 right-4">
                  <SampleBadge label={dict.products.sampleBadge} />
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          {product.sample && <SampleBadge label={dict.products.sampleBadge} />}
          {product.brand && <p className="text-sm font-semibold uppercase tracking-wide text-leaf">{product.brand}</p>}
          <h1 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">{t.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{t.short}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm font-medium text-foreground/80">
            <span>{t.size}</span>
            {!product.sample && product.inStock !== false && (
              <span className="inline-flex items-center gap-1 text-leaf">
                <BadgeCheck className="size-4" aria-hidden="true" />
                {dict.products.inStock}
              </span>
            )}
          </p>
          <PriceBlock product={product} locale={locale} dict={dict} className="mt-3" />

          {product.sample && (
            <div role="note" className="mt-5 flex gap-2 rounded-xl border border-turmeric/40 bg-turmeric-soft/60 p-3 text-sm text-[#5a3f0a]">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {dict.products.sampleNotice}
            </div>
          )}

          <div className="mt-6 flex flex-wrap gap-3">
            {buy.kind !== "none" && product.price ? (
              buy.kind === "link" ? (
                <a
                  href={buy.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(buttonVariants(), "h-12 px-6 text-base")}
                  data-testid="buy-now"
                >
                  <CreditCard className="size-4" aria-hidden="true" />
                  {dict.products.buyNow} – {formatInr(product.price, locale)}
                </a>
              ) : (
                <Link
                  href={`/${locale}/checkout/${product.slug}`}
                  prefetch={false}
                  className={cn(buttonVariants(), "h-12 px-6 text-base")}
                  data-testid="buy-now"
                >
                  <CreditCard className="size-4" aria-hidden="true" />
                  {dict.products.buyNow} – {formatInr(product.price, locale)}
                </Link>
              )
            ) : null}
            <Link
              href={`/${locale}/enquiry?product=${product.slug}`}
              className={cn(buttonVariants({ variant: buy.kind !== "none" ? "outline" : "default" }), "h-12 px-6 text-base")}
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              {dict.products.enquire}
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            {product.sample
              ? dict.products.noCheckout
              : buy.kind === "link"
                ? dict.products.paymentNote
                : buy.kind === "upi"
                  ? dict.products.upiNote
                  : dict.products.paymentSoon}
          </p>

          <section className="mt-8">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Sparkles className="size-5 text-leaf" aria-hidden="true" />
              {t.benefitsTitle ?? dict.products.benefits}
            </h2>
            <BulletList items={t.benefits} />
          </section>

          {t.specs?.length ? (
            <section className="mt-8">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
                <ClipboardList className="size-5 text-leaf" aria-hidden="true" />
                {dict.products.specs}
              </h2>
              <dl className="mt-3 divide-y divide-border overflow-hidden rounded-xl border border-border bg-card text-sm">
                {t.specs.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[40%_1fr] gap-3 px-4 py-2.5">
                    <dt className="font-medium text-muted-foreground">{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : (
            <section className="mt-8">
              <h2 className="text-lg font-semibold text-primary">{dict.products.ingredients}</h2>
              <BulletList items={t.ingredients} />
            </section>
          )}
        </div>
      </Container>

      <Container className="grid gap-6 pb-8 lg:max-w-4xl">
        <p className="text-[1.05rem] leading-relaxed text-foreground/85">{t.description}</p>
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <section key={s.key} aria-labelledby={`sec-${s.key}`} className="rounded-2xl border border-border bg-card p-6">
              <h2 id={`sec-${s.key}`} className="flex items-center gap-2 text-xl font-semibold text-primary">
                <Icon className="size-5 text-leaf" aria-hidden="true" />
                {s.title}
              </h2>
              {s.paragraphs ? (
                <div className="mt-4 space-y-3 text-[1.02rem] leading-relaxed text-foreground/90">
                  {s.paragraphs.map((para, i) => (
                    <p key={i}>{para.trim()}</p>
                  ))}
                </div>
              ) : (
                <BulletList items={s.items ?? []} />
              )}
            </section>
          );
        })}
        {t.precautions?.length ? (
          <section aria-labelledby="sec-precautions" className="rounded-2xl border border-destructive/25 bg-destructive/[0.04] p-6">
            <h2 id="sec-precautions" className="flex items-center gap-2 text-xl font-semibold text-destructive">
              <ShieldAlert className="size-5" aria-hidden="true" />
              {dict.products.precautions}
            </h2>
            <BulletList items={t.precautions} dot="bg-destructive/70" />
          </section>
        ) : null}
        {t.faq?.length ? (
          <section aria-labelledby="sec-faq" className="rounded-2xl border border-border bg-card p-6">
            <h2 id="sec-faq" className="flex items-center gap-2 text-xl font-semibold text-primary">
              <CircleHelp className="size-5 text-leaf" aria-hidden="true" />
              {dict.products.faq}
            </h2>
            <dl className="mt-4 divide-y divide-border">
              {t.faq.map((f, i) => (
                <div key={i} className="py-4 first:pt-0 last:pb-0">
                  <dt>
                    <h3 className="text-[1.05rem] font-semibold text-foreground">{f.q}</h3>
                  </dt>
                  <dd className="mt-2 text-[1.02rem] leading-relaxed text-foreground/85">{f.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}
        {!product.sample && (
          <p className="rounded-2xl border border-border bg-muted/40 p-4 text-sm leading-relaxed text-muted-foreground">
            {dict.products.productDisclaimer}
          </p>
        )}
        <DisclaimerNote locale={locale} dict={dict} />
        <div>
          <Link href={`/${locale}/products`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {dict.products.backToAll}
          </Link>
        </div>
      </Container>

      {relatedRemedies.length > 0 && (
        <Container className="py-8">
          <h2 className="mb-6 text-2xl font-semibold text-primary">{dict.products.related}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {relatedRemedies.map((r) => (
              <RemedyCard key={r.slug} remedy={r} locale={locale} dict={dict} />
            ))}
          </div>
        </Container>
      )}

      {others.length > 0 && (
        <Container className="py-8">
          <h2 className="mb-6 text-2xl font-semibold text-primary">{dict.home.featuredProducts}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}

