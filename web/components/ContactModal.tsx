"use client";

import { useCallback, useEffect, useId, useRef } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "./contact";
import styles from "./ContactProvider.module.css";

/** Everything inside the dialog that can take focus, in DOM order. */
const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

type Props = {
  onClose: () => void;
  /** Copies the number and raises the toast; shared with the number displays
      in the header and footer, so it lives in the provider. */
  onCopy: () => void;
};

/**
 * The single contact dialog. Mounted once by ContactProvider — never per
 * call site — so there is exactly one instance and one set of listeners no
 * matter how many CTAs the page carries.
 *
 * Only rendered above the desktop breakpoint; below it every contact CTA is
 * a plain `tel:` link that dials, so this never appears on a phone.
 */
export default function ContactModal({ onClose, onCopy }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const titleId = useId();
  const descId = useId();

  // Focus moves into the dialog on open and back to whatever opened it on
  // close, so keyboard and screen-reader users are never dropped at the top
  // of the document.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const t = setTimeout(() => dialogRef.current?.focus(), 20);
    return () => {
      clearTimeout(t);
      if (opener?.isConnected) opener.focus();
    };
  }, []);

  // Scroll lock. The provider renders one dialog at a time, so this cannot
  // fight another instance for the same style property.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Focus trap: Tab off either end wraps to the other.
      const nodes = dialogRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE);
      if (!nodes || nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && (active === first || active === dialogRef.current)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [onClose],
  );

  return (
    <div className={styles.overlay}>
      {/* Clicking outside dismisses. Inert to assistive tech — Escape and the
          close button are the accessible routes out. */}
      <div aria-hidden="true" className={styles.backdrop} onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className={styles.dialog}
      >
        <button type="button" onClick={onClose} aria-label="Close" className={styles.close}>
          ×
        </button>
        <p className={styles.kicker}>Contact</p>
        <h2 id={titleId} className={styles.title}>
          Contact UKAVA
        </h2>
        <p id={descId} className={styles.lede}>
          Call us on our toll-free number
        </p>
        {/* Still a tel: link, so a desktop with a softphone can dial it and
            the number is selectable; the click copies instead. */}
        <a
          href={PHONE_TEL}
          onClick={(e) => {
            e.preventDefault();
            onCopy();
          }}
          className={styles.number}
        >
          {PHONE_DISPLAY}
        </a>
        <p className={styles.sub}>Toll-free customer support</p>
        <button
          type="button"
          onClick={onCopy}
          className={`btn ${styles.copyCta}`}
          aria-label={`Copy ${PHONE_DISPLAY} to the clipboard`}
        >
          Copy number
        </button>
      </div>
    </div>
  );
}
