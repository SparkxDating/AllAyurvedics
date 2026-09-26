// Quick editorial checks for illustrated remedies: node scripts/remedy-art/check-content.mjs
// Loads the TypeScript content with jiti (already a dev dependency of the toolchain).
import { createJiti } from "jiti";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
const jiti = createJiti(import.meta.url, { alias: { "@": resolve("src") } });
const { remedies } = await jiti.import(resolve("src/content/remedies.ts"));
const slugs = new Set(remedies.map((r) => r.slug));
const { scenes } = await import("./scenes.mjs?" + Date.now());
let problems = 0;
const warn = (m) => { problems++; console.log("  " + m); };
const ill = remedies.filter((r) => r.image);
for (const r of ill) {
  const p = [];
  for (const l of ["en", "hi"]) {
    const t = r[l];
    if (!t.metaTitle || t.metaTitle.length > 70) p.push(`${l} metaTitle ${t.metaTitle?.length}`);
    if (!t.metaDescription || t.metaDescription.length > 170) p.push(`${l} metaDescription ${t.metaDescription?.length}`);
    if (!t.faq || t.faq.length !== 3) p.push(`${l} faq ${t.faq?.length}`);
    if (!t.imageAlt) p.push(`${l} imageAlt missing`);
    if (!t.keyword) p.push(`${l} keyword missing`);
  }
  const missing = (r.related ?? []).filter((s) => !slugs.has(s));
  if (missing.length) p.push(`related not (yet) published: ${missing.join(", ")}`);
  if ((r.related ?? []).length < 3) p.push(`related count ${r.related?.length}`);
  if (!scenes[r.slug]) p.push("no scene");
  if (!existsSync(`public${r.image}`)) p.push("image file missing");
  if (!existsSync(`public/remedies/og/${r.slug}.jpg`)) p.push("og file missing");
  if (p.length) { console.log(r.slug); p.forEach(warn); }
}
const dup = remedies.length - slugs.size;
console.log(`${remedies.length} remedies, ${ill.length} illustrated, ${dup} duplicate slugs, ${problems} notes`);
