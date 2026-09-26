import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { locales, siteUrl } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { activeClusters, getCluster, getClusterMoreRemedies, getClusterRemedies } from "@/content/clusters";
import { RemedyCard } from "@/components/cards";
import { ShopPromo } from "@/components/product-bits";
import { getPromotedProducts } from "@/content/products";
import { CategoryIcon } from "@/components/illustrations";
import { ShilajitCallout } from "@/components/shilajit-bits";
import { Breadcrumbs, Container, DisclaimerNote, JsonLd } from "@/components/page-bits";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => activeClusters.map((c) => ({ locale, cluster: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/home-remedies/[cluster]">) {
  const locale = await resolveLocale(params);
  const { cluster: slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) return {};
  const t = cluster[locale];
  return buildMetadata({
    locale,
    path: `/home-remedies/${cluster.slug}`,
    title: t.metaTitle,
    absoluteTitle: true,
    description: t.metaDescription,
  });
}

export default async function ClusterHubPage({ params }: PageProps<"/[locale]/home-remedies/[cluster]">) {
  const locale = await resolveLocale(params);
  const { cluster: slug } = await params;
  const cluster = getCluster(slug);
  if (!cluster) notFound();
  const posts = getClusterRemedies(cluster.slug);
  if (!posts.length) notFound();
  const more = getClusterMoreRemedies(cluster);
  const dict = getDictionary(locale);
  const t = cluster[locale];
  const pageUrl = `${siteUrl}/${locale}/home-remedies/${cluster.slug}`;
  const crumbs = [
    { href: `/${locale}`, label: dict.common.breadcrumbHome },
    { href: `/${locale}/home-remedies`, label: dict.hubs.nav },
    { label: t.name },
  ];

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
            item: c.href ? `${siteUrl}${c.href}` : pageUrl,
          })),
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.title,
          description: t.metaDescription,
          inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
          url: pageUrl,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: posts.length,
            itemListElement: posts.map((r, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${siteUrl}/${locale}/remedies/${r.slug}`,
              name: r[locale].title,
            })),
          },
        }}
      />
      <section className="leaf-pattern border-b border-border bg-secondary/50">
        <Container className="py-10 sm:py-14">
          <Breadcrumbs items={crumbs} />
          <div className="mt-5 flex items-center gap-3">
            <CategoryIcon category={cluster.icon} />
            <span className="text-sm font-medium text-muted-foreground">
              {posts.length} {dict.hubs.count}
            </span>
          </div>
          <h1 className="mt-4 max-w-3xl text-3xl font-semibold text-primary sm:text-4xl">{t.title}</h1>
          <div className="mt-5 max-w-3xl space-y-3 text-[1.05rem] leading-relaxed text-foreground/85">
            {t.intro.split(/\n\s*\n/).map((p, i) => (
              <p key={i}>{p.trim()}</p>
            ))}
          </div>
        </Container>
      </section>

      <Container className="py-10">
        <h2 className="mb-6 text-2xl font-semibold text-primary">
          {dict.hubs.postsTitle}: {t.headTerm}
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((r) => (
            <RemedyCard key={r.slug} remedy={r} locale={locale} dict={dict} />
          ))}
        </div>

        {more.length > 0 && (
          <>
            <h2 className="mb-6 mt-14 text-2xl font-semibold text-primary">{dict.hubs.moreTitle}</h2>
            <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
              {more.map((r) => (
                <li key={r.slug}>
                  <Link href={`/${locale}/remedies/${r.slug}`} className="group inline-flex items-start gap-2 text-[1.02rem] hover:text-primary">
                    <ArrowRight className="mt-1 size-4 shrink-0 text-leaf transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    <span className="group-hover:underline">{r[locale].title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}

        <ShopPromo products={getPromotedProducts(`hub:${cluster.slug}`)} locale={locale} dict={dict} className="mt-14 max-w-2xl" />
        {cluster.slug === "immunity" && <ShilajitCallout locale={locale} className="mt-6 max-w-2xl" />}

        <nav aria-label={dict.remedies.popularTopics} className="mt-14">
          <h2 className="text-lg font-semibold text-primary">{dict.remedies.popularTopics}</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {activeClusters
              .filter((c) => c.slug !== cluster.slug)
              .map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${locale}/home-remedies/${c.slug}`}
                    className="inline-flex items-center rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium hover:border-primary/40 hover:text-primary"
                  >
                    {c[locale].headTerm}
                  </Link>
                </li>
              ))}
          </ul>
        </nav>

        <DisclaimerNote locale={locale} dict={dict} className="mt-12" />
      </Container>
    </>
  );
}
