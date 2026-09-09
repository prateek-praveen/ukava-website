import Link from "next/link";
import styles from "./ProductGrid.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import { reveal } from "@/lib/reveal";
import { CATEGORIES, byCat, type CategoryKey } from "@/lib/catalogue";

/**
 * One listing shell for `/products` and `/products/[category]`. Discovery and
 * comparison, not a storefront — no filters, no sorting, no prices.
 */
export default function ListingPage({ active }: { active: CategoryKey }) {
  const category = CATEGORIES.find((c) => c.key === active)!;
  const products = byCat(active);

  /* Variants of one family are shown under their series rather than as six
     unrelated products. Series keep catalogue order; anything without a
     series follows in a single group, so a category with no series at all
     renders exactly as it always did — one heading-less grid. */
  const seriesNames = products
    .map((p) => p.series)
    .filter((s, i, all): s is string => Boolean(s) && all.indexOf(s) === i);

  const groups = [
    ...seriesNames.map((name) => ({
      key: name,
      heading: name,
      positioning: products.find((p) => p.series === name)?.positioning,
      items: products.filter((p) => p.series === name),
    })),
    {
      key: "rest",
      // Only headed when it is sharing the page with series above it.
      heading: seriesNames.length ? "Also in this category" : null,
      positioning: undefined,
      items: products.filter((p) => !p.series),
    },
  ].filter((g) => g.items.length > 0);

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
            {groups.map((g) => (
              <section key={g.key} className={styles.group}>
                {g.heading ? (
                  <header className={styles.groupHead} {...reveal("heading")}>
                    <h2 className={styles.groupTitle}>{g.heading}</h2>
                    {g.positioning ? (
                      <p className={styles.groupType}>{g.positioning}</p>
                    ) : null}
                  </header>
                ) : null}
                <div className={styles.grid}>
                  {g.items.map((p, i) => (
                    <ProductCard key={p.slug} product={p} index={i} />
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
