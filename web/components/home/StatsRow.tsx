import styles from "./StatsRow.module.css";

/* Figures supplied by UKAVA. Anything not verified stays out of this row
   rather than being invented. */
const STATS = [
  { value: "50+", label: "Products" },
  { value: "10L+", label: "Markets served" },
  { value: "25+", label: "Experience" },
  { value: "1K+", label: "Partners" },
];

function Cell({ stat, duplicate }: { stat: (typeof STATS)[number]; duplicate?: boolean }) {
  return (
    <div
      className={`${styles.cell} ${duplicate ? styles.dup : ""}`}
      aria-hidden={duplicate || undefined}
    >
      <span className={styles.value}>{stat.value}</span>
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
