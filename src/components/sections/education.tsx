"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { EDUCATION } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";

export function EducationSection() {
  return (
    <section id="education" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Education"
          title="Academic foundation"
          description="Graduate work in data science, analytics, and multimodal AI research."
        />

        <div className="max-w-2xl mx-auto space-y-4">
          {EDUCATION.map((edu, i) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong rounded-2xl p-6 md:p-8 spotlight glow-border"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-mono text-zinc-500 mb-1">{edu.period}</p>
                  <h3 className="text-xl font-bold text-zinc-100">{edu.school}</h3>
                  <p className="text-sm font-medium text-gradient-accent mt-1 mb-4">
                    {edu.degree}
                  </p>
                  <ul className="space-y-2">
                    {edu.highlights.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-zinc-400 flex items-start gap-2"
                      >
                        <span className="text-indigo-400 shrink-0 mt-0.5">→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
