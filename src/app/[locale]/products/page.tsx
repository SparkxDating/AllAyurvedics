import { Info } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { products } from "@/content/products";
import { ProductCard } from "@/components/cards";
import { Container, PageHeader } from "@/components/page-bits";

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
        <p className="mb-8 flex gap-2 rounded-xl border border-turmeric/40 bg-turmeric-soft/60 p-4 text-sm text-[#5a3f0a]">
          <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {dict.products.noCheckout}
        </p>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>
    </>
  );
}
