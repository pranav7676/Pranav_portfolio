"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

interface Dot {
  x: number;
  y: number;
  dx: number;
  dy: number;
  z: number;
}

function createDots(width: number, height: number, count: number): Dot[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    dx: (Math.random() - 0.5) * 0.26,
    dy: (Math.random() - 0.5) * 0.26,
    z: Math.random(),
  }));
}

function getDotCount(width: number): number {
  if (width < 640) return 32;
  if (width < 1024) return 52;
  return 78;
}

export function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const pointer = { x: 0, y: 0 };
    let dots: Dot[] = [];

    const setupCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      dots = createDots(width, height, getDotCount(width));
    };

    const drawConnections = () => {
      const connectionDistance = 110;

      for (let i = 0; i < dots.length; i += 1) {
        for (let j = i + 1; j < dots.length; j += 1) {
          const a = dots[i];
          const b = dots[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance > connectionDistance) continue;

          const depth = (a.z + b.z) / 2;
          const alpha = (1 - distance / connectionDistance) * (0.08 + depth * 0.12);
          ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
          ctx.lineWidth = 0.4 + depth * 0.6;
          ctx.beginPath();
          ctx.moveTo(a.x + pointer.x * a.z * 0.45, a.y + pointer.y * a.z * 0.45);
          ctx.lineTo(b.x + pointer.x * b.z * 0.45, b.y + pointer.y * b.z * 0.45);
          ctx.stroke();
        }
      }
    };

    const animate = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        dot.x += dot.dx;
        dot.y += dot.dy;

        if (dot.x <= -20 || dot.x >= width + 20) dot.dx *= -1;
        if (dot.y <= -20 || dot.y >= height + 20) dot.dy *= -1;
      });

      drawConnections();

      dots.forEach((dot) => {
        const px = dot.x + pointer.x * dot.z * 0.45;
        const py = dot.y + pointer.y * dot.z * 0.45;
        const radius = 0.8 + dot.z * 1.4;
        const alpha = 0.18 + dot.z * 0.45;

        ctx.fillStyle = `rgba(168, 85, 247, ${alpha})`;
        ctx.beginPath();
        ctx.arc(px, py, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrame = window.requestAnimationFrame(animate);
    };

    const drawStatic = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      ctx.clearRect(0, 0, width, height);

      dots.forEach((dot) => {
        ctx.fillStyle = `rgba(168, 85, 247, ${0.12 + dot.z * 0.2})`;
        ctx.fillRect(dot.x, dot.y, 1.4, 1.4);
      });
    };

    const handlePointerMove = (event: MouseEvent) => {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      pointer.x = nx * 18;
      pointer.y = ny * 18;
    };

    const handleResize = () => {
      setupCanvas();
      if (reduceMotion) drawStatic();
    };

    setupCanvas();

    if (reduceMotion) {
      drawStatic();
    } else {
      animationFrame = window.requestAnimationFrame(animate);
      window.addEventListener("mousemove", handlePointerMove, { passive: true });
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handlePointerMove);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [reduceMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-35" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.2)_0%,rgba(0,0,0,0)_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.15),rgba(0,0,0,0.32))]" />
    </div>
  );
}
