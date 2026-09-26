import Link from "next/link";
import { ArrowRight, BookOpen, HeartHandshake, Leaf, MessageCircle, Sun } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { newsletterStrings } from "@/i18n/strings";
import { buildMetadata } from "@/lib/seo";
import { getFeaturedRemedies } from "@/content/remedies";
import { articles } from "@/content/articles";
import { products } from "@/content/products";
import { remedyCategories } from "@/content/types";
import { ArticleCard, ProductCard, RemedyCard } from "@/components/cards";
import { ProductSpotlight } from "@/components/product-bits";
import { ShilajitCallout } from "@/components/shilajit-bits";
import { CategoryIcon, HeroIllustration } from "@/components/illustrations";
import { Container, JsonLd, SectionHeading } from "@/components/page-bits";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { siteUrl } from "@/i18n/config";

export async function generateMetadata({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({
    locale,
    path: "/",
    title: `${dict.brand.name} – ${dict.brand.tagline}`,
    description: dict.home.heroText,
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const featured = getFeaturedRemedies(6);
  const latest = articles.slice(0, 3);
  const featuredProducts = products.filter((p) => p.featured).slice(0, 3);
  const pillarIcons = [Leaf, Sun, HeartHandshake];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: dict.brand.name,
          url: `${siteUrl}/${locale}`,
          inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
          publisher: { "@type": "Organization", name: "All Ayurvedics", url: siteUrl },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/70 via-background to-background">
        <div className="leaf-pattern absolute inset-0 opacity-60" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-turmeric/40 bg-turmeric-soft px-3 py-1 text-sm font-medium text-[#6b4a0c]">
              <Leaf className="size-4" aria-hidden="true" />
              {dict.home.heroEyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-forest sm:text-5xl lg:text-[3.4rem]">
              {dict.home.heroTitle}
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{dict.home.heroText}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/${locale}/remedies`} className={cn(buttonVariants(), "h-12 px-6 text-base")}>
                {dict.home.heroCtaPrimary}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link href={`/${locale}/articles`} className={cn(buttonVariants({ variant: "outline" }), "h-12 bg-card px-6 text-base")}>
                <BookOpen className="size-4" aria-hidden="true" />
                {dict.home.heroCtaSecondary}
              </Link>
            </div>
            <Link
              href={`/${locale}/lp/7-day-morning-routine`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-clay hover:underline"
            >
              <Sun className="size-4" aria-hidden="true" />
              {dict.home.guideCta}
            </Link>
          </div>
          <HeroIllustration className="mx-auto w-full max-w-md" />
        </Container>
      </section>

      {/* Pillars */}
      <Container className="-mt-2 py-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {dict.home.pillars.map((p, i) => {
            const Icon = pillarIcons[i];
            return (
              <div key={p.title} className="rounded-2xl border border-border bg-card p-5">
                <Icon className="size-6 text-leaf" aria-hidden="true" />
                <h2 className="mt-3 text-lg font-semibold">{p.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
              </div>
            );
          })}
        </div>
      </Container>

      {/* Categories */}
      <Container className="pb-4">
        <div className="flex flex-wrap gap-2">
          {remedyCategories.map((c) => (
            <Link
              key={c}
              href={`/${locale}/remedies?category=${c}`}
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3.5 text-sm font-medium hover:border-primary/40 hover:text-primary"
            >
              <CategoryIcon category={c} className="size-7 [&_svg]:size-4" />
              {dict.categories[c]}
            </Link>
          ))}
        </div>
      </Container>

      {/* Featured remedies */}
      <Container className="py-12">
        <SectionHeading
          title={dict.home.featuredRemedies}
          text={dict.home.featuredRemediesText}
          action={{ href: `/${locale}/remedies`, label: dict.home.viewAll }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((r) => (
            <RemedyCard key={r.slug} remedy={r} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>

      {/* Newsletter band */}
      <section className="bg-primary text-primary-foreground">
        <Container className="grid items-center gap-8 py-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold sm:text-3xl">{dict.home.newsletterTitle}</h2>
            <p className="mt-2 text-primary-foreground/80">{dict.home.newsletterText}</p>
          </div>
          <NewsletterForm locale={locale} strings={newsletterStrings(dict)} source="home" tone="dark" />
        </Container>
      </section>

      {/* Latest articles */}
      <Container className="py-14">
        <SectionHeading
          title={dict.home.latestArticles}
          text={dict.home.latestArticlesText}
          action={{ href: `/${locale}/articles`, label: dict.home.viewAll }}
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((a) => (
            <ArticleCard key={a.slug} article={a} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>

      {/* Featured products */}
      {featuredProducts.length > 0 && (
      <Container className="py-6">
        <SectionHeading
          title={dict.home.featuredProducts}
          text={dict.home.featuredProductsText}
          action={{ href: `/${locale}/products`, label: dict.home.viewAll }}
        />
        {featuredProducts.length === 1 ? (
          <ProductSpotlight product={featuredProducts[0]} locale={locale} dict={dict} />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
            ))}
          </div>
        )}
        <ShilajitCallout locale={locale} className="mt-5" />
      </Container>
      )}

      {/* Enquiry CTA */}
      <Container className="py-14">
        <div className="flex flex-col items-start gap-5 rounded-3xl border border-border bg-card p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
          <div className="flex gap-4">
            <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-full bg-turmeric-soft text-[#8a5a07]">
              <MessageCircle className="size-6" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-2xl font-semibold text-primary">{dict.home.enquiryTitle}</h2>
              <p className="mt-1 max-w-lg text-muted-foreground">{dict.home.enquiryText}</p>
            </div>
          </div>
          <Link href={`/${locale}/enquiry`} className={cn(buttonVariants(), "h-12 px-6 text-base")}>
            {dict.home.enquiryCta}
          </Link>
        </div>
      </Container>
    </>
  );
}
