import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Lora, Mukta, Noto_Serif_Devanagari } from "next/font/google";
import "../globals.css";
import { isLocale, localeLabels, locales, siteName, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppFloat } from "@/components/whatsapp-float";
import { getWhatsappNumber } from "@/config/site";
import { waLink } from "@/lib/whatsapp";

const mukta = Mukta({
  subsets: ["latin", "devanagari"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mukta",
  display: "swap",
});
const lora = Lora({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-lora",
  display: "swap",
});
const notoSerifDeva = Noto_Serif_Devanagari({
  subsets: ["devanagari"],
  weight: ["500", "600", "700"],
  variable: "--font-noto-serif-deva",
  display: "swap",
  preload: false,
});

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: "#2f5d3a",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: `${dict.brand.name} – ${dict.brand.tagline}`,
      template: `%s | ${dict.brand.name}`,
    },
    description: dict.home.heroText,
    applicationName: siteName,
    keywords:
      locale === "hi"
        ? ["आयुर्वेद", "घरेलू नुस्खे", "आयुर्वेदिक उपचार", "दिनचर्या", "स्वस्थ जीवनशैली"]
        : ["Ayurveda", "Ayurvedic home remedies", "dinacharya", "doshas", "healthy lifestyle India"],
    formatDetection: { telephone: false },
  };
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = getDictionary(locale);
  const whatsapp = getWhatsappNumber();

  return (
    <html
      lang={localeLabels[locale].htmlLang}
      className={`${mukta.variable} ${lora.variable} ${notoSerifDeva.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {locale === "hi" ? "मुख्य सामग्री पर जाएँ" : "Skip to content"}
        </a>
        <SiteHeader locale={locale} dict={dict} />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter locale={locale} dict={dict} />
        {whatsapp && <WhatsAppFloat href={waLink(whatsapp, dict.whatsapp.generalMessage)} label={dict.whatsapp.floatLabel} />}
      </body>
    </html>
  );
}
