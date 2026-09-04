/* "partner" was retired with the dealer form — dealers now call the
   toll-free number through the shared contact action. */
export type LeadKind = "product" | "callback";

export type Lead = {
  kind: LeadKind;
  product: string | null;
  name: string;
  mobile: string;
  city: string;
  business: string | null;
  category: string | null;
  source: string;
};

const TYPE: Record<LeadKind, string> = {
  product: "consumer_product",
  callback: "callback",
};

/**
 * Lead delivery is not wired up yet — this is the single seam where it will
 * be. Point it at the CRM endpoint (or a route handler that forwards to one)
 * and every form on the site starts delivering; consumer and dealer leads stay
 * separable via `type`.
 */
export function submitLead(lead: Lead): void {
  const payload = {
    type: TYPE[lead.kind],
    product: lead.product,
    name: lead.name,
    mobile: lead.mobile,
    city: lead.city,
    business: lead.business,
    category: lead.category,
    source: lead.source,
    submittedAt: new Date().toISOString(),
  };
  // eslint-disable-next-line no-console
  console.log("[UKAVA lead]", payload);
}
