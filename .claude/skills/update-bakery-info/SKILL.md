---
name: update-bakery-info
description: Change Nandy's Sweets & Cakes business details or site copy — prices (starting prices), products/desserts, contact info, delivery fee/radius, order notice/cutoff, payment policy, logo, or any wording on the site in Spanish/English. Use whenever the user asks to change text, add a dessert, set prices, or update policies.
---

# Updating bakery info & copy

Read `CLAUDE.md` first — it lists the confirmed business rules and copy preferences. Never invent
prices, policies, reviews or history; if a value isn't confirmed, ask.

## Where each thing lives
| Change | Edit |
| --- | --- |
| Phone/WhatsApp, email, Instagram | `src/content/site.ts` (`whatsappNumber` digits only + `phoneDisplay`) |
| Pickup area, delivery fee & radius | `site.ts` → `pickupArea`, `deliveryFee`, `deliveryRadiusMiles` |
| Order notice & cutoff | `site.ts` → `minNoticeHours`, `bigCakeNoticeHours`, `orderCutoffHour`, `timeZone` |
| Show/hide deposit + payment methods | `site.ts` → `showPolicies`; wording in `orderInfo.paymentBody` |
| Starting price | `src/content/products.ts` → `startingPrice: "$35"` (renders "Desde $35"); `null` = "Precio a cotizar" |
| New dessert | add to `products.ts` (`slug`, `category`, `name`/`description` {es,en}, `album`, `bg`, `inquiry`) |
| Menu sections | `src/content/categories.ts` (empty categories hide automatically) |
| Any visible text | `src/i18n/dictionaries/es.ts` **and** `en.ts` (same key in both) |
| Logo | replace `public/brand/NandySC_transparent_logo.png`, run `node scripts/brand-assets.mjs` |

Text uses `{placeholders}` filled at render time — `{area}`, `{fee}`, `{radius}` (delivery terms),
`{hours}`, `{bigHours}`, `{cutoff}` (notice), `{name}`, `{price}`, `{date}`. Keep placeholders intact so
numbers stay in sync with `site.ts`.

## Products
- `inquiry: "custom"` → card button goes to the custom-cake form (cakes with unique decorations, e.g. Tres
  Leches). `inquiry: "whatsapp"` → button opens WhatsApp asking about that dessert.
- `bg` is the card's pastel (`pink` | `blue` | `yellow` | `lavender`); vary it between neighbors.
- `featured: true` shows it on the home page.

## Copy rules
- Spanish is the source; write proper accents and natural Spanish (no comma before "y").
- "Postres", not "Dulces". Brand is always "Nandy's Sweets & Cakes" (in JSX: `Nandy&apos;s Sweets &amp; Cakes`).
- Mirror the meaning in `en.ts`; adjust phrasing so English doesn't repeat words awkwardly.
- When the user asks to change one string, check for the same wording elsewhere (e.g. buttons, English)
  and mention any related change you made.
- WhatsApp messages are built in `CustomCakeForm.tsx` (form), `ProductCard.tsx` (product ask) and
  `GalleryView.tsx` ("Quiero uno así"). Message labels come from the `form` / `product` / `gallery` keys.

## After editing
`npx tsc --noEmit` (catches missing en/es keys) → `qa-site` skill → `ship-changes` skill.
