"use client";

import { useEffect, useRef } from "react";

interface ParticleCanvasProps {
  particleCount?: number;
  color?: string;
  speed?: number;
  size?: number;
  interaction?: "mouse" | "none";
  variant?: "stars" | "dust" | "embers";
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

export function ParticleCanvas({
  particleCount = 60,
  color = "rgba(44,44,44,0.08)",
  speed = 0.2,
  size = 1.5,
  interaction = "mouse",
  variant = "dust",
}: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const w = canvas.offsetWidth;
    const h = canvas.offsetHeight;
    particlesRef.current = Array.from({ length: particleCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * speed,
      vy: variant === "embers" ? -Math.random() * speed - 0.1 : (Math.random() - 0.5) * speed,
      size: Math.max(0.5, Math.random() * size),
      opacity: Math.random() * 0.5 + 0.1,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
    }));

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    if (interaction === "mouse") {
      canvas.addEventListener("mousemove", handleMouse);
    }

    let time = 0;
    const animate = () => {
      const cw = canvas.offsetWidth;
      const ch = canvas.offsetHeight;
      ctx.clearRect(0, 0, cw, ch);
      time += 1;

      for (const p of particlesRef.current) {
        p.twinklePhase += p.twinkleSpeed;
        const twinkle = variant === "dust"
          ? 0.3 + 0.7 * Math.abs(Math.sin(p.twinklePhase))
          : p.opacity;

        if (interaction === "mouse") {
          const dx = p.x - mouseRef.current.x;
          const dy = p.y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const force = (100 - dist) / 100;
            p.vx += (dx / dist) * force * 0.3;
            p.vy += (dy / dist) * force * 0.3;
          }
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        p.vx += (Math.random() - 0.5) * speed * 0.1;
        if (variant === "embers") {
          p.vy -= 0.005;
        } else {
          p.vy += (Math.random() - 0.5) * speed * 0.1;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = cw;
        if (p.x > cw) p.x = 0;
        if (p.y < 0) p.y = ch;
        if (p.y > ch) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.globalAlpha = twinkle;
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      rafRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouse);
    };
  }, [particleCount, color, speed, size, interaction, variant]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
