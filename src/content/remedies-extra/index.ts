import type { Remedy } from "../types";
import { b1Digestion1 } from "./b1-digestion-1";
import { b1Digestion2 } from "./b1-digestion-2";
import { b1Skin1 } from "./b1-skin-1";
import { b1Skin2 } from "./b1-skin-2";
import { b1Oral } from "./b1-oral";
import { b2Hair } from "./b2-hair";
import { b2Cold } from "./b2-cold";
import { b2Sleep } from "./b2-sleep";
import { b2Weight } from "./b2-weight";
import { b3Joints } from "./b3-joints";
import { b3Metabolic } from "./b3-metabolic";
import { b3Women } from "./b3-women";
import { b3Wellness } from "./b3-wellness";
import { b4Herbs1 } from "./b4-herbs-1";
import { b4Herbs2 } from "./b4-herbs-2";
import { b4Herbs3 } from "./b4-herbs-3";
import { b4Herbs4 } from "./b4-herbs-4";
import { b4Herbs5 } from "./b4-herbs-5";

/** Remedies added after launch, grouped by batch. */
export const extraRemedies: Remedy[] = [
  // Batch 1: digestion, skin, oral care
  ...b1Digestion1,
  ...b1Digestion2,
  ...b1Skin1,
  ...b1Skin2,
  ...b1Oral,
  // Batch 2: hair, cold & cough, sleep & stress, weight
  ...b2Hair,
  ...b2Cold,
  ...b2Sleep,
  ...b2Weight,
  // Batch 3: joints, diabetes, heart, women's health, wellness
  ...b3Joints,
  ...b3Metabolic,
  ...b3Women,
  ...b3Wellness,
  // Batch 4: herb & food guides
  ...b4Herbs1,
  ...b4Herbs2,
  ...b4Herbs3,
  ...b4Herbs4,
  ...b4Herbs5,
];
