import { Mail } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { getProduct, products } from "@/content/products";
import { contactEmail } from "@/content/pages";
import { getWhatsappNumber } from "@/config/site";
import { formatWhatsappDisplay, waLink, whatsappButtonClass } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { cn } from "@/lib/utils";
import { Container, PageHeader } from "@/components/page-bits";
import { EnquiryForm } from "@/components/forms/enquiry-form";

export async function generateMetadata({ params }: PageProps<"/[locale]/enquiry">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/enquiry", title: dict.enquiry.title, description: dict.enquiry.intro });
}

export default async function EnquiryPage({ params, searchParams }: PageProps<"/[locale]/enquiry">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const whatsapp = getWhatsappNumber();
  const sp = await searchParams;
  const productSlug = typeof sp.product === "string" ? sp.product : undefined;
  const selected = productSlug ? getProduct(productSlug) : undefined;
  const options = products.map((p) => ({ value: p.slug, label: p[locale].name }));

  return (
    <>
      <PageHeader
        title={dict.enquiry.title}
        intro={dict.enquiry.intro}
        breadcrumbs={[{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: dict.nav.contact }]}
      />
      <Container className="grid gap-10 py-10 lg:grid-cols-[1fr_320px]">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <EnquiryForm
            // re-mount when the product changes so defaults update
            key={selected?.slug ?? "none"}
            locale={locale}
            strings={dict.forms}
            products={options}
            defaultProduct={selected ? selected[locale].name : undefined}
          />
        </div>
        <aside className="space-y-5">
          <div className="rounded-2xl border border-border bg-secondary/60 p-6">
            <h2 className="text-lg font-semibold text-primary">{dict.enquiry.asideTitle}</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {dict.enquiry.asideItems.map((item) => (
                <li key={item} className="flex gap-2.5">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-turmeric" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
              <Mail className="size-5" aria-hidden="true" />
              {dict.enquiry.emailLabel}
            </h2>
            <a href={`mailto:${contactEmail}`} className="mt-2 inline-block text-sm font-medium underline underline-offset-2">
              {contactEmail}
            </a>
          </div>
          {whatsapp && (
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="flex items-center gap-2 text-lg font-semibold text-primary">
                <WhatsAppIcon className="size-5 text-[#15803d]" />
                {dict.whatsapp.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{dict.whatsapp.contactText}</p>
              <a
                href={waLink(whatsapp, dict.whatsapp.generalMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(whatsappButtonClass, "mt-3 h-11 px-5 text-sm")}
                data-testid="enquiry-whatsapp"
              >
                <WhatsAppIcon className="size-4" />
                {formatWhatsappDisplay(whatsapp)}
              </a>
            </div>
          )}
        </aside>
      </Container>
    </>
  );
}
