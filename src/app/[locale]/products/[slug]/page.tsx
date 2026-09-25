import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, MessageCircle, TriangleAlert } from "lucide-react";
import { locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { getProduct, products } from "@/content/products";
import { ProductCard, SampleBadge } from "@/components/cards";
import { ProductIllustration } from "@/components/illustrations";
import { Breadcrumbs, Container, DisclaimerNote } from "@/components/page-bits";
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
  // Sample listings are kept out of search results until real products replace them.
  return buildMetadata({ locale, path: `/products/${slug}`, title: t.name, description: t.short, noIndex: product.sample });
}

export default async function ProductPage({ params }: PageProps<"/[locale]/products/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const dict = getDictionary(locale);
  const t = product[locale];
  const others = products.filter((p) => p.slug !== slug).slice(0, 3);

  const lists = [
    { title: dict.products.benefits, items: t.benefits },
    { title: dict.products.howToUse, items: t.howToUse },
    { title: dict.products.ingredients, items: t.ingredients },
  ];

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { href: `/${locale}`, label: dict.common.breadcrumbHome },
            { href: `/${locale}/products`, label: dict.nav.products },
            { label: t.name },
          ]}
        />
      </Container>
      <Container className="grid gap-10 py-8 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <ProductIllustration product={product} className="aspect-square w-full" />
          <div className="absolute left-4 top-4 right-4">
            <SampleBadge label={dict.products.sampleBadge} />
          </div>
        </div>
        <div>
          <SampleBadge label={dict.products.sampleBadge} />
          <h1 className="mt-3 text-3xl font-semibold text-primary sm:text-4xl">{t.name}</h1>
          <p className="mt-3 text-lg text-muted-foreground">{t.short}</p>
          <p className="mt-4 font-medium">
            {t.size} · <span className="text-clay">{dict.products.priceOnEnquiry}</span>
          </p>
          <p className="mt-5 leading-relaxed text-foreground/85">{t.description}</p>
          <div role="note" className="mt-5 flex gap-2 rounded-xl border border-turmeric/40 bg-turmeric-soft/60 p-3 text-sm text-[#5a3f0a]">
            <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {dict.products.sampleNotice}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={`/${locale}/enquiry?product=${product.slug}`} className={cn(buttonVariants(), "h-12 px-6 text-base")}>
              <MessageCircle className="size-4" aria-hidden="true" />
              {dict.products.enquire}
            </Link>
            <Link href={`/${locale}/products`} className={cn(buttonVariants({ variant: "outline" }), "h-12 px-5 text-base")}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              {dict.products.backToAll}
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{dict.products.noCheckout}</p>
          <div className="mt-8 space-y-6">
            {lists.map((l) => (
              <section key={l.title}>
                <h2 className="text-lg font-semibold text-primary">{l.title}</h2>
                <ul className="mt-2 space-y-1.5">
                  {l.items.map((item) => (
                    <li key={item} className="flex gap-2.5">
                      <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-turmeric" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
          <DisclaimerNote locale={locale} dict={dict} className="mt-8" />
        </div>
      </Container>
      <Container className="py-8">
        <h2 className="mb-6 text-2xl font-semibold text-primary">{dict.home.featuredProducts}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>
    </>
  );
}
