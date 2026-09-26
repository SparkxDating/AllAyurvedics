import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteUrl } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { activeClusters, getClusterRemedies } from "@/content/clusters";
import { CategoryIcon } from "@/components/illustrations";
import { RemedyThumb } from "@/components/remedy-thumb";
import { Container, DisclaimerNote, JsonLd, PageHeader } from "@/components/page-bits";

export async function generateMetadata({ params }: PageProps<"/[locale]/home-remedies">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/home-remedies", title: dict.hubs.title, description: dict.hubs.intro });
}

export default async function HubIndexPage({ params }: PageProps<"/[locale]/home-remedies">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const crumbs = [{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: dict.hubs.nav }];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: crumbs.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: `${siteUrl}${c.href ?? `/${locale}/home-remedies`}`,
          })),
        }}
      />
      <PageHeader title={dict.hubs.title} intro={dict.hubs.intro} breadcrumbs={crumbs} />
      <Container className="py-10">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {activeClusters.map((c) => {
            const posts = getClusterRemedies(c.slug);
            const cover = posts.find((r) => r.image);
            return (
              <Link
                key={c.slug}
                href={`/${locale}/home-remedies/${c.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5"
              >
                <RemedyThumb image={cover?.image} alt={cover?.[locale].imageAlt} category={c.icon} className="border-b border-border" />
                <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <CategoryIcon category={c.icon} />
                  <span className="text-xs text-muted-foreground">
                    {posts.length} {dict.hubs.count}
                  </span>
                </div>
                <h2 className="mt-4 text-lg font-semibold leading-snug group-hover:text-primary">{c[locale].title}</h2>
                <p className="mt-2 line-clamp-3 text-sm text-muted-foreground">{c[locale].metaDescription}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm font-medium text-primary">
                  {c[locale].headTerm}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </span>
                </div>
              </Link>
            );
          })}
        </div>
        <DisclaimerNote locale={locale} dict={dict} className="mt-12" />
      </Container>
    </>
  );
}
