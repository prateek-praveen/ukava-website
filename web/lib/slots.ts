import manifest from "@/slots.manifest.json";

export type SlotImage = {
  src: string;
  /** View scale, and x/y offsets in frame-percent — the framing the designer
      set on the slot in Claude Design. 1 / 0 / 0 is a plain centred cover. */
  s: number;
  x: number;
  y: number;
};

const SLOTS = manifest as Record<string, SlotImage>;

export const getSlot = (id: string): SlotImage | undefined => SLOTS[id];

export const hasSlot = (id: string): boolean => id in SLOTS;

/** Product gallery shot ids, matching the ids the design assigned. */
export const productShotId = (slug: string, index: number): string =>
  `ukava-p-${slug}-${index}`;

export const productDetailShotId = (slug: string): string => `ukava-p-${slug}-detail`;

/** The gallery only offers thumbnails for shots that actually have a photo;
    a product with none still shows a single empty main frame. */
export const productShots = (slug: string): number[] => {
  const found = [0, 1, 2, 3, 4].filter((i) => hasSlot(productShotId(slug, i)));
  return found.length ? found : [0];
};
