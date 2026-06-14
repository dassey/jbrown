# Basement Designer — John Browning (2026 redesign concept)

A modern redesign of **basementdesigner.com** for **John M. Browning** (Basement Finishing &
Design Service, Inc.), plus an interactive **2D + 3D basement designer** — lay out a finished
basement on a floor plan, see it in 3D, get a live building-code check and a budget estimate.

> **Concept prototype.** A redesign demonstration, not the live site. No backend, no payment.
> "Send my plan to John" just shows a placeholder. Reviews, awards, services and the
> before/after photos reflect John's real Houzz profile and basementdesigner.com.

🔗 **Live:** https://dassey.github.io/jbrown/

---

## What's here

**A modernized marketing site** built from John's real content — hero, the 2D/3D designer,
his real services, his own before/after projects, Best of Houzz (12 years), 80 five-star
reviews, his story, an inspiration gallery, and contact.

**A 2D/3D basement designer** (the same engine as the kitchen planner, adapted for basements):
- **2D plan editor** (Konva) — set the basement footprint, drag in **rooms** (rec room,
  bedroom, bath, theater, bar, office, gym, storage, mechanical…) that resize as labeled
  zones, plus **features** (egress windows, stairs, support columns, fixtures, wet bar,
  sectional, pool table, fireplace…). Snap to walls and the grid.
- **3D view** (react-three-fiber) — the layout as a clean architect's-model cutaway with
  partition walls and furniture. Lazy-loaded; **2D ⇄ 3D toggle**.
- **Live code check** — egress per bedroom, 7-ft ceiling, minimum room sizes, bathroom
  fixtures, stairs, blocked egress, overlapping rooms — each with a plain-English fix.
- **Budget estimate** by finished square foot + finishes + features.
- Templates (Guest suite, Open rec, Entertainer's, Full finish), autosave, shareable link,
  PNG export.

## Tech

Vite + React + TypeScript + Tailwind v4 · Konva (2D) · three.js + @react-three/fiber + drei
(3D, lazy chunk) · Zustand (persist) · HashRouter. Initial load ~121 KB gzip; three.js
(~274 KB gzip) loads only when the 3D view is opened.

## Run / deploy

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # static build to dist/
npm run typecheck
```

Auto-deploys to GitHub Pages on push to `main` (Settings → Pages → GitHub Actions). Vite
`base` is `/jbrown/` — change it in `vite.config.ts` if the repo is renamed.

## Editing the data

- `src/model/catalog.ts` — rooms, features, fixtures (sizes, prices, 3D/2D refs) + finishes.
- `src/model/validation.ts` — the building-code rules + thresholds (`RULES`).
- `src/model/templates.ts` — starter layouts.
- `src/config/business.ts` — John's details, stats, links.
- `src/pages/Landing.tsx` — the marketing copy (his words, services, reviews, awards).

See `IMAGES-NEEDED.md` for swapping in more of John's real photography.
