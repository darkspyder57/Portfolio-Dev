"use client";

import { useEffect, useState, useCallback } from "react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > 500);
  }, []);

  useEffect(() => {
    // Check initial scroll state
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      onClick={scrollToTop}
      className="print:hidden"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        width: "3.5rem",
        height: "3.5rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "9999px",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        background: "rgba(255, 255, 255, 0.03)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundImage:
          "linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0) 100%)",
        color: "#e3e2e8",
        cursor: "pointer",
        zIndex: 60,
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(1rem)",
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.color = "#00FFC2";
        btn.style.borderColor = "#00FFC2";
        btn.style.boxShadow = "0 0 30px rgba(0, 255, 194, 0.3)";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.color = "#e3e2e8";
        btn.style.borderColor = "rgba(255, 255, 255, 0.08)";
        btn.style.boxShadow = "none";
      }}
      aria-label="Scroll to top"
    >
      <span className="material-symbols-outlined text-xl">arrow_upward</span>
    </button>
  );
}
