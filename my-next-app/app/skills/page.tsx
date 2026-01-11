"use client";
// =============================================================
// Skills Page – Cosmic Accordion Theme
// =============================================================
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// INLINE ParticleBackground: full-screen starfield
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const stars: { x: number; y: number; r: number; opacity: number; vx: number; vy: number }[] = [];
    const init = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      stars.length = 0;
      for (let i = 0; i < 120; i++) {
        stars.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          r: Math.random() * 1.2 + 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.1,
          vy: (Math.random() - 0.5) * 0.1,
        });
      }
    };
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0 || s.x > canvas.offsetWidth) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.offsetHeight) s.vy *= -1;
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };
    init();
    render();
    window.addEventListener("resize", () => { init(); });
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}

// Theme gradients for each section
const SECTION_STYLES = {
  "Développement Web": {
    gradient: "from-[#ff61d8] to-[#7d6fff]",
    bar: "bg-gradient-to-r from-[#ff61d8] to-[#7d6fff]",
  },
  "Intelligence Artificielle": {
    gradient: "from-[#00f7ff] to-[#00dcf8]",
    bar: "bg-gradient-to-r from-[#00f7ff] to-[#00dcf8]",
  },
  "Systèmes Embarqués": {
    gradient: "from-[#00ff9d] to-[#00c772]",
    bar: "bg-gradient-to-r from-[#00ff9d] to-[#00c772]",
  },
} as const;

type SectionKey = keyof typeof SECTION_STYLES;
interface Skill { name: string; level: number }
interface Section { title: SectionKey; description: string; skills: Skill[] }

const SECTIONS: Section[] = [
  {
    title: "Développement Web",
    description: "Interfaces réactives, SSR & performances optimisées.",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 92 },
      { name: "Node.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
    ],
  },
  {
    title: "Intelligence Artificielle",
    description: "Modèles ML, Chatbots & pipelines de données.",
    skills: [
      { name: "Python / TensorFlow", level: 85 },
      { name: "NLP / LLM", level: 80 },
      { name: "Data Science", level: 78 },
    ],
  },
  {
    title: "Systèmes Embarqués",
    description: "Firmware temps réel & IoT basse consommation.",
    skills: [
      { name: "C++20", level: 82 },
      { name: "Rust", level: 75 },
      { name: "Embedded IoT", level: 70 },
    ],
  },
];

// Accordion animation variants
const variants = {
  open: { height: "auto", opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

export default function SkillsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-[#050011] to-[#1a002a] min-h-screen text-white">
      <ParticleBackground />
      <div className="relative z-10 max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-4xl font-bold text-center mb-4">Mes Compétences</h1>
        {SECTIONS.map((sec, idx) => (
          <div key={sec.title} className="border border-gray-700 rounded-xl overflow-hidden backdrop-blur-sm">
            <button
              onClick={() => toggle(idx)}
              className={`w-full flex justify-between items-center p-4 bg-gray-900 hover:bg-gray-800 transition-shadow
                ${openIndex===idx?`shadow-lg shadow-[rgba(255,255,255,0.15)]`:''}`}
            >
              <motion.span
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className={`text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${SECTION_STYLES[sec.title].gradient}`}
              >
                {sec.title}
              </motion.span>
              <motion.span
                animate={{ rotate: openIndex===idx?45:0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="text-gray-400 text-2xl"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {openIndex===idx && (
                <motion.div
                  key="content"
                  initial="collapsed"
                  animate="open"
                  exit="collapsed"
                  variants={variants}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                  className="px-6 pb-6 bg-gray-800"
                >
                  <p className="text-gray-300 mb-4">{sec.description}</p>
                  <div className="space-y-4">
                    {sec.skills.map((sk, i) => (
                      <div key={sk.name}>
                        <div className="flex justify-between mb-1">
                          <span>{sk.name}</span>
                          <span>{sk.level}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-3 rounded-full overflow-hidden">
                          <motion.div
                            className={`${SECTION_STYLES[sec.title].bar} h-3 rounded-full`}
                            initial={{ width: 0 }}
                            animate={{ width: `${sk.level}%` }}
                            transition={{ duration: 1, ease: 'easeOut', delay: i*0.1 }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
        <div className="text-center mt-8">
          <Link href="/" className="text-[#7d6fff] hover:underline">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}
