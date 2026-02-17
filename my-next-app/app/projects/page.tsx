"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaRobot, FaLaptopCode } from "react-icons/fa";

// =============================================================
// COMPOSANT DE FOND (Particules)
// =============================================================
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
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      stars.length = 0;
      
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 15000); 

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
      
      const gradient = ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2, 0, window.innerWidth/2, window.innerHeight/2, window.innerWidth);
      gradient.addColorStop(0, "rgba(20, 0, 50, 0)");
      gradient.addColorStop(1, "rgba(5, 0, 20, 0.3)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0,0, window.innerWidth, window.innerHeight);

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        
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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[0]" />;
}

/**
 * --------------------------------------------------
 * Types & Data
 * --------------------------------------------------
 */

type ProjectTab = "web" | "ia";

interface Project {
  title: string;
  description: string;
  link: string;
  github?: string;
  image: string; 
  stack: string[];
  type: ProjectTab;
}

// ICI : J'AI REMIS TES CHEMINS D'IMAGES LOCAUX (/images/...)
const PROJECTS: Project[] = [
  {
    title: "MHNet – Premium Cleaning",
    description:
      "Site vitrine ultra-rapide pour une entreprise suisse de nettoyage textile haut de gamme. Design épuré, animations fluides et SEO optimisé.",
    link: "https://site-web-mhnet.vercel.app/",
    image: "/images/mhnet.png", // <--- Ton image
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    type: "web",
  },
  {
    title: "CostCrafter",
    description:
      "Comparateur de coût de la vie pour expatriés. Analyse interactive des loyers, transports et alimentation dans différentes villes du monde.",
    link: "https://costcrafters.vercel.app/",
    image: "/images/costcrafter.png", // <--- Ton image
    stack: ["React", "Firebase", "Recharts"],
    type: "web",
  },
  {
    title: "Finance Forecast Hub",
    description:
      "Dashboard financier en temps réel connectant l'API Yahoo Finance pour visualiser les tendances boursières et indicateurs économiques.",
    link: "https://finance-forecast-hub.vercel.app/",
    image: "/images/finance.jpg", // <--- Ton image
    stack: ["Next.js", "API Yahoo", "Data Viz"],
    type: "web",
  },
  {
    title: "ANABOLIC AI",
    description:
      "Agent IA local développé en Python. Capable d'assister dans le workflow de développement et d'exécuter des tâches complexes sans dépendance cloud.",
    link: "#", 
    github: "https://github.com/PabloDev-bit",
    // J'ai laissé une image par défaut ici car tu n'avais pas spécifié d'image pour Anabolic
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1000&auto=format&fit=crop", 
    stack: ["Python", "LLM", "Local API", "Agentic"],
    type: "ia",
  },
];

export default function ProjectsPage() {
  const [tab, setTab] = useState<ProjectTab>("web");

  const filtered = PROJECTS.filter((p) => p.type === tab);

  return (
    <div className="relative min-h-screen w-full bg-[#02000a] text-white overflow-x-hidden selection:bg-pink-500/30 font-sans">
      
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#02000a] via-[#0a001f] to-[#050011]" />
      <ParticleBackground />

      <main className="relative z-10 container mx-auto px-4 md:px-8 py-24 md:py-32">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]"
          >
            Mes Réalisations
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-300 text-lg leading-relaxed"
          >
            Une collection de projets où la <span className="text-pink-400">technique</span> rencontre la <span className="text-cyan-400">créativité</span>.
          </motion.p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-white/5 p-1 border border-white/10 backdrop-blur-md">
            {[
              { id: "web", label: "Développement Web", icon: <FaLaptopCode /> },
              { id: "ia", label: "Intelligence Artificielle", icon: <FaRobot /> },
            ].map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => setTab(id as ProjectTab)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  tab === id 
                    ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_0_20px_rgba(236,72,153,0.4)]" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <span className="text-lg">{icon}</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-7xl"
          >
            {filtered.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </motion.div>
        </AnimatePresence>

      </main>
    </div>
  );
}

// =============================================================
// CARTE PROJET
// =============================================================
function ProjectCard({ project, index }: { project: Project, index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="group relative flex flex-col rounded-3xl bg-[#0d0d12] border border-white/10 overflow-hidden hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] hover:border-purple-500/50 transition-all duration-500"
    >
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d12] to-transparent z-10" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover transform group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Type Badge */}
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-xs font-bold text-white uppercase tracking-wider">
          {project.type === 'web' ? 'Web App' : 'AI Agent'}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow p-6 relative z-20">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 text-xs font-medium rounded-md bg-white/5 text-purple-200 border border-white/5 group-hover:border-purple-500/30 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
          <Link
            href={project.link}
            target="_blank"
            className="flex items-center gap-2 text-sm font-semibold text-white hover:text-pink-400 transition-colors"
          >
            <FaExternalLinkAlt /> Voir le projet
          </Link>
          {project.github && (
            <Link
              href={project.github}
              target="_blank"
              className="flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-white transition-colors ml-auto"
            >
              <FaGithub className="text-lg" /> Code
            </Link>
          )}
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-20 blur-md transition duration-500 -z-10" />
    </motion.div>
  );
}