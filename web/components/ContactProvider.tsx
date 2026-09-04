"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { PHONE_DISPLAY } from "./contact";
import ContactModal from "./ContactModal";
import styles from "./ContactProvider.module.css";

/**
 * The desktop edge of the site's existing breakpoint ladder (1080 / 1180 /
 * 1320). At or below it every contact CTA dials straight out; above it the
 * dialog opens and the number copies. One query, read the same way
 * everywhere, so the CTAs cannot disagree with each other.
 */
const DESKTOP_QUERY = "(min-width: 1080px)";

function subscribe(onChange: () => void) {
  const mq = window.matchMedia(DESKTOP_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

const isDesktopNow = () => window.matchMedia(DESKTOP_QUERY).matches;

/** Media queries do not exist during prerender, so the server assumes the
    desktop affordance and the client corrects on hydration. The markup is a
    `tel:` link either way, so a phone dials correctly even before that. */
const assumeDesktop = () => true;

/** Reads the breakpoint reactively — no user-agent sniffing. */
export function useIsDesktop(): boolean {
  return useSyncExternalStore(subscribe, isDesktopNow, assumeDesktop);
}

type Ctx = {
  isDesktop: boolean;
  /** The one contact action, shared by every "Contact Us", "Contact Now" and
      "Become a Dealer" CTA: dialog on desktop, dialer on mobile. */
  onContactClick: (e: React.MouseEvent) => void;
  /** For a toll-free number rendered on the page: copy on desktop, dial on
      mobile. */
  onNumberClick: (e: React.MouseEvent) => void;
  /** Opens the dialog without a click — for non-pointer callers. */
  openContact: () => void;
};

const ContactContext = createContext<Ctx>({
  isDesktop: true,
  onContactClick: () => {},
  onNumberClick: () => {},
  openContact: () => {},
});

export function useContact(): Ctx {
  return useContext(ContactContext);
}

/**
 * Clipboard API first; a hidden textarea and execCommand behind it, which
 * still works on http:// origins and older browsers where
 * navigator.clipboard is missing or blocked.
 */
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    // fall through to the textarea
  }
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-1000px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  } catch {
    return false;
  }
}

export default function ContactProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isDesktop = useIsDesktop();

  useEffect(
    () => () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    },
    [],
  );

  const raiseToast = useCallback((message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2000);
  }, []);

  const copyNumber = useCallback(() => {
    void copyToClipboard(PHONE_DISPLAY).then((ok) => {
      // Never claim a copy that did not happen — if both routes fail, the
      // toast reads out the number so it can still be written down.
      raiseToast(ok ? "Number copied" : `Copy blocked — ${PHONE_DISPLAY}`);
    });
  }, [raiseToast]);

  const openContact = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  // Both handlers read the breakpoint at click time rather than trusting
  // render state, so a resize between paint and click cannot strand a CTA in
  // the wrong mode. Neither ever leaves the `tel:` href to navigate on
  // desktop, and neither swallows it on mobile.
  const onContactClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktopNow()) return;
      e.preventDefault();
      setOpen(true);
    },
    [],
  );

  const onNumberClick = useCallback(
    (e: React.MouseEvent) => {
      if (!isDesktopNow()) return;
      e.preventDefault();
      copyNumber();
    },
    [copyNumber],
  );

  return (
    <ContactContext.Provider value={{ isDesktop, onContactClick, onNumberClick, openContact }}>
      {children}
      {open ? <ContactModal onClose={close} onCopy={copyNumber} /> : null}
      {/* One toast for the whole site: the number is copyable from the header
          and footer too, not only from inside the dialog. */}
      <div role="status" aria-live="polite" className={styles.toastLayer}>
        <span
          className={styles.toast}
          style={{ opacity: toast ? 1 : 0, transform: `translateY(${toast ? "0" : "8px"})` }}
        >
          {toast}
        </span>
      </div>
    </ContactContext.Provider>
  );
}
