"use client";

import { HTMLMotionProps, motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedButtonProps extends HTMLMotionProps<"button"> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export function AnimatedButton({ variant = "primary", children, className, ...props }: AnimatedButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "relative px-6 py-3 rounded-xl font-medium tracking-wide transition-all duration-300",
        isPrimary
          ? "bg-[--color-primary-accent] text-[--color-primary-bg] hover:shadow-[0_0_20px_rgba(250,237,38,0.4)]"
          : "bg-transparent border border-[--color-secondary-neutral] text-[--color-soft-neutral] hover:border-[--color-primary-accent] hover:text-[--color-primary-accent] hover:shadow-[0_0_15px_rgba(250,237,38,0.2)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.button>
  );
}
