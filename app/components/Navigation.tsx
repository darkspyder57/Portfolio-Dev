"use client";

import { useEffect, useState } from "react";

const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Work" },
  { href: "#stack", label: "Architecture" },
  { href: "#contact", label: "Contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 80);
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Active section tracking
  useEffect(() => {
    const sectionIds = ["experience", "projects", "stack", "contact"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && window.scrollY >= 200) {
              setActiveSection(`#${id}`);
            }
          });
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <header
        className={`fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl rounded-full z-40 transition-all duration-500 ${
          scrolled
            ? "bg-surface/70 border border-glass-border backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
            : "bg-glass-surface/30 border border-glass-border/50 backdrop-blur-2xl shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
        }`}
      >
        <nav className="flex justify-between items-center px-6 md:px-8 py-3.5">
          {/* Logo */}
          <a
            className="flex items-center gap-3 hover:scale-[1.02] active:scale-95 transition-transform"
            href="#"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              alt="M Mohnish Kumar Logo"
              className="w-8 h-8 rounded-full ring-2 ring-glass-border"
              src="/assets/mmk-futuristic-logo.png"
            />
            <span className="font-sans text-lg font-bold tracking-tighter text-on-surface hidden sm:inline">
              M. Mohnish Kumar
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                className={`relative px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-all duration-300 ${
                  activeSection === link.href
                    ? "text-on-surface bg-white/[0.06]"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-white/[0.04]"
                }`}
                href={link.href}
              >
                {link.label}
                {activeSection === link.href && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-aurora-blue" />
                )}
              </a>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => window.dispatchEvent(new Event("toggle-command-palette"))}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-surface/50 border border-glass-border text-on-surface-variant font-mono text-[10px] tracking-wider cursor-pointer hover:bg-white/[0.08] active:scale-95 transition-all"
              aria-label="Open Command Palette"
            >
              <span>⌘</span>
              <span>K</span>
            </button>
            <button
              onClick={() => window.dispatchEvent(new Event("open-resume-viewer"))}
              className="flex items-center justify-center px-6 py-2.5 rounded-full bg-on-surface text-surface font-bold hover:bg-white/90 transition-all duration-300 hover:scale-[1.03] active:scale-95 text-sm shadow-[0_4px_20px_rgba(255,255,255,0.1)] cursor-pointer"
            >
              Download CV
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-on-surface w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/[0.05] active:bg-white/[0.1] transition-all cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileOpen ? "close" : "menu"}
            </span>
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-3 mx-0 bg-surface-container-high/98 border border-white/[0.08] rounded-2xl p-5 flex flex-col gap-2 shadow-[0_24px_50px_rgba(0,0,0,0.8)] animate-in fade-in slide-in-from-top-4 duration-300 z-50">
            {/* Search Option */}
            <button
              className="flex items-center justify-between w-full text-on-surface-variant hover:text-on-surface active:bg-white/[0.08] px-4 py-3.5 rounded-xl transition-all duration-200 text-left cursor-pointer bg-white/[0.03] border border-glass-border/40"
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("toggle-command-palette"));
              }}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-aurora-blue text-xl">search</span>
                <span className="font-sans text-sm font-medium tracking-wide">Search Website</span>
              </div>
              <span className="font-mono text-[10px] text-on-surface-variant/40 px-2 py-0.5 rounded bg-surface/50 border border-glass-border">⌘K</span>
            </button>

            <div className="h-[1px] bg-glass-border/30 my-1" />

            {/* Navigation Links */}
            {[
              { href: "#experience", label: "Experience", icon: "history", color: "text-aurora-cyan" },
              { href: "#projects", label: "Work", icon: "folder", color: "text-aurora-violet" },
              { href: "#stack", label: "Architecture", icon: "layers", color: "text-aurora-blue" },
              { href: "#contact", label: "Contact", icon: "mail", color: "text-aurora-red" },
            ].map((link) => (
              <a
                key={link.href}
                className="flex items-center justify-between w-full text-on-surface-variant hover:text-on-surface active:bg-white/[0.06] hover:bg-white/[0.02] px-4 py-3 rounded-xl transition-all duration-200"
                href={link.href}
                onClick={() => setMobileOpen(false)}
              >
                <div className="flex items-center gap-3">
                  <span className={`material-symbols-outlined ${link.color} text-xl`}>{link.icon}</span>
                  <span className="font-sans text-sm font-medium tracking-wide">{link.label}</span>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant/35 text-lg">chevron_right</span>
              </a>
            ))}

            <div className="h-[1px] bg-glass-border/30 my-1" />

            {/* Resume Button */}
            <button
              onClick={() => {
                setMobileOpen(false);
                window.dispatchEvent(new Event("open-resume-viewer"));
              }}
              className="flex items-center justify-center gap-2 w-full mt-1 px-6 py-3.5 rounded-xl bg-on-surface text-surface font-bold text-sm hover:bg-white/90 active:scale-[0.98] transition-all duration-200 cursor-pointer shadow-[0_4px_20px_rgba(255,255,255,0.08)]"
            >
              <span className="material-symbols-outlined text-lg">description</span>
              Download CV
            </button>
          </div>
        )}
      </header>

      {/* Backdrop overlay for dimming content underneath */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/65 backdrop-blur-[6px] z-30 md:hidden animate-in fade-in duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}

