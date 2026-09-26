"use client";

import { useEffect, useState, useSyncExternalStore, type ReactNode } from "react";
import { useUtmSource } from "@/lib/utm";
import { waLink } from "@/lib/whatsapp";

/** WhatsApp link whose prefilled text gets a "Source: …" line when the visit has utm_* params. */
export function UtmWhatsAppLink({
  number,
  message,
  sourceLabel,
  className,
  children,
  testId,
}: {
  number: string;
  message: string;
  sourceLabel: string;
  className?: string;
  children: ReactNode;
  testId?: string;
}) {
  const source = useUtmSource();
  const href = waLink(number, source ? `${message}\n${sourceLabel}: ${source}` : message);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className} data-testid={testId}>
      {children}
    </a>
  );
}

const noop = () => () => {};

/** Language switch that keeps the query string (utm_* params) of the current visit. */
export function KeepQueryLink({ href, className, children, lang }: { href: string; className?: string; children: ReactNode; lang?: string }) {
  const search = useSyncExternalStore(noop, () => window.location.search, () => "");
  const params = new URLSearchParams(search);
  params.delete("lang");
  const qs = params.toString();
  return (
    <a href={qs ? `${href}?${qs}` : href} className={className} lang={lang} hrefLang={lang} data-testid="lp-lang-toggle">
      {children}
    </a>
  );
}

/**
 * Mobile sticky bar (price + WhatsApp + Pay via UPI). Hidden while the #pay section (QR + order form)
 * is on screen and while any input is focused, so it never covers form fields or the pay button.
 */
export function StickyOrderBar({ targetId, children }: { targetId: string; children: ReactNode }) {
  const [payVisible, setPayVisible] = useState(false);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([entry]) => setPayVisible(entry.isIntersecting), { rootMargin: "0px 0px -80px 0px" });
    io.observe(el);
    const onFocusIn = (e: FocusEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && t.matches("input, textarea, select")) setTyping(true);
    };
    const onFocusOut = () => setTyping(false);
    document.addEventListener("focusin", onFocusIn);
    document.addEventListener("focusout", onFocusOut);
    return () => {
      io.disconnect();
      document.removeEventListener("focusin", onFocusIn);
      document.removeEventListener("focusout", onFocusOut);
    };
  }, [targetId]);

  const hidden = payVisible || typing;
  return (
    <div
      data-testid="lp-sticky-bar"
      data-hidden={hidden ? "true" : "false"}
      aria-hidden={hidden ? true : undefined}
      inert={hidden ? true : undefined}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 px-3 pt-2 shadow-[0_-6px_20px_rgba(0,0,0,0.08)] backdrop-blur transition-transform duration-200 pb-[max(0.5rem,env(safe-area-inset-bottom))] lg:hidden ${
        hidden ? "translate-y-full" : "translate-y-0"
      }`}
    >
      {children}
    </div>
  );
}
