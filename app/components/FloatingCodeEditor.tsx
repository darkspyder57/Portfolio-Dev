"use client";

import { useEffect, useRef, useState } from "react";

const CODE_LINES = [
  { indent: 0, tokens: [{ type: "keyword", text: "const" }, { type: "plain", text: " " }, { type: "var", text: "architect" }, { type: "plain", text: " = " }, { type: "keyword", text: "async" }, { type: "plain", text: " () " }, { type: "keyword", text: "=>" }, { type: "plain", text: " {" }] },
  { indent: 1, tokens: [{ type: "keyword", text: "const" }, { type: "plain", text: " " }, { type: "var", text: "vision" }, { type: "plain", text: " = " }, { type: "keyword", text: "await" }, { type: "plain", text: " " }, { type: "fn", text: "createFuture" }, { type: "plain", text: "({" }] },
  { indent: 2, tokens: [{ type: "prop", text: "intelligence" }, { type: "plain", text: ": " }, { type: "string", text: "'autonomous'" }, { type: "plain", text: "," }] },
  { indent: 2, tokens: [{ type: "prop", text: "design" }, { type: "plain", text: ": " }, { type: "string", text: "'premium'" }, { type: "plain", text: "," }] },
  { indent: 2, tokens: [{ type: "prop", text: "scale" }, { type: "plain", text: ": " }, { type: "number", text: "Infinity" }, { type: "plain", text: "," }] },
  { indent: 1, tokens: [{ type: "plain", text: "});" }] },
  { indent: 0, tokens: [] },
  { indent: 1, tokens: [{ type: "keyword", text: "return" }, { type: "plain", text: " " }, { type: "var", text: "vision" }, { type: "plain", text: "." }, { type: "fn", text: "deploy" }, { type: "plain", text: "();" }] },
  { indent: 0, tokens: [{ type: "plain", text: "};" }] },
];

const TOKEN_COLORS: Record<string, string> = {
  keyword: "text-[#c678dd]",
  var: "text-[#e06c75]",
  fn: "text-[#61afef]",
  string: "text-[#98c379]",
  number: "text-[#d19a66]",
  prop: "text-[#e5c07b]",
  plain: "text-on-surface-variant/80",
};

export default function FloatingCodeEditor() {
  const [visibleLines, setVisibleLines] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= CODE_LINES.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 250);
    return () => clearInterval(timer);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto animate-float">
      <div className="glass-panel p-1.5 md:p-2 rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.5),0_0_60px_rgba(0,212,255,0.12)] group relative">
        {/* Aurora gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-aurora-cyan/8 to-aurora-violet/8 opacity-50 z-10 pointer-events-none group-hover:opacity-100 transition-opacity duration-700" />

        {/* Editor window */}
        <div className="relative z-20 bg-[#0d0e12]/90 rounded-xl md:rounded-[1.4rem] overflow-hidden backdrop-blur-sm">
          {/* Title bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-glass-border/50">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <span className="font-mono text-[11px] text-on-surface-variant/50 tracking-wide">
              architect.ts
            </span>
            <div className="flex items-center gap-2 text-on-surface-variant/30">
              <span className="material-symbols-outlined text-sm">code</span>
            </div>
          </div>

          {/* Code content */}
          <div className="p-4 md:p-6 lg:p-8 font-mono text-xs md:text-sm leading-7 md:leading-8 min-h-[280px] md:min-h-[320px]">
            {CODE_LINES.map((line, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${
                  i < visibleLines
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4"
                }`}
                style={{
                  paddingLeft: `${line.indent * 24}px`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <span className="text-on-surface-variant/25 select-none mr-6 inline-block w-5 text-right">
                  {i + 1}
                </span>
                {line.tokens.map((token, j) => (
                  <span key={j} className={TOKEN_COLORS[token.type] || "text-on-surface-variant"}>
                    {token.text}
                  </span>
                ))}
                {i === visibleLines - 1 && i < CODE_LINES.length - 1 && (
                  <span className="typing-cursor" />
                )}
              </div>
            ))}
          </div>

          {/* Status bar */}
          <div className="flex items-center justify-between px-4 md:px-6 py-2 border-t border-glass-border/30 text-on-surface-variant/30 font-mono text-[10px]">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-aurora-cyan" />
                TypeScript
              </span>
              <span>UTF-8</span>
            </div>
            <div className="flex items-center gap-3">
              <span>Ln {Math.min(visibleLines, CODE_LINES.length)}, Col 1</span>
              <span>Spaces: 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
