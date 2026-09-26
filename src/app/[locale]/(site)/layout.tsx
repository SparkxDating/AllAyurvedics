import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getWhatsappNumber } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

/** Regular site chrome (header, footer, floating WhatsApp). Ad landing pages live in (landing) without it. */
export default async function SiteLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const whatsapp = getWhatsappNumber();
  return (
    <>
      <SiteHeader locale={locale} dict={dict} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} dict={dict} />
      {whatsapp && <WhatsAppFloat href={waLink(whatsapp, dict.whatsapp.generalMessage)} label={dict.whatsapp.floatLabel} />}
    </>
  );
}
