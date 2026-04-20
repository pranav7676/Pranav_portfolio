import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Skills } from "@/sections/Skills";
import { Achievements } from "@/sections/Achievements";
import { Resume } from "@/sections/Resume";
import { Contact } from "@/sections/Contact";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { LoadingScreen } from "@/components/ui/LoadingScreen";
import { BackToTop } from "@/components/ui/BackToTop";

export default function Home() {
  return (
    <main className="w-full h-full min-h-screen">
      <LoadingScreen />
      <CustomCursor />
      <BackToTop />
      <Navbar />
      
      <Hero />
      
      {/* Decorative Spacer */}
      <div className="h-32 bg-gradient-to-b from-transparent to-[--color-primary-bg]" />
      
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Achievements />
      <Resume />
      <Contact />
      
      <Footer />
    </main>
  );
}

