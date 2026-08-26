import Link from "next/link";
import styles from "./ProductGrid.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { CATEGORIES, byCat, type CategoryKey } from "@/lib/catalogue";

/**
 * One listing shell for `/products` and `/products/[category]`. Discovery and
 * comparison, not a storefront — no filters, no sorting, no prices.
 */
export default function ListingPage({ active }: { active: CategoryKey }) {
  const category = CATEGORIES.find((c) => c.key === active)!;
  const products = byCat(active);

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
            <p className={styles.intro}>{category.intro}</p>
            <div className={styles.grid}>
              {products.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
