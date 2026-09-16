"use client";

import { useEffect } from "react";
import { ATS_SLIDE_COUNT, renderAtsSlide } from "@/ats/AtsSlides";
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
      {Array.from({ length: ATS_SLIDE_COUNT }, (_, index) => (
        <div key={index} className="ats-print-slide deck-print-slide deck-stage">
          {renderAtsSlide(index)}
        </div>
      ))}
    </div>
  );
}
