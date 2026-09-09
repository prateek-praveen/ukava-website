import Link from "next/link";
import styles from "./ProductCard.module.css";
import ImageSlot from "./ImageSlot";
import { productHref, type Series } from "@/lib/catalogue";
import { productShotId } from "@/lib/slots";
import { reveal } from "@/lib/reveal";

/**
 * One card for a whole family. The listing shows LINVA once rather than three
 * times; which model you want is chosen on the detail page, where there is
 * room to compare them.
 *
 * Deliberately the same card as a product's — same module, same frame, same
 * CTA — because to a visitor scanning the grid this is just another product.
 * The only difference is that the chips enumerate the models in the series.
 */
export default function SeriesCard({
  series,
  index = 0,
}: {
  series: Series;
  index?: number;
}) {
  const first = series.items[0];

  return (
    <Link href={productHref(first)} className={styles.card} {...reveal("item", index)}>
      <div className={styles.frame}>
        <div className={styles.zoom}>
          <ImageSlot
            id={productShotId(first.slug, 0)}
            alt={series.label}
            placeholder={`${series.label} · product photo`}
          />
        </div>
      </div>
      <div className={styles.body}>
        <span className={styles.index} aria-hidden="true" />
        <h3 className={styles.name}>{series.label}</h3>
        <p className={styles.type}>{series.positioning}</p>
        {/* Just the models. "Solar Ready" was on every LINVASOL card and on
            none of the LINVA ones, which is exactly what the positioning line
            above already says — the chip only repeated it. */}
        <div className={styles.chips}>
          {series.items.map((p) => (
            <span key={p.slug} className={styles.chip}>
              {p.variant?.[0]?.value ?? p.name}
            </span>
          ))}
        </div>
        <p className={styles.benefit}>{series.benefit}</p>
        <span className={styles.more}>
          <span className={styles.moreLong}>
            View {series.items.length} models
          </span>
          <span className={styles.moreShort}>View details</span>
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </Link>
  );
}
