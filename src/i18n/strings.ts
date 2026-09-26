import type { Dictionary } from "./dictionaries";
import type { NewsletterStrings } from "@/components/forms/newsletter-form";

export function newsletterStrings(dict: Dictionary): NewsletterStrings {
  const f = dict.forms;
  return {
    email: f.email,
    name: f.name,
    namePlaceholder: f.namePlaceholder,
    emailPlaceholder: f.emailPlaceholder,
    subscribe: f.subscribe,
    subscribing: f.subscribing,
    subscribeSuccess: f.subscribeSuccess,
    subscribePending: f.subscribePending,
    invalidEmail: f.invalidEmail,
    genericError: f.genericError,
    tooManyRequests: f.tooManyRequests,
    consent: f.consent,
  };
}
