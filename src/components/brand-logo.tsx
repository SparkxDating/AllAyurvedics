import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-9 shrink-0", className)}>
      <circle cx="32" cy="32" r="30" fill="#2f5d3a" />
      <path d="M32 52c0-15 6-26 17-32-2 15-8 26-17 32z" fill="#e0a526" />
      <path d="M32 52c0-13-5-22-15-28 1 13 6 22 15 28z" fill="#a9c79a" />
      <circle cx="32" cy="18" r="3" fill="#f7e7bd" />
    </svg>
  );
}

export function BrandLogo({ locale, name, className }: { locale: Locale; name: string; className?: string }) {
  return (
    <Link href={`/${locale}`} className={cn("flex items-center gap-2.5", className)} aria-label={name}>
      <LogoMark />
      <span className="font-heading text-lg font-semibold leading-none tracking-tight text-primary sm:text-xl">
        {name}
      </span>
    </Link>
  );
}
