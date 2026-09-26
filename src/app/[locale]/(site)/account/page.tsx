import Link from "next/link";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { newsletterStrings } from "@/i18n/strings";
import { buildMetadata } from "@/lib/seo";
import { accountsEnabled } from "@/lib/server/config";
import { getSession } from "@/lib/server/auth";
import { AuthShell } from "@/components/auth-shell";
import { LogoutButton } from "@/components/forms/auth-forms";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function generateMetadata({ params }: PageProps<"/[locale]/account">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/account", title: dict.auth.accountTitle, description: dict.auth.registerIntro, noIndex: true });
}

export default async function AccountPage({ params }: PageProps<"/[locale]/account">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);

  if (!accountsEnabled()) {
    return (
      <AuthShell title={dict.auth.accountTitle} intro={dict.auth.accountComingSoon}>
        <NewsletterForm locale={locale} strings={newsletterStrings(dict)} source="account-page" />
      </AuthShell>
    );
  }

  const session = await getSession();
  if (!session) {
    return (
      <AuthShell title={dict.auth.accountTitle} intro={dict.auth.accountSignedOut}>
        <div className="flex gap-3">
          <Link href={`/${locale}/login`} className={cn(buttonVariants(), "h-10 px-4")}>{dict.auth.loginCta}</Link>
          <Link href={`/${locale}/register`} className={cn(buttonVariants({ variant: "outline" }), "h-10 px-4")}>{dict.auth.registerCta}</Link>
        </div>
      </AuthShell>
    );
  }

  return (
    <AuthShell title={`${dict.auth.accountTitle}`} intro={`${dict.auth.signedInAs} ${session.name} (${session.email})`}>
      <ul className="space-y-2 text-sm">
        {dict.auth.accountFeatures.map((f) => (
          <li key={f} className="rounded-lg border border-border bg-background px-3 py-2">{f}</li>
        ))}
      </ul>
      <div className="mt-6">
        <LogoutButton label={dict.auth.logout} locale={locale} />
      </div>
    </AuthShell>
  );
}
