"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ROTATING_TITLES } from "@/data/portfolio";

const EASE = [0.16, 1, 0.3, 1] as const;
const INTERVAL = 3400;

export function AnimatedRoleTitle() {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(0);
    const start = Date.now();

    const tick = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(elapsed / INTERVAL, 1));
    }, 16);

    const advance = setInterval(() => {
      setIndex((i) => (i + 1) % ROTATING_TITLES.length);
    }, INTERVAL);

    return () => {
      clearInterval(tick);
      clearInterval(advance);
    };
  }, [index]);

  return (
    <div
      className="mt-4 mb-1 w-full flex flex-col items-center lg:items-start"
      style={{ perspective: 1200 }}
    >
      <div
        className="relative overflow-hidden"
        style={{ height: "clamp(2.25rem, 5vw, 3.25rem)" }}
      >
        <motion.div
          className="absolute -inset-x-4 top-1/2 -translate-y-1/2 h-12 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none"
          animate={{ opacity: [0.35, 0.65, 0.35] }}
          transition={{ duration: INTERVAL / 1000, repeat: Infinity, ease: "easeInOut" }}
        />

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={ROTATING_TITLES[index]}
            initial={{
              y: "100%",
              opacity: 0,
              filter: "blur(10px)",
              rotateX: -45,
            }}
            animate={{
              y: "0%",
              opacity: 1,
              filter: "blur(0px)",
              rotateX: 0,
            }}
            exit={{
              y: "-100%",
              opacity: 0,
              filter: "blur(10px)",
              rotateX: 45,
            }}
            transition={{ duration: 0.65, ease: EASE }}
            className="absolute inset-x-0 top-0 flex justify-center lg:justify-start"
            style={{ transformOrigin: "50% 100%", transformStyle: "preserve-3d" }}
          >
            <span className="block text-[clamp(1.5rem,4vw,2.5rem)] font-semibold tracking-tight leading-none bg-gradient-to-r from-indigo-200 via-white to-cyan-200 bg-clip-text text-transparent">
              {ROTATING_TITLES[index]}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center lg:justify-start gap-2 mt-5">
        {ROTATING_TITLES.map((title, i) => (
          <button
            key={title}
            onClick={() => setIndex(i)}
            className="relative h-[3px] rounded-full bg-white/10 overflow-hidden transition-all duration-300"
            style={{ width: i === index ? 32 : 10 }}
            aria-label={`Show ${title}`}
            data-cursor="pointer"
          >
            {i === index && (
              <div
                className="absolute inset-0 origin-left bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full transition-none"
                style={{ transform: `scaleX(${progress})` }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
