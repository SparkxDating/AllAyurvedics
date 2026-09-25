"use client";

import type { ReactNode } from "react";
import { CircleCheck, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

/** Hidden spam trap. Humans never see it; bots tend to fill every field. */
export function HoneypotField() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
      <label>
        Website
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1 text-sm text-destructive">
      {message}
    </p>
  );
}

export function SuccessMessage({ title, children, className }: { title: string; children?: ReactNode; className?: string }) {
  return (
    <div role="status" className={cn("flex gap-3 rounded-xl border border-leaf/30 bg-leaf-soft p-4 text-forest", className)}>
      <CircleCheck className="mt-0.5 size-5 shrink-0 text-leaf" aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        {children ? <div className="mt-1 text-sm text-forest/80">{children}</div> : null}
      </div>
    </div>
  );
}

export function ErrorMessage({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive">
      <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </div>
  );
}

export const nativeSelectClass =
  "h-11 w-full rounded-lg border border-input bg-card px-3 text-base outline-none transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30";
