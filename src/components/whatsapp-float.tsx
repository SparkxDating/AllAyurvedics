"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/whatsapp-icon";

/** Small floating WhatsApp button, hidden on checkout pages so it never covers the pay button. */
export function WhatsAppFloat({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  if (!pathname || pathname.includes("/checkout/")) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      title={label}
      data-testid="whatsapp-float"
      className="fixed bottom-4 right-4 z-40 inline-flex size-12 items-center justify-center rounded-full bg-[#15803d] text-white shadow-lg shadow-black/25 transition-transform hover:scale-105 hover:bg-[#166534] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#15803d]/40 print:hidden sm:bottom-6 sm:right-6"
    >
      <WhatsAppIcon className="size-6" />
    </a>
  );
}
