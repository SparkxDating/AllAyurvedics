import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/i18n/config";
import { cn } from "@/lib/utils";
import emblem from "@/assets/logo-emblem.png";
import banner from "@/assets/logo-banner.png";

/** Round All Ayurvedics emblem (mortar & pestle with leaves). */
export function LogoMark({ className, preload = false, px = 48 }: { className?: string; preload?: boolean; px?: number }) {
  return (
    <Image
      src={emblem}
      alt=""
      aria-hidden="true"
      width={px}
      height={px}
      preload={preload}
      className={cn("size-11 shrink-0 select-none drop-shadow-sm sm:size-12", className)}
    />
  );
}

/** Horizontal "allayurvedics.in" banner logo. */
export function LogoBanner({ alt, className }: { alt: string; className?: string }) {
  return <Image src={banner} alt={alt} width={300} height={Math.round((300 * banner.height) / banner.width)} className={cn("h-auto w-full max-w-[300px] select-none", className)} />;
}

export function BrandLogo({ locale, name, className }: { locale: Locale; name: string; className?: string }) {
  return (
    <Link href={`/${locale}`} className={cn("flex shrink-0 items-center gap-2.5", className)} aria-label={name}>
      <LogoMark preload />
      <span className="font-heading text-lg font-semibold leading-none tracking-tight text-primary sm:text-xl">
        {name}
      </span>
    </Link>
  );
}
