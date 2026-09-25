import type { ReactNode } from "react";
import { LogoMark } from "./brand-logo";

export function AuthShell({ title, intro, children, footer }: { title: string; intro?: string; children: ReactNode; footer?: ReactNode }) {
  return (
    <div className="leaf-pattern flex justify-center bg-secondary/40 px-4 py-14 sm:py-20">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-6 shadow-xl shadow-primary/5 sm:p-8">
        <LogoMark className="size-11" />
        <h1 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">{title}</h1>
        {intro ? <p className="mt-2 text-muted-foreground">{intro}</p> : null}
        <div className="mt-6">{children}</div>
        {footer ? <div className="mt-6 border-t border-border pt-5 text-sm text-muted-foreground">{footer}</div> : null}
      </div>
    </div>
  );
}
