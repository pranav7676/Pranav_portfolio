"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion, useScroll, useTransform, useSpring, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { SkillsGlass } from "@/components/ui/SkillsGlass";

const allSkills = [
  // Frontend
  "React.js", "Next.js", "Tailwind CSS", "Redux", "Framer Motion",
  // Backend
  "Node.js", "Express.js", "REST APIs", "GraphQL",
  // Languages
  "JavaScript", "TypeScript", "Python", "C++", "SQL",
  // Tools
  "Git", "GitHub", "Vercel", "Netlify", "Postman",
  // Design
  "Figma", "Framer", "Photoshop", "Spline", "Canva",
  // AI & Data
  "Machine Learning", "OpenAI APIs", "Data Analysis", "NLP Fundamentals"
];

function SkillItem({ skill, index, scrollYProgress }: { skill: string; index: number; scrollYProgress: MotionValue<number> }) {
  const total = allSkills.length;
  // Use a smaller window for focus to make it feel snappier
  const position = index / (total - 1);
  const range = 0.1;
  
  const scale = useTransform(
    scrollYProgress,
    [position - range, position, position + range],
    [0.7, 1.4, 0.7]
  );

  const opacity = useTransform(
    scrollYProgress,
    [position - range, position, position + range],
    [0.2, 1, 0.2]
  );

  const blurValue = useTransform(
    scrollYProgress,
    [position - range, position, position + range],
    [8, 0, 8]
  );

  const springScale = useSpring(scale, { stiffness: 100, damping: 20 });
  const springOpacity = useSpring(opacity, { stiffness: 100, damping: 20 });
  const filter = useTransform(blurValue, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{
        scale: springScale,
        opacity: springOpacity,
        filter
      }}
      className="py-8 text-center flex items-center justify-center gap-4 group"
    >
      <span className="text-4xl md:text-8xl font-black tracking-tighter uppercase transition-colors duration-500 group-hover:text-[--color-primary-accent]">
        {skill}
      </span>
    </motion.div>
  );
}

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Transform to move the list vertically
  // -100% means the last item is in the center
  const y = useTransform(scrollYProgress, [0, 1], ["40%", "-40%"]);

  return (
    <SectionWrapper id="skills" className="px-0 relative mb-0">
      <div className="px-6 md:px-12 lg:px-24 mb-16">
        <AnimatedText 
          text="Technical Arsenal" 
          el="h2" 
          className="text-4xl md:text-6xl font-bold mb-4" 
          asGradient 
        />
        <p className="text-[--color-soft-neutral] text-xl max-w-2xl">
          High-performance tools for high-impact systems.
        </p>
      </div>

      <div 
        ref={containerRef} 
        className="h-[400vh] relative"
      >
        <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
          {/* Background Decor */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:5rem_5rem]" />
          
          {/* Center Focus Guide */}
          <div className="absolute inset-x-0 h-32 md:h-48 border-y border-white/5 bg-white/[0.01] pointer-events-none z-0" />
          
          <motion.div 
            style={{ y }}
            className="w-full relative z-10 flex flex-col gap-4"
          >
            {allSkills.map((skill, i) => (
              <SkillItem 
                key={skill} 
                skill={skill} 
                index={i} 
                scrollYProgress={scrollYProgress} 
              />
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-32">
        <div className="px-6 md:px-12 lg:px-24 mb-16">
          <AnimatedText text="Technical Powerhouse" el="h3" className="text-3xl md:text-5xl font-bold mb-4" />
          <p className="text-[--color-soft-neutral] text-lg max-w-xl">
            A deep dive into the frameworks and languages I&apos;ve mastered.
          </p>
        </div>
        <SkillsGlass category="technical" />
      </div>

      <div className="mt-40">
        <div className="px-6 md:px-12 lg:px-24 mb-16">
          <AnimatedText text="Core Strengths" el="h3" className="text-3xl md:text-5xl font-bold mb-4" asGradient />
          <p className="text-[--color-soft-neutral] text-lg max-w-xl">
            My cognitive and interpersonal skills that drive leadership and project execution.
          </p>
        </div>
        <SkillsGlass category="core" />
      </div>
    </SectionWrapper>
  );
}
