"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export function CustomCursor() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);

  const x = useSpring(pointerX, { stiffness: 500, damping: 28, mass: 0.5 });
  const y = useSpring(pointerY, { stiffness: 500, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (reduceMotion) return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const syncEnabled = () => setEnabled(media.matches);

    syncEnabled();
    media.addEventListener("change", syncEnabled);

    return () => {
      media.removeEventListener("change", syncEnabled);
    };
  }, [reduceMotion]);

  useEffect(() => {
    if (!enabled) return;

    const updateMousePosition = (e: MouseEvent) => {
      pointerX.set(e.clientX - 12);
      pointerY.set(e.clientY - 12);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("glow-on-hover")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [enabled, pointerX, pointerY]);

  if (reduceMotion || !enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 rounded-full pointer-events-none z-50 flex items-center justify-center mix-blend-screen"
        style={{ x, y }}
        animate={{ scale: isHovering ? 2 : 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
      >
        <div
          className={`w-full h-full rounded-full transition-colors duration-300 ${
            isHovering
              ? "bg-[--color-primary-accent] shadow-[0_0_15px_rgba(250,237,38,0.8)]"
              : "bg-white/40 shadow-[0_0_10px_rgba(255,255,255,0.2)]"
          }`}
        />
      </motion.div>
    </>
  );
}
