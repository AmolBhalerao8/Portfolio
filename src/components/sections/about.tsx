"use client";

import { motion } from "framer-motion";
import { SITE, ACHIEVEMENTS, HACKATHONS } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { CompetitionWins } from "@/components/sections/competition-wins";

export function AboutSection() {
  return (
    <section id="about" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Founder Story"
          title="Built to ship"
          description="A serious AI founder building systems that generate revenue, ship MVPs, and survive production."
        />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-2xl p-8 md:p-10 glow-border spotlight"
          >
            <p className="text-xl md:text-2xl font-medium leading-relaxed text-zinc-200 mb-6">
              {SITE.bio}
            </p>
            <p className="text-zinc-400 leading-relaxed">{SITE.founderStory}</p>
            <div className="mt-8 pt-8 border-t border-white/10 grid grid-cols-3 gap-4">
              <div>
                <p className="text-3xl font-bold text-gradient-accent">4x</p>
                <p className="text-xs text-zinc-500 font-mono mt-1">Competition Wins</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gradient-accent">$7K</p>
                <p className="text-xs text-zinc-500 font-mono mt-1">Prize Money</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-gradient-accent">6+</p>
                <p className="text-xs text-zinc-500 font-mono mt-1">Companies & Labs</p>
              </div>
            </div>
          </motion.div>

          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-6">
              Achievement Wall
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ACHIEVEMENTS.map((a, i) => (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="glass rounded-xl p-4 spotlight glow-border group cursor-default"
                >
                  <p className="font-medium text-sm text-zinc-200 group-hover:text-white transition-colors">
                    {a.title}
                  </p>
                  <p className="text-xs text-indigo-400 font-mono mt-1">{a.year}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-4">
                Hackathons Wall
              </h3>
              <div className="flex flex-wrap gap-2">
                {HACKATHONS.map((hackathon, i) => (
                  <motion.span
                    key={hackathon}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.04 }}
                    className="inline-flex items-center px-3 py-1.5 rounded-full glass text-xs text-zinc-300 border border-white/10"
                  >
                    {hackathon}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <CompetitionWins />
      </div>
    </section>
  );
}
