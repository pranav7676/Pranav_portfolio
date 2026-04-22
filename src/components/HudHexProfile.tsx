"use client";

import { useEffect, useRef } from "react";

export default function HudHexProfile() {
  const ref = useRef<HTMLDivElement>(null);

  // subtle 3D tilt based on mouse
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;

      el.style.transform = `
        perspective(900px)
        rotateY(${x * 12}deg)
        rotateX(${-y * 12}deg)
        translateZ(0)
      `;
    };

    const onLeave = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="relative w-[340px] h-[380px] flex items-center justify-center">

      {/* 🔥 OUTER GLOW */}
      <div className="absolute hex-hud w-full h-full blur-3xl bg-purple-500/40 opacity-60 animate-pulse" />

      {/* 🔥 ROTATING RING */}
      <div className="absolute w-[360px] h-[400px] border border-purple-500/20 rounded-full animate-spin-slow" />

      {/* 🔥 MAIN HUD CONTAINER */}
      <div
        ref={ref}
        className="hex-hud relative z-10 overflow-hidden bg-[rgba(10,0,30,0.6)] backdrop-blur-md border border-purple-500/40 animate-[float_4s_ease-in-out_infinite]"
      >

        {/* IMAGE */}
        <img
          src="/M_Pranav-removebg-preview.png"
          alt="M Pranav"
          className="w-full h-full object-contain scale-110"
        />

        {/* 🔥 SCANLINES */}
        <div className="absolute inset-0 pointer-events-none scanlines" />

        {/* 🔥 SCANNER */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="scanner" />
        </div>

        {/* 🔥 CORNER HUD LINES */}
        <div className="hud-corners" />

      </div>

      {/* 🔥 DATA TEXT */}
      <div className="absolute bottom-[-40px] text-xs text-purple-300 font-mono tracking-widest opacity-70">
        SUBJECT // PRANAV // STATUS: ACTIVE
      </div>

    </div>
  );
}
