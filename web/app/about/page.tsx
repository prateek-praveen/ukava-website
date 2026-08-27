import type { Metadata } from "next";
import styles from "./about.module.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import ImageSlot from "@/components/ImageSlot";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "UKAVA is an Indian energy and electric mobility company building solutions across power backup, solar energy, lithium batteries and electric vehicles.",
};

const PROOF = [
  {
    title: "25+ yrs of experience",
    note: "Built on trust. Driven by innovation.",
    icon: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />,
  },
  {
    title: "Built in Uttar Pradesh",
    note: "Manufacturing with scale, quality and care.",
    icon: (
      <>
        <path d="M2 20h20" />
        <path d="M4 20V9l5 3V9l5 3V9l5 3v8" />
        <path d="M4 9 3 4h3l-1 5" />
      </>
    ),
  },
  {
    title: "R&D focused products",
    note: "Engineering reliable solutions for India.",
    icon: (
      <>
        <circle cx="12" cy="8" r="6" />
        <path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" />
      </>
    ),
  },
  {
    title: "Nationwide Support",
    note: "Service network across the country.",
    icon: (
      <>
        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
        <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
      </>
    ),
  },
];

const BUILDS = [
  { title: "Electric Mobility", slot: "ukava-about-build-electric-mobility", caption: "Electric mobility photo" },
  { title: "Lithium Technology", slot: "ukava-about-build-lithium-technology", caption: "Lithium technology photo" },
  { title: "Power Backup", slot: "ukava-about-build-power-backup", caption: "Power backup photo" },
  { title: "Solar Solutions", slot: "ukava-about-build-solar-solutions", caption: "Solar solutions photo" },
];

const WORK_TOP = [
  { slot: "ukava-about-work-battery-assembly", caption: "Battery assembly" },
  { slot: "ukava-about-work-hands-on-components", caption: "Hands on components" },
  { slot: "ukava-about-work-product-testing", caption: "Product testing" },
];

const WORK_BOTTOM = [
  { slot: "ukava-about-work-production-line", caption: "Production line" },
  { slot: "ukava-about-work-assembly-detail", caption: "Assembly detail" },
  { slot: "ukava-about-work-quality-inspection", caption: "Quality inspection" },
];

/** Doubled so each drifting row wraps seamlessly at -50%. */
function WorkRow({
  items,
  direction,
}: {
  items: { slot: string; caption: string }[];
  direction: "left" | "right";
}) {
  const run = [...items, ...items, ...items, ...items];
  return (
    <div
      className={`${styles.workRow} ${direction === "left" ? styles.driftLeft : styles.driftRight}`}
    >
      {run.map((item, i) => (
        <div key={`${item.slot}-${i}`} className={styles.workCard} aria-hidden={i >= items.length}>
          <ImageSlot id={item.slot} placeholder={item.caption} alt={i < items.length ? item.caption : ""} />
        </div>
      ))}
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <SiteHeader active="about" />
      <main>
        <section className={styles.story}>
          <div className={styles.inner}>
            <div className={styles.storyGrid}>
              <div className={styles.portrait}>
                <ImageSlot
                  id="ukava-about-founder"
                  placeholder="Founder portrait · 4:5"
                  alt="UKAVA founder"
                />
              </div>
              <div>
                <p className={styles.eyebrow}>Our Story</p>
                <p className={styles.storyLead}>
                  UKAVA is an Indian energy and electric mobility company building solutions across
                  power backup, solar energy, lithium batteries and electric vehicles.
                </p>
                <p className={styles.storyBody}>
                  Our journey started over 25 years ago with inverters and batteries as people&apos;s
                  use of energy changed.
                  <br />
                  Through all these years, one thing has stayed the same — our focus on building
                  dependable energy solutions that move with changing needs. With decades of
                  experience behind us, we&apos;re now taking that journey forward —{" "}
                  <strong>
                    from powering homes and businesses to powering everyday journeys.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.proof}>
          {PROOF.map((p) => (
            <div key={p.title} className={styles.proofCell}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={1.7}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {p.icon}
              </svg>
              <div>
                <h3 className={styles.proofTitle}>{p.title}</h3>
                <p className={styles.proofNote}>{p.note}</p>
              </div>
            </div>
          ))}
        </div>

        <section className={styles.build}>
          <div className={styles.inner}>
            <div className={styles.buildGrid}>
              <div>
                <p className={styles.eyebrow}>What we build</p>
                <h2 className={styles.buildTitle}>
                  One energy partner.
                  <br />
                  Many solutions.
                </h2>
              </div>
              <div className={styles.buildCards}>
                {BUILDS.map((b) => (
                  <div key={b.slot} className={styles.buildCard}>
                    <ImageSlot id={b.slot} placeholder={b.caption} alt={b.title} />
                    <div className={styles.buildCardHead}>
                      <h3>{b.title}</h3>
                      <span aria-hidden="true" className={styles.buildRule} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={styles.work}>
          <div className={styles.inner}>
            <h2 className={styles.workTitle}>The work behind what we build.</h2>
          </div>
          <div className={styles.workRows}>
            <WorkRow items={WORK_TOP} direction="left" />
            <WorkRow items={WORK_BOTTOM} direction="right" />
          </div>
        </section>

        <ClosingCta />
      </main>
      <SiteFooter />
    </>
  );
}
