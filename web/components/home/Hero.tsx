"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./Hero.module.css";
import { useContact } from "@/components/ContactProvider";

type Slide = {
  image: string;
  /** Optional purpose-built banner for ≤768px. Drop the file in
   *  `public/img/` and name it here; desktop keeps `image` untouched.
   *  When it is set the slide stops reframing the desktop crop and lets
   *  the mobile artwork fill the stage as authored. */
  mobileImage?: string;
  alt: string;
  headline: string;
  highlightedText: string;
  description: string;
  primaryLink: string;
  secondaryCTA: string;
};

const SLIDES: Slide[] = [
  {
    image: "/img/hero-scooters.webp",
    // mobileImage: "/img/hero-scooters-mobile.webp",
    alt: "UKAVA electric scooters parked at a home charging point",
    headline: "Powering everyday life.",
    highlightedText: "Moving India forward.",
    description:
      "Lithium-powered energy and electric mobility solutions for homes, businesses and roads.",
    primaryLink: "/products/electric-scooters",
    secondaryCTA: "Contact Us",
  },
  {
    image: "/img/hero-batteries.png",
    // mobileImage: "/img/hero-batteries-mobile.webp",
    alt: "UKAVA lithium battery stack and inverter outside a modern home",
    headline: "Reliable energy.",
    highlightedText: "Built to go further.",
    description:
      "Advanced lithium battery solutions designed for everyday reliability and longer-lasting performance.",
    primaryLink: "/products/lithium-batteries",
    secondaryCTA: "Contact Us",
  },
];

const INTERVAL = 5000;

/** Must stay in step with the ≤768px block in Hero.module.css. */
const MOBILE_QUERY = "(max-width: 768px)";

export default function Hero() {
  const { openContact } = useContact();
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const paused = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Autoplay, held while the pointer rests on the stage.
  useEffect(() => {
    if (SLIDES.length < 2) return;
    const timer = setInterval(() => {
      if (paused.current) return;
      setIndex((i) => (i + 1) % SLIDES.length);
    }, INTERVAL);
    return () => clearInterval(timer);
  }, []);

  const go = useCallback((i: number) => {
    const n = SLIDES.length;
    setIndex(((i % n) + n) % n);
  }, []);

  return (
    <section className={styles.section} aria-label="UKAVA">
      <div
        className={styles.stage}
        onMouseEnter={() => {
          paused.current = true;
        }}
        onMouseLeave={() => {
          paused.current = false;
        }}
      >
        {SLIDES.map((slide, i) => {
          const on = i === index;
          return (
            <div
              key={slide.image}
              className={[styles.slide, slide.mobileImage && styles.hasMobileArt]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={!on}
              style={{
                opacity: on ? 1 : 0,
                zIndex: on ? 2 : 1,
                pointerEvents: on ? "auto" : "none",
                transition: reduceMotion
                  ? "none"
                  : `opacity ${on ? "420ms" : "340ms"} cubic-bezier(.4,0,.2,1)`,
              }}
            >
              {/* The browser picks the source before it fetches, so a phone
                  never downloads the desktop banner and vice versa. With no
                  mobileImage the <source> is absent and this is the plain
                  <img> it has always been. */}
              <picture>
                {slide.mobileImage ? (
                  <source media={MOBILE_QUERY} srcSet={slide.mobileImage} />
                ) : null}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={slide.image} alt={slide.alt} fetchPriority={i === 0 ? "high" : "auto"} />
              </picture>
              <div aria-hidden="true" className={styles.scrim} />
              <div aria-hidden="true" className={styles.fade} />

              <div className={styles.copyWrap}>
                <div
                  className={styles.copy}
                  style={{
                    opacity: on ? 1 : 0,
                    transform: reduceMotion || on ? "none" : "translateX(26px)",
                    transition: reduceMotion
                      ? "none"
                      : `opacity 380ms cubic-bezier(.4,0,.2,1) ${on ? "90ms" : "0ms"}, transform 460ms cubic-bezier(.22,.61,.36,1) ${on ? "90ms" : "0ms"}`,
                  }}
                >
                  <h1 className={styles.headline}>
                    {slide.headline}
                    <br />
                    <span>{slide.highlightedText}</span>
                  </h1>
                  <p className={styles.lede}>{slide.description}</p>
                  <div className={styles.actions}>
                    <Link
                      href={slide.primaryLink}
                      className={`btn btn-primary ${styles.primary}`}
                      tabIndex={on ? undefined : -1}
                    >
                      Explore products
                    </Link>
                    <button
                      type="button"
                      onClick={openContact}
                      className={`btn ${styles.secondary}`}
                      tabIndex={on ? undefined : -1}
                    >
                      {slide.secondaryCTA}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        <div role="tablist" aria-label="Hero slides" className={styles.dots}>
          {SLIDES.map((slide, i) => (
            <button
              key={slide.image}
              role="tab"
              type="button"
              aria-selected={i === index}
              aria-label={`Show slide ${i + 1}`}
              onClick={() => go(i)}
              className={`${styles.dot} ${i === index ? styles.dotOn : ""}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
