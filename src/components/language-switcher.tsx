"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Languages } from "lucide-react";
import { type Locale, localeLabels, locales, switchLocalePath } from "@/i18n/config";
import { cn } from "@/lib/utils";

/** Links to the same page in the other language(s). */
export function LanguageSwitcher({ locale, label, className }: { locale: Locale; label: string; className?: string }) {
  const pathname = usePathname() || `/${locale}`;
  return (
    <div
      className={cn("inline-flex items-center gap-1 rounded-full border border-border bg-card p-1 text-sm", className)}
      role="group"
      aria-label={label}
    >
      <Languages className="ml-1.5 size-4 text-muted-foreground" aria-hidden="true" />
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={switchLocalePath(pathname, l)}
            hrefLang={localeLabels[l].htmlLang}
            lang={localeLabels[l].htmlLang}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 font-medium transition-colors",
              active ? "bg-primary text-primary-foreground" : "text-foreground hover:bg-muted"
            )}
          >
            {localeLabels[l].native}
          </Link>
        );
      })}
    </div>
  );
}
