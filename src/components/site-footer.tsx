import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LogoBanner } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";
import { NewsletterForm } from "./forms/newsletter-form";
import { newsletterStrings } from "@/i18n/strings";
import { contactEmail } from "@/content/pages";

export function SiteFooter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const l = (p: string) => `/${locale}${p}`;
  const year = 2026;
  const cols = [
    {
      title: dict.footer.explore,
      links: [
        { href: l("/remedies"), label: dict.nav.remedies },
        { href: l("/articles"), label: dict.nav.articles },
        { href: l("/products"), label: dict.nav.products },
        { href: l("/lp/7-day-morning-routine"), label: locale === "hi" ? "मुफ़्त गाइड" : "Free guide" },
      ],
    },
    {
      title: dict.footer.company,
      links: [
        { href: l("/about"), label: dict.nav.about },
        { href: l("/enquiry"), label: dict.nav.contact },
        { href: l("/register"), label: dict.nav.register },
        { href: l("/login"), label: dict.nav.login },
      ],
    },
    {
      title: dict.footer.legal,
      links: [
        { href: l("/privacy"), label: dict.footer.privacy },
        { href: l("/terms"), label: dict.footer.terms },
        { href: l("/disclaimer"), label: dict.footer.disclaimer },
      ],
    },
  ];

  return (
    <footer className="mt-20 bg-forest text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_2fr]">
        <div>
          <Link href={`/${locale}`} aria-label={dict.brand.name} className="inline-block rounded-2xl shadow-lg shadow-black/20 transition-opacity hover:opacity-95">
            <LogoBanner alt={dict.brand.name} className="max-w-[260px] sm:max-w-[300px]" />
          </Link>
          <p className="mt-4 max-w-sm text-sm text-primary-foreground/75">{dict.footer.about}</p>
          <p className="mt-3 text-sm text-primary-foreground/75">
            <a href={`mailto:${contactEmail}`} className="underline underline-offset-2 hover:text-turmeric">
              {contactEmail}
            </a>
          </p>
          <div className="mt-6">
            <h2 className="font-heading text-lg font-semibold">{dict.footer.newsletter}</h2>
            <p className="mt-1 text-sm text-primary-foreground/75">{dict.home.newsletterText}</p>
            <NewsletterForm locale={locale} strings={newsletterStrings(dict)} source="footer" tone="dark" className="mt-3" />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {cols.map((col) => (
            <div key={col.title}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-turmeric">{col.title}</h2>
              <ul className="mt-3 space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-primary-foreground/80 hover:text-primary-foreground hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="col-span-2 sm:col-span-3">
            <LanguageSwitcher locale={locale} label={dict.nav.language} className="border-white/15 bg-white/5 text-primary-foreground [&_a:not([aria-current])]:text-primary-foreground [&_a:not([aria-current]):hover]:bg-white/10" />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-primary-foreground/70 sm:px-6">
          <p className="max-w-4xl">{dict.footer.shortDisclaimer}</p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>
              © {year} {dict.brand.name}. {dict.footer.rights}
            </p>
            <p lang="en">
              Designed and built by{" "}
              <a
                href="https://www.mksanalytiq.in"
                target="_blank"
                rel="noopener"
                className="font-semibold text-primary-foreground underline decoration-turmeric/70 underline-offset-2 hover:text-turmeric"
              >
                MKSAnalytiq
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
