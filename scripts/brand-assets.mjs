// Builds the site's logo, favicon and social image from public/brand/NandySC_transparent_logo.png.
// Re-run with `node scripts/brand-assets.mjs` whenever the logo changes.
import sharp from "sharp";

const SOURCE = "public/brand/NandySC_transparent_logo.png";
const CREAM = { r: 255, g: 249, b: 242, alpha: 1 };
const BLUSH = { r: 252, g: 228, b: 236, alpha: 1 };

// 1. Logo used across the site, trimmed to the badge.
const trimmed = await sharp(SOURCE).trim().png().toBuffer();
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
    { input: await card("public/images/products/Chocoflan/01-Chocoflan.png", -5), left: 600, top: 110 },
    { input: await card("public/images/products/TresLeches/01-BD_Fem_TresLeches.png", 5), left: 860, top: 120 },
  ])
  .png()
  .toFile("public/og.png");

console.log("✓ Brand assets written");
