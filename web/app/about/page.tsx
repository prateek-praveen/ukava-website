import type { Metadata } from "next";
import { reveal } from "@/lib/reveal";
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

/* Five photographs rather than the six the layout was drafted for, and the
   captions name what is actually in each frame — they are the alt text, so
   an invented one would describe a picture nobody is looking at. The rows
   repeat their run four times, so an uneven split still drifts evenly. */
const WORK_TOP = [
  { slot: "ukava-about-work-battery-assembly", caption: "Assembling a battery pack" },
  { slot: "ukava-about-work-product-testing", caption: "Testing a pack before it ships" },
  { slot: "ukava-about-work-production-line", caption: "Scooters ready for dispatch" },
];

const WORK_BOTTOM = [
  { slot: "ukava-about-work-product-range", caption: "The full product range" },
  { slot: "ukava-about-work-team", caption: "The UKAVA team" },
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
        {/* Full-bleed plant exterior, replacing the founder portrait that used
            to sit beside the copy: the company, not a person.

            A <picture> rather than an ImageSlot, which carries one asset per
            slot. The two cuts are far apart — 2:1 across on a desktop, 2:3
            upright on a phone — and either one forced into the other frame
            would lose about a third of itself. The browser picks before it
            fetches, so a phone never downloads the wide file. */}
        <div className={styles.banner}>
          <picture>
            <source media="(max-width: 768px)" srcSet="/img/about-banner-mobile.webp" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/about-banner.webp"
              alt="The UKAVA manufacturing plant"
              fetchPriority="high"
            />
          </picture>
        </div>

        <section className={styles.story}>
          <div className={styles.inner}>
            <div className={styles.storyGrid}>
              <div>
                {/* The "Our Story" eyebrow is gone: the banner above it has
                    already said where you are, and it was one more thing
                    between the top of the page and the first sentence. */}
                {/* The page's h1. It was a <p>, which left /about with no
                    top-level heading at all — this sentence is what the page
                    is about, so it is the heading. Styling is unchanged: the
                    class now pins the weight and line-height that the global
                    h1 rule would otherwise have overridden. */}
                <h1 className={styles.storyLead} {...reveal("heading")}>
                  UKAVA is an Indian energy and electric mobility company building solutions across
                  power backup, solar, lithium batteries and electric vehicles.
                </h1>
                <p className={styles.storyBody} {...reveal("text")}>
                  What began over 25 years ago with inverters and batteries has grown with
                  India’s changing energy needs. Today, we’re taking that experience forward —{" "}
                  {/* The closing clause keeps the weight the design gave it. */}
                  <strong>
                    from powering homes and businesses to powering everyday journeys.
                  </strong>
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.proof}>
          {PROOF.map((p, i) => (
            <div key={p.title} className={styles.proofCell} {...reveal("item", i)}>
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
                <p className={styles.eyebrow} {...reveal("heading")}>
                  What we build
                </p>
                <h2 className={styles.buildTitle} {...reveal("text")}>
                  One energy partner.
                  <br />
                  Many solutions.
                </h2>
              </div>
              <div className={styles.buildCards}>
                {BUILDS.map((b, i) => (
                  <div key={b.slot} className={styles.buildCard} {...reveal("item", i)}>
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
            <h2 className={styles.workTitle} {...reveal("heading")}>
              The work behind what we build.
            </h2>
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
