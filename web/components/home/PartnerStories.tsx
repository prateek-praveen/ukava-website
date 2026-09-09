"use client";

import styles from "./PartnerStories.module.css";
import ImageSlot from "@/components/ImageSlot";
import Reveal from "@/components/Reveal";
import { ContactCta } from "@/components/ContactAction";
import { reveal } from "@/lib/reveal";

/**
 * NOT YET SIGNED OFF — these six partner names, cities and quotes were
 * supplied for layout and have not been confirmed as real, attributable
 * testimonials from named businesses. A testimonial presented as a customer's
 * words has to be one; publishing an invented quote against a company name is
 * a misleading commercial claim, not a design placeholder. Get each partner's
 * written sign-off, or replace the section with copy that does not attribute
 * anything to anyone, before this goes to production.
 */
const STORIES = [
  {
    slot: "ukava-partner-voltway",
    quote:
      "We started with batteries and gradually added more products. Having a wider range from one company has made things easier for us.",
    partner: "Voltway Energy",
    location: "Jaipur",
  },
  {
    slot: "ukava-partner-gridline",
    quote:
      "The team is easy to reach whenever we need product details or help with an order. That makes a real difference in day-to-day business.",
    partner: "Gridline Power Solutions",
    location: "Coimbatore",
  },
  {
    slot: "ukava-partner-evara",
    quote:
      "We were new to electric mobility when we started. The product guidance and support helped us get comfortable with the category.",
    partner: "Evara Mobility",
    location: "Lucknow",
  },
  {
    slot: "ukava-partner-northstar",
    quote:
      "The products have worked well for the customers we serve, and communication with the team has always been straightforward.",
    partner: "Northstar Batteries",
    location: "Pune",
  },
  {
    slot: "ukava-partner-suncrest",
    quote:
      "Being able to offer solar, batteries and power backup gives us more options for different customer requirements.",
    partner: "Suncrest Energy",
    location: "Ahmedabad",
  },
  {
    slot: "ukava-partner-motive",
    quote:
      "What works for us is the product range and timely support. When we have a question, getting help is usually quick and straightforward.",
    partner: "Motive Electric",
    location: "Indore",
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
        {/* A company mark, not a face: square and contained rather than a
            round crop, and left in colour — a logo greyscaled reads as
            broken, where a photograph reads as styled. */}
        <div className={styles.logo}>
          <ImageSlot id={story.slot} placeholder={story.partner} alt="" />
        </div>
        <div className={styles.who}>
          <strong>{story.partner}</strong>
          <span>{story.location}</span>
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
            <p className={styles.kicker} {...reveal("heading")}>
              Our partners
            </p>
            <h2 className={styles.title} {...reveal("text")}>
              Growing together with our partners.
            </h2>
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
