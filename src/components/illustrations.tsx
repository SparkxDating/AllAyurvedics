import {
  Bone,
  Baby,
  Droplets,
  Eye,
  Flame,
  Flower2,
  HeartPulse,
  Leaf,
  Moon,
  Scale,
  Shield,
  Smile,
  Sparkles,
  Sprout,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { Product, RemedyCategory } from "@/content/types";
import { cn } from "@/lib/utils";

export const categoryIcons: Record<RemedyCategory, LucideIcon> = {
  digestion: Flame,
  skin: Sparkles,
  hair: Leaf,
  immunity: Shield,
  "cold-cough": Wind,
  "sleep-stress": Moon,
  joints: Bone,
  weight: Scale,
  "diabetes-support": Droplets,
  "womens-health": Flower2,
  "oral-care": Smile,
  "heart-bp": HeartPulse,
  herbs: Sprout,
  wellness: Sun,
  "eye-care": Eye,
  "kids-health": Baby,
};

export const categoryTones: Record<RemedyCategory, string> = {
  digestion: "bg-turmeric-soft text-[#8a5a07]",
  skin: "bg-clay-soft text-clay",
  hair: "bg-leaf-soft text-leaf",
  immunity: "bg-secondary text-primary",
  "cold-cough": "bg-[#e3eef0] text-[#2f6470]",
  "sleep-stress": "bg-[#e7e4f1] text-[#4b4586]",
  joints: "bg-muted text-[#6b5a3e]",
  weight: "bg-leaf-soft text-leaf",
  "diabetes-support": "bg-[#e3eef0] text-[#2f6470]",
  "womens-health": "bg-clay-soft text-clay",
  "oral-care": "bg-secondary text-primary",
  "heart-bp": "bg-clay-soft text-[#9b3b2b]",
  herbs: "bg-leaf-soft text-leaf",
  wellness: "bg-turmeric-soft text-[#8a5a07]",
  "eye-care": "bg-[#e3eef0] text-[#2f6470]",
  "kids-health": "bg-turmeric-soft text-[#8a5a07]",
};

export function CategoryIcon({ category, className }: { category: RemedyCategory; className?: string }) {
  const Icon = categoryIcons[category];
  return (
    <span className={cn("inline-flex size-10 items-center justify-center rounded-full", categoryTones[category], className)}>
      <Icon className="size-5" aria-hidden="true" />
    </span>
  );
}

/** Decorative hero artwork: sun, leaves and a mortar & pestle, drawn in SVG. */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 420 380" className={className} role="img" aria-hidden="true">
      <defs>
        <radialGradient id="sun" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f6d27a" />
          <stop offset="100%" stopColor="#e0a526" />
        </radialGradient>
      </defs>
      <circle cx="290" cy="110" r="70" fill="url(#sun)" opacity="0.9" />
      <circle cx="290" cy="110" r="95" fill="none" stroke="#e0a526" strokeOpacity="0.25" strokeWidth="2" strokeDasharray="4 10" />
      {/* leaves */}
      <path d="M70 250c10-80 60-140 140-160-15 80-65 140-140 160z" fill="#5b8a4a" />
      <path d="M70 250c40-50 80-100 140-160" stroke="#23422c" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M120 290c-10-70 20-130 80-170 5 70-25 130-80 170z" fill="#8fae83" />
      <path d="M340 260c-20-60-70-95-130-100 20 60 70 95 130 100z" fill="#a9c79a" />
      <path d="M340 260c-40-40-80-70-130-100" stroke="#23422c" strokeWidth="2" fill="none" opacity="0.4" />
      {/* mortar */}
      <path d="M130 270h170c0 50-38 85-85 85s-85-35-85-85z" fill="#b8643c" />
      <rect x="120" y="258" width="190" height="18" rx="9" fill="#9b5231" />
      <path d="M240 200l55-60" stroke="#6b4a2e" strokeWidth="14" strokeLinecap="round" />
      {/* spice dots */}
      <circle cx="175" cy="255" r="6" fill="#e0a526" />
      <circle cx="195" cy="250" r="5" fill="#f6d27a" />
      <circle cx="215" cy="254" r="6" fill="#23422c" />
      <circle cx="235" cy="251" r="4" fill="#e0a526" />
      <circle cx="90" cy="120" r="5" fill="#e0a526" opacity="0.6" />
      <circle cx="60" cy="170" r="3" fill="#5b8a4a" opacity="0.6" />
      <circle cx="370" cy="200" r="4" fill="#b8643c" opacity="0.6" />
    </svg>
  );
}

const toneFill: Record<Product["tone"], { body: string; accent: string; bg: string }> = {
  leaf: { body: "#5b8a4a", accent: "#e3ecd6", bg: "#eef3e6" },
  turmeric: { body: "#d99a1e", accent: "#fff4d6", bg: "#fbf0d5" },
  clay: { body: "#b8643c", accent: "#f7e3d6", bg: "#f6e6db" },
  sage: { body: "#6f8f63", accent: "#eef3e6", bg: "#e9efe2" },
};

/** Simple placeholder packaging drawn in SVG (no photos). */
export function ProductIllustration({ product, className }: { product: Product; className?: string }) {
  const t = toneFill[product.tone];
  const shape = product.category;
  return (
    <svg viewBox="0 0 200 160" className={className} role="img" aria-hidden="true">
      <rect width="200" height="160" fill={t.bg} />
      <circle cx="160" cy="30" r="40" fill={t.accent} />
      <ellipse cx="100" cy="142" rx="60" ry="6" fill="#000" opacity="0.08" />
      {(shape === "oil" || shape === "skincare") && (
        <g>
          <rect x="88" y="30" width="24" height="16" rx="3" fill="#3b3b3b" />
          <rect x="76" y="44" width="48" height="96" rx="12" fill={t.body} />
          <rect x="84" y="72" width="32" height="40" rx="4" fill={t.accent} />
        </g>
      )}
      {(shape === "churna" || shape === "tea") && (
        <g>
          <path d="M62 40h76l8 100H54z" fill={t.body} />
          <path d="M62 40h76l-6 12H68z" fill="#000" opacity="0.12" />
          <rect x="74" y="70" width="52" height="42" rx="4" fill={t.accent} />
        </g>
      )}
      {(shape === "rasayana" || shape === "capsule" || shape === "resin") && (
        <g>
          <rect x="66" y="34" width="68" height="20" rx="5" fill="#3b3b3b" />
          <rect x="60" y="52" width="80" height="88" rx="14" fill={t.body} />
          <rect x="70" y="76" width="60" height="38" rx="4" fill={t.accent} />
        </g>
      )}
      <path d="M92 96c0-10 4-17 12-21-1 10-5 17-12 21z" fill={t.body} />
      <path d="M100 100c0-8-3-14-9-17 1 8 4 14 9 17z" fill={t.body} opacity="0.7" />
    </svg>
  );
}
