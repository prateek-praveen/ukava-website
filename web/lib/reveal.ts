import type { CSSProperties } from "react";

export type RevealVariant = "heading" | "text" | "image" | "item";

/**
 * Props that opt an element into the scroll reveal.
 *
 * Spread onto an element that already exists rather than wrapping it, so the
 * animation adds no node and cannot affect layout:
 *
 *   <h2 className={s.title} {...reveal("heading")}>
 *   <div className={s.card} {...reveal("item", i)}>
 *
 * `index` is a position in a sequence, not a duration. How long a step lasts
 * is set in globals.css and shortens on mobile, so a component never needs
 * to know the timing. It is capped because a long list should not leave its
 * last member arriving a second and a half after its first.
 */
const MAX_STEPS = 5;

export function reveal(variant: RevealVariant, index = 0) {
  const step = Math.min(Math.max(index, 0), MAX_STEPS);
  return {
    "data-reveal": variant,
    ...(step > 0
      ? { style: { "--reveal-index": step } as CSSProperties }
      : null),
  };
}
