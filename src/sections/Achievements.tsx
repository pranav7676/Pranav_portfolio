"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";
import { Trophy, Award, BookOpen } from "lucide-react";

export function Achievements() {
  const achievements = [
    {
      title: "AWS Certified Developer",
      type: "Certification",
      icon: <Award strokeWidth={1.5} className="w-8 h-8 text-[--color-primary-accent]" />,
      desc: "Validated expertise in developing and maintaining AWS-based applications.",
    },
    {
      title: "Hackathon Winner - Smart India",
      type: "Competition",
      icon: <Trophy strokeWidth={1.5} className="w-8 h-8 text-[--color-primary-accent]" />,
      desc: "Built an AI-driven traffic optimization system winning 1st place out of 500+ teams.",
    },
    {
      title: "Merit Scholarship",
      type: "Academic",
      icon: <BookOpen strokeWidth={1.5} className="w-8 h-8 text-[--color-primary-accent]" />,
      desc: "Awarded top 1% academic excellence scholarship for 3 consecutive years.",
    },
  ];

  return (
    <SectionWrapper id="achievements">
      <AnimatedText text="Achievements" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15 }}
          >
            <GlassCard className="h-full flex flex-col justify-start">
              <div className="mb-6 p-4 rounded-full bg-[--color-primary-bg] w-max border border-[--color-secondary-neutral]/40 shadow-[0_0_10px_rgba(250,237,38,0.1)]">
                {item.icon}
              </div>
              <p className="text-sm text-[--color-soft-neutral] mb-1 font-mono uppercase tracking-wider">{item.type}</p>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-[--color-soft-neutral] leading-relaxed">{item.desc}</p>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
