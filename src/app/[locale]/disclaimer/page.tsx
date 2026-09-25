import { resolveLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { staticPages } from "@/content/pages";
import { StaticPage } from "@/components/static-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/disclaimer">) {
  const locale = await resolveLocale(params);
  const page = staticPages.disclaimer[locale];
  return buildMetadata({ locale, path: "/disclaimer", title: page.title, description: page.description });
}

export default async function DisclaimerPage({ params }: PageProps<"/[locale]/disclaimer">) {
  const locale = await resolveLocale(params);
  return <StaticPage locale={locale} pageKey="disclaimer" />;
}
