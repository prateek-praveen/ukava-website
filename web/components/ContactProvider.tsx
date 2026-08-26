"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { PHONE_DISPLAY, PHONE_TEL } from "./contact";
import styles from "./ContactProvider.module.css";

type Ctx = { openContact: () => void };

const ContactContext = createContext<Ctx>({ openContact: () => {} });

/** Below the desktop breakpoint the "Contact Us" CTAs dial directly instead
    of opening the dialog, matching the design's one-handed mobile intent. */
const MOBILE_QUERY = "(max-width: 1079px)";

export function useContact(): Ctx {
  return useContext(ContactContext);
}

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openContact = useCallback(() => {
    if (window.matchMedia(MOBILE_QUERY).matches) {
      window.location.href = PHONE_TEL;
      return;
    }
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => closeRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      clearTimeout(t);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  useEffect(() => () => {
    if (copyTimer.current) clearTimeout(copyTimer.current);
  }, []);

  const copyNumber = (e: React.MouseEvent) => {
    // On desktop the number is a copy affordance rather than a dial link.
    if (!window.matchMedia(MOBILE_QUERY).matches) {
      e.preventDefault();
      const write = navigator.clipboard?.writeText
        ? navigator.clipboard.writeText(PHONE_DISPLAY)
        : Promise.reject(new Error("clipboard unavailable"));
      write
        .catch(() => {})
        .finally(() => {
          setCopied(true);
          if (copyTimer.current) clearTimeout(copyTimer.current);
          copyTimer.current = setTimeout(() => setCopied(false), 1800);
        });
    }
  };

  return (
    <ContactContext.Provider value={{ openContact }}>
      {children}
      {open ? (
        <div className={styles.overlay}>
          <div className={styles.backdrop} onClick={close} />
          <div role="dialog" aria-modal="true" aria-label="Talk to our team" className={styles.dialog}>
            <button ref={closeRef} type="button" onClick={close} aria-label="Close" className={styles.close}>
              ×
            </button>
            <p className={styles.kicker}>Contact</p>
            <h2 className={styles.title}>Talk to our team</h2>
            <p className={styles.lede}>
              Need help choosing a product or have a question? Get in touch with us.
            </p>
            <a href={PHONE_TEL} onClick={copyNumber} className={styles.number}>
              {PHONE_DISPLAY}
            </a>
            <p className={styles.sub}>Toll-free customer support</p>
            <div
              aria-live="polite"
              className={styles.toast}
              style={{ opacity: copied ? 1 : 0, transform: `translate(-50%, ${copied ? "0" : "8px"})` }}
            >
              Number copied
            </div>
          </div>
        </div>
      ) : null}
    </ContactContext.Provider>
  );
}
