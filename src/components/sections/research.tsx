"use client";

import { motion } from "framer-motion";
import { FlaskConical, Microscope } from "lucide-react";
import { RESEARCH_TOPICS } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";

const STATUS_COLORS: Record<string, string> = {
  Active: "text-emerald-400 bg-emerald-500/10",
  Exploring: "text-amber-400 bg-amber-500/10",
  Shipped: "text-cyan-400 bg-cyan-500/10",
};

export function ResearchSection() {
  return (
    <section id="research" className="section-padding relative">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.08),transparent_70%)]" />
      </div>

      <div className="container-max relative">
        <SectionHeader
          label="AI Research Lab"
          title="Multimodal intelligence"
          description="Exploring CLIP, BLIP, contrastive learning, embedding alignment, and visual reasoning."
        />

        <div className="flex items-center gap-3 mb-8 glass rounded-full px-4 py-2 w-fit">
          <Microscope className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-mono text-zinc-400">Lab Status: Active Research</span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {RESEARCH_TOPICS.map((topic, i) => (
            <motion.div
              key={topic.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              whileHover={{ y: -4 }}
              className="glass-strong rounded-xl p-6 spotlight glow-border group"
            >
              <div className="flex items-start justify-between mb-4">
                <FlaskConical className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors" />
                <span
                  className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${STATUS_COLORS[topic.status]}`}
                >
                  {topic.status}
                </span>
              </div>
              <h3 className="font-bold mb-2">{topic.title}</h3>
              <p className="text-sm text-zinc-400 mb-4 leading-relaxed">{topic.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {topic.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-md border border-purple-500/20 text-[10px] text-purple-300/80 font-mono"
                  >
                    {tag}
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
