// Scans public/images/products/<Album>/ and writes src/content/gallery.generated.json.
// Runs automatically before `npm run dev` and `npm run build`; adding photos needs no code changes.
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd(), "public", "images", "products");
const OUT = path.join(process.cwd(), "src", "content", "gallery.generated.json");
const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);
const byName = (a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });

const albums = [];
const folders = (await readdir(ROOT, { withFileTypes: true }))
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort(byName);

for (const folder of folders) {
  const files = (await readdir(path.join(ROOT, folder))).sort(byName);
  const images = [];

  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === ".heic" || ext === ".heif") {
      console.warn(`⚠ Skipping ${folder}/${file}: browsers can't show HEIC. Export it as JPG.`);
      continue;
    }
    if (!IMAGE_EXT.has(ext)) continue;

    const filePath = path.join(ROOT, folder, file);
    const meta = await sharp(filePath).metadata();
    // EXIF orientations 5-8 are rotated 90°, so the displayed size is swapped.
    const rotated = (meta.orientation ?? 1) >= 5;
    const blur = await sharp(filePath).rotate().resize(12).webp({ quality: 40 }).toBuffer();

    images.push({
      src: ["", "images", "products", folder, file].map(encodeURIComponent).join("/"),
      width: rotated ? meta.height : meta.width,
      height: rotated ? meta.width : meta.height,
      blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
    });
  }

  if (images.length) albums.push({ folder, images });
}

await writeFile(OUT, JSON.stringify({ albums }, null, 2) + "\n");
const total = albums.reduce((n, a) => n + a.images.length, 0);
console.log(`✓ Gallery: ${total} photos in ${albums.length} albums → ${path.relative(process.cwd(), OUT)}`);
