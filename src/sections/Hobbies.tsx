"use client";

import { motion } from "framer-motion";
import {
  Keyboard,
  Music2,
  Palette,
  Medal,
  Trophy,
  Code2,
  Film,
  Gamepad2,
  type LucideIcon,
} from "lucide-react";
import { SectionWrapper } from "@/components/ui/SectionWrapper";
import { AnimatedText } from "@/components/ui/AnimatedText";

interface Hobby {
  name: string;
  icon: LucideIcon;
}

const hobbies: Hobby[] = [
  { name: "Keyboard", icon: Keyboard },
  { name: "Music", icon: Music2 },
  { name: "Art", icon: Palette },
  { name: "Badminton", icon: Medal },
  { name: "Cricket", icon: Trophy },
  { name: "Coding", icon: Code2 },
  { name: "Movies", icon: Film },
  { name: "Gaming", icon: Gamepad2 },
];

export function Hobbies() {
  return (
    <SectionWrapper id="hobbies" className="py-32">
      <AnimatedText
        text="Hobbies"
        el="h2"
        className="text-3xl md:text-4xl font-bold text-center mb-16 text-purple-400"
      />

      <div className="flex flex-wrap justify-center gap-6 px-2 md:px-6">
        {hobbies.map((hobby, index) => {
          const Icon = hobby.icon;

          return (
            <motion.div
              key={hobby.name}
              className="group flex min-w-[150px] items-center gap-3 rounded-xl border border-purple-500/20 bg-white/5 px-6 py-3 backdrop-blur-lg"
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 2 + index * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              whileHover={{
                scale: 1.08,
                boxShadow: "0 0 20px rgba(168,85,247,0.5)",
              }}
            >
              <Icon size={18} className="text-purple-300 group-hover:text-purple-200" />
              <span className="text-sm font-medium tracking-wide text-gray-100">{hobby.name}</span>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
