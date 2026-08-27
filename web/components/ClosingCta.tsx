"use client";

import Link from "next/link";
import styles from "./ClosingCta.module.css";
import { useContact } from "./ContactProvider";

export default function ClosingCta({ id }: { id?: string }) {
  const { openContact } = useContact();

  return (
    <section id={id} className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.kicker}>
          <span aria-hidden="true" className={styles.rule} />
          Need help choosing?
          <span aria-hidden="true" className={styles.rule} />
        </p>
        <h2 className={styles.title}>Not sure which product is right for you?</h2>
        <p className={styles.lede}>
          Tell us what you need and we’ll help you find the right UKAVA solution.
        </p>
        <div className={styles.actions}>
          <button type="button" onClick={openContact} className={`btn btn-primary ${styles.primary}`}>
            Contact Us &nbsp;→
          </button>
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
