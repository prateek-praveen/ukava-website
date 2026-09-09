import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  /* Solar Solutions was folded into Inverter & Battery — LINVA and LINVASOL
     proved to be one product family in two trims, and the shelf held no
     actual solar hardware — and the lithium inverter battery moved to the
     category named after it. Both moves change a product's URL, because the
     category is a path segment. These keep every old link alive rather than
     404'ing it. */
  async redirects() {
    return [
      {
        source: "/products/solar-solutions",
        destination: "/products/inverter-battery",
        permanent: true,
      },
      {
        source: "/products/solar-solutions/:slug",
        destination: "/products/inverter-battery/:slug",
        permanent: true,
      },
      {
        source: "/products/lithium-batteries/lithium-inverter-batteries",
        destination: "/products/inverter-battery/lithium-inverter-batteries",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
