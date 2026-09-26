// Contact sheet for reviewing renders: node scripts/remedy-art/contact-sheet.mjs out.png a.webp b.webp ...
import sharp from "sharp";
const [,, out, ...files] = process.argv;
const W = 400, H = 267, cols = 4;
const rows = Math.ceil(files.length / cols);
const comps = await Promise.all(files.map(async (f, i) => ({ input: await sharp(f).resize(W, H).png().toBuffer(), left: (i % cols) * W, top: Math.floor(i / cols) * H })));
await sharp({ create: { width: cols * W, height: rows * H, channels: 3, background: "#fff" } }).composite(comps).png().toFile(out);
