# All Ayurvedics – Setup guide

The site runs fine with **no environment variables at all**. Every form then shows a
friendly "received / coming soon" state and nothing is stored or emailed. To turn on
each feature, add the variables below in **Vercel → Project `allayurvedics` → Settings →
Environment Variables** (Production + Preview), then **redeploy**.

## 1. Basics (recommended right away)

| Variable | Example | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://allayurvedics.in` | Canonical URLs, hreflang, sitemap, Open Graph. Defaults to `https://allayurvedics.in`. |
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
form with the product already selected. A **Buy now – ₹price** button appears only when
the product has a hosted payment link. There is no payment SDK in the code. You create a
payment link in your payment provider's dashboard and paste its URL in one of two places:

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

Without a link, the page shows "Online payment coming soon — please send an enquiry to order"
and the enquiry button stays the main action. There is no WhatsApp button yet. It can be added
once a business WhatsApp number is chosen.

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
