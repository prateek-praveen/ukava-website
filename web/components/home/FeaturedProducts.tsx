"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./FeaturedProducts.module.css";
import CategoryTabs from "@/components/CategoryTabs";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";
import {
  CATEGORIES,
  categoryHref,
  featuredByCat,
  type CategoryKey,
} from "@/lib/catalogue";

export default function FeaturedProducts() {
  const [active, setActive] = useState<CategoryKey>("electric-scooters");
  const category = CATEGORIES.find((c) => c.key === active)!;
  // At most six per category, and never padded out with duplicates when a
  // category holds fewer.
  const products = featuredByCat(active);

  return (
    <section id="products" className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <h2 className={styles.title}>Featured products</h2>
          <Link href="/products" className={styles.viewAll}>
            View all products →
          </Link>
        </Reveal>

        <CategoryTabs active={active} onSelect={setActive} className={styles.tabs} />

        {/* Keyed so the panel replays its entrance on each category change. */}
        <div key={active} className={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <div className={styles.footer}>
          <Link href={categoryHref(active)} className={`btn btn-primary ${styles.seeAll}`}>
            See all {category.label} →
          </Link>
        </div>
      </div>
    </section>
  );
}
