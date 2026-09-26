# All Ayurvedics – Setup guide

The site runs fine with **no environment variables at all**. Every form then shows a
friendly "received / coming soon" state and nothing is stored or emailed. To turn on
each feature, add the variables below in **Vercel → Project `allayurvedics` → Settings →
Environment Variables** (Production + Preview), then **redeploy**.

## 1. Basics (recommended right away)

| Variable | Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://allayurvedics.in` | Canonical URLs, hreflang, sitemap, robots, structured data, Open Graph. Set this in Vercel Production. If it is unset, production builds use `https://allayurvedics.in` and `next dev` uses `http://localhost:3000`. There is no `DOMAIN_LIVE` flag. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | `AbC123…` | Google Search Console HTML-tag verification code (see 7d). Adds `<meta name="google-site-verification">` to every page. |
| `NEXT_PUBLIC_CONTACT_EMAIL` | `hello@allayurvedics.in` | Email shown on About/Privacy/Terms/footer. The default is a placeholder – change it to a real inbox. |

## 2. Store enquiries & subscribers (database)

| Variable | Service |
|---|---|
| `DATABASE_URL` | Any Postgres connection string. Written for **Neon** (`@neondatabase/serverless`), e.g. created through Vercel Marketplace → Neon (free tier) or neon.tech directly. Supabase's Postgres connection string also works. |

Tables `enquiries`, `subscribers` and `users` are **created automatically** on first use.
Without it: enquiry/subscribe forms still succeed for the visitor, but the data is only
emailed (if email is configured) or discarded.

## 3. Email notifications (transactional)

