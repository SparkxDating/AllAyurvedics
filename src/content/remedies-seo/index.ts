import type { Remedy } from "../types";

/** SEO-focused remedies, grouped by topic cluster (see ../clusters.ts). */
import { hair1 } from "./hair-1";
import { hair2 } from "./hair-2";
import { hair3 } from "./hair-3";
import { skin1 } from "./skin-1";
import { skin2 } from "./skin-2";
import { skin3 } from "./skin-3";

export const seoRemedies: Remedy[] = [
  // Hair care cluster
  ...hair1,
  ...hair2,
  ...hair3,
  // Skin care cluster
  ...skin1,
  ...skin2,
  ...skin3,
];
