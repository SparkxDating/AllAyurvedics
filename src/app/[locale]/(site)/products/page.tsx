import Link from "next/link";
import { PackagePlus } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/content/products";
import { ProductCard } from "@/components/cards";
import { Container, PageHeader } from "@/components/page-bits";
import { ShilajitGuides } from "@/components/shilajit-bits";

export async function generateMetadata({ params }: PageProps<"/[locale]/products">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/products", title: dict.products.title, description: dict.products.intro });
}

export default async function ProductsPage({ params }: PageProps<"/[locale]/products">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <>
      <PageHeader
        title={dict.products.title}
        intro={dict.products.intro}
        breadcrumbs={[{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: dict.nav.products }]}
      />
      <Container className="py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
          ))}
          <div className="flex h-full flex-col items-start justify-center rounded-2xl border border-dashed border-border bg-secondary/40 p-6">
            <span className="inline-flex size-12 items-center justify-center rounded-full bg-turmeric-soft text-[#8a5a07]">
              <PackagePlus className="size-6" aria-hidden="true" />
            </span>
            <h2 className="mt-4 text-lg font-semibold text-primary">{dict.products.moreSoon}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{dict.products.moreSoonText}</p>
            <Link
              href={`/${locale}/enquiry`}
              className="mt-4 inline-flex h-9 items-center rounded-lg border border-border bg-card px-3 text-sm font-medium hover:bg-muted"
            >
              {dict.products.suggest}
            </Link>
          </div>
        </div>
        <ShilajitGuides locale={locale} className="mt-10" />
      </Container>
    </>
  );
}
