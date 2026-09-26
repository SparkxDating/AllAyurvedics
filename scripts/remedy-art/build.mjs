/**
 * Render remedy hero images:  node scripts/remedy-art/build.mjs [slug ...]
 *   public/remedies/<slug>.webp      1200×800 hero / card image
 *   public/remedies/og/<slug>.jpg    1200×630 share image (centre crop)
 */
import { mkdirSync, writeFileSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { composeScene } from "./compose.mjs";
import { scenes } from "./scenes.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");
const outDir = join(root, "public/remedies");
mkdirSync(join(outDir, "og"), { recursive: true });

const only = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const svgOut = process.argv.includes("--svg");
const list = Object.entries(scenes).filter(([slug]) => !only.length || only.includes(slug));

for (const [slug, scene] of list) {
  const svg = composeScene(slug, scene);
  if (svgOut) writeFileSync(join(outDir, `${slug}.svg`), svg);
  const png = await sharp(Buffer.from(svg), { density: 96 }).png().toBuffer();
  const hero = join(outDir, `${slug}.webp`);
  await sharp(png).webp({ quality: 86, effort: 6 }).toFile(hero);
  const og = join(outDir, "og", `${slug}.jpg`);
  await sharp(png).extract({ left: 0, top: 120, width: 1200, height: 630 }).jpeg({ quality: 78, mozjpeg: true }).toFile(og);
  console.log(`${slug}  webp ${(statSync(hero).size / 1024).toFixed(0)} KB  og ${(statSync(og).size / 1024).toFixed(0)} KB`);
}
console.log(`${list.length} image(s)`);
