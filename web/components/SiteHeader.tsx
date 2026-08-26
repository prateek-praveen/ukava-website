"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./SiteHeader.module.css";
import { PHONE_DISPLAY, PHONE_TEL, PhoneIcon } from "./contact";

type Props = {
  active: "home" | "products" | "about";
  /** The homepage header floats over the hero and only grows a rule on
      scroll; inner pages carry a permanent hairline. */
  variant?: "translucent" | "solid";
};

export default function SiteHeader({ active, variant = "solid" }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (variant !== "translucent") return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [variant]);

  const close = () => setMenuOpen(false);

  const cls = [
    styles.header,
    variant === "translucent" ? styles.translucent : styles.solid,
    scrolled ? styles.scrolled : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <header className={cls}>
      <div className={styles.bar}>
        <Link href="/" aria-label="UKAVA home" className={styles.brand}>
          <span className={styles.logoWindow}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/img/ukava-logo.jpg" alt="UKAVA — EV & Lithium Battery" />
          </span>
        </Link>

        <nav className={styles.nav}>
          <Link href="/" className={`${styles.link} ${active === "home" ? styles.active : ""}`}>
            Home
          </Link>
          <Link
            href="/products"
            className={`${styles.link} ${active === "products" ? styles.active : ""}`}
          >
            Products
          </Link>
          <Link href="/about" className={`${styles.link} ${active === "about" ? styles.active : ""}`}>
            About Us
          </Link>
          <a href={PHONE_TEL} className={styles.phone}>
            <PhoneIcon stroke="var(--color-accent)" />
            <span>{PHONE_DISPLAY}</span>
          </a>
        </nav>

        <a
          href={PHONE_TEL}
          aria-label={`Call UKAVA on ${PHONE_DISPLAY}`}
          className={styles.callButton}
        >
          <PhoneIcon stroke="#fff" />
        </a>
        <button
          type="button"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Menu"
          aria-expanded={menuOpen}
          className={styles.burger}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {menuOpen ? (
        <div className={styles.sheet}>
          <Link href="/" onClick={close} className={styles.sheetLink}>
            Home
          </Link>
          <Link href="/products" onClick={close} className={styles.sheetLink}>
            Explore Products
          </Link>
          <Link href="/about" onClick={close} className={styles.sheetLink}>
            About Us
          </Link>
        </div>
      ) : null}
    </header>
  );
}
