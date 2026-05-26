"use client";

import { SITE } from "@/data/portfolio";
import { Github, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 px-6 md:px-12">
      <div className="container-max flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-sm font-medium">{SITE.name}</p>
          <p className="text-xs text-white/40 mt-1">
            AI Engineer • Founder • Building the future with AI
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={`mailto:${SITE.email}`}
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="Email"
            data-cursor="pointer"
          >
            <Mail className="w-4 h-4" />
          </a>
          <a
            href={SITE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="LinkedIn"
            data-cursor="pointer"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={SITE.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="GitHub"
            data-cursor="pointer"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>

        <p className="text-xs text-white/30 font-mono">
          © {new Date().getFullYear()} - Crafted with precision
        </p>
      </div>
    </footer>
  );
}
