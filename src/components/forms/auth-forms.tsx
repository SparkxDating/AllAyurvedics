"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Dictionary } from "@/i18n/dictionaries";
import { ErrorMessage, FieldError, HoneypotField, SuccessMessage } from "./form-bits";
import { useFormSubmit } from "./use-form-submit";

type Strings = { forms: Dictionary["forms"]; auth: Dictionary["auth"] };

/** Shown while customer accounts are not yet enabled: collects name + email for a waitlist. */
export function WaitlistForm({ locale, strings }: { locale: string; strings: Strings }) {
  const { state, submit } = useFormSubmit("/api/auth/register");
  if (state.phase === "done") return <SuccessMessage title={strings.auth.waitlistSuccess} />;
  const errs = state.phase === "error" ? state.fieldErrors ?? {} : {};
  return (
    <form className="relative space-y-4" onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget, { locale }); }}>
      <HoneypotField />
      <div>
        <Label htmlFor="wl-name" className="mb-1.5">{strings.forms.name}</Label>
        <Input id="wl-name" name="name" required minLength={2} autoComplete="name" className="h-11 bg-card" aria-invalid={errs.name ? true : undefined} />
        <FieldError id="wl-name-err" message={errs.name ? strings.forms.tooShort : undefined} />
      </div>
      <div>
        <Label htmlFor="wl-email" className="mb-1.5">{strings.forms.email}</Label>
        <Input id="wl-email" name="email" type="email" required autoComplete="email" placeholder={strings.forms.emailPlaceholder} className="h-11 bg-card" aria-invalid={errs.email ? true : undefined} />
        <FieldError id="wl-email-err" message={errs.email ? strings.forms.invalidEmail : undefined} />
      </div>
      {state.phase === "error" && !state.fieldErrors ? <ErrorMessage>{strings.forms.genericError}</ErrorMessage> : null}
      <Button type="submit" disabled={state.phase === "submitting"} className="h-11 w-full text-base">
        {state.phase === "submitting" ? strings.forms.sending : strings.auth.notifyMe}
      </Button>
    </form>
  );
}

export function RegisterForm({ locale, strings }: { locale: string; strings: Strings }) {
  const { state, submit } = useFormSubmit("/api/auth/register");
  if (state.phase === "done") {
    return (
      <SuccessMessage title={state.status === "created" ? strings.auth.registerSuccess : strings.auth.waitlistSuccess}>
        <Link href={`/${locale}/login`} className="font-medium underline">{strings.auth.loginCta}</Link>
      </SuccessMessage>
    );
  }
  const errs = state.phase === "error" ? state.fieldErrors ?? {} : {};
  return (
    <form
      className="relative space-y-4"
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const pw = (form.elements.namedItem("password") as HTMLInputElement).value;
        const confirm = form.elements.namedItem("confirm") as HTMLInputElement;
        if (pw !== confirm.value) {
          confirm.setCustomValidity(strings.auth.passwordMismatch);
          confirm.reportValidity();
          return;
        }
        submit(form, { locale });
      }}
    >
      <HoneypotField />
      <div>
        <Label htmlFor="rg-name" className="mb-1.5">{strings.forms.name}</Label>
        <Input id="rg-name" name="name" required minLength={2} autoComplete="name" className="h-11 bg-card" />
        <FieldError id="rg-name-err" message={errs.name ? strings.forms.tooShort : undefined} />
      </div>
      <div>
        <Label htmlFor="rg-email" className="mb-1.5">{strings.forms.email}</Label>
        <Input id="rg-email" name="email" type="email" required autoComplete="email" className="h-11 bg-card" />
        <FieldError id="rg-email-err" message={errs.email ? strings.forms.invalidEmail : undefined} />
      </div>
      <div>
        <Label htmlFor="rg-password" className="mb-1.5">{strings.forms.password}</Label>
        <Input id="rg-password" name="password" type="password" required minLength={8} autoComplete="new-password" className="h-11 bg-card" />
        <p className="mt-1 text-xs text-muted-foreground">{strings.auth.passwordHint}</p>
      </div>
      <div>
        <Label htmlFor="rg-confirm" className="mb-1.5">{strings.forms.confirmPassword}</Label>
        <Input id="rg-confirm" name="confirm" type="password" required minLength={8} autoComplete="new-password" className="h-11 bg-card"
          onInput={(e) => e.currentTarget.setCustomValidity("")} />
      </div>
      {state.phase === "error" && !state.fieldErrors ? (
        <ErrorMessage>{state.error === "email_taken" ? strings.auth.emailTaken : strings.forms.genericError}</ErrorMessage>
      ) : null}
      <Button type="submit" disabled={state.phase === "submitting"} className="h-11 w-full text-base">
        {state.phase === "submitting" ? strings.forms.sending : strings.auth.registerCta}
      </Button>
    </form>
  );
}

export function LoginForm({ locale, strings }: { locale: string; strings: Strings }) {
  const router = useRouter();
  const { state, submit } = useFormSubmit("/api/auth/login");
  const loggedIn = state.phase === "done" && state.status === "ok";
  useEffect(() => {
    if (loggedIn) {
      router.push(`/${locale}/account`);
      router.refresh();
    }
  }, [loggedIn, router, locale]);
  if (state.phase === "done") {
    return <SuccessMessage title={state.status === "ok" ? strings.auth.loginIntro : strings.auth.comingSoonLogin} />;
  }
  return (
    <form className="relative space-y-4" onSubmit={(e) => { e.preventDefault(); submit(e.currentTarget); }}>
      <HoneypotField />
      <div>
        <Label htmlFor="lg-email" className="mb-1.5">{strings.forms.email}</Label>
        <Input id="lg-email" name="email" type="email" required autoComplete="email" className="h-11 bg-card" />
      </div>
      <div>
        <Label htmlFor="lg-password" className="mb-1.5">{strings.forms.password}</Label>
        <Input id="lg-password" name="password" type="password" required autoComplete="current-password" className="h-11 bg-card" />
      </div>
      {state.phase === "error" ? (
        <ErrorMessage>{state.error === "invalid_credentials" ? strings.auth.loginError : strings.forms.genericError}</ErrorMessage>
      ) : null}
      <Button type="submit" disabled={state.phase === "submitting"} className="h-11 w-full text-base">
        {state.phase === "submitting" ? strings.forms.sending : strings.auth.loginCta}
      </Button>
    </form>
  );
}

export function LogoutButton({ label, locale }: { label: string; locale: string }) {
  const router = useRouter();
  return (
    <Button
      variant="outline"
      className="h-10"
      onClick={async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        router.push(`/${locale}`);
        router.refresh();
      }}
    >
      {label}
    </Button>
  );
}
