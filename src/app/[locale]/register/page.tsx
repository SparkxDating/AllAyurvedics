import Link from "next/link";
import { Clock } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { accountsEnabled } from "@/lib/server/config";
import { AuthShell } from "@/components/auth-shell";
import { RegisterForm, WaitlistForm } from "@/components/forms/auth-forms";

export async function generateMetadata({ params }: PageProps<"/[locale]/register">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/register", title: dict.auth.registerTitle, description: dict.auth.registerIntro });
}

export default async function RegisterPage({ params }: PageProps<"/[locale]/register">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const enabled = accountsEnabled();
  const strings = { forms: dict.forms, auth: dict.auth };
  return (
    <AuthShell
      title={dict.auth.registerTitle}
      intro={dict.auth.registerIntro}
      footer={
        <>
          {dict.auth.haveAccount}{" "}
          <Link href={`/${locale}/login`} className="font-semibold text-primary hover:underline">
            {dict.auth.loginCta}
          </Link>
        </>
      }
    >
      {enabled ? (
        <RegisterForm locale={locale} strings={strings} />
      ) : (
        <>
          <div className="mb-5 flex gap-3 rounded-xl border border-turmeric/40 bg-turmeric-soft/60 p-4 text-sm text-[#5a3f0a]">
            <Clock className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
            <div>
              <p className="font-semibold">{dict.auth.comingSoonTitle}</p>
              <p className="mt-1">{dict.auth.comingSoonText}</p>
            </div>
          </div>
          <WaitlistForm locale={locale} strings={strings} />
        </>
      )}
    </AuthShell>
  );
}
