"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";
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
  return (
    <SectionWrapper id="experience">
      <AnimatedText text="Experience" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-0.5 bg-white/10 -translate-x-1/2" />
        
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-center mb-16 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
          >
            {/* Timeline Node */}
            <div className="absolute left-[39px] md:left-[50%] w-10 h-10 rounded-full bg-[--color-primary-bg] border border-[--color-primary-accent] flex items-center justify-center -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(250,237,38,0.3)]">
              <exp.icon size={18} className="text-[--color-primary-accent]" />
            </div>
            
            <div className="w-full pl-24 md:pl-0 md:w-1/2 md:px-12">
              <GlassCard className="text-left w-full hover:border-[--color-primary-accent]/50 transition-all duration-500">
                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-primary-accent] mb-2 block">{exp.period}</span>
                <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                <h4 className="text-md text-[--color-soft-neutral] mb-4">@ {exp.company}</h4>
                
                {Array.isArray(exp.description) ? (
                  <ul className="space-y-2">
                    {exp.description.map((item, i) => (
                      <li key={i} className="text-sm text-[--color-soft-neutral] flex gap-2">
                        <span className="text-[--color-primary-accent] mt-1.5 w-1 h-1 rounded-full bg-[--color-primary-accent] shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[--color-soft-neutral] leading-relaxed">{exp.description}</p>
                )}
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
