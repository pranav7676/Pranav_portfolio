import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { GlassCard } from "@/components/ui/GlassCard";
import { AnimatedText } from "@/components/ui/AnimatedText";

export function About() {
  return (
    <SectionWrapper id="about" className="flex flex-col lg:flex-row items-center gap-16">
      <div className="flex-1 space-y-6">
        <AnimatedText text="About Me" el="h2" className="text-4xl font-bold" asGradient />
        <p className="text-[--color-soft-neutral] text-lg leading-relaxed">
          I am a passionate Full Stack Developer and AI Systems Builder focused on architecting
          elegant, scalable solutions. With a deep understanding of both high-performance backend 
          infrastructures and immersive, futuristic frontend interfaces, I engineer digital
          experiences that don't just work—they feel alive.
        </p>
        <p className="text-[--color-soft-neutral] text-lg leading-relaxed">
          Bridging the gap between artificial intelligence and human-centric design is what
          moves me. I thrive in environments where creativity meets hardcore technical constraints.
        </p>
      </div>
      <div className="flex-1 relative h-[400px] w-full max-w-md mx-auto perspective-1000">
        <GlassCard className="absolute top-0 right-0 w-[80%] h-48 z-10 -rotate-3 hover:rotate-0 transition-transform duration-500 hover:z-30">
          <h3 className="text-[--color-primary-accent] font-medium mb-2">My Focus</h3>
          <p className="text-sm text-[--color-soft-neutral]">Engineering intelligent systems scaling to millions of users.</p>
        </GlassCard>
        <GlassCard className="absolute top-24 left-0 w-[80%] h-48 z-20 rotate-2 hover:rotate-0 transition-transform duration-500 hover:z-30">
          <h3 className="text-[--color-primary-accent] font-medium mb-2">My Philosophy</h3>
          <p className="text-sm text-[--color-soft-neutral]">Performance is a feature. Design is functionality.</p>
        </GlassCard>
        <GlassCard className="absolute bottom-12 right-12 w-[70%] h-48 z-10 rotate-6 hover:rotate-0 transition-transform duration-500 hover:z-30">
          <h3 className="text-[--color-primary-accent] font-medium mb-2">My Arsenal</h3>
          <p className="text-sm text-[--color-soft-neutral]">React, Next.js, WebGL, Node.js, Python, and bleeding-edge AI models.</p>
        </GlassCard>
      </div>
    </SectionWrapper>
  );
}
