"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LoadingScreen } from "@/components/layout/loading-screen";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { CustomCursor } from "@/components/effects/custom-cursor";
import { ParticleField } from "@/components/effects/particle-field";
import { FloatingCode } from "@/components/effects/floating-code";
import { LiquidBackground } from "@/components/effects/liquid-background";
import { HeroSection } from "@/components/sections/hero";
import { AboutSection } from "@/components/sections/about";
import { CommandCenterSection } from "@/components/sections/command-center";
import { ExperienceSection } from "@/components/sections/experience";
import { EducationSection } from "@/components/sections/education";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { ResearchSection } from "@/components/sections/research";
import { ContactSection } from "@/components/sections/contact";

export function PortfolioPage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <CustomCursor />
      <LiquidBackground />
      <ParticleField />
      <FloatingCode />
      <div className="noise-overlay" />

      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}

      <AnimatePresence>
        {loaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Navbar />
            <main className="relative z-10">
              <HeroSection />
              <AboutSection />
              <CommandCenterSection />
              <ExperienceSection />
              <EducationSection />
              <ProjectsSection />
              <SkillsSection />
              <ResearchSection />
              <ContactSection />
            </main>
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
