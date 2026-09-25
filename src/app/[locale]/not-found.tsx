"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";

const text = {
  en: { title: "Page not found", body: "The page you are looking for does not exist or has moved.", home: "Go to home page", remedies: "Browse remedies" },
  hi: { title: "पेज नहीं मिला", body: "आप जो पेज ढूँढ रहे हैं, वह मौजूद नहीं है या कहीं और चला गया है।", home: "होम पेज पर जाएँ", remedies: "नुस्खे देखें" },
};

export default function NotFound() {
  const pathname = usePathname() || "/en";
  const locale = pathname.startsWith("/hi") ? "hi" : "en";
  const t = text[locale];
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center">
      <span className="inline-flex size-16 items-center justify-center rounded-full bg-secondary text-primary">
        <Leaf className="size-8" aria-hidden="true" />
      </span>
      <h1 className="mt-6 text-3xl font-semibold text-primary">{t.title}</h1>
      <p className="mt-3 text-muted-foreground">{t.body}</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href={`/${locale}`} className="inline-flex h-11 items-center rounded-lg bg-primary px-5 font-medium text-primary-foreground hover:bg-primary/90">
          {t.home}
        </Link>
        <Link href={`/${locale}/remedies`} className="inline-flex h-11 items-center rounded-lg border border-border px-5 font-medium hover:bg-muted">
          {t.remedies}
        </Link>
      </div>
    </div>
  );
}
