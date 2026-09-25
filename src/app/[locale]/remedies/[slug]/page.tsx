import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, CookingPot, HandHeart, ShieldAlert, ShoppingBasket, Stethoscope } from "lucide-react";
import { locales, siteUrl } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { getRelatedRemedies, getRemedy, remedies } from "@/content/remedies";
import { RemedyCard } from "@/components/cards";
import { CategoryIcon } from "@/components/illustrations";
import { Breadcrumbs, Container, DisclaimerNote, JsonLd } from "@/components/page-bits";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => remedies.map((r) => ({ locale, slug: r.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/remedies/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const remedy = getRemedy(slug);
  if (!remedy) return {};
  const t = remedy[locale];
  return buildMetadata({ locale, path: `/remedies/${slug}`, title: t.title, description: t.summary, type: "article" });
}

export default async function RemedyPage({ params }: PageProps<"/[locale]/remedies/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const remedy = getRemedy(slug);
  if (!remedy) notFound();
  const dict = getDictionary(locale);
  const t = remedy[locale];
  const related = getRelatedRemedies(remedy, 3);

  const sections = [
    { key: "ingredients", title: dict.remedies.ingredients, icon: ShoppingBasket, items: t.ingredients, ordered: false },
    { key: "preparation", title: dict.remedies.preparation, icon: CookingPot, items: t.preparation, ordered: true },
    { key: "usage", title: dict.remedies.usage, icon: HandHeart, items: t.usage, ordered: false },
  ] as const;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t.title,
          description: t.summary,
          inLanguage: locale === "hi" ? "hi-IN" : "en-IN",
          totalTime: `PT${remedy.time}M`,
          supply: t.ingredients.map((i) => ({ "@type": "HowToSupply", name: i })),
          step: t.preparation.map((s, i) => ({ "@type": "HowToStep", position: i + 1, text: s })),
          url: `${siteUrl}/${locale}/remedies/${remedy.slug}`,
        }}
      />
      <article>
        <header className="leaf-pattern border-b border-border bg-secondary/50">
          <Container className="py-10 sm:py-12">
            <Breadcrumbs
              items={[
                { href: `/${locale}`, label: dict.common.breadcrumbHome },
                { href: `/${locale}/remedies`, label: dict.nav.remedies },
                { label: t.title },
              ]}
            />
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Link
                href={`/${locale}/remedies?category=${remedy.category}`}
                className="inline-flex items-center gap-2 rounded-full border border-border bg-card py-1 pl-1 pr-3 text-sm font-medium hover:text-primary"
              >
                <CategoryIcon category={remedy.category} className="size-7 [&_svg]:size-4" />
                {dict.categories[remedy.category]}
              </Link>
              <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="size-4" aria-hidden="true" />
                {remedy.time} {locale === "hi" ? "मिनट" : "min"}
              </span>
            </div>
            <h1 className="mt-4 max-w-3xl text-3xl font-semibold text-primary sm:text-4xl">{t.title}</h1>
            <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{t.summary}</p>
          </Container>
        </header>

        <Container className="grid gap-8 py-10 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            {remedy.doctorNote && (
              <div role="note" className="flex gap-3 rounded-2xl border border-clay/40 bg-clay-soft p-5 text-[#6e2f16]">
                <Stethoscope className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
                <p className="font-medium">{dict.remedies.doctorNote}</p>
              </div>
            )}
            {sections.map((s) => {
              const Icon = s.icon;
              const List = s.ordered ? "ol" : "ul";
              return (
                <section key={s.key} aria-labelledby={`sec-${s.key}`} className="rounded-2xl border border-border bg-card p-6">
                  <h2 id={`sec-${s.key}`} className="flex items-center gap-2 text-xl font-semibold text-primary">
                    <Icon className="size-5 text-leaf" aria-hidden="true" />
                    {s.title}
                  </h2>
                  <List className="mt-4 space-y-3">
                    {s.items.map((item, i) => (
                      <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed">
                        <span
                          className={
                            s.ordered
                              ? "mt-0.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
                              : "mt-2.5 size-2 shrink-0 rounded-full bg-turmeric"
                          }
                          aria-hidden="true"
                        >
                          {s.ordered ? i + 1 : null}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </List>
                </section>
              );
            })}
            <section aria-labelledby="sec-precautions" className="rounded-2xl border border-destructive/25 bg-destructive/[0.04] p-6">
              <h2 id="sec-precautions" className="flex items-center gap-2 text-xl font-semibold text-destructive">
                <ShieldAlert className="size-5" aria-hidden="true" />
                {dict.remedies.precautions}
              </h2>
              <ul className="mt-4 space-y-3">
                {t.precautions.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[1.02rem] leading-relaxed">
                    <span className="mt-2.5 size-2 shrink-0 rounded-full bg-destructive/70" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
            <DisclaimerNote locale={locale} dict={dict} />
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
              <h2 className="text-lg font-semibold text-primary">{dict.home.enquiryTitle}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{dict.home.enquiryText}</p>
              <Link
                href={`/${locale}/enquiry`}
                className="mt-4 inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {dict.home.enquiryCta}
              </Link>
              <hr className="my-5 border-border" />
              <Link href={`/${locale}/remedies`} className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                <ArrowLeft className="size-4" aria-hidden="true" />
                {dict.remedies.backToAll}
              </Link>
            </div>
          </aside>
        </Container>
      </article>

      {related.length > 0 && (
        <Container className="pb-6">
          <h2 className="mb-6 text-2xl font-semibold text-primary">{dict.remedies.related}</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <RemedyCard key={r.slug} remedy={r} locale={locale} dict={dict} />
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
