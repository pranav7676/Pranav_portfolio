"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import { Users, Briefcase, Code, Terminal, Globe, Award } from "lucide-react";

const experiences = [
  {
    role: "Class Representative",
    company: "SRM IST",
    period: "2023 – 2027",
    icon: Users,
    description: [
      "Represented student body and coordinated with faculty",
      "Managed communication between students and administration",
      "Organized academic and extracurricular activities",
      "Demonstrated leadership and problem-solving skills"
    ]
  },
  {
    role: "Full Stack Intern",
    company: "Synergech",
    period: "2023 - Present",
    icon: Briefcase,
    description: "Developed and maintained full-stack applications, optimizing database queries and implementing responsive UIs.",
  },
  {
    role: "Freelancer",
    company: "CareerForge",
    period: "2022 - 2023",
    icon: Globe,
    description: "Built career-oriented platforms helping students find correct learning paths. Implemented auth and payment gateways.",
  },
  {
    role: "Developer",
    company: "Tech Vayuna",
    period: "2021 - 2022",
    icon: Code,
    description: "Contributed to tech initiatives, building internal tools using React and Node.js.",
  },
  {
    role: "Core Member",
    company: "Codezilla",
    period: "2020 - 2021",
    icon: Terminal,
    description: "Organized hackathons and conducted workshops on web development.",
  },
  {
    role: "Member",
    company: "EcoClub",
    period: "2019 - 2020",
    icon: Award,
    description: "Managed technical operations and social media campaigns for the club.",
  },
];

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <SectionWrapper id="experience">
      <AnimatedText text="Experience" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div ref={containerRef} className="relative max-w-4xl mx-auto">
        {/* Vertical Data Stream Line */}
        <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-[2px] bg-white/5 -translate-x-1/2">
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-b from-[--color-primary-accent] via-purple-500 to-transparent shadow-[0_0_15px_rgba(250,237,38,0.5)]"
          />
          
          {/* Data Pulse Packet */}
          <motion.div 
            animate={{ 
              top: ["0%", "100%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="absolute left-1/2 -translate-x-1/2 w-2 h-8 bg-gradient-to-b from-[--color-primary-accent] to-transparent blur-sm z-20"
          />
        </div>
        
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
            className={`relative flex items-center mb-24 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
          >
            {/* HUD Timeline Node */}
            <div className="absolute left-[39px] md:left-[50%] -translate-x-1/2 z-10">
              <motion.div 
                whileHover={{ scale: 1.2 }}
                className="relative w-12 h-12 flex items-center justify-center"
              >
                {/* Rotating Rings */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border border-dashed border-[--color-primary-accent]/30"
                />
                <motion.div 
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-dotted border-[--color-primary-accent]/50"
                />
                
                {/* Center Node */}
                <div className="relative w-8 h-8 rounded-full bg-[--color-primary-bg] border border-[--color-primary-accent] flex items-center justify-center shadow-[0_0_20px_rgba(250,237,38,0.4)]">
                  <exp.icon size={16} className="text-[--color-primary-accent]" />
                </div>
              </motion.div>
            </div>
            
            <div className="w-full pl-24 md:pl-0 md:w-1/2 md:px-16">
              <GlassCard className="group relative text-left w-full hover:border-[--color-primary-accent]/50 transition-all duration-500 overflow-hidden">
                {/* Scanning Light Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-[--color-primary-accent]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[--color-primary-accent] mb-3 block opacity-70 group-hover:opacity-100 transition-opacity">
                  {exp.period}
                </span>
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-[--color-primary-accent] transition-colors">
                  {exp.role}
                </h3>
                <h4 className="text-md font-mono text-[--color-soft-neutral] mb-6">
                  {">"} {exp.company}
                </h4>
                
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-3">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-[--color-soft-neutral]/80 group-hover:text-[--color-soft-neutral] flex gap-3 leading-relaxed">
                        <span className="text-[--color-primary-accent] mt-1.5 w-1.5 h-1.5 rounded-full bg-[--color-primary-accent] shadow-[0_0_8px_rgba(250,237,38,0.6)] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[--color-soft-neutral]/80 group-hover:text-[--color-soft-neutral] leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
