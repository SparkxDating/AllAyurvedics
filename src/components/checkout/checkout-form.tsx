"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import Link from "next/link";
import QRCode from "qrcode";
import { Check, Copy, Mail, Send, ShieldCheck, Smartphone } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries";
import type { UpiConfig } from "@/config/site";
import { buildUpiUrl, makeOrderRef, MAX_ORDER_QTY, normaliseIndianMobile, PINCODE_PATTERN, UTR_PATTERN } from "@/lib/upi";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ErrorMessage, FieldError, HoneypotField, nativeSelectClass, SuccessMessage } from "@/components/forms/form-bits";
import { cn } from "@/lib/utils";
import { useUtmSource } from "@/lib/utm";
import { WhatsAppIcon } from "@/components/whatsapp-icon";
import { buildOrderWhatsappMessage, formatWhatsappDisplay, waLink, whatsappButtonClass } from "@/lib/whatsapp";

type Strings = Dictionary["checkout"];
type ProductSummary = {
  slug: string;
  name: string;
  size: string;
  price: number;
  mrp?: number;
  orderName: string;
  image?: { src: string; width: number; height: number; alt: string };
};

function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, k: string) => values[k] ?? "");
}

function rupees(amount: number, locale: string) {
  return `₹${amount.toLocaleString(locale === "hi" ? "hi-IN" : "en-IN", { maximumFractionDigits: 2 })}`;
}

/** QR code rendered as an inline SVG (synchronous, so it also renders on the server) */
function UpiQr({ value, label }: { value: string; label: string }) {
  const path = useMemo(() => {
    const qr = QRCode.create(value, { errorCorrectionLevel: "M" });
    const size = qr.modules.size;
    let d = "";
    for (let r = 0; r < size; r++) {
      for (let c = 0; c < size; c++) {
        if (qr.modules.get(r, c)) d += `M${c + 2},${r + 2}h1v1h-1z`;
      }
    }
    return { d, size: size + 4 };
  }, [value]);
  return (
    <svg
      viewBox={`0 0 ${path.size} ${path.size}`}
      role="img"
      aria-label={label}
      data-upi={value}
      className="h-auto w-full max-w-[260px]"
      shapeRendering="crispEdges"
    >
      <rect width={path.size} height={path.size} fill="#fff" />
      <path d={path.d} fill="#111" />
    </svg>
  );
}

/** One order reference per page load, generated in the browser (used by statically rendered landing pages). */
let clientOrderRef = "";
const noopSubscribe = () => () => {};
function getClientOrderRef() {
  if (!clientOrderRef) clientOrderRef = makeOrderRef();
  return clientOrderRef;
}

type FieldKey = "name" | "phone" | "email" | "address" | "city" | "state" | "pincode" | "quantity" | "utr";

