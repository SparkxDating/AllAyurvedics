import { z } from "zod";
import { remedyCategories, type Article, type Product, type Remedy } from "./types";

/**
 * Runtime checks for the content files. TypeScript already checks these modules;
 * this catches duplicate slugs and empty required fields during `next build`
 * and on the server. It does not run in the browser.
 *
 * SEO title/description length is editorial (about 60 / 155). Those are not
 * hard failures here so a slightly long Hindi title does not take the site down.
 */

const slug = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const line = z.string().trim().min(1).max(4000);
const lines = z.array(line).min(1).max(40);
const faq = z.array(z.object({ q: line, a: line })).max(20);

const remedyText = z.object({
  title: z.string().trim().min(1).max(200),
  summary: z.string().trim().min(1).max(2000),
  ingredients: lines,
  preparation: lines,
  usage: lines,
  precautions: lines,
  about: z.string().trim().min(1).max(8000).optional(),
  tips: z.array(line).max(20).optional(),
  keyword: z.string().trim().min(1).max(120).optional(),
  metaTitle: z.string().trim().min(1).max(120).optional(),
  metaDescription: z.string().trim().min(1).max(220).optional(),
  aboutTitle: z.string().trim().min(1).max(200).optional(),
  faq: faq.optional(),
});

const cluster = z.enum([
  "hair-care",
  "skin-care",
  "stomach-problems",
  "cold-and-cough",
  "joint-pain",
  "weight-loss",
  "womens-health",
  "immunity",
]);

export const remedySchema = z.object({
  slug,
  category: z.enum(remedyCategories),
  time: z.number().int().positive().max(24 * 60),
  featured: z.boolean().optional(),
  doctorNote: z.boolean().optional(),
  cluster: cluster.optional(),
  related: z.array(slug).max(8).optional(),
  en: remedyText,
  hi: remedyText,
});

const articleText = z.object({
  title: z.string().trim().min(1).max(200),
  excerpt: z.string().trim().min(1).max(2000),
  body: z.string().trim().min(1).max(80_000),
  keyword: z.string().trim().min(1).max(120).optional(),
  metaTitle: z.string().trim().min(1).max(120).optional(),
  metaDescription: z.string().trim().min(1).max(220).optional(),
  faq: faq.optional(),
});

export const articleSchema = z.object({
  slug,
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string().trim().min(1).max(40)).max(12),
  featured: z.boolean().optional(),
  topic: z.enum(["shilajit"]).optional(),
  image: z.string().startsWith("/").max(200).optional(),
  en: articleText,
  hi: articleText,
});

const productText = z.object({
  name: z.string().trim().min(1).max(200),
  short: z.string().trim().min(1).max(500),
  description: z.string().trim().min(1).max(4000),
  benefits: lines,
  howToUse: lines,
  ingredients: lines,
  size: z.string().trim().min(1).max(80),
  metaTitle: z.string().trim().min(1).max(120).optional(),
  metaDescription: z.string().trim().min(1).max(220).optional(),
  keyword: z.string().trim().min(1).max(120).optional(),
  aboutTitle: z.string().trim().min(1).max(200).optional(),
  about: z.string().trim().min(1).max(8000).optional(),
  benefitsTitle: z.string().trim().min(1).max(200).optional(),
  howToUseTitle: z.string().trim().min(1).max(200).optional(),
  genuineCheck: z.array(line).max(20).optional(),
  storage: z.array(line).max(20).optional(),
  precautions: z.array(line).max(20).optional(),
  faq: faq.optional(),
  specs: z.array(z.tuple([z.string().trim().min(1).max(80), z.string().trim().min(1).max(200)])).max(30).optional(),
  imageAlt: z.array(z.string().trim().min(1).max(300)).max(8).optional(),
  videoLabel: z.string().trim().min(1).max(120).optional(),
});

export const productSchema = z.object({
  slug,
  sample: z.boolean().optional(),
  hidden: z.boolean().optional(),
  category: z.enum(["churna", "oil", "tea", "rasayana", "capsule", "skincare", "resin"]),
  featured: z.boolean().optional(),
  tone: z.enum(["leaf", "turmeric", "clay", "sage"]),
  brand: z.string().trim().min(1).max(120).optional(),
  price: z.number().int().positive().max(500_000).optional(),
  mrp: z.number().int().positive().max(500_000).optional(),
  inStock: z.boolean().optional(),
  paymentLink: z.string().startsWith("https://").max(300).optional(),
  upiId: z.string().trim().min(3).max(320).optional(),
  upiPayeeName: z.string().trim().min(1).max(80).optional(),
  orderName: z.string().trim().min(1).max(80).optional(),
  media: z
    .object({
      images: z
        .array(z.object({ src: z.string().startsWith("/"), width: z.number().positive(), height: z.number().positive() }))
        .min(1)
        .max(8),
      video: z
        .object({
          src: z.string().startsWith("/"),
          poster: z.string().startsWith("/"),
          width: z.number().positive(),
          height: z.number().positive(),
        })
        .optional(),
      ogImage: z.string().startsWith("/").optional(),
    })
    .optional(),
  relatedRemedies: z.array(slug).max(8).optional(),
  promoteOn: z.array(z.string().trim().min(1).max(80)).max(40).optional(),
  en: productText,
  hi: productText,
});

function assertCollection(label: string, items: readonly { slug: string }[], schema: z.ZodType) {
  const seen = new Set<string>();
  const problems: string[] = [];
  for (const item of items) {
    const parsed = schema.safeParse(item);
    const slugValue = item.slug || "?";
    if (!parsed.success) {
      const issue = parsed.error.issues[0];
      problems.push(`${label} ${slugValue}: ${issue?.path.join(".") || "item"} ${issue?.message}`);
      if (problems.length >= 8) break;
      continue;
    }
    if (seen.has(slugValue)) problems.push(`${label} duplicate slug: ${slugValue}`);
    seen.add(slugValue);
  }
  if (problems.length) {
    throw new Error(`Content validation failed\n${problems.join("\n")}`);
  }
}

export function assertRemedies(items: readonly Remedy[]) {
  assertCollection("remedy", items, remedySchema);
}

export function assertArticles(items: readonly Article[]) {
  assertCollection("article", items, articleSchema);
}

export function assertProducts(items: readonly Product[]) {
  assertCollection("product", items, productSchema);
  for (const product of items) {
    if (product.price && product.mrp && product.mrp < product.price) {
      throw new Error(`product ${product.slug}: mrp is lower than price`);
    }
  }
}
