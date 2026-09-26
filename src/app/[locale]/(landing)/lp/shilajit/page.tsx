import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BadgeCheck, CircleCheck, CreditCard, Leaf, ShieldAlert, Truck } from "lucide-react";
import { siteUrl, type Locale } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";
import { fillTemplate, formatWhatsappDisplay, whatsappButtonClass } from "@/lib/whatsapp";
import { getWhatsappNumber, ogAbsolute, ogBaseUrl } from "@/config/site";
import { getBuyMode, getProduct } from "@/content/products";
import { shilajitLanding, shilajitLandingMaxQty, shilajitLandingSlug, shilajitProductSlug } from "@/content/landing/shilajit";
import { JsonLd } from "@/components/page-bits";
import { LogoMark } from "@/components/brand-logo";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { formatInr } from "@/components/product-bits";
import { CheckoutForm } from "@/components/checkout/checkout-form";
import { KeepQueryLink, StickyOrderBar, UtmWhatsAppLink } from "@/components/landing/landing-client";
import { shilajitArticles } from "@/content/articles-shilajit";

/** The LP shows the first five product FAQs (the product page shows all of them) */
const LP_FAQ_COUNT = 5;

const OG_IMAGE = "/lp/shilajit-og.jpg";

export async function generateMetadata({ params }: PageProps<"/[locale]/lp/shilajit">) {
  const locale = await resolveLocale(params);
  const t = shilajitLanding[locale];
  return buildMetadata({
    locale,
    path: `/lp/${shilajitLandingSlug}`,
    title: t.metaTitle,
    absoluteTitle: true,
    description: t.metaDescription,
    image: { url: OG_IMAGE, width: 1200, height: 630, alt: t.ogAlt },
    // og:url must resolve today for Facebook / Instagram / WhatsApp previews (see ogBaseUrl)
    ogUrl: `${ogBaseUrl}/${locale}/lp/${shilajitLandingSlug}`,
  });
}

const H2 = ({ children, id }: { children: React.ReactNode; id?: string }) => (
  <h2 id={id} className="text-2xl font-semibold leading-tight text-primary sm:text-3xl">
    {children}
  </h2>
);

