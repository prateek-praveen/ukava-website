"use client";

import { useState } from "react";
import styles from "./WhyUkava.module.css";
import ImageSlot from "@/components/ImageSlot";

const STORIES = [
  {
    title: "Made in India, Built for India",
    body: "Designed and made for Indian homes, businesses and roads. Built to perform reliably in everyday Indian conditions.",
    slot: "ukava-why-1",
    caption: "Manufacturing floor / assembly line · square",
  },
  {
    title: "Decades of Expertise in Battery Technology",
    body: "From lithium batteries to advanced energy solutions. Engineered for reliable performance, safety and longer life.",
    slot: "ukava-why-2",
    caption: "Cells, BMS or battery testing · square",
  },
  {
    title: "All Your Energy Solutions, Under One Brand",
    body: "From electric mobility and batteries to power backup and solar. One connected portfolio for your everyday energy needs.",
    slot: "ukava-why-3",
    caption: "Scooter + battery + inverter + solar + ESS together · square",
  },
  {
    title: "Reliable Support, Even After Your Purchase",
    body: "Backed by warranty and dependable after-sales support. So help is there when you need it.",
    slot: "ukava-why-4",
    caption: "Technician / installation / support · square",
  },
];

export default function WhyUkava() {
  const [open, setOpen] = useState(0);
  // The visual keeps showing the last opened story even when every row is
  // collapsed, so the frame is never blank.
  const [shown, setShown] = useState(0);

  const pick = (i: number) => {
    setOpen((cur) => (cur === i ? -1 : i));
    setShown(i);
  };

  return (
    <section id="why" className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className={styles.kicker}>Why UKAVA</p>
          <h2 className={styles.title}>
            Built on experience.
            <br />
            Engineered for what’s next.
          </h2>
        </div>

        <div className={styles.split}>
          <div className={styles.list}>
            {STORIES.map((s, i) => {
              const on = open === i;
              return (
                <div key={s.title} className={`${styles.item} ${on ? styles.rowOn : ""}`}>
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

          <div className={styles.visual} style={{ order: shown * 2 + 3 }}>
            {STORIES.map((s, i) => (
              <div
                key={s.slot}
                className={styles.layer}
                style={{
                  opacity: shown === i ? 1 : 0,
                  zIndex: shown === i ? 2 : 1,
                  pointerEvents: shown === i ? "auto" : "none",
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
