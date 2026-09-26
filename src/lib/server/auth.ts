import "server-only";
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { accountsEnabled, serverConfig } from "./config";

/**
 * Stateless HMAC sessions.
 *
 * Revocation is not implemented. A session stays valid until `exp` because the
 * token is self-contained and there is no server-side session row to delete.
 * Logout clears the cookie on this browser only; a copied token still works
 * until it expires. A denylist or `sessions` table is a Phase 2 change — do not
 * fake revocation by trusting a client-supplied "logged out" flag.
 *
 * SESSION_DAYS is 14. Cookie: HttpOnly, Secure in production, SameSite=Lax, Path=/.
 */

const SCRYPT_OPTIONS = { N: 16384, r: 8, p: 1, maxmem: 64 * 1024 * 1024 } as const;

function scryptKey(password: string, salt: Buffer, keylen: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scryptCb(password, salt, keylen, SCRYPT_OPTIONS, (err, key) => {
      if (err) reject(err);
      else resolve(key);
    });
  });
}

export const SESSION_COOKIE = "aa_session";
const SESSION_DAYS = 14;

export type Session = { uid: number; email: string; name: string; exp: number };

export function sessionCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scryptKey(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

/** Precomputed so a missing account still pays one scrypt, matching a real check. */
const dummyHashPromise = hashPassword("timing-equalization-only");

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, saltB64, keyB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !keyB64) return false;
  let expected: Buffer;
  let salt: Buffer;
  try {
    expected = Buffer.from(keyB64, "base64");
    salt = Buffer.from(saltB64, "base64");
  } catch {
    return false;
  }
  if (expected.length === 0 || salt.length === 0) return false;
  const key = await scryptKey(password, salt, expected.length);
  return key.length === expected.length && timingSafeEqual(key, expected);
}

/** Compare a password when the account may not exist, without a timing gap. */
export async function verifyPasswordOrDummy(password: string, stored: string | undefined): Promise<boolean> {
  const hash = stored ?? (await dummyHashPromise);
  const valid = await verifyPassword(password, hash);
  return Boolean(stored) && valid;
}

function sign(value: string) {
  return createHmac("sha256", serverConfig.authSecret).update(value).digest("base64url");
}

function safeEqualString(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) {
    timingSafeEqual(right, right);
    return false;
  }
  return timingSafeEqual(left, right);
}

export function createSessionToken(user: { id: number; email: string; name: string }): { token: string; maxAge: number } {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const payload: Session = { uid: user.id, email: user.email, name: user.name, exp: Date.now() + maxAge * 1000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return { token: `${body}.${sign(body)}`, maxAge };
}

function isSession(value: unknown): value is Session {
  if (!value || typeof value !== "object") return false;
  const session = value as Record<string, unknown>;
  return (
    typeof session.uid === "number" &&
    Number.isInteger(session.uid) &&
    session.uid > 0 &&
    typeof session.email === "string" &&
    session.email.length > 3 &&
    session.email.length <= 200 &&
    typeof session.name === "string" &&
    session.name.length <= 100 &&
    typeof session.exp === "number" &&
    Number.isFinite(session.exp)
  );
}

export function readSessionToken(token: string | undefined): Session | null {
  if (!token || !accountsEnabled()) return null;
  const dot = token.indexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!body || !sig) return null;
  const expected = sign(body);
  if (!safeEqualString(sig, expected)) return null;
  try {
    const parsed: unknown = JSON.parse(Buffer.from(body, "base64url").toString());
    if (!isSession(parsed)) return null;
    return parsed.exp > Date.now() ? parsed : null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}
