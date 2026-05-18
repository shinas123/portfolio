"use client";
import { motion, useScroll, useSpring } from "motion/react";
import { type RefObject } from "react";

export default function ArticleProgress({
  target,
}: {
  target: RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-[60px] inset-x-0 h-[2px] origin-left z-40 bg-gradient-to-r from-amber-400 via-rose-400 to-pink-500"
    />
  );
}
