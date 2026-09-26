import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { getBuyMode, getProduct } from "@/content/products";
import { getConfiguredContactEmail, getWhatsappNumber } from "@/config/site";
import { makeOrderRef } from "@/lib/upi";
import { Breadcrumbs, Container } from "@/components/page-bits";
import { CheckoutForm } from "@/components/checkout/checkout-form";

// Rendered per request: each visit gets a fresh order reference. Never cached or indexed.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: PageProps<"/[locale]/checkout/[slug]">): Promise<Metadata> {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  const dict = getDictionary(locale);
  return {
    title: product ? `${dict.checkout.title} – ${product[locale].name}` : dict.checkout.title,
    robots: { index: false, follow: false, nocache: true },
  };
}

export default async function CheckoutPage({ params }: PageProps<"/[locale]/checkout/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product || !product.price) notFound();
  const mode = getBuyMode(product);
  // Only available when UPI is configured and the product has no hosted payment link.
  if (mode.kind !== "upi") notFound();

  const dict = getDictionary(locale);
  const t = product[locale];
  const img = product.media?.images[0];

  return (
    <>
      <Container className="pt-8">
        <Breadcrumbs
          items={[
            { href: `/${locale}`, label: dict.common.breadcrumbHome },
            { href: `/${locale}/products`, label: dict.nav.products },
            { href: `/${locale}/products/${product.slug}`, label: t.name },
            { label: dict.checkout.title },
          ]}
        />
      </Container>
      <Container className="py-8">
        <h1 className="text-3xl font-semibold text-primary sm:text-4xl">{dict.checkout.title}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{dict.checkout.intro}</p>
        <CheckoutForm
          locale={locale}
          strings={dict.checkout}
          orderRef={makeOrderRef()}
          upi={mode.upi}
          product={{
            slug: product.slug,
            name: t.name,
            size: t.size,
            price: product.price,
            mrp: product.mrp,
            orderName: product.orderName ?? product.en.name,
            image: img ? { src: img.src, width: img.width, height: img.height, alt: t.imageAlt?.[0] ?? t.name } : undefined,
          }}
          whatsapp={getWhatsappNumber()}
          contactEmail={getConfiguredContactEmail()}
        />
      </Container>
    </>
  );
}
