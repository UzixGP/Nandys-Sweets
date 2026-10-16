---
name: add-gallery-photos
description: Add, rename or reorganize cake/dessert photos for the Nandy's Sweets & Cakes gallery and product covers. Use when the user uploads new photos, creates a new album/dessert folder, renames images, asks about the photo naming pattern or tag codes (BD, Fem, Man…), or when a photo isn't showing up.
---

# Adding gallery photos

Photos are data, not code. Each folder in `public/images/products/` is one **album**:
- It becomes a section + filter chip on the **Galería** page (`/es/gallery`).
- Its **first** photo (alphabetical) is the cover on the product card / menu / home.
- Every photo also rotates in the home-page promo slideshow and the "Cada pastel es único" preview.

## Naming pattern
`NN-Tag_Tag_Dessert.ext` — e.g. `01-BD_Fem_TresLeches.png`, `02-BD_Man_TresLeches.png`, `01-Chocoflan.png`.
- `NN` = order within the album (`01` is the cover). Suggest unique numbers (`01`, `02`, …).
- Tag codes come from `src/content/photoTags.ts` and show as labels ("Cumpleaños · Para ella") on the
  photo, in the lightbox caption and in the "Quiero uno así" WhatsApp message. Current codes:
  `BD` = Cumpleaños/Birthday, `Fem` = Para ella/For her, `Man` = Para él/For him.
  Unknown codes are ignored — to add one (e.g. `WED`, `BS` baby shower, `XV` quinceañera), add an entry
  with `{ es, en }` labels. Ask the user what a new code means rather than guessing.
- The dessert part is ignored (the folder already says it).

## Steps
1. Look at what changed: `git status --short public/images` and view new images (Read tool) to confirm
   they're the right dessert and not duplicates.
2. Formats: JPG, PNG, WebP, AVIF. **HEIC is skipped** (the script warns) — ask the user to export as JPG.
   Very large files (>3 MB) work (Next/Vercel serve ~80 KB WebP) but bloat the repo; mention it.
3. Run `npm run gallery` **before committing** and read its summary line (`✓ Gallery: N photos in M albums`).
   It also strips hidden metadata (GPS location, camera info) — lines starting with `🧹` mean a file was
   cleaned and rewritten. The repo is public, so photos must be cleaned before they enter git history.
4. **New folder?** It shows up automatically with a prettified folder name ("TresLeches" → "Tres Leches").
   If it's a new dessert for the menu, add a product in `src/content/products.ts` with `album: "<Folder>"`
   (see the `update-bakery-info` skill) so it gets a proper es/en name, description and card.
5. Verify with the `qa-site` skill (gallery + lightbox checks), then ship with `ship-changes`.

## Gotchas
- Folder names are case-sensitive on Vercel (Linux). `album` in `products.ts` must match exactly.
- Spaces and special characters in file names are fine (URLs are encoded by the script), but simple
  names are easier to manage.
- The share image (`public/og.png`) uses specific photo paths in `scripts/brand-assets.mjs`; if those
  files are renamed, update the paths there and re-run `node scripts/brand-assets.mjs`.
