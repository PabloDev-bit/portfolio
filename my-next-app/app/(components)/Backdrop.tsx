"use client";

import { useEffect, useRef } from "react";

/**
 * Fond néon commun à toutes les pages.
 * Halo piloté au curseur + trame de points + grain. Aucun canvas, aucune boucle.
 */
export default function Backdrop() {
  const bloomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bloomRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.4;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-[#060309]" />

      <div className="absolute -left-[18%] top-[-10%] h-[70vh] w-[70vh] rounded-full bg-[#7C3AED] opacity-[0.18] blur-[130px]" />
      <div className="absolute -right-[12%] bottom-[-18%] h-[60vh] w-[60vh] rounded-full bg-[#FF3D8A] opacity-[0.12] blur-[140px]" />

      <div
        ref={bloomRef}
        className="absolute inset-0"
        style={{
          ["--mx" as string]: "50%",
          ["--my" as string]: "40%",
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(139,92,246,0.16), transparent 70%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(rgba(196,181,253,0.16) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 40%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 40%, #000 30%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}