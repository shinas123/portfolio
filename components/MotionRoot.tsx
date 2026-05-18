"use client";
import { MotionConfig } from "motion/react";
import { ease, dur } from "@/lib/motion";

export default function MotionRoot({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig
      transition={{ duration: dur.base, ease }}
      reducedMotion="user"
    >
      {children}
    </MotionConfig>
  );
}
