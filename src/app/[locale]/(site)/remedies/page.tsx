import Link from "next/link";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { countByCategory, remedies } from "@/content/remedies";
import { remedyCategories } from "@/content/types";
import { activeClusters } from "@/content/clusters";
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
  const initialCategory = remedyCategories.some((category) => category === requested) ? requested : "all";
  const counts = countByCategory();
  const other = locale === "en" ? "hi" : "en";

  // Illustrated remedies first so the first screen of the list shows artwork
  const ordered = [...remedies.filter((r) => r.image), ...remedies.filter((r) => !r.image)];
  const items = ordered.map((r) => ({
    slug: r.slug,
    category: r.category,
    time: r.time,
    title: r[locale].title,
    summary: r[locale].summary,
    image: r.image,
    imageAlt: r[locale].imageAlt,
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
        {activeClusters.length > 0 && (
          <nav aria-label={dict.remedies.popularTopics} className="mb-8">
            <h2 className="text-lg font-semibold text-primary">{dict.remedies.popularTopics}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {activeClusters.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${locale}/home-remedies/${c.slug}`}
                    className="inline-flex items-center rounded-full border border-primary/25 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary hover:bg-primary/10"
                  >
                    {c[locale].headTerm}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <RemedyBrowser
          locale={locale}
          items={items}
          initialCategory={initialCategory}
          categories={remedyCategories
            .filter((c) => (counts[c] ?? 0) > 0)
            .map((c) => ({ value: c, label: dict.categories[c], count: counts[c] ?? 0 }))}
          strings={{
            searchPlaceholder: dict.remedies.searchPlaceholder,
            searchLabel: dict.remedies.searchLabel,
            allCategories: dict.remedies.allCategories,
            categoryLabel: dict.remedies.categoryLabel,
            noResults: dict.remedies.noResults,
            results: dict.remedies.results,
            readMore: dict.remedies.readMore,
            minutes: locale === "hi" ? "मिनट" : "min",
            loadMore: dict.remedies.loadMore,
            showing: dict.remedies.showing,
            of: dict.remedies.of,
          }}
        />
        <DisclaimerNote locale={locale} dict={dict} className="mt-12" />
      </Container>
    </>
  );
}
