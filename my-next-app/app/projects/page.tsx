'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

/* ---------------------------------------
   Types
---------------------------------------- */
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
  alpha: number;
}

interface Project {
  title: string;
  description: string;
  link?: string;
  images?: { src: string; alt: string }[];
  detailedDescription?: string;
}

/* ---------------------------------------
   Background particules amélioré
---------------------------------------- */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [initialized, setInitialized] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['rgba(255,110,199,0.8)', 'rgba(157,78,221,0.8)', 'rgba(90,24,154,0.8)'];
    let particles: Particle[] = [];
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 0.0002 : 0.0003;
      const numberOfParticles = Math.floor(window.innerWidth * window.innerHeight * density);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: (Math.random() - 0.5) * 0.1,
          velocityY: (Math.random() - 0.5) * 0.1,
          alpha: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        const dx = p.x - mousePos.current.x;
        const dy = p.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = -1000 / distance;
        
        if (distance < 150) {
          p.x += force * (dx / distance);
          p.y += force * (dy / distance);
        }

        p.x += p.velocityX;
        p.y += p.velocityY;

        if (p.x < 0 || p.x > canvas.width) p.velocityX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.velocityY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', () => {
      resizeCanvas();
      init();
    });

    resizeCanvas();
    init();
    animate();
    setInitialized(true);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ${
        initialized ? 'opacity-100' : 'opacity-0'
      }`}
    />
  );
}

/* ---------------------------------------
   Composant principal Projects
---------------------------------------- */
export default function Projects() {
  const [activeTab, setActiveTab] = useState<'web' | 'ia'>('web');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const webProjects: Project[] = [
    {
      title: 'CostCrafter - Prototype de comparaison de coûts de la vie',
      description: "Application expérimentale de comparaison urbaine",
      link: "https://costcrafters.vercel.app",
      detailedDescription: `Technologies utilisées :
- React & TypeScript
- Mapbox
- RapidAPI (GeoDB + Numbeo)
- Recharts, Lucide Icons`,
    },
  ];

  const iaProjects: Project[] = [
    {
      title: 'Chatbot IA avec Hugging Face',
      description: `Chatbot conversationnel avec FastAPI et Transformers`,
      images: [
        { src: '/images/code_ia_hugging_face.webp.png', alt: 'Interface du chatbot' },
      ],
    },
  ];

  const getActiveProjects = (): Project[] =>
    activeTab === 'web' ? webProjects : iaProjects;

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-[#0f0720] to-[#1a0933]" />
      <ParticleBackground />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <section className="text-center mb-16">
          <motion.h1
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Mes Réalisations
          </motion.h1>
          <motion.p
            className="text-gray-300 mt-6 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Exploration de mes projets phares où technologie et créativité se rencontrent
          </motion.p>
        </section>

        <div className="flex justify-center gap-4 mb-12">
          {(['web', 'ia'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {tab === 'web' ? 'Projets Web' : 'Projets IA'}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {getActiveProjects().map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="group relative bg-gray-900/50 rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-pink-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-semibold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-6">{project.description}</p>
                
                <button
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex items-center gap-2 text-pink-400 hover:text-pink-300 transition-colors"
                >
                  Découvrir le projet
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {selectedProject && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-white/10"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                >
                  ✕
                </button>

                <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  {selectedProject.title}
                </h2>

                <div className="space-y-6">
                  {selectedProject.images && (
                    <div className="grid gap-4">
                      {selectedProject.images.map((img, i) => (
                        <motion.div
                          key={i}
                          className="relative rounded-xl overflow-hidden border border-white/10"
                          whileHover={{ scale: 1.01 }}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-64 object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </motion.div>
                      ))}
                    </div>
                  )}

                  <div className="prose prose-invert text-gray-300">
                    {selectedProject.detailedDescription?.split('\n').map((line, i) => (
                      <p key={i} className="mb-4 last:mb-0">
                        {line.startsWith('- ') ? (
                          <span className="flex items-center">
                            <span className="text-pink-400 mr-2">▹</span>
                            {line.slice(2)}
                          </span>
                        ) : (
                          line
                        )}
                      </p>
                    ))}
                  </div>

                  {selectedProject.link && (
                    <a
                      href={selectedProject.link}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-600 to-purple-600 rounded-full hover:shadow-lg transition-all"
                      target="_blank"
                      rel="noopener"
                    >
                      Visiter le projet
                      <FiArrowUpRight className="text-lg" />
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}