"use client";

import { motion } from "framer-motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: SectionHeaderProps) {
  const centered = align === "center";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`mb-16 md:mb-20 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-2xl"}`}
    >
      <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-indigo-400 mb-4">
        <span className="w-8 h-px bg-gradient-to-r from-indigo-500 to-transparent" />
        {label}
      </span>
      <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gradient mb-4">
        {title}
      </h2>
      {description && (
        <p className={`text-zinc-400 text-lg leading-relaxed ${centered ? "" : "max-w-xl"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
