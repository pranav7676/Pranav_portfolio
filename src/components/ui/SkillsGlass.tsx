"use client";

import Tilt from "react-parallax-tilt";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  Users, Lightbulb, Brain, BarChart3, Search, 
  Activity, MessageSquare, Users2, RefreshCw, Clock,
  Code2, Database, Layout, Smartphone, Settings, Cpu
} from "lucide-react";

interface Skill {
  name: string;
  category: string;
  level: number; // 0-100
  icon?: any;
  highlight?: boolean;
}

const technicalSkills: Skill[] = [
  { name: "React.js", category: "Frontend", level: 95, icon: Layout },
  { name: "Next.js", category: "Frontend", level: 90, icon: Layout },
  { name: "Node.js", category: "Backend", level: 88, icon: Settings },
  { name: "TypeScript", category: "Language", level: 92, icon: Code2 },
  { name: "Python", category: "Language", level: 85, icon: Code2 },
  { name: "AI / ML", category: "AI", level: 80, icon: Cpu },
  { name: "GraphQL", category: "Backend", level: 75, icon: Database },
  { name: "Tailwind CSS", category: "Design", level: 95, icon: Layout },
];

const coreStrengths: Skill[] = [
  { name: "Leadership", category: "Soft Skill", level: 90, icon: Users, highlight: true },
  { name: "Problem Solving", category: "Soft Skill", level: 95, icon: Lightbulb, highlight: true },
  { name: "Logical Thinking", category: "Cognitive", level: 92, icon: Brain },
  { name: "Analytical Thinking", category: "Cognitive", level: 88, icon: BarChart3 },
  { name: "Critical Thinking", category: "Cognitive", level: 90, icon: Search },
  { name: "Cognitive Skills", category: "Cognitive", level: 85, icon: Activity },
  { name: "Communication", category: "Soft Skill", level: 92, icon: MessageSquare },
  { name: "Team Collaboration", category: "Soft Skill", level: 95, icon: Users2 },
  { name: "Adaptability", category: "Soft Skill", level: 90, icon: RefreshCw },
  { name: "Time Management", category: "Soft Skill", level: 88, icon: Clock },
];

function SkillCard({ skill, index, scrollYProgress }: { skill: Skill; index: number; scrollYProgress: any }) {
  const yOffset = index % 2 === 0 ? -30 : 30;
  const y = useTransform(scrollYProgress, [0, 1], [yOffset, 0]);
  
  const Icon = skill.icon;

  return (
    <motion.div
      style={{ y }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Tilt
        tiltMaxAngleX={10}
        tiltMaxAngleY={10}
        glareEnable={true}
        glareMaxOpacity={0.1}
        glareColor={skill.highlight ? "#FAED26" : "#ffffff"}
        glareBorderRadius="16px"
        scale={1.02}
        perspective={1000}
      >
        <div className={`relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 transition-all duration-500 hover:border-[--color-primary-accent]/40 group h-full flex flex-col justify-between
          ${skill.highlight ? "shadow-[0_0_20px_rgba(250,237,38,0.1)] border-[--color-primary-accent]/30" : ""}
        `}>
          <div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500
              ${skill.highlight ? "bg-[--color-primary-accent]/20 text-[--color-primary-accent]" : "bg-white/5 text-[--color-soft-neutral] group-hover:text-white"}
            `}>
              {Icon && <Icon size={24} />}
            </div>
            <h4 className="text-white font-bold text-lg mb-1 group-hover:text-[--color-primary-accent] transition-colors">
              {skill.name}
            </h4>
            <p className="text-[--color-soft-neutral] text-xs uppercase tracking-widest font-mono mb-6">
              {skill.category}
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <span className="text-[10px] text-[--color-soft-neutral] font-mono uppercase tracking-tighter">Confidence</span>
              <span className="text-[10px] text-white font-mono">{skill.level}%</span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.2 + (index * 0.05), ease: "easeOut" }}
                className={`h-full rounded-full ${skill.highlight ? "bg-[--color-primary-accent] shadow-[0_0_10px_#FAED26]" : "bg-white/40"}`}
              />
            </div>
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}

export function SkillsGlass({ category }: { category: "technical" | "core" }) {
  const ref = useRef<HTMLDivElement>(null);
  const skills = category === "technical" ? technicalSkills : coreStrengths;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  return (
    <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 px-6 md:px-12 lg:px-24 max-w-full mx-auto pb-12">
      {skills.map((skill, i) => (
        <SkillCard 
          key={skill.name} 
          skill={skill} 
          index={i} 
          scrollYProgress={scrollYProgress} 
        />
      ))}
    </div>
  );
}
