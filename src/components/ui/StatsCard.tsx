"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface Props {
  value: number;
  suffix?: string;
  label: string;
}

export default function StatsCard({ value, suffix = "+", label }: Props) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1200;
    const increment = value / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        // use toFixed if value is a decimal like 9.35, else use Math.floor
        setCount(Number.isInteger(value) ? Math.floor(start) : Number(start.toFixed(2)));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      className="bg-white/5 backdrop-blur-xl border border-[--color-secondary-neutral]/30 rounded-2xl p-6 text-center hover:scale-105 hover:border-[--color-primary-accent]/50 transition-all duration-300"
    >
      <div className="text-4xl font-bold text-white">
        {count}
        {suffix}
      </div>
      <div className="text-sm font-mono tracking-widest text-[--color-soft-neutral] mt-2 uppercase">{label}</div>
    </motion.div>
  );
}
