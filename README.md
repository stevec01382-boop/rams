# Hutchi RAMS Builder

An interactive, branded rebuild of the **Hutchi Master RAMS Template** as a web app: fill in a
project-specific Risk Assessment & Method Statement section by section, pick from a built-in
library of Risk Assessments / COSHH sheets / Method Statements (or add project-specific ones),
get it signed on screen by every operative and the internal QA reviewer, then generate a branded
PDF that's emailed out and saved to a searchable record.

Built as a static React app (Vite) plus a small set of Netlify Functions for storage and email —
no separate backend/database to run.

## What's in here

- `src/` — the React app (multi-step form, PDF generation, signature capture).
- `src/data/library.js` — the 11 Risk Assessments, 7 COSHH sheets and 4 Method Statements carried
  over from the Master RAMS Template's index, written out in full with realistic UK-compliant
  hazard/control content (see the note at the top of that file for the regulatory reference points
  used — EH40 silica WEL, Work at Height Regs 2005, Control of Noise/Vibration at Work Regs 2005,
  etc). **Have your SHEQ manager/competent person review and adjust this content before relying on
  it for live jobs** — it's a strong first draft written to match the template's structure, not a
  substitute for sign-off, exactly as the original template's own "how to use this appendix" notes
  require.
- `netlify/functions/` — `submit-rams` (save + email), `list-rams` / `get-rams` / `resend-rams`
  (the Records page), sharing helpers in `netlify/functions/lib/shared.js`.

## Local development

```bash
npm install
npm run dev        # app only, at http://localhost:5173 — storage/email calls will fail (no functions)
```

To run the Netlify Functions locally too (so Send & Save and Records work end-to-end):

```bash
npm install -g netlify-cli   # if you don't have it already
netlify link                 # first time only, links this folder to your Netlify site
netlify dev                  # runs the app + functions together, with local Blobs emulation
```

## Deploying (GitHub → Netlify)

1. Push this folder to a new GitHub repo (`git init` has already been run with an initial commit —
   just add your remote and push):
   ```bash
   git remote add origin git@github.com:<your-org>/<repo-name>.git
   git push -u origin main
   ```
2. In Netlify: **Add new site → Import an existing project**, pick the repo. Build command
   `npm run build`, publish directory `dist` (already set in `netlify.toml`, so Netlify should
   pick these up automatically).
3. Netlify Blobs needs no setup — it's automatically available to functions on a deployed Netlify
   site.
4. Set environment variables under **Site settings → Environment variables** (see `.env.example`
   for the full list with descriptions):
   - `RESEND_API_KEY` and `RESEND_FROM_EMAIL` — from [resend.com](https://resend.com). Verify a
     sending domain there first, or the "from" address won't be accepted. Without these set, the
     app still saves every RAMS to Records; it just won't email the PDF (the UI tells the user
     this rather than failing silently).
   - `RAMS_ADMIN_PASSCODE` — a shared passcode that gates the `/records` page and its API calls,
     since stored RAMS contain names, signatures and site addresses. **Set this before going
     live** — it's a simple shared-secret gate, not proper per-user auth, but it stops the records
     store being openly browsable. Rotate it the same way you'd rotate any shared password if it
     leaks.
5. Redeploy after setting env vars (Netlify only picks them up on the next build/deploy).

## How signing works

Each operative and the QA reviewer sign directly on the device running the app — draw with a
mouse/finger or type their name (rendered as a cursive signature image). Nothing is sent
anywhere until you hit **Send & save**, at which point the finished PDF (with every signature
embedded) is generated in the browser, then uploaded once to be stored and emailed. There's no
separate remote-signing-link flow in this version — if you later want to let an off-site client
contact sign without being handed the device, that would mean adding a Netlify Function that
emails a unique link and a second, cut-down view of the sign-off step; the current data model
(everything keyed by the RAMS's `meta.id`) is already set up to support that if you want it added
later.

## Records / storage

Every RAMS sent via **Send & save** is stored in Netlify Blobs (the PDF plus the full form data)
and listed on `/records`, searchable by client, job reference or site name, with a **Resend
email** action per row. There's no automatic deletion — if you need a data retention policy (the
stored data includes names and signature images, so UK GDPR applies), that's worth deciding and
either enforcing manually or adding a scheduled cleanup function for.

## Customising

- **Branding**: colours and fonts are CSS custom properties at the top of `src/styles.css`
  (`--midnight`, `--blue`, etc, matching the Hutchi brand palette) and reused in `src/lib/pdf.js`
  for the PDF. The app currently loads Inter from Google Fonts as a stand-in for Graphik — swap
  the `@import` in `styles.css` and the `--font-heading`/`--font-body` values, and the `font:`
  reference in `pdf.js`, if you get Graphik web fonts licensed and want the PDF/UI to match exactly.
- **Library content**: edit `src/data/library.js` directly — it's plain, well-commented JS objects,
  no build tooling required beyond the normal `npm run build`.
- **Form text / default wording**: `src/data/defaults.js`.
