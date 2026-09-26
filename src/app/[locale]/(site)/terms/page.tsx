import { resolveLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { staticPages } from "@/content/pages";
import { StaticPage } from "@/components/static-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/terms">) {
  const locale = await resolveLocale(params);
  const page = staticPages.terms[locale];
  return buildMetadata({ locale, path: "/terms", title: page.title, description: page.description });
}

export default async function TermsPage({ params }: PageProps<"/[locale]/terms">) {
  const locale = await resolveLocale(params);
  return <StaticPage locale={locale} pageKey="terms" />;
}
