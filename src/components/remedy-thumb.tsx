import Image from "next/image";
import type { RemedyCategory } from "@/content/types";
import { CategoryIcon } from "./illustrations";
import { cn } from "@/lib/utils";

/** Illustrations are drawn at 1200x800 (3:2). */
export const REMEDY_IMAGE_WIDTH = 1200;
export const REMEDY_IMAGE_HEIGHT = 800;

/** Blob colours matching the illustration tints (scripts/remedy-art/compose.mjs) */
const FALLBACK_TINTS: Record<RemedyCategory, string> = {
  digestion: "#f5e2b3",
  skin: "#f4dad6",
  hair: "#dcead0",
  immunity: "#f7e3b2",
  "cold-cough": "#dbeaef",
  "sleep-stress": "#e4dff2",
  joints: "#eee1ca",
  weight: "#e5eec8",
  "diabetes-support": "#dbeaef",
  "womens-health": "#f5dde3",
  "oral-care": "#d8ece2",
  "heart-bp": "#f4dad6",
  herbs: "#dcead0",
  wellness: "#f7e3b2",
  "eye-care": "#d8e8f1",
  "kids-health": "#fadfce",
};

function variant(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  return { x: 14 + (h % 12), y: 4 + ((h >> 4) % 8), r: ((h >> 8) % 30) - 15 };
}

/** Card sizes: 1 column on phones, 2 on small screens, 3 on large (max container ~1200px). */
const CARD_SIZES = "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw";

/**
 * 3:2 thumbnail for remedy cards. Uses the remedy illustration when there is one;
 * older remedies get a soft tinted panel with the category icon so mixed grids stay aligned.
 */
export function RemedyThumb({
  image,
  alt,
  category,
  className,
  sizes = CARD_SIZES,
  seed,
}: {
  image?: string;
  alt?: string;
  category: RemedyCategory;
  className?: string;
  sizes?: string;
  /** Varies the fallback backdrop per remedy (usually the slug) */
  seed?: string;
}) {
  if (image) {
    return (
      <div className={cn("relative aspect-[3/2] overflow-hidden bg-[#fbf6ec]", className)}>
        <Image
          src={image}
          alt={alt ?? ""}
          width={REMEDY_IMAGE_WIDTH}
          height={REMEDY_IMAGE_HEIGHT}
          sizes={sizes}
          loading="lazy"
          className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>
    );
  }
  // Fallback for remedies without an illustration: a soft still-life backdrop in the
  // same palette as the illustrations (cream paper, tinted blob, jute mat) with the category icon.
  const tint = FALLBACK_TINTS[category];
  const v = variant(seed ?? category);
  return (
    <div aria-hidden="true" className={cn("relative aspect-[3/2] overflow-hidden bg-[#fbf6ec]", className)}>
      <span
        className="absolute rounded-[46%_54%_52%_48%/55%_45%_55%_45%]"
        style={{ background: tint, left: `${v.x}%`, top: `${v.y}%`, width: "62%", height: "78%", transform: `rotate(${v.r}deg)` }}
      />
      <span className="absolute rounded-full opacity-70" style={{ background: tint, right: `${6 + v.x / 3}%`, top: "8%", width: "22%", height: "30%" }} />
      <span className="absolute bottom-[12%] left-1/2 h-[12%] w-[56%] -translate-x-1/2 rounded-[50%] bg-[#efe2c8]" />
      <span className="absolute bottom-[13.5%] left-1/2 h-[8%] w-[50%] -translate-x-1/2 rounded-[50%] border-2 border-dashed border-[#d8c3a0]/70" />
      <span className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-1/2">
        <CategoryIcon category={category} className="size-20 shadow-sm ring-8 ring-card/70 [&_svg]:size-9" />
      </span>
    </div>
  );
}
