'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

function AIParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<ParticleData[]>([]);
  const animationFrameId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const numParticles = 40;

    function init() {
      particles.current = [];
      for (let i = 0; i < numParticles; i++) {
        particles.current.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
        });
      }
    }

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.current.length; i++) {
        const p = particles.current[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > window.innerWidth) p.vx *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, 3, 0, Math.PI * 2, false);
        ctx.fillStyle = '#ff6ec7';
        ctx.fill();

        for (let j = i + 1; j < particles.current.length; j++) {
          const p2 = particles.current[j];
          const dist = Math.sqrt((p.x - p2.x) ** 2 + (p.y - p2.y) ** 2);
          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = 'rgba(255,255,255,0.1)';
            ctx.stroke();
          }
        }
      }

      animationFrameId.current = requestAnimationFrame(animate);
    }

    function handleResize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    }

    window.addEventListener('resize', handleResize);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
}

export default function SkillsPage() {
  return (
    <motion.div 
      className="relative font-sans text-white overflow-x-hidden overflow-y-auto"
      initial={{opacity:0}}
      animate={{opacity:1}}
      transition={{duration:0.8}}
    >
      {/* Section HERO */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 px-6 text-center">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
          initial={{opacity:0,y:-50}}
          animate={{opacity:1,y:0}}
          transition={{duration:1}}
        >
          Mes Compétences
        </motion.h1>
        <motion.p
          className="mt-6 text-gray-300 max-w-3xl mx-auto leading-relaxed"
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          transition={{duration:1.2}}
        >
          Explorez mes différentes expertises, chacune présentée dans un univers visuel unique reflétant son essence technologique.
        </motion.p>
      </section>

      {/* UNIVERSE 1: Web Development */}
      <section className="relative py-20 px-6 bg-[#141414]">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_#222_0%,_#000_100%)] opacity-90"></div>

        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8}}
          viewport={{ once: true }}
        >
          <div className="relative inline-block">
            <span className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 blur-md opacity-30 rounded-lg"></span>
            <h2 className="relative text-4xl font-extrabold text-white">Web Development</h2>
          </div>
          <p className="text-gray-200 mt-4 max-w-2xl mx-auto">
            Créer des expériences web modernes et performantes grâce à React, Next.js, Node.js, TypeScript, Tailwind CSS, GraphQL...
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10"
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.2}}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md hover:scale-105 transform transition">
            <h3 className="text-xl font-bold text-pink-400">React</h3>
            <p className="text-gray-200 mt-2 text-sm">Interfaces dynamiques</p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md hover:scale-105 transform transition">
            <h3 className="text-xl font-bold text-purple-400">Next.js</h3>
            <p className="text-gray-200 mt-2 text-sm">SSR & SSG pour React</p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md hover:scale-105 transform transition">
            <h3 className="text-xl font-bold text-blue-400">TypeScript</h3>
            <p className="text-gray-200 mt-2 text-sm">Typage statique</p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md hover:scale-105 transform transition">
            <h3 className="text-xl font-bold text-green-400">Node.js</h3>
            <p className="text-gray-200 mt-2 text-sm">Back-end JS performant</p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md hover:scale-105 transform transition">
            <h3 className="text-xl font-bold text-cyan-400">Tailwind CSS</h3>
            <p className="text-gray-200 mt-2 text-sm">CSS utility-first</p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-6 rounded-lg backdrop-blur-md hover:scale-105 transform transition">
            <h3 className="text-xl font-bold text-pink-300">GraphQL</h3>
            <p className="text-gray-200 mt-2 text-sm">APIs flexibles</p>
          </div>
        </motion.div>
      </section>

      {/* UNIVERSE 2: C++ / C# */}
      <section className="relative py-20 px-6 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[conic-gradient(from_var(--start,_deg),_#333,_#000)] opacity-80"></div>
        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8}}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-white">Langages Systèmes : C++ & C#</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Maîtrise des langages bas-niveau pour des applications performantes, moteurs de jeu, services robustes.
          </p>
        </motion.div>
        <div className="absolute inset-0 pointer-events-none bg-[url('/images/hex-grid.png')] bg-center bg-cover opacity-10"></div>
        <motion.div
          className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.2}}
          viewport={{ once: true }}
        >
          <div className="bg-gray-800 bg-opacity-60 p-8 rounded-lg backdrop-blur-md hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-blue-500">C++</h3>
            <p className="text-gray-200 mt-4 leading-relaxed">
              Performances, contrôle mémoire, moteurs de jeux, librairies natives.
            </p>
          </div>
          <div className="bg-gray-800 bg-opacity-60 p-8 rounded-lg backdrop-blur-md hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-green-500">C#</h3>
            <p className="text-gray-200 mt-4 leading-relaxed">
              Framework .NET, Unity, applications desktop.
            </p>
          </div>
        </motion.div>
      </section>

      {/* UNIVERSE 3: Machine Learning (Python & TensorFlow) */}
      <section className="relative py-20 px-6 bg-[#1e0034] overflow-hidden">
        <AIParticlesBackground />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-black opacity-80"></div>

        <motion.div
          className="max-w-5xl mx-auto text-center relative z-10"
          initial={{opacity:0,y:40}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8}}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-extrabold text-white">Machine Learning & IA</h2>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Concevoir, entraîner et déployer des modèles ML avec Python, TensorFlow.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
          initial={{opacity:0,y:20}}
          whileInView={{opacity:1,y:0}}
          transition={{duration:0.8,delay:0.2}}
          viewport={{ once: true }}
        >
          <div className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-blur-md hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-pink-400">Python</h3>
            <p className="text-gray-200 mt-4">
              Data science, prototypage rapide, écosystème riche.
            </p>
          </div>
          <div className="bg-black bg-opacity-40 p-8 rounded-lg backdrop-blur-md hover:scale-105 transition transform">
            <h3 className="text-2xl font-bold text-yellow-400">TensorFlow</h3>
            <p className="text-gray-200 mt-4">
              Réseaux de neurones, NLP, vision par ordinateur, déploiement de modèles.
            </p>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}
