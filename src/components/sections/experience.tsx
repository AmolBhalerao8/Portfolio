"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { EXPERIENCES } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";

const ACCENT_COLORS: Record<string, string> = {
  cyan: "from-cyan-500 to-blue-500",
  orange: "from-orange-500 to-amber-500",
  purple: "from-purple-500 to-fuchsia-500",
  green: "from-emerald-500 to-green-500",
  blue: "from-blue-500 to-indigo-500",
  slate: "from-zinc-500 to-slate-500",
};

export function ExperienceSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Experience"
          title="Built at the frontier"
          description="From industrial robotics to YC startups - shipping AI systems that matter."
        />

        <div ref={containerRef} className="relative max-w-3xl mx-auto">
          <div className="absolute left-[19px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-white/10">
            <motion.div
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-indigo-500 via-cyan-400 to-purple-500 origin-top"
              style={{ height: railHeight }}
            />
          </div>

          {EXPERIENCES.map((exp, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className={`relative flex flex-col md:flex-row gap-6 mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div className="hidden md:block md:w-1/2" />
                <div
                  className={`md:w-1/2 pl-12 md:pl-0 ${
                    isLeft ? "md:pr-12" : "md:pl-12"
                  }`}
                >
                  <div
                    className={`glass-strong rounded-2xl p-6 spotlight glow-border ${
                      exp.highlight ? "ring-1 ring-indigo-500/20" : ""
                    }`}
                  >
                    {exp.highlight && (
                      <span className="inline-block text-[10px] font-mono uppercase tracking-wider text-indigo-400 mb-2">
                        Featured
                      </span>
                    )}
                    <p className="text-xs font-mono text-zinc-500 mb-1">{exp.period}</p>
                    <h3 className="text-xl font-bold">{exp.company}</h3>
                    {"website" in exp && exp.website && (
                      <a
                        href={exp.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block text-xs font-mono text-cyan-400 hover:text-cyan-300 mb-1"
                      >
                        {exp.website.replace("https://", "")}
                      </a>
                    )}
                    <p
                      className={`text-sm font-medium bg-gradient-to-r ${ACCENT_COLORS[exp.accent]} bg-clip-text text-transparent mb-3`}
                    >
                      {exp.role}
                    </p>
                    <p className="text-sm text-zinc-400 mb-4">{exp.description}</p>
                    <ul className="space-y-1.5 mb-4">
                      {exp.achievements.map((a) => (
                        <li key={a} className="text-xs text-zinc-500 flex items-start gap-2">
                          <span className="text-indigo-400 shrink-0">→</span>
                          <span>{a}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-zinc-400"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div
                  className={`absolute left-3 md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full border-2 border-indigo-500 bg-[#030303] z-10 ${
                    exp.highlight ? "shadow-[0_0_20px_rgba(99,102,241,0.8)]" : ""
                  }`}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
