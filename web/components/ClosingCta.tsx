"use client";

import Link from "next/link";
import styles from "./ClosingCta.module.css";
import { ContactCta } from "./ContactAction";
import { reveal } from "@/lib/reveal";

export default function ClosingCta({ id }: { id?: string }) {

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title} {...reveal("heading")}>
          Need help choosing?
        </h2>
        <p className={styles.lede} {...reveal("text")}>
          Talk to us about your requirement and we’ll help you find the right solution.
        </p>
        {/* One step behind the lede, so the pair arrives with the copy it
            belongs to instead of announcing itself. */}
        <div className={styles.actions} {...reveal("item", 2)}>
          <ContactCta className={`btn btn-primary ${styles.primary}`}>
            Contact Us &nbsp;→
          </ContactCta>
          <Link href="/products" className={`btn ${styles.secondary}`}>
            Explore Products
          </Link>
        </div>
      </div>
      <div aria-hidden="true" className={styles.scene} {...reveal("image")}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/cta-scene-2.png" alt="" />
      </div>
    </section>
  );
}
