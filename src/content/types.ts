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
  | "wellness";

export const remedyCategories: RemedyCategory[] = [
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
];

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
};

export type Remedy = {
  slug: string;
  category: RemedyCategory;
  /** Preparation time in minutes */
  time: number;
  featured?: boolean;
  /** Show the "keep taking prescribed medicine / consult your doctor" box */
  doctorNote?: boolean;
  en: RemedyText;
  hi: RemedyText;
};

export type ArticleText = {
  title: string;
  excerpt: string;
  /** Lightweight markdown: "## " headings, "- " bullets, blank line between paragraphs, **bold** */
  body: string;
};

export type Article = {
  slug: string;
  date: string; // ISO date
  tags: string[];
  featured?: boolean;
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
};

export type Product = {
  slug: string;
  sample: true;
  category: "churna" | "oil" | "tea" | "rasayana" | "capsule" | "skincare";
  featured?: boolean;
  /** simple colour used for the placeholder illustration */
  tone: "leaf" | "turmeric" | "clay" | "sage";
  en: ProductText;
  hi: ProductText;
};
