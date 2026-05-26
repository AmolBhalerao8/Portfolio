"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { TERMINAL_COMMANDS } from "@/data/portfolio";

export function AITerminal() {
  const [lines, setLines] = useState<{ cmd: string; output: string }[]>([]);
  const [typing, setTyping] = useState("");
  const [cmdIndex, setCmdIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "output" | "pause">("typing");

  useEffect(() => {
    if (cmdIndex >= TERMINAL_COMMANDS.length) {
      const t = setTimeout(() => {
        setLines([]);
        setCmdIndex(0);
      }, 4000);
      return () => clearTimeout(t);
    }

    const cmd = TERMINAL_COMMANDS[cmdIndex].cmd;

    if (phase === "typing") {
      if (typing.length < cmd.length) {
        const t = setTimeout(() => setTyping(cmd.slice(0, typing.length + 1)), 45);
        return () => clearTimeout(t);
      }
      const t = setTimeout(() => setPhase("output"), 400);
      return () => clearTimeout(t);
    }

    if (phase === "output") {
      setLines((prev) => [
        ...prev,
        { cmd, output: TERMINAL_COMMANDS[cmdIndex].output },
      ]);
      setTyping("");
      setCmdIndex((i) => i + 1);
      setPhase("pause");
      const t = setTimeout(() => setPhase("typing"), 800);
      return () => clearTimeout(t);
    }
  }, [typing, phase, cmdIndex]);

  return (
    <div className="glass-strong rounded-xl overflow-hidden font-mono text-sm glow-border">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 bg-black/40">
        <span className="w-3 h-3 rounded-full bg-red-500/80" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <span className="w-3 h-3 rounded-full bg-green-500/80" />
        <span className="ml-2 text-zinc-500 text-xs">amol@ai-systems ~ </span>
      </div>
      <div className="p-4 h-[220px] overflow-y-auto space-y-2">
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <p className="text-cyan-400">
              <span className="text-zinc-500">$ </span>
              {line.cmd}
            </p>
            <p className="text-emerald-400/90 pl-2">{line.output}</p>
          </motion.div>
        ))}
        {typing && (
          <p className="text-cyan-400">
            <span className="text-zinc-500">$ </span>
            {typing}
            <span className="animate-pulse">▊</span>
          </p>
        )}
      </div>
    </div>
  );
}
