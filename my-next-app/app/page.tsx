'use client'

import { motion } from 'framer-motion'
import React, { useEffect, useRef } from 'react'

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
  let animationFrameId: number;
  let particles: Particle[] = [];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = ['#ff6ec7', '#9d4edd', '#5a189a', '#240046', '#3c096c', '#b5179e'];

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

    function animate() {
      if (!ctx) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles.forEach(p => {
        p.x += p.velocityX;
        p.y += p.velocityY;

        if (p.x < 0 || p.x > window.innerWidth) p.velocityX *= -1;
        if (p.y < 0 || p.y > window.innerHeight) p.velocityY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx.fillStyle = p.color;
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();

    function handleResize() {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
      init();
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
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      width={typeof window !== 'undefined' ? window.innerWidth : 1920}
      height={typeof window !== 'undefined' ? window.innerHeight : 1080}
    />
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-col space-y-32 overflow-x-hidden overflow-y-auto font-sans text-white">
      {/* Arrière-plan animé (dégradé + particules) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      {/* SECTION 1: HERO / INTRO */}
      <section className="relative flex flex-col items-center justify-center min-h-screen px-6 text-center z-10">
        <motion.h1
          className="relative z-10 text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Bonjour, je suis Pablo
        </motion.h1>

        <motion.h2
          className="relative z-10 text-2xl md:text-3xl font-medium text-gray-200 mt-4"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Développeur Web Passionné
        </motion.h2>

        <motion.p
          className="relative z-10 text-lg text-gray-300 mt-6 max-w-3xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4 }}
        >
          J'aide les entreprises à donner vie à leurs idées à travers des expériences numériques immersives, associant créativité, expertise et technologies de pointe.
        </motion.p>

        <motion.div
          className="mt-10 relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6 }}
        >
          <a
            href="#projects"
            className="inline-block bg-pink-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50"
          >
            Découvrez mes projets
          </a>
        </motion.div>

        <motion.div
          className="absolute bottom-12 text-white opacity-80 hover:opacity-100 transition cursor-pointer animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <a href="#about" className="text-sm tracking-wider">
            ↓ SCROLL
          </a>
        </motion.div>
      </section>

      {/* SECTION 2: A PROPOS */}
      <section
        id="about"
        className="relative flex flex-col items-center text-center max-w-4xl px-6 space-y-8 mx-auto z-10"
      >
        <motion.h2
          className="text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          À Propos de Moi
        </motion.h2>
        <motion.p
          className="text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          Originaire de Saint-Malo et établi à Sherbrooke, Canada, je suis un développeur web mêlant design intuitif et code performant. Mon ambition ? Créer des solutions numériques qui dépassent les attentes et marquent les esprits.
        </motion.p>
        <motion.img
          src="/images/profile.jpg"
          alt="Pablo"
          className="w-40 h-40 rounded-full border-4 border-pink-500 shadow-lg transform hover:scale-105 transition-transform"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        />
      </section>

      {/* SECTION 3: COMPETENCES */}
      <section
        id="skills"
        className="relative bg-gray-800 bg-opacity-70 p-10 rounded-xl max-w-5xl mx-auto space-y-8 text-center backdrop-blur-md z-10"
      >
        <motion.h2
          className="text-4xl font-extrabold text-white"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Mes Compétences
        </motion.h2>
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col items-center">
            <i className="fab fa-react text-6xl text-blue-500"></i>
            <p className="mt-2 text-gray-300 font-medium">React</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="fab fa-js-square text-6xl text-yellow-400"></i>
            <p className="mt-2 text-gray-300 font-medium">JavaScript</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="fab fa-node text-6xl text-green-500"></i>
            <p className="mt-2 text-gray-300 font-medium">Node.js</p>
          </div>
          <div className="flex flex-col items-center">
            <i className="fab fa-css3-alt text-6xl text-blue-300"></i>
            <p className="mt-2 text-gray-300 font-medium">CSS</p>
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: PROJETS */}
      <section
        id="projects"
        className="max-w-5xl px-6 space-y-10 mx-auto z-10"
      >
        <motion.h2
          className="text-4xl font-extrabold text-white text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Mes Projets
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg hover:shadow-2xl transition shadow-pink-500/20 backdrop-blur-lg transform hover:-translate-y-2 hover:scale-[1.02]">
            <h3 className="text-xl font-bold text-white mb-2">Projet E-commerce</h3>
            <p className="text-gray-300 mb-4">Une plateforme rapide, fluide et intuitive pour booster la vente de produits.</p>
            <a href="#" className="text-pink-400 hover:underline text-sm">En savoir plus →</a>
          </div>

          <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg hover:shadow-2xl transition shadow-purple-500/20 backdrop-blur-lg transform hover:-translate-y-2 hover:scale-[1.02]">
            <h3 className="text-xl font-bold text-white mb-2">Jeu 3D</h3>
            <p className="text-gray-300 mb-4">Un univers captivant développé avec Unity et C#.</p>
            <a href="#" className="text-purple-400 hover:underline text-sm">En savoir plus →</a>
          </div>

          <div className="bg-gray-700 bg-opacity-50 p-6 rounded-lg hover:shadow-2xl transition shadow-indigo-500/20 backdrop-blur-lg transform hover:-translate-y-2 hover:scale-[1.02]">
            <h3 className="text-xl font-bold text-white mb-2">Dashboard Financier</h3>
            <p className="text-gray-300 mb-4">Une analyse financière en temps réel, précise et dynamique.</p>
            <a href="#" className="text-indigo-400 hover:underline text-sm">En savoir plus →</a>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-700 mt-20 z-10">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  )
}
