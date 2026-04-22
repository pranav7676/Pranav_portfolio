"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GameTransition from "./GameTransition";

export default function SystemIntro() {
  const [enter, setEnter] = useState(false);

  return (
    <AnimatePresence>
      {!enter && (
        <motion.div
          className="fixed inset-0 z-[500] bg-black flex flex-col items-center justify-center text-white"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >

          {/* TITLE */}
          <motion.h1
            className="text-5xl font-bold tracking-widest mb-10"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            M PRANAV
          </motion.h1>

          {/* 🔥 BUTTON */}
          <motion.button
            onClick={() => setEnter(true)}
            className="relative px-8 py-3 border border-purple-500 text-purple-300 rounded-md overflow-hidden group cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10 font-mono tracking-widest text-sm font-semibold">ENTER SYSTEM</span>

            {/* glow */}
            <div className="absolute inset-0 bg-purple-500 opacity-20 blur-xl group-hover:opacity-40 transition-opacity duration-300" />
          </motion.button>

          {/* SCANLINES */}
          <div className="absolute inset-0 pointer-events-none scanlines" />

        </motion.div>
      )}

      {/* 🔥 TRANSITION OVERLAY */}
      {enter && <GameTransition />}
    </AnimatePresence>
  );
}
