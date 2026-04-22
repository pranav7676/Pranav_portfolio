"use client";

import { motion } from "framer-motion";

export default function TransitionOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[600] bg-black pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
    >

      {/* LIGHT SWEEP */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{ duration: 1 }}
      />

      {/* ZOOM EFFECT */}
      <motion.div
        className="absolute inset-0 bg-black"
        initial={{ scale: 1 }}
        animate={{ scale: 1.2 }}
        transition={{ duration: 1 }}
      />

      {/* GLITCH */}
      <motion.div
        className="absolute inset-0 mix-blend-screen opacity-20"
        animate={{ x: [0, -2, 2, 0] }}
        transition={{ duration: 0.2, repeat: 3 }}
        style={{
          background:
            "linear-gradient(90deg, rgba(255,0,0,0.2), rgba(0,255,255,0.2))",
        }}
      />

    </motion.div>
  );
}
