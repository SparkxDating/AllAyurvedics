export type RemedyCategory =
  | "digestion"
  | "skin"
  | "hair"
  | "immunity"
  | "cold-cough"
  | "sleep-stress"
  | "joints"
  | "weight"
  | "diabetes-support"
  | "womens-health"
  | "oral-care"
  | "heart-bp"
  | "herbs"
  | "wellness"
  | "eye-care"
  | "kids-health";

export const remedyCategories = [
  "digestion",
  "skin",
  "hair",
  "immunity",
  "cold-cough",
  "sleep-stress",
  "joints",
  "weight",
  "diabetes-support",
  "womens-health",
  "oral-care",
  "heart-bp",
  "herbs",
  "wellness",
  "eye-care",
  "kids-health",
] as const satisfies readonly RemedyCategory[];

/** SEO topic clusters, each with a hub page at /[locale]/home-remedies/[cluster] */
export type ClusterSlug =
  | "hair-care"
  | "skin-care"
  | "stomach-problems"
  | "cold-and-cough"
  | "joint-pain"
  | "weight-loss"
  | "womens-health"
  | "immunity"
  | "oral-care"
  | "sleep-and-stress"
  | "eye-care"
  | "kids-health";

export type FaqItem = { q: string; a: string };

export type RemedyText = {
  title: string;
  summary: string;
  ingredients: string[];
  preparation: string[];
  usage: string[];
  precautions: string[];
  /** Optional short background paragraph (the Ayurvedic view / why it helps). Blank line = new paragraph. */
  about?: string;
  /** Optional supportive lifestyle tips */
  tips?: string[];
  /** Primary search phrase this page targets */
  keyword?: string;
  /** <title> override (used as-is, max 60 chars) */
  metaTitle?: string;
  /** Meta description override (max 155 chars) */
  metaDescription?: string;
  /** Heading for the "about" section (H2), usually containing the keyword */
  aboutTitle?: string;
  /** Short FAQ, rendered on the page and as FAQPage JSON-LD */
  faq?: FaqItem[];
  /** Alt text for the remedy illustration (describe the ingredients shown) */
  imageAlt?: string;
};

export type Remedy = {
  slug: string;
  category: RemedyCategory;
  /** Preparation time in minutes */
  time: number;
  featured?: boolean;
  /** Show the "keep taking prescribed medicine / consult your doctor" box */
  doctorNote?: boolean;
  /** SEO cluster (hub page) this remedy belongs to */
  cluster?: ClusterSlug;
  /** Hand-picked related remedy slugs for internal linking (3-5) */
  related?: string[];
  /** Illustration path under /public, e.g. "/remedies/<slug>.webp" (1200x800). OG crop lives at /remedies/og/<slug>.jpg */
  image?: string;
  en: RemedyText;
  hi: RemedyText;
};

export type ArticleText = {
  title: string;
  excerpt: string;
  /** Lightweight markdown: "## " headings, "- " bullets, blank line between paragraphs, **bold**, [link](/path) */
  body: string;
  /** Primary search phrase */
  keyword?: string;
  /** <title> override (used as-is, max ~60 chars) */
  metaTitle?: string;
  /** Meta description override (max ~155 chars) */
  metaDescription?: string;
  /** FAQ rendered on the page and as FAQPage JSON-LD */
  faq?: FaqItem[];
};

export type Article = {
  slug: string;
  date: string; // ISO date
  tags: string[];
  featured?: boolean;
  /** Topic hub the article belongs to (adds hub breadcrumb, related guides and product CTA) */
  topic?: "shilajit";
  /** Share/Article image (path under /public) */
  image?: string;
  en: ArticleText;
  hi: ArticleText;
};

export type ProductText = {
  name: string;
  short: string;
  description: string;
  benefits: string[];
  howToUse: string[];
  ingredients: string[];
  size: string;
  /** Optional rich content used by real (non-sample) product pages */
  metaTitle?: string;
  metaDescription?: string;
  keyword?: string;
  /** Short heading + paragraphs (separated by a blank line) explaining what the product is */
  aboutTitle?: string;
  about?: string;
  /** Heading for the benefits list (defaults to "Traditionally used for") */
  benefitsTitle?: string;
  /** Heading override for the how-to-use section */
  howToUseTitle?: string;
  genuineCheck?: string[];
  storage?: string[];
  precautions?: string[];
  faq?: FaqItem[];
  /** Label/spec rows shown in a details table, e.g. ["Net quantity", "10 g"] */
  specs?: [string, string][];
  imageAlt?: string[];
  videoLabel?: string;
};

export type ProductMedia = {
  /** Paths under /public, e.g. "/products/x/front.webp"; the first image is the main/OG image */
  images: { src: string; width: number; height: number }[];
  video?: { src: string; poster: string; width: number; height: number };
  /** 1200×630 image used for Open Graph / social sharing */
  ogImage?: string;
};

export type Product = {
  slug: string;
  /** Sample/placeholder listing: shows a badge and is kept out of search */
  sample?: boolean;
  /** Hidden products are not listed anywhere, not in the sitemap and have no page */
  hidden?: boolean;
  category: "churna" | "oil" | "tea" | "rasayana" | "capsule" | "skincare" | "resin";
  featured?: boolean;
  /** simple colour used for the placeholder illustration */
  tone: "leaf" | "turmeric" | "clay" | "sage";
  brand?: string;
  /** Selling price and MRP in INR (whole rupees) */
  price?: number;
  mrp?: number;
  inStock?: boolean;
  /**
   * Optional hosted payment link (Razorpay / Instamojo / Cashfree payment link URL).
   * Can also be supplied at build time through the env var PAYMENT_LINK_<SLUG_IN_UPPER_SNAKE_CASE>.
   */
  paymentLink?: string;
  /** Optional per-product UPI overrides (defaults come from src/config/site.ts) */
  upiId?: string;
  upiPayeeName?: string;
  /** Short name used in the UPI payment note, e.g. "Himalayan Shilajit 10g" */
  orderName?: string;
  media?: ProductMedia;
  /** Remedy slugs linked from the product page */
  relatedRemedies?: string[];
  /** Remedy slugs (and cluster hubs, as "hub:<cluster>") that show a soft "From our shop" block */
  promoteOn?: string[];
  en: ProductText;
  hi: ProductText;
};
