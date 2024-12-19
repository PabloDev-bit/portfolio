'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#ff6ec7', '#9d4edd', '#5a189a', '#240046', '#3c096c', '#b5179e'];
    let particles: Particle[] = [];
    let animationFrameId: number;

    function resizeCanvas() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      particles = [];
      const numberOfParticles = window.innerWidth < 768 ? 30 : 60;
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 3 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: (Math.random() - 0.5) * 0.3,
          velocityY: (Math.random() - 0.5) * 0.3
        });
      }
    }

    function drawParticles() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return; 
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();
      }
    }

    function animate() {
      for (const p of particles) {
        p.x += p.velocityX;
        p.y += p.velocityY;
        if (p.x < 0 || p.x > window.innerWidth) p.velocityX *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.velocityY *= -1;
      }
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    }

    resizeCanvas();
    init();
    drawParticles();
    setInitialized(true);
    animationFrameId = requestAnimationFrame(animate);

    function handleResize() {
      resizeCanvas();
      init();
      drawParticles();
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${!initialized ? 'opacity-0' : 'opacity-100'}`}
    />
  );
}

export default function Projects() {
  const [showWebProjects, setShowWebProjects] = useState(false);

  const webProjects = [
    {
      title: 'Site Vitrine pour Artiste',
      description: 'Un site statique moderne avec animations subtiles, conçu pour mettre en valeur le portfolio d’un artiste.',
      link: '#'
    },
    {
      title: 'Application de Recettes',
      description: 'Une application réactive en React/Next.js, avec filtrage dynamique et design responsive.',
      link: '#'
    },
    {
      title: 'Blog Tech',
      description: 'Un blog construit avec Next.js, permettant la rédaction facile d’articles et l’optimisation SEO.',
      link: '#'
    }
  ];

  return (
    <div className="relative flex flex-col overflow-x-hidden overflow-y-auto font-sans text-white min-h-screen">
      
      {/* Arrière-plan animé */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      <main className="relative z-10 flex flex-col space-y-32 px-4 md:px-6 pt-20 pb-20">

        {/* SECTION WEB */}
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center space-y-10 max-w-5xl mx-auto">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Mes Projets Web
          </motion.h1>

          <motion.p
            className="text-gray-300 max-w-3xl mx-auto leading-relaxed px-2 text-lg sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            Découvrez mes créations web, du site vitrine à l’application plus complexe, en passant par le blog complet. Cliquez ci-dessous pour afficher mes projets Web.
          </motion.p>

          <motion.button
            className="bg-pink-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            onClick={() => setShowWebProjects(!showWebProjects)}
            aria-label="Afficher ou masquer les projets Web"
          >
            {showWebProjects ? 'Masquer les Projets' : 'Afficher les Projets Web'}
          </motion.button>

          {showWebProjects && (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10"
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    staggerChildren: 0.2
                  }
                }
              }}
            >
              {webProjects.map((project, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800 bg-opacity-70 p-6 rounded-xl shadow-lg backdrop-blur-md hover:scale-[1.02] transform transition relative"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    show: { opacity: 1, y: 0 }
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 mb-4">{project.description}</p>
                  <a
                    href={project.link}
                    className="text-pink-400 hover:underline text-sm"
                    aria-label={`En savoir plus sur ${project.title}`}
                  >
                    En savoir plus →
                  </a>
                </motion.div>
              ))}
            </motion.div>
          )}

        </section>
      </main>

      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-700 z-10">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  );
}
