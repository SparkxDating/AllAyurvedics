import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CircleHelp } from "lucide-react";
import { locales, siteUrl } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { newsletterStrings } from "@/i18n/strings";
import { buildMetadata } from "@/lib/seo";
import { articles, getArticle, readingMinutes } from "@/content/articles";
import { extractHeadings, Markdown } from "@/lib/markdown";
import { ArticleCard } from "@/components/cards";
import { Breadcrumbs, Container, DisclaimerNote, JsonLd } from "@/components/page-bits";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { ShilajitBuyBox, ShilajitGuides, shilajitStrings } from "@/components/shilajit-bits";
import { ogAbsolute } from "@/config/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => articles.map((a) => ({ locale, slug: a.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/articles/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const t = article[locale];
  return buildMetadata({
    locale,
    path: `/articles/${slug}`,
    title: t.metaTitle ?? t.title,
    absoluteTitle: Boolean(t.metaTitle),
    description: t.metaDescription ?? t.excerpt,
    type: "article",
    publishedTime: article.date,
    image: article.image ? { url: article.image, width: 1200, height: 630, alt: t.title } : undefined,
  });
}

export default async function ArticlePage({ params }: PageProps<"/[locale]/articles/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const dict = getDictionary(locale);
  const t = article[locale];
  const headings = extractHeadings(t.body);
  const isShilajit = article.topic === "shilajit";
  const more = (
    isShilajit
      ? articles.filter((a) => a.slug !== slug && a.topic !== "shilajit")
      : [...articles.filter((a) => a.slug !== slug && a.topic !== "shilajit"), ...articles.filter((a) => a.topic === "shilajit")]
  ).slice(0, 3);
  const pageUrl = `${siteUrl}/${locale}/articles/${slug}`;
  const inLanguage = locale === "hi" ? "hi-IN" : "en-IN";
  const crumbs = [
    { href: `/${locale}`, label: dict.common.breadcrumbHome },
    isShilajit
      ? { href: `/${locale}/shilajit`, label: shilajitStrings(locale).guides }
      : { href: `/${locale}/articles`, label: dict.nav.articles },
    { label: t.title },
  ];
  const faqTitle = locale === "hi" ? "अक्सर पूछे जाने वाले सवाल" : "Frequently asked questions";
  const date = new Date(article.date).toLocaleDateString(locale === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Kolkata",
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: t.title,
          description: t.metaDescription ?? t.excerpt,
          datePublished: article.date,
          dateModified: article.date,
          inLanguage,
          ...(t.keyword ? { keywords: t.keyword } : {}),
          ...(article.image ? { image: ogAbsolute(article.image) } : {}),
          author: { "@type": "Organization", name: "All Ayurvedics", url: siteUrl },
          publisher: { "@type": "Organization", name: "All Ayurvedics", url: siteUrl },
          mainEntityOfPage: pageUrl,
        }}
      />
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
      {t.faq?.length ? (
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            inLanguage,
            mainEntity: t.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }}
        />
      ) : null}
      <article>
        <header className="leaf-pattern border-b border-border bg-secondary/50">
          <Container className="max-w-4xl py-10 sm:py-14">
            <Breadcrumbs items={crumbs} />
            <h1 className="mt-4 text-3xl font-semibold leading-tight text-primary sm:text-[2.6rem]">{t.title}</h1>
            <p className="mt-4 text-lg text-muted-foreground">{t.excerpt}</p>
            <p className="mt-4 text-sm text-muted-foreground">
              {dict.articles.published} {date} · {readingMinutes(t.body, locale)} {dict.articles.minRead}
            </p>
          </Container>
        </header>
        <Container className="grid max-w-6xl gap-10 py-10 lg:grid-cols-[1fr_260px]">
          <div className="min-w-0 max-w-3xl">
            <Markdown body={t.body} />
            {isShilajit && <ShilajitBuyBox locale={locale} dict={dict} className="mt-10" />}
            {t.faq?.length ? (
              <section aria-labelledby="sec-faq" className="mt-10 rounded-2xl border border-border bg-card p-6">
                <h2 id="sec-faq" className="flex items-center gap-2 text-xl font-semibold text-primary">
                  <CircleHelp className="size-5 text-leaf" aria-hidden="true" />
                  {faqTitle}
                </h2>
                <dl className="mt-4 divide-y divide-border">
                  {t.faq.map((f, i) => (
                    <div key={i} className="py-4 first:pt-0 last:pb-0">
                      <dt>
                        <h3 className="text-[1.05rem] font-semibold text-foreground">{f.q}</h3>
                      </dt>
                      <dd className="mt-2 text-[1.02rem] leading-relaxed text-foreground/85">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ) : null}
            {isShilajit && <ShilajitGuides locale={locale} exclude={slug} className="mt-10" />}
            <DisclaimerNote locale={locale} dict={dict} className="mt-12" />
            <div className="mt-10 rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold text-primary">{dict.home.newsletterTitle}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{dict.home.newsletterText}</p>
              <NewsletterForm locale={locale} strings={newsletterStrings(dict)} source={`article-${slug}`} className="mt-4" />
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border border-border bg-card p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-leaf">{locale === "hi" ? "इस लेख में" : "In this article"}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-foreground/80 hover:text-primary hover:underline">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ul>
              <hr className="my-4 border-border" />
              <Link href={`/${locale}/articles`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {dict.articles.backToAll}
              </Link>
            </div>
          </aside>
        </Container>
      </article>
      <Container className="pb-4">
        <h2 className="mb-6 text-2xl font-semibold text-primary">{dict.articles.related}</h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {more.map((a) => (
            <ArticleCard key={a.slug} article={a} locale={locale} dict={dict} />
          ))}
        </div>
      </Container>
    </>
  );
}
