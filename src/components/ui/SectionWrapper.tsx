"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionWrapperProps extends React.HTMLAttributes<HTMLElement> {
  id: string;
  children: React.ReactNode;
}

export function SectionWrapper({ id, children, className, ...props }: SectionWrapperProps) {
  return (
    <section id={id} className={cn("relative py-24 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto", className)} {...props}>
      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </section>
  );
}
