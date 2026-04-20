"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Download, ExternalLink, GraduationCap, Briefcase, Award } from "lucide-react";
import { motion } from "framer-motion";

const resumeHighlights = [
  {
    icon: GraduationCap,
    title: "Education",
    details: "B.Tech Computer Science Engineering @ SRM IST, Ramapuram (CGPA 9.35)",
  },
  {
    icon: Briefcase,
    title: "Core Competency",
    details: "Full Stack Development & AI-Powered Systems Integration",
  },
  {
    icon: Award,
    title: "Achievements",
    details: "Multiple Hackathon Victories & Technical Leadership",
  },
];

export function Resume() {
  return (
    <SectionWrapper id="resume">
      <div className="flex flex-col lg:flex-row gap-12 items-center">
        {/* Left: Text Content */}
        <div className="flex-1 space-y-8">
          <div>
            <AnimatedText 
              text="Professional Standing" 
              el="h2" 
              className="text-4xl font-bold mb-4" 
              asGradient 
            />
            <p className="text-[--color-soft-neutral] text-lg max-w-xl">
              Equipped with a strong foundation in Computer Science and a passion for building 
              high-performance digital solutions. My resume details my journey through academia, 
              internships, and freelance projects.
            </p>
          </div>

          <div className="space-y-6">
            {resumeHighlights.map((item, idx) => (
              <motion.div 
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-[--color-secondary-neutral]/20 flex items-center justify-center shrink-0 text-[--color-primary-accent]">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">{item.title}</h4>
                  <p className="text-[--color-soft-neutral] text-sm">{item.details}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a href="/resume.pdf" download="M_Pranav_Resume.pdf">
              <AnimatedButton className="px-8">
                <Download size={18} className="mr-2" />
                Download Resume
              </AnimatedButton>
            </a>
            <AnimatedButton variant="secondary">
              View Academic Transcript
            </AnimatedButton>
          </div>
        </div>

        {/* Right: Preview Mockup */}
        <div className="flex-1 w-full max-w-xl relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-[--color-primary-accent]/20 to-[--color-warm-accent]/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <GlassCard className="aspect-[1/1.414] w-full p-0 overflow-hidden border-white/10 group-hover:border-[--color-primary-accent]/30 transition-colors">
            {/* Visual placeholder for the resume */}
            <div className="w-full h-full bg-white flex flex-col p-10 text-[#333] relative">
              <div className="w-32 h-6 bg-gray-200 rounded mb-8" />
              <div className="w-full h-4 bg-gray-100 rounded mb-4" />
              <div className="w-3/4 h-4 bg-gray-100 rounded mb-12" />
              
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="space-y-2">
                    <div className="w-24 h-4 bg-gray-200 rounded" />
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-full h-3 bg-gray-100 rounded" />
                    <div className="w-2/3 h-3 bg-gray-100 rounded" />
                  </div>
                ))}
              </div>

              {/* Overlay with info */}
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                <div className="text-center p-6">
                  <p className="text-white font-medium mb-4">M_Pranav_Resume_2026.pdf</p>
                  <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                    <AnimatedButton className="bg-white text-black hover:bg-gray-100 border-none">
                      <ExternalLink size={18} className="mr-2" />
                      Open Preview
                    </AnimatedButton>
                  </a>
                </div>
              </div>
            </div>
          </GlassCard>
          
          {/* Decorative elements */}
          <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[--color-primary-accent]/10 rounded-full blur-xl" />
          <div className="absolute -top-6 -left-6 w-24 h-24 bg-[--color-warm-accent]/10 rounded-full blur-xl" />
        </div>
      </div>
    </SectionWrapper>
  );
}
