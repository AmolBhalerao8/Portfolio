"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { PROJECTS, type Project } from "@/data/portfolio";
import { SectionHeader } from "@/components/ui/section-header";
import { MagneticButton } from "@/components/ui/magnetic-button";

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-strong rounded-2xl max-w-lg w-full p-8 glow-border relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-500 hover:text-white"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>
        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
        <p className="text-zinc-400 text-sm mb-6">{project.longDescription}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((t) => (
            <span key={t} className="px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 text-xs">
              {t}
            </span>
          ))}
        </div>
        <div className="flex gap-3">
          <MagneticButton href={project.github} variant="glass">
            <Github className="w-4 h-4" /> GitHub
          </MagneticButton>
          {project.demo && (
            <MagneticButton href={project.demo} variant="glow">
              <ExternalLink className="w-4 h-4" /> Live Demo
            </MagneticButton>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function BentoCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const sizeClass =
    project.size === "large"
      ? "md:col-span-2 md:row-span-2"
      : project.size === "medium"
        ? "md:col-span-1 md:row-span-2"
        : "";

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      onClick={onOpen}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer spotlight glow-border ${sizeClass}`}
      style={{ transformStyle: "preserve-3d" }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        e.currentTarget.style.setProperty("--mouse-x", `${x}%`);
        e.currentTarget.style.setProperty("--mouse-y", `${y}%`);
      }}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />
      <div className="absolute inset-0 bg-[#030303]/60 backdrop-blur-sm" />
      <div className="relative p-6 h-full min-h-[200px] flex flex-col justify-between">
        <div>
          {project.featured && (
            <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400">
              Featured
            </span>
          )}
          <h3 className="text-xl font-bold mt-2 mb-2 group-hover:text-gradient-accent transition-all">
            {project.title}
          </h3>
          <p className="text-sm text-zinc-400 line-clamp-3">{project.description}</p>
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="flex flex-wrap gap-1">
            {project.metrics?.map((m) => (
              <span key={m} className="text-[10px] font-mono text-cyan-400/80 px-2 py-0.5 rounded bg-cyan-500/10">
                {m}
              </span>
            ))}
          </div>
          <span className="text-xs text-zinc-500 group-hover:text-white transition-colors">→</span>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] text-zinc-500">
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export function ProjectsSection() {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <section id="projects" className="section-padding relative">
      <div className="container-max">
        <SectionHeader
          label="Projects"
          title="Systems I've shipped"
          description="Production AI agents, voice automation, research platforms, and YC MVP infrastructure."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(200px,auto)]">
          {PROJECTS.map((p) => (
            <BentoCard key={p.id} project={p} onOpen={() => setSelected(p)} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
