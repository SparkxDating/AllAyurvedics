import "server-only";
import { createHmac, randomBytes, scrypt as scryptCb, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { cookies } from "next/headers";
import { accountsEnabled, serverConfig } from "./config";

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, keylen: number) => Promise<Buffer>;

export const SESSION_COOKIE = "aa_session";
const SESSION_DAYS = 30;

export type Session = { uid: number; email: string; name: string; exp: number };

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(password, salt, 64);
  return `scrypt$${salt.toString("base64")}$${key.toString("base64")}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [algo, saltB64, keyB64] = stored.split("$");
  if (algo !== "scrypt" || !saltB64 || !keyB64) return false;
  const expected = Buffer.from(keyB64, "base64");
  const key = await scrypt(password, Buffer.from(saltB64, "base64"), expected.length);
  return key.length === expected.length && timingSafeEqual(key, expected);
}

function sign(value: string) {
  return createHmac("sha256", serverConfig.authSecret).update(value).digest("base64url");
}

export function createSessionToken(user: { id: number; email: string; name: string }): { token: string; maxAge: number } {
  const maxAge = SESSION_DAYS * 24 * 60 * 60;
  const payload: Session = { uid: user.id, email: user.email, name: user.name, exp: Date.now() + maxAge * 1000 };
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return { token: `${body}.${sign(body)}`, maxAge };
}

export function readSessionToken(token: string | undefined): Session | null {
  if (!token || !accountsEnabled()) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;
  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString()) as Session;
    return session.exp > Date.now() ? session : null;
  } catch {
    return null;
  }
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  return readSessionToken(store.get(SESSION_COOKIE)?.value);
}
