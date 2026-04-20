"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Full Stack Intern",
    company: "Synergech",
    period: "2023 - Present",
    description: "Developed and maintained full-stack applications, optimizing database queries and implementing responsive UIs.",
  },
  {
    role: "Freelancer",
    company: "CareerForge",
    period: "2022 - 2023",
    description: "Built career-oriented platforms helping students find correct learning paths. Implemented auth and payment gateways.",
  },
  {
    role: "Developer",
    company: "Tech Vayuna",
    period: "2021 - 2022",
    description: "Contributed to tech initiatives, building internal tools using React and Node.js.",
  },
  {
    role: "Core Member",
    company: "Codezilla",
    period: "2020 - 2021",
    description: "Organized hackathons and conducted workshops on web development.",
  },
  {
    role: "Member",
    company: "EcoClub",
    period: "2019 - 2020",
    description: "Managed technical operations and social media campaigns for the club.",
  },
];

export function Experience() {
  return (
    <SectionWrapper id="experience">
      <AnimatedText text="Experience" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-[39px] md:left-[50%] top-0 bottom-0 w-0.5 bg-[--color-secondary-neutral] -translate-x-1/2" />
        
        {experiences.map((exp, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-center mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"} flex-row`}
          >
            {/* Timeline Node */}
            <div className="absolute left-[39px] md:left-[50%] w-4 h-4 rounded-full bg-[--color-primary-accent] -translate-x-1/2 shadow-[0_0_15px_rgba(250,237,38,0.8)] z-10" />
            
            <div className="w-full pl-24 md:pl-0 md:w-1/2 md:px-8">
              <GlassCard className="text-left w-full">
                <h3 className="text-xl font-bold text-white mb-1">{exp.role}</h3>
                <h4 className="text-md text-[--color-primary-accent] mb-4">{exp.company}</h4>
                <p className="text-sm text-[--color-soft-neutral] mb-2">{exp.period}</p>
                <p className="text-[--color-soft-neutral] leading-relaxed">{exp.description}</p>
              </GlassCard>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
