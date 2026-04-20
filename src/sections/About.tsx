"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";
import { CheckCircle2, Star, Rocket, Trophy, Target, Cpu } from "lucide-react";

import StatsCard from "@/components/ui/StatsCard";

const stats = [
  { label: "Projects", value: 20, suffix: "+" },
  { label: "Internships", value: 1, suffix: "" },
  { label: "Workshops", value: 2, suffix: "+" },
  { label: "Conference", value: 1, suffix: "" },
  { label: "Patent", value: 1, suffix: "" },
  { label: "CGPA", value: 9.35, suffix: "" },
  { label: "Hackathons", value: 8, suffix: "+" },
];

const highlights = [
  "Full Stack Intern at Synergech",
  "Published 1 Technical Patent",
  "Presented at International Conferences",
  "Active in 8+ Hackathons & Communities",
];

const whatIDo = [
  "Build full-stack apps (React, Next.js, Node.js)",
  "Design intuitive UI/UX systems",
  "Work with real-time data & APIs",
  "Explore AI-powered applications",
];

export function About() {
  return (
    <SectionWrapper id="about">
      <div className="flex flex-col lg:flex-row items-start gap-16">
        {/* Left: Text Content */}
        <div className="flex-[1.2] space-y-8">
          <div className="space-y-4">
            <AnimatedText text="About Me" el="h2" className="text-4xl md:text-5xl font-bold" asGradient />
            <p className="text-[--color-soft-neutral] text-lg leading-relaxed max-w-2xl">
              I&apos;m a passionate <span className="text-white font-semibold">Full Stack Developer</span> and 
              <span className="text-[--color-primary-accent] font-semibold"> AI enthusiast</span> currently pursuing 
              B.Tech in Computer Science at <span className="text-white">SRM IST</span> with a CGPA of 
              <span className="text-[--color-primary-accent] font-bold"> 9.35</span>. I specialize in building 
              scalable web applications, real-time systems, and intelligent interfaces that combine performance 
              with user-centric design.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Target size={20} className="text-[--color-primary-accent]" />
                What I Do
              </h3>
              <ul className="space-y-3">
                {whatIDo.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-[--color-soft-neutral] text-sm"
                  >
                    <CheckCircle2 size={16} className="text-[--color-primary-accent] mt-1 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Star size={20} className="text-[--color-primary-accent]" />
                Highlights
              </h3>
              <ul className="space-y-3">
                {highlights.map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start gap-2 text-[--color-soft-neutral] text-sm"
                  >
                    <CheckCircle2 size={16} className="text-[--color-primary-accent] mt-1 shrink-0" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right: Stats Cards */}
        <div className="flex-1 w-full relative grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <StatsCard value={stat.value as number} label={stat.label} suffix={stat.suffix} />
            </motion.div>
          ))}
          
          {/* Decorative Glowing Elements */}
          <div className="absolute -top-12 -right-12 w-64 h-64 bg-[--color-primary-accent]/10 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-[--color-warm-accent]/10 rounded-full blur-[100px] pointer-events-none" />
        </div>
      </div>
    </SectionWrapper>
  );
}
