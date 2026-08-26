import type { Metadata } from "next";
import Link from "next/link";
import styles from "./about.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import ImageSlot from "@/components/ImageSlot";
import { CATEGORIES, categoryHref } from "@/lib/catalogue";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "UKAVA manufactures lithium-powered products across electric scooters, lithium batteries, inverter systems and solar solutions — engineered under one brand.",
};

const PILLAR_NOTES: Record<string, string> = {
  "electric-scooters": "Nine models across scooters, three-wheelers and cargo vehicles.",
  "lithium-batteries": "LFP batteries for inverters, two- and three-wheelers, and energy storage.",
  "inverter-battery": "LINVA inverters with inbuilt lithium batteries for homes, offices and shops.",
  "solar-solutions": "LINVASOL solar PCUs with inbuilt lithium batteries and panel sizing.",
};

const POINTS = [
  {
    title: "Manufactured in India",
    note: "Built domestically with UKAVA's own engineering and quality control.",
  },
  {
    title: "LFP battery expertise",
    note: "Lithium chemistry with built-in battery management, applied across energy and mobility.",
  },
  {
    title: "One connected portfolio",
    note: "Mobility, batteries, backup and solar engineered under a single brand.",
  },
  {
    title: "Warranty on every product",
    note: "Up to 10 years on lithium inverter batteries and LINVA systems; 3 years across vehicle battery ranges.",
  },
];

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />
      <main>
        <section className={styles.hero}>
          <div className={styles.inner}>
            <nav aria-label="Breadcrumb" className={styles.crumbs}>
              <Link href="/">Home</Link>
              <span>/</span>
              <span className={styles.here}>About Us</span>
            </nav>
            <p className={styles.kicker}>Energy + Electric Mobility</p>
            <h1 className={styles.heroTitle}>Building India&apos;s energy and mobility ecosystem.</h1>
            <p className={styles.heroLede}>
              UKAVA manufactures lithium-powered products across electric scooters, lithium
              batteries, inverter systems and solar solutions — engineered under one brand for
              homes, businesses and roads.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.inner}>
            <h2 className={styles.sectionTitle}>What UKAVA builds</h2>
            <div className={styles.fourUp}>
              {CATEGORIES.map((c) => (
                <Link key={c.key} href={categoryHref(c.key)} className={styles.pillar}>
                  <h3>{c.label}</h3>
                  <p>{PILLAR_NOTES[c.key]}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.onWhite}`}>
          <div className={styles.split}>
            <div>
              <h2 className={styles.splitTitle}>Engineered in India, built to last</h2>
              <div className={styles.points}>
                {POINTS.map((p) => (
                  <div key={p.title}>
                    <span aria-hidden="true" className={styles.pointRule} />
                    <h3>{p.title}</h3>
                    <p>{p.note}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className={`grayscale ${styles.figure} ${styles.portrait}`}>
              <ImageSlot
                id="ukava-about-facility"
                placeholder="Manufacturing / facility photo · 4:5"
                alt="UKAVA manufacturing facility"
              />
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.split}>
            <div>
              <p className={styles.b2bTag}>For Businesses</p>
              <h2 className={styles.splitTitle}>
                Grow with UKAVA across energy &amp; electric mobility.
              </h2>
              <p className={styles.partnerLede}>
                Dealers and distributors can work across the full portfolio — scooters, lithium
                batteries, LINVA inverters and LINVASOL solar systems.
              </p>
              <Link href="/#partner" className={`btn btn-primary ${styles.partnerCta}`}>
                Become a UKAVA Partner
              </Link>
            </div>
            <div className={`grayscale ${styles.figure} ${styles.landscape}`}>
              <ImageSlot
                id="ukava-about-dealer"
                placeholder="Dealer storefront photo · 4:3"
                alt="UKAVA dealer storefront"
              />
            </div>
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