export function CheckoutForm({
  locale,
  strings,
  orderRef: orderRefProp,
  upi,
  product,
  whatsapp,
  contactEmail,
  variant = "checkout",
  maxQty = MAX_ORDER_QTY,
}: {
  locale: string;
  strings: Strings;
  /** Server-generated reference (checkout page). Omit on static pages: a reference is then generated in the browser. */
  orderRef?: string;
  upi: UpiConfig;
  product: ProductSummary;
  whatsapp?: string;
  contactEmail?: string;
  /** "landing": compact single column (payment card + form) for ad landing pages */
  variant?: "checkout" | "landing";
  /** Largest selectable quantity (server allows up to MAX_ORDER_QTY) */
  maxQty?: number;
}) {
  const source = useUtmSource();
  const clientRef = useSyncExternalStore(noopSubscribe, getClientOrderRef, () => "");
  const orderRef = orderRefProp ?? clientRef;
  const rootRef = useRef<HTMLDivElement>(null);
  const [quantity, setQuantity] = useState(1);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({});
  const [phase, setPhase] = useState<"idle" | "submitting" | "error" | "done">("idle");
  const [formError, setFormError] = useState<string>();
  const [result, setResult] = useState<{ status: "sent" | "pending" | "failed"; phone: string; data: Record<string, string> }>();
  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const amount = product.price * quantity;
  const amountLabel = rupees(amount, locale);
  const upiUrl = buildUpiUrl({ upiId: upi.upiId, payeeName: upi.payeeName, amount, note: `${product.orderName} ${orderRef}`.trim() });

  const message = (key?: string) => {
    if (!key) return undefined;
    const map: Record<string, string> = {
      invalidPhone: strings.invalidPhone,
      invalidPincode: strings.invalidPincode,
      invalidUtr: strings.invalidUtr,
      invalidQty: strings.invalidQty,
      invalidEmail: strings.invalidEmail,
      tooShort: strings.tooShort,
    };
    return map[key] ?? strings.required;
  };

  function validate(data: Record<string, string>) {
    const e: Partial<Record<FieldKey, string>> = {};
    if ((data.name ?? "").trim().length < 2) e.name = data.name?.trim() ? "tooShort" : "required";
    if (!normaliseIndianMobile(data.phone ?? "")) e.phone = "invalidPhone";
    if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) e.email = "invalidEmail";
    if ((data.address ?? "").trim().length < 10) e.address = data.address?.trim() ? "tooShort" : "required";
    if ((data.city ?? "").trim().length < 2) e.city = "required";
    if ((data.state ?? "").trim().length < 2) e.state = "required";
    if (!PINCODE_PATTERN.test((data.pincode ?? "").trim())) e.pincode = "invalidPincode";
    if (!UTR_PATTERN.test((data.utr ?? "").replace(/\s/g, ""))) e.utr = "invalidUtr";
    if (!(quantity >= 1 && quantity <= Math.min(maxQty, MAX_ORDER_QTY))) e.quantity = "invalidQty";
    return e;
  }

  function finish(status: "sent" | "pending" | "failed", data: Record<string, string>) {
    setResult({ status, phone: normaliseIndianMobile(data.phone) ?? data.phone, data });
    setPhase("done");
    requestAnimationFrame(() => rootRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function onSubmit(form: HTMLFormElement) {
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    const clientErrors = validate(data);
    setErrors(clientErrors);
    if (Object.keys(clientErrors).length) {
      setPhase("error");
      setFormError(strings.fixErrors);
      const first = form.querySelector<HTMLElement>(`[name="${Object.keys(clientErrors)[0]}"]`);
      first?.focus();
      return;
    }
    setPhase("submitting");
    setFormError(undefined);
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "order",
          product: product.slug,
          orderRef,
          quantity,
          locale,
          source,
          startedAt: startedAt.current,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; status?: string; error?: string; errors?: Record<string, string> };
      if (res.ok && json.ok) {
        finish(json.status === "sent" ? "sent" : "pending", data);
        return;
      }
      if (json.errors) {
        setPhase("error");
        setErrors(json.errors as Partial<Record<FieldKey, string>>);
        setFormError(strings.fixErrors);
        return;
      }
      // Server could not store the order: the WhatsApp hand-off still works (message is built here from the form data)
      if (whatsapp) {
        finish("failed", data);
        return;
      }
      setPhase("error");
      setFormError(json.error === "not_available" ? strings.notAvailable : strings.genericError);
    } catch {
      if (whatsapp) {
        finish("failed", data);
        return;
      }
      setPhase("error");
      setFormError(strings.genericError);
    }
  }

  const help =
    whatsapp || contactEmail ? (
      <p className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground" data-testid="checkout-help">
        {whatsapp ? (
          <a
            href={waLink(whatsapp, `${product.orderName} – ${orderRef}`)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#166534] hover:underline"
          >
            <WhatsAppIcon className="size-4" />
            {fill(strings.helpLine, { number: formatWhatsappDisplay(whatsapp) })}
          </a>
        ) : (
          <span>{strings.help}</span>
        )}
        {contactEmail && (
          <a href={`mailto:${contactEmail}?subject=${encodeURIComponent(orderRef)}`} className="inline-flex items-center gap-1 font-medium text-primary hover:underline">
            <Mail className="size-4" aria-hidden="true" />
            {strings.emailUs}
          </a>
        )}
      </p>
    ) : null;

  if (phase === "done" && result) {
    const d = result.data;
    const waHref = whatsapp
      ? waLink(
          whatsapp,
          buildOrderWhatsappMessage(strings.waMessage, {
            orderRef,
            product: `${product.name}, ${product.size}`,
            quantity,
            total: amountLabel,
            utr: (d.utr ?? "").replace(/\s/g, ""),
            name: d.name ?? "",
            phone: result.phone,
            email: d.email,
            address: d.address ?? "",
            city: d.city ?? "",
            state: d.state ?? "",
            pincode: d.pincode ?? "",
            source,
          }),
        )
      : undefined;
    const needsWhatsapp = Boolean(waHref) && result.status !== "sent";
    return (
      <div ref={rootRef} className={cn("max-w-2xl scroll-mt-20 space-y-4", variant === "checkout" && "mt-8")} data-testid="order-success" data-status={result.status}>
        <SuccessMessage title={needsWhatsapp ? strings.successTitleWa : strings.successTitle}>
          {result.status === "failed" && <p className="mb-2">{strings.submitFailedNote}</p>}
          <p>{fill(strings.successText, { ref: orderRef, phone: result.phone })}</p>
          <p className="mt-2">
            {strings.successAmount}: <strong>{amountLabel}</strong> · {product.name} × {quantity}
          </p>
        </SuccessMessage>
        {waHref && (
          <div className="rounded-2xl border-2 border-[#15803d]/40 bg-[#f0fdf4] p-5">
            {needsWhatsapp && (
              <p className="font-semibold text-[#14532d]" data-testid="wa-important">
                {strings.successPending}
              </p>
            )}
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              data-testid="order-whatsapp"
              className={cn(whatsappButtonClass, "mt-4 h-14 w-full px-6 text-lg sm:w-auto")}
            >
              <WhatsAppIcon className="size-6" />
              {strings.sendWhatsapp}
            </a>
            <p className="mt-3 text-sm text-[#14532d]/80">{strings.attachHint}</p>
          </div>
        )}
        {!waHref && result.status !== "sent" && (
          <p className="text-sm text-muted-foreground">{strings.orderRefHint}</p>
        )}
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-sm text-muted-foreground">{strings.orderRef}</p>
          <p className="mt-1 font-mono text-2xl font-semibold tracking-wider text-primary" data-testid="order-ref">{orderRef}</p>
        </div>
        {help}
        <Link href={`/${locale}/products/${product.slug}`} className="inline-block text-sm font-medium text-primary hover:underline">
          ← {strings.backToProduct}
        </Link>
      </div>
    );
  }

  const field = (key: FieldKey) => ({
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `co-${key}-err` : `co-${key}-hint`,
  });

  if (variant === "landing") {
    return (
      <div ref={rootRef} className="scroll-mt-20 space-y-6">
        <section className="rounded-2xl border-2 border-primary/30 bg-card p-5" aria-labelledby="co-pay">
          <h2 id="co-pay" className="flex items-center gap-2 text-lg font-semibold text-primary">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</span>
            {strings.steps[0].title}
          </h2>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-4 rounded-xl bg-secondary/50 p-4">
            <div>
              <Label htmlFor="co-quantity" className="mb-1.5">
                {strings.quantity}
              </Label>
              <select
                id="co-quantity"
                name="quantity-select"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className={cn(nativeSelectClass, "w-28")}
              >
                {Array.from({ length: Math.min(maxQty, MAX_ORDER_QTY) }, (_, i) => i + 1).map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <FieldError id="co-quantity-err" message={message(errors.quantity)} />
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">{strings.total}</p>
              <p className="text-3xl font-semibold" data-testid="order-total">
                {amountLabel}
              </p>
            </div>
          </div>
          <p className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>{strings.orderRef}</span>
            <span className="font-mono text-sm font-semibold tracking-wider text-primary" data-testid="order-ref">{orderRef}</span>
          </p>
          {/* Prominent deep link on phones */}
          <a
            href={upiUrl}
            className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 lg:hidden"
            data-testid="upi-deeplink"
          >
            <Smartphone className="size-5" aria-hidden="true" />
            {fill(strings.payWithApp, { amount: amountLabel })}
          </a>
          <p className="mt-2 text-center text-xs text-muted-foreground lg:hidden">{strings.payWithAppHint}</p>

          <div className="mt-5 flex flex-col items-center">
            <p className="mb-3 text-sm font-medium">{fill(strings.scanQr, { amount: amountLabel })}</p>
            <div className="rounded-2xl border border-border bg-white p-3" data-testid="upi-qr">
              {orderRef ? (
                <UpiQr value={upiUrl} label={fill(strings.qrAlt, { amount: amountLabel, payee: upi.payeeName })} />
              ) : (
                <div className="aspect-square w-[260px] max-w-full animate-pulse rounded-lg bg-muted" aria-hidden="true" />
              )}
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="text-muted-foreground">{strings.upiId}</p>
                <p className="break-all font-mono text-base font-semibold" data-testid="upi-id">
                  {upi.upiId}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(upi.upiId);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    /* clipboard unavailable */
                  }
                }}
              >
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? strings.copied : strings.copy}
              </Button>
            </div>
            <div className="flex justify-between gap-2 px-1">
              <p className="text-muted-foreground">{strings.payee}</p>
              <p className="font-medium">{upi.payeeName}</p>
            </div>
          </div>

          {/* Secondary deep link on larger screens */}
          <a
            href={upiUrl}
            className="mt-4 hidden h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted lg:inline-flex"
          >
            <Smartphone className="size-4" aria-hidden="true" />
            {fill(strings.payWithApp, { amount: amountLabel })}
          </a>

          <p className="mt-4 flex gap-2 rounded-xl bg-leaf-soft/70 p-3 text-xs text-forest">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            {strings.pinNote}
          </p>
        </section>
      <section className="rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="co-form">
        <h2 id="co-form" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">2</span>
          {strings.formTitle}
        </h2>
        <form
          noValidate
          className="relative mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit(e.currentTarget);
          }}
        >
          <HoneypotField />
          <div>
            <Label htmlFor="co-name" className="mb-1.5">{strings.name} *</Label>
            <Input id="co-name" name="name" autoComplete="name" required className="h-11 bg-card" {...field("name")} />
            <FieldError id="co-name-err" message={message(errors.name)} />
          </div>
          <div>
            <Label htmlFor="co-phone" className="mb-1.5">{strings.phone} *</Label>
            <Input id="co-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={16} required placeholder="98XXXXXXXX" className="h-11 bg-card" {...field("phone")} />
            {errors.phone ? <FieldError id="co-phone-err" message={message(errors.phone)} /> : <p id="co-phone-hint" className="mt-1 text-xs text-muted-foreground">{strings.phoneHint}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="co-email" className="mb-1.5">{strings.email}</Label>
            <Input id="co-email" name="email" type="email" autoComplete="email" className="h-11 bg-card" {...field("email")} />
            <FieldError id="co-email-err" message={message(errors.email)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="co-address" className="mb-1.5">{strings.address} *</Label>
            <Textarea id="co-address" name="address" autoComplete="street-address" rows={3} required className="bg-card" {...field("address")} />
            {errors.address ? <FieldError id="co-address-err" message={message(errors.address)} /> : <p id="co-address-hint" className="mt-1 text-xs text-muted-foreground">{strings.addressHint}</p>}
          </div>
          <div>
            <Label htmlFor="co-city" className="mb-1.5">{strings.city} *</Label>
            <Input id="co-city" name="city" autoComplete="address-level2" required className="h-11 bg-card" {...field("city")} />
            <FieldError id="co-city-err" message={message(errors.city)} />
          </div>
          <div>
            <Label htmlFor="co-state" className="mb-1.5">{strings.state} *</Label>
            <Input id="co-state" name="state" autoComplete="address-level1" required className="h-11 bg-card" {...field("state")} />
            <FieldError id="co-state-err" message={message(errors.state)} />
          </div>
          <div>
            <Label htmlFor="co-pincode" className="mb-1.5">{strings.pincode} *</Label>
            <Input id="co-pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} required className="h-11 bg-card" {...field("pincode")} />
            <FieldError id="co-pincode-err" message={message(errors.pincode)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="co-utr" className="mb-1.5">{strings.utr} *</Label>
            <Input id="co-utr" name="utr" inputMode="numeric" autoComplete="off" maxLength={16} required placeholder="123456789012" className="h-11 bg-card font-mono" {...field("utr")} />
            {errors.utr && <FieldError id="co-utr-err" message={message(errors.utr)} />}
            <p id="co-utr-hint" className="mt-1 text-xs text-muted-foreground">{strings.utrHint}</p>
          </div>
          {formError && (
            <div className="sm:col-span-2">
              <ErrorMessage>{formError}</ErrorMessage>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <Button type="submit" disabled={phase === "submitting"} className="h-12 px-6 text-base">
              <Send className="size-4" aria-hidden="true" />
              {phase === "submitting" ? strings.submitting : strings.submit}
            </Button>
            <span className="text-sm text-muted-foreground">
              {strings.total}: <strong className="text-foreground">{amountLabel}</strong> ({quantity} × {rupees(product.price, locale)})
            </span>
          </div>
        </form>
      </section>
        {help}
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Summary + steps (on phones the payment card sits between them, so "Pay with UPI app" is near the top) */}
        <div className="contents">
          <section className="rounded-2xl border border-border bg-card p-5" aria-labelledby="co-summary">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-secondary/60 px-4 py-3">
              <span className="text-sm text-muted-foreground">{strings.orderRef}</span>
              <span className="font-mono text-lg font-semibold tracking-wider text-primary" data-testid="order-ref">
                {orderRef}
              </span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">{strings.orderRefHint}</p>
            <h2 id="co-summary" className="mt-5 text-lg font-semibold text-primary">
              {strings.summary}
            </h2>
            <div className="mt-3 flex gap-4">
              {product.image && (
                <Image
                  src={product.image.src}
                  alt={product.image.alt}
                  width={product.image.width}
                  height={product.image.height}
                  sizes="96px"
                  className="size-24 shrink-0 rounded-xl border border-border bg-white object-contain p-1.5"
                />
              )}
              <div className="min-w-0 flex-1">
                <p className="font-semibold leading-snug">{product.name}</p>
                <p className="text-sm text-muted-foreground">{product.size}</p>
                <p className="mt-1 text-sm">
                  {strings.unitPrice}: <strong>{rupees(product.price, locale)}</strong>
                  {product.mrp && product.mrp > product.price ? (
                    <span className="ml-2 text-muted-foreground">
                      MRP <s>{rupees(product.mrp, locale)}</s>
                    </span>
                  ) : null}
                </p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap items-end justify-between gap-4 border-t border-border pt-4">
              <div>
                <Label htmlFor="co-quantity" className="mb-1.5">
                  {strings.quantity}
                </Label>
                <select
                  id="co-quantity"
                  name="quantity-select"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className={cn(nativeSelectClass, "w-28")}
                >
                  {Array.from({ length: Math.min(maxQty, MAX_ORDER_QTY) }, (_, i) => i + 1).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <FieldError id="co-quantity-err" message={message(errors.quantity)} />
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{strings.total}</p>
                <p className="text-3xl font-semibold" data-testid="order-total">
                  {amountLabel}
                </p>
              </div>
            </div>
          </section>

          <section className="order-1 rounded-2xl border border-border bg-card p-5 lg:order-none lg:col-start-1 lg:row-start-2" aria-labelledby="co-steps">
            <h2 id="co-steps" className="text-lg font-semibold text-primary">
              {strings.stepsTitle}
            </h2>
            <ol className="mt-4 space-y-4">
              {strings.steps.map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="text-sm text-muted-foreground">{fill(s.text, { amount: amountLabel })}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Payment */}
        <section className="rounded-2xl border-2 border-primary/30 bg-card p-5 lg:col-start-2 lg:row-span-2 lg:row-start-1" aria-labelledby="co-pay">
          <h2 id="co-pay" className="flex items-center gap-2 text-lg font-semibold text-primary">
            <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">1</span>
            {strings.steps[0].title}
          </h2>

          {/* Prominent deep link on phones */}
          <a
            href={upiUrl}
            className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-base font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 lg:hidden"
            data-testid="upi-deeplink"
          >
            <Smartphone className="size-5" aria-hidden="true" />
            {fill(strings.payWithApp, { amount: amountLabel })}
          </a>
          <p className="mt-2 text-center text-xs text-muted-foreground lg:hidden">{strings.payWithAppHint}</p>

          <div className="mt-5 flex flex-col items-center">
            <p className="mb-3 text-sm font-medium">{fill(strings.scanQr, { amount: amountLabel })}</p>
            <div className="rounded-2xl border border-border bg-white p-3" data-testid="upi-qr">
              {orderRef ? (
                <UpiQr value={upiUrl} label={fill(strings.qrAlt, { amount: amountLabel, payee: upi.payeeName })} />
              ) : (
                <div className="aspect-square w-[260px] max-w-full animate-pulse rounded-lg bg-muted" aria-hidden="true" />
              )}
            </div>
          </div>

          <div className="mt-5 space-y-3 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-border px-4 py-3">
              <div className="min-w-0">
                <p className="text-muted-foreground">{strings.upiId}</p>
                <p className="break-all font-mono text-base font-semibold" data-testid="upi-id">
                  {upi.upiId}
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(upi.upiId);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  } catch {
                    /* clipboard unavailable */
                  }
                }}
              >
                {copied ? <Check className="size-4" aria-hidden="true" /> : <Copy className="size-4" aria-hidden="true" />}
                {copied ? strings.copied : strings.copy}
              </Button>
            </div>
            <div className="flex justify-between gap-2 px-1">
              <p className="text-muted-foreground">{strings.payee}</p>
              <p className="font-medium">{upi.payeeName}</p>
            </div>
          </div>

          {/* Secondary deep link on larger screens */}
          <a
            href={upiUrl}
            className="mt-4 hidden h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm font-medium hover:bg-muted lg:inline-flex"
          >
            <Smartphone className="size-4" aria-hidden="true" />
            {fill(strings.payWithApp, { amount: amountLabel })}
          </a>

          <p className="mt-4 flex gap-2 rounded-xl bg-leaf-soft/70 p-3 text-xs text-forest">
            <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
            {strings.pinNote}
          </p>
        </section>
      </div>

      {/* Order form */}
      <section className="max-w-3xl rounded-2xl border border-border bg-card p-5 sm:p-6" aria-labelledby="co-form">
        <h2 id="co-form" className="flex items-center gap-2 text-lg font-semibold text-primary">
          <span className="inline-flex size-7 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">2</span>
          {strings.formTitle}
        </h2>
        <form
          noValidate
          className="relative mt-5 grid gap-4 sm:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            void onSubmit(e.currentTarget);
          }}
        >
          <HoneypotField />
          <div>
            <Label htmlFor="co-name" className="mb-1.5">{strings.name} *</Label>
            <Input id="co-name" name="name" autoComplete="name" required className="h-11 bg-card" {...field("name")} />
            <FieldError id="co-name-err" message={message(errors.name)} />
          </div>
          <div>
            <Label htmlFor="co-phone" className="mb-1.5">{strings.phone} *</Label>
            <Input id="co-phone" name="phone" type="tel" inputMode="numeric" autoComplete="tel-national" maxLength={16} required placeholder="98XXXXXXXX" className="h-11 bg-card" {...field("phone")} />
            {errors.phone ? <FieldError id="co-phone-err" message={message(errors.phone)} /> : <p id="co-phone-hint" className="mt-1 text-xs text-muted-foreground">{strings.phoneHint}</p>}
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="co-email" className="mb-1.5">{strings.email}</Label>
            <Input id="co-email" name="email" type="email" autoComplete="email" className="h-11 bg-card" {...field("email")} />
            <FieldError id="co-email-err" message={message(errors.email)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="co-address" className="mb-1.5">{strings.address} *</Label>
            <Textarea id="co-address" name="address" autoComplete="street-address" rows={3} required className="bg-card" {...field("address")} />
            {errors.address ? <FieldError id="co-address-err" message={message(errors.address)} /> : <p id="co-address-hint" className="mt-1 text-xs text-muted-foreground">{strings.addressHint}</p>}
          </div>
          <div>
            <Label htmlFor="co-city" className="mb-1.5">{strings.city} *</Label>
            <Input id="co-city" name="city" autoComplete="address-level2" required className="h-11 bg-card" {...field("city")} />
            <FieldError id="co-city-err" message={message(errors.city)} />
          </div>
          <div>
            <Label htmlFor="co-state" className="mb-1.5">{strings.state} *</Label>
            <Input id="co-state" name="state" autoComplete="address-level1" required className="h-11 bg-card" {...field("state")} />
            <FieldError id="co-state-err" message={message(errors.state)} />
          </div>
          <div>
            <Label htmlFor="co-pincode" className="mb-1.5">{strings.pincode} *</Label>
            <Input id="co-pincode" name="pincode" inputMode="numeric" autoComplete="postal-code" maxLength={6} required className="h-11 bg-card" {...field("pincode")} />
            <FieldError id="co-pincode-err" message={message(errors.pincode)} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="co-utr" className="mb-1.5">{strings.utr} *</Label>
            <Input id="co-utr" name="utr" inputMode="numeric" autoComplete="off" maxLength={16} required placeholder="123456789012" className="h-11 bg-card font-mono" {...field("utr")} />
            {errors.utr && <FieldError id="co-utr-err" message={message(errors.utr)} />}
            <p id="co-utr-hint" className="mt-1 text-xs text-muted-foreground">{strings.utrHint}</p>
          </div>
          {formError && (
            <div className="sm:col-span-2">
              <ErrorMessage>{formError}</ErrorMessage>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
            <Button type="submit" disabled={phase === "submitting"} className="h-12 px-6 text-base">
              <Send className="size-4" aria-hidden="true" />
              {phase === "submitting" ? strings.submitting : strings.submit}
            </Button>
            <span className="text-sm text-muted-foreground">
              {strings.total}: <strong className="text-foreground">{amountLabel}</strong> ({quantity} × {rupees(product.price, locale)})
            </span>
          </div>
        </form>
      </section>
      {help}
    </div>
  );
}
