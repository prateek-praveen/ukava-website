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

The prototype used hash routes (`#/products/electric-scooters`, `#/p/ukava-storm`). Those became
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
   - product shots for the Lithium Batteries, Inverter & Battery and Solar Solutions ranges
     (`ukava-p-<slug>-0`, plus `-1`…`-4` for the gallery and `-detail` for the callout)
4. **Pending links.** Social handles, the registered address, the email address, and the Privacy
   Policy / Terms of Use pages render as inert marks rather than links to nowhere.
5. **About page photography.** Eleven new slots render captioned frames until filled:
   `ukava-about-founder`, four `ukava-about-build-*` category cards, and six
   `ukava-about-work-*` gallery shots.
6. **The `../project/` bundle is a frozen snapshot from the handoff export.** Design changes made
   in Claude Design since then do not reach this repo; re-export ("Send to Claude Code Web") to
   pick them up.

## Deliberate departures from the prototype

- Breakpoints are CSS media queries rather than JS window-width state, so the first paint is
  correct and there is no layout flash. The thresholds match the prototype's (1080 / 1180 / 1320).
- The catalogue spelled the first scooter "UKAVA Strom" while the prototype's homepage said
  "UKAVA Storm". Confirmed as **Storm** — the catalogue entry, its slug (`ukava-storm`) and its
  image slot ids were all corrected to match.
- The About page was rebuilt from screenshots of the current design, which is **not** in this
  export — neither `About UKAVA.dc.html` nor the combined file's About section matches it. It is
  now: Our Story (founder portrait + narrative), a four-up proof strip, "One energy partner. Many
  solutions." with four dark category cards, and a two-row drifting work gallery.
- Product cards are one component across the homepage and the listing. Where the two diverged in
  the prototype (heading weight, spec labels) the listing's explicit values were adopted.
- DM Sans is self-hosted (`public/fonts/`) instead of loaded from Google Fonts.

## Mobile

Screens `<=768px` get a purpose-built layer rather than a shrunk desktop: the hero banner is
pinned low so the product sits below the copy, products run two-up with compact cards
(`object-fit: contain`, descriptor and specs hidden), and the stats row becomes a seamless
marquee. Every mobile rule lives in a `@media (max-width: 768px)` block at the end of the
component'''s own module, so desktop is untouched — verified by comparing geometry and 60 computed
style properties for 2539 rendered elements across all four pages at 1024 and 1440.

The stats marquee needs duplicate cells for a seamless loop; they are `display: none` above the
breakpoint and their wrapper is `display: contents`, so the desktop grid is unaffected.

### Mobile scale

| Role | Size |
| --- | --- |
| Hero / page H1 | 28–32px |
| Section H2 | 22–24px |
| H3 | 18–20px |
| Card title | 15–16px |
| Body | 14px |
| Secondary detail | 12–13px |
| Label / eyebrow | 11–12px |
| CTA | 13–14px semibold |
| Stat value | 25px |

Buttons are 40px tall with 12–20px horizontal padding; card actions are text links. Page gutter
18px, spacing on an 8/12/16/24/32/48 scale. No heading exceeds 32px — enforced by a check that
walks every h1–h4 at 320/375/390/430/768 on all four pages.
