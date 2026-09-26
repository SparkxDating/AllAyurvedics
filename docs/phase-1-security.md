# Phase 1 — production foundation

This pass hardens the existing Next.js app. It does not add admin or order-management UI (Phase 2).

## Canonical URL

`src/config/site.ts` no longer uses a `DOMAIN_LIVE` switch.

- `NEXT_PUBLIC_SITE_URL` wins when set.
- `next dev` without that variable uses `http://localhost:3000`.
- Any other production build uses `https://allayurvedics.in`.

Set `NEXT_PUBLIC_SITE_URL=https://allayurvedics.in` in Vercel Production. Preview deployments can set their own URL or leave it unset (canonicals then point at the production domain, which avoids indexing a preview host).

Account pages are `noindex` on purpose. Checkout is `noindex, nofollow` on purpose and is disallowed in `robots.txt`. Public pages are not.

## Security headers

Set in `next.config.ts` for every path: `nosniff`, `Referrer-Policy`, `X-Frame-Options`, `Permissions-Policy`, `Strict-Transport-Security` (production), and a Content-Security-Policy built from the resources this app actually uses (self-hosted `next/font`, local images, inline JSON-LD, same-origin API). No wildcard script or image hosts. WhatsApp and UPI are navigations, not embedded frames.

## Rate limits

Shared store: Upstash Redis REST if both `UPSTASH_REDIS_REST_*` variables are set, otherwise the Postgres table `rate_limits` (created with `CREATE TABLE IF NOT EXISTS`, no change to existing tables). Process memory is only the fallback when neither store exists, and it does not protect multiple server instances.

| Policy | Limit | Window | Key |
|---|---|---|---|
| LOGIN_IP | 30 | 10 min | IP |
| LOGIN_IP_ACCOUNT | 5 | 10 min | IP + account |
| LOGIN_ACCOUNT | 20 | 1 hour | account |
| REGISTER_IP | 5 | 1 hour | IP |
| ENQUIRY_ROUTE_IP | 40 | 1 hour | IP |
| ENQUIRY_IP | 10 | 1 hour | IP |
| SUBSCRIBE_IP / SUBSCRIBE_EMAIL | 10 | 1 hour | IP and email |
| ORDER_IP | 6 | 1 hour | IP |
| LOGOUT_IP | 30 | 1 hour | IP |

HTTP 429 body: `{ "ok": false, "error": "too_many_requests" }`. Buckets store hashes, not raw emails or IPs. Auth limiters fail closed if the shared store errors. Enquiry, subscribe and order fail open so a database blip does not drop a customer, and the failure is logged.

## CSRF

No extra CSRF framework. The session cookie is `HttpOnly`, `Secure` in production, `SameSite=Lax`, `Path=/`. Cross-site form posts do not send that cookie. Mutation routes also reject a browser `Origin` that does not match the request host, and `Sec-Fetch-Site: cross-site`. CORS is not enabled. Next.js returns 405 for methods a route does not export.

## Sessions

Sessions are stateless HMAC tokens (scrypt password hashes, timing-safe signature compare, 14-day expiry). Logout clears the cookie only. A copied token cannot be revoked until it expires, because there is no server-side session row. Do not pretend otherwise. Phase 2 can add a `sessions` table.

Login and registration do not reveal whether an email exists. Login always runs scrypt. A duplicate registration returns the same success response and does not change the existing password.

## Orders and UPI

The server ignores client price, total, discount and payment status. It loads the product by slug and stores `quantity × catalogue price` with `Payment status: UNVERIFIED`. Nothing marks a payment verified. The UPI VPA is public (it is shown to the customer). The QR code is still built in the browser so quantity can change without a reload; the stored order and the confirmation amount after a successful submit use the server total. The WhatsApp message is still composed in the browser when the save fails.

## Content checks

`src/content/schema.ts` validates products, articles and remedies (slug, locale text, category, FAQ, precautions, metadata shape) on the server at import. There were no `as any` / `@ts-ignore` / `@ts-nocheck` casts in the repo to remove.

## Phase 2 schema notes (not implemented)

Do not migrate production data for these until Phase 2:

- `orders` table: order ref (unique), product slug, quantity, unit price, total, UTR, `payment_status` default `unverified`, customer fields, timestamps. Unique UTR optional.
- `sessions` table (`jti`, user id, expires, revoked) so logout can revoke a token.
- Admin roles must not be accepted from the browser.
