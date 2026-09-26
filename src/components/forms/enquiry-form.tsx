"use client";

import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Dictionary } from "@/i18n/dictionaries";
import { ErrorMessage, FieldError, HoneypotField, nativeSelectClass, SuccessMessage } from "./form-bits";
import { useFormSubmit } from "./use-form-submit";

type FormStrings = Dictionary["forms"];

export function EnquiryForm({
  locale,
  strings,
  products,
  defaultProduct,
}: {
  locale: string;
  strings: FormStrings;
  products: { value: string; label: string }[];
  defaultProduct?: string;
}) {
  const { state, submit } = useFormSubmit("/api/enquiry");

  if (state.phase === "done") {
    return (
      <SuccessMessage title={strings.enquirySuccessTitle}>
        {state.status === "pending" ? strings.enquiryPendingText : strings.enquirySuccessText}
      </SuccessMessage>
    );
  }

  const errs = state.phase === "error" ? state.fieldErrors ?? {} : {};
  const msg = (key?: string) => {
    if (!key) return undefined;
    if (key === "invalidEmail") return strings.invalidEmail;
    if (key === "invalidPhone") return strings.invalidPhone;
    if (key === "tooShort") return strings.tooShort;
    return strings.required;
  };
  const subjectKeys = Object.keys(strings.subjects) as (keyof FormStrings["subjects"])[];

  return (
    <form
      className="relative grid gap-4 sm:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget, { locale });
      }}
    >
      <HoneypotField />
      <div>
        <Label htmlFor="enq-name" className="mb-1.5">{strings.name} *</Label>
        <Input id="enq-name" name="name" required minLength={2} autoComplete="name" placeholder={strings.namePlaceholder}
          aria-invalid={errs.name ? true : undefined} aria-describedby={errs.name ? "enq-name-err" : undefined}
          className="h-11 bg-card" />
        <FieldError id="enq-name-err" message={msg(errs.name)} />
      </div>
      <div>
        <Label htmlFor="enq-email" className="mb-1.5">{strings.email} *</Label>
        <Input id="enq-email" name="email" type="email" required autoComplete="email" placeholder={strings.emailPlaceholder}
          aria-invalid={errs.email ? true : undefined} aria-describedby={errs.email ? "enq-email-err" : undefined}
          className="h-11 bg-card" />
        <FieldError id="enq-email-err" message={msg(errs.email)} />
      </div>
      <div>
        <Label htmlFor="enq-phone" className="mb-1.5">{strings.phone}</Label>
        <Input id="enq-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91"
          aria-invalid={errs.phone ? true : undefined} className="h-11 bg-card" />
        <FieldError id="enq-phone-err" message={errs.phone ? strings.required : undefined} />
      </div>
      <div>
        <Label htmlFor="enq-subject" className="mb-1.5">{strings.subject}</Label>
        <select id="enq-subject" name="subject" defaultValue={defaultProduct ? "product" : "general"} className={nativeSelectClass}>
          {subjectKeys.map((k) => (
            <option key={k} value={k}>{strings.subjects[k]}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="enq-product" className="mb-1.5">{strings.product}</Label>
        <select id="enq-product" name="product" defaultValue={defaultProduct ?? ""} className={nativeSelectClass}>
          <option value="">{strings.noProduct}</option>
          {products.map((p) => (
            <option key={p.value} value={p.label}>{p.label}</option>
          ))}
        </select>
      </div>
      <div className="sm:col-span-2">
        <Label htmlFor="enq-message" className="mb-1.5">{strings.message} *</Label>
        <Textarea id="enq-message" name="message" required minLength={10} rows={6}
          aria-invalid={errs.message ? true : undefined} aria-describedby={errs.message ? "enq-message-err" : undefined}
          className="min-h-36 bg-card" />
        <FieldError id="enq-message-err" message={msg(errs.message)} />
      </div>
      <div className="space-y-3 sm:col-span-2">
        {state.phase === "error" && (
          <ErrorMessage>{state.fieldErrors ? strings.fixErrors : state.error === "too_many_requests" ? strings.tooManyRequests : strings.genericError}</ErrorMessage>
        )}
        <Button type="submit" disabled={state.phase === "submitting"} className="h-11 w-full px-6 text-base sm:w-auto">
          <Send className="size-4" aria-hidden="true" />
          {state.phase === "submitting" ? strings.sending : strings.send}
        </Button>
        <p className="text-xs text-muted-foreground">{strings.consent}</p>
      </div>
    </form>
  );
}
