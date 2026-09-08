"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Scroll reveal for the whole site, driven by one observer.
 *
 * Markup opts in with a plain `data-reveal="heading|text|image|item"`
 * attribute, so a server component can use it without a client boundary and
 * without a wrapper element — nothing is added to the DOM, so nothing can
 * shift the layout. This provider is the only thing that ever sets
 * `data-reveal-state`, and globals.css keys the hidden state off that.
 *
 * Which means the page is readable with no JavaScript at all: markup ships
 * in its resting state, and only script can hide anything. If the bundle
 * never executes, every element simply stays visible.
 *
 * It also means nothing visible is ever hidden retroactively. The observer's
 * first callback fires with the element's current position: already on
 * screen, it is marked shown and dropped; off screen, it is put into `idle`
 * — which the reader cannot see, because it is off screen — and animates
 * when it arrives.
 */
export default function RevealProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");

    // No observer, or motion turned down: leave the markup as it shipped.
    if (!("IntersectionObserver" in window) || reduced.matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;

          // `boundingClientRect.bottom < 0` catches a restored scroll
          // position or a deep link, where the element is above the
          // viewport and will never intersect on the way down.
          if (entry.isIntersecting || entry.boundingClientRect.bottom < 0) {
            el.dataset.revealState = "shown";
            io.unobserve(el);
          } else if (!el.dataset.revealState) {
            // First sighting, off screen: safe to hide now.
            el.dataset.revealState = "idle";
          }
        }
      },
      // Slightly inside the viewport so a reveal reads as deliberate rather
      // than as something catching up with the scroll.
      { rootMargin: "0px 0px -6% 0px", threshold: 0.05 },
    );

    for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
      if (el.dataset.revealState !== "shown") io.observe(el);
    }

    // Someone turning motion down mid-session gets the resting state, not a
    // page with content stuck in `idle`.
    const onReduced = (e: MediaQueryListEvent) => {
      if (!e.matches) return;
      io.disconnect();
      for (const el of document.querySelectorAll<HTMLElement>("[data-reveal]")) {
        el.dataset.revealState = "shown";
      }
    };
    reduced.addEventListener("change", onReduced);

    return () => {
      io.disconnect();
      reduced.removeEventListener("change", onReduced);
    };
    // Re-scan after a client-side navigation, which swaps the page's markup.
  }, [pathname]);

  return null;
}
