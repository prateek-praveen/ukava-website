import Link from "next/link";
import styles from "./SiteFooter.module.css";
import { CATEGORIES, categoryHref } from "@/lib/catalogue";
import { PHONE_DISPLAY, PhoneIcon } from "./contact";
import { ContactNumber } from "./ContactAction";

/* The legal pages have not been supplied yet, so those render as inert
   marks rather than links to nowhere. The three social accounts below are
   UKAVA's own, confirmed by the client.

   The Instagram URL arrived with an `igsi` share-tracking parameter on it;
   it is dropped here — the profile resolves without it and the token only
   attributes the click back to whoever copied the link. */
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/ukava_ev_and_lithium_battery/",
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
    href: "https://www.facebook.com/ukavaevandlithiumbattery/",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/ukavaevandlithiumbattery/",
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
            <ContactNumber className={styles.phonePill}>
              <PhoneIcon size={16} stroke="var(--color-accent)" />
              {PHONE_DISPLAY}
            </ContactNumber>
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
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`UKAVA on ${s.label}`}
                  title={s.label}
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
                </a>
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
