/**
 * Switches for things that are built and working but should not be visible
 * yet. Flip a value here, commit, and the deploy picks it up — nothing else
 * needs touching, and no markup or styling has to be rewritten to bring a
 * feature back.
 *
 * Anything turned off here is dormant, not deleted. If a feature is never
 * coming back, remove the flag and the code it guards rather than leaving
 * the switch sitting at `false` forever.
 */
export const FEATURES = {
  /**
   * The "Available colours" swatch row on a product detail page.
   *
   * Off because the range does not ship in more than one colour yet, and a
   * picker the customer cannot act on is worse than none. The swatches, the
   * selection state and the styles all remain in place, so setting this to
   * `true` restores the row exactly as it was.
   *
   * Note that selecting a swatch does not currently change the photograph —
   * the catalogue has one set of shots per product. Per-colour photography
   * needs to exist before this goes back on, or the picker will look broken.
   */
  productColourVariants: false,
} as const;
