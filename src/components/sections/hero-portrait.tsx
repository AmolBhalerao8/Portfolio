"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { SITE } from "@/data/portfolio";

function HolographicVisual({
  mouseX,
  mouseY,
  isHovering,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  isHovering: ReturnType<typeof useSpring>;
}) {
  const meshGradient = useMotionTemplate`radial-gradient(circle at ${mouseX}% ${mouseY}%, rgba(99,102,241,0.45), transparent 45%), radial-gradient(ellipse at 70% 80%, rgba(168,85,247,0.25), transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(34,211,238,0.08), transparent 70%)`;

  const coreX = useTransform(mouseX, [0, 100], [-12, 12]);
  const coreY = useTransform(mouseY, [0, 100], [-12, 12]);

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#050508]">
      <motion.div className="absolute inset-0" style={{ background: meshGradient }} />

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {[140, 110, 80].map((size, i) => (
        <motion.div
          key={size}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
          style={{ width: size, height: size }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360, opacity: [0.15, 0.35, 0.15] }}
          transition={{
            rotate: { duration: 18 + i * 6, repeat: Infinity, ease: "linear" },
            opacity: { duration: 4 + i, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}

      <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="relative w-24 h-24 md:w-28 md:h-28"
          style={{ x: coreX, y: coreY }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 blur-xl opacity-60" />
          <div className="absolute inset-2 rounded-full bg-gradient-to-br from-indigo-400/80 via-purple-500/80 to-cyan-400/80 border border-white/20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <svg viewBox="0 0 64 64" className="w-10 h-10 md:w-12 md:h-12 text-white/90">
              <path
                fill="currentColor"
                d="M32 8c-8 0-14 6-14 14 0 5 2 9 6 12-8 3-14 10-14 19v3h44v-3c0-9-6-16-14-19 4-3 6-7 6-12 0-8-6-14-14-14zm0 6c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8 3.6-8 8-8z"
              />
            </svg>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
        animate={{ top: ["15%", "85%", "15%"] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute top-5 left-5 glass px-3 py-2 rounded-lg"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8 }}
      >
        <div className="text-[9px] font-mono text-white/35 uppercase tracking-wider">Status</div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400/90">All systems online</span>
        </div>
      </motion.div>

      <motion.div
        className="absolute top-5 right-5 glass px-3 py-2 rounded-lg text-right"
        initial={{ opacity: 0, x: 10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <div className="text-[9px] font-mono text-white/35 uppercase tracking-wider">Stack</div>
        <div className="text-[10px] font-mono text-cyan-400/90 mt-0.5">Voice · Vision · Agents</div>
      </motion.div>

      <div className="absolute bottom-16 inset-x-6 flex items-end justify-center gap-[3px] h-10">
        {Array.from({ length: 24 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full bg-gradient-to-t from-indigo-500/40 to-cyan-400/80"
            animate={{ height: ["20%", `${35 + (i % 5) * 12}%`, "20%"] }}
            transition={{
              duration: 1.2 + (i % 4) * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        ))}
      </div>

      <div className="absolute bottom-5 inset-x-0 text-center">
        <div className="text-[10px] font-mono text-white/25 uppercase tracking-[0.2em]">
          Multimodal AI Systems
        </div>
        <div className="text-xs text-white/50 mt-1 font-medium">{SITE.name}</div>
      </div>

      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-indigo-400/40" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-indigo-400/40" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cyan-400/40" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cyan-400/40" />

      {/* Cursor spotlight inside HUD */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(circle 140px at ${mouseX}% ${mouseY}%, rgba(34,211,238,0.18), transparent 70%)`,
          opacity: isHovering,
        }}
      />
    </div>
  );
}

function AiHeroImage({
  mouseX,
  mouseY,
  isHovering,
}: {
  mouseX: ReturnType<typeof useSpring>;
  mouseY: ReturnType<typeof useSpring>;
  isHovering: ReturnType<typeof useSpring>;
}) {
  return (
    <div className="absolute inset-0">
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.04, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      >
        <Image
          src={SITE.aiHeroImage}
          alt="AI systems architect - neural portrait"
          fill
          className="object-cover object-center"
          priority
          sizes="(max-width: 768px) 340px, 380px"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/85 via-[#030303]/20 to-indigo-950/30" />
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10 mix-blend-screen" />
      <motion.div
        className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent z-10"
        animate={{ top: ["12%", "88%", "12%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useMotionTemplate`radial-gradient(circle 200px at ${mouseX}% ${mouseY}%, rgba(99,102,241,0.35), transparent 70%)`,
          opacity: isHovering,
        }}
      />
      <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-cyan-400/50 z-10" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-cyan-400/50 z-10" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-indigo-400/50 z-10" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-indigo-400/50 z-10" />
      <div className="absolute bottom-0 inset-x-0 p-4 z-10 bg-gradient-to-t from-black/60 to-transparent">
        <p className="text-white font-semibold text-sm">{SITE.name}</p>
        <p className="text-[10px] text-cyan-400/90 font-mono mt-0.5">Neural Systems · Active</p>
      </div>
    </div>
  );
}

export function HeroPortrait() {
  const [hasPhoto, setHasPhoto] = useState<boolean | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const showPhoto = SITE.useProfilePhoto && hasPhoto === true;
  const showAiHero = !showPhoto && SITE.useAiHeroImage;

  const rawX = useMotionValue(50);
  const rawY = useMotionValue(50);
  const hover = useMotionValue(0);

  const mouseX = useSpring(rawX, { stiffness: 120, damping: 18, mass: 0.4 });
  const mouseY = useSpring(rawY, { stiffness: 120, damping: 18, mass: 0.4 });
  const isHovering = useSpring(hover, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseY, [0, 100], [10, -10]);
  const rotateY = useTransform(mouseX, [0, 100], [-10, 10]);

  const glowX = useTransform(mouseX, (v) => `calc(${v}% - 80px)`);
  const glowY = useTransform(mouseY, (v) => `calc(${v}% - 80px)`);

  const borderGlow = useMotionTemplate`radial-gradient(circle 180px at ${mouseX}% ${mouseY}%, rgba(99,102,241,0.55), rgba(168,85,247,0.2) 40%, transparent 70%)`;

  const spotlight = useMotionTemplate`radial-gradient(circle 160px at ${mouseX}% ${mouseY}%, rgba(255,255,255,0.14), transparent 65%)`;

  useEffect(() => {
    if (!SITE.useProfilePhoto) {
      setHasPhoto(false);
      return;
    }
    fetch(SITE.profileImage, { method: "HEAD" })
      .then((res) => setHasPhoto(res.ok))
      .catch(() => setHasPhoto(false));
  }, []);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    rawX.set(((e.clientX - rect.left) / rect.width) * 100);
    rawY.set(((e.clientY - rect.top) / rect.height) * 100);
    hover.set(1);
  };

  const handleLeave = () => {
    rawX.set(50);
    rawY.set(50);
    hover.set(0);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative w-[280px] sm:w-[320px] md:w-[340px] mx-auto"
      data-cursor="pointer"
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformPerspective: 1200,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full"
      >
      {/* Cursor-following aurora blob */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-indigo-400/50 blur-[64px] pointer-events-none z-0"
        style={{ left: glowX, top: glowY, opacity: isHovering }}
      />
      <motion.div
        className="absolute w-32 h-32 rounded-full bg-cyan-400/30 blur-[48px] pointer-events-none z-0"
        style={{
          left: useTransform(mouseX, (v) => `calc(${v}% - 48px)`),
          top: useTransform(mouseY, (v) => `calc(${v}% - 48px)`),
          opacity: useTransform(isHovering, [0, 1], [0, 0.8]),
        }}
      />

      {/* Breathing halo — intensifies on hover */}
      <motion.div
        className="absolute -inset-4 rounded-[32px] bg-gradient-to-br from-indigo-500/20 via-purple-500/10 to-cyan-400/15 blur-2xl pointer-events-none"
        animate={{ scale: [0.98, 1.02, 0.98] }}
        style={{ opacity: useTransform(isHovering, [0, 1], [0.4, 0.75]) }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Dynamic border glow follows cursor */}
      <motion.div
        className="absolute -inset-px rounded-[27px] pointer-events-none"
        style={{ background: borderGlow, opacity: isHovering }}
      />
      <div className="absolute -inset-[1px] rounded-[27px] border border-white/[0.1] shadow-[0_0_40px_rgba(99,102,241,0.15)] pointer-events-none" />

      {/* Frame */}
      <div className="relative glow-border rounded-[26px] overflow-hidden glass-strong p-[3px] shadow-2xl shadow-indigo-500/10">
        <div className="relative aspect-[4/5] w-full rounded-[22px] overflow-hidden">
          {hasPhoto === null && SITE.useProfilePhoto ? (
            <div className="absolute inset-0 bg-[#050508] animate-pulse" />
          ) : showPhoto ? (
            <>
              <Image
                src={SITE.profileImage}
                alt={SITE.name}
                fill
                className="object-cover object-top"
                priority
                sizes="(max-width: 768px) 340px, 380px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#030303]/70 via-[#030303]/10 to-indigo-900/10" />
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: useMotionTemplate`radial-gradient(circle 180px at ${mouseX}% ${mouseY}%, rgba(99,102,241,0.25), transparent 65%)`,
                  opacity: isHovering,
                }}
              />
            </>
          ) : showAiHero ? (
            <AiHeroImage mouseX={mouseX} mouseY={mouseY} isHovering={isHovering} />
          ) : (
            <HolographicVisual
              mouseX={mouseX}
              mouseY={mouseY}
              isHovering={isHovering}
            />
          )}

          {/* Cursor spotlight on glass */}
          <motion.div
            className="absolute inset-0 pointer-events-none z-10 mix-blend-soft-light"
            style={{ background: spotlight, opacity: isHovering }}
          />

          <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Floating badges — kept inside frame bounds */}
      <motion.div
        className="absolute left-2 top-[22%] glass px-2.5 py-1.5 rounded-lg text-[9px] md:text-[10px] font-mono text-cyan-400 shadow-lg shadow-cyan-500/10 pointer-events-none"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <span className="text-emerald-400">●</span> Agent Active
      </motion.div>

      <motion.div
        className="absolute right-2 top-[55%] glass px-2.5 py-1.5 rounded-lg text-[9px] md:text-[10px] font-mono text-purple-300 shadow-lg shadow-purple-500/10 pointer-events-none"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 0.8 }}
      >
        LLM Orchestrator
      </motion.div>

      <motion.div
        className="absolute left-2 bottom-[18%] glass px-2.5 py-1.5 rounded-lg text-[9px] md:text-[10px] font-mono text-indigo-300 hidden sm:block pointer-events-none"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 6, repeat: Infinity, delay: 1.2 }}
      >
        5K+ interactions
      </motion.div>
      </motion.div>
    </div>
  );
}
