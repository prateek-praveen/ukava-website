import styles from "./StatsRow.module.css";

/* Figures supplied by UKAVA. Anything not verified stays out of this row
   rather than being invented. */
const STATS = [
  {
    value: "20K+",
    label: "Verified partners",
    icon: (
      <>
        <path d="M11 17l2 2a1 1 0 0 0 1.5-.1l4-5.4a1 1 0 0 0-.1-1.3L14 8" />
        <path d="M13 7l-2-2a1 1 0 0 0-1.5.1l-4 5.4a1 1 0 0 0 .1 1.3L10 16" />
        <path d="M3 12l2.5-3.5" />
        <path d="M21 12l-2.5 3.5" />
      </>
    ),
  },
  {
    value: "10L+",
    label: "Markets served",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
  {
    value: "100+",
    label: "Products",
    icon: (
      <>
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
        <line x1="12" y1="22.08" x2="12" y2="12" />
      </>
    ),
  },
  {
    value: "20+ yrs",
    label: "Industry experience",
    icon: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11.5 14.5 15.5 10" />
      </>
    ),
  },
];

function Cell({ stat, duplicate }: { stat: (typeof STATS)[number]; duplicate?: boolean }) {
  return (
    <div
      className={`${styles.cell} ${duplicate ? styles.dup : ""}`}
      aria-hidden={duplicate || undefined}
    >
      <div className={styles.figure}>
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={1.7}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ flex: "0 0 auto" }}
        >
          {stat.icon}
        </svg>
        <span className={styles.value}>{stat.value}</span>
      </div>
      <span className={styles.label}>{stat.label}</span>
    </div>
  );
}

export default function StatsRow() {
  return (
    <div className={styles.band}>
      <div className={styles.inner}>
        <div className={styles.grid}>
          {/* `.track` is display:contents above 768px, so the cells stay
              direct grid items and the desktop row is untouched. Below it,
              the track becomes a marquee and the duplicate run — hidden on
              desktop — makes the loop seamless. */}
          <div className={styles.track}>
            {STATS.map((s) => (
              <Cell key={s.label} stat={s} />
            ))}
            {STATS.map((s) => (
              <Cell key={`${s.label}-dup`} stat={s} duplicate />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
