/**
 * Flat, warm "kitchen still-life" illustration kit for remedy hero images.
 * Every component draws around its own origin; standing objects sit on y = 0.
 * No text, faces, brands or medical imagery.
 */

let uid = 0;
const id = (p) => `${p}${++uid}`;
export const resetIds = () => (uid = 0);

export const T = (x, y, s = 1, r = 0, inner = "") =>
  `<g transform="translate(${x} ${y}) rotate(${r}) scale(${s})">${inner}</g>`;

// ── colour helpers ─────────────────────────────────────────────────────────────
function hex(c) {
  const n = parseInt(c.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}
export function shade(c, amt) {
  const [r, g, b] = hex(c);
  const f = (v) => Math.max(0, Math.min(255, Math.round(amt < 0 ? v * (1 + amt) : v + (255 - v) * amt)));
  return `#${[f(r), f(g), f(b)].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
}
function lin(c1, c2, vertical = true) {
  const i = id("g");
  return {
    id: i,
    def: `<linearGradient id="${i}" x1="0" y1="0" x2="${vertical ? 0 : 1}" y2="${vertical ? 1 : 0}"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>`,
  };
}
function rad(c1, c2) {
  const i = id("r");
  return {
    id: i,
    def: `<radialGradient id="${i}" cx="0.38" cy="0.35" r="0.75"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`,
  };
}

// deterministic random
export function rng(seed) {
  let h = 2166136261;
  for (const ch of String(seed)) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const shadow = (w, h = w * 0.16, o = 0.16) =>
  `<ellipse cx="0" cy="${h * 0.15}" rx="${w / 2}" ry="${h / 2}" fill="#6b4a2e" opacity="${o}" filter="url(#soft)"/>`;

const steamPath = (x, h, s = 1) =>
  `<path d="M${x} 0c-14 -${h * 0.18} 14 -${h * 0.35} 0 -${h * 0.52}s14 -${h * 0.34} 0 -${h * 0.5}" fill="none" stroke="#fff" stroke-width="${7 * s}" stroke-linecap="round" opacity="0.85"/>`;
export const steam = (w = 120, h = 150) =>
  `<g opacity="0.9">${steamPath(-w * 0.28, h * 0.85, 0.9)}${steamPath(0, h)}${steamPath(w * 0.28, h * 0.8, 0.9)}</g>`;

// ── vessels ────────────────────────────────────────────────────────────────────
/** Ceramic cup with saucer. liquid: colour of drink. */
export function cup({ body = "#f4efe6", band = "#5b8a4a", liquid = "#e8b64c", steamOn = true, garnish = "" } = {}) {
  const g1 = lin(shade(body, 0.2), shade(body, -0.12), false);
  const lq = rad(shade(liquid, 0.25), shade(liquid, -0.15));
  return `<defs>${g1.def}${lq.def}</defs>${shadow(300, 46)}
  <ellipse cx="0" cy="-6" rx="150" ry="26" fill="${shade(body, -0.18)}"/><ellipse cx="0" cy="-12" rx="150" ry="24" fill="${shade(body, 0.1)}"/>
  <ellipse cx="0" cy="-14" rx="92" ry="12" fill="${shade(body, -0.12)}"/>
  <path d="M95 -130c52 -6 66 52 10 72" fill="none" stroke="${shade(body, -0.1)}" stroke-width="16" stroke-linecap="round"/>
  <path d="M-105 -150h210c-4 78 -40 130 -105 132c-65 -2 -101 -54 -105 -132z" fill="url(#${g1.id})"/>
  <path d="M-102 -112h204c-2 8 -3 14 -5 20h-194c-2 -6 -4 -12 -5 -20z" fill="${band}" opacity="0.9"/>
  <ellipse cx="0" cy="-150" rx="105" ry="22" fill="${shade(body, -0.08)}"/>
  <ellipse cx="0" cy="-148" rx="94" ry="17" fill="url(#${lq.id})"/>
  <ellipse cx="-30" cy="-152" rx="30" ry="5" fill="#fff" opacity="0.25"/>
  ${garnish}
  <path d="M-80 -135c4 50 20 86 44 100" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.35"/>
  ${steamOn ? T(0, -175, 1, 0, steam()) : ""}`;
}

/** Brass / kansa tumbler (lota-style) */
export function brassCup({ liquid = "#f3e3b5", steamOn = true } = {}) {
  const g1 = lin("#f1c75b", "#a8741c", false);
  const lq = rad(shade(liquid, 0.3), shade(liquid, -0.12));
  return `<defs>${g1.def}${lq.def}</defs>${shadow(210, 36)}
  <path d="M-80 -220h160l-18 205c-2 10 -10 15 -20 15h-84c-10 0 -18 -5 -20 -15z" fill="url(#${g1.id})"/>
  <path d="M-74 -150h148" stroke="#8c5e12" stroke-width="4" opacity="0.35"/><path d="M-70 -110h140" stroke="#8c5e12" stroke-width="3" opacity="0.25"/>
  <ellipse cx="0" cy="-220" rx="80" ry="16" fill="#c9962c"/><ellipse cx="0" cy="-219" rx="70" ry="12" fill="url(#${lq.id})"/>
  <path d="M-52 -200l12 170" stroke="#fff6d8" stroke-width="10" stroke-linecap="round" opacity="0.45"/>
  ${steamOn ? T(0, -240, 0.8, 0, steam()) : ""}`;
}

/** Tall glass with drink */
export function glass({ liquid = "#f6e08a", fill = 0.72, lemon = false, mint = false, ice = false, straw = false } = {}) {
  const h = 250;
  const top = -h + h * (1 - fill);
  const lq = lin(shade(liquid, 0.2), shade(liquid, -0.1));
  return `<defs>${lq.def}</defs>${shadow(170, 30)}
  <path d="M-70 ${-h}h140l-12 ${h - 8}c-1 6 -6 8 -12 8h-92c-6 0 -11 -2 -12 -8z" fill="#ffffff" opacity="0.55" stroke="#d9cfc0" stroke-width="3"/>
  <path d="M${-70 + 12 * (1 - fill) * 0.2} ${top}h${140 - 24 * (1 - fill) * 0.2}l${-12 + 12 * (1 - fill) * 0.2} ${-top - 8}c-1 6 -6 8 -12 8h-92c-6 0 -11 -2 -12 -8z" fill="url(#${lq.id})" opacity="0.9"/>
  <ellipse cx="0" cy="${top}" rx="${69 - 10 * (1 - fill) * 0.2}" ry="9" fill="${shade(liquid, 0.3)}"/>
  ${ice ? `<rect x="-40" y="${top - 6}" width="34" height="30" rx="7" fill="#fff" opacity="0.55" transform="rotate(-12 -23 ${top + 9})"/><rect x="6" y="${top + 2}" width="30" height="28" rx="7" fill="#fff" opacity="0.5" transform="rotate(10 21 ${top + 16})"/>` : ""}
  ${straw ? `<path d="M22 ${top + 60}L58 ${-h - 50}" stroke="#e08a5c" stroke-width="10" stroke-linecap="round"/>` : ""}
  ${lemon ? T(58, -h + 4, 0.55, 0, lemonSlice()) : ""}
  ${mint ? T(-30, top - 4, 0.55, -20, leafSprig({ color: "#4f9a57", leaves: 4 })) : ""}
  <path d="M-52 ${-h + 20}l8 ${h - 50}" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="0.5"/>`;
}

/** Bowl with contents: kind = smooth | seeds | leaves | powder | soup */
export function bowl({ body = "#b8643c", fill = "#f3ead8", kind = "smooth", dots = "#6b4a2e", w = 230, steamOn = false, garnish = "", float = "" } = {}) {
  garnish += floaters(float, w);
  const g1 = lin(shade(body, 0.12), shade(body, -0.22));
  const r = rng(body + fill + kind + w);
  let tex = "";
  if (kind === "seeds" || kind === "powder") {
    for (let i = 0; i < (kind === "seeds" ? 60 : 26); i++) {
      const a = r() * Math.PI * 2, d = Math.sqrt(r()) * 0.9;
      const x = Math.cos(a) * d * (w / 2 - 14), y = -w * 0.34 + Math.sin(a) * d * (w * 0.1);
      tex += kind === "seeds"
        ? `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="5" ry="2.6" fill="${dots}" transform="rotate(${Math.round(r() * 180)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`
        : `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(1.5 + r() * 2).toFixed(1)}" fill="${dots}" opacity="0.5"/>`;
    }
  }
  if (kind === "soup") {
    for (let i = 0; i < 9; i++) {
      const x = (r() - 0.5) * (w - 70), y = -w * 0.34 + (r() - 0.5) * w * 0.12;
      tex += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(5 + r() * 6).toFixed(1)}" fill="${i % 2 ? "#5b8a4a" : "#e0a526"}" opacity="0.85"/>`;
    }
  }
  const mound = kind === "seeds" || kind === "powder" ? `<path d="M${-w / 2 + 12} ${-w * 0.34}q${w / 2 - 12} ${-w * 0.2} ${w - 24} 0z" fill="${fill}"/>` : "";
  return `<defs>${g1.def}</defs>${shadow(w * 1.15, w * 0.2)}
  <path d="M${-w / 2} ${-w * 0.34}h${w}c-4 ${w * 0.22} -${w * 0.2} ${w * 0.34} -${w / 2} ${w * 0.34}s-${w / 2 - 4} -${w * 0.12} -${w / 2} -${w * 0.34}z" fill="url(#${g1.id})"/>
  <rect x="-${w * 0.18}" y="-6" width="${w * 0.36}" height="8" rx="4" fill="${shade(body, -0.3)}"/>
  <ellipse cx="0" cy="${-w * 0.34}" rx="${w / 2}" ry="${w * 0.11}" fill="${shade(body, -0.1)}"/>
  <ellipse cx="0" cy="${-w * 0.34 + 2}" rx="${w / 2 - 10}" ry="${w * 0.09}" fill="${fill}"/>
  ${mound}${tex}${garnish}
  <path d="M${-w * 0.38} ${-w * 0.26}c10 ${w * 0.12} 30 ${w * 0.2} 60 ${w * 0.24}" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round" opacity="0.28"/>
  ${steamOn ? T(0, -w * 0.42, 0.8, 0, steam()) : ""}`;
}

