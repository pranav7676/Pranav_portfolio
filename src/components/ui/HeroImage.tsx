"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const IMAGE_SRC = "/M_Pranav-removebg-preview.png";

const silhouetteMask: CSSProperties = {
  WebkitMaskImage: `url(${IMAGE_SRC})`,
  maskImage: `url(${IMAGE_SRC})`,
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

export function HeroImage() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="relative flex h-[260px] w-[260px] items-center justify-center md:h-[340px] md:w-[340px]"
      style={{ perspective: "1200px" }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={silhouetteMask}
        animate={
          reduceMotion
            ? { opacity: 0.45 }
            : { opacity: [0.4, 0.62, 0.4], scale: [0.96, 1, 0.96] }
        }
        transition={{ repeat: Infinity, duration: 3.6, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex h-full w-full items-center justify-center"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          reduceMotion
            ? { y: 0 }
            : { y: [0, -10, 0], rotateZ: [-0.5, 0.6, -0.5] }
        }
        whileHover={
          reduceMotion ? undefined : { rotateX: 4, rotateY: -5, scale: 1.02 }
        }
        transition={
          reduceMotion
            ? { duration: 0.2 }
            : {
                y: { duration: 4.2, ease: "easeInOut", repeat: Infinity },
                rotateZ: { duration: 4.2, ease: "easeInOut", repeat: Infinity },
                rotateX: { duration: 0.25, ease: "easeOut" },
                rotateY: { duration: 0.25, ease: "easeOut" },
                scale: { duration: 0.25, ease: "easeOut" },
              }
        }
      >
        <Image
          src={IMAGE_SRC}
          alt="M Pranav"
          width={340}
          height={340}
          priority
          className="relative h-full w-full object-contain"
          style={{
            filter:
              "drop-shadow(0 0 22px rgba(168,85,247,0.55)) drop-shadow(0 0 48px rgba(168,85,247,0.38))",
          }}
        />
      </motion.div>

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-20"
          style={silhouetteMask}
          animate={{ opacity: [0.1, 0.24, 0.1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(196,181,253,0.18)_0px,rgba(196,181,253,0.18)_1px,transparent_1px,transparent_4px)]" />
        </motion.div>
      )}

      {!reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-30"
          style={silhouetteMask}
        >
          <motion.div
            initial={{ y: "-12%", opacity: 0 }}
            animate={{ y: ["-12%", "112%"], opacity: [0, 1, 0] }}
            transition={{ duration: 2.2, ease: "linear", repeat: Infinity }}
            className="absolute left-0 top-0 h-[2px] w-full bg-purple-300 shadow-[0_0_20px_rgba(168,85,247,0.9)] blur-[0.6px]"
          />
        </motion.div>
      )}

      <motion.div
        className="pointer-events-none absolute inset-0"
        style={silhouetteMask}
        animate={{ opacity: [0.18, 0.34, 0.18] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "easeInOut" }}
      >
        <div className="absolute inset-0 bg-purple-500/18 blur-2xl" />
      </motion.div>
    </div>
  );
}
