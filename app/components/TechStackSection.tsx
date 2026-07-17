"use client";

import { useEffect, useRef } from "react";
import RevealOnScroll from "./RevealOnScroll";
import SectionHeading from "./SectionHeading";
import GlassCard from "./GlassCard";

const STACK_CATEGORIES = [
  {
    label: "FRONTEND ARCHITECTURE",
    color: "text-aurora-cyan",
    techs: "React, Next.js, Three.js, WebGL, Tailwind CSS, Framer Motion",
  },
  {
    label: "BACKEND INFRASTRUCTURE",
    color: "text-aurora-violet",
    techs: "Node.js, Python, PostgreSQL, Redis, GraphQL",
  },
  {
    label: "AI & MACHINE LEARNING",
    color: "text-primary",
    techs: "OpenAI Integration, LangChain, TensorFlow, Vector Databases",
  },
  {
    label: "DEVOPS & CLOUD",
    color: "text-tertiary",
    techs: "Docker, Kubernetes, AWS, Vercel, CI/CD Pipelines",
  },
];

// Orbital nodes
const TECH_NODES = [
  // Orbit 1 (inner)
  { name: "React", orbit: 1, angle: 0, color: "#00FFC2" },
  { name: "Next.js", orbit: 1, angle: 72, color: "#00D4FF" },
  { name: "TypeScript", orbit: 1, angle: 144, color: "#00D4FF" },
  { name: "Node.js", orbit: 1, angle: 216, color: "#00FFC2" },
  { name: "Python", orbit: 1, angle: 288, color: "#7A73FF" },
  // Orbit 2 (middle)
  { name: "GraphQL", orbit: 2, angle: 30, color: "#7A73FF" },
  { name: "AWS", orbit: 2, angle: 90, color: "#00FFC2" },
  { name: "Docker", orbit: 2, angle: 150, color: "#a8e8ff" },
  { name: "Redis", orbit: 2, angle: 210, color: "#dedbff" },
  { name: "TensorFlow", orbit: 2, angle: 270, color: "#7A73FF" },
  { name: "PostgreSQL", orbit: 2, angle: 330, color: "#00D4FF" },
  // Orbit 3 (outer)
  { name: "WebGL", orbit: 3, angle: 15, color: "#00D4FF" },
  { name: "LangChain", orbit: 3, angle: 75, color: "#7A73FF" },
  { name: "Kubernetes", orbit: 3, angle: 135, color: "#00FFC2" },
  { name: "Tailwind", orbit: 3, angle: 195, color: "#00D4FF" },
  { name: "OpenAI", orbit: 3, angle: 255, color: "#a8e8ff" },
  { name: "Vercel", orbit: 3, angle: 315, color: "#dedbff" },
];

export default function TechStackSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx!.scale(dpr, dpr);
    }
    resize();
    window.addEventListener("resize", resize);

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      };
    }
    canvas.addEventListener("mousemove", handleMouseMove);

    function draw(time: number) {
      if (!canvas || !ctx) return;
      const w = canvas.getBoundingClientRect().width;
      const h = canvas.getBoundingClientRect().height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2 + (mouseRef.current.x - 0.5) * 20;
      const cy = h / 2 + (mouseRef.current.y - 0.5) * 20;
      const t = time * 0.001;

      const orbitRadii = [
        Math.min(w, h) * 0.15,
        Math.min(w, h) * 0.27,
        Math.min(w, h) * 0.38,
      ];
      const orbitSpeeds = [0.3, -0.2, 0.15];

      // Draw orbit rings
      orbitRadii.forEach((r) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Draw center node
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 30);
      gradient.addColorStop(0, "rgba(0, 212, 255, 0.3)");
      gradient.addColorStop(0.5, "rgba(0, 212, 255, 0.1)");
      gradient.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 30, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = "#00D4FF";
      ctx.fill();

      // Draw nodes
      const nodePositions: { x: number; y: number; color: string }[] = [];

      TECH_NODES.forEach((node) => {
        const orbitIdx = node.orbit - 1;
        const r = orbitRadii[orbitIdx];
        const speed = orbitSpeeds[orbitIdx];
        const angleRad =
          ((node.angle + t * speed * 30) * Math.PI) / 180;

        const px = cx + Math.cos(angleRad) * r + (mouseRef.current.x - 0.5) * 10 * node.orbit;
        const py = cy + Math.sin(angleRad) * r + (mouseRef.current.y - 0.5) * 10 * node.orbit;

        nodePositions.push({ x: px, y: py, color: node.color });

        // Glow
        const glow = ctx.createRadialGradient(px, py, 0, px, py, 20);
        glow.addColorStop(0, node.color + "40");
        glow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(px, py, 20, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();

        // Node dot
        ctx.beginPath();
        ctx.arc(px, py, 4, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.fill();

        // Label
        ctx.font = "10px monospace";
        ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
        ctx.textAlign = "center";
        ctx.fillText(node.name, px, py - 12);
      });

      // Connect some nearby nodes
      for (let i = 0; i < nodePositions.length; i++) {
        for (let j = i + 1; j < nodePositions.length; j++) {
          const a = nodePositions[i];
          const b = nodePositions[j];
          const dist = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
          if (dist < Math.min(w, h) * 0.25) {
            const alpha = Math.max(0, 0.08 - dist / (Math.min(w, h) * 4));
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      className="px-5 md:px-[60px] max-w-[1200px] mx-auto w-full"
      id="stack"
    >
      <RevealOnScroll>
        <SectionHeading
          title="Core Stack"
          subtitle="The tools and frameworks utilized to architect scalable, high-performance systems."
        />
      </RevealOnScroll>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left: Categories */}
        <div className="md:col-span-5 flex flex-col space-y-5">
          {STACK_CATEGORIES.map((cat, i) => (
            <RevealOnScroll key={cat.label} delay={i + 1}>
              <GlassCard className="p-6 md:p-8 rounded-2xl">
                <h4
                  className={`font-mono text-xs ${cat.color} mb-3 tracking-[0.15em] uppercase`}
                >
                  {cat.label}
                </h4>
                <p className="font-sans text-on-surface-variant text-base leading-relaxed">
                  {cat.techs}
                </p>
              </GlassCard>
            </RevealOnScroll>
          ))}
        </div>

        {/* Right: Constellation */}
        <RevealOnScroll delay={2} className="md:col-span-7">
          <div className="relative h-[500px] md:h-[600px] w-full glass-panel rounded-3xl overflow-hidden glass-hover shadow-2xl border border-glass-border">
            <div className="absolute inset-0 bg-gradient-to-br from-aurora-blue/5 to-aurora-violet/5" />
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
