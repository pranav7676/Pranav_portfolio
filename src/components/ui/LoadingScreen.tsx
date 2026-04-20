"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2500);
    
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 10) + 2;
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] bg-[--color-primary-bg] flex flex-col items-center justify-center pointer-events-none"
        >
          <div className="relative">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-white font-bold text-6xl tracking-tighter mb-4"
            >
              PRANAV<span className="text-[--color-primary-accent]">.</span>
            </motion.div>
            
            <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden mt-4">
              <motion.div 
                className="h-full bg-[--color-primary-accent]"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(count, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            
            <motion.div 
              className="absolute -right-12 bottom-0 text-[--color-primary-accent] font-mono text-sm"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              {Math.min(count, 100)}%
            </motion.div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-[--color-soft-neutral] font-mono text-xs mt-12 tracking-[0.2em] uppercase"
          >
            Initializing Digital Experience
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
