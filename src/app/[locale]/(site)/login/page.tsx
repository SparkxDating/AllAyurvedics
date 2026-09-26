import Link from "next/link";
import { Clock } from "lucide-react";
import { resolveLocale } from "@/i18n/server";
import { getDictionary } from "@/i18n/dictionaries";
import { buildMetadata } from "@/lib/seo";
import { accountsEnabled } from "@/lib/server/config";
import { AuthShell } from "@/components/auth-shell";
import { LoginForm } from "@/components/forms/auth-forms";

export async function generateMetadata({ params }: PageProps<"/[locale]/login">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  return buildMetadata({ locale, path: "/login", title: dict.auth.loginTitle, description: dict.auth.loginIntro });
}

export default async function LoginPage({ params }: PageProps<"/[locale]/login">) {
  const locale = await resolveLocale(params);
  const dict = getDictionary(locale);
  const enabled = accountsEnabled();
  return (
    <AuthShell
      title={dict.auth.loginTitle}
      intro={enabled ? dict.auth.loginIntro : undefined}
      footer={
        <>
          {dict.auth.noAccount}{" "}
          <Link href={`/${locale}/register`} className="font-semibold text-primary hover:underline">
            {enabled ? dict.auth.registerCta : dict.auth.notifyMe}
          </Link>
        </>
      }
    >
      {enabled ? (
        <LoginForm locale={locale} strings={{ forms: dict.forms, auth: dict.auth }} />
      ) : (
        <div className="flex gap-3 rounded-xl border border-turmeric/40 bg-turmeric-soft/60 p-4 text-sm text-[#5a3f0a]">
          <Clock className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="font-semibold">{dict.auth.comingSoonTitle}</p>
            <p className="mt-1">{dict.auth.comingSoonLogin}</p>
          </div>
        </div>
      )}
    </AuthShell>
  );
}
