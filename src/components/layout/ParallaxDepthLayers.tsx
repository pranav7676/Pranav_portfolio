"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface ParallaxDepthLayersProps {
  className?: string;
}

export function ParallaxDepthLayers({ className }: ParallaxDepthLayersProps) {
  const reduceMotion = useReducedMotion();

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  useEffect(() => {
    if (reduceMotion) return;

    const updateFromPoint = (x: number, y: number) => {
      pointerX.set(x / window.innerWidth - 0.5);
      pointerY.set(y / window.innerHeight - 0.5);
    };

    const handleMouseMove = (event: MouseEvent) => {
      updateFromPoint(event.clientX, event.clientY);
    };

    const handleTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (!touch) return;
      updateFromPoint(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [pointerX, pointerY, reduceMotion]);

  const farX = useSpring(useTransform(pointerX, (v) => v * 18), {
    stiffness: 26,
    damping: 22,
    mass: 0.8,
  });
  const farY = useSpring(useTransform(pointerY, (v) => v * 14), {
    stiffness: 26,
    damping: 22,
    mass: 0.8,
  });

  const midX = useSpring(useTransform(pointerX, (v) => v * -32), {
    stiffness: 36,
    damping: 20,
    mass: 0.65,
  });
  const midY = useSpring(useTransform(pointerY, (v) => v * -26), {
    stiffness: 36,
    damping: 20,
    mass: 0.65,
  });

  const nearX = useSpring(useTransform(pointerX, (v) => v * 48), {
    stiffness: 42,
    damping: 18,
    mass: 0.55,
  });
  const nearY = useSpring(useTransform(pointerY, (v) => v * 36), {
    stiffness: 42,
    damping: 18,
    mass: 0.55,
  });

  const staticLayer = "absolute rounded-full will-change-transform";

  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#18131d] to-black" />

      <motion.div
        className={`${staticLayer} -top-28 -left-28 h-[24rem] w-[24rem] bg-[--color-primary-accent]/14 blur-[110px]`}
        style={reduceMotion ? undefined : { x: farX, y: farY }}
      />

      <motion.div
        className={`${staticLayer} top-[20%] right-[-14%] h-[22rem] w-[22rem] bg-[--color-warm-accent]/18 blur-[120px]`}
        style={reduceMotion ? undefined : { x: midX, y: midY }}
      />

      <motion.div
        className={`${staticLayer} bottom-[-14%] left-[25%] h-[20rem] w-[20rem] bg-white/10 blur-[95px]`}
        style={reduceMotion ? undefined : { x: nearX, y: nearY }}
      />

      <motion.div
        className="absolute inset-0 opacity-25"
        style={reduceMotion ? undefined : { x: farX, y: farY }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_25%),radial-gradient(circle_at_80%_30%,rgba(255,255,255,0.12),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(255,255,255,0.1),transparent_25%)]" />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_55%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:5rem_5rem] opacity-30" />
    </div>
  );
}
