"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export type NavItem = { href: string; label: string };

export function NavLinks({ items, className, itemClassName, onNavigate }: {
  items: NavItem[];
  className?: string;
  itemClassName?: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || "";
  return (
    <nav className={className}>
      {items.map((item) => {
        const isHome = item.href.split("/").filter(Boolean).length === 1;
        const active = isHome ? pathname === item.href : pathname.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "rounded-md px-3 py-2 text-[0.95rem] font-medium transition-colors hover:bg-muted hover:text-primary",
              active ? "text-primary underline decoration-turmeric decoration-2 underline-offset-8" : "text-foreground/80",
              itemClassName
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
