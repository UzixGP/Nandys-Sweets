// One-off: builds the site's logo, favicon and social image from public/brand/NandySC_logo.png.
// Re-run with `node scripts/brand-assets.mjs` if the logo changes.
import sharp from "sharp";

const SOURCE = "public/brand/NandySC_logo.png";
const CREAM = { r: 255, g: 249, b: 242, alpha: 1 };
const BLUSH = { r: 252, g: 228, b: 236, alpha: 1 };

// 1. Transparent logo: flood-fill the white background from the edges (the badge's
//    pink outer ring stops the fill, so white inside the badge is kept).
const { data, info } = await sharp(SOURCE).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width, height } = info;
const isBackground = (i) => data[i] > 238 && data[i + 1] > 238 && data[i + 2] > 238;
const seen = new Uint8Array(width * height);
const stack = [];
for (let x = 0; x < width; x++) stack.push(x, (height - 1) * width + x);
for (let y = 0; y < height; y++) stack.push(y * width, y * width + width - 1);
while (stack.length) {
  const p = stack.pop();
  if (seen[p] || !isBackground(p * 4)) continue;
  seen[p] = 1;
  data[p * 4 + 3] = 0;
  const x = p % width;
  if (x > 0) stack.push(p - 1);
  if (x < width - 1) stack.push(p + 1);
  if (p >= width) stack.push(p - width);
  if (p < width * (height - 1)) stack.push(p + width);
}
// Soften the light anti-aliased fringe left around the edge.
for (let p = 0; p < width * height; p++) {
  if (seen[p]) continue;
  const x = p % width;
  const nearBg =
    (x > 0 && seen[p - 1]) || (x < width - 1 && seen[p + 1]) || seen[p - width] || seen[p + width];
  if (nearBg && data[p * 4] > 225 && data[p * 4 + 1] > 225 && data[p * 4 + 2] > 225) data[p * 4 + 3] = 90;
}
const logo = await sharp(data, { raw: info }).png().toBuffer();
const trimmed = await sharp(logo).trim().png().toBuffer();
await sharp(trimmed).resize(600).png({ compressionLevel: 9 }).toFile("public/brand/logo.png");

// 2. Favicon + Apple touch icon.
await sharp(trimmed).resize(256).png().toFile("src/app/icon.png");
await sharp(trimmed)
  .resize(150)
  .extend({ top: 15, bottom: 15, left: 15, right: 15, background: CREAM })
  .flatten({ background: CREAM })
  .png()
  .toFile("src/app/apple-icon.png");

// 3. Social share image (1200x630): logo + two dessert posters on blush.
// sharp always rotates before extending, so the frame and the rotation are separate pipelines.
const card = async (file, angle) => {
  const framed = await sharp(file)
    .resize(270, 360, { fit: "cover" })
    .extend({ top: 8, bottom: 8, left: 8, right: 8, background: CREAM })
    .png()
    .toBuffer();
  return sharp(framed)
    .rotate(angle, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
};

await sharp({ create: { width: 1200, height: 630, channels: 4, background: BLUSH } })
  .composite([
    { input: await sharp(trimmed).resize(460).png().toBuffer(), left: 70, top: 85 },
    { input: await card("public/images/products/Chocoflan/Nandy’s Chocoflan Bakery Poster.png", -5), left: 600, top: 110 },
    { input: await card("public/images/products/TresLeches/BD_Fem_TresLeches.png", 5), left: 860, top: 120 },
  ])
  .png()
  .toFile("public/og.png");

console.log("✓ Brand assets written");
