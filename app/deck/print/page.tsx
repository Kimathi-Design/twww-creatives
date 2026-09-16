import type { Metadata } from "next";
import { AtsPrintView } from "@/ats/AtsPrintView";
import { IMAGES } from "@/lib/ats-content";

export const metadata: Metadata = {
  title: "Print — TWWW MediaPal Proposal",
  robots: { index: false, follow: false },
  icons: {
    icon: IMAGES.icon,
    shortcut: IMAGES.icon,
    apple: IMAGES.appleIcon,
  },
};

export default function DeckPrintPage() {
  return <AtsPrintView />;
}
