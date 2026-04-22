"use client";

import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import TransitionOverlay from "./TransitionOverlay";

interface FilmParticle {
  id: number;
  left: string;
  top: string;
  size: number;
  drift: number;
  delay: number;
  duration: number;
}

const TECH_LINES = [
  "[BOOT] CORE SYSTEMS ONLINE",
  "[AUTH] IDENTITY SIGNATURE VERIFIED",
  "[AI] MODEL CONTEXT INITIALIZED",
  "[STACK] NEXT.JS / TYPESCRIPT / SYSTEM DESIGN",
  "[STATUS] PROFILE CHANNEL ACTIVE",
];

const COMMAND_LINE = '> run-profile --subject "M PRANAV" --mode archive';

function createFilmParticles(count: number): FilmParticle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${(i * 19 + (i % 7) * 11) % 100}%`,
    top: `${(i * 43 + (i % 5) * 13) % 100}%`,
    size: 1 + (i % 3),
    drift: -20 - (i % 4) * 6,
    delay: i * 0.12,
    duration: 2.4 + (i % 4) * 0.4,
  }));
}

export function CinematicIntro() {
  const [visible, setVisible] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const [phase, setPhase] = useState(0);
  const [visibleLineCount, setVisibleLineCount] = useState(0);
  const [typedCommand, setTypedCommand] = useState("");
  const particles = useMemo(() => createFilmParticles(26), []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      audioRef.current = new Audio("/intro.mp3");
      audioRef.current.loop = true;
      audioRef.current.volume = 0.6;

      // Attempt autoplay
      const playAudio = async () => {
        try {
          if (audioRef.current) {
            await audioRef.current.play();
          }
        } catch (err) {
          console.warn("Autoplay blocked. Audio will start on first user interaction.", err);
        }
      };
      
      playAudio();

      // Fallback: start playing on first interaction if autoplay failed
      const onInteraction = () => {
        if (audioRef.current && audioRef.current.paused) {
          console.log("User interacted. Starting audio playback...");
          audioRef.current.play().then(() => {
            console.log("Audio playing successfully.");
          }).catch((err) => {
            console.error("Audio playback failed even after interaction:", err);
          });
        }
        // Cleanup all listeners
        window.removeEventListener("mousemove", onInteraction);
        window.removeEventListener("mousedown", onInteraction);
        window.removeEventListener("touchstart", onInteraction);
        window.removeEventListener("keydown", onInteraction);
      };
      
      window.addEventListener("mousemove", onInteraction, { once: true });
      window.addEventListener("mousedown", onInteraction, { once: true });
      window.addEventListener("touchstart", onInteraction, { once: true });
      window.addEventListener("keydown", onInteraction, { once: true });

      return () => {
        window.removeEventListener("mousemove", onInteraction);
        window.removeEventListener("mousedown", onInteraction);
        window.removeEventListener("touchstart", onInteraction);
        window.removeEventListener("keydown", onInteraction);
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };
    }
  }, []);

  const closeIntro = useCallback(() => {
    setVisible(false);
    setShowOverlay(true);
    
    setTimeout(() => setShowOverlay(false), 1200);

    // Fade out audio gracefully during the 1.2s transition
    if (audioRef.current) {
      let volume = audioRef.current.volume;
      const fade = setInterval(() => {
        if (volume > 0.05) {
          volume -= 0.05;
          if (audioRef.current) audioRef.current.volume = volume;
        } else {
          if (audioRef.current) audioRef.current.pause();
          clearInterval(fade);
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;

    const timers: number[] = [];
    timers.push(window.setTimeout(() => setPhase(1), 350));
    timers.push(window.setTimeout(() => setPhase(2), 1300));
    timers.push(window.setTimeout(() => setPhase(3), 2200));
    timers.push(window.setTimeout(() => setPhase(4), 3200));

    const closeOnScroll = () => closeIntro();
    window.addEventListener("scroll", closeOnScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [visible, closeIntro]);

  useEffect(() => {
    if (!visible || phase !== 2) return;

    let line = 0;

    const lineInterval = window.setInterval(() => {
      line += 1;
      setVisibleLineCount(Math.min(line, TECH_LINES.length));

      if (line >= TECH_LINES.length) {
        window.clearInterval(lineInterval);
      }
    }, 260);

    return () => window.clearInterval(lineInterval);
  }, [phase, visible]);

  useEffect(() => {
    if (!visible || phase !== 3) return;

    let index = 0;

    const typeInterval = window.setInterval(() => {
      index += 1;
      setTypedCommand(COMMAND_LINE.slice(0, index));

      if (index >= COMMAND_LINE.length) {
        window.clearInterval(typeInterval);
      }
    }, 22);

    return () => window.clearInterval(typeInterval);
  }, [phase, visible]);

  // closeIntro is defined above

  return (
    <>
    <AnimatePresence>
      {visible && (
        <motion.div
          onClick={closeIntro}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: "brightness(1.2) blur(3px)" }}
          transition={{ duration: 1.05, ease: "easeInOut" }}
          className="fixed inset-0 z-[320] overflow-hidden bg-black"
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " " ||
              event.key === "Escape"
            ) {
              closeIntro();
            }
          }}
          aria-label="Close intro and enter portfolio"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: phase >= 1 ? 1 : 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 46% 40%, rgba(90, 52, 122, 0.48) 0%, rgba(43, 27, 51, 0.8) 34%, rgba(20, 15, 18, 0.94) 62%, rgba(0, 0, 0, 1) 100%)",
            }}
          />

          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.07 }}
            animate={{ scale: 1 }}
            transition={{ duration: 6.2, ease: "easeOut" }}
          >
            <div
              className="absolute inset-0 opacity-[0.28]"
              style={{
                background:
                  "linear-gradient(8deg, rgba(158,112,77,0.22), rgba(68,49,44,0.16)), repeating-linear-gradient(0deg, rgba(245,217,176,0.04) 0px, rgba(245,217,176,0.04) 1px, transparent 1px, transparent 3px), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 4px)",
              }}
            />

            <motion.div
              className="absolute -inset-[12%] mix-blend-soft-light"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.76' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.95'/%3E%3C/svg%3E\")",
              }}
              animate={{
                opacity: phase >= 1 ? [0.08, 0.16, 0.11, 0.19, 0.1] : 0,
                x: [0, -2, 1, 0],
                y: [0, 1, -1, 0],
              }}
              transition={{ repeat: Infinity, duration: 0.32, ease: "linear" }}
            />

            <motion.div
              className="absolute inset-0"
              style={{
                background:
                  "repeating-linear-gradient(90deg, transparent 0px, transparent 46px, rgba(236,220,191,0.06) 47px, transparent 48px)",
              }}
              animate={{ opacity: phase >= 1 ? [0.07, 0.11, 0.08] : 0 }}
              transition={{ repeat: Infinity, duration: 0.55, ease: "linear" }}
            />

            <div className="pointer-events-none absolute left-[7%] top-[14%] hidden max-w-[38vw] rounded-sm border border-[#ddc4a2]/20 bg-[#2b221d]/35 px-4 py-3 text-[10px] uppercase tracking-[0.24em] text-[#dbc2a4]/60 md:block">
              ARCHIVE NOTES // SYSTEM MAP // INTELLIGENT INTERFACES
            </div>

            <div className="pointer-events-none absolute right-[8%] top-[18%] hidden text-[11px] leading-relaxed text-[#d7c5ac]/45 md:block">
              <p>pipeline.ts // scheduler.ts // telemetry.ts</p>
              <p className="blur-[0.35px]">if (signal &gt; threshold) route.execute();</p>
              <p className="blur-[0.35px]">model.input -&gt; inference -&gt; response</p>
            </div>

            <div className="pointer-events-none absolute bottom-[18%] right-[10%] hidden h-24 w-28 rounded-full border border-[#ceb798]/30 md:block" />
            <div className="pointer-events-none absolute bottom-[25%] right-[17%] hidden h-[1px] w-16 bg-[#ceb798]/30 md:block" />
            <div className="pointer-events-none absolute bottom-[14%] right-[23%] hidden h-[1px] w-20 bg-[#ceb798]/24 md:block" />
          </motion.div>

          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="pointer-events-none absolute rounded-full bg-[#f2debf]/35"
              style={{
                left: particle.left,
                top: particle.top,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
              animate={{ y: [0, particle.drift], opacity: [0, 1, 0] }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeOut",
              }}
            />
          ))}

          <motion.div
            className="pointer-events-none absolute -inset-y-10 left-[-45%] w-[60%]"
            style={{
              background:
                "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,163,89,0.28) 40%, rgba(186,112,255,0.3) 68%, rgba(0,0,0,0) 100%)",
              filter: "blur(30px)",
            }}
            animate={
              phase >= 2
                ? { x: ["0%", "255%"], opacity: [0, 0.62, 0] }
                : { x: "0%", opacity: 0 }
            }
            transition={{ duration: 1.9, ease: "easeInOut" }}
          />

          <motion.div
            className="absolute inset-0"
            animate={
              phase >= 1
                ? { x: [0, 0.8, -0.8, 0], y: [0, -0.5, 0.6, 0], rotate: [0, 0.05, -0.05, 0] }
                : { x: 0, y: 0, rotate: 0 }
            }
            transition={{ repeat: Infinity, duration: 0.46, ease: "linear" }}
          >
            <div className="absolute inset-0 flex items-center justify-start px-[7vw]">
              <div className="mt-10 flex w-full max-w-5xl items-end gap-8 md:gap-12">
                <motion.figure
                  initial={{ opacity: 0, filter: "brightness(0.35)", scale: 0.92 }}
                  animate={
                    phase >= 1
                      ? { opacity: 1, filter: "brightness(0.93)", scale: 1 }
                      : { opacity: 0, filter: "brightness(0.35)", scale: 0.92 }
                  }
                  transition={{ duration: 0.95, ease: "easeOut" }}
                  className="relative w-[130px] shrink-0 md:w-[170px]"
                >
                  <div className="absolute -inset-2 -rotate-[1.8deg] border border-[#d8c09d]/45 bg-[#2f241f]/48" />
                  <div className="relative rotate-[-1deg] overflow-hidden border border-[#e6cfad]/40 bg-[#2a201a]/55 p-2 shadow-[0_0_30px_rgba(20,14,11,0.6)]">
                    <Image
                      src="/M_Pranav-removebg-preview.png"
                      alt="Subject M. Pranav"
                      width={170}
                      height={220}
                      className="h-auto w-full sepia-[0.5] saturate-[0.6] contrast-[1.04] brightness-[0.9]"
                      priority
                    />

                    {phase >= 2 && (
                      <motion.div
                        initial={{ y: -44, opacity: 0 }}
                        animate={{ y: 220, opacity: [0, 1, 0] }}
                        transition={{ duration: 1.05, ease: "easeInOut" }}
                        className="pointer-events-none absolute left-0 top-0 h-[2px] w-full bg-purple-300 shadow-[0_0_18px_rgba(168,85,247,0.85)]"
                      />
                    )}
                  </div>
                  <figcaption className="mt-2 text-[10px] uppercase tracking-[0.18em] text-[#d6c3a8]/65">
                    Subject: M. Pranav // Developer
                  </figcaption>
                </motion.figure>

                <div className="max-w-[44rem] pb-2">
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={phase >= 2 ? { opacity: 0.58 } : { opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mb-3 text-[10px] uppercase tracking-[0.34em] text-[#e3ccaa]/65"
                  >
                    REC // ARCHIVE 2026
                  </motion.p>

                  <div className="relative inline-block overflow-hidden">
                    <motion.h1
                      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                      animate={
                        phase >= 3
                          ? { clipPath: "inset(0 0% 0 0)", opacity: 1 }
                          : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
                      }
                      transition={{ duration: 1.25, ease: "easeInOut" }}
                      className="font-serif text-4xl font-semibold tracking-[0.24em] text-[#f4e5cf] md:text-7xl"
                      style={{
                        textShadow:
                          "0 0 18px rgba(187,142,255,0.45), 0 0 45px rgba(222,176,102,0.28)",
                      }}
                    >
                      M PRANAV
                    </motion.h1>

                    <motion.h1
                      initial={{ clipPath: "inset(0 100% 0 0)", opacity: 0 }}
                      animate={
                        phase >= 3
                          ? { clipPath: "inset(0 0% 0 0)", opacity: 0.22 }
                          : { clipPath: "inset(0 100% 0 0)", opacity: 0 }
                      }
                      transition={{ duration: 1.25, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-0 font-serif text-4xl font-semibold tracking-[0.24em] text-[#f4e5cf] blur-[0.7px] md:text-7xl"
                      aria-hidden="true"
                    >
                      M PRANAV
                    </motion.h1>

                    <motion.div
                      initial={{ x: "-160%", opacity: 0 }}
                      animate={
                        phase >= 3
                          ? { x: "170%", opacity: [0, 0.86, 0] }
                          : { x: "-160%", opacity: 0 }
                      }
                      transition={{ duration: 1.7, ease: "easeInOut" }}
                      className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-purple-200/65 to-transparent blur-xl"
                    />
                  </div>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={phase >= 4 ? { opacity: 0.82 } : { opacity: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mt-4 font-serif text-sm tracking-[0.2em] text-[#d9c2ff] md:text-base"
                  >
                    FULL STACK DEVELOPER
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={phase >= 4 ? { opacity: 0.7 } : { opacity: 0 }}
                    transition={{ duration: 0.75, delay: 0.1 }}
                    className="mt-3 max-w-2xl font-serif text-xs tracking-[0.05em] text-[#d9c9b1]/82 md:text-sm"
                  >
                    Developing scalable systems, AI-driven applications, and intelligent interfaces
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={phase >= 4 ? { opacity: 0.45 } : { opacity: 0 }}
                    transition={{ duration: 0.75, delay: 0.2 }}
                    className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[#d8c3a2]/65"
                  >
                    Research Log // Software Systems // 2026
                  </motion.p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={phase >= 2 ? { opacity: 0.82, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="absolute left-[6%] top-[8%] hidden w-[22rem] rounded-sm border border-[#d4b694]/25 bg-[#1b1614]/45 p-3 font-mono text-[10px] uppercase tracking-[0.12em] text-[#dbc3a4]/78 md:block"
          >
            <p className="mb-2 text-[#ead3b2]/85">SYSTEM BOOT LOG</p>
            <div className="space-y-1.5">
              {TECH_LINES.slice(0, visibleLineCount).map((line, index) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 0.9, x: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.04 }}
                >
                  {line}
                </motion.p>
              ))}
              {visibleLineCount < TECH_LINES.length && (
                <span className="animate-pulse text-[#f0dcc1]/85">_</span>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={phase >= 3 ? { opacity: 0.76, y: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: 0.45 }}
            className="absolute right-[6%] top-[10%] hidden w-[15rem] rounded-sm border border-purple-300/20 bg-[#16141a]/45 p-3 font-mono text-[10px] tracking-[0.12em] text-purple-200/75 md:block"
          >
            <p className="mb-2 uppercase text-purple-200/85">Neural HUD</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>FPS</span>
                <motion.span animate={{ opacity: [0.55, 1, 0.55] }} transition={{ repeat: Infinity, duration: 1.3 }}>60</motion.span>
              </div>
              <div className="flex items-center justify-between">
                <span>Ping</span>
                <span>12ms</span>
              </div>
              <div>
                <p className="mb-1">Signal</p>
                <div className="h-1 w-full overflow-hidden rounded-full bg-purple-200/20">
                  <motion.div
                    className="h-full rounded-full bg-purple-300"
                    animate={{ width: ["34%", "72%", "58%", "68%"] }}
                    transition={{ repeat: Infinity, duration: 2.4, ease: "easeInOut" }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            animate={{ opacity: [0.02, 0.08, 0.03, 0.09, 0.04] }}
            transition={{ repeat: Infinity, duration: 0.23, ease: "linear" }}
            className="pointer-events-none absolute inset-0 bg-[#f6ead7] mix-blend-soft-light"
          />

          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_220px_rgba(0,0,0,0.88)]" />
          <div className="pointer-events-none absolute inset-0 border-[14px] border-[#2b231f]/28" />

                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={phase >= 3 ? { opacity: 0.66 } : { opacity: 0 }}
                    transition={{ duration: 0.45 }}
                    className="mt-3 font-mono text-[10px] tracking-[0.08em] text-purple-200/75"
                  >
                    {typedCommand}
                    <span className="animate-pulse text-purple-100">|</span>
                  </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={phase >= 4 ? { opacity: 0.5 } : { opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.24em] text-[#ceb89b]/65"
          >
            SCROLL TO ENTER
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
    {showOverlay && <TransitionOverlay />}
    </>
  );
}
