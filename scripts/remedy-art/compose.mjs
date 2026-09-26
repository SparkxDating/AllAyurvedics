import * as L from "./lib.mjs";

const { T } = L;

/** Soft background palettes (blob, accent blob, decor colours) */
export const TINTS = {
  mint: { blob: "#dcebdf", blob2: "#eaf3e4", decor: ["#8fb58a", "#c7dcb9", "#e0a526"] },
  lavender: { blob: "#e6e2f2", blob2: "#f0edf7", decor: ["#a39bd0", "#cfc9ea", "#f3d27a"] },
  sky: { blob: "#dcebf1", blob2: "#ebf4f6", decor: ["#8ab7c4", "#c3dde5", "#e0a526"] },
  peach: { blob: "#f8e1d3", blob2: "#fbece2", decor: ["#e8a987", "#f3cdb8", "#8fb58a"] },
  leaf: { blob: "#e2ecd6", blob2: "#eef4e6", decor: ["#8fb58a", "#c7dcb9", "#b8643c"] },
  rose: { blob: "#f5dfd8", blob2: "#faece7", decor: ["#e6a08e", "#f1c9bd", "#8fb58a"] },
  turmeric: { blob: "#f7e7bf", blob2: "#fbf0d6", decor: ["#e0a526", "#f3d68c", "#8fb58a"] },
  ice: { blob: "#e0edf0", blob2: "#edf5f6", decor: ["#8ab7c4", "#c3dde5", "#8fb58a"] },
  sand: { blob: "#efe4d2", blob2: "#f6eee2", decor: ["#c9a06a", "#e3d0b0", "#8fb58a"] },
  lime: { blob: "#e5efcf", blob2: "#f0f5e2", decor: ["#a9c46a", "#d3e3a8", "#e08a5c"] },
  blush: { blob: "#f6dfe4", blob2: "#faecef", decor: ["#e39aab", "#f2c8d2", "#8fb58a"] },
  sun: { blob: "#f8e9c8", blob2: "#fbf2dc", decor: ["#e0a526", "#f3d68c", "#e08a5c"] },
};

const C = {
  cup: L.cup, brassCup: L.brassCup, glass: L.glass, bowl: L.bowl, jar: L.jar, bottle: L.bottle, roseWater: L.roseWater,
  teapot: L.teapot, basin: L.basin, cloth: L.cloth, pillow: L.pillow, hotWaterBag: L.hotWaterBag, plate: L.plate,
  spoon: L.spoon, mortar: L.mortar, dumbbell: L.dumbbell, cottonPads: L.cottonPads, scraper: L.scraper, twig: L.twig,
  turmeric: L.turmericRoot, ginger: L.gingerRoot, lemon: L.lemon, lime: L.lime, orange: L.orange, garlic: L.garlic,
  onion: L.onion, clove: L.clove, cardamom: L.cardamom, cinnamon: L.cinnamon, mulethi: L.mulethi, fennel: L.fennel,
  ajwain: L.ajwain, cumin: L.cumin, methi: L.methi, sesame: L.sesame, flaxseed: L.flaxseed, blackPepper: L.blackPepper,
  salt: L.saltPile, saffron: L.saffron, nutmeg: L.nutmeg, coconut: L.coconut, greenCoconut: L.greenCoconut, aloe: L.aloe,
  cucumber: L.cucumber, banana: L.banana, amla: L.amla, apple: L.apple, pomegranate: L.pomegranate, dates: L.dates,
  almonds: L.almonds, walnuts: L.walnuts, raisins: L.raisins, chana: L.chana, carrot: L.carrot, watermelon: L.watermelon,
  papaya: L.papaya, mushroom: L.mushroom, hibiscus: L.hibiscus, rose: L.rose, rosePetals: L.rosePetals, ice: L.iceCubes,
  jaggery: L.jaggery, laddoos: L.laddoos, alum: L.alum, sandalwood: L.sandalwood, tulsi: L.tulsi, neem: L.neem,
  mint: L.mint, curryLeaves: L.curryLeaves, eucalyptus: L.eucalyptus, brahmi: L.brahmi, lemonSlice: L.lemonSlice,
  honeyDipper: L.honeyDipper, roundFruit: L.roundFruit, makhana: L.makhana,
};

const item = (spec) => {
  if (!spec) return "";
  const [name, opts] = Array.isArray(spec) ? spec : [spec, undefined];
  const fn = C[name];
  if (!fn) throw new Error(`Unknown art component: ${name}`);
  return fn(opts);
};

