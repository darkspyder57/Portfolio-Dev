"use client";

import { useEffect, useRef, useState } from "react";

interface CommandItem {
  id: string;
  title: string;
  category: "Sections" | "Projects";
  description?: string;
  targetId: string;
}

const COMMAND_ITEMS: CommandItem[] = [
  // Sections
  { id: "sec-experience", title: "Experience", category: "Sections", description: "Professional history and timeline", targetId: "experience" },
  { id: "sec-projects", title: "Work / Projects", category: "Sections", description: "Selected digital products & engineering works", targetId: "projects" },
  { id: "sec-stack", title: "Architecture / Tech Stack", category: "Sections", description: "Languages, tools & cloud technologies", targetId: "stack" },
  { id: "sec-contact", title: "Contact / Collaboration", category: "Sections", description: "Initiate contact and collaboration forms", targetId: "contact" },
  
  // Projects
  { id: "proj-medigem", title: "Medigem AI", category: "Projects", description: "AI Healthcare platform & diagnostics support", targetId: "project-medigem-ai" },
  { id: "proj-courseware", title: "Courseware Web App", category: "Projects", description: "Institutional educational hub for Centurion University", targetId: "project-courseware-web-app" },
  { id: "proj-techkart", title: "TechKart", category: "Projects", description: "High-performance Next.js e-commerce application", targetId: "project-techkart" },
  { id: "proj-copilot", title: "My Clinic Copilot", category: "Projects", description: "Practice management dashboard with analytics", targetId: "project-my-clinic-copilot" },
  { id: "proj-organ", title: "Organ Donor System", category: "Projects", description: "Data analytics and storage for donors", targetId: "project-organ-donor-system" },
  { id: "proj-note", title: "Note Keeper Application", category: "Projects", description: "Aesthetic Google Keep-inspired react app", targetId: "project-note-keeper-application" },
  { id: "proj-amazon", title: "Amazon.in Clone", category: "Projects", description: "Responsive Amazon replica web frontend", targetId: "project-amazon-in-clone" },
  { id: "proj-yom", title: "Yom! Food Delivery", category: "Projects", description: "Full-stack food ordering platform", targetId: "project-yom-food-delivery" },
  { id: "proj-texpert", title: "Texpert", category: "Projects", description: "Programming & coding interactive dashboard", targetId: "project-texpert" },
  { id: "proj-prompt", title: "React-Prompt-Generator", category: "Projects", description: "NPM package for prompt analysis", targetId: "project-react-prompt-generator" }
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // Toggle handlers
  useEffect(() => {
    function handleToggle() {
      setIsOpen((prev) => !prev);
      setQuery("");
      setActiveIndex(0);
    }

    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        handleToggle();
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }

    window.addEventListener("toggle-command-palette", handleToggle);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("toggle-command-palette", handleToggle);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Filter items
  const filtered = COMMAND_ITEMS.filter((item) => {
    const s = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(s) ||
      (item.description && item.description.toLowerCase().includes(s)) ||
      item.category.toLowerCase().includes(s)
    );
  });

  // Keep index in bound
  useEffect(() => {
    setActiveIndex(0);
  }, [query]);

  // Keyboard navigation inside list
  function handleKeyDown(e: React.KeyboardEvent) {
    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(filtered[activeIndex]);
    }
  }

  function handleSelect(item: CommandItem) {
    const el = document.getElementById(item.targetId);
    if (el) {
      setIsOpen(false);
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 150);
    }
  }

  // Handle overlay click
  function handleOverlayClick(e: React.MouseEvent) {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-start justify-center pt-[15vh] px-4 animate-in fade-in duration-200"
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className="glass-panel w-full max-w-xl rounded-2xl overflow-hidden border border-glass-border shadow-[0_50px_100px_rgba(0,0,0,0.8)] flex flex-col bg-surface-container-low/95 text-on-surface animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Bar */}
        <div className="flex items-center gap-4 px-5 py-4 border-b border-glass-border">
          <span className="material-symbols-outlined text-on-surface-variant/70">search</span>
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent border-none text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-0 text-base font-sans"
            placeholder="Search sections, projects, and architecture..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={() => setIsOpen(false)}
            className="px-2 py-1 text-[10px] font-mono rounded bg-white/[0.06] border border-glass-border text-on-surface-variant hover:text-on-surface hover:bg-white/[0.1] transition-all"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[350px] overflow-y-auto p-2 scrollbar-thin">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-on-surface-variant/50 font-sans text-sm">
              No matching resources found. Try another query.
            </div>
          ) : (
            <div>
              {["Sections", "Projects"].map((category) => {
                const items = filtered.filter((i) => i.category === category);
                if (items.length === 0) return null;
                return (
                  <div key={category}>
                    <div className="px-3 py-2 text-[10px] font-mono text-aurora-blue/80 tracking-wider uppercase">
                      {category}
                    </div>
                    <div className="space-y-0.5">
                      {items.map((item) => {
                        const globalIndex = filtered.indexOf(item);
                        const isSelected = activeIndex === globalIndex;
                        return (
                          <div
                            key={item.id}
                            className={`flex items-center justify-between px-3 py-3 rounded-lg cursor-pointer transition-all duration-150 ${
                              isSelected
                                ? "bg-white/[0.08] text-on-surface translate-x-1"
                                : "hover:bg-white/[0.03] text-on-surface-variant"
                            }`}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(globalIndex)}
                          >
                            <div className="flex items-center gap-3">
                              <span className="material-symbols-outlined text-lg opacity-70">
                                {category === "Sections" ? "explore" : "terminal"}
                              </span>
                              <div className="flex flex-col">
                                <span className="font-sans text-sm font-semibold">{item.title}</span>
                                {item.description && (
                                  <span className="font-sans text-[11px] opacity-60 leading-tight">
                                    {item.description}
                                  </span>
                                )}
                              </div>
                            </div>
                            {isSelected && (
                              <span className="font-mono text-[10px] text-aurora-cyan animate-pulse">
                                press Enter
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer help line */}
        <div className="px-5 py-3 bg-black/20 border-t border-glass-border/40 flex items-center justify-between text-[10px] font-mono text-on-surface-variant/40">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">keyboard_arrow_down</span>
              <span className="material-symbols-outlined text-[12px]">keyboard_arrow_up</span>
              Navigate
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[12px]">keyboard_return</span>
              Select
            </span>
          </div>
          <span>Architected by M Mohnish Kumar</span>
        </div>
      </div>
    </div>
  );
}
