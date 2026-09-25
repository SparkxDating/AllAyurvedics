import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { staticPages, type StaticPageKey } from "@/content/pages";
import { Markdown } from "@/lib/markdown";
import { Container, PageHeader } from "./page-bits";

export function StaticPage({ locale, pageKey }: { locale: Locale; pageKey: StaticPageKey }) {
  const dict = getDictionary(locale);
  const page = staticPages[pageKey][locale];
  return (
    <>
      <PageHeader
        title={page.title}
        intro={page.description}
        breadcrumbs={[{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: page.title }]}
      />
      <Container className="max-w-3xl py-10">
        <Markdown body={page.body} />
      </Container>
    </>
  );
}
