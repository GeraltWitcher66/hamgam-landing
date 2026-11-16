# همگام — لندینگ‌پیج

A dark, animated Persian marketing page for a software product: hero with a
live product mock, logo cloud, feature bento, how it works, an interactive
tabbed showcase, metrics, testimonials, a security section, pricing with a
billing toggle, FAQ, email capture and footer. Every section is its own
component and all copy lives in one file.

## Run it

```sh
bun install
bun run dev        # http://localhost:5173
bun run build      # dist/client (static site) + dist/saas_landing/index.js (Worker)
```

## Edit it

- `src/content.ts` holds every string, price and link. Start there.
- `src/sections/*` are the page sections. `src/App.tsx` stacks them; delete or
  reorder lines there to remove or move a section.
- `src/styles.css` holds the design tokens (colours, radii, fonts, keyframes).
  Everything rounded is a squircle via `corner-shape`; true circles use `.round`.
  Bordered surfaces use the `depth` utility instead of a border: an inset edge
  plus a top highlight. The element must be positioned; recolour the edge with
  `--depth-edge`.
- `src/lib/url.ts` prefixes internal links with the deploy base, so the same
  build works at a domain root and under a `/subpath/`.
- `src/worker/index.ts` is the Cloudflare Worker. `/api/subscribe` receives the
  email form; connect it to your provider or a D1 table.
- `src/pages/` holds the static routes: `/compare`, `/privacy`, `/terms` and
  `/cookies`. Routing is a single path check in `src/main.tsx` — no router
  library.

## Measure

`src/lib/analytics.ts` exposes `track(event, props)`. It is called when the
email form is submitted, when a plan is chosen and when `/compare` is opened.
It only writes to `window.dataLayer` and `window.plausible` when they already
exist, so no vendor script is loaded by default. Add your provider's snippet to
`index.html` and the events start flowing:

```html
<script defer data-domain="hamgam.ir" src="https://plausible.io/js/script.js"></script>
```

## Social image

`public/og.png` is generated from `scripts/og.ps1` (System.Drawing + the
Vazirmatn TTF in `scripts/fonts`), so run it after changing the headline:

```sh
powershell -ExecutionPolicy Bypass -File scripts/og.ps1
```

## Deploy to GitHub Pages

`.github/workflows/pages.yml` builds the site with Bun and publishes
`dist/client` on every push to `main`.

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. The site appears at `https://<user>.github.io/<repo>/`.

The build passes `PAGES_BASE=/<repo>/` so assets and internal links resolve
under the subpath. `scripts/pages.mjs` then writes a real `index.html` for each
route (`/compare/`, `/privacy/`, …) with its own canonical URL, plus `404.html`
and `.nojekyll` so unknown deep links fall through to the app.

```sh
bun run build:pages   # what the workflow runs
```

To deploy anywhere else, `bun run build` and upload `dist/client`; set
`PAGES_BASE` only when the site is not served from the domain root.
