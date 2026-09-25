import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { countByCategory, remedies } from "@/content/remedies";
import { remedyCategories } from "@/content/types";
import { Container, DisclaimerNote, PageHeader } from "@/components/page-bits";
import { RemedyBrowser } from "@/components/remedy-browser";

export async function generateMetadata({ params }: PageProps<"/[locale]/remedies">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/remedies", title: dict.remedies.title, description: dict.remedies.intro });
}

export default async function RemediesPage({ params, searchParams }: PageProps<"/[locale]/remedies">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const sp = await searchParams;
  const requested = typeof sp.category === "string" ? sp.category : "all";
  const initialCategory = (remedyCategories as string[]).includes(requested) ? requested : "all";
  const counts = countByCategory();
  const other = locale === "en" ? "hi" : "en";

  const items = remedies.map((r) => ({
    slug: r.slug,
    category: r.category,
    time: r.time,
    title: r[locale].title,
    summary: r[locale].summary,
    keywords: [...r[locale].ingredients, r[other].title, dict.categories[r.category]].join(" "),
  }));

  return (
    <>
      <PageHeader
        title={dict.remedies.title}
        intro={dict.remedies.intro}
        breadcrumbs={[{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: dict.nav.remedies }]}
      />
      <Container className="py-10">
        <RemedyBrowser
          locale={locale}
          items={items}
          initialCategory={initialCategory}
          categories={remedyCategories.map((c) => ({ value: c, label: dict.categories[c], count: counts[c] ?? 0 }))}
          strings={{
            searchPlaceholder: dict.remedies.searchPlaceholder,
            searchLabel: dict.remedies.searchLabel,
            allCategories: dict.remedies.allCategories,
            categoryLabel: dict.remedies.categoryLabel,
            noResults: dict.remedies.noResults,
            results: dict.remedies.results,
            readMore: dict.remedies.readMore,
            minutes: locale === "hi" ? "मिनट" : "min",
          }}
        />
        <DisclaimerNote locale={locale} dict={dict} className="mt-12" />
      </Container>
    </>
  );
}