// slot: x, y, scale, rotation
const SLOTS = {
  hero: [600, 640, 1.45, 0],
  left: [322, 660, 1.12, 0],
  right: [884, 660, 1.12, 0],
  frontLeft: [428, 742, 0.95, 0],
  frontRight: [780, 746, 0.95, 0],
  backLeft: [405, 610, 1.05, -24],
  backRight: [800, 610, 1.05, 24],
};
/** Upright sprigs lean in the back slots; vessels in back slots stay straight */
const SPRIGS = new Set(["tulsi", "neem", "mint", "curryLeaves", "eucalyptus", "brahmi"]);

function blob(cx, cy, r, color, seed) {
  const rand = L.rng(seed);
  const n = 7;
  const pts = Array.from({ length: n }, (_, i) => {
    const a = (i / n) * Math.PI * 2 + 0.3;
    const rr = r * (0.9 + rand() * 0.18);
    return [cx + Math.cos(a) * rr * 1.25, cy + Math.sin(a) * rr * 0.9];
  });
  // closed Catmull-Rom → cubic Bézier
  let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n], p1 = pts[i], p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
  }
  return `<path d="${d} Z" fill="${color}"/>`;
}

function decor(tint, seed, extra) {
  const rand = L.rng(seed + "decor");
  let s = "";
  const spots = [[110, 130], [1080, 150], [150, 420], [1060, 430], [240, 250], [980, 290], [90, 690], [1110, 700], [560, 90], [700, 120]];
  spots.forEach(([x, y], i) => {
    const jx = x + (rand() - 0.5) * 60, jy = y + (rand() - 0.5) * 50;
    const col = tint.decor[i % tint.decor.length];
    if (i % 3 === 0) s += T(jx, jy, 0.28 + rand() * 0.12, Math.round(rand() * 360), L.leaf(col));
    else if (i % 3 === 1) s += `<circle cx="${jx.toFixed(0)}" cy="${jy.toFixed(0)}" r="${(5 + rand() * 7).toFixed(1)}" fill="${col}" opacity="0.7"/>`;
    else s += T(jx, jy, 0.22 + rand() * 0.1, Math.round(rand() * 360), `<path d="M0 -30c16 0 30 14 30 30s-14 30 -30 30" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round"/>`);
  });
  if (extra === "moon") s += T(1010, 190, 0.9, 0, L.moon());
  if (extra === "sun") s += T(1030, 170, 0.9, 0, L.sun());
  return s;
}

/**
 * scene: { tint, hero, left, right, frontLeft, frontRight, backLeft, backRight, extra: "moon"|"sun" }
 * Returns a 1200×800 SVG string.
 */
export function composeScene(slug, scene) {
  L.resetIds();
  const tint = TINTS[scene.tint] ?? TINTS.sand;
  const place = (slot) => {
    const spec = scene[slot];
    if (!spec) return "";
    const [x, y, s, r] = SLOTS[slot];
    const name = Array.isArray(spec) ? spec[0] : spec;
    const rot = SPRIGS.has(name) ? r : 0;
    const back = slot.startsWith("back") && !SPRIGS.has(name);
    const o = scene.offsets?.[slot] ?? {};
    return T(x + (o.x ?? 0) + (back ? (slot === "backLeft" ? -40 : 40) : 0), y + (o.y ?? 0) - (back ? 30 : 0), s * (o.s ?? 1) * (back ? 0.8 : 1), rot + (o.r ?? 0), item(spec));
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<defs>
  <filter id="soft" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
  <filter id="grain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.33  0 0 0 0 0.2  0 0 0 0.55 0"/><feComposite in2="SourceGraphic" operator="in"/></filter>
  <radialGradient id="vignette" cx="0.5" cy="0.45" r="0.75"><stop offset="0.6" stop-color="#fbf6ec" stop-opacity="0"/><stop offset="1" stop-color="#eadfca" stop-opacity="0.55"/></radialGradient>
</defs>
<rect width="1200" height="800" fill="#fbf6ec"/>
${blob(600, 430, 350, tint.blob, slug)}
${blob(820, 250, 120, tint.blob2, slug + "b")}
${blob(330, 600, 110, tint.blob2, slug + "c")}
${decor(tint, slug, scene.extra)}
<ellipse cx="600" cy="700" rx="500" ry="52" fill="#e9dcc6" opacity="0.55"/>
<g transform="translate(600 690) scale(1.2) translate(-600 -690)">
<ellipse cx="600" cy="652" rx="250" ry="40" fill="#efe2c8"/><ellipse cx="600" cy="652" rx="228" ry="33" fill="none" stroke="#d8c3a0" stroke-width="3" stroke-dasharray="2 9" stroke-linecap="round"/>
${place("backLeft")}${place("backRight")}${place("hero")}${place("left")}${place("right")}${place("frontLeft")}${place("frontRight")}
</g>
<rect width="1200" height="800" fill="url(#vignette)"/>
<rect width="1200" height="800" fill="#fff" filter="url(#grain)" opacity="0.35"/>
</svg>`;
}
