import Link from "next/link";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { BrandLogo } from "./brand-logo";
import { LanguageSwitcher } from "./language-switcher";
import { NavLinks } from "./nav-links";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const items = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/remedies`, label: dict.nav.remedies },
    { href: `/${locale}/articles`, label: dict.nav.articles },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/enquiry`, label: dict.nav.contact },
  ];
  const auth = {
    login: { href: `/${locale}/login`, label: dict.nav.login },
    register: { href: `/${locale}/register`, label: dict.nav.register },
  };
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/75">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <BrandLogo locale={locale} name={dict.brand.name} />
        <NavLinks items={items} className="hidden items-center gap-0.5 lg:flex" />
        <div className="flex items-center gap-2">
          <LanguageSwitcher locale={locale} label={dict.nav.language} className="hidden sm:inline-flex" />
          <Link href={auth.login.href} className={cn(buttonVariants({ variant: "ghost" }), "hidden h-9 px-3 text-sm lg:inline-flex")}>
            {auth.login.label}
          </Link>
          <Link href={auth.register.href} className={cn(buttonVariants(), "hidden h-9 px-4 text-sm lg:inline-flex")}>
            {auth.register.label}
          </Link>
          <MobileNav items={items} menuLabel={dict.nav.menu} title={dict.brand.name} auth={auth} />
        </div>
      </div>
      {/* Language switcher always visible on small screens */}
      <div className="flex justify-end border-t border-border/60 px-4 py-1.5 sm:hidden">
        <LanguageSwitcher locale={locale} label={dict.nav.language} className="text-xs" />
      </div>
    </header>
  );
}
