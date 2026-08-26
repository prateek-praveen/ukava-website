"use client";

import Link from "next/link";
import { useState } from "react";
import styles from "./ProductDetail.module.css";
import ImageSlot from "@/components/ImageSlot";
import LeadModal, { type LeadRequest } from "@/components/LeadModal";
import {
  CATEGORY_LABELS,
  byCat,
  categoryHref,
  productHref,
  type Product,
} from "@/lib/catalogue";
import { productCopy } from "@/lib/productCopy";
import { productDetailShotId, productShotId, productShots } from "@/lib/slots";

const SHOT_LABELS = ["Main angle", "Side profile", "Front", "Rear three-quarter", "Detail shot"];

export default function ProductDetail({ product }: { product: Product }) {
  const [shot, setShot] = useState(0);
  const [colour, setColour] = useState(0);
  const [openGroup, setOpenGroup] = useState(0);
  const [request, setRequest] = useState<LeadRequest | null>(null);

  const copy = productCopy(product);
  const shots = productShots(product.slug);
  const similar = byCat(product.cat)
    .filter((q) => q.slug !== product.slug)
    .slice(0, 3);

  const openEnquiry = () =>
    setRequest({ kind: "product", product: product.name, source: "product-detail" });

  // Sections with nothing catalogue-backed to show are omitted entirely, so
  // the page closes the gap instead of rendering an empty module.
  const hasCallouts = product.module.length > 0;
  const features = product.features.slice(0, 6);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.inner}>
          <nav aria-label="Breadcrumb" className={styles.crumbs}>
            <Link href="/products">Products</Link>
            <span>/</span>
            <Link href={categoryHref(product.cat)}>{CATEGORY_LABELS[product.cat]}</Link>
            <span>/</span>
            <span className={styles.here}>{product.name}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div className={styles.gallery}>
              <div className={`hscroll ${styles.rail}`}>
                {shots.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setShot(i)}
                    aria-label={`View ${SHOT_LABELS[i]}`}
                    aria-pressed={shot === i}
                    className={`${styles.thumb} ${shot === i ? styles.thumbOn : ""}`}
                  >
                    <ImageSlot
                      id={productShotId(product.slug, i)}
                      placeholder={SHOT_LABELS[i]}
                      alt=""
                    />
                  </button>
                ))}
              </div>
              <div className={styles.main}>
                <ImageSlot
                  id={productShotId(product.slug, shot)}
                  placeholder={`${product.name} — ${SHOT_LABELS[shot]} · 1:1`}
                  alt={`${product.name} — ${SHOT_LABELS[shot]}`}
                  priority
                />
              </div>
            </div>

            <div>
              <p className={styles.typeLabel}>{product.type}</p>
              <h1 className={styles.name}>{product.name}</h1>
              <p className={styles.tagline}>{copy.tagline}</p>

              <div className={styles.primarySpecs}>
                {product.primary.map((s) => (
                  <div key={s.label} className={styles.primarySpec}>
                    <span className={styles.primaryValue}>{s.value}</span>
                    <span className={styles.primaryLabel}>{s.label}</span>
                  </div>
                ))}
              </div>

              {product.colours.length ? (
                <div className={styles.colours}>
                  <span className={styles.coloursLabel}>Available colours</span>
                  <div className={styles.swatches}>
                    {product.colours.map((c, i) => (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColour(i)}
                        aria-label={c.name}
                        aria-pressed={colour === i}
                        title={c.name}
                        style={{ background: c.hex }}
                        className={`${styles.swatch} ${colour === i ? styles.swatchOn : ""}`}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              <div className={styles.actions}>
                <button
                  type="button"
                  onClick={openEnquiry}
                  className={`btn btn-primary ${styles.primaryCta}`}
                >
                  Enquire Now &nbsp;→
                </button>
                <button
                  type="button"
                  onClick={openEnquiry}
                  className={`btn ${styles.secondaryCta}`}
                >
                  Request a Callback
                </button>
              </div>

              <div className={styles.trust}>
                {copy.trust.map((t) => (
                  <span key={t} className={styles.trustItem}>
                    <span aria-hidden="true" className={styles.dot} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionHeadLeft}>
              <span className={styles.stepNum}>01</span>
              <h2 className={styles.sectionTitle}>{copy.whyHeading}</h2>
            </div>
          </div>
          <div className={styles.benefits}>
            {copy.benefits.map((b) => (
              <div key={b.title} className={styles.benefit}>
                <h3>{b.title}</h3>
                <p>{b.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {features.length ? (
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionHeadLeft}>
                <span className={styles.stepNum}>02</span>
                <h2 className={styles.sectionTitle}>{copy.featuresHeading}</h2>
              </div>
            </div>
            <div className={styles.features}>
              {features.map((f) => (
                <div key={f.name} className={styles.feature}>
                  <h3>{f.name}</h3>
                  <p>{f.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {hasCallouts ? (
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionHeadLeft}>
                <span className={styles.stepNum}>03</span>
                <h2 className={styles.sectionTitle}>{product.moduleTitle}</h2>
              </div>
            </div>
            <div className={styles.callout}>
              <div className={styles.calloutArt}>
                <ImageSlot
                  id={productDetailShotId(product.slug)}
                  placeholder={`${product.name} — detail / lifestyle shot`}
                  alt={`${product.name} detail`}
                />
              </div>
              <div className={styles.calloutRows}>
                {product.module.map((c) => (
                  <div key={c.label} className={styles.calloutRow}>
                    <span className={styles.calloutLabel}>{c.label}</span>
                    <span className={styles.calloutValue}>{c.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.sectionHead}>
            <div className={styles.sectionHeadLeft}>
              <span className={styles.stepNum}>04</span>
              <h2 className={styles.sectionTitle}>Complete specifications</h2>
            </div>
            {product.pdf ? (
              <a href={product.pdf} download className={styles.viewAll}>
                Download Specification PDF
              </a>
            ) : null}
          </div>
          <div className={styles.specs}>
            {product.groups.map((g, i) => {
              const on = openGroup === i;
              return (
                <div key={g.title} className={styles.specGroup}>
                  <button
                    type="button"
                    onClick={() => setOpenGroup(on ? -1 : i)}
                    aria-expanded={on}
                    className={styles.specToggle}
                  >
                    <span>{g.title}</span>
                    <span
                      aria-hidden="true"
                      className={`${styles.specIcon} ${on ? styles.specIconOn : ""}`}
                    >
                      {on ? "−" : "+"}
                    </span>
                  </button>
                  {on ? (
                    <div className={styles.specBody}>
                      {g.rows.map((r) => (
                        <div key={r.label} className={styles.specRow}>
                          <span className={styles.specRowLabel}>{r.label}</span>
                          <span className={styles.specRowValue}>{r.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {similar.length ? (
        <section className={styles.section}>
          <div className={styles.inner}>
            <div className={styles.sectionHead}>
              <div className={styles.sectionHeadLeft}>
                <span className={styles.stepNum}>05</span>
                <h2 className={styles.sectionTitle}>Explore similar products</h2>
              </div>
              <Link href={categoryHref(product.cat)} className={styles.viewAll}>
                View all {CATEGORY_LABELS[product.cat]} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <div className={styles.similar}>
              {similar.map((q) => (
                <Link key={q.slug} href={productHref(q)} className={styles.similarCard}>
                  <div className={styles.similarArt}>
                    <div className={styles.similarZoom}>
                      <ImageSlot
                        id={productShotId(q.slug, 0)}
                        placeholder={`${q.name} · 4:3`}
                        alt={q.name}
                      />
                    </div>
                  </div>
                  <div className={styles.similarBody}>
                    <h3>{q.name}</h3>
                    <p className={styles.similarSpecs}>
                      {q.primary
                        .slice(0, 3)
                        .map((x) => x.value)
                        .filter(Boolean)
                        .join("  ·  ")}
                    </p>
                    <span className={styles.similarMore}>
                      View more details <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <LeadModal request={request} onClose={() => setRequest(null)} />
    </>
  );
}
