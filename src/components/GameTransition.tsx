"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function GameTransition() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1500); // Remove from DOM after animation
    return () => clearTimeout(t);
  }, []);

  if (!show) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[400] bg-black flex items-center justify-center pointer-events-none"
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 8, opacity: 0 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {/* 🔥 ENERGY CORE */}
      <motion.div
        className="w-20 h-20 rounded-full bg-purple-500 blur-2xl"
        initial={{ scale: 0 }}
        animate={{ scale: 10 }}
        transition={{ duration: 1 }}
      />

      {/* RGB GLITCH */}
      <div className="absolute inset-0 mix-blend-screen opacity-20 glitch" />
    </motion.div>
  );
}
