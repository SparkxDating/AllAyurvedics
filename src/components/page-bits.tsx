import Link from "next/link";
import { ChevronRight, Info } from "lucide-react";
import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { cn } from "@/lib/utils";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6", className)}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: { href?: string; label: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
            {item.href ? (
              <Link href={item.href} className="hover:text-primary hover:underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-foreground/80">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHeader({
  title,
  intro,
  breadcrumbs,
  children,
}: {
  title: string;
  intro?: string;
  breadcrumbs?: { href?: string; label: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="leaf-pattern border-b border-border bg-secondary/50">
      <Container className="py-10 sm:py-14">
        {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold text-primary sm:text-4xl">{title}</h1>
        {intro ? <p className="mt-3 max-w-2xl text-lg text-muted-foreground">{intro}</p> : null}
        {children}
      </Container>
    </section>
  );
}

export function SectionHeading({
  title,
  text,
  action,
}: {
  title: string;
  text?: string;
  action?: { href: string; label: string };
}) {
  return (
    <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h2 className="text-2xl font-semibold text-primary sm:text-3xl">{title}</h2>
        {text ? <p className="mt-2 max-w-xl text-muted-foreground">{text}</p> : null}
      </div>
      {action ? (
        <Link href={action.href} className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          {action.label}
          <ChevronRight className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export function DisclaimerNote({ locale, dict, className }: { locale: Locale; dict: Dictionary; className?: string }) {
  return (
    <aside
      className={cn("flex gap-3 rounded-2xl border border-turmeric/40 bg-turmeric-soft/60 p-4 text-sm text-[#5a3f0a]", className)}
      aria-label={dict.common.disclaimerTitle}
    >
      <Info className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        <p className="font-semibold">{dict.common.disclaimerTitle}</p>
        <p className="mt-1">{dict.common.disclaimerText}</p>
        <Link href={`/${locale}/disclaimer`} className="mt-2 inline-block font-medium underline underline-offset-2">
          {dict.common.readDisclaimer}
        </Link>
      </div>
    </aside>
  );
}

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
