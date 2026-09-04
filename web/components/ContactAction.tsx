"use client";

import { PHONE_DISPLAY, PHONE_TEL } from "./contact";
import { useContact } from "./ContactProvider";

type Props = {
  className?: string;
  children: React.ReactNode;
  /** Hero slides park their off-screen copy out of the tab order. */
  tabIndex?: number;
  "aria-label"?: string;
};

/**
 * Every contact CTA on the site — "Contact Us", "Contact Now", "Become a
 * Dealer" — renders through here.
 *
 * It is an anchor rather than a button on purpose: the href is the real
 * `tel:` number, so on a phone it dials even before React hydrates and with
 * scripting off entirely, and it can never land on a blank route or a `#`.
 * On desktop the shared handler cancels the navigation and opens the dialog
 * instead.
 *
 * Deliberately no `target`. Measured across iframe sandbox configurations,
 * a bare anchor is the most permissive form there is: it survives a sandbox
 * granting `allow-popups`, and one granting `allow-top-navigation-by-user-
 * activation`. `_top` is blocked by the first ("Unsafe attempt to initiate
 * navigation") and `_blank` by the second ("Blocked opening"). Unframed —
 * the deployed site — every form works, so the bare one costs nothing.
 */
export function ContactCta({ className, children, tabIndex, ...rest }: Props) {
  const { onContactClick, isDesktop } = useContact();
  return (
    <a
      href={PHONE_TEL}
      onClick={onContactClick}
      tabIndex={tabIndex}
      aria-haspopup={isDesktop ? "dialog" : undefined}
      className={className}
      {...rest}
    >
      {children}
    </a>
  );
}

/**
 * A toll-free number shown on the page. Tapping dials; clicking on desktop
 * copies and raises the toast.
 */
export function ContactNumber({ className, children, tabIndex, ...rest }: Props) {
  const { onNumberClick, isDesktop } = useContact();
  return (
    <a
      href={PHONE_TEL}
      onClick={onNumberClick}
      tabIndex={tabIndex}
      aria-label={
        rest["aria-label"] ??
        (isDesktop ? `Copy ${PHONE_DISPLAY} to the clipboard` : `Call UKAVA on ${PHONE_DISPLAY}`)
      }
      className={className}
    >
      {children}
    </a>
  );
}
