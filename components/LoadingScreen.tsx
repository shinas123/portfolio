"use client";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // already loaded? skip
    if (typeof window !== "undefined" && document.readyState === "complete") {
      // brief flash anyway
    }
    let start: number | null = null;
    const duration = 1600; // ms
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const elapsed = t - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      } else {
        setTimeout(() => setDone(true), 220);
      }
    };
    raf = requestAnimationFrame(step);
    // Lock body scroll while loading
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    if (done) document.body.style.overflow = "";
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: "-101%" }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[100] bg-ink flex items-end justify-between px-6 md:px-10 py-6 md:py-10 overflow-hidden"
        >
          <div className="absolute inset-0 grid-bg opacity-40" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55vw] h-[55vw] rounded-full bg-violet-500/10 blur-3xl" />

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative font-serif text-2xl md:text-4xl"
          >
            <span className="text-white/90">Shinas</span>
            <span className="italic accent-grad"> AR</span>
          </motion.div>

          <div className="relative font-serif text-[18vw] md:text-[14vw] leading-none text-white/90 tabular-nums">
            {String(count).padStart(3, "0")}
            <span className="text-white/30">%</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
