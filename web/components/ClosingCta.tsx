"use client";

import Link from "next/link";
import styles from "./ClosingCta.module.css";
import { ContactCta } from "./ContactAction";

export default function ClosingCta({ id }: { id?: string }) {

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Need help choosing?</h2>
        <p className={styles.lede}>
          Talk to us about your requirement and we’ll help you find the right solution.
        </p>
        <div className={styles.actions}>
          <ContactCta className={`btn btn-primary ${styles.primary}`}>
            Contact Us &nbsp;→
          </ContactCta>
          <Link href="/products" className={`btn ${styles.secondary}`}>
            Explore Products
          </Link>
        </div>
      </div>
      <div aria-hidden="true" className={styles.scene}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/cta-scene-2.png" alt="" />
      </div>
    </section>
  );
}
