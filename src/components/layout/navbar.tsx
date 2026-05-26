"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_ITEMS, SITE } from "@/data/portfolio";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = NAV_ITEMS.map((item) => item.id);
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 150) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileOpen(false);
    scrollToSection(id);
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "py-3" : "py-5"
      )}
    >
      <nav
        className={cn(
          "mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between rounded-full transition-all duration-500",
          scrolled
            ? "glass-strong py-3 shadow-2xl shadow-black/20"
            : "bg-transparent py-2"
        )}
      >
        <button
          onClick={() => scrollTo("hero")}
          className="text-sm font-semibold tracking-tight hover:text-indigo-400 transition-colors"
          data-cursor="pointer"
        >
          {SITE.name.split(" ")[0]}
          <span className="text-indigo-400">.</span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={cn(
                "relative px-4 py-2 text-xs font-medium tracking-wide uppercase transition-colors",
                activeSection === item.id
                  ? "text-white"
                  : "text-white/50 hover:text-white/80"
              )}
              data-cursor="pointer"
            >
              {item.label}
              {activeSection === item.id && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
                />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`mailto:${SITE.email}`}
            className="hidden md:inline-flex glass px-4 py-2 rounded-full text-xs font-medium hover:bg-white/10 transition-colors"
            data-cursor="pointer"
          >
            Get in touch
          </a>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-full glass hover:bg-white/10 transition-colors"
            aria-label="Toggle menu"
            data-cursor="pointer"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-6 mt-2 glass-strong rounded-2xl p-4"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={cn(
                  "block w-full text-left px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                  activeSection === item.id
                    ? "text-white bg-white/5"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                )}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
