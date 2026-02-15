"use client";
// =============================================================
// Skills Page – Cosmic Accordion Theme (Enhanced UI)
// =============================================================
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// INLINE ParticleBackground (Inchangé)
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
      // Un peu plus d'étoiles pour la profondeur
      for (let i = 0; i < 150; i++) {
        stars.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          r: Math.random() * 1.5 + 0.5, // Étoiles légèrement plus variées
          opacity: Math.random() * 0.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
        });
      }
    };
    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      // Ajout d'un léger "voile" cosmique
      const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, canvas.width);
      gradient.addColorStop(0, "rgba(20, 0, 50, 0)");
      gradient.addColorStop(1, "rgba(5, 0, 20, 0.6)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0,0, canvas.width, canvas.height);

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

// Ajout de propriétés pour le style (glow, shadow colors)
const SECTION_STYLES = {
  "Développement Frontend & UI": {
    gradient: "from-[#ff61d8] to-[#7d6fff]",
    bar: "bg-gradient-to-r from-[#ff61d8] to-[#7d6fff]",
    glow: "shadow-[0_0_20px_rgba(255,97,216,0.4)]", // Glow rose/violet
    textAccent: "text-[#ff61d8]"
  },
  "Backend & Architecture": {
    gradient: "from-[#00ff9d] to-[#00c772]",
    bar: "bg-gradient-to-r from-[#00ff9d] to-[#00c772]",
    glow: "shadow-[0_0_20px_rgba(0,255,157,0.4)]", // Glow vert
    textAccent: "text-[#00ff9d]"
  },
  "Intelligence Artificielle": {
    gradient: "from-[#00f7ff] to-[#00dcf8]",
    bar: "bg-gradient-to-r from-[#00f7ff] to-[#00dcf8]",
    glow: "shadow-[0_0_20px_rgba(0,247,255,0.4)]", // Glow cyan
    textAccent: "text-[#00f7ff]"
  },
} as const;

type SectionKey = keyof typeof SECTION_STYLES;
interface Skill { name: string; level: number }
interface Section { title: SectionKey; description: string; skills: Skill[] }

// Données (Inchangées)
const SECTIONS: Section[] = [
  {
    title: "Développement Frontend & UI",
    description: "Création d'interfaces immersives avec Next.js et Three.js.",
    skills: [
      { name: "React / Next.js", level: 95 }, 
      { name: "TypeScript / JS (ES6+)", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Three.js (3D Web)", level: 75 },
    ],
  },
  {
    title: "Backend & Architecture",
    description: "Solutions robustes, bases de données et déploiement.",
    skills: [
      { name: "Node.js / Python (FastAPI)", level: 85 },
      { name: "SQL / PostgreSQL (Supabase)", level: 82 },
      { name: "Docker / Linux", level: 70 },
      { name: "Git / GitHub / Vercel", level: 88 },
    ],
  },
  {
    title: "Intelligence Artificielle",
    description: "Intégration de LLM et pipelines de données.",
    skills: [
      { name: "Python & NLP", level: 85 },
      { name: "Hugging Face / LLM", level: 80 }, 
      { name: "TensorFlow (Notions)", level: 60 }, 
      { name: "Agents IA & Chatbots", level: 78 }, 
    ],
  },
];

// Accordion animation variants (Inchangées)
const variants = {
  open: { height: "auto", opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

export default function SkillsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    // Fond légèrement plus profond
    <main className="relative overflow-hidden bg-gradient-to-br from-[#02000a] via-[#0a001f] to-[#050011] min-h-screen text-white selection:bg-pink-500/30">
      <ParticleBackground />
      
      {/* Conteneur principal avec un léger glow global */}
      <div className="relative z-10 max-w-3xl mx-auto p-6 space-y-8 mt-12">
        
        {/* Titre amélioré : Plus gros, dégradé et ombre portée */}
        <motion.h1 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-5xl md:text-6xl font-extrabold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
        >
          Mes Compétences
        </motion.h1>

        {SECTIONS.map((sec, idx) => {
          const style = SECTION_STYLES[sec.title];
          const isOpen = openIndex === idx;

          return (
            // Card Container: Glassmorphism + Glow on hover based on section color
            <motion.div 
              key={sec.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl overflow-hidden backdrop-blur-md border border-white/10 transition-all duration-300 ${isOpen ? style.glow : 'hover:border-white/20 hover:' + style.glow}`}
            >
              {/* Accordion Button: More translucent, better hover state */}
              <button
                onClick={() => toggle(idx)}
                className={`w-full flex justify-between items-center p-5 text-left transition-colors duration-300
                  ${isOpen ? 'bg-white/10' : 'bg-white/5 hover:bg-white/10'}`}
              >
                <span className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${style.gradient}`}>
                  {sec.title}
                </span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`text-3xl ${isOpen ? style.textAccent : 'text-gray-400'}`}
                >
                  +
                </motion.span>
              </button>
              
              {/* Accordion Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={variants}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }} // Easing plus fluide
                    className="bg-black/40 px-6 pb-8 pt-2"
                  >
                    <p className="text-gray-300 mb-6 text-lg font-light">{sec.description}</p>
                    <div className="space-y-6">
                      {sec.skills.map((sk, i) => (
                        <div key={sk.name}>
                          {/* Labels: Percentage colored and pushed to the right */}
                          <div className="flex justify-between items-end mb-2">
                            <span className="font-medium text-gray-200">{sk.name}</span>
                            <span className={`font-bold ${style.textAccent}`}>{sk.level}%</span>
                          </div>
                          
                          {/* Skill Bar: Darker background container */}
                          <div className="w-full bg-black/50 h-4 rounded-full overflow-hidden p-[2px] border border-white/5">
                            {/* Animated Bar: Glowing "Neon Tube" effect */}
                            <motion.div
                              className={`${style.bar} h-full rounded-full shadow-[0_0_10px_currentColor]`}
                              initial={{ width: 0 }}
                              animate={{ width: `${sk.level}%` }}
                              transition={{ duration: 1.2, ease: 'easeOut', delay: i * 0.1 }}
                              style={{ color: style.textAccent }} // Hack to pass color to shadow
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
        
        {/* Footer Link Enhanced */}
        <div className="text-center mt-16">
          <Link href="/" className="inline-flex items-center gap-2 text-[#7d6fff] hover:text-pink-400 transition-colors duration-300 font-semibold text-lg group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </main>
  );
}