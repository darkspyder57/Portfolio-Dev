"use client";

import { useEffect, useRef, useState } from "react";
import MagneticButton from "./MagneticButton";
import { EXPERIENCE } from "../data/experience";

export default function ResumeViewer() {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOpen() {
      setIsOpen(true);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("open-resume-viewer", handleOpen);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("open-resume-viewer", handleOpen);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  function handleOverlayClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  function handlePrint() {
    window.print();
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center overflow-y-auto py-10 px-4 animate-in fade-in duration-200 print:relative print:p-0 print:bg-white print:text-black resume-modal-overlay"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="w-full max-w-4xl bg-surface-container-low/95 border border-glass-border rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200 print:border-none print:shadow-none print:bg-white print:rounded-none print:w-full"
      >
        {/* Modal Header Actions (hidden during printing) */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-glass-border bg-black/20 print:hidden">
          <div className="flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-aurora-cyan animate-pulse" />
            <span className="font-mono text-xs text-on-surface-variant uppercase tracking-wider">
              Interactive Resume Gateway
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-glass-border hover:bg-white/[0.1] text-xs font-semibold text-on-surface transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              Print / Save PDF
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 rounded-full flex items-center justify-center bg-white/[0.06] border border-glass-border hover:bg-white/[0.1] text-on-surface transition-all active:scale-95 cursor-pointer"
            >
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
        </div>

        {/* Resume Content Sheet */}
        <div className="p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-10 md:gap-14 bg-gradient-to-br from-surface-container/20 to-surface-container-lowest/10 print:bg-white print:text-black print:p-0 print:flex-col print:gap-6">
          {/* Left Column (Bio/Contact/Skills) */}
          <div className="w-full md:w-1/3 flex flex-col gap-8 print:w-full print:gap-4 border-b md:border-b-0 md:border-r border-glass-border/40 pb-8 md:pb-0 md:pr-10 print:border-none print:pr-0 print:pb-0">
            {/* Header info for mobile/print */}
            <div className="flex flex-col gap-4 text-center md:text-left print:text-left">
              {/* Profile Image */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="M Mohnish Kumar"
                className="w-24 h-24 rounded-full border border-glass-border mx-auto md:mx-0 shadow-lg object-cover ring-2 ring-aurora-blue/20 print:hidden"
                src="/assets/mmk-futuristic-logo.png"
              />
              <div>
                <h1 className="font-sans text-3xl font-extrabold text-on-surface tracking-tight print:text-black">
                  M. Mohnish Kumar
                </h1>
                <p className="font-sans text-xs text-aurora-blue uppercase tracking-widest font-semibold mt-1">
                  Software Development Engineer
                </p>
              </div>
            </div>

            {/* Contact details */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold border-b border-glass-border/30 pb-2 mb-3 print:text-black print:border-black/20">
                Contact
              </h2>
              <ul className="space-y-2.5 font-sans text-sm text-on-surface-variant print:text-black/85">
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-aurora-blue print:hidden">mail</span>
                  <span>mohnishkumar57@gmail.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-aurora-blue print:hidden">location_on</span>
                  <span>India</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-sm text-aurora-blue print:hidden">globe</span>
                  <span>github.com/darkspyder57</span>
                </li>
              </ul>
            </div>

            {/* Tech Skills */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold border-b border-glass-border/30 pb-2 mb-4 print:text-black print:border-black/20">
                Core Stack
              </h2>
              <div className="flex flex-wrap gap-2 print:gap-1.5">
                {[
                  "React",
                  "Next.js",
                  "TypeScript",
                  "HTML5/CSS3",
                  "TailwindCSS",
                  "JavaScript (ES6+)",
                  "Node.js",
                  "Python",
                  "PyTorch",
                  "DevOps",
                  "CI/CD Systems",
                  "Intelligent Agents",
                  "SQL & NoSQL"
                ].map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[10px] px-2.5 py-1 rounded bg-white/[0.04] border border-glass-border/50 text-on-surface-variant print:bg-black/5 print:border-black/10 print:text-black"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-on-surface-variant font-bold border-b border-glass-border/30 pb-2 mb-3 print:text-black print:border-black/20">
                Languages
              </h2>
              <ul className="space-y-1 font-sans text-sm text-on-surface-variant print:text-black/85">
                <li>English (Fluent)</li>
                <li>Telugu (Native)</li>
                <li>Hindi (Fluent)</li>
              </ul>
            </div>
          </div>

          {/* Right Column (Experience/Education) */}
          <div className="flex-1 flex flex-col gap-10 print:gap-6">
            {/* Professional Summary */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-aurora-blue font-bold border-b border-glass-border/30 pb-2 mb-4 print:text-black print:border-black/20">
                Executive Profile
              </h2>
              <p className="font-sans text-on-surface-variant leading-relaxed text-sm md:text-base print:text-black/85">
                I'm Mohnish Kumar, an AI Engineer and Full-Stack Developer passionate about creating intelligent software, autonomous workflows, and developer tools. I enjoy transforming ambitious ideas into scalable products where clean engineering, thoughtful design, and artificial intelligence work together seamlessly.
              </p>
            </div>

            {/* Experience */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-aurora-blue font-bold border-b border-glass-border/30 pb-2 mb-6 print:text-black print:border-black/20">
                Experience Timeline
              </h2>
              <div className="space-y-8 print:space-y-4">
                {EXPERIENCE.filter((exp) => exp.type === "work").map((exp) => (
                  <div
                    key={exp.title}
                    className="flex flex-col gap-1.5 relative pl-5 border-l-2 border-aurora-blue/20 print:border-black/20"
                  >
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-aurora-blue -left-[6px] top-1.5 print:bg-black" />
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline">
                      <h3 className="font-sans text-base font-bold text-on-surface print:text-black">
                        {exp.title}
                      </h3>
                      <span className="font-mono text-[11px] text-aurora-cyan uppercase tracking-wider print:text-black/70">
                        {exp.period}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-on-surface-variant/80 print:text-black/70">
                      {exp.company}
                      {exp.location ? `, ${exp.location}` : ""}
                    </span>
                    <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1 print:text-black/80">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="font-mono text-xs uppercase tracking-widest text-aurora-blue font-bold border-b border-glass-border/30 pb-2 mb-4 print:text-black print:border-black/20">
                Education
              </h2>
              <div className="space-y-6">
                {EXPERIENCE.filter((exp) => exp.type === "education").map((exp) => (
                  <div
                    key={exp.title}
                    className="flex flex-col gap-1.5 pl-5 relative border-l-2 border-aurora-blue/20 print:border-black/20"
                  >
                    <div className="absolute w-2.5 h-2.5 rounded-full bg-aurora-blue -left-[6px] top-1.5 print:bg-black" />
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-sans text-sm font-bold text-on-surface print:text-black">
                        {exp.title === "Student" ? "Bachelor of Technology in Computer Science & Engineering" : exp.title}
                      </h3>
                      <span className="font-mono text-[10px] text-aurora-cyan uppercase tracking-wider print:text-black/70">
                        {exp.period}
                      </span>
                    </div>
                    <span className="font-mono text-xs text-on-surface-variant/80 print:text-black/70">
                      {exp.company}{exp.location ? `, ${exp.location}` : ""}
                    </span>
                    {exp.description && (
                      <p className="font-sans text-xs md:text-sm text-on-surface-variant leading-relaxed mt-1 print:text-black/80">
                        {exp.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
