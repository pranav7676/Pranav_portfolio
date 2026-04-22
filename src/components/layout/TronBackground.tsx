"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface TronLine {
  x: number;
  y: number;
  speed: number;
  length: number;
  alpha: number;
}

function getLineCount(width: number): number {
  if (width < 640) return 30;
  if (width < 1024) return 46;
  return 64;
}

function createLines(width: number, height: number): TronLine[] {
  const count = getLineCount(width);

  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * (height + 200) - 200,
    speed: 0.55 + Math.random() * 0.8,
    length: 90 + Math.random() * 180,
    alpha: 0.2 + Math.random() * 0.35,
  }));
}

export function TronBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    let lines: TronLine[] = [];

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      lines = createLines(width, height);
    };

    const drawFrame = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.fillStyle = "rgba(2, 0, 10, 0.2)";
      ctx.fillRect(0, 0, width, height);

      lines.forEach((line) => {
        const yStart = line.y - line.length;
        const gradient = ctx.createLinearGradient(line.x, yStart, line.x, line.y);

        gradient.addColorStop(0, "rgba(139, 92, 246, 0)");
        gradient.addColorStop(0.55, `rgba(139, 92, 246, ${line.alpha * 0.36})`);
        gradient.addColorStop(1, `rgba(196, 181, 253, ${line.alpha})`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, yStart);
        ctx.lineTo(line.x, line.y);
        ctx.stroke();

        ctx.fillStyle = `rgba(196, 181, 253, ${line.alpha})`;
        ctx.fillRect(line.x - 1, line.y - 1, 2, 2);

        line.y += line.speed;

        if (line.y - line.length > height + 50) {
          line.y = -20;
          line.x = Math.random() * width;
          line.length = 80 + Math.random() * 220;
          line.speed = 0.55 + Math.random() * 0.8;
          line.alpha = 0.2 + Math.random() * 0.35;
        }
      });

      animationFrame = window.requestAnimationFrame(drawFrame);
    };

    const drawStaticFrame = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      lines.forEach((line) => {
        const yStart = line.y - line.length;
        ctx.strokeStyle = `rgba(139, 92, 246, ${line.alpha * 0.4})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(line.x, yStart);
        ctx.lineTo(line.x, line.y);
        ctx.stroke();
      });
    };

    const handleResize = () => {
      setupCanvas();
      if (reduceMotion) {
        drawStaticFrame();
      }
    };

    setupCanvas();

    if (reduceMotion) {
      drawStaticFrame();
    } else {
      animationFrame = window.requestAnimationFrame(drawFrame);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-45" />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.22)_0%,rgba(0,0,0,0)_43%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-35" />

      <div className="absolute left-[-15%] top-[46%] h-[85vh] w-[130%] [transform:perspective(900px)_rotateX(74deg)] bg-[linear-gradient(rgba(168,85,247,0.16)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:48px_48px] opacity-24" />

      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.3),rgba(0,0,0,0.58))]" />
    </div>
  );
}
