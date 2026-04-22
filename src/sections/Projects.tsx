"use client";

import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedText } from "@/components/ui/AnimatedText";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ExternalLink, Monitor, Smartphone, Cpu } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

const projects = [
  {
    title: "Real-Time Bus Tracking",
    description: "An interactive, real-time IoT and web application tracking campus buses, reducing wait times.",
    tags: ["Next.js", "WebSockets", "IoT"],
    icon: <Monitor className="w-5 h-5" />,
    stats: { performance: "98%", latency: "24ms" }
  },
  {
    title: "Finwise",
    description: "AI-powered finance platform analyzing spending habits and providing actionable forecasting.",
    tags: ["React", "Python", "ML"],
    icon: <Cpu className="w-5 h-5" />,
    stats: { accuracy: "94%", users: "1.2k" }
  },
  {
    title: "Vintage Vault",
    description: "E-commerce platform specialized in vintage artifacts. Features secure payments and 3D preview.",
    tags: ["Three.js", "Node.js", "Stripe"],
    icon: <Smartphone className="w-5 h-5" />,
    stats: { uptime: "99.9%", loadTime: "0.8s" }
  },
];

function ProjectCard({ project }: { project: typeof projects[0] }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const sheenX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const sheenY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="group relative flex flex-col justify-between rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 overflow-hidden h-[420px] transition-colors hover:border-[--color-primary-accent]/30"
    >
      {/* Holographic Sheen */}
      <motion.div 
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{
          background: useMotionTemplate`radial-gradient(600px circle at ${sheenX} ${sheenY}, var(--color-primary-accent), transparent 40%)`
        }}
      />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="relative z-10" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-center justify-between mb-6">
          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[--color-primary-accent] group-hover:shadow-[0_0_15px_rgba(250,237,38,0.2)] transition-all">
            {project.icon}
          </div>
          <div className="flex gap-3">
            <a href="#" className="text-white/20 hover:text-white transition-colors cursor-pointer">
              <GithubIcon size={18} />
            </a>
            <a href="#" className="text-white/20 hover:text-white transition-colors cursor-pointer">
              <ExternalLink size={18} />
            </a>
          </div>
        </div>

        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[--color-primary-accent] transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-[--color-soft-neutral] mb-6 leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-8" style={{ transform: "translateZ(20px)" }}>
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider bg-white/5 text-[--color-primary-accent] rounded-md border border-[--color-primary-accent]/20">
              {tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="relative z-10 mt-auto pt-6 border-t border-white/5 flex items-center justify-between" style={{ transform: "translateZ(30px)" }}>
        <div className="flex gap-4">
          {Object.entries(project.stats).map(([key, val], i) => (
            <div key={i} className="flex flex-col">
              <span className="text-[9px] uppercase tracking-tighter text-white/30">{key}</span>
              <span className="text-xs font-mono text-white/80">{val}</span>
            </div>
          ))}
        </div>
        <AnimatedButton variant="secondary" className="px-6 py-2 text-xs !rounded-xl">
          View Live
        </AnimatedButton>
      </div>

      {/* Decorative Corner Scan */}
      <div className="absolute bottom-0 right-0 p-4 opacity-10 group-hover:opacity-40 transition-opacity">
        <div className="w-12 h-12 border-b-2 border-r-2 border-[--color-primary-accent] rounded-br-2xl" />
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
