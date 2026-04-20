"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";

const skillsData = {
  Languages: ["TypeScript", "JavaScript", "Python", "C++", "Java", "SQL"],
  Frameworks: ["Next.js", "React", "Node.js", "Express", "Tailwind CSS", "Framer Motion"],
  Tools: ["Git", "Docker", "PostgreSQL", "MongoDB", "Figma", "AWS"],
};

export function Skills() {
  return (
    <SectionWrapper id="skills">
      <AnimatedText text="Technical Arsenal" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.entries(skillsData).map(([category, skills], idx) => (
          <GlassCard key={category} className="flex flex-col items-center p-8">
            <h3 className="text-xl font-bold text-[--color-primary-accent] mb-6">{category}</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {skills.map((skill, index) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index + idx * 0.2 }}
                  whileHover={{ scale: 1.1, color: "var(--color-primary-bg)", backgroundColor: "var(--color-primary-accent)" }}
                  className="px-4 py-2 bg-[--color-secondary-neutral]/20 text-[--color-soft-neutral] rounded-lg border border-[--color-secondary-neutral]/50 transition-colors duration-300 cursor-default"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </SectionWrapper>
  );
}
