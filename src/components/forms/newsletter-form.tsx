"use client";

import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage, FieldError, HoneypotField, SuccessMessage } from "./form-bits";
import { useFormSubmit } from "./use-form-submit";

export type NewsletterStrings = {
  email: string;
  name: string;
  namePlaceholder: string;
  emailPlaceholder: string;
  subscribe: string;
  subscribing: string;
  subscribeSuccess: string;
  subscribePending: string;
  invalidEmail: string;
  genericError: string;
  tooManyRequests: string;
  consent: string;
};

export function NewsletterForm({
  locale,
  strings,
  source = "website",
  withName = false,
  successText,
  ctaLabel,
  tone = "light",
  className,
}: {
  locale: string;
  strings: NewsletterStrings;
  source?: string;
  withName?: boolean;
  successText?: string;
  ctaLabel?: string;
  tone?: "light" | "dark";
  className?: string;
}) {
  const { state, submit } = useFormSubmit("/api/subscribe");
  const idBase = `nl-${source}`;

  if (state.phase === "done") {
    return (
      <SuccessMessage
        className={className}
        title={state.status === "pending" ? strings.subscribePending : successText ?? strings.subscribeSuccess}
      />
    );
  }

  const emailError = state.phase === "error" && state.fieldErrors?.email ? strings.invalidEmail : undefined;

  return (
    <form
      className={cn("relative space-y-3", className)}
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget, { locale, source });
      }}
      noValidate={false}
    >
      <HoneypotField />
      <div className={cn("flex flex-col gap-2", !withName && "sm:flex-row")}>
        {withName && (
          <div>
            <Label htmlFor={`${idBase}-name`} className={cn("mb-1.5", tone === "dark" && "text-primary-foreground")}>
              {strings.name}
            </Label>
            <Input id={`${idBase}-name`} name="name" autoComplete="name" placeholder={strings.namePlaceholder} className="h-11 bg-card text-base" />
          </div>
        )}
        <div className="flex-1">
          <Label htmlFor={`${idBase}-email`} className={cn(withName ? "mb-1.5" : "sr-only", tone === "dark" && "text-primary-foreground")}>
            {strings.email}
          </Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
            <Input
              id={`${idBase}-email`}
              name="email"
              type="email"
              required
              autoComplete="email"
              placeholder={strings.emailPlaceholder}
              aria-invalid={emailError ? true : undefined}
              aria-describedby={emailError ? `${idBase}-email-err` : undefined}
              className="h-11 bg-card pl-9 text-base"
            />
          </div>
          <FieldError id={`${idBase}-email-err`} message={emailError} />
        </div>
        <Button
          type="submit"
          disabled={state.phase === "submitting"}
          className={cn("h-11 px-5 text-base", tone === "dark" && "bg-turmeric text-forest hover:bg-turmeric/90", withName && "w-full")}
        >
          {state.phase === "submitting" ? strings.subscribing : ctaLabel ?? strings.subscribe}
        </Button>
      </div>
      {state.phase === "error" && !state.fieldErrors ? (
        <ErrorMessage>{state.error === "too_many_requests" ? strings.tooManyRequests : strings.genericError}</ErrorMessage>
      ) : null}
      <p className={cn("text-xs", tone === "dark" ? "text-primary-foreground/70" : "text-muted-foreground")}>{strings.consent}</p>
    </form>
  );
}
