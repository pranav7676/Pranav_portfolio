"use client";

import React from "react";
import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface AnimatedTextProps {
  text: string;
  className?: string;
  highlightWords?: string[];
  el?: keyof React.JSX.IntrinsicElements;
  asGradient?: boolean;
}

export function AnimatedText({
  text,
  className,
  highlightWords = [],
  el: Wrapper = "p",
  asGradient = false,
}: AnimatedTextProps) {
  const words = text.split(" ");

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 },
    },
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  const Tag = Wrapper as any;

  return (
    <Tag className={className}>
      <motion.span
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        className="flex flex-wrap gap-x-[0.25em]"
      >
        {words.map((word, index) => {
          const isHighlighted = highlightWords.includes(word.replace(/[^a-zA-Z0-9]/g, ""));
          return (
            <motion.span variants={child} key={index} className="inline-block">
              <span
                className={cn(
                  isHighlighted
                    ? "text-[--color-primary-accent] drop-shadow-[0_0_8px_rgba(250,237,38,0.4)]"
                    : asGradient
                    ? "text-gradient"
                    : ""
                )}
              >
                {word}
              </span>
            </motion.span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
