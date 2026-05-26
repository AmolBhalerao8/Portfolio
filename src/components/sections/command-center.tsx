"use client";

import { motion } from "framer-motion";
import { Activity, Cpu, Database, Network } from "lucide-react";
import { COMMAND_METRICS, ARCHITECTURE_LAYERS } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { AITerminal } from "@/components/effects/ai-terminal";

export function CommandCenterSection() {
  return (
    <section id="command" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Command Center"
          title="Live AI Systems"
          description="Real metrics from production agents, voice pipelines, and orchestration infrastructure."
        />

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-12">
          {COMMAND_METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass spotlight rounded-xl p-4 glow-border group hover:border-indigo-500/30 transition-colors"
            >
              <p className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 mb-2">
                {m.label}
              </p>
              <p className="text-2xl font-bold text-gradient-accent">
                {m.value}
                {m.unit && <span className="text-sm">{m.unit}</span>}
              </p>
              {m.delta && (
                <p className="text-xs text-emerald-400 mt-1 font-mono">{m.delta}</p>
              )}
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 flex items-center gap-2">
              <Network className="w-4 h-4 text-indigo-400" />
              Architecture
            </h3>
            <div className="glass-strong rounded-2xl p-6 glow-border space-y-4">
              {ARCHITECTURE_LAYERS.map((layer, i) => (
                <motion.div
                  key={layer.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                      {i === 0 && <Activity className="w-4 h-4 text-indigo-400" />}
                      {i === 1 && <Network className="w-4 h-4 text-cyan-400" />}
                      {i === 2 && <Cpu className="w-4 h-4 text-purple-400" />}
                      {i === 3 && <Database className="w-4 h-4 text-emerald-400" />}
                    </div>
                    <span className="font-semibold text-sm">{layer.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-11">
                    {layer.items.map((item) => (
                      <span
                        key={item}
                        className="px-2.5 py-1 rounded-md bg-white/5 text-xs text-zinc-400 border border-white/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {i < ARCHITECTURE_LAYERS.length - 1 && (
                    <div className="absolute left-[15px] top-10 w-px h-6 bg-gradient-to-b from-indigo-500/50 to-transparent" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-mono uppercase tracking-wider text-zinc-500 mb-4 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              AI Console
            </h3>
            <AITerminal />
          </div>
        </div>
      </div>
    </section>
  );
}
