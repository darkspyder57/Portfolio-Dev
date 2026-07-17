"use client";

import { useRef, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  type?: "button" | "submit";
  variant?: "solid" | "outline";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export default function MagneticButton({
  children,
  href,
  type = "button",
  variant = "solid",
  className = "",
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  function handleMouseMove(e: ReactMouseEvent) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  }

  function handleMouseLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
  }

  const baseClasses = "magnetic-btn inline-flex items-center justify-center gap-3 font-bold transition-all duration-300 rounded-full cursor-pointer";

  const variantClasses =
    variant === "solid"
      ? "bg-aurora-blue text-surface hover:bg-surface-tint shadow-[0_0_40px_rgba(0,212,255,0.3)] hover:shadow-[0_0_60px_rgba(0,212,255,0.5)]"
      : "glass-panel hover:border-aurora-blue text-on-surface";

  const allClasses = `${baseClasses} ${variantClasses} ${className}`;

  if (href) {
    return (
      <a
        ref={ref as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={allClasses}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      ref={ref as React.RefObject<HTMLButtonElement>}
      type={type}
      className={allClasses}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
