import Link from "next/link";
import styles from "./ProductGrid.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import SeriesCard from "@/components/SeriesCard";
import { reveal } from "@/lib/reveal";
import { CATEGORIES, byCat, seriesInCat, type CategoryKey } from "@/lib/catalogue";

/**
 * One listing shell for `/products` and `/products/[category]`. Discovery and
 * comparison, not a storefront — no filters, no sorting, no prices.
 */
export default function ListingPage({ active }: { active: CategoryKey }) {
  const category = CATEGORIES.find((c) => c.key === active)!;
  const products = byCat(active);

  /* One entry per thing a visitor is choosing between. A family is a single
     entry — LINVA appears once, not three times — and its models are picked
     on the detail page, where they can be compared. Products with no series
     are entries in their own right, so a category without series renders
     exactly the grid it always did. */
  const seriesList = seriesInCat(active);
  const entries = (() => {
    const seen = new Set<string>();
    const out: Array<
      { kind: "product"; item: (typeof products)[number] } | { kind: "series"; item: (typeof seriesList)[number] }
    > = [];
    for (const p of products) {
      if (!p.series) {
        out.push({ kind: "product", item: p });
        continue;
      }
      if (seen.has(p.series)) continue;
      seen.add(p.series);
      const s = seriesList.find((x) => x.label === p.series);
      if (s) out.push({ kind: "series", item: s });
    }
    return out;
  })();

  return (
    <>
      <SiteHeader active="products" />
      <main>
        <section className={styles.hero}>
          <div aria-hidden="true" className={styles.heroArt}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/listing-banner.png" alt="" />
          </div>
          <div className={styles.heroInner}>
            <nav aria-label="Breadcrumb" className={styles.crumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span className={styles.here}>Products</span>
            </nav>
            <h1 className={styles.title}>All products</h1>
            <CategoryTabs active={active} />
          </div>
        </section>

        <section className={styles.gridSection}>
          <div className={styles.gridInner}>
            <p className={styles.intro} {...reveal("text")}>
              {category.intro}
            </p>
            <div className={styles.grid}>
              {entries.map((e, i) =>
                e.kind === "series" ? (
                  <SeriesCard key={e.item.key} series={e.item} index={i} />
                ) : (
                  <ProductCard key={e.item.slug} product={e.item} index={i} />
                ),
              )}
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
