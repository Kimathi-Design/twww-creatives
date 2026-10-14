"use client";

import { useEffect } from "react";
import {
  ATS_SLIDE_COUNT,
  LiveBannerPreload,
  renderAtsSlide,
} from "@/ats/AtsSlides";
import { CREATIVE_DECIDE, CREATIVE_GAMES } from "@/lib/ats-content";
import "./ats.css";
import "./twww-brand.css";

export function AtsPrintView() {
  useEffect(() => {
    document.documentElement.dataset.atsExport = "true";
    document.documentElement.dataset.deckExport = "true";
    return () => {
      delete document.documentElement.dataset.atsExport;
      delete document.documentElement.dataset.deckExport;
    };
  }, []);

  return (
    <div className="ats-print-root deck-print-root deck-fixed-layout">
      <LiveBannerPreload
        banners={[...CREATIVE_DECIDE.banners, ...CREATIVE_GAMES.banners]}
      />
      {Array.from({ length: ATS_SLIDE_COUNT }, (_, index) => (
        <div key={index} className="ats-print-slide deck-print-slide deck-stage">
          {renderAtsSlide(index)}
        </div>
      ))}
    </div>
  );
}
