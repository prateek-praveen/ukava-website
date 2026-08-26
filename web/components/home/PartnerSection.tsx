"use client";

import { useState } from "react";
import PartnerStories from "./PartnerStories";
import LeadModal, { type LeadRequest } from "@/components/LeadModal";

/** Owns the B2B lead form so dealer enquiries stay separate from consumer ones. */
export default function PartnerSection() {
  const [request, setRequest] = useState<LeadRequest | null>(null);

  return (
    <>
      <PartnerStories
        onPartnerEnquiry={() => setRequest({ kind: "partner", source: "homepage" })}
      />
      <LeadModal request={request} onClose={() => setRequest(null)} />
    </>
  );
}
