import { resolveLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { staticPages } from "@/content/pages";
import { StaticPage } from "@/components/static-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/privacy">) {
  const locale = await resolveLocale(params);
  const page = staticPages.privacy[locale];
  return buildMetadata({ locale, path: "/privacy", title: page.title, description: page.description });
}

export default async function PrivacyPage({ params }: PageProps<"/[locale]/privacy">) {
  const locale = await resolveLocale(params);
  return <StaticPage locale={locale} pageKey="privacy" />;
}
