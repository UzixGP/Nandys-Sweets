---
name: ship-changes
description: Commit and push Nandy's Sweets & Cakes changes to the personal GitHub repo (which auto-deploys to Vercel), with the correct repo-local identity. Use when finishing any change, when the user says commit/push/deploy/publish, or when setting up the repo on another machine.
---

# Shipping changes

The repo is personal (`github.com/UzixGP/Nandys-Sweets`) but one of the machines is a **work laptop**
whose global git identity is a work email. Commits must use the repo-local personal identity.

## Before committing
1. Confirm the identity is repo-local and personal:
   ```bash
   git config --local user.email   # must be 316631335+UzixGP@users.noreply.github.com
   git config --local user.name    # Edisson Guevara
   git remote get-url origin       # https://UzixGP@github.com/UzixGP/Nandys-Sweets.git
   ```
   If missing (fresh clone), set them with `git config` (no `--global`). Never change global config.
2. Run the `qa-site` skill (at least `tsc`, lint, build; `npm run qa` for anything user-facing).
3. `git status --short` — review what's included. User-added photos/logos are expected; `.qa/`,
   `.next/`, `node_modules/` must not appear.

## Commit & push
- Clear subject line + short body explaining the why; end with the attribution line the session asks for.
- `git push` — first push on a new machine opens a browser login for the personal GitHub account
  (Git Credential Manager keys it to the `UzixGP@` in the remote URL, separate from work credentials).
- Vercel deploys `main` automatically within ~1 minute; other branches get preview URLs.

## New machine setup
```bash
git clone https://UzixGP@github.com/UzixGP/Nandys-Sweets.git
cd Nandys-Sweets
git config user.name "Edisson Guevara"
git config user.email "316631335+UzixGP@users.noreply.github.com"
npm install
npm run dev     # http://localhost:3000 → /es
```
Always `git pull` before starting work, since edits happen on two machines.

## Hosting note
Vercel's Hobby plan is for non-commercial use; this is a business site. The user was told the options
(Vercel Pro, or Netlify / Cloudflare Pages free tiers, which allow commercial use). Don't migrate
without being asked. If the production URL changes (custom domain or different Vercel URL), update
`site.url` default in `src/content/site.ts` (or set `NEXT_PUBLIC_SITE_URL` in Vercel).
