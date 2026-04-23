"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Trophy, Award, Keyboard, ExternalLink, ShieldCheck } from "lucide-react";
import { ReactNode } from "react";

function BentoCard({ 
  title, 
  type, 
  icon, 
  desc, 
  className = "", 
  index 
}: { 
  title: string; 
  type: string; 
  icon: ReactNode; 
  desc: string; 
  className?: string;
  index: number;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-[--color-primary-accent]/40 ${className}`}
    >
      {/* Background Glow */}
      <div className="absolute -inset-px bg-gradient-to-br from-[--color-primary-accent]/20 via-transparent to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between" style={{ transform: "translateZ(50px)" }}>
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="rounded-2xl bg-white/[0.05] p-3 border border-white/10 text-[--color-primary-accent] group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(250,237,38,0.3)] transition-all duration-500">
              {icon}
            </div>
            <ExternalLink size={16} className="text-white/20 group-hover:text-[--color-primary-accent] transition-colors" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-primary-accent]/60">
                {type}
              </span>
              <div className="h-px flex-1 bg-white/5" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">{title}</h3>
          </div>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-[--color-soft-neutral] opacity-80 group-hover:opacity-100 transition-opacity">
          {desc}
        </p>
      </div>

      {/* Decorative Corner */}
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <div className="w-8 h-8 border-t border-r border-white/40 rounded-tr-xl" />
      </div>
      
      {/* Animated Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(250,237,38,0.05)_50%,transparent_100%)] bg-[length:100%_4px] animate-scanline opacity-0 group-hover:opacity-100 pointer-events-none" />
    </motion.div>
  );
}

export function Achievements() {
  const achievements = [
    {
      title: "Guinness World Record",
      type: "Global Milestone",
      icon: <Keyboard strokeWidth={1.5} />,
      desc: "Recognized globally for elite performance in keyboard speed and data accuracy under official adjudication.",
      className: "md:col-span-2 md:row-span-2 bg-gradient-to-br from-white/[0.05] to-transparent",
    },
    {
      title: "Defy'26 Participant",
      type: "Hackathon Participation",
      icon: <Trophy strokeWidth={1.5} />,
      desc: "Participated in Defy'26, building a scalable architecture for real-time systems.",
      className: "md:col-span-2",
    },
    {
      title: "AWS Developer",
      type: "Professional Cert",
      icon: <Award strokeWidth={1.5} />,
      desc: "Certified expertise in architecting and deploying resilient cloud infrastructures.",
      className: "md:col-span-1",
    },
    {
      title: "Hackhazards Participant",
      type: "Hackathon Participation",
      icon: <ShieldCheck strokeWidth={1.5} />,
      desc: "Participated in an intense 48-hour development sprint focused on AI safety.",
      className: "md:col-span-1",
    },
  ];

  return (
    <SectionWrapper id="achievements">
      <div className="mb-16 flex flex-col items-center text-center">
        <div className="mb-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono uppercase tracking-[0.2em] text-[--color-primary-accent]">
          <span className="w-1 h-1 bg-[--color-primary-accent] rounded-full animate-pulse" />
          Accolades & Records
        </div>
        <AnimatedText text="Recognition" el="h2" className="text-4xl md:text-5xl font-bold" asGradient />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 max-w-6xl mx-auto">
        {achievements.map((item, index) => (
          <BentoCard
            key={index}
            index={index}
            {...item}
          />
        ))}
      </div>
    </SectionWrapper>
  );
}
