import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { CATEGORIES, categoryHref } from "@/lib/catalogue";
import { PHONE_DISPLAY, PHONE_TEL, PhoneIcon } from "./contact";

/* Social handles and the legal pages have not been supplied yet, so these
   render as inert marks rather than links to nowhere. */
const SOCIALS = [
  {
    label: "Instagram",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "Facebook",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "YouTube",
    path: (
      <>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
        <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.columns}>
          <div>
            <Link href="/" aria-label="UKAVA home" className={styles.brand}>
              <span className={styles.logoWindow}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/ukava-logo.jpg" alt="UKAVA" />
              </span>
            </Link>
            <p className={styles.blurb}>
              Lithium-powered products for homes, businesses and roads across India.
            </p>
            <a href={PHONE_TEL} className={styles.phonePill}>
              <PhoneIcon size={16} stroke="var(--color-accent)" />
              {PHONE_DISPLAY}
            </a>
          </div>

          <div>
            <h3 className={styles.colTitle}>Products</h3>
            {CATEGORIES.map((c) => (
              <Link key={c.key} href={categoryHref(c.key)} className={styles.colLink}>
                {c.label}
              </Link>
            ))}
          </div>

          <div>
            <h3 className={styles.colTitle}>Company</h3>
            <Link href="/about" className={styles.colLink}>
              About Us
            </Link>
            <Link href="/#partner" className={styles.colLink}>
              Partner With Us
            </Link>
            <Link href="/#contact" className={styles.colLink}>
              Contact
            </Link>
          </div>

          <div>
            <h3 className={styles.colTitle}>Follow us</h3>
            <div className={styles.social}>
              {SOCIALS.map((s) => (
                <span
                  key={s.label}
                  role="img"
                  aria-label={`UKAVA on ${s.label}`}
                  title={`${s.label} — link pending`}
                  className={styles.socialDot}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    {s.path}
                  </svg>
                </span>
              ))}
            </div>
            <p className={styles.pending}>
              Email TBD
              <br />
              Registered address TBD
            </p>
          </div>
        </div>

        <div className={styles.legal}>
          <span>© {new Date().getFullYear()} UKAVA. All rights reserved.</span>
          <span className={styles.legalLinks}>
            <span title="Page pending">Privacy Policy</span>
            <span title="Page pending">Terms of Use</span>
          </span>
          <span>Made in India. Made for India.</span>
        </div>
      </div>
    </footer>
  );
}
