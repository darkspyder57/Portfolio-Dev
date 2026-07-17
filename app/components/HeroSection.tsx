"use client";

import { useEffect, useRef, useState } from "react";
import StatusBadge from "./StatusBadge";
import MagneticButton from "./MagneticButton";
import FloatingCodeEditor from "./FloatingCodeEditor";
import RevealOnScroll from "./RevealOnScroll";
import GlassCard from "./GlassCard";

const STATS = [
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 20, suffix: "+", label: "Projects Delivered" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

function AnimatedCounter({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            let start = 0;
            const duration = 1500;
            const startTime = performance.now();

            function animate(now: number) {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              start = Math.round(eased * target);
              setCount(start);
              if (progress < 1) requestAnimationFrame(animate);
            }

            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="stat-value">
      {count}
      {suffix}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-5 md:px-[60px] relative pt-32 pb-20">
      {/* Availability badge */}
      <RevealOnScroll>
        <StatusBadge className="mb-10 md:mb-14" />
      </RevealOnScroll>

      {/* Main headline */}
      <RevealOnScroll delay={1}>
        <h1 className="font-sans text-[48px] sm:text-[64px] md:text-[80px] lg:text-[100px] xl:text-[120px] font-extrabold leading-[0.95] tracking-[-0.04em] max-w-6xl mx-auto mb-8 gradient-text">
          Building AI Products{" "}
          <br />
          That Feel Effortless.
        </h1>
      </RevealOnScroll>

      {/* Subtitle */}
      <RevealOnScroll delay={2}>
        <p className="font-sans text-lg md:text-xl lg:text-2xl text-on-surface-variant max-w-3xl mx-auto mb-14 md:mb-16 leading-relaxed font-light">
          I'm Mohnish Kumar, an AI Engineer and Full-Stack Developer passionate about creating intelligent software, autonomous workflows, and developer tools. I enjoy transforming ambitious ideas into scalable products where clean engineering, thoughtful design, and artificial intelligence work together seamlessly.
        </p>
      </RevealOnScroll>

      {/* CTAs */}
      <RevealOnScroll delay={3}>
        <div className="flex flex-col sm:flex-row gap-5 mb-16 md:mb-20">
          <MagneticButton
            href="#projects"
            variant="solid"
            className="px-10 py-5 text-lg"
          >
            Explore Architecture
          </MagneticButton>
          <MagneticButton
            href="#contact"
            variant="outline"
            className="px-10 py-5 text-lg"
          >
            Initiate Contact
          </MagneticButton>
        </div>
      </RevealOnScroll>

      {/* Stats cards */}
      <RevealOnScroll delay={4} className="w-full max-w-3xl mx-auto mb-16 md:mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((stat, i) => (
            <GlassCard
              key={stat.label}
              className={`p-6 md:p-8 rounded-2xl text-center group ${
                i === 1 ? "sm:-translate-y-3" : ""
              }`}
            >
              <div className="text-3xl md:text-4xl font-extrabold font-sans gradient-text-aurora mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="font-mono text-[11px] text-on-surface-variant uppercase tracking-[0.12em]">
                {stat.label}
              </p>
            </GlassCard>
          ))}
        </div>
      </RevealOnScroll>

      {/* Floating code editor */}
      <RevealOnScroll delay={5}>
        <FloatingCodeEditor />
      </RevealOnScroll>
    </section>
  );
}
