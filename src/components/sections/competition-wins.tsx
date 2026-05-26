"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMPETITION_WINS } from "@/data/portfolio";

const PLACEMENT_STYLES: Record<string, string> = {
  "1st": "bg-amber-500/20 text-amber-300 border-amber-500/30",
  "2nd": "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  Pitch: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  Winner: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
};

export function CompetitionWins() {
  return (
    <div className="mt-16">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-6">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-1">
            Competition Wins
          </h3>
          <p className="text-2xl font-bold text-gradient-accent">4x Winner</p>
        </div>
        <p className="text-sm text-zinc-400">
          <span className="text-amber-400 font-semibold">$7,000</span> total prize money
        </p>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {COMPETITION_WINS.map((win, i) => (
          <motion.div
            key={win.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            whileHover={{ y: -4 }}
            className="glass rounded-xl overflow-hidden glow-border spotlight group flex flex-col"
          >
            <div className="relative aspect-[3/4] bg-zinc-950/80 min-h-0">
              <Image
                src={win.image}
                alt={`${win.title} - ${win.subtitle}`}
                fill
                className="object-contain object-center p-1 transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <span
                className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${PLACEMENT_STYLES[win.placement] ?? PLACEMENT_STYLES.Winner}`}
              >
                {win.placement}
              </span>
            </div>
            <div className="px-3 py-3 shrink-0">
              <p className="text-sm font-semibold text-zinc-100">{win.title}</p>
              <p className="text-[11px] text-zinc-500 font-mono mt-0.5">{win.subtitle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
