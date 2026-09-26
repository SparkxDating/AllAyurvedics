import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { newsletterStrings } from "@/i18n/strings";
import { buildMetadata } from "@/lib/seo";
import { Container, PageHeader } from "@/components/page-bits";
import { NewsletterForm } from "@/components/forms/newsletter-form";

export async function generateMetadata({ params }: PageProps<"/[locale]/subscribe">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/subscribe", title: dict.home.newsletterTitle, description: dict.home.newsletterText });
}

export default async function SubscribePage({ params }: PageProps<"/[locale]/subscribe">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return (
    <>
      <PageHeader
        title={dict.home.newsletterTitle}
        intro={dict.home.newsletterText}
        breadcrumbs={[{ href: `/${locale}`, label: dict.common.breadcrumbHome }, { label: dict.footer.newsletter }]}
      />
      <Container className="max-w-xl py-12">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-8">
          <NewsletterForm locale={locale} strings={newsletterStrings(dict)} source="subscribe-page" withName />
        </div>
      </Container>
    </>
  );
}
