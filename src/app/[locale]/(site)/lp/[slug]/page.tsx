import { notFound } from "next/navigation";
import { CalendarDays, CircleCheck, Sparkles } from "lucide-react";
import { locales } from "@/i18n/config";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { newsletterStrings } from "@/i18n/strings";
import { buildMetadata } from "@/lib/seo";
import { campaigns, getCampaign } from "@/content/campaigns";
import { Container, DisclaimerNote } from "@/components/page-bits";
import { HeroIllustration } from "@/components/illustrations";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) => campaigns.map((c) => ({ locale, slug: c.slug })));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/lp/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) return {};
  const c = campaign.content[locale];
  return buildMetadata({ locale, path: `/lp/${slug}`, title: c.metaTitle, description: c.metaDescription });
}

/** Reusable landing-page template: add a new entry in src/content/campaigns.ts to create another campaign. */
export default async function LandingPage({ params }: PageProps<"/[locale]/lp/[slug]">) {
  const locale = await resolveLocale(params);
  const { slug } = await params;
  const campaign = getCampaign(slug);
  if (!campaign) notFound();
  const dict = getDictionary(locale);
  const c = campaign.content[locale];

  const signup = (id: string) => (
    <div id={id} className="rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
      <h2 className="text-2xl font-semibold text-primary">{c.formTitle}</h2>
      <p className="mt-1 text-sm text-muted-foreground">{c.formNote}</p>
      <NewsletterForm
        locale={locale}
        strings={newsletterStrings(dict)}
        source={campaign.listTag}
        withName
        ctaLabel={c.cta}
        successText={c.successMessage}
        className="mt-5"
      />
    </div>
  );

  return (
    <>
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-turmeric-soft/70 via-background to-background">
        <div className="leaf-pattern absolute inset-0 opacity-50" aria-hidden="true" />
        <Container className="relative grid items-center gap-10 py-12 sm:py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
              <Sparkles className="size-4" aria-hidden="true" />
              {c.eyebrow}
            </p>
            <h1 className="mt-5 text-4xl font-semibold leading-tight text-forest sm:text-5xl">{c.title}</h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">{c.subtitle}</p>
            <HeroIllustration className="mt-6 hidden w-full max-w-xs lg:block" />
          </div>
          {signup("signup")}
        </Container>
      </section>

      <Container className="py-14">
        <h2 className="text-center text-2xl font-semibold text-primary sm:text-3xl">{c.benefitsTitle}</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {c.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-border bg-card p-6">
              <CircleCheck className="size-6 text-leaf" aria-hidden="true" />
              <h3 className="mt-3 text-lg font-semibold">{b.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{b.text}</p>
            </div>
          ))}
        </div>
      </Container>

      <section className="bg-secondary/60">
        <Container className="py-14">
          <h2 className="text-center text-2xl font-semibold text-primary sm:text-3xl">{c.outlineTitle}</h2>
          <ol className="mx-auto mt-8 grid max-w-4xl gap-4 sm:grid-cols-2">
            {c.outline.map((d) => (
              <li key={d.day} className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                <span className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-turmeric-soft px-3 text-sm font-semibold text-[#6b4a0c]">
                  <CalendarDays className="size-4" aria-hidden="true" />
                  {d.day}
                </span>
                <div>
                  <h3 className="font-semibold">{d.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <Container className="grid gap-10 py-14 lg:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold text-primary">{c.faqTitle}</h2>
          <div className="mt-5 space-y-3">
            {c.faq.map((f) => (
              <details key={f.q} className="group rounded-xl border border-border bg-card p-4 open:shadow-sm">
                <summary className="cursor-pointer list-none font-semibold marker:hidden">
                  <span className="mr-2 text-turmeric group-open:hidden">+</span>
                  <span className="mr-2 hidden text-turmeric group-open:inline">–</span>
                  {f.q}
                </summary>
                <p className="mt-2 text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
          <DisclaimerNote locale={locale} dict={dict} className="mt-8" />
        </div>
        {signup("signup-bottom")}
      </Container>
    </>
  );
}
