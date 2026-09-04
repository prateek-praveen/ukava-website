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
 */
export function ContactCta({ className, children, tabIndex, ...rest }: Props) {
  const { onContactClick, isDesktop } = useContact();
  return (
    <a
      href={PHONE_TEL}
      target="_top"
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
      target="_top"
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
