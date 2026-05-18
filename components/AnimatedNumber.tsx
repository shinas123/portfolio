"use client";
import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "motion/react";

/**
 * Parses a string like "30%+" or "2.4M" into { num: 30, prefix: "", suffix: "%+" }
 * so we can count up the numeric portion on viewport entry while keeping the
 * non-numeric chrome in place.
 */
function parse(value: string): { prefix: string; num: number; suffix: string } | null {
  const m = value.match(/^([^\d.-]*)([\d.,]+)(.*)$/);
  if (!m) return null;
  const num = parseFloat(m[2].replace(/,/g, ""));
  if (Number.isNaN(num)) return null;
  return { prefix: m[1], num, suffix: m[3] };
}

export default function AnimatedNumber({
  value,
  className,
  duration = 1.6,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(value);
  const parsed = parse(value);

  useEffect(() => {
    if (!inView || !parsed) {
      if (!parsed) setDisplay(value);
      return;
    }
    const controls = animate(0, parsed.num, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        const isInt = Number.isInteger(parsed.num);
        const formatted = isInt
          ? Math.round(latest).toString()
          : latest.toFixed(1);
        setDisplay(`${parsed.prefix}${formatted}${parsed.suffix}`);
      },
    });
    return () => controls.stop();
  }, [inView, parsed, value, duration]);

  return (
    <motion.span ref={ref} className={className} aria-label={value}>
      {display}
    </motion.span>
  );
}
