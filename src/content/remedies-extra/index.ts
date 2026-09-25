import type { Remedy } from "../types";
import { b1Digestion1 } from "./b1-digestion-1";
import { b1Digestion2 } from "./b1-digestion-2";
import { b1Skin1 } from "./b1-skin-1";
import { b1Skin2 } from "./b1-skin-2";
import { b1Oral } from "./b1-oral";

/** Remedies added after launch, grouped by batch. */
export const extraRemedies: Remedy[] = [
  // Batch 1: digestion, skin, oral care
  ...b1Digestion1,
  ...b1Digestion2,
  ...b1Skin1,
  ...b1Skin2,
  ...b1Oral,
];
