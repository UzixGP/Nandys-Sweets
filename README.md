# Nandy's Sweets

Catalog website for Nandy's Sweets, a homemade bakery. Customers browse desserts and reach out over **WhatsApp** (primary) or **email**. There's no checkout. Spanish is the default language, with an English toggle.

Built with Next.js (App Router), TypeScript and Tailwind CSS. Deployed on Vercel.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /es
npm run build      # production build (also type-checks)
npm run lint
```

## Where to edit things

| What | File |
| --- | --- |
| WhatsApp number, email, Instagram, payment-policy toggle | `src/content/site.ts` |
| Desserts (names, descriptions, photos, prices, featured) | `src/content/products.ts` |
| Menu categories and their order | `src/content/categories.ts` |
| All page text (Spanish / English) | `src/i18n/dictionaries/es.ts`, `en.ts` |
| Colors and fonts (design tokens) | `src/app/globals.css` |
| Logo | `public/brand/logo.png` (made from `NandySC_logo.png` by `scripts/brand-assets.mjs`) |
| Photos / gallery albums | `public/images/products/<Album>/` |

## Adding photos (no code needed)

1. Drop the photos into the dessert's folder, e.g. `public/images/products/TresLeches/`. To start a new album, create a new folder.
2. Commit and push. Done.

Every build runs `npm run gallery`, which scans the folders and writes `src/content/gallery.generated.json`:
- Each folder becomes an album on the **Galería** page, with its own filter chip.
- The **first** photo of the folder (alphabetical; name it `01-...` to choose) is the product card's cover.
- JPG, PNG, WebP and AVIF work. iPhone **HEIC** photos are skipped with a warning, so export them as JPG.
- A folder linked from a product (`album: "TresLeches"` in `products.ts`) takes that product's name. Other folders use their folder name ("TresLeches" → "Tres Leches").

If the logo changes, replace `public/brand/NandySC_logo.png` and run `node scripts/brand-assets.mjs`. That regenerates the transparent logo, the favicon and the social-share image (`public/og.png`).

Notes:
- Products with `price: null` show "Precio a cotizar / Price on request". Only add prices Nandy has confirmed.
- `en.ts` is typed against `es.ts`, so a missing English string fails the build.
- Each card's "Preguntar" button opens WhatsApp with a pre-filled message about that dessert. The custom-cake form builds a full request message for WhatsApp or email.

## Working from two machines

This repo uses a **repo-local** git identity (personal GitHub), so a work global config is never touched:

```bash
git clone https://UzixGP@github.com/UzixGP/Nandys-Sweets.git
cd Nandys-Sweets
git config user.name "Edisson Guevara"
git config user.email "316631335+UzixGP@users.noreply.github.com"
npm install
```

Always `git pull` before starting and `git push` when done. Every push to `main` deploys to Vercel automatically.

## Project structure

```
src/
  app/[lang]/          pages: home, menu, custom-cakes, about, contact (es + en)
  components/          Header + drawer, ProductCard, CustomCakeForm, Footer…
  content/             site details, products, categories
  i18n/                locale config + dictionaries
  lib/contact.ts       WhatsApp / mailto link builders
  proxy.ts             redirects / and unprefixed paths to /es
```
