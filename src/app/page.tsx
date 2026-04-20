import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Achievements } from "@/sections/Achievements";
import { Contact } from "@/sections/Contact";
import { CustomCursor } from "@/components/layout/CustomCursor";

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen">
      <CustomCursor />
      
      <Hero />
      
      {/* Decorative Spacer */}
      <div className="h-32 bg-gradient-to-b from-transparent to-[--color-primary-bg]" />
      
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Contact />
      
      {/* Footer */}
      <footer className="w-full py-8 border-t border-[--color-secondary-neutral]/20 text-center">
        <p className="text-[--color-soft-neutral] text-sm">&copy; {new Date().getFullYear()} M Pranav. All rights reserved.</p>
        <p className="text-[--color-secondary-neutral] text-xs mt-2">Designed and Engineered for the Future.</p>
      </footer>
    </main>
  );
}
