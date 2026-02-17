'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaGraduationCap, FaLaptopCode, FaPlaneDeparture, FaDumbbell, FaRobot, FaCube } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[1]" />;
}

// Import de la carte Mapbox
const Map = dynamic(() => import('react-map-gl').then(mod => mod.Map), { ssr: false });
const Marker = dynamic(() => import('react-map-gl').then(mod => mod.Marker), { ssr: false });

// Token Mapbox
const MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "";

// Données réelles des projets
const realProjects = [
  {
    title: 'ANABOLIC AI',
    description: 'Agent IA local en Python pour l\'assistance au développement et workflow.',
    tech: ['Python', 'LLM', 'Local API', 'Vercel'],
    icon: <FaRobot className="text-3xl text-cyan-400" />
  },
  {
    title: 'AETHERIS Portfolio',
    description: 'Expérience web immersive 3D avec particules et shader instancing.',
    tech: ['Next.js 15', 'Three.js', 'R3F', 'WebGL'],
    icon: <FaCube className="text-3xl text-purple-400" />
  },
  {
    title: 'ProGym Tracker',
    description: 'App Full-Stack de suivi de surcharge progressive pour la musculation.',
    tech: ['Next.js', 'PostgreSQL', 'Tailwind', 'Auth'],
    icon: <FaDumbbell className="text-3xl text-pink-400" />
  }
];

export default function About() {
  // Suppression de useScroll et y ici car ils causaient l'erreur "unused var"

  return (
    <div className="relative min-h-screen w-full bg-[#02000a] text-white overflow-x-hidden selection:bg-pink-500/30 font-sans">
      
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#02000a] via-[#0a001f] to-[#050011]" />
      <ParticleBackground />

      <main className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 flex flex-col space-y-32">
        
        {/* Section Hero */}
        <section className="text-center space-y-8 relative pt-12">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_35px_rgba(168,85,247,0.5)]">
              Pablo Hernandez
            </h1>
            <div className="text-xl sm:text-2xl text-gray-300 mt-6 font-light tracking-wide h-[40px]">
              <TypeAnimation
                sequence={[
                  'Développeur Full-Stack',
                  2000,
                  'Créateur d\'Expériences 3D',
                  2000,
                  'Passionné d\'IA & Data',
                  2000,
                  'Futur Expert Big Data',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.div>
        </section>

        {/* Section Parcours & Expertises */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Carte Parcours */}
          <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-pink-500/30 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
            <div className="relative flex items-center gap-4 mb-6">
              <FaGraduationCap className="text-4xl text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.5)]" />
              <h2 className="text-3xl font-bold text-white">
                Mon Ambition
              </h2>
            </div>
            {/* CORRECTION DES APOSTROPHES ICI */}
            <p className="text-gray-300 leading-relaxed text-lg">
              Actuellement étudiant au Cégep de Sherbrooke, je me prépare à rejoindre <span className="text-pink-300 font-semibold">l&apos;IPSSI Bordeaux</span> en Décembre 2026 pour un <span className="text-purple-300 font-semibold">Mastère Big Data & IA</span>. 
              <br/><br/>
              Je cherche activement une <span className="text-indigo-300 font-semibold">alternance</span> pour appliquer ma passion du code et de l&apos;intelligence artificielle dans des projets d&apos;envergure.
            </p>
          </div>

          {/* Carte Expertises */}
          <div className="group relative p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-indigo-500/30 transition-all duration-500">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition duration-500"></div>
            <div className="relative flex items-center gap-4 mb-6">
              <FaLaptopCode className="text-4xl text-indigo-400 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]" />
              <h2 className="text-3xl font-bold text-white">
                Stack Technique
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-y-4 gap-x-2">
              {['Next.js 15 & React', 'Three.js / R3F', 'Python & IA (LLM)', 'TypeScript', 'Tailwind CSS', 'SQL & Supabase'].map((skill, i) => (
                <div key={i} className="flex items-center gap-3 group/skill">
                  <div className="h-2 w-2 bg-indigo-500 rounded-full transition-all duration-300 group-hover/skill:w-6 group-hover/skill:bg-cyan-400 shadow-[0_0_5px_rgba(99,102,241,0.8)]" />
                  <span className="text-gray-300 font-medium">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section Projets Phares */}
        <section className="space-y-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent drop-shadow-sm">
                Projets Récents
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Une sélection de mes travaux personnels alliant interactivité, performance et utilité réelle.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {realProjects.map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="group relative p-8 rounded-3xl bg-[#0d0d12] border border-white/5 overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] hover:border-white/20"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-500"></div>

                <div className="relative z-10">
                  <div className="mb-6 p-4 w-fit rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {project.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-pink-300 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm min-h-[60px]">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 text-xs font-semibold bg-white/5 border border-white/10 rounded-full text-indigo-200 group-hover:border-indigo-500/30 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center">
             <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors border-b border-transparent hover:border-pink-500 pb-1"
            >
              Voir tous les projets <span className="text-pink-500">→</span>
            </Link>
          </div>
        </section>

        {/* Section Mobilité / Carte */}
        <section className="space-y-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-3 mb-4 justify-center">
                <FaPlaneDeparture className="text-3xl text-cyan-400" />
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-sm">
                Mobilité Internationale
              </span>
            </h2>
            <p className="text-gray-400 mt-4">
              De Sherbrooke (Canada) à Bordeaux (France). Prêt pour une nouvelle aventure fin 2026.
            </p>
          </motion.div>

          <div className="relative h-[500px] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
            <Map
              initialViewState={{
                longitude: -35, 
                latitude: 46,
                zoom: 2.5
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
              attributionControl={false}
            >
                <Marker longitude={-71.898} latitude={45.404} anchor="bottom">
                    <div className="relative flex flex-col items-center group cursor-pointer">
                        <div className="w-4 h-4 bg-pink-500 rounded-full shadow-[0_0_15px_rgba(236,72,153,1)] animate-pulse" />
                        <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            Actuel: Sherbrooke
                        </div>
                    </div>
                </Marker>

                <Marker longitude={-0.579} latitude={44.837} anchor="bottom">
                     <div className="relative flex flex-col items-center group cursor-pointer">
                        <div className="w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_rgba(34,211,238,1)]" />
                        <div className="mt-2 px-3 py-1 bg-black/80 backdrop-blur-md rounded-lg border border-white/20 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                            Futur: Bordeaux (IPSSI)
                        </div>
                    </div>
                </Marker>
            </Map>
            
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#02000a] via-transparent to-transparent opacity-80" />
          </div>
        </section>

      </main>
    </div>
  );
}