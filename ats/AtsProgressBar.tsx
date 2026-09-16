"use client";

import { motion } from "framer-motion";

type AtsProgressBarProps = {
  current: number;
  total: number;
};

export function AtsProgressBar({ current, total }: AtsProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div
      className="relative z-[70] h-[3px] w-full shrink-0 bg-[rgba(230,26,39,0.12)]"
      role="progressbar"
      aria-valuenow={current + 1}
      aria-valuemin={1}
      aria-valuemax={total}
      aria-label="Proposal progress"
    >
      <motion.div
        className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#B01018] via-[#E61A27] to-[#F15A29]"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
