'use client';

import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link'; // Import du composant Link

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

function LazySection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    });
    observer.observe(ref.current);
  }, []);

  return (
    <div ref={ref}>
      {visible ? children : <div style={{ height: '200px' }} />} 
    </div>
  );
}

export default function Experience() {
  return (
    <div className="relative flex flex-col overflow-x-hidden overflow-y-auto font-sans text-white min-h-screen">

      {/* Arrière-plan animé (dégradé + particules) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      {/* Contenu principal */}
      <main className="relative z-10 flex flex-col space-y-32 px-4 md:px-6 pt-20 pb-20">

        {/* SECTION HERO EXPERIENCE */}
        <section className="relative flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
          <motion.h1
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Mon Expérience
          </motion.h1>

          <motion.p
            className="relative z-10 text-base sm:text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            Bien que je ne possède pas encore d&apos;expérience professionnelle
            directe, j&apos;ai construit un solide parcours basé sur l&apos;apprentissage
            autodidacte, la création de projets personnels, la contribution à des
            communautés en ligne et l&apos;exploration continue de nouvelles technologies.
          </motion.p>

          <motion.div
            className="relative z-10 mt-10 text-white opacity-80 hover:opacity-100 transition cursor-pointer animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            {/* Utilisation de Link au lieu de <a> */}
            <Link href="#timeline" aria-label="Aller à la section Parcours">
              ↓ SCROLL
            </Link>
          </motion.div>
        </section>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50" />

        {/* SECTION TIMELINE */}
        <section
          id="timeline"
          className="relative max-w-5xl mx-auto text-center space-y-16"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Mon Parcours d&apos;Apprentissage
          </motion.h2>

          <motion.div
            className="relative mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            {/* Ligne verticale de la timeline (visible en md+) */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-pink-500 via-purple-500 to-indigo-500 h-full" style={{height: '100%'}} />

            <div className="flex flex-col space-y-10 md:space-y-20 relative z-10">

              {/* Etape 1 */}
              <motion.div
                className="relative flex flex-col items-center md:items-start md:flex-row md:even:flex-row-reverse"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2 px-4">
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg backdrop-blur-md hover:scale-[1.02] transform transition">
                    <h3 className="text-2xl font-bold text-pink-500 mb-2">Démarrage Autodidacte</h3>
                    <p className="text-gray-300 leading-relaxed">
                      J&apos;ai commencé par explorer les bases du développement web à travers des tutoriels, des cours en ligne (Udemy, OpenClassrooms, FreeCodeCamp) et des documentations officielles.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 md:justify-center md:items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-500 border-4 border-white shadow"></div>
                </div>
              </motion.div>

              {/* Etape 2 */}
              <motion.div
                className="relative flex flex-col items-center md:items-end md:flex-row md:justify-end"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2 px-4 order-2 md:order-1">
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg backdrop-blur-md hover:scale-[1.02] transform transition">
                    <h3 className="text-2xl font-bold text-purple-500 mb-2">Projets Personnels</h3>
                    <p className="text-gray-300 leading-relaxed">
                      J&apos;ai créé de petits projets (sites statiques, petites applications React) pour mettre en pratique mes connaissances et perfectionner ma compréhension des technologies Front-End.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 md:justify-center md:items-center order-1 md:order-2">
                  <div className="w-6 h-6 rounded-full bg-purple-500 border-4 border-white shadow"></div>
                </div>
              </motion.div>

              {/* Etape 3 */}
              <motion.div
                className="relative flex flex-col items-center md:items-start md:flex-row md:even:flex-row-reverse"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2 px-4">
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg backdrop-blur-md hover:scale-[1.02] transform transition">
                    <h3 className="text-2xl font-bold text-indigo-500 mb-2">Exploration de Nouvelles Techs</h3>
                    <p className="text-gray-300 leading-relaxed">
                      Je me suis familiarisé avec Next.js, TypeScript, Tailwind CSS, et d&apos;autres outils modernes pour créer des interfaces plus complexes, plus rapides et plus fiables.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 md:justify-center md:items-center">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 border-4 border-white shadow"></div>
                </div>
              </motion.div>

              {/* Etape 4 */}
              <motion.div
                className="relative flex flex-col items-center md:items-end md:flex-row md:justify-end"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="md:w-1/2 px-4">
                  <div className="bg-gray-800 bg-opacity-80 p-6 rounded-xl shadow-lg backdrop-blur-md hover:scale-[1.02] transform transition">
                    <h3 className="text-2xl font-bold text-pink-400 mb-2">Contributions & Communauté</h3>
                    <p className="text-gray-300 leading-relaxed">
                      J&apos;ai commencé à partager mes connaissances, aider d&apos;autres développeurs sur les forums, et contribué à quelques projets open-source pour m&apos;intégrer dans la communauté tech.
                    </p>
                  </div>
                </div>
                <div className="hidden md:flex md:w-1/2 md:justify-center md:items-center">
                  <div className="w-6 h-6 rounded-full bg-pink-400 border-4 border-white shadow"></div>
                </div>
              </motion.div>

            </div>
          </motion.div>
        </section>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>

        {/* SECTION CONCLUSION */}
        <LazySection>
          <section className="max-w-3xl mx-auto text-center space-y-8">
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Un Chemin en Évolution Constante
            </motion.h2>
            <motion.p
              className="text-gray-300 leading-relaxed px-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              Mon expérience, bien que non-professionnelle, m&apos;a offert l&apos;opportunité de développer une compréhension profonde
              du web et de l&apos;écosystème JavaScript. Avec chaque projet réalisé, chaque nouvelle technologie
              apprise, je me rapproche d&apos;une expertise solide. Mon ambition est claire : continuer à apprendre,
              grandir et, un jour, mettre ces compétences au service d&apos;une entreprise.
            </motion.p>
            <motion.div
              className="mt-6"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <Link
                href="/#projects"
                className="inline-block bg-pink-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50"
                aria-label="Découvrez mes projets"
              >
                Découvrez mes Projets
              </Link>
            </motion.div>
          </section>
        </LazySection>
      </main>

      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-700 z-10">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  );
}
