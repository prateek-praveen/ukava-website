import type { Metadata } from "next";
import "./globals.css";
import ContactProvider from "@/components/ContactProvider";

export const metadata: Metadata = {
  title: {
    default: "UKAVA — Energy + Electric Mobility",
    template: "%s · UKAVA",
  },
  description:
    "Lithium-powered energy and electric mobility solutions for homes, businesses and roads. Electric scooters, lithium batteries, inverters and solar from UKAVA Industries.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/dmsans-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
      </head>
      <body>
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}
