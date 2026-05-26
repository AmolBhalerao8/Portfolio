"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";

export interface CursorState {
  x: number;
  y: number;
  xPercent: number;
  yPercent: number;
  active: boolean;
}

export const cursorStore: { current: CursorState } = {
  current: { x: 0, y: 0, xPercent: 50, yPercent: 50, active: false },
};

const CursorContext = createContext<CursorState>(cursorStore.current);

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const primaryRef = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const vignetteRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const gridParallaxRef = useRef<HTMLDivElement>(null);

  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const raf = useRef(0);
  const hasMoved = useRef(false);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      hasMoved.current = true;
    };

    const onLeave = () => {
      target.current = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      };
    };

    const tick = () => {
      const ease = 0.12;
      current.current.x += (target.current.x - current.current.x) * ease;
      current.current.y += (target.current.y - current.current.y) * ease;

      const x = current.current.x;
      const y = current.current.y;
      const xPercent = (x / window.innerWidth) * 100;
      const yPercent = (y / window.innerHeight) * 100;
      const active = hasMoved.current;

      document.documentElement.style.setProperty("--cursor-x", `${x}px`);
      document.documentElement.style.setProperty("--cursor-y", `${y}px`);
      document.documentElement.style.setProperty("--cursor-x-pct", `${xPercent}%`);
      document.documentElement.style.setProperty("--cursor-y-pct", `${yPercent}%`);
      document.documentElement.style.setProperty("--cursor-active", active ? "1" : "0");

      cursorStore.current = { x, y, xPercent, yPercent, active };

      if (primaryRef.current) {
        primaryRef.current.style.background = `radial-gradient(700px circle at ${x}px ${y}px, rgba(99,102,241,0.14), transparent 55%)`;
        accentRef.current!.style.background = `radial-gradient(400px circle at ${x + 30}px ${y - 20}px, rgba(34,211,238,0.1), transparent 50%)`;
        gridRef.current!.style.maskImage = `radial-gradient(350px circle at ${x}px ${y}px, black, transparent)`;
        gridRef.current!.style.webkitMaskImage = gridRef.current!.style.maskImage;
        vignetteRef.current!.style.background = `radial-gradient(900px circle at ${x}px ${y}px, transparent 0%, rgba(3,3,3,0.45) 100%)`;
        scanRef.current!.style.top = `${y}px`;
        scanRef.current!.style.opacity = active ? "0.35" : "0";

        const offsetX = (xPercent - 50) * -0.2;
        const offsetY = (yPercent - 50) * -0.2;
        gridParallaxRef.current!.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      }

      raf.current = requestAnimationFrame(tick);
    };

    target.current = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    };
    current.current = { ...target.current };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    raf.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <CursorContext.Provider value={cursorStore.current}>
      {/* Global cursor atmosphere — JS-driven for reliability */}
      <div
        className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
        aria-hidden
      >
        <div ref={primaryRef} className="absolute inset-0" />
        <div ref={accentRef} className="absolute inset-0" />
        <div
          ref={gridRef}
          className="absolute inset-0 grid-bg opacity-40 mix-blend-screen"
        />
        <div ref={vignetteRef} className="absolute inset-0" />
        <div
          ref={scanRef}
          className="absolute inset-x-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(99,102,241,0.5), rgba(34,211,238,0.5), transparent)",
          }}
        />
        <div
          ref={gridParallaxRef}
          className="absolute inset-0 grid-bg opacity-20 pointer-events-none"
        />
      </div>
      {children}
    </CursorContext.Provider>
  );
}
