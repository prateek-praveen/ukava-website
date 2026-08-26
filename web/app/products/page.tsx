import type { Metadata } from "next";
import ListingPage from "./ListingPage";

export const metadata: Metadata = {
  title: "All products",
  description:
    "Explore the full UKAVA range — electric scooters, lithium batteries, LINVA inverters and LINVASOL solar solutions.",
};

export default function ProductsPage() {
  // No category in the URL: lead with the first, as the design does.
  return <ListingPage active="electric-scooters" />;
}
