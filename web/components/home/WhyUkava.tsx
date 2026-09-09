"use client";

import { useEffect, useState } from "react";
import styles from "./WhyUkava.module.css";
import ImageSlot from "@/components/ImageSlot";
import { reveal } from "@/lib/reveal";

const STORIES = [
  {
    title: "Made in India",
    body: "Designed and built for Indian homes, businesses and roads, with products made for everyday Indian conditions.",
    slot: "ukava-why-1",
    caption: "Manufacturing floor / assembly line · square",
  },
  {
    title: "25+ Years of Energy Experience",
    body: "Our journey began with power backup. Today, that experience extends across batteries, solar, lithium technology and electric mobility.",
    slot: "ukava-why-2",
    caption: "Cells, BMS or battery testing · square",
  },
  {
    title: "More Solutions. One Trusted Partner.",
    body: "Electric scooters, lithium batteries, power backup and solar, a growing portfolio for homes, businesses and mobility.",
    slot: "ukava-why-3",
    caption: "Scooter + battery + inverter + solar + ESS together · square",
  },
  {
    title: "Support Beyond the Sale",
    body: "From product guidance to after-sales support, our team is here when you need us.",
    slot: "ukava-why-4",
    caption: "Technician / installation / support · square",
  },
];

// Hover-to-expand is for the desktop layout only, and it is gated on three
// things at once. `hover: hover` and `pointer: fine` keep it away from touch,
// where a :hover sticks after the tap and would leave a row stuck open. The
// width keeps it to the two-column layout: stacked, the picture sits *between*
// the rows, so previewing on hover would shove the list around under the
// cursor every time the pointer crossed a row.
const HOVER_QUERY = "(min-width: 1080px) and (hover: hover) and (pointer: fine)";

export default function WhyUkava() {
  const [open, setOpen] = useState(0);
  // The visual keeps showing the last opened story even when every row is
  // collapsed, so the frame is never blank.
  const [shown, setShown] = useState(0);
  const [hoverable, setHoverable] = useState(false);
  const [hovered, setHovered] = useState(-1);

  // False on the server and on the first client render, so hydration matches;
  // hover cannot have happened before then anyway.
  useEffect(() => {
    const mq = window.matchMedia(HOVER_QUERY);
    const sync = () => setHoverable(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Hover only previews a story. Whatever was clicked stays pinned underneath
  // and comes back the moment the pointer leaves.
  const previewing = hoverable && hovered >= 0;
  const active = previewing ? hovered : open;
  const picture = previewing ? hovered : shown;

  const pick = (i: number) => {
    // Where hover drives the panel, a click pins rather than toggles: closing
    // a row the pointer is still sitting on would be undone immediately by
    // that same hover, so the click would read as having done nothing.
    setOpen((cur) => (!hoverable && cur === i ? -1 : i));
    setShown(i);
  };

  return (
    <section id="why" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.kicker} {...reveal("heading")}>
            Why UKAVA
          </p>
          <h2 className={styles.title} {...reveal("text")}>
            Built on experience.
            <br />
            Engineered for what’s next.
          </h2>
        </div>

        {/* Leaving is caught on the whole split, not the list: moving the
            pointer from a row towards its picture should keep that story
            previewed, not snap the panel shut halfway across. */}
        <div className={styles.split} onMouseLeave={() => setHovered(-1)}>
          <div className={styles.list}>
            {STORIES.map((s, i) => {
              const on = active === i;
              return (
                <div
                  key={s.title}
                  className={`${styles.item} ${on ? styles.rowOn : ""}`}
                  onMouseEnter={() => setHovered(i)}
                  {...reveal("item", i)}
                >
                  <button
                    type="button"
                    onClick={() => pick(i)}
                    aria-expanded={on}
                    className={styles.row}
                  >
                    <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.rowTitle}>{s.title}</span>
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={on ? "var(--color-accent)" : "rgba(0,0,0,.35)"}
                      strokeWidth={2.2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      aria-hidden="true"
                      className={styles.chev}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  <div className={`${styles.panel} ${on ? styles.panelOn : ""}`}>
                    <div className={styles.panelClip}>
                      <div className={styles.panelBody}>
                        <p>{s.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className={styles.visual}
            style={{ order: picture * 2 + 3 }}
            {...reveal("image")}
          >
            {STORIES.map((s, i) => (
              <div
                key={s.slot}
                className={styles.layer}
                style={{
                  opacity: picture === i ? 1 : 0,
                  zIndex: picture === i ? 2 : 1,
                  pointerEvents: picture === i ? "auto" : "none",
                }}
              >
                <ImageSlot id={s.slot} placeholder={s.caption} alt={s.title} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
