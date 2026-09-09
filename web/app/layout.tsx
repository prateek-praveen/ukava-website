import type { Metadata, Viewport } from "next";
import "./globals.css";
import ContactProvider from "@/components/ContactProvider";
import RevealProvider from "@/components/RevealProvider";

export const metadata: Metadata = {
  title: {
    default: "UKAVA — Energy + Electric Mobility",
    template: "%s · UKAVA",
  },
  description:
    "Lithium-powered energy and electric mobility solutions for homes, businesses and roads. Electric scooters, lithium batteries, inverters and solar from UKAVA Industries.",
  /* The tab icon, the iOS home-screen icon and the install prompt all come
     from app/favicon.ico, app/icon.png and app/apple-icon.png — Next's file
     conventions, so the tags are emitted and fingerprinted automatically and
     behave the same in dev and in a production build. Only the manifest has
     to be named, because it lives in public/. */
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: "#fc5013",
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
        <RevealProvider />
        <ContactProvider>{children}</ContactProvider>
      </body>
    </html>
  );
}