Pick **one** provider:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` **or** `BREVO_API_KEY` | API key from resend.com or brevo.com (both have free tiers). |
| `EMAIL_FROM` | Sender, e.g. `All Ayurvedics <hello@allayurvedics.in>`. The domain must be **verified** with the provider (add the DNS records they give you for allayurvedics.in). |
| `ENQUIRY_TO_EMAIL` | Your inbox that receives each new enquiry (reply-to is set to the customer). |

With this set: each enquiry is emailed to you, and new newsletter subscribers get a
bilingual welcome email.

## 4. Email marketing list (newsletter)

| Option | Variables |
|---|---|
| Brevo (recommended for campaigns / automation) | `BREVO_API_KEY` + `BREVO_LIST_ID` (numeric list ID from Brevo → Contacts → Lists) |
| Resend | `RESEND_API_KEY` (+ optional `RESEND_SEGMENT_ID` to put contacts in a segment) |

Subscribers from the footer, home page and landing pages are pushed to the list with
their language (`en`/`hi`) and source (e.g. `lp:7-day-morning-routine`), so you can
send Hindi and English campaigns separately.

## 5. Customer registration / login / account

Accounts stay in "coming soon / join the waitlist" mode until **all three** are set:

| Variable | Notes |
|---|---|
| `DATABASE_URL` | Same database as above. |
| `AUTH_SECRET` | Random string, **32+ characters** (e.g. `openssl rand -base64 48`). |
| `ACCOUNTS_ENABLED` | `true` |

This enables the built-in minimal auth (scrypt password hashes + signed HttpOnly
cookie). Before collecting real customer data you may prefer a managed provider
(Clerk, Supabase Auth, Auth.js) – swap it in behind `src/lib/server/auth.ts` and the
`/api/auth/*` routes. While accounts are off, registrations are saved as a waitlist
(when a database is configured).

## 6. Content

- **Remedies**: `src/content/remedies-a.ts`, `remedies-b.ts`, `remedies-c.ts` (one object per remedy, `en` + `hi`).
- **Articles**: `src/content/articles-1.ts` … `articles-4.ts` (markdown-style body in `en` + `hi`).
- **Products**: `src/content/products.ts`. The live catalogue currently has one real product,
  *Himalayan Shilajit Resin (Adamya Herbals)* (`/en/products/himalayan-shilajit-resin-10g`).
  The 6 old placeholder items are kept in the file with `hidden: true`: they are not listed,
  have no page and are not in the sitemap. Delete them whenever you like.
  - Price/MRP: set `price` and `mrp` (whole rupees). The page shows the MRP struck through and
    the discount (for example 38% off) automatically.
  - Photos and video go in `public/products/<product>/` and are referenced in `media`.
    The first image is the main image. `media.ogImage` (1200×630) is used for social sharing.
  - Other product fields you can add: `relatedRemedies` (3 remedy slugs linked from the product) and
    `promoteOn` (remedy slugs or `hub:<cluster>` that show a small "From our shop" box).
- **Landing pages**: add an entry to `src/content/campaigns.ts`. It becomes `/en/lp/<slug>` and `/hi/lp/<slug>`.
- **Legal pages** (About, Privacy, Terms, Medical disclaimer): `src/content/pages.ts` – please have them reviewed for your business.

## 7. Online payment ("Buy now" button)

Every product page keeps the **Enquire about this product** button, which opens the enquiry
form with the product already selected. A **Buy now – ₹price** button appears when either of
these is set up, checked in this order:

1. a **hosted payment link** for the product (7a), which opens the provider's page, or
2. a **UPI ID** (7b), which opens our own checkout page at `/en|hi/checkout/<slug>` with a UPI QR code.

If neither is set, the page shows "Online payment coming soon — please send an enquiry to order",
the enquiry button stays the main action, and the checkout page returns 404.

### 7a. Payment link (takes priority over UPI)

There is no payment SDK in the code. You create a payment link in your payment provider's
dashboard and paste its URL in one of two places:

1. **Per product in code**: in `src/content/products.ts`, set
   `paymentLink: "https://rzp.io/rzp/xxxxxx"` on the product.
2. **Or as an environment variable** in Vercel (no code change). The variable name is
   `PAYMENT_LINK_` followed by the product slug in upper snake case. For the shilajit:

   | Variable | Example |
   |---|---|
   | `PAYMENT_LINK_HIMALAYAN_SHILAJIT_RESIN_10G` | `https://rzp.io/rzp/xxxxxx` or `https://imjo.in/xxxxxx` |

   Pages are pre-rendered, so **redeploy** after adding or changing the variable.

How to get a link:
- **Razorpay** → Payment Links (or Payment Pages) → create a link for ₹499 with the product name.
  Enable "collect customer address/phone" if you need it for delivery.
- **Instamojo** → Payment Links → create a link for ₹499.
- Cashfree and PayU payment links also work. The URL must start with `https://`.

### 7b. UPI checkout (QR code + order form)

**Where to set the UPI ID.** Use either place:

1. **In code**: open `src/config/site.ts` and fill in:
   ```ts
   export const siteConfig = {
     upiId: "yourname@okhdfcbank",   // your UPI ID / VPA
     upiPayeeName: "All Ayurvedics", // the name customers see in their UPI app
     whatsappNumber: "",             // optional, e.g. "919876543210"
   };
   ```
2. **Or in Vercel** → Project → Settings → Environment Variables (no code change):

   | Variable | Example |
   |---|---|
   | `NEXT_PUBLIC_UPI_ID` | `yourname@okhdfcbank` |
   | `NEXT_PUBLIC_UPI_PAYEE_NAME` | `All Ayurvedics` |
   | `NEXT_PUBLIC_WHATSAPP_NUMBER` (optional) | `919876543210` |

   Then **redeploy**, because pages are pre-rendered and `NEXT_PUBLIC_` values are built in.
   Environment variables override the defaults in `src/config/site.ts`. A per-product `upiId` still wins.

If the payee name is empty, it falls back to "All Ayurvedics". For best results, use the exact
name registered on the UPI ID; some apps show a warning when the names differ.

**Per-product override (optional).** In `src/content/products.ts`, a product can set its own
`upiId` / `upiPayeeName`. `orderName` is the short name used in the UPI payment note
(max ~50 characters together with the order reference).

**What the customer sees on the checkout page:**
- the product, quantity (1–10) and total;
- a UPI QR code for `upi://pay?pa=<id>&pn=<name>&am=<total>&cu=INR&tn=<product + order ref>`;
- a "Pay with UPI app" button (on mobile it opens GPay, PhonePe, Paytm, BHIM and similar apps);
- the UPI ID with a copy button;
- an order form: name, mobile, email (optional), address, city, state, pincode, quantity, and
  the 12-digit UPI transaction ID (UTR).

Each visit gets an order reference like `AA-7KQ2MX`. It is shown to the customer and included in
the payment note, so you can match the payment in your bank or UPI app.

**Orders currently reach you on WhatsApp.** After submitting the form, the customer sees a green
**Send order on WhatsApp** button. It opens a chat with `siteConfig.whatsappNumber` (currently
+91 95608 14623) with a prefilled message: order reference, product, quantity, total, UTR, name,
phone, email (if given) and the full address with pincode. The customer is asked to attach the
payment screenshot. The message is built in the browser from the form data, so the button works
even if the server submit fails. The same number is used for the "WhatsApp to order / enquire"
button on product pages, the checkout help line, the footer, the contact page and the small
floating button (hidden on checkout pages). Clear `whatsappNumber` to remove all of them.

**Orders also go through the enquiry backend.** They are submitted like enquiries, with the
subject/type `order` and all the fields (including UTR, quantity and total). This means orders
are **only stored and emailed once the forms backend is configured**: `DATABASE_URL` (section 2)
plus an email provider (section 3: `RESEND_API_KEY` or `BREVO_API_KEY`, `EMAIL_FROM` and
`ENQUIRY_TO_EMAIL`). Until then, the customer still sees their order reference with a note to
contact you, but **the order is not saved anywhere**. Configure the backend before you publish
the UPI ID.

**Payments are not verified automatically.** Before you dispatch an order, check your bank or
UPI app for a credit of the right amount with the matching UTR and order reference. The
customer is told that the order is confirmed after payment verification.

A help line (WhatsApp and/or email) appears on the checkout page only when
`whatsappNumber` / `NEXT_PUBLIC_WHATSAPP_NUMBER` or `NEXT_PUBLIC_CONTACT_EMAIL` is set.
The checkout pages are `noindex`, disallowed in robots.txt, and not in the sitemap.

## 7c. Ad landing page: Himalayan Shilajit (Instagram / Facebook reels)

Share this link in reels, bio and ads: **https://allayurvedics.vercel.app/shilajit**
(later https://allayurvedics.in/shilajit once the domain is live).

| Link | Shows |
|---|---|
| `/shilajit` | Hindi landing page (default). Served directly, with no redirect. |
| `/shilajit?lang=en` or `/shilajit/en` | English landing page |
| `/hi/lp/shilajit`, `/en/lp/shilajit` | Full URLs (canonical, in the sitemap) |

**Track which reel sold:** add UTM parameters, e.g.
`https://allayurvedics.vercel.app/shilajit?utm_source=instagram&utm_campaign=reel_01`.
They are added as a "Source" line to the WhatsApp messages (hero button, sticky bar, contact line and
the order form's "Send order on WhatsApp") and to the order submitted to the forms backend. They are also
remembered for the rest of the browser tab.

- Copy (EN/HI): `src/content/landing/shilajit.ts`. How-to-use, precautions and FAQs come from the product in
  `src/content/products.ts`.
- Page: `src/app/[locale]/(landing)/lp/shilajit/page.tsx`. It has no site header or footer; the regular pages
  use `src/app/[locale]/(site)/layout.tsx`.
- Payment and order form: the same `CheckoutForm` as `/checkout` (`variant="landing"`, quantity 1–5).
- Share image: `public/lp/shilajit-og.jpg` (1200×630).

**Share previews and `ogBaseUrl`.** Open Graph/Twitter images (and `og:url` on the landing page) use
`ogBaseUrl` from `src/config/site.ts`, which follows the site URL (see 7d). Set `NEXT_PUBLIC_OG_BASE_URL` only
if previews must come from a different host.

## 7d. Site URL switch, Google indexing and Search Console

### Canonical domain

Production canonicals, hreflang, the sitemap, `robots.txt` and structured data use `https://allayurvedics.in` unless `NEXT_PUBLIC_SITE_URL` is set. Set that variable to `https://allayurvedics.in` in Vercel Production so the value is explicit. Preview deployments may set their own `NEXT_PUBLIC_SITE_URL` or leave it unset (unset production builds still canonicalise to `.in`, which keeps a preview host out of the index). `next dev` uses `http://localhost:3000` when the variable is unset.

There is no `DOMAIN_LIVE` switch in code. If the apex domain is temporarily not serving the site, set `NEXT_PUBLIC_SITE_URL` to the host that does, redeploy, and remove that override once `https://allayurvedics.in` answers.

When the domain is attached in Vercel:

1. Vercel → Project → Settings → **Domains**: add `allayurvedics.in` and `www.allayurvedics.in` and create the DNS records Vercel shows.
2. Confirm `NEXT_PUBLIC_SITE_URL=https://allayurvedics.in` and redeploy.
3. Redirect `allayurvedics.vercel.app` to `https://allayurvedics.in` (308) in Vercel → Settings → Domains. Do that only after the apex domain actually opens the site, otherwise the redirect would hide the deployment.
4. In Search Console, add a property for `allayurvedics.in`, verify it, submit `https://allayurvedics.in/sitemap.xml`, and use Change of address from the old host if one was verified.

Account pages are `noindex` on purpose. Checkout is `noindex, nofollow` and disallowed in `robots.txt`. Those are not accidental.

See `docs/phase-1-security.md` for rate limits, headers, sessions and the Phase 2 schema notes.

### Google Search Console (do this now; free, needs your Google account)

A search for `site:allayurvedics.vercel.app` currently shows nothing, which is normal for a new site. To get
indexed quickly:

A. **Add the property.** Go to https://search.google.com/search-console → Add property → **URL prefix**
   → `https://allayurvedics.vercel.app/`.

B. **Verify with the HTML tag.** Choose "HTML tag". Google shows something like
   `<meta name="google-site-verification" content="AbC123…" />`. Copy the `content` value (pasting the whole
   tag also works). In Vercel → Project → Settings → **Environment Variables**, add
   `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` = that value (Production). Redeploy (Deployments → ⋯ → Redeploy),
   wait until it's Ready, then click **Verify** in Search Console.
   - The home page `/` redirects to `/en`. If verification of the `/` URL fails, add the property
     `https://allayurvedics.vercel.app/en/` instead (the tag is on every page), or use the "HTML file" method:
     download Google's file, put it in the `public/` folder, commit, push and verify.

C. **Submit the sitemap.** In the property: Sitemaps → enter `sitemap.xml` → Submit
   (`https://allayurvedics.vercel.app/sitemap.xml`).

D. **Request indexing of key pages.** Use URL Inspection → paste the URL → "Request indexing" for:
   - `https://allayurvedics.vercel.app/en` and `/hi`
   - `/hi/shilajit` and `/en/shilajit` (shilajit guide hub)
   - `/hi/products/himalayan-shilajit-resin-10g` and `/en/products/himalayan-shilajit-resin-10g`
   - `/hi/lp/shilajit` and `/en/lp/shilajit`
   - `/hi/articles/shilajit-benefits`, `/hi/articles/how-to-take-shilajit-resin`

E. After 1–4 weeks, check Pages (indexing) and Performance (search queries) in Search Console.

Later, when the domain is live, add a **Domain** property for `allayurvedics.in` (verified by a DNS TXT record
at GoDaddy) and follow "When allayurvedics.in works" above.

**Brand-name note:** other sites use similar names (for example allayurvedics.com / allayurvedic.in), so
searches for "All Ayurvedics" may show them first. Shilajit and remedy keywords, Search Console and links
from your Instagram/Facebook bio are the fastest ways to get found.

### Shilajit SEO content

- Hub: `/en|hi/shilajit` → `src/app/[locale]/(site)/shilajit/page.tsx`
- Guides (EN + HI, with FAQ schema): `src/content/articles-shilajit.ts`
- Shared blocks (guide list, product box, callout): `src/components/shilajit-bits.tsx`
- Keep wording to traditional use: no disease-cure, sexual/performance claims, fake reviews or invented numbers.

## 8. Domain

Add `allayurvedics.in` and `www.allayurvedics.in` in Vercel → Project → Settings →
Domains and create the DNS records Vercel shows at your registrar.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```
