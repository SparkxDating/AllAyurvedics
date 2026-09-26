import type { Remedy } from "../types";

/** SEO-focused remedies, grouped by topic cluster (see ../clusters.ts). */
import { hair1 } from "./hair-1";
import { hair2 } from "./hair-2";
import { hair3 } from "./hair-3";
import { skin1 } from "./skin-1";
import { skin2 } from "./skin-2";
import { skin3 } from "./skin-3";
import { stomach1 } from "./stomach-1";
import { stomach2 } from "./stomach-2";
import { stomach3 } from "./stomach-3";
import { cold1 } from "./cold-1";
import { cold2 } from "./cold-2";
import { cold3 } from "./cold-3";
import { joint1 } from "./joint-1";
import { joint2 } from "./joint-2";
import { joint3 } from "./joint-3";
import { weight1 } from "./weight-1";
import { weight2 } from "./weight-2";
import { weight3 } from "./weight-3";

export const seoRemedies: Remedy[] = [
  // Hair care cluster
  ...hair1,
  ...hair2,
  ...hair3,
  // Skin care cluster
  ...skin1,
  ...skin2,
  ...skin3,
  // Stomach problems cluster
  ...stomach1,
  ...stomach2,
  ...stomach3,
  // Cold and cough cluster
  ...cold1,
  ...cold2,
  ...cold3,
  // Joint pain cluster
  ...joint1,
  ...joint2,
  ...joint3,
  // Weight loss cluster
  ...weight1,
  ...weight2,
  ...weight3,
];
