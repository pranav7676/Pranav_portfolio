"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxWrapperProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export function ParallaxWrapper({
  children,
  className,
  intensity = 16,
}: ParallaxWrapperProps) {
  const reduceMotion = useReducedMotion();

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { stiffness: 120, damping: 26, mass: 0.45 });
  const y = useSpring(mouseY, { stiffness: 120, damping: 26, mass: 0.45 });

  useEffect(() => {
    if (reduceMotion) return;

    const handleMove = (event: MouseEvent) => {
      const offsetX = (event.clientX / window.innerWidth - 0.5) * intensity;
      const offsetY = (event.clientY / window.innerHeight - 0.5) * intensity;
      mouseX.set(offsetX);
      mouseY.set(offsetY);
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, [intensity, mouseX, mouseY, reduceMotion]);

  if (reduceMotion) {
    return <div className={cn("transition-transform duration-200", className)}>{children}</div>;
  }

  return (
    <motion.div style={{ x, y }} className={cn("will-change-transform", className)}>
      {children}
    </motion.div>
  );
}
