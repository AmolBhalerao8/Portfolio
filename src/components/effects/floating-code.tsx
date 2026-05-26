"use client";

import { useEffect, useRef } from "react";
import { cursorStore } from "@/components/providers/cursor-provider";
import { motion } from "framer-motion";

const snippets = [
  { code: "orchestrator.execute()", left: 15, top: 20 },
  { code: "await agent.reason()", left: 37, top: 60 },
  { code: "embed(image, text)", left: 59, top: 25 },
  { code: "memory.recall(ctx)", left: 78, top: 55 },
];

export function FloatingCode() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let raf: number;

    const tick = () => {
      const { x, y, active } = cursorStore.current;

      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elX = rect.left + rect.width / 2;
        const elY = rect.top + rect.height / 2;
        const dx = x - elX;
        const dy = y - elY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const push = active && dist < 300 ? (1 - dist / 300) * 24 : 0;
        const pushX = dist > 0 ? -(dx / dist) * push : 0;
        const pushY = dist > 0 ? -(dy / dist) * push : 0;
        el.style.transform = `translate(${pushX}px, ${pushY}px)`;
        el.style.opacity = active && dist < 250 ? "0.12" : "0.05";
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[2] overflow-hidden hidden lg:block">
      {snippets.map(({ code, left, top }, i) => (
        <motion.div
          key={code}
          ref={(el) => { refs.current[i] = el; }}
          className="absolute font-mono text-[10px] text-white/5 whitespace-nowrap will-change-transform"
          style={{ left: `${left}%`, top: `${top}%` }}
          animate={{ y: [0, -16, 0] }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            delay: i * 1.5,
          }}
        >
          {code}
        </motion.div>
      ))}
    </div>
  );
}
