"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const roles = [
  "Full Stack Developer",
  "UI/UX Developer",
  "AI Enthusiast",
  "Problem Solver",
  "Open to Work",
];

export default function HeroText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-xl md:text-3xl text-[--color-soft-neutral] font-light mt-4 h-[40px] md:h-[48px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={roles[index]}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute whitespace-nowrap"
        >
          <span className="text-white font-semibold">{roles[index]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
