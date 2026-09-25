import "server-only";
import { neon } from "@neondatabase/serverless";
import { hasDatabase, serverConfig } from "./config";

export type EnquiryRecord = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  product?: string;
  locale: string;
};

export type SubscriberRecord = {
  email: string;
  name?: string;
  source: string;
  locale: string;
};

export type UserRecord = {
  id: number;
  name: string;
  email: string;
  password_hash: string;
};

/** Storage adapter. Swap the implementation (Neon, Supabase, etc.) without touching API routes. */
export interface LeadStore {
  readonly configured: boolean;
  saveEnquiry(e: EnquiryRecord): Promise<void>;
  saveSubscriber(s: SubscriberRecord): Promise<void>;
  findUserByEmail(email: string): Promise<UserRecord | null>;
  createUser(u: { name: string; email: string; passwordHash: string; locale: string }): Promise<UserRecord>;
}

/** Used when no database is configured: accepts data but stores nothing. */
const noopStore: LeadStore = {
  configured: false,
  async saveEnquiry() {
    console.info("[store] DATABASE_URL not set – enquiry not persisted");
  },
  async saveSubscriber() {
    console.info("[store] DATABASE_URL not set – subscriber not persisted");
  },
  async findUserByEmail() {
    return null;
  },
  async createUser() {
    throw new Error("Accounts require DATABASE_URL");
  },
};

let schemaReady: Promise<void> | null = null;

function neonStore(): LeadStore {
  const sql = neon(serverConfig.databaseUrl);

  const ensureSchema = () => {
    if (!schemaReady) {
      schemaReady = (async () => {
        await sql`CREATE TABLE IF NOT EXISTS enquiries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          subject TEXT NOT NULL,
          message TEXT NOT NULL,
          product TEXT,
          locale TEXT NOT NULL DEFAULT 'en',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
        await sql`CREATE TABLE IF NOT EXISTS subscribers (
          id SERIAL PRIMARY KEY,
          email TEXT NOT NULL UNIQUE,
          name TEXT,
          source TEXT NOT NULL,
          locale TEXT NOT NULL DEFAULT 'en',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
        await sql`CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL UNIQUE,
          password_hash TEXT NOT NULL,
          locale TEXT NOT NULL DEFAULT 'en',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )`;
      })().catch((err) => {
        schemaReady = null;
        throw err;
      });
    }
    return schemaReady;
  };

  return {
    configured: true,
    async saveEnquiry(e) {
      await ensureSchema();
      await sql`INSERT INTO enquiries (name, email, phone, subject, message, product, locale)
        VALUES (${e.name}, ${e.email}, ${e.phone || null}, ${e.subject}, ${e.message}, ${e.product || null}, ${e.locale})`;
    },
    async saveSubscriber(s) {
      await ensureSchema();
      await sql`INSERT INTO subscribers (email, name, source, locale)
        VALUES (${s.email.toLowerCase()}, ${s.name || null}, ${s.source}, ${s.locale})
        ON CONFLICT (email) DO NOTHING`;
    },
    async findUserByEmail(email) {
      await ensureSchema();
      const rows = (await sql`SELECT id, name, email, password_hash FROM users WHERE email = ${email.toLowerCase()} LIMIT 1`) as UserRecord[];
      return rows[0] ?? null;
    },
    async createUser(u) {
      await ensureSchema();
      const rows = (await sql`INSERT INTO users (name, email, password_hash, locale)
        VALUES (${u.name}, ${u.email.toLowerCase()}, ${u.passwordHash}, ${u.locale})
        RETURNING id, name, email, password_hash`) as UserRecord[];
      return rows[0];
    },
  };
}

let cached: LeadStore | null = null;
export function getStore(): LeadStore {
  if (!cached) cached = hasDatabase() ? neonStore() : noopStore;
  return cached;
}
