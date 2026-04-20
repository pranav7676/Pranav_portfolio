"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
}

export function GlassCard({ children, className, hoverEffect = true, ...props }: GlassCardProps) {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -5, scale: 1.02 } : {}}
      className={cn(
        "relative backdrop-blur-md bg-white/[0.04] border border-[--color-secondary-neutral] rounded-2xl p-6 transition-colors duration-300",
        hoverEffect && "hover:border-[--color-primary-accent] hover:shadow-[0_0_25px_rgba(250,237,38,0.15)] glow-on-hover",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}
