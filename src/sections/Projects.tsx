"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

const projects = [
  {
    title: "Real-Time Bus Tracking",
    description: "An interactive, real-time IoT and web application tracking campus buses, reducing wait times.",
    tags: ["Next.js", "WebSockets", "IoT"],
  },
  {
    title: "Finwise",
    description: "AI-powered finance platform analyzing spending habits and providing actionable forecasting.",
    tags: ["React", "Python", "Machine Learning"],
  },
  {
    title: "Vintage Vault",
    description: "E-commerce platform specialized in vintage artifacts. Features secure payments and 3D product preview.",
    tags: ["Node.js", "Three.js", "Stripe"],
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      onMouseMove={handleMouseMove}
      className="group relative flex flex-col justify-between rounded-2xl border border-[--color-secondary-neutral] bg-white/[0.04] p-8 overflow-hidden h-full"
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100 mix-blend-screen"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              400px circle at ${mouseX}px ${mouseY}px,
              rgba(250, 237, 38, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      
      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
        <p className="text-[--color-soft-neutral] mb-6 leading-relaxed">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-xs font-medium bg-[--color-secondary-neutral]/30 text-[--color-soft-neutral] rounded-full border border-[--color-secondary-neutral]/50">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 mt-auto pt-4 border-t border-[--color-secondary-neutral]/30">
        <AnimatedButton variant="secondary" className="w-full text-sm py-2">
          View Details
        </AnimatedButton>
      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <SectionWrapper id="projects">
      <AnimatedText text="Featured Projects" el="h2" className="text-4xl font-bold mb-16 text-center" asGradient />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
