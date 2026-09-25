import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { articles } from "@/content/articles";
import { ArticleCard } from "@/components/cards";
import { Container, PageHeader } from "@/components/page-bits";

export async function generateMetadata({ params }: PageProps<"/[locale]/articles">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/articles", title: dict.articles.title, description: dict.articles.intro });
}

export default async function ArticlesPage({ params }: PageProps<"/[locale]/articles">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <>
      <PageHeader
        title={dict.articles.title}
        intro={dict.articles.intro}
        breadcrumbs={[{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: dict.nav.articles }]}
      />
      <Container className="py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((a) => (
            <ArticleCard key={a.slug} article={a} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>
    </>
  );
}
