import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import ClosingCta from "@/components/ClosingCta";
import Hero from "@/components/home/Hero";
import StatsRow from "@/components/home/StatsRow";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WhyUkava from "@/components/home/WhyUkava";
import PartnerSection from "@/components/home/PartnerSection";

export const metadata: Metadata = {
  title: "UKAVA — Energy + Electric Mobility",
  description:
    "Lithium-powered energy and electric mobility solutions for homes, businesses and roads. Explore UKAVA electric scooters, lithium batteries, inverters and solar.",
};

export default function HomePage() {
  return (
    <>
      <SiteHeader active="home" variant="translucent" />
      <main id="top">
        <Hero />
        <StatsRow />
        <FeaturedProducts />
        <WhyUkava />
        <PartnerSection />
        <ClosingCta id="contact" />
      </main>
      <SiteFooter />
    </>
  );
}