/** Conversion-focused ad landing page for Himalayan Shilajit (Instagram / Facebook reels). No site nav. */
export default async function ShilajitLandingPage({ params }: PageProps<"/[locale]/lp/shilajit">) {
  const locale: Locale = await resolveLocale(params);
  const product = getProduct(shilajitProductSlug);
  if (!product || !product.price) notFound();
  const dict = getDictionary(locale);
  const t = shilajitLanding[locale];
  const p = product[locale];
  const price = product.price;
  const priceLabel = formatInr(price, locale);
  const mrpLabel = product.mrp ? formatInr(product.mrp, locale) : undefined;
  const whatsapp = getWhatsappNumber();
  const buy = getBuyMode(product);
  const upi = buy.kind === "upi" ? buy.upi : undefined;
  const front = product.media?.images[0];
  const video = product.media?.video;
  const other: Locale = locale === "hi" ? "en" : "hi";
  const pageUrl = `${siteUrl}/${locale}/lp/${shilajitLandingSlug}`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";
  const sourceLabel = dict.checkout.waMessage.source;
  const faq = (p.faq ?? []).slice(0, LP_FAQ_COUNT);

  const waButton = (className: string, label: string, testId: string, iconClass = "size-5") =>
    whatsapp ? (
      <UtmWhatsAppLink number={whatsapp} message={t.whatsappMessage} sourceLabel={sourceLabel} className={className} testId={testId}>
        <WhatsAppIcon className={iconClass} />
        {label}
      </UtmWhatsAppLink>
    ) : null;

  const upiButtonClass =
    "inline-flex items-center justify-center gap-2 rounded-lg bg-primary font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90";

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: p.name,
          description: p.short,
          sku: product.slug,
          category: "Ayurvedic supplement",
          ...(product.brand ? { brand: { "@type": "Brand", name: product.brand } } : {}),
          image: [...(front ? [ogAbsolute(front.src)] : []), ogAbsolute(OG_IMAGE)],
          url: pageUrl,
          inLanguage,
          offers: {
            "@type": "Offer",
            url: pageUrl,
            price: price.toFixed(2),
            priceCurrency: "INR",
            availability: product.inStock === false ? "https://schema.org/OutOfStock" : "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
          },
        }}
      />
      {faq.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage,
            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}

      {/* Logo-only top bar */}
      <header className="border-b border-border/70 bg-background">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <span className="flex items-center gap-2">
            <LogoMark px={36} className="size-9 sm:size-9" />
            <span className="font-heading text-lg font-semibold leading-none text-primary">{dict.brand.name}</span>
          </span>
          <KeepQueryLink
            href={`/${other}/lp/${shilajitLandingSlug}`}
            lang={other === "hi" ? "hi" : "en"}
            className="rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-primary hover:bg-muted"
          >
            {t.switchLanguage}
          </KeepQueryLink>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* 1. Hero */}
        <section className="bg-gradient-to-b from-turmeric-soft/60 to-background">
          <div className="mx-auto grid max-w-5xl gap-4 px-4 pb-8 pt-5 lg:grid-cols-2 lg:gap-x-12 lg:py-12">
            <div className="lg:col-start-2 lg:row-start-1 lg:self-end">
              <p className="text-xs font-semibold uppercase tracking-wide text-leaf sm:text-sm">{t.eyebrow}</p>
              <h1 className="mt-1.5 text-[1.65rem] font-semibold leading-tight text-forest sm:text-4xl">{t.headline}</h1>
            </div>

            {front && (
              <div className="relative mx-auto w-full max-w-[420px] lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:max-w-none">
                <div className="flex h-[230px] items-center justify-center rounded-3xl border border-border bg-white p-3 shadow-sm sm:h-[320px] lg:h-auto lg:p-6">
                  <Image
                    src={front.src}
                    alt={t.imageAlt}
                    width={front.width}
                    height={front.height}
                    preload
                    fetchPriority="high"
                    sizes="(min-width: 1024px) 460px, 240px"
                    className="h-full w-auto object-contain lg:h-auto lg:w-full"
                  />
                </div>
                <span className="absolute -top-2 right-2 rounded-full bg-[#15803d] px-3 py-1.5 text-sm font-bold text-white shadow-md">{t.off}</span>
              </div>
            )}

            <div className="lg:col-start-2 lg:row-start-2">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-4xl font-bold text-foreground" data-testid="lp-price">{priceLabel}</span>
                {mrpLabel && (
                  <span className="text-lg text-muted-foreground">
                    {t.mrp} <s>{mrpLabel}</s>
                  </span>
                )}
                <span className="rounded-md bg-turmeric px-2 py-0.5 text-sm font-bold text-[#3b2a06]">{t.off}</span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground sm:text-base">{t.subhead}</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {waButton(cn(whatsappButtonClass, "h-12 px-4 text-base font-semibold"), t.ctaWhatsapp, "lp-cta-whatsapp")}
                {upi && (
                  <a href="#pay" className={cn(upiButtonClass, "h-12 px-4 text-base")} data-testid="lp-cta-upi">
                    <CreditCard className="size-5" aria-hidden="true" />
                    {t.ctaUpi}
                  </a>
                )}
              </div>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Highlights">
                {t.chips.map((c) => (
                  <li key={c} className="inline-flex items-center gap-1 rounded-full border border-leaf/30 bg-leaf-soft/60 px-2.5 py-1 text-xs font-medium text-forest">
                    <BadgeCheck className="size-3.5" aria-hidden="true" />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted-foreground">{t.ctaNote}</p>
            </div>
          </div>
        </section>

        {/* 2. Video */}
        {video && (
          <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-video">
            <H2 id="lp-video">{t.videoTitle}</H2>
            <video
              className="mx-auto mt-4 aspect-[9/16] w-full max-w-[300px] rounded-2xl bg-black object-cover shadow-md"
              controls
              muted
              playsInline
              preload="none"
              poster={video.poster}
              width={video.width}
              height={video.height}
              aria-label={t.videoLabel}
            >
              <source src={video.src} type="video/mp4" />
            </video>
          </section>
        )}

        {/* 3. Key points */}
        <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-points">
          <H2 id="lp-points">{t.pointsTitle}</H2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {t.points.map((pt) => (
              <li key={pt} className="flex gap-3 rounded-2xl border border-border bg-card p-4">
                <CircleCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
                <span>{pt}</span>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-foreground">{t.pointsNote}</p>
        </section>

        {/* 4. How to use */}
        <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-use">
          <H2 id="lp-use">{t.howToUseTitle}</H2>
          <ul className="mt-5 space-y-3">
            {p.howToUse.map((step) => (
              <li key={step} className="flex gap-3">
                <Leaf className="mt-1 size-4 shrink-0 text-leaf" aria-hidden="true" />
                <span>{step}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* 5. How to order */}
        <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-order">
          <H2 id="lp-order">{t.orderTitle}</H2>
          <ol className="mt-5 grid gap-3 sm:grid-cols-3">
            {t.orderSteps.map((s, i) => (
              <li key={s.title} className="rounded-2xl border border-border bg-card p-4">
                <span className="inline-flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">{i + 1}</span>
                <p className="mt-2 font-semibold">{s.title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* 6. Pay + order form */}
        {upi && (
          <section id="pay" className="scroll-mt-2 bg-secondary/40 py-10" aria-labelledby="lp-pay">
            <div className="mx-auto max-w-xl px-4">
              <H2 id="lp-pay">{t.payTitle}</H2>
              <p className="mt-1 text-sm text-muted-foreground">{t.payIntro}</p>
              <div className="mt-5">
                <CheckoutForm
                  variant="landing"
                  maxQty={shilajitLandingMaxQty}
                  locale={locale}
                  strings={dict.checkout}
                  upi={upi}
                  product={{
                    slug: product.slug,
                    name: p.name,
                    size: p.size,
                    price,
                    mrp: product.mrp,
                    orderName: product.orderName ?? p.name,
                  }}
                  whatsapp={whatsapp}
                />
              </div>
              {/* 7. Delivery */}
              <p className="mt-5 flex gap-2 rounded-xl border border-border bg-card p-3 text-sm">
                <Truck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
                {t.deliveryNote}
              </p>
            </div>
          </section>
        )}
        {!upi && (
          <p className="mx-auto flex max-w-5xl gap-2 px-4 py-4 text-sm">
            <Truck className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
            {t.deliveryNote}
          </p>
        )}

        {/* 8. Precautions + FAQ */}
        {p.precautions?.length ? (
          <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-precautions">
            <H2 id="lp-precautions">{t.precautionsTitle}</H2>
            <ul className="mt-5 space-y-3 rounded-2xl border border-turmeric/40 bg-turmeric-soft/40 p-4 text-sm">
              {p.precautions.map((c) => (
                <li key={c} className="flex gap-2.5">
                  <ShieldAlert className="mt-0.5 size-4 shrink-0 text-[#8a5a00]" aria-hidden="true" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {faq.length ? (
          <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-faq">
            <H2 id="lp-faq">{t.faqTitle}</H2>
            <div className="mt-5 divide-y divide-border rounded-2xl border border-border bg-card">
              {faq.map((f) => (
                <details key={f.q} className="group p-4">
                  <summary className="cursor-pointer list-none font-semibold marker:hidden">
                    <span className="flex items-start justify-between gap-3">
                      {f.q}
                      <span className="text-primary transition-transform group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        {/* Guides (internal links) */}
        <section className="mx-auto max-w-5xl px-4 py-6" aria-labelledby="lp-guides">
          <h2 id="lp-guides" className="text-lg font-semibold text-primary">
            {t.guidesTitle}
          </h2>
          <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
            {shilajitArticles.map((a) => (
              <li key={a.slug}>
                <Link href={`/${locale}/articles/${a.slug}`} className="text-primary underline-offset-2 hover:underline">
                  {a[locale].title}
                </Link>
              </li>
            ))}
            <li>
              <Link href={`/${locale}/shilajit`} className="font-semibold text-primary underline-offset-2 hover:underline">
                {locale === "hi" ? "पूरी शिलाजीत गाइड →" : "Complete shilajit guide →"}
              </Link>
            </li>
          </ul>
        </section>

        {/* 9. Contact */}
        {whatsapp && (
          <section className="mx-auto max-w-5xl px-4 py-8" aria-labelledby="lp-contact">
            <H2 id="lp-contact">{t.contactTitle}</H2>
            <UtmWhatsAppLink
              number={whatsapp}
              message={t.whatsappMessage}
              sourceLabel={sourceLabel}
              className="mt-3 inline-flex items-center gap-2 text-lg font-semibold text-[#166534] hover:underline"
              testId="lp-contact-whatsapp"
            >
              <WhatsAppIcon className="size-5" />
              {fillTemplate(t.contactLine, { number: formatWhatsappDisplay(whatsapp) })}
            </UtmWhatsAppLink>
          </section>
        )}
      </main>

      {/* 11. Minimal footer */}
      <footer className="border-t border-border bg-forest pb-24 text-primary-foreground lg:pb-0">
        <div className="mx-auto max-w-5xl space-y-3 px-4 py-6 text-xs text-primary-foreground/75">
          <p>{dict.footer.shortDisclaimer}</p>
          <nav aria-label="Legal" className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href={`/${locale}/products/${product.slug}`} className="underline underline-offset-2 hover:text-turmeric">{t.fullDetails}</Link>
            <Link href={`/${locale}/privacy`} className="underline underline-offset-2 hover:text-turmeric">{dict.footer.privacy}</Link>
            <Link href={`/${locale}/terms`} className="underline underline-offset-2 hover:text-turmeric">{dict.footer.terms}</Link>
            <Link href={`/${locale}/disclaimer`} className="underline underline-offset-2 hover:text-turmeric">{dict.footer.disclaimer}</Link>
          </nav>
          <div className="flex flex-col gap-1 sm:flex-row sm:justify-between">
            <p>© {new Date().getFullYear()} {dict.brand.name}. {dict.footer.rights}</p>
            <p lang="en">
              Designed and built by{" "}
              <a href="https://www.mksanalytiq.in" target="_blank" rel="noopener" className="font-semibold text-primary-foreground underline decoration-turmeric/70 underline-offset-2 hover:text-turmeric">
                MKSAnalytiq
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* 10. Sticky mobile bar */}
      <StickyOrderBar targetId="pay">
        <div className="mx-auto flex max-w-xl items-center gap-2">
          <div className="min-w-0 shrink-0 leading-tight">
            <p className="text-xl font-bold">{priceLabel}</p>
            {mrpLabel && (
              <p className="text-xs text-muted-foreground">
                <s>{mrpLabel}</s> · {t.off}
              </p>
            )}
          </div>
          <div className="ml-auto flex gap-2">
            {waButton(cn(whatsappButtonClass, "h-11 px-3 text-sm font-semibold"), t.stickyWhatsapp, "lp-sticky-whatsapp", "size-4")}
            {upi && (
              <a href="#pay" className={cn(upiButtonClass, "h-11 px-3 text-sm")} data-testid="lp-sticky-upi">
                <CreditCard className="size-4" aria-hidden="true" />
                {t.stickyUpi}
              </a>
            )}
          </div>
        </div>
      </StickyOrderBar>
    </div>
  );
}
