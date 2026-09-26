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
};
