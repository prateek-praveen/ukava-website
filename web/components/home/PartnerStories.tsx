"use client";

import styles from "./PartnerStories.module.css";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import { ContactCta } from "@/components/ContactAction";

/**
 * PLACEHOLDER CONTENT — these six dealer identities and quotes were invented
 * for layout only and must be replaced with real, signed-off partner stories
 * (name, business, city, quote, photograph) before launch.
 */
const STORIES = [
  {
    slot: "ukava-dealer-1",
    quote: "UKAVA helped us expand our offering beyond batteries into electric mobility.",
    name: "Rajesh Kumar",
    business: "Kumar Auto & Batteries · Jaipur",
  },
  {
    slot: "ukava-dealer-2",
    quote: "The wider portfolio helped us serve more customer needs from one brand.",
    name: "Meena Iyer",
    business: "Iyer Power Solutions · Coimbatore",
  },
  {
    slot: "ukava-dealer-3",
    quote: "Product support and quick responses made onboarding much easier.",
    name: "Sandeep Verma",
    business: "Verma E-Mobility · Lucknow",
  },
  {
    slot: "ukava-dealer-4",
    quote: "A reliable business relationship that keeps our shelves moving.",
    name: "Farhan Shaikh",
    business: "Shaikh Energy Store · Pune",
  },
  {
    slot: "ukava-dealer-5",
    quote: "Onboarding was quick and stock reaches us when promised.",
    name: "Gurpreet Singh",
    business: "Singh Battery House · Ludhiana",
  },
  {
    slot: "ukava-dealer-6",
    quote: "Adding solar to our counter opened a second revenue line.",
    name: "Anita Das",
    business: "Das Solar & Power · Bhubaneswar",
  },
];

function Card({ story, duplicate }: { story: (typeof STORIES)[number]; duplicate?: boolean }) {
  return (
    <figure
      className={`${styles.card} ${duplicate ? styles.duplicate : ""}`}
      aria-hidden={duplicate || undefined}
    >
      <span className={styles.stars} aria-hidden="true">
        ★★★★★
      </span>
      <blockquote className={styles.quote}>{story.quote}</blockquote>
      <div className={styles.person}>
        <div className={`grayscale ${styles.avatar}`}>
          <ImageSlot id={story.slot} placeholder="Photo" alt="" />
        </div>
        <div className={styles.who}>
          <strong>{story.name}</strong>
          <span>{story.business}</span>
        </div>
      </div>
    </figure>
  );
}

export default function PartnerStories() {
  return (
    <section id="partner" className={styles.section}>
      <div aria-hidden="true" className={styles.scene}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/img/testimonial-scene-2.png" alt="" />
      </div>
      <div aria-hidden="true" className={styles.veil} />

      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <div>
            <p className={styles.kicker}>Our partners</p>
            <h2 className={styles.title}>Growing together with our partners.</h2>
          </div>
          <ContactCta className={`btn btn-primary ${styles.partnerCta}`}>
            Become a UKAVA Partner &nbsp;→
          </ContactCta>
        </Reveal>
      </div>

      <div className={`hscroll ${styles.rail}`}>
        {/* The run is doubled so the marquee wraps seamlessly at -50%. */}
        <div className={styles.track}>
          {STORIES.map((s) => (
            <Card key={s.slot} story={s} />
          ))}
          {STORIES.map((s) => (
            <Card key={`${s.slot}-dup`} story={s} duplicate />
          ))}
        </div>
      </div>
    </section>
  );
}
