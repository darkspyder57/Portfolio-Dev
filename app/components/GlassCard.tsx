"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  as?: "div" | "section" | "article";
  id?: string;
}

export default function GlassCard({
  children,
  className = "",
  hover = true,
  as: Tag = "div",
  id,
}: GlassCardProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  function handleMouseMove(e: MouseEvent<HTMLElement>) {
    if (!glowRef.current) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    glowRef.current.style.left = `${x}px`;
    glowRef.current.style.top = `${y}px`;
  }

  return (
    <Tag
      id={id}
      className={`glass-panel ${hover ? "glass-hover" : ""} relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
    >
      <div ref={glowRef} className="mouse-glow" />
      <div className="relative z-10">{children}</div>
    </Tag>
  );
}
