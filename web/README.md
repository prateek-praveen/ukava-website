# UKAVA website

Production implementation of the Claude Design handoff in `../project/UKAVA Website.dc.html`.
Next.js (App Router) + TypeScript, no CSS framework — the design system's tokens live in
`app/globals.css` and each component carries its own CSS module.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static prerender of every route
npm run typecheck
```

## Routes

| Route | Design section |
| --- | --- |
| `/` | Home — hero, stats, featured products, Why UKAVA, partner stories, closing CTA |
| `/products` | All products (leads with Electric Scooters) |
| `/products/[category]` | Category listing — 4 categories |
| `/products/[category]/[slug]` | Product detail — 20 products |
| `/about` | About UKAVA |

The prototype used hash routes (`#/products/electric-scooters`, `#/p/ukava-strom`). Those became
real URLs, with the product's category in the path so breadcrumbs and canonical links line up.
All 29 pages prerender at build time.

## Where things live

- `lib/catalogue.ts` — the product catalogue, ported from `ukava-catalogue.js`. **Adding a product
  is a data edit here plus its photography** — no page needs redesigning.
- `lib/productCopy.ts` — detail-page prose derived from each product's own spec rows. Nothing is
  invented; a section with no catalogue backing is dropped rather than padded.
- `lib/leads.ts` — the single seam for lead delivery (see below).
- `lib/slots.ts` + `slots.manifest.json` — product photography, keyed by the slot ids the design
  used. `components/ImageSlot.tsx` reproduces the per-slot crop the designer set.
- `components/` — header, footer, closing CTA, lead modal, contact dialog, product card, tabs.
- `components/home/` — the homepage sections.

## Outstanding — needs UKAVA to supply

1. **Lead delivery is not wired up.** Every form validates, captures the product interest
   automatically and shows its success state, but `submitLead()` in `lib/leads.ts` only logs.
   Point it at the CRM endpoint (or a route handler forwarding to one) and all three forms —
   product enquiry, callback, partner — start delivering. Consumer and dealer leads stay
   separable via the payload's `type`.
2. **Placeholder dealer testimonials.** The six names, businesses, cities and quotes in
   `components/home/PartnerStories.tsx` were invented for layout only. Replace with real,
   signed-off partner stories and photographs before launch.
3. **Missing photography.** These slots render a captioned grey frame until filled — add the file
   to `public/img/slots/` and register it in `slots.manifest.json`:
   - `ukava-why-1` … `ukava-why-4` (Why UKAVA visuals)
   - `ukava-about-facility`, `ukava-about-dealer`
   - product shots for the Lithium Batteries, Inverter & Battery and Solar Solutions ranges
     (`ukava-p-<slug>-0`, plus `-1`…`-4` for the gallery and `-detail` for the callout)
4. **Pending links.** Social handles, the registered address, the email address, and the Privacy
   Policy / Terms of Use pages render as inert marks rather than links to nowhere.
5. **A newer About page design exists in Claude Design but not in this export.** The bundle in
   `../project/` is a frozen snapshot taken at the handoff; re-export it ("Send to Claude Code
   Web") so the new About design reaches the repo, then rebuild `app/about/`.

## Deliberate departures from the prototype

- Breakpoints are CSS media queries rather than JS window-width state, so the first paint is
  correct and there is no layout flash. The thresholds match the prototype's (1080 / 1180 / 1320).
- The catalogue spelled the first scooter "UKAVA Strom" while the prototype's homepage said
  "UKAVA Storm". Confirmed as **Storm** — the catalogue entry, its slug (`ukava-storm`) and its
  image slot ids were all corrected to match.
- The About page follows the combined file, **not** the standalone `About UKAVA.dc.html` — that
  file is an earlier draft. Chat 4 supersedes it on three specific points: "How we work" went
  from grey to white, the flat orange contact band was replaced by the immersive closing CTA that
  fades into the footer, and the phone number became 1800 212 2131.
  **The user reports a newer About design that is not present in this export** — see below.
- Product cards are one component across the homepage and the listing. Where the two diverged in
  the prototype (heading weight, spec labels) the listing's explicit values were adopted.
- DM Sans is self-hosted (`public/fonts/`) instead of loaded from Google Fonts.
