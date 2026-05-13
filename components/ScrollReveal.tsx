"use client";
import { motion, type Variants } from "motion/react";
import { type ReactNode } from "react";

const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Wipes the wrapped content in from left to right using a clip-path mask.
 * Use for section headings — much more "premium" than a fade.
 */
export function ClipReveal({
  children,
  className,
  delay = 0,
  duration = 1.1,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 100% 0 0)" }}
      whileInView={{ clipPath: "inset(0 0% 0 0)" }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{ duration, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Reveals child elements as their own staggered words/lines on scroll.
 * Pass children as siblings; each direct child fades + slides up in sequence.
 */
export function StaggerReveal({
  children,
  className,
  stagger = 0.08,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={container}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};
