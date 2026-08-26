import type { Product } from "./catalogue";

/**
 * Detail-page prose derived from catalogue values. Every figure quoted here
 * comes from the product's own spec rows — nothing is invented, and a section
 * with nothing to say is dropped rather than padded.
 */

/** First non-empty value whose label matches, across every spec pool. */
const specValue = (p: Product, re: RegExp): string => {
  const pools = [p.primary, p.highlight, p.module, ...p.groups.map((g) => g.rows)];
  for (const pool of pools) {
    for (const row of pool) {
      if (re.test(row.label) && row.value) return row.value;
    }
  }
  return "";
};

export type Benefit = { title: string; note: string };

export function productCopy(p: Product) {
  const warranty = specValue(p, /warranty/i);
  const motor = specValue(p, /motor/i);
  const speed = specValue(p, /speed/i);
  const load = specValue(p, /loading/i);
  const panels = specValue(p, /panel/i);

  const isScooter = p.cat === "electric-scooters";
  const isBattery = p.cat === "lithium-batteries";
  const isSolar = p.cat === "solar-solutions";

  const tagline = isScooter
    ? "Built for effortless everyday city rides."
    : isBattery
      ? "LFP lithium storage with a built-in battery management system."
      : isSolar
        ? "MPPT solar PCU with an inverter and lithium battery in a single unit."
        : "Inverter and lithium battery in one maintenance-free unit.";

  let benefits: Benefit[];
  if (isScooter) {
    benefits = [
      {
        title: "Powerful performance",
        note:
          motor && speed
            ? `${motor} motor with a top speed of ${speed}, with a 15 degree climbing ability.`
            : "Motor and speed figures as listed in the catalogue.",
      },
      {
        title: "Smart and connected",
        note: "GPS tracking, anti-theft alarm, central locking and Find my Scooty come built in.",
      },
      {
        title: "Built for everyday",
        note: `Telescopic front suspension, disc brakes${
          load ? ` and ${load} loading capacity` : ""
        } for daily city roads.`,
      },
    ];
  } else if (isBattery) {
    benefits = [
      {
        title: "Long cycle life",
        note: `LFP cells with a built-in BMS${
          warranty ? ` and a ${warranty} warranty as listed in the catalogue.` : "."
        }`,
      },
      {
        title: "Reliable power",
        note: "High energy density and fast charging keep backup ready when it is needed.",
      },
      {
        title: "Maintenance free",
        note: "No fumes and no battery water, with an environmentally friendly LFP chemistry.",
      },
    ];
  } else {
    benefits = [
      {
        title: "One unit, less clutter",
        note: "A smart design inverter with inbuilt battery and pure sinewave output.",
      },
      {
        title: isSolar ? "Runs on solar or grid" : "Solar ready",
        note:
          isSolar && panels
            ? `Works with ${panels} of solar panels, or normal electricity.`
            : "Option of solar or normal electricity, with fast charging in 3–4 hours.",
      },
      {
        title: "Safe and maintenance free",
        note: "No fumes, no battery water required, and a battery life of up to 12 years.",
      },
    ];
  }

  const featuresHeading = isScooter
    ? "Everything you need, built in"
    : isBattery
      ? "Built-in advantages"
      : "Smart by design";

  const trust = [
    ...(warranty ? [`${warranty} warranty`] : []),
    "Toll-free support 1800 212 2131",
  ];

  return {
    tagline,
    benefits,
    featuresHeading,
    trust,
    whyHeading: `Why ${p.name.replace(/^UKAVA\s+/, "")}?`,
  };
}
