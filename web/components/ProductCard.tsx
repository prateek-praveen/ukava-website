import Link from "next/link";
import styles from "./ProductCard.module.css";
import ImageSlot from "./ImageSlot";
import { productHref, type Product } from "@/lib/catalogue";
import { productShotId } from "@/lib/slots";

/**
 * The whole card is the link — the design's rule is that clicking anywhere on
 * a product opens its detail page.
 */
export default function ProductCard({ product }: { product: Product }) {
  const specs = product.primary.slice(0, 3);

  return (
    <Link href={productHref(product)} className={styles.card}>
      <div className={styles.frame}>
        <div className={styles.zoom}>
          <ImageSlot
            id={productShotId(product.slug, 0)}
            alt={product.name}
            placeholder={`${product.name} · product photo`}
          />
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.index} aria-hidden="true" />
        <h3 className={styles.name}>{product.name}</h3>
        {/* Two short details for quick scanning on mobile; the full spec
            list below carries the same information on desktop. */}
        <p className={styles.compact}>
          {specs
            .slice(0, 2)
            .map((s) => s.value)
            .join(" · ")}
        </p>
        <p className={styles.type}>{product.type}</p>
        <div className={styles.specs}>
          {specs.map((s) => (
            <span key={s.label} className={styles.spec}>
              <span className={styles.tick} aria-hidden="true">
                ✓
              </span>
              <span>
                <b>{s.value}</b> {s.label.toLowerCase()}
              </span>
            </span>
          ))}
        </div>
        <span className={styles.more}>
          <span className={styles.moreLong}>View more details</span>
          <span className={styles.moreShort}>View details</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