/** Small things floating on a bowl's surface: petals | leaves | lemon | flowers */
function floaters(kind, w) {
  if (!kind) return "";
  const y = -w * 0.34 + 2;
  const spots = [[-w * 0.22, y - 4, 20], [w * 0.05, y + 6, -35], [w * 0.24, y - 3, 60], [-w * 0.02, y - 10, 140]];
  return spots
    .map(([x, yy, r], i) => {
      if (kind === "petals") return T(x, yy, 0.42, r + 90, `<path d="M0 0c-30 -14 -34 -60 -4 -70c16 -4 34 8 26 30z" fill="${i % 2 ? "#ef8fa2" : "#e56f86"}"/>`);
      if (kind === "leaves") return T(x, yy, 0.2, r + 90, leaf(i % 2 ? "#4f7d3f" : "#6a9a4a"));
      if (kind === "lemon") return i < 2 ? T(x * 1.2, yy, 0.42, 0, lemonSlice()) : "";
      if (kind === "flowers") return T(x, yy, 0.3, r, `<g>${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-16" rx="9" ry="16" fill="#f6c343" transform="rotate(${a})"/>`).join("")}<circle r="8" fill="#e08a1e"/></g>`);
      return "";
    })
    .join("");
}

/** Glass jar (honey, ghee, oil, chyawanprash…) */
export function jar({ fill = "#e9a53a", lid = "#5b8a4a", w = 150, h = 190, dipper = false, cloth = true } = {}) {
  const f = lin(shade(fill, 0.18), shade(fill, -0.2));
  return `<defs>${f.def}</defs>${shadow(w * 1.2, 34)}
  <rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="26" fill="#fff" opacity="0.5" stroke="#d9cfc0" stroke-width="3"/>
  <rect x="${-w / 2 + 8}" y="${-h * 0.78}" width="${w - 16}" height="${h * 0.78 - 8}" rx="20" fill="url(#${f.id})"/>
  <rect x="${-w / 2 - 6}" y="${-h - 34}" width="${w + 12}" height="40" rx="10" fill="${lid}"/>
  ${cloth ? `<path d="M${-w / 2 - 14} ${-h - 10}q${w / 2 + 14} 40 ${w + 28} 0l-10 26q-${w / 2 + 4} 26 -${w + 8} 0z" fill="#f4e7cf" stroke="#d8c3a0" stroke-width="2"/><path d="M${-w / 2 - 4} ${-h + 6}q${w / 2 + 4} 22 ${w + 8} 0" stroke="#b8643c" stroke-width="4" fill="none"/>` : ""}
  <path d="M${-w / 2 + 20} ${-h * 0.7}v${h * 0.55}" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="0.45"/>
  ${dipper ? T(w / 2 + 34, -18, 1, 28, honeyDipper()) : ""}`;
}

/** Oil bottle with cork */
export function bottle({ liquid = "#e0b43a", w = 110, h = 240, label = "#f4ead7" } = {}) {
  const f = lin(shade(liquid, 0.25), shade(liquid, -0.15), false);
  return `<defs>${f.def}</defs>${shadow(w * 1.3, 30)}
  <path d="M${-w / 2} -20c0 -60 0 -110 ${w * 0.2} -140l${w * 0.08} -${h * 0.22}h${w * 0.44}l${w * 0.08} ${h * 0.22}c${w * 0.2} 30 ${w * 0.2} 80 ${w * 0.2} 140c0 14 -8 20 -20 20h-${w - 40}c-12 0 -20 -6 -20 -20z" fill="url(#${f.id})" opacity="0.95"/>
  <rect x="${-w * 0.2}" y="${-h - 8}" width="${w * 0.4}" height="${h * 0.14}" rx="6" fill="#b88a55"/>
  <rect x="${-w / 2 + 12}" y="-120" width="${w - 24}" height="62" rx="10" fill="${label}" opacity="0.92"/>
  ${T(0, -89, 0.28, 0, leafSprig({ color: "#5b8a4a", leaves: 3 }))}
  <path d="M${-w / 2 + 14} -150v110" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="0.35"/>`;
}

/** Small spray/rose-water bottle */
export function roseWater() {
  return bottle({ liquid: "#f2b8c0", w: 100, h: 220, label: "#fff3f3" }) + T(34, -40, 0.5, 20, rose());
}

export function teapot({ body = "#5b8a4a" } = {}) {
  const g1 = rad(shade(body, 0.3), shade(body, -0.25));
  return `<defs>${g1.def}</defs>${shadow(300, 40)}
  <path d="M-120 -120c-60 -10 -80 -60 -110 -80" fill="none" stroke="${shade(body, -0.1)}" stroke-width="22" stroke-linecap="round"/>
  <path d="M110 -150c70 -10 70 90 -4 100" fill="none" stroke="${shade(body, -0.15)}" stroke-width="18" stroke-linecap="round"/>
  <path d="M-130 -110c0 -70 60 -100 130 -100s130 30 130 100c0 60 -40 110 -130 110s-130 -50 -130 -110z" fill="url(#${g1.id})"/>
  <ellipse cx="0" cy="-205" rx="70" ry="16" fill="${shade(body, -0.2)}"/><circle cx="0" cy="-228" r="16" fill="${shade(body, -0.1)}"/>
  <path d="M-128 -100h256" stroke="#f4ead7" stroke-width="10" opacity="0.8"/>
  <path d="M-90 -170c-20 30 -24 60 -16 90" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity="0.3"/>
  ${T(-240, -215, 0.5, -30, steam())}`;
}

/** Wide basin with water (foot soak / compress water) */
export function basin({ body = "#c9962c", water = "#bfe0e6", w = 360, petals = false, brass = true } = {}) {
  const g1 = brass ? lin("#f1c75b", "#a8741c") : lin(shade(body, 0.15), shade(body, -0.2));
  const wt = rad(shade(water, 0.3), shade(water, -0.05));
  return `<defs>${g1.def}${wt.def}</defs>${shadow(w * 1.1, 50)}
  <path d="M${-w / 2} -90h${w}c-10 50 -60 90 -${w / 2} 90s-${w / 2 - 10} -40 -${w / 2} -90z" fill="url(#${g1.id})"/>
  <ellipse cx="0" cy="-90" rx="${w / 2}" ry="${w * 0.12}" fill="${brass ? "#b98522" : shade(body, -0.15)}"/>
  <ellipse cx="0" cy="-88" rx="${w / 2 - 14}" ry="${w * 0.1}" fill="url(#${wt.id})"/>
  <path d="M-60 -92q30 -10 60 0t60 0" stroke="#fff" stroke-width="4" fill="none" opacity="0.6"/>
  ${petals ? [[-70, -95], [40, -84], [90, -98], [-20, -80]].map(([x, y], i) => T(x, y, 0.35, i * 50, petal())).join("") : ""}`;
}

/** Folded cloth / compress towel */
export function cloth({ color = "#e8eef0", stripe = "#5f95a6" } = {}) {
  return `${shadow(300, 40)}
  <path d="M-150 -10l30 -70h250l20 70z" fill="${shade(color, -0.08)}"/>
  <path d="M-150 -10h300v-14h-300z" fill="${shade(color, -0.15)}"/>
  <path d="M-120 -80c20 -30 230 -30 250 0l-8 12h-236z" fill="${color}"/>
  <path d="M-80 -78l-22 66M-60 -78l-22 66" stroke="${stripe}" stroke-width="6" opacity="0.8"/>
  <path d="M60 -78l18 66M80 -78l18 66" stroke="${stripe}" stroke-width="6" opacity="0.8"/>`;
}

export function pillow({ color = "#e7e4f1" } = {}) {
  return `${shadow(360, 50)}<path d="M-180 -20c-10 -60 0 -110 20 -130c60 20 260 20 320 0c20 20 30 70 20 130c-60 -14 -300 -14 -360 0z" fill="${color}"/>
  <path d="M-160 -150c60 20 260 20 320 0" stroke="${shade(color, -0.15)}" stroke-width="4" fill="none"/>
  <path d="M-120 -70c50 10 200 10 240 0" stroke="#fff" stroke-width="8" fill="none" opacity="0.5" stroke-linecap="round"/>`;
}

export function hotWaterBag({ color = "#d9745b" } = {}) {
  return `${shadow(260, 40)}<path d="M-110 -10c-20 -80 -10 -150 40 -170h140c50 20 60 90 40 170z" fill="${color}"/>
  <rect x="-30" y="-230" width="60" height="56" rx="10" fill="${shade(color, -0.2)}"/><rect x="-40" y="-245" width="80" height="24" rx="8" fill="#f1c75b"/>
  ${[-60, -100, -140].map((y) => `<path d="M-80 ${y}h160" stroke="${shade(color, -0.12)}" stroke-width="6" stroke-linecap="round"/>`).join("")}
  <path d="M-80 -160c-10 40 -10 90 0 130" stroke="#fff" stroke-width="10" fill="none" opacity="0.3" stroke-linecap="round"/>`;
}

export function plate({ color = "#f7f2e8", rim = "#b8643c", w = 320, inner = "" } = {}) {
  return `${shadow(w * 1.05, w * 0.16)}<ellipse cx="0" cy="-8" rx="${w / 2}" ry="${w * 0.17}" fill="${shade(color, -0.1)}"/>
  <ellipse cx="0" cy="-14" rx="${w / 2}" ry="${w * 0.16}" fill="${color}" stroke="${rim}" stroke-width="5"/>
  <ellipse cx="0" cy="-14" rx="${w / 2 - 34}" ry="${w * 0.1}" fill="${shade(color, -0.04)}"/>${inner}`;
}

export function spoon({ fill = "#e0a526", kind = "powder" } = {}) {
  return `${shadow(260, 24, 0.12)}<path d="M-20 -14l150 -6" stroke="#b88a55" stroke-width="14" stroke-linecap="round"/>
  <ellipse cx="-70" cy="-16" rx="64" ry="30" fill="#c79a5e"/><ellipse cx="-70" cy="-20" rx="54" ry="22" fill="${fill}"/>
  ${kind === "powder" ? `<path d="M-118 -22q48 -26 96 0z" fill="${shade(fill, 0.1)}"/>` : ""}`;
}

export function mortar() {
  const g1 = lin("#c9744a", "#8f4a2a");
  return `<defs>${g1.def}</defs>${shadow(260, 40)}
  <path d="M-120 -120h240c0 70 -50 120 -120 120s-120 -50 -120 -120z" fill="url(#${g1.id})"/>
  <rect x="-130" y="-138" width="260" height="26" rx="13" fill="#9b5231"/><ellipse cx="0" cy="-130" rx="112" ry="10" fill="#6b3a22"/>
  <path d="M30 -160l90 -110" stroke="#6b4a2e" stroke-width="30" stroke-linecap="round"/><path d="M40 -170l70 -86" stroke="#8a6440" stroke-width="10" stroke-linecap="round"/>`;
}

export function dumbbell({ color = "#5f95a6" } = {}) {
  return `${shadow(300, 36)}<rect x="-90" y="-44" width="180" height="22" rx="11" fill="#9aa3a6"/>
  <rect x="-150" y="-80" width="56" height="90" rx="16" fill="${color}"/><rect x="94" y="-80" width="56" height="90" rx="16" fill="${color}"/>
  <rect x="-140" y="-72" width="12" height="70" rx="6" fill="#fff" opacity="0.3"/><rect x="104" y="-72" width="12" height="70" rx="6" fill="#fff" opacity="0.3"/>`;
}

export function cottonPads() {
  return `${shadow(220, 30)}${[[-50, -20], [30, -28], [-6, -44]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="58" ry="22" fill="#fbfaf7" stroke="#e5ddd0" stroke-width="3"/><ellipse cx="${x}" cy="${y - 2}" rx="40" ry="12" fill="none" stroke="#efe8dc" stroke-width="3"/>`).join("")}`;
}

export function scraper() {
  return `${shadow(260, 24, 0.12)}<path d="M-120 -20c0 -80 240 -80 240 0" fill="none" stroke="#c97b45" stroke-width="16" stroke-linecap="round"/>
  <path d="M-120 -20c0 -80 240 -80 240 0" fill="none" stroke="#f0b27f" stroke-width="5" stroke-linecap="round" opacity="0.7"/>
  <rect x="-136" y="-26" width="32" height="24" rx="8" fill="#9b5231"/><rect x="104" y="-26" width="32" height="24" rx="8" fill="#9b5231"/>`;
}

export function twig({ color = "#8a6440" } = {}) {
  return `${shadow(280, 20, 0.12)}<path d="M-140 -14l280 -10" stroke="${color}" stroke-width="16" stroke-linecap="round"/>
  <path d="M140 -24l14 -2" stroke="#d9c49a" stroke-width="16" stroke-linecap="round"/>
  <path d="M-40 -18l-30 -30M40 -21l26 -30" stroke="${color}" stroke-width="6" stroke-linecap="round"/>
  ${T(-70, -52, 0.35, -40, leaf("#4f7d3f"))}${T(66, -55, 0.35, 30, leaf("#5b8a4a"))}`;
}

export function moon() {
  return `<path d="M40 -140a90 90 0 1 0 60 150a74 74 0 1 1 -60 -150z" fill="#f3d27a" opacity="0.95"/>
  ${[[-140, -120, 8], [-90, -40, 5], [150, -90, 6]].map(([x, y, r]) => `<path d="M${x} ${y - r * 2}l${r * 0.5} ${r * 1.5}l${r * 1.5} ${r * 0.5}l-${r * 1.5} ${r * 0.5}l-${r * 0.5} ${r * 1.5}l-${r * 0.5} -${r * 1.5}l-${r * 1.5} -${r * 0.5}l${r * 1.5} -${r * 0.5}z" fill="#f3d27a"/>`).join("")}`;
}

export function sun() {
  return `<circle r="80" fill="#f6d27a"/><circle r="110" fill="none" stroke="#e0a526" stroke-width="4" stroke-dasharray="6 16" opacity="0.6"/>`;
}

// ── ingredients ────────────────────────────────────────────────────────────────
export function leaf(color = "#5b8a4a", w = 70, h = 150) {
  return `<path d="M0 0c-${w} -${h * 0.3} -${w * 0.6} -${h * 0.85} 0 -${h}c${w * 0.6} ${h * 0.15} ${w} ${h * 0.7} 0 ${h}z" fill="${color}"/>
  <path d="M0 -6v-${h * 0.9}" stroke="${shade(color, -0.3)}" stroke-width="3" opacity="0.6"/>`;
}
export function leafSprig({ color = "#5b8a4a", leaves = 5, shape = "oval" } = {}) {
  const w = shape === "narrow" ? 30 : shape === "round" ? 60 : 44;
  const h = shape === "round" ? 80 : 100;
  let out = `<path d="M0 0c10 -60 0 -130 -10 -190" stroke="${shade(color, -0.35)}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  for (let i = 0; i < leaves; i++) {
    const y = -30 - i * (150 / leaves);
    const side = i % 2 ? 1 : -1;
    out += T(side * 4, y, 0.8 - i * 0.05, side * 55, leaf(shade(color, (i % 3) * 0.08), w, h));
  }
  out += T(-8, -190, 0.6, 0, leaf(shade(color, 0.1), w, h));
  return out;
}
export const tulsi = () => leafSprig({ color: "#4f7d3f", leaves: 6, shape: "round" }) + `<path d="M-10 -190l-4 -50" stroke="#7a4f6b" stroke-width="10" stroke-linecap="round"/>`;
export const neem = () => leafSprig({ color: "#3f7a3a", leaves: 8, shape: "narrow" });
export const mint = () => leafSprig({ color: "#4f9a57", leaves: 5, shape: "round" });
export const curryLeaves = () => leafSprig({ color: "#2f6b34", leaves: 8, shape: "narrow" });
export const eucalyptus = () => leafSprig({ color: "#7fa39a", leaves: 6, shape: "round" });
export const brahmi = () => leafSprig({ color: "#6a9a4a", leaves: 7, shape: "round" });

export function turmericRoot() {
  return `${shadow(200, 24, 0.12)}<path d="M-90 -20c-10 -30 30 -40 60 -34c30 -30 60 -20 70 -4c30 -10 60 10 50 34c-20 16 -60 10 -90 12c-30 4 -80 12 -90 -8z" fill="#c9852f"/>
  <path d="M-40 -48c10 -30 30 -44 44 -40" stroke="#b9772a" stroke-width="18" stroke-linecap="round"/>
  ${[-60, -20, 20, 60].map((x) => `<path d="M${x} -40c4 8 4 16 0 24" stroke="#9c6320" stroke-width="3" fill="none" opacity="0.6"/>`).join("")}
  <ellipse cx="96" cy="-24" rx="18" ry="14" fill="#f1a51c"/><ellipse cx="96" cy="-24" rx="10" ry="7" fill="#f7c24a"/>`;
}
export function gingerRoot() {
  return `${shadow(210, 24, 0.12)}<path d="M-100 -20c-6 -34 40 -44 60 -30c10 -40 50 -40 60 -10c26 -20 70 -6 64 26c-10 22 -60 20 -90 20s-86 14 -94 -6z" fill="#d9b27a"/>
  <path d="M-10 -60c6 -30 24 -40 40 -36" stroke="#cfa56b" stroke-width="22" stroke-linecap="round"/>
  ${[-70, -30, 10, 50].map((x) => `<path d="M${x} -44c6 6 6 14 0 20" stroke="#a9834f" stroke-width="3" fill="none" opacity="0.6"/>`).join("")}
  <ellipse cx="80" cy="-20" rx="16" ry="12" fill="#f3e2a6"/>`;
}
export function lemonSlice(color = "#f3cf3a") {
  return `<circle r="60" fill="${shade(color, -0.1)}"/><circle r="52" fill="#fff7cf"/><circle r="46" fill="${shade(color, 0.3)}"/>
  ${Array.from({ length: 8 }, (_, i) => `<path d="M0 0L${(Math.cos((i * Math.PI) / 4) * 44).toFixed(1)} ${(Math.sin((i * Math.PI) / 4) * 44).toFixed(1)}" stroke="#fff7cf" stroke-width="4"/>`).join("")}
  <circle r="6" fill="#fff7cf"/>`;
}
export function lemon({ color = "#f3cf3a" } = {}) {
  const g1 = rad(shade(color, 0.35), shade(color, -0.12));
  return `<defs>${g1.def}</defs>${shadow(200, 26, 0.13)}<ellipse cx="-50" cy="-52" rx="62" ry="50" fill="url(#${g1.id})"/><path d="M-116 -52l-10 -4M16 -52l10 -4" stroke="${shade(color, -0.1)}" stroke-width="10" stroke-linecap="round"/>
  ${T(62, -40, 0.72, 0, lemonSlice(color))}`;
}
export const lime = () => lemon({ color: "#9cc441" });
export const orange = () => lemon({ color: "#f29a2e" });

export function garlic() {
  return `${shadow(160, 22, 0.12)}<path d="M0 -140c-12 20 -12 30 -8 40c-50 10 -80 50 -70 80c8 20 40 24 78 24s70 -4 78 -24c10 -30 -20 -70 -70 -80c4 -10 4 -20 -8 -40z" fill="#f6efe4" stroke="#ddd0bd" stroke-width="3"/>
  <path d="M-8 -100c-20 20 -26 60 -18 96M8 -100c20 20 26 60 18 96" stroke="#e2d4bf" stroke-width="4" fill="none"/>
  ${T(110, -2, 0.5, 30, `<path d="M0 0c-30 -10 -40 -60 -10 -90c20 30 30 70 10 90z" fill="#f6efe4" stroke="#ddd0bd" stroke-width="5"/>`)}`;
}
export function onion() {
  const g1 = rad("#d9899a", "#9b3b5a");
  return `<defs>${g1.def}</defs>${shadow(170, 24, 0.12)}<path d="M0 -150c-6 16 -4 26 0 34c-60 10 -90 60 -76 90c10 22 40 26 76 26s66 -4 76 -26c14 -30 -16 -80 -76 -90c4 -8 6 -18 0 -34z" fill="url(#${g1.id})"/>
  <path d="M-30 -110c-20 30 -20 70 -10 104M30 -110c20 30 20 70 10 104" stroke="#f2c1cc" stroke-width="3" fill="none" opacity="0.7"/>`;
}
export function clove(n = 6) {
  const r = rng("clove" + n);
  let s = shadow(180, 20, 0.1);
  const bud = `<path d="M-3 0l-4 -40q7 -4 14 0l-4 40z" fill="#5a3522"/><circle cx="-9" cy="-46" r="7" fill="#6b3f28"/><circle cx="9" cy="-46" r="7" fill="#6b3f28"/><circle cx="0" cy="-54" r="7" fill="#7a4a30"/><circle cx="0" cy="-44" r="6" fill="#5a3522"/><circle cx="-2" cy="-56" r="2.5" fill="#a0694a"/>`;
  for (let i = 0; i < n; i++) {
    const x = (r() - 0.5) * 150, y = -10 - r() * 22, a = 60 + Math.round(r() * 240);
    s += T(x, y, 1.1, a, bud);
  }
  return s;
}
export function cardamom(n = 4) {
  const r = rng("cardamom" + n);
  let s = shadow(170, 20, 0.1);
  for (let i = 0; i < n; i++) {
    const x = (r() - 0.5) * 130, y = -14 - r() * 20, a = Math.round(r() * 360);
    s += T(x, y, 1, a, `<ellipse rx="26" ry="14" fill="#9fb86a"/><path d="M-22 0h44" stroke="#7f9a4f" stroke-width="3"/><path d="M26 0l6 0" stroke="#7f9a4f" stroke-width="5" stroke-linecap="round"/>`);
  }
  return s;
}
export function cinnamon(n = 3, color = "#9b5a35") {
  let s = shadow(230, 26, 0.12);
  for (let i = 0; i < n; i++) {
    s += T(0, -16 - i * 22, 1, -8 + i * 8, `<rect x="-110" y="-12" width="220" height="24" rx="12" fill="${shade(color, i * 0.08)}"/><path d="M-100 -2h200" stroke="${shade(color, -0.25)}" stroke-width="3"/><ellipse cx="110" cy="0" rx="8" ry="12" fill="${shade(color, -0.3)}"/>`);
  }
  return s;
}
export const mulethi = () => cinnamon(3, "#b98a55");
export function seedPile({ color = "#8a6a3a", seed = "oval", w = 190 } = {}) {
  const r = rng("pile" + color + seed + w);
  let s = shadow(w, 24, 0.1) + `<path d="M${-w / 2} -6q${w / 2} ${-w * 0.42} ${w} 0z" fill="${shade(color, 0.15)}"/>`;
  for (let i = 0; i < 90; i++) {
    const x = (r() - 0.5) * w * 0.95;
    const maxH = (1 - Math.abs(x) / (w / 2)) * w * 0.2;
    const y = -6 - r() * maxH;
    s += seed === "round"
      ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(3 + r() * 2).toFixed(1)}" fill="${shade(color, (r() - 0.5) * 0.3)}"/>`
      : `<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="6" ry="3" fill="${shade(color, (r() - 0.5) * 0.35)}" transform="rotate(${Math.round(r() * 180)} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
  }
  return s;
}
export const fennel = () => seedPile({ color: "#8fa35a" });
export const ajwain = () => seedPile({ color: "#9a7f55" });
export const cumin = () => seedPile({ color: "#7a5a38" });
export const methi = () => seedPile({ color: "#c99a3c", seed: "round" });
export const sesame = () => seedPile({ color: "#efe3c4" });
export const flaxseed = () => seedPile({ color: "#7a4a2a" });
export const blackPepper = () => seedPile({ color: "#3b2f28", seed: "round" });
export const saltPile = () => seedPile({ color: "#f2efe8", seed: "round" });
export const makhana = (w = 180) => {
  const r = rng("makhana");
  let s = "";
  for (let i = 0; i < 12; i++) s += `<circle cx="${((r() - 0.5) * w * 0.7).toFixed(1)}" cy="${(-w * 0.36 - r() * 22).toFixed(1)}" r="${(15 + r() * 5).toFixed(1)}" fill="#fbf7ee" stroke="#e5d7bf" stroke-width="3"/><circle cx="${((r() - 0.5) * w * 0.7).toFixed(1)}" cy="${(-w * 0.36 - r() * 16).toFixed(1)}" r="4" fill="#c9a06a" opacity="0.6"/>`;
  return s;
};
export function saffron() {
  const r = rng("saffron");
  let s = "";
  for (let i = 0; i < 14; i++) {
    const x = (r() - 0.5) * 120, y = -10 - r() * 18, a = Math.round(r() * 180);
    s += T(x, y, 1, a, `<path d="M0 0c6 -10 14 -20 30 -24" stroke="#c8321e" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M30 -24l6 -4" stroke="#e8a33a" stroke-width="5" stroke-linecap="round"/>`);
  }
  return s;
}
export function nutmeg() {
  return `${shadow(150, 20, 0.1)}<ellipse cx="-30" cy="-36" rx="40" ry="34" fill="#8a5a3c"/><path d="M-60 -40c16 -8 44 -8 60 6" stroke="#6b4228" stroke-width="3" fill="none"/>
  <ellipse cx="44" cy="-30" rx="34" ry="28" fill="#a06a45"/><ellipse cx="44" cy="-32" rx="24" ry="19" fill="#d4a373"/><path d="M28 -34c8 6 22 6 32 0" stroke="#8a5a3c" stroke-width="3" fill="none"/>`;
}
export function honeyDipper() {
  return `<path d="M0 0v-150" stroke="#b88a55" stroke-width="10" stroke-linecap="round"/>
  <ellipse cx="0" cy="-10" rx="24" ry="30" fill="#e9a53a"/>${[-24, -10, 4].map((y) => `<path d="M-22 ${y}h44" stroke="#c9822a" stroke-width="5"/>`).join("")}`;
}
export function coconut({ water = false } = {}) {
  return `${shadow(230, 28, 0.13)}<path d="M-100 -70a100 70 0 0 0 200 0z" fill="#7a4a2a"/><ellipse cx="0" cy="-70" rx="100" ry="24" fill="#8a5a3c"/><ellipse cx="0" cy="-70" rx="86" ry="18" fill="#fbf7ee"/>
  ${water ? `<ellipse cx="0" cy="-70" rx="66" ry="12" fill="#e9f0e6"/><path d="M20 -74L70 -220" stroke="#e08a5c" stroke-width="10" stroke-linecap="round"/>` : `<ellipse cx="0" cy="-70" rx="60" ry="11" fill="#f1ebdd"/>`}
  ${[-60, -30, 0, 30, 60].map((x) => `<path d="M${x} -40l${x * 0.1} 20" stroke="#5a3522" stroke-width="3" opacity="0.5"/>`).join("")}`;
}
export function greenCoconut() {
  const g1 = rad("#a8cf6a", "#5f8f2f");
  return `<defs>${g1.def}</defs>${shadow(230, 30, 0.13)}<path d="M-100 -90c0 -70 50 -120 100 -120s100 50 100 120c0 60 -40 90 -100 90s-100 -30 -100 -90z" fill="url(#${g1.id})"/>
  <ellipse cx="0" cy="-196" rx="40" ry="12" fill="#f4efd9"/><path d="M14 -200L60 -300" stroke="#e08a5c" stroke-width="10" stroke-linecap="round"/>
  <path d="M-70 -150c-10 30 -10 70 6 100" stroke="#fff" stroke-width="10" fill="none" opacity="0.25" stroke-linecap="round"/>`;
}
export function aloe() {
  return `${shadow(220, 24, 0.12)}<path d="M-120 -20c40 -40 120 -60 240 -50c-30 30 -110 60 -240 50z" fill="#6aa257"/>
  <path d="M-110 -24c40 -30 110 -46 220 -44" stroke="#9fd18a" stroke-width="5" fill="none"/>
  ${[-60, -20, 20, 60].map((x) => `<path d="M${x} -42l6 -8" stroke="#4f7d3f" stroke-width="4" stroke-linecap="round"/>`).join("")}
  ${T(40, -10, 1, 0, `<path d="M-40 0h80l-10 -30h-60z" fill="#6aa257"/><path d="M-34 -4h68l-8 -22h-52z" fill="#dff2cf" opacity="0.95"/>`)}`;
}
export function cucumber() {
  const sl = (x, y, s) => T(x, y, s, 0, `<circle r="44" fill="#4f8a3a"/><circle r="38" fill="#cfe8a8"/>${Array.from({ length: 6 }, (_, i) => `<ellipse cx="${(Math.cos(i) * 18).toFixed(1)}" cy="${(Math.sin(i) * 18).toFixed(1)}" rx="4" ry="6" fill="#f4f9e6"/>`).join("")}`);
  return `${shadow(230, 26, 0.12)}<rect x="-130" y="-60" width="170" height="56" rx="28" fill="#4f8a3a"/><path d="M-120 -44h150" stroke="#7fb05f" stroke-width="5" opacity="0.6"/>${sl(60, -34, 0.8)}${sl(118, -22, 0.7)}`;
}
export function banana() {
  return `${shadow(240, 28, 0.12)}<path d="M-130 -60c40 60 180 70 240 -10c10 -10 20 -8 18 4c-40 90 -220 100 -268 16z" fill="#f2cf4a"/>
  <path d="M-120 -54c50 50 170 56 226 -8" stroke="#d9a927" stroke-width="5" fill="none"/><path d="M110 -70l14 -18" stroke="#6b5a2a" stroke-width="10" stroke-linecap="round"/>
  <path d="M-130 -56c50 90 200 80 250 -6" stroke="#fff6c8" stroke-width="6" fill="none" opacity="0.6"/>`;
}
export function roundFruit({ color = "#9cc441", r = 44, count = 3, leafOn = true, stripes = false } = {}) {
  const pos = [[-60, 0], [30, -6], [-10, -52]].slice(0, count);
  return shadow(r * 5, 28, 0.12) + pos.map(([x, y], i) => {
    const g1 = rad(shade(color, 0.35), shade(color, -0.2));
    return T(x, y - r, 1 - i * 0.06, 0, `<defs>${g1.def}</defs><circle r="${r}" fill="url(#${g1.id})"/>${stripes ? `<path d="M0 -${r}c-14 20 -14 ${r * 1.5} 0 ${r * 2}M-${r * 0.6} -${r * 0.8}c-10 20 -10 ${r} 0 ${r * 1.6}M${r * 0.6} -${r * 0.8}c10 20 10 ${r} 0 ${r * 1.6}" stroke="${shade(color, -0.2)}" stroke-width="3" fill="none" opacity="0.6"/>` : ""}<ellipse cx="-${r * 0.35}" cy="-${r * 0.4}" rx="${r * 0.22}" ry="${r * 0.12}" fill="#fff" opacity="0.45"/>${leafOn && i === 0 ? T(4, -r + 4, 0.26, 30, leaf("#5b8a4a")) : ""}`);
  }).join("");
}
export const amla = () => roundFruit({ color: "#b9cf5a", stripes: true });
export const apple = () => roundFruit({ color: "#d9534a", count: 2 });
export const pomegranate = () => roundFruit({ color: "#c4383e", count: 2, leafOn: false });
export function dates(n = 5) {
  const r = rng("dates" + n);
  let s = shadow(190, 22, 0.1);
  for (let i = 0; i < n; i++) s += T((r() - 0.5) * 140, -18 - r() * 22, 1, Math.round(r() * 360), `<ellipse rx="34" ry="17" fill="#7a3f22"/><path d="M-26 -4c14 -6 36 -6 50 2" stroke="#9b5a35" stroke-width="3" fill="none"/><ellipse cx="-10" cy="-6" rx="10" ry="3" fill="#b0744c" opacity="0.6"/>`);
  return s;
}
export function almonds(n = 6) {
  const r = rng("alm" + n);
  let s = shadow(180, 22, 0.1);
  for (let i = 0; i < n; i++) s += T((r() - 0.5) * 130, -14 - r() * 22, 1, Math.round(r() * 360), `<path d="M0 -26c16 8 18 38 0 52c-18 -14 -16 -44 0 -52z" fill="#b87a4b"/><path d="M0 -20c6 8 6 30 0 40" stroke="#94603a" stroke-width="2" fill="none"/>`);
  return s;
}
export function walnuts(n = 4) {
  const r = rng("wal" + n);
  let s = shadow(180, 22, 0.1);
  for (let i = 0; i < n; i++) s += T((r() - 0.5) * 120, -24 - r() * 16, 1, Math.round(r() * 360), `<circle r="26" fill="#c9a06a"/><path d="M0 -26v52M-14 -18c8 10 -8 26 0 36M14 -18c-8 10 8 26 0 36" stroke="#9b7445" stroke-width="3" fill="none"/>`);
  return s;
}
export function raisins(n = 10) {
  const r = rng("rai" + n);
  let s = shadow(150, 20, 0.1);
  for (let i = 0; i < n; i++) s += `<ellipse cx="${((r() - 0.5) * 110).toFixed(1)}" cy="${(-10 - r() * 20).toFixed(1)}" rx="11" ry="8" fill="${shade("#8a4a2a", (r() - 0.5) * 0.3)}"/>`;
  return s;
}
export const chana = () => seedPile({ color: "#c99a5c", seed: "round", w: 180 });
export function carrot() {
  return `${shadow(230, 22, 0.12)}<path d="M-120 -30c40 -20 160 -34 220 -26c-60 20 -180 40 -220 26z" fill="#ef8a2e"/>
  ${[-80, -40, 0, 40].map((x) => `<path d="M${x} -38l6 10" stroke="#c96a1a" stroke-width="3"/>`).join("")}
  ${T(100, -54, 0.45, 70, leafSprig({ color: "#5b8a4a", leaves: 3, shape: "narrow" }))}`;
}
export function watermelon() {
  return `${shadow(240, 26, 0.12)}<path d="M-120 -10a120 120 0 0 1 240 0z" fill="#4f8a3a"/><path d="M-108 -10a108 108 0 0 1 216 0z" fill="#f4f9e6"/><path d="M-100 -10a100 100 0 0 1 200 0z" fill="#ec5f5f"/>
  ${[[-50, -40], [-10, -70], [30, -46], [60, -30], [-70, -24], [10, -30]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="4" ry="7" fill="#2b2b2b"/>`).join("")}`;
}
export function papaya() {
  return `${shadow(240, 26, 0.12)}<path d="M-120 -40c0 -40 60 -60 130 -50c60 8 110 30 110 60c0 30 -60 40 -130 36c-70 -4 -110 -16 -110 -46z" fill="#7aa33a"/>
  <path d="M-106 -40c4 -30 60 -46 124 -38c52 8 94 26 94 48c0 22 -52 30 -114 28c-62 -2 -106 -12 -104 -38z" fill="#f28c3a"/>
  <ellipse cx="0" cy="-38" rx="54" ry="14" fill="#f7b36a"/>${Array.from({ length: 12 }, (_, i) => `<circle cx="${-40 + i * 7}" cy="${-38 + (i % 2 ? 4 : -4)}" r="5" fill="#2b2b2b"/>`).join("")}`;
}
export function mushroom() {
  return `${shadow(200, 24, 0.12)}${[[-40, 0, 1], [50, 4, 0.8]].map(([x, y, s]) => T(x, y, s, 0, `<rect x="-18" y="-70" width="36" height="70" rx="14" fill="#f3ead8"/><path d="M-66 -64c0 -50 132 -50 132 0z" fill="#c9a06a"/><path d="M-60 -66h120" stroke="#9b7445" stroke-width="4"/>`)).join("")}`;
}
export function hibiscus() {
  return `${Array.from({ length: 5 }, (_, i) => T(0, 0, 1, i * 72, `<path d="M0 0c-40 -20 -50 -80 -10 -96c20 -6 44 10 30 40c-6 20 -14 40 -20 56z" fill="#d6334a"/>`)).join("")}
  <circle r="16" fill="#8f1b2e"/><path d="M0 0l40 -70" stroke="#f3cf3a" stroke-width="5"/><circle cx="40" cy="-70" r="7" fill="#f3cf3a"/>`;
}
export function rose() {
  return `${Array.from({ length: 6 }, (_, i) => T(0, 0, 1, i * 60, `<path d="M0 0c-30 -14 -34 -60 -4 -70c16 -4 34 8 26 30z" fill="${i % 2 ? "#e7738a" : "#f09aab"}"/>`)).join("")}<circle r="18" fill="#d9536d"/><path d="M-8 -4c6 -10 16 -8 16 2" stroke="#b83a55" stroke-width="3" fill="none"/>`;
}
export const petal = () => `<path d="M0 0c-30 -14 -34 -60 -4 -70c16 -4 34 8 26 30z" fill="#ef8fa2"/>`;
export function rosePetals() {
  const r = rng("petals");
  return shadow(200, 18, 0.08) + Array.from({ length: 7 }, () => T((r() - 0.5) * 170, -10 - r() * 30, 0.6, Math.round(r() * 360), petal())).join("");
}
export function iceCubes() {
  return `${shadow(160, 18, 0.1)}${[[-40, -30, -10], [30, -26, 14], [-4, -64, 4]].map(([x, y, a]) => `<rect x="${x - 30}" y="${y - 30}" width="60" height="60" rx="12" fill="#dff1f6" stroke="#b9dde6" stroke-width="3" transform="rotate(${a} ${x} ${y})"/><rect x="${x - 18}" y="${y - 20}" width="16" height="10" rx="4" fill="#fff" transform="rotate(${a} ${x} ${y})"/>`).join("")}`;
}
export function jaggery() {
  return `${shadow(180, 22, 0.12)}<path d="M-70 -10l-10 -70l60 -30l80 20l10 70l-60 20z" fill="#b87a2e"/><path d="M-80 -80l60 -30l80 20l-60 24z" fill="#d49a4a"/><path d="M-20 -66l0 70" stroke="#9b6424" stroke-width="3" opacity="0.5"/>`;
}
export function laddoos(color = "#d4a24c") {
  return shadow(220, 24, 0.12) + [[-54, -40], [54, -40], [0, -44], [0, -96]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="42" fill="${color}"/><circle cx="${x - 12}" cy="${y - 14}" r="10" fill="#fff" opacity="0.25"/>${[0, 1, 2, 3].map((k) => `<circle cx="${x - 20 + k * 13}" cy="${y + (k % 2 ? 8 : -6)}" r="3" fill="${shade(color, -0.3)}"/>`).join("")}`).join("");
}
export function alum() {
  return `${shadow(160, 20, 0.12)}<path d="M-50 -10l-16 -50l34 -40l56 10l20 50l-30 34z" fill="#eef3f5" stroke="#c9d6dc" stroke-width="3"/><path d="M-32 -100l20 50l-54 -10M-12 -50l52 16" stroke="#c9d6dc" stroke-width="3" fill="none"/>`;
}
export function sandalwood() {
  return `${shadow(220, 22, 0.12)}<rect x="-110" y="-44" width="200" height="34" rx="8" fill="#c99a6a" transform="rotate(-8)"/><path d="M-100 -34l180 -26" stroke="#a97a4a" stroke-width="3"/>
  ${T(70, -6, 0.5, 0, bowl({ body: "#8f4a2a", fill: "#e8c38a", w: 150 }))}`;
}
