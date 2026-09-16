import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { ATS_ASSETS } from "@/lib/ats-assets";
import { IMAGES } from "@/lib/ats-content";
import "./globals.css";

const plusJakarta = localFont({
  src: [
    {
      path: "../public/fonts/PlusJakartaSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/PlusJakartaSans-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-ats",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TWWW · MediaPal Proposal · Coca-Cola",
  description:
    "The World Will Wait  -  MediaPal media implementation proposal for Coca-Cola Kenya, Tanzania and Uganda.",
  robots: { index: false, follow: false },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: ATS_ASSETS.icon, type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: ATS_ASSETS.appleIcon,
  },
};

export const viewport: Viewport = {
  themeColor: "#E61A27",
  width: "device-width",
  initialScale: 1,
};

const CRITICAL = [IMAGES.cover];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} light`}>
      <head>
        {CRITICAL.map((src) => (
          <link key={src} rel="preload" as="image" href={src} fetchPriority="high" />
        ))}
      </head>
      <body className="relative min-h-screen antialiased">{children}</body>
    </html>
  );
}
