import Link from "next/link";
import styles from "./ProductGrid.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import SeriesCard from "@/components/SeriesCard";
import { reveal } from "@/lib/reveal";
import { CATEGORIES, listingEntries, type CategoryKey } from "@/lib/catalogue";

/**
 * One listing shell for `/products` and `/products/[category]`. Discovery and
 * comparison, not a storefront — no filters, no sorting, no prices.
 */
export default function ListingPage({ active }: { active: CategoryKey }) {
  const category = CATEGORIES.find((c) => c.key === active)!;

  const entries = listingEntries(active);

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
            <div className={styles.grid}>
              {entries.map((e, i) =>
                e.kind === "series" ? (
                  <SeriesCard key={e.key} series={e.item} index={i} />
                ) : (
                  <ProductCard key={e.key} product={e.item} index={i} />
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
