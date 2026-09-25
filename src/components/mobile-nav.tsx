"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { buttonVariants } from "@/components/ui/button";
import { NavLinks, type NavItem } from "./nav-links";
import { cn } from "@/lib/utils";

export function MobileNav({ items, menuLabel, title, auth }: {
  items: NavItem[];
  menuLabel: string;
  title: string;
  auth: { login: NavItem; register: NavItem };
}) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className={cn(buttonVariants({ variant: "outline", size: "icon-lg" }), "lg:hidden")}
        aria-label={menuLabel}
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-[85%] bg-background">
        <SheetHeader>
          <SheetTitle className="font-heading text-lg text-primary">{title}</SheetTitle>
        </SheetHeader>
        <NavLinks
          items={items}
          onNavigate={() => setOpen(false)}
          className="flex flex-col gap-1 px-4"
          itemClassName="text-lg py-3"
        />
        <div className="mt-4 flex flex-col gap-2 px-4">
          <Link href={auth.login.href} onClick={() => setOpen(false)} className={cn(buttonVariants({ variant: "outline" }), "h-11 text-base")}>
            {auth.login.label}
          </Link>
          <Link href={auth.register.href} onClick={() => setOpen(false)} className={cn(buttonVariants(), "h-11 text-base")}>
            {auth.register.label}
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
