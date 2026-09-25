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
- **Products**: `src/content/products.ts` – the 6 items are **samples**. Replace them with
  real products and set `sample: false` (this removes the "Sample product" badge and
  lets search engines index the pages).
- **Landing pages**: add an entry to `src/content/campaigns.ts`; it becomes `/en/lp/<slug>` and `/hi/lp/<slug>`.
- **Legal pages** (About, Privacy, Terms, Medical disclaimer): `src/content/pages.ts` – please have them reviewed for your business.

## 7. Domain

Add `allayurvedics.in` and `www.allayurvedics.in` in Vercel → Project → Settings →
Domains and create the DNS records Vercel shows at your registrar.

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```
