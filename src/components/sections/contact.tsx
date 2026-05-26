"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Download, Github, Linkedin, Mail } from "lucide-react";
import { SITE } from "@/data/portfolio";
import { MagneticButton } from "@/components/ui/magnetic-button";

export function ContactSection() {
  return (
    <section id="contact" className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-600/15 blur-[120px] rounded-full" />
      </div>

      <div className="container-max relative">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-strong rounded-3xl p-10 md:p-16 text-center glow-border spotlight max-w-4xl mx-auto"
        >
          <p className="text-xs font-mono uppercase tracking-[0.25em] text-indigo-400 mb-6">
            Let&apos;s build something legendary
          </p>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gradient mb-6">
            Ready to ship AI systems?
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            Open to founder collaborations, AI engineering roles, and ambitious startup builds.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <MagneticButton href={`mailto:${SITE.email}`} variant="glow">
              <Mail className="w-4 h-4" />
              {SITE.email}
              <ArrowUpRight className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton href={SITE.resumeUrl} variant="glass">
              <Download className="w-4 h-4" /> Download Resume
            </MagneticButton>
            <MagneticButton href={SITE.linkedin} variant="outline">
              <Linkedin className="w-4 h-4" /> LinkedIn
            </MagneticButton>
            <MagneticButton href={SITE.github} variant="outline">
              <Github className="w-4 h-4" /> GitHub
            </MagneticButton>
          </div>

          <p className="mt-10 text-xs text-zinc-600 font-mono">
            Add <span className="text-zinc-500">public/resume.pdf</span> for resume download
          </p>
        </motion.div>
      </div>
    </section>
  );
}
