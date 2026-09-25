import { resolveLocale } from "@/i18n/server";
import { buildMetadata } from "@/lib/seo";
import { staticPages } from "@/content/pages";
import { StaticPage } from "@/components/static-page";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  const page = staticPages.about[locale];
  return buildMetadata({ locale, path: "/about", title: page.title, description: page.description });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const locale = await resolveLocale(params);
  return <StaticPage locale={locale} pageKey="about" />;
}
