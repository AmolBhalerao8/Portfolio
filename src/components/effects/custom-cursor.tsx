"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest("a, button, [data-cursor='pointer']"));
    };

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", handleOver);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", handleOver);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div
            className="fixed top-0 left-0 w-3 h-3 rounded-full bg-white mix-blend-difference pointer-events-none z-[99999]"
            animate={{
              x: position.x - 6,
              y: position.y - 6,
              scale: isHovering ? 0.5 : 1,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
          />
          <motion.div
            className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[99998]"
            animate={{
              x: position.x - 16,
              y: position.y - 16,
              scale: isHovering ? 2 : 1,
            }}
            transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
          />
          <div
            className="fixed pointer-events-none z-[99997] w-32 h-32 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: position.x,
              top: position.y,
              background:
                "radial-gradient(circle, rgba(99,102,241,0.18), transparent 70%)",
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}
