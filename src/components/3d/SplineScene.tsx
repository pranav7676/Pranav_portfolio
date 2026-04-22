"use client";

import { cn } from "@/lib/utils";
import { motion, useScroll, useTransform } from "framer-motion";

interface SplineSceneProps {
  sceneUrl: string;
  className?: string;
  interactive?: boolean;
  fadeOnScroll?: boolean;
}

export function SplineScene({ sceneUrl, className, interactive = true, fadeOnScroll = false }: SplineSceneProps) {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  return (
    <motion.div
      style={fadeOnScroll ? { opacity } : {}}
      className={cn(
        "absolute inset-0 w-full h-full z-0 overflow-hidden",
        !interactive && "pointer-events-none",
        className
      )}
    >
      <iframe
        src={sceneUrl}
        frameBorder="0"
        width="100%"
        height="100%"
        className="w-full h-full object-cover"
        title="Spline 3D Scene"
        loading="lazy"
      ></iframe>
      {/* Overlay gradient to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-[--color-primary-bg]/40 via-transparent to-[--color-primary-bg] pointer-events-none" />
    </motion.div>
  );
}
