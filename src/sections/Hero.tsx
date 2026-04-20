"use client";

import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SplineScene } from "@/components/3d/SplineScene";
import { motion } from "framer-motion";

export function Hero() {
  return (
    <section className="relative h-screen w-full flex items-center justify-start overflow-hidden">
      {/* Background Environment Scene */}
      <SplineScene 
        sceneUrl="https://my.spline.design/boxeshover-RAglKuhzdaTmleyw3f1YidlD/"
        className="opacity-60 mix-blend-screen"
        interactive={false}
      />

      {/* Hero Character Scene */}
      <SplineScene 
        sceneUrl="https://my.spline.design/nexbotrobotcharacterconcept-q1n94DACLW8ZCKW6NjVWfj6F/"
        className="z-10 translate-x-[20%] md:translate-x-[25%] lg:translate-x-[30%] scale-150"
        interactive={true}
      />

      {/* Content */}
      <div className="relative z-20 px-6 md:px-12 lg:px-24 w-full md:w-1/2 flex flex-col items-start gap-6 pointer-events-none">
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
          <h2 className="text-xl md:text-3xl text-[--color-soft-neutral] font-light mt-4">
            Full Stack Developer | <span className="text-white">AI Systems Builder</span>
          </h2>
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
    </section>
  );
}
