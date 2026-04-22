"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion } from "framer-motion";
import { ParallaxDepthLayers } from "@/components/layout/ParallaxDepthLayers";
import { ParallaxWrapper } from "@/components/layout/ParallaxWrapper";
import HudHexProfile from "@/components/HudHexProfile";
import HeroText from "@/components/ui/HeroText";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden">
      <ParallaxDepthLayers />

      <motion.div
        className="absolute inset-y-0 right-[-15%] z-10 h-full w-[48vw] min-w-[22rem] rounded-full border border-white/10 bg-gradient-to-b from-white/10 to-transparent blur-[1px]"
        initial={{ opacity: 0, scale: 0.88, x: 60 }}
        animate={{ opacity: 0.9, scale: 1, x: 0 }}
        transition={{ duration: 1.1, delay: 0.25, ease: "easeOut" }}
      />

      <div className="relative z-20 mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-24">
      {/* Content */}
      <div className="w-full md:w-1/2 flex flex-col items-start gap-6 pointer-events-none">
        
        {/* Open to Work Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 text-sm font-medium"
        >
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(74,222,128,0.8)]" />
          Open to Work
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="text-[--color-primary-accent] font-mono tracking-widest uppercase mb-2">
            Welcome to my universe
          </p>
          <AnimatedText 
            text="M Pranav" 
            el="h1" 
            className="text-5xl md:text-7xl font-bold tracking-tighter"
            asGradient
          />
          <HeroText />
        </motion.div>

        <motion.p 
          className="text-[--color-soft-neutral] text-lg max-w-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          &ldquo;Building scalable systems with immersive UI and real-world impact.&rdquo;
        </motion.p>

        <motion.div 
          className="flex flex-wrap gap-4 mt-8 pointer-events-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <AnimatedButton onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}>
            View Projects
          </AnimatedButton>
          <AnimatedButton variant="secondary" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            Contact Me
          </AnimatedButton>
        </motion.div>
      </div>

      <div className="hidden md:flex w-1/2 items-center justify-center pointer-events-none">
        <ParallaxWrapper intensity={14} className="pointer-events-auto">
          <HudHexProfile />
        </ParallaxWrapper>
      </div>
      </div>
    </section>
  );
}
