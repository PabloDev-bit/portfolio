"use client";

import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';

// =============================================================
// COMPOSANT DE FOND (CORRIGÉ)
// =============================================================
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animId: number;
    // Utilisation de window.innerWidth/Height pour le mode 'fixed'
    const dpr = window.devicePixelRatio || 1;
    const stars: { x: number; y: number; r: number; opacity: number; vx: number; vy: number }[] = [];
    
    const init = () => {
      // On utilise innerWidth/Height car le canvas est 'fixed'
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      stars.length = 0;
      
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 15000); // Densité adaptative

      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      
      // Léger voile cosmique (Optionnel, peut être retiré si trop sombre)
      const gradient = ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2, 0, window.innerWidth/2, window.innerHeight/2, window.innerWidth);
      gradient.addColorStop(0, "rgba(20, 0, 50, 0)");
      gradient.addColorStop(1, "rgba(5, 0, 20, 0.3)"); // Opacité réduite pour laisser passer le fond
      ctx.fillStyle = gradient;
      ctx.fillRect(0,0, window.innerWidth, window.innerHeight);

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        
        // Rebond infini fluide
        if (s.x < 0) s.x = window.innerWidth;
        if (s.x > window.innerWidth) s.x = 0;
        if (s.y < 0) s.y = window.innerHeight;
        if (s.y > window.innerHeight) s.y = 0;
        
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
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);

  // CORRECTION MAJEURE ICI : z-[1] pour passer au-dessus du dégradé de fond
  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1]" />;
}

// =============================================================
// DONNÉES DE LA TIMELINE
// =============================================================
const TIMELINE_DATA = [
  {
    year: "2024 - 2026",
    title: "Formation Académique & Autodidacte",
    subtitle: "Cégep de Sherbrooke & Udemy",
    description: "Acquisition des bases solides en informatique (algorithmique, structures de données) complétée par une formation intensive en ligne sur React et l'écosystème JavaScript moderne.",
    color: "from-pink-500 to-rose-500",
    icon: "🎓"
  },
  {
    year: "2025",
    title: "Premiers Projets Full-Stack",
    subtitle: "ProGym Tracker & Portfolio V1",
    description: "Développement d'applications concrètes pour résoudre des problèmes réels. Mise en pratique de Next.js, Tailwind CSS et des bases de données SQL via Supabase.",
    color: "from-purple-500 to-indigo-500",
    icon: "💻"
  },
  {
    year: "Fin 2025",
    title: "Exploration IA & 3D Web",
    subtitle: "Three.js & Intégration LLM",
    description: "Plongée dans le web immersif avec Three.js et début de l'intégration de modèles d'IA (Hugging Face) dans des interfaces web réactives.",
    color: "from-blue-500 to-cyan-500",
    icon: "🤖"
  },
  {
    year: "2026",
    title: "Futur : Mastère & Alternance",
    subtitle: "IPSSI - Big Data & IA",
    description: "Préparation à l'entrée en Mastère spécialisé. Objectif : Devenir un expert capable de fusionner développement web performant et intelligence artificielle.",
    color: "from-emerald-400 to-green-500",
    icon: "🚀"
  }
];

// =============================================================
// PAGE PRINCIPALE
// =============================================================
export default function ExperiencePage() {
  const { scrollYProgress } = useScroll();
  const scaleLine = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden font-sans bg-[#02000a] text-white selection:bg-pink-500/30">
      
      {/* COUCHE 1 (z-0) : Background Gradient Statique */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#02000a] via-[#0a001f] to-[#050011]" />
      
      {/* COUCHE 2 (z-1) : Particle Canvas (Géré dans le composant) */}
      <ParticleBackground />

      {/* COUCHE 3 (z-10) : Contenu */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 py-24 md:py-32">
        
        {/* HEADER */}
        <div className="text-center max-w-4xl mx-auto mb-24 space-y-6">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          >
            Mon Parcours
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 leading-relaxed"
          >
            Une évolution constante, guidée par la passion du code, <br className="hidden md:block" />
            l&apos;autodidaxie et la volonté de repousser les limites du web.
          </motion.p>
        </div>

        {/* TIMELINE CONTAINER */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Ligne Centrale (Animée au scroll) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-white/10 rounded-full ml-[-2px] md:ml-0">
            <motion.div 
              style={{ scaleY: scaleLine, transformOrigin: "top" }}
              className="w-full h-full bg-gradient-to-b from-pink-500 via-purple-500 to-cyan-500 shadow-[0_0_15px_currentColor]"
            />
          </div>

          {/* EVENTS */}
          <div className="space-y-16 md:space-y-24">
            {TIMELINE_DATA.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>

        {/* FOOTER CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">Prêt à écrire la suite ensemble ?</h3>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link 
              href="/projects"
              className="px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-pink-500/50 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] transition-all duration-300 backdrop-blur-md font-semibold text-lg group"
            >
              Voir mes Projets <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <Link 
              href="/"
              className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
            >
              ← Retour à l&apos;accueil
            </Link>
          </div>
        </motion.div>

      </div>
    </main>
  );
}

// =============================================================
// COMPOSANT ITEM INDIVIDUEL (Pour alléger le code principal)
// =============================================================
function TimelineItem({ item, index }: { item: any, index: number }) {
  const isEven = index % 2 === 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative flex flex-col md:flex-row items-start md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
    >
      
      {/* 1. Date (Mobile: hidden, Desktop: visible side) */}
      <div className={`hidden md:block w-1/2 px-12 text-${isEven ? 'left' : 'right'}`}>
        <span className={`text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${item.color} opacity-80`}>
          {item.year}
        </span>
      </div>

      {/* 2. Central Node (The glowing orb) */}
      <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full bg-[#0a001f] border-2 border-white/20 z-10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <span className="text-xl">{item.icon}</span>
        {/* Ring animation */}
        <div className={`absolute inset-0 rounded-full animate-ping opacity-20 bg-gradient-to-r ${item.color}`} />
      </div>

      {/* 3. Card Content */}
      <div className="w-full md:w-1/2 pl-16 md:pl-0 md:px-12">
        <div className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1">
          
          {/* Mobile Year Display */}
          <span className={`md:hidden inline-block text-sm font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r ${item.color}`}>
            {item.year}
          </span>

          <h3 className="text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-pink-200 transition-colors">
            {item.title}
          </h3>
          <p className="text-sm text-gray-400 font-medium mb-4 uppercase tracking-wider">
            {item.subtitle}
          </p>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            {item.description}
          </p>

          {/* Glow effect on hover */}
          <div className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-500 -z-10`} />
        </div>
      </div>

    </motion.div>
  );
}