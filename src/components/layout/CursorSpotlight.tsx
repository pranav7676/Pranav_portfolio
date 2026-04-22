"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function CursorSpotlight() {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(-500);
  const pointerY = useMotionValue(-500);

  const x = useSpring(pointerX, { stiffness: 220, damping: 34, mass: 0.25 });
  const y = useSpring(pointerY, { stiffness: 220, damping: 34, mass: 0.25 });

  useEffect(() => {
    if (reduceMotion) return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return;

    const move = (event: MouseEvent) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [pointerX, pointerY, reduceMotion]);

  if (reduceMotion) return null;

  const background = useMotionTemplate`radial-gradient(circle 200px at ${x}px ${y}px, rgba(168,85,247,0.14), transparent 80%)`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 hidden md:block"
      style={{ background }}
    />
  );
}
