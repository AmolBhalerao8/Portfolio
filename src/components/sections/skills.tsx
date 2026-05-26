"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { SKILL_CATEGORIES } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";

const SkillGalaxy = dynamic(
  () => import("@/components/three/skill-galaxy").then((m) => m.SkillGalaxy),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] rounded-2xl glass animate-pulse flex items-center justify-center text-zinc-600 font-mono text-sm">
        Loading skill galaxy…
      </div>
    ),
  }
);

export function SkillsSection() {
  return (
    <section id="skills" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Skills"
          title="Orbiting skill galaxy"
          description="AI/ML, programming, cloud, AI systems, and tools - organized by domain."
          align="center"
        />

        <SkillGalaxy />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-12">
          {SKILL_CATEGORIES.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-xl p-4 spotlight glow-border"
            >
              <div
                className="w-2 h-2 rounded-full mb-3"
                style={{ backgroundColor: cat.color, boxShadow: `0 0 12px ${cat.color}` }}
              />
              <h3 className="font-semibold text-sm mb-3">{cat.title}</h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((s) => (
                  <span
                    key={s}
                    className="px-2 py-0.5 rounded-md bg-white/5 text-[11px] text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
