"use client";

import { useEffect, useId, useState } from "react";
import styles from "./LeadModal.module.css";
import { CATEGORIES } from "@/lib/catalogue";
import { submitLead, type LeadKind } from "@/lib/leads";

export type LeadRequest = {
  kind: LeadKind;
  /** Auto-captured for product enquiries so the sales team gets a qualified
      lead instead of a generic callback. */
  product?: string;
  /** Where the lead came from, for attribution. */
  source: string;
};

type Errors = Partial<Record<"name" | "mobile" | "city" | "business" | "category", string>>;

const COPY: Record<LeadKind, { kicker: string; sub: string; cta: string; okTitle: string; okSub: string }> = {
  product: {
    kicker: "Product enquiry",
    sub: "Share your details and our team will call you with pricing and options.",
    cta: "Get Price & Details",
    okTitle: "Thanks. Our team will get in touch shortly.",
    okSub: "We've noted your interest and a UKAVA representative will call you soon.",
  },
  callback: {
    kicker: "Request a callback",
    sub: "Leave your details and our team will call you back shortly.",
    cta: "Request a Callback",
    okTitle: "Thanks. Our team will get in touch shortly.",
    okSub: "We've received your details. Expect a call from a UKAVA representative soon.",
  },
  partner: {
    kicker: "Partner with UKAVA",
    sub: "Tell us about your business and our team will explore the opportunity with you.",
    cta: "Become a Partner",
    okTitle: "Thanks. Our business team will reach out shortly.",
    okSub: "We've received your partnership enquiry and will contact you to discuss next steps.",
  },
};

const titleFor = (req: LeadRequest): string => {
  if (req.kind === "product") return `Get price & details for ${req.product || "this product"}`;
  if (req.kind === "partner") return "Become a UKAVA partner";
  return "Request a callback";
};

export default function LeadModal({
  request,
  onClose,
}: {
  request: LeadRequest | null;
  onClose: () => void;
}) {
  const uid = useId();
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [city, setCity] = useState("");
  const [business, setBusiness] = useState("");
  const [category, setCategory] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  // Every open starts from a clean form.
  useEffect(() => {
    if (!request) return;
    setName("");
    setMobile("");
    setCity("");
    setBusiness("");
    setCategory("");
    setErrors({});
    setSent(false);
  }, [request]);

  useEffect(() => {
    if (!request) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [request, onClose]);

  if (!request) return null;

  const copy = COPY[request.kind];
  const isPartner = request.kind === "partner";

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errors = {};
    if (name.trim().length < 2) next.name = "Please enter your name.";
    if (mobile.replace(/\D/g, "").length !== 10) next.mobile = "Enter a valid 10-digit mobile number.";
    if (!city.trim()) next.city = "Please enter your city.";
    if (isPartner) {
      if (!business.trim()) next.business = "Tell us about your current business.";
      if (!category) next.category = "Select a category.";
    }
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    submitLead({
      kind: request.kind,
      product: request.kind === "product" ? request.product || null : null,
      name: name.trim(),
      mobile: `+91${mobile.replace(/\D/g, "")}`,
      city: city.trim(),
      business: business.trim() || null,
      category: category || null,
      source: request.source,
    });
    setErrors({});
    setSent(true);
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.backdrop} onClick={onClose} />
      <div role="dialog" aria-modal="true" aria-label={titleFor(request)} className={styles.dialog}>
        <button type="button" onClick={onClose} aria-label="Close" className={styles.close}>
          ×
        </button>

        {sent ? (
          <div>
            <div className={styles.tick} aria-hidden="true">
              ✓
            </div>
            <h2 className={styles.title}>{copy.okTitle}</h2>
            <p className={styles.sub}>{copy.okSub}</p>
            <button type="button" onClick={onClose} className={`btn btn-secondary ${styles.done}`}>
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} noValidate>
            <p className={styles.kicker}>{copy.kicker}</p>
            <h2 className={styles.title}>{titleFor(request)}</h2>
            <p className={styles.sub}>{copy.sub}</p>

            {request.kind === "product" && request.product ? (
              <div className={styles.interest}>
                <span className={styles.interestLabel}>Interest</span>
                <span className={styles.interestValue}>{request.product}</span>
              </div>
            ) : null}

            <div className={`field ${styles.row}`}>
              <label htmlFor={`${uid}-name`}>Name</label>
              <input
                className="input"
                id={`${uid}-name`}
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
              <div className={styles.error}>{errors.name || ""}</div>
            </div>

            <div className={`field ${styles.row}`}>
              <label htmlFor={`${uid}-mobile`}>Mobile number</label>
              <div className={styles.prefix}>
                <span>+91</span>
                <input
                  className="input"
                  id={`${uid}-mobile`}
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit number"
                  autoComplete="tel-national"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                />
              </div>
              <div className={styles.error}>{errors.mobile || ""}</div>
            </div>

            <div className={`field ${styles.row}`}>
              <label htmlFor={`${uid}-city`}>City</label>
              <input
                className="input"
                id={`${uid}-city`}
                value={city}
                onChange={(e) => setCity(e.target.value)}
                autoComplete="address-level2"
              />
              <div className={styles.error}>{errors.city || ""}</div>
            </div>

            {isPartner ? (
              <>
                <div className={`field ${styles.row}`}>
                  <label htmlFor={`${uid}-business`}>Current business</label>
                  <input
                    className="input"
                    id={`${uid}-business`}
                    placeholder="e.g. battery dealer, EV retailer"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                  />
                  <div className={styles.error}>{errors.business || ""}</div>
                </div>
                <div className={`field ${styles.row}`}>
                  <label htmlFor={`${uid}-category`}>Category interested in</label>
                  <select
                    className="input"
                    id={`${uid}-category`}
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((c) => (
                      <option key={c.key} value={c.label}>
                        {c.label}
                      </option>
                    ))}
                    <option value="Full portfolio">Full portfolio</option>
                  </select>
                  <div className={styles.error}>{errors.category || ""}</div>
                </div>
              </>
            ) : null}

            <button type="submit" className={`btn btn-primary ${styles.submit}`}>
              {copy.cta}
            </button>
            <p className={styles.consent}>
              By submitting, you agree UKAVA may contact you about your enquiry.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
