/**
 * Scene per remedy slug (see compose.mjs for slots, tints and components).
 * Tints by cluster: oral=mint, eye=sky, sleep=lavender, kids=peach, hair=leaf, skin=rose,
 * stomach=turmeric, cold=ice, joints=sand, weight=lime, women=blush, immunity=sun.
 */
const OIL = "#e3b64f";
const GHEE = "#f1d27a";
const MILK = "#f6ecd6";

export const scenes = {
  // ── Oral care ─────────────────────────────────────────────
  "home-remedies-for-tooth-sensitivity": { tint: "mint", hero: ["brassCup", { liquid: OIL, steamOn: false }], left: "sesame", right: ["bowl", { fill: "#f2efe8", kind: "powder", dots: "#c9c2b5", w: 200 }], frontLeft: "clove", backRight: "mint" },
  "home-remedies-for-yellow-teeth": { tint: "mint", hero: ["glass", { liquid: "#eaf4f4", fill: 0.6 }], left: "twig", right: "apple", frontRight: "salt", backLeft: "neem" },
  "home-remedies-for-swollen-gums": { tint: "mint", hero: ["bowl", { fill: "#e6f0ee", steamOn: true, w: 250, float: "leaves" }], left: "turmeric", right: "salt", backRight: "brahmi" },
  "home-remedies-for-dry-mouth": { tint: "mint", hero: ["glass", { liquid: "#eef6f2", lemon: true }], left: "fennel", right: "amla", backRight: ["bottle", { liquid: OIL }] },
  "home-remedies-for-cracked-corners-of-mouth": { tint: "mint", hero: ["jar", { fill: GHEE, lid: "#5b8a4a" }], left: "coconut", right: "almonds", frontRight: "honeyDipper" },
  "home-remedies-for-white-tongue": { tint: "mint", hero: ["cup", { liquid: "#f3ead2" }], left: "scraper", right: "fennel", frontLeft: "lemonSlice" },
  "home-remedies-for-wisdom-tooth-pain": { tint: "mint", hero: ["bowl", { fill: "#eef3ee", steamOn: true, w: 240, body: "#c9962c" }], left: "clove", right: "cloth", frontRight: "ice", frontLeft: "salt" },
  "home-remedies-for-plaque-and-tartar": { tint: "mint", hero: ["bowl", { fill: "#f5ecd0", w: 220 }], left: "carrot", right: "apple", frontLeft: "twig", backLeft: "neem" },
  "home-remedies-for-cold-sores": { tint: "mint", hero: ["bowl", { fill: "#dff0d6", w: 230 }], left: "aloe", right: "ice", frontRight: "cottonPads", backRight: "mint" },

  // ── Eye care ──────────────────────────────────────────────
  "home-remedies-for-dry-eyes": { tint: "sky", hero: ["jar", { fill: GHEE, lid: "#5f95a6" }], left: "cloth", right: "cucumber", frontRight: "flaxseed", frontLeft: "walnuts" },
  "home-remedies-for-itchy-eyes": { tint: "sky", hero: ["bowl", { fill: "#cfe8ee", w: 250, body: "#c9962c" }], left: "cucumber", right: "cottonPads", frontRight: "ice", backRight: "mint" },
  "home-remedies-for-stye": { tint: "sky", hero: ["bowl", { fill: "#dcecef", steamOn: true, w: 240, float: "leaves" }], left: "cloth", right: "cottonPads", backLeft: "tulsi" },
  "home-remedies-for-burning-eyes": { tint: "sky", hero: ["glass", { liquid: "#eaf4f7", fill: 0.65 }], left: "cucumber", right: ["bowl", { fill: GHEE, w: 180 }], frontLeft: "cottonPads" },
  "home-remedies-for-red-eyes": { tint: "sky", hero: ["bowl", { fill: "#cfe8ee", w: 250, float: "petals" }], left: "cottonPads", right: "cucumber", frontLeft: "rosePetals", frontRight: "ice" },
  "home-remedies-for-conjunctivitis": { tint: "sky", hero: ["bowl", { fill: "#dcecef", w: 250, body: "#8f9ea3", steamOn: true }], left: "cottonPads", right: "cloth", backLeft: "neem" },
  "home-remedies-for-watery-eyes": { tint: "sky", hero: ["bowl", { fill: "#dcecef", steamOn: true, w: 240, body: "#c9962c", float: "leaves" }], left: "cloth", right: "cottonPads", backRight: "tulsi" },
  "home-remedies-for-eye-twitching": { tint: "sky", extra: "moon", hero: ["cup", { liquid: "#e9d9a8", band: "#5f95a6" }], left: "cloth", right: "almonds", frontRight: "banana" },

  // ── Sleep & stress ────────────────────────────────────────
  "home-remedies-for-insomnia": { tint: "lavender", extra: "moon", hero: ["brassCup", { liquid: MILK }], left: "nutmeg", right: "almonds", frontLeft: "cardamom" },
  "home-remedies-for-snoring": { tint: "lavender", extra: "moon", hero: ["bowl", { fill: "#dde6f0", steamOn: true, w: 240, float: "leaves" }], left: "pillow", backRight: "eucalyptus", frontRight: "salt" },
  "home-remedies-for-anxiety": { tint: "lavender", extra: "moon", hero: "teapot", left: ["cup", { liquid: "#c9d98a", band: "#7a6fb0" }], right: "tulsi", backLeft: "brahmi" },
  "home-remedies-for-stress-relief": { tint: "lavender", hero: ["bottle", { liquid: OIL }], left: ["cup", { liquid: "#efe0bb", band: "#7a6fb0" }], right: "cardamom", backRight: "brahmi" },
  "home-remedies-for-restless-legs": { tint: "lavender", extra: "moon", hero: ["basin", { petals: true }], left: ["bottle", { liquid: OIL }], right: "dates" },
  "home-remedies-for-waking-up-at-night": { tint: "lavender", extra: "moon", hero: ["cup", { liquid: "#f3ead8", band: "#7a6fb0" }], left: "almonds", right: "cardamom", frontRight: "sesame" },
  "home-remedies-for-feeling-sleepy-after-lunch": { tint: "lavender", extra: "sun", hero: ["glass", { liquid: "#f4f1e4", mint: true }], left: "lemon", right: "cumin", backLeft: "mint" },
  "home-remedies-for-teeth-grinding": { tint: "lavender", extra: "moon", hero: ["cup", { liquid: MILK, band: "#7a6fb0" }], left: "cloth", right: ["bottle", { liquid: OIL }] },

  // ── Batch 2: sleep & stress + kids' health ────────────────
  "home-remedies-for-exam-stress": { tint: "lavender", extra: "moon", hero: ["cup", { liquid: MILK, band: "#7a6fb0" }], left: ["bowl", { fill: "#e9d6b4", w: 190, kind: "seeds", dots: "#b07a4a" }], right: "walnuts", backRight: "brahmi", frontRight: "almonds" },
  "home-remedies-for-low-mood": { tint: "lavender", extra: "sun", hero: ["brassCup", { liquid: "#f3cf7a" }], left: "orange", right: "walnuts", backLeft: "tulsi", frontRight: "saffron" },
  "home-remedies-for-cough-in-kids": { tint: "peach", hero: ["cup", { liquid: "#f1dca0", band: "#e08a5a" }], left: "honeyDipper", right: ["bowl", { fill: "#cdb48a", kind: "seeds", dots: "#7a5a36", w: 180 }], backLeft: "tulsi" },
  "home-remedies-for-constipation-in-kids": { tint: "peach", hero: ["bowl", { fill: "#e9d6b4", kind: "seeds", dots: "#8a4f5f", w: 230 }], left: "banana", right: "apple", frontLeft: "raisins", backRight: ["glass", { liquid: "#eef3f4", fill: 0.7 }] },
  "home-remedies-for-teething-in-babies": { tint: "peach", hero: ["bowl", { fill: "#f4e7b8", w: 230 }], left: "cucumber", right: "cloth", frontRight: "ice", backLeft: "banana" },
  "home-remedies-for-diaper-rash": { tint: "peach", hero: ["bowl", { fill: "#f6f0dc", w: 220, body: "#e2c9a8" }], left: "coconut", right: "cottonPads", frontRight: ["cloth", { color: "#fbeee4", stripe: "#e08a5a" }] },
  "home-remedies-for-colic-in-babies": { tint: "peach", hero: ["bowl", { fill: GHEE, w: 220, steamOn: true, body: "#c9962c" }], left: "ajwain", right: ["cloth", { color: "#fbeee4", stripe: "#e08a5a" }], frontLeft: "coconut" },
  "home-remedies-for-loose-motions-in-kids": { tint: "peach", hero: ["glass", { liquid: "#f3f1e2", lemon: true }], left: ["bowl", { fill: "#e9cf7a", kind: "seeds", dots: "#b8932a", w: 210 }], right: "banana", frontRight: ["bowl", { fill: "#f7f3ea", w: 160 }] },
  "home-remedies-for-fever-in-kids": { tint: "peach", hero: ["bowl", { fill: "#eed79a", kind: "soup", w: 230, steamOn: true }], left: ["glass", { liquid: "#eef3f4", fill: 0.7 }], right: ["cloth", { color: "#e8eef0", stripe: "#e08a5a" }], backRight: "tulsi" },
  "home-remedies-for-poor-appetite-in-kids": { tint: "peach", hero: ["plate", { rim: "#e08a5a" }], left: "carrot", right: "apple", frontRight: ["bowl", { fill: "#f7f3ea", w: 160 }], backLeft: ["glass", { liquid: "#f3f1e2", lemon: true }] },
  "how-to-boost-immunity-in-kids": { tint: "peach", hero: ["jar", { fill: "#6b3a22", lid: "#e08a5a" }], left: "amla", right: "orange", frontLeft: "almonds", frontRight: ["bowl", { fill: "#f7f3ea", w: 160 }] },
  "home-remedies-for-bedwetting": { tint: "peach", extra: "moon", hero: "pillow", left: ["glass", { liquid: "#eef3f4", fill: 0.5 }], right: ["bowl", { fill: "#e9d6b4", kind: "seeds", dots: "#8a4f5f", w: 170 }] },

  // ── Batch 2: hair care ────────────────────────────────────
  "home-remedies-for-frizzy-hair": { tint: "leaf", hero: ["bowl", { fill: "#eef2dc", w: 230 }], left: "coconut", right: "aloe", frontRight: "hibiscus", backLeft: ["jar", { fill: OIL, lid: "#5b8a4a" }] },
  "home-remedies-for-hair-breakage": { tint: "leaf", hero: ["bowl", { fill: "#d9b95a", kind: "seeds", dots: "#a0781e", w: 230 }], left: ["bowl", { fill: "#f7f3ea", w: 170 }], right: "amla", backRight: ["bottle", { liquid: OIL }] },
  "home-remedies-for-patchy-hair-loss": { tint: "leaf", hero: ["bowl", { fill: "#efe6d6", w: 220 }], left: "onion", right: ["bottle", { liquid: OIL }], backLeft: "curryLeaves" },
  "home-remedies-for-beard-growth": { tint: "leaf", hero: ["bottle", { liquid: "#e9cf7a" }], left: "coconut", right: "almonds", frontRight: "curryLeaves" },
  "home-remedies-for-eyebrow-growth": { tint: "leaf", hero: ["bottle", { liquid: "#ecd689", w: 90, h: 200 }], left: "coconut", right: "cottonPads", frontRight: "almonds" },
  "home-remedies-for-eyelash-growth": { tint: "leaf", hero: ["bottle", { liquid: "#ecd689", w: 90, h: 200 }], left: "cottonPads", right: "coconut", frontRight: "rosePetals" },
  "home-remedies-for-dull-hair": { tint: "leaf", hero: ["glass", { liquid: "#d9587a", fill: 0.7 }], left: "hibiscus", right: ["bowl", { fill: "#f7f3ea", w: 180 }], frontRight: "honeyDipper" },
  "home-remedies-for-hard-water-hair-damage": { tint: "leaf", hero: ["glass", { liquid: "#e8f3f6", fill: 0.75 }], left: "lemon", right: ["bottle", { liquid: OIL }], frontRight: ["bowl", { fill: "#9c7a4e", kind: "powder", dots: "#6b4a2e", w: 170 }] },

  // ── Batch 2: skin care ────────────────────────────────────
  "home-remedies-for-back-acne": { tint: "rose", hero: ["basin", { brass: true }], left: ["bowl", { fill: "#c9a77a", kind: "powder", dots: "#9c7a4e", w: 190 }], right: "roseWater", frontLeft: "turmeric", backLeft: "neem" },
  "home-remedies-for-eczema": { tint: "rose", hero: ["bowl", { fill: "#eadcc0", kind: "seeds", dots: "#c7b08a", w: 230 }], left: "coconut", right: "aloe", frontRight: "cloth", backRight: ["jar", { fill: "#f6f1e2", lid: "#c46a7a" }] },
  "home-remedies-for-skin-rashes": { tint: "rose", hero: ["bowl", { fill: "#dff0d6", w: 230 }], left: "aloe", right: "roseWater", frontLeft: "sandalwood", frontRight: "cloth" },
  "home-remedies-for-mosquito-bites": { tint: "rose", hero: ["bowl", { fill: "#dff0d6", w: 220, body: "#8f9ea3" }], left: "aloe", right: ["bottle", { liquid: "#b9a24a", w: 90, h: 200 }], frontRight: "ice", frontLeft: "honeyDipper", backRight: "neem" },
  "home-remedies-for-hives": { tint: "rose", hero: ["bowl", { fill: "#eadcc0", kind: "seeds", dots: "#c7b08a", w: 230 }], left: "cloth", right: "aloe", frontLeft: "ice", backRight: ["glass", { liquid: "#eef6f2", mint: true }] },

  // ── Batch 3: stomach problems ─────────────────────────────
  "home-remedies-for-vomiting": { tint: "turmeric", hero: ["glass", { liquid: "#f3f1e2", lemon: true }], left: ["cup", { liquid: "#e9d6a0", band: "#c9962c" }], right: "ginger", frontRight: "cardamom" },
  "home-remedies-for-loss-of-appetite": { tint: "turmeric", hero: ["glass", { liquid: "#e8d9a8", fill: 0.7 }], left: "ginger", right: ["cup", { liquid: "#f4f1e6", band: "#c9962c", steamOn: false }], frontLeft: "lemonSlice", frontRight: "cumin" },
  "home-remedies-for-gastritis": { tint: "turmeric", hero: ["bowl", { fill: "#f7f3ea", kind: "seeds", dots: "#e0d6c0", w: 230 }], left: "greenCoconut", right: ["glass", { liquid: "#eef0d6", fill: 0.7 }], frontRight: "fennel" },
  "home-remedies-for-stomach-cramps": { tint: "turmeric", hero: "hotWaterBag", left: ["cup", { liquid: "#e3cf96", band: "#c9962c" }], right: ["bowl", { fill: OIL, w: 170, body: "#c9962c" }], frontLeft: "ajwain", frontRight: "fennel" },
  "home-remedies-for-stomach-infection": { tint: "turmeric", hero: ["bowl", { fill: "#f4efe0", w: 240, steamOn: true }], left: ["glass", { liquid: "#f3f1e2", lemon: true }], right: "banana", frontRight: ["bowl", { fill: "#f7f3ea", w: 160 }] },
  "home-remedies-for-stomach-heat": { tint: "turmeric", hero: ["glass", { liquid: "#eef6ea", mint: true }], left: "greenCoconut", right: ["jar", { fill: "#b8405a", lid: "#c9962c" }], frontRight: "fennel", backLeft: "rose" },
  "home-remedies-for-gas-in-chest": { tint: "turmeric", hero: ["cup", { liquid: "#e3cf96", band: "#c9962c" }], left: "ajwain", right: ["bowl", { fill: "#efe3c4", kind: "powder", dots: "#cdb98a", w: 170 }], frontLeft: "cumin", frontRight: "lemon" },
  "home-remedies-for-motion-sickness": { tint: "turmeric", hero: ["glass", { liquid: "#eef6f2", mint: true }], left: "ginger", right: "lemon", frontRight: "cardamom", frontLeft: "lemonSlice" },

  // ── Batch 3: cold & cough ─────────────────────────────────
  "home-remedies-for-blocked-nose": { tint: "ice", hero: ["bowl", { fill: "#dcecef", steamOn: true, w: 250, body: "#c9962c", float: "leaves" }], left: "cloth", right: "salt", frontLeft: "ajwain", backRight: "eucalyptus" },
  "home-remedies-for-post-viral-cough": { tint: "ice", hero: ["cup", { liquid: "#f1dca0", band: "#5f95a6" }], left: "honeyDipper", right: ["brassCup", { liquid: "#f3cf7a", steamOn: false }], frontLeft: "mulethi", backRight: "tulsi" },
  "home-remedies-for-blocked-ears-after-cold": { tint: "ice", hero: ["bowl", { fill: "#dcecef", steamOn: true, w: 240, float: "leaves" }], left: "hotWaterBag", right: ["glass", { liquid: "#eef3f4", fill: 0.65 }], frontLeft: "cloth", backRight: "tulsi" },
  "home-remedies-for-cold-in-elderly": { tint: "ice", hero: "teapot", left: ["cup", { liquid: "#c9b56a", band: "#5f95a6" }], right: ["bowl", { fill: "#e9c77a", kind: "soup", w: 190, steamOn: true }], frontRight: "ginger", backLeft: "tulsi" },
  "home-remedies-for-cold-and-cough-in-monsoon": { tint: "ice", hero: ["cup", { liquid: "#b9884a", band: "#5f95a6" }], left: "ginger", right: "cinnamon", frontRight: "blackPepper", backLeft: "tulsi" },
  "home-remedies-for-itchy-throat": { tint: "ice", hero: ["glass", { liquid: "#f1f4f4", fill: 0.7 }], left: "honeyDipper", right: "ginger", frontLeft: "mulethi", frontRight: "salt" },

  // ── Batch 3: joint pain ───────────────────────────────────
  "home-remedies-for-leg-pain": { tint: "sand", hero: ["basin", { petals: true }], left: ["bottle", { liquid: OIL }], right: "salt", frontRight: "cloth" },
  "home-remedies-for-ankle-pain": { tint: "sand", hero: ["basin", { brass: true }], left: ["bowl", { fill: "#e6a827", w: 180 }], right: "ice", frontLeft: "turmeric", frontRight: "cloth" },
  "home-remedies-for-elbow-pain": { tint: "sand", hero: ["cup", { liquid: "#e8b64c", band: "#b8643c" }], left: ["bottle", { liquid: OIL }], right: "ice", frontLeft: "ginger", frontRight: "turmeric" },
  "home-remedies-for-hip-pain": { tint: "sand", hero: "hotWaterBag", left: ["bottle", { liquid: "#ecd689" }], right: "pillow", frontRight: "cloth" },
  "home-remedies-for-finger-joint-pain": { tint: "sand", hero: ["bowl", { fill: "#dcecef", w: 250, body: "#c9962c" }], left: ["bottle", { liquid: OIL }], right: ["cup", { liquid: "#e8b64c", band: "#b8643c" }], frontRight: "turmeric" },
  "home-remedies-for-tailbone-pain": { tint: "sand", hero: "pillow", left: "hotWaterBag", right: ["bottle", { liquid: OIL }], frontRight: "ice" },
  "home-remedies-for-morning-stiffness": { tint: "sand", extra: "sun", hero: ["cup", { liquid: "#e8b64c", band: "#b8643c" }], left: "pillow", right: ["bottle", { liquid: OIL }], frontLeft: "ginger", frontRight: "turmeric" },
  "home-remedies-for-burning-feet": { tint: "sand", hero: ["basin", { water: "#d4ece6" }], left: ["jar", { fill: GHEE, lid: "#b8643c" }], right: "coconut", frontRight: "cloth", backLeft: "mint" },

  // ── Batch 3: skin care ────────────────────────────────────
  "home-remedies-for-boils": { tint: "rose", hero: ["bowl", { fill: "#dcecef", w: 240, steamOn: true }], left: "cloth", right: ["bowl", { fill: "#e6a827", w: 170 }], frontRight: "turmeric", backLeft: "neem" },
  "home-remedies-for-brittle-nails": { tint: "rose", hero: ["bowl", { fill: OIL, w: 220, body: "#c9962c" }], left: "coconut", right: "banana", frontLeft: "almonds", frontRight: "cottonPads" },
  "home-remedies-for-corns-on-feet": { tint: "rose", hero: ["basin", { brass: true }], left: "salt", right: "coconut", frontRight: "cloth" },
};
