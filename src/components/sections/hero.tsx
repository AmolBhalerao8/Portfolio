"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowDown, Download, Github, Linkedin, Mail, Trophy, Rocket, TrendingUp, Zap, DollarSign } from "lucide-react";
import { SITE, CREDIBILITY_CHIPS } from "@/data/portfolio";
import { AnimatedRoleTitle } from "./animated-role-title";
import { HeroPortrait } from "./hero-portrait";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { scrollToSection } from "@/lib/scroll";

const HeroScene = dynamic(
  () => import("@/components/three/hero-scene").then((m) => m.HeroScene),
  { ssr: false, loading: () => <div className="absolute inset-0 bg-[#030303]" /> }
);

const CHIP_ICONS = {
  trophy: Trophy,
  rocket: Rocket,
  chart: TrendingUp,
  zap: Zap,
  dollar: DollarSign,
} as const;

export function HeroSection() {
  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden">
      <HeroScene />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#030303]/40 to-[#030303] pointer-events-none" />

      <div className="relative z-10 flex-1 flex flex-col items-center justify-center section-padding pt-28 pb-16">
        <div className="container-max w-full flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroPortrait />
          </motion.div>

          <div className="flex-1 max-w-2xl text-center lg:text-left">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-400 mb-4"
            >
              AI Engineer · Founder · Systems Builder
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.7 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-2"
            >
              <span className="text-gradient">{SITE.name.split(" ")[0]}</span>
              <br />
              <span className="text-gradient-accent">{SITE.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>

            <AnimatedRoleTitle />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-6 text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              {SITE.tagline}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start mt-6"
            >
              {CREDIBILITY_CHIPS.map((chip) => {
                const Icon = CHIP_ICONS[chip.icon as keyof typeof CHIP_ICONS] ?? Zap;
                return (
                  <span
                    key={chip.label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs text-zinc-300"
                  >
                    <Icon className="w-3 h-3 text-indigo-400" />
                    {chip.label}
                  </span>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start mt-8"
            >
              <MagneticButton variant="glow" onClick={() => scrollToSection("projects")}>
                View Systems
              </MagneticButton>
              <MagneticButton href={SITE.resumeUrl} variant="glass">
                <Download className="w-4 h-4" /> Resume
              </MagneticButton>
              <MagneticButton href={SITE.github} variant="outline">
                <Github className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href={SITE.linkedin} variant="outline">
                <Linkedin className="w-4 h-4" />
              </MagneticButton>
              <MagneticButton href={`mailto:${SITE.email}`} variant="outline">
                <Mail className="w-4 h-4" />
              </MagneticButton>
            </motion.div>
          </div>
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          onClick={() => scrollToSection("about")}
          className="mt-16 text-zinc-500 hover:text-white transition-colors"
          aria-label="Scroll down"
        >
          <ArrowDown className="w-5 h-5 animate-bounce" />
        </motion.button>
      </div>
    </section>
  );
}
