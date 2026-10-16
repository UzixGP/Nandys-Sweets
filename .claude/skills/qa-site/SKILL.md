---
name: qa-site
description: Verify the Nandy's Sweets & Cakes site works end to end — build, lint, type-check, then run the headless-Chrome QA script (pages, mobile layout, cake form + WhatsApp message, order notice, gallery lightbox, slideshow) and review screenshots. Use after any change and before shipping, or when the user reports something broken.
---

# QA the site

## 1. Static checks
```bash
npx tsc --noEmit        # also catches es/en dictionary mismatches
npm run lint
npm run build           # runs `npm run gallery` first; every route should prerender for es + en
```
Build gotchas (Next 16 + cacheComponents): `dynamicParams` is not allowed; `new Date()` in a server
component fails prerender (use `"use cache"` or compute client-side with `useSyncExternalStore`).

## 2. Browser checks
Start the production server in the background, then run the script:
```bash
npx next start -p 3124          # background
npm run qa                      # = node scripts/qa.mjs [.qa]
npx kill-port 3124              # stop the server afterwards
```
`scripts/qa.mjs` drives Chrome/Edge through the DevTools protocol (set `CHROME=` if not found) and checks:
- `/` → `/es` redirect; every page returns 200 in both languages; `/og.png` exists
- security: CSP / X-Frame-Options / nosniff headers, no `X-Powered-By`, `.env`/`.git`/`package.json` not
  served, no open redirect (`//evil.com`), image optimizer rejects outside URLs, malformed `#hash` doesn't
  crash the gallery, and **no CSP violations** on visited pages (fails if a new asset host isn't allowed)
- no horizontal scroll at 375 px on the main pages
- cake form: required errors, today rejected by the order-notice rule, delivery requires an address,
  WhatsApp message has 12h time, `$80` budget (no `$$`) and the address — it prints the full message
- gallery lightbox "Quiero uno así" links the photo; home promo slideshow advances (~4 s)

Exit code 1 = something failed. Screenshots land in `.qa/` (git-ignored) — **look at them** with the
Read tool (`.qa/mobile-es.png`, `.qa/desktop-home.png`, …), especially after visual changes.

## 3. Reading screenshots
- Full-page captures draw the sticky header at the scroll position, so a header in the middle of a
  screenshot is an artifact, not a bug.
- Plain `chrome --headless --window-size=390,...` can't go below ~500 px wide; use the QA script
  (device emulation) for real phone widths.
- To check one element, take a full-page shot and crop with sharp using
  `getBoundingClientRect().top + window.scrollY`.

## 4. Extending
Add new checks to `scripts/qa.mjs` next to similar ones (use `check(ok, label, detail)`), so the next
session gets them for free. Things the script can't verify (real phone WhatsApp formatting, native
date/time pickers) — ask the user to test on their phone.
