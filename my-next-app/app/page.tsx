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
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

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

export default function Home() {
  return (
    <div className="relative flex flex-col overflow-x-hidden overflow-y-auto font-sans text-white">

      {/* Arrière-plan animé (dégradé + particules) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      {/* Contenu principal */}
      <main className="relative z-10 flex flex-col space-y-32 px-4 md:px-6">

        {/* SECTION 1: HERO / INTRO */}
        <section className="relative flex flex-col items-center justify-center min-h-screen text-center">
          <motion.h1
            className="relative z-10 text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Bonjour, je suis Pablo
          </motion.h1>

          <motion.h2
            className="relative z-10 text-xl sm:text-2xl md:text-3xl font-medium text-gray-200 mt-4"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Développeur Web Passionné
          </motion.h2>

          <motion.p
            className="relative z-10 text-base sm:text-lg text-gray-300 mt-6 max-w-3xl leading-relaxed mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4 }}
          >
            J&apos;aide les entreprises à donner vie à leurs idées à travers des expériences numériques immersives, associant créativité, expertise et technologies de pointe.
          </motion.p>

          <motion.div
            className="mt-10 relative z-10 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
          >
            <a
              href="#projects"
              className="inline-block bg-pink-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50"
              aria-label="Découvrez mes projets"
            >
              Découvrez mes projets
            </a>
            <a
              href="#contact"
              className="inline-block bg-purple-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-purple-500/50"
              aria-label="Me contacter"
            >
              Contactez-moi
            </a>
          </motion.div>

          <motion.div
            className="absolute bottom-12 text-white opacity-80 hover:opacity-100 transition cursor-pointer animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
          >
            <a href="#about" className="text-sm tracking-wider" aria-label="Aller à la section À Propos">
              ↓ SCROLL
            </a>
          </motion.div>
        </section>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>

        {/* SECTION 2: A PROPOS */}
        <section
          id="about"
          className="relative flex flex-col items-center text-center max-w-4xl mx-auto space-y-8"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            À Propos de Moi
          </motion.h2>
          <motion.p
            className="text-gray-300 leading-relaxed max-w-2xl mx-auto px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Originaire de Saint-Malo et établi à Sherbrooke, Canada, je suis un développeur web mêlant design intuitif et code performant. Mon ambition ? Créer des solutions numériques qui dépassent les attentes et marquent les esprits.
          </motion.p>
          <motion.img
            src="/images/profile.jpg"
            alt="Photo de Pablo"
            className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-pink-500 shadow-lg transform hover:scale-105 transition-transform"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          />
        </section>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>

        {/* SECTION 3: COMPETENCES */}
        <section
          id="skills"
          className="relative bg-gray-800 bg-opacity-70 p-6 sm:p-10 rounded-xl max-w-5xl mx-auto space-y-8 text-center backdrop-blur-md"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white"
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
              <i className="fab fa-react text-5xl sm:text-6xl text-blue-500" aria-hidden="true"></i>
              <p className="mt-2 text-gray-300 font-medium">React</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fab fa-js-square text-5xl sm:text-6xl text-yellow-400" aria-hidden="true"></i>
              <p className="mt-2 text-gray-300 font-medium">JavaScript</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fab fa-node text-5xl sm:text-6xl text-green-500" aria-hidden="true"></i>
              <p className="mt-2 text-gray-300 font-medium">Node.js</p>
            </div>
            <div className="flex flex-col items-center">
              <i className="fab fa-css3-alt text-5xl sm:text-6xl text-blue-300" aria-hidden="true"></i>
              <p className="mt-2 text-gray-300 font-medium">CSS</p>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>

        {/* SECTION 4: PROJETS */}
        <section
          id="projects"
          className="max-w-5xl px-4 sm:px-6 space-y-10 mx-auto"
        >
          <motion.h2
            className="text-3xl sm:text-4xl font-extrabold text-white text-center"
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
            <div className="bg-gray-700 bg-opacity-50 p-4 sm:p-6 rounded-lg hover:shadow-2xl transition shadow-pink-500/20 backdrop-blur-lg transform hover:-translate-y-2 hover:scale-[1.02]">
              <h3 className="text-xl font-bold text-white mb-2">Projet E-commerce</h3>
              <p className="text-gray-300 mb-4">Une plateforme rapide, fluide et intuitive pour booster la vente de produits.</p>
              <a href="#" className="text-pink-400 hover:underline text-sm" aria-label="En savoir plus sur le projet E-commerce">En savoir plus →</a>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-4 sm:p-6 rounded-lg hover:shadow-2xl transition shadow-purple-500/20 backdrop-blur-lg transform hover:-translate-y-2 hover:scale-[1.02]">
              <h3 className="text-xl font-bold text-white mb-2">Jeu 3D</h3>
              <p className="text-gray-300 mb-4">Un univers captivant développé avec Unity et C#.</p>
              <a href="#" className="text-purple-400 hover:underline text-sm" aria-label="En savoir plus sur le jeu 3D">En savoir plus →</a>
            </div>

            <div className="bg-gray-700 bg-opacity-50 p-4 sm:p-6 rounded-lg hover:shadow-2xl transition shadow-indigo-500/20 backdrop-blur-lg transform hover:-translate-y-2 hover:scale-[1.02]">
              <h3 className="text-xl font-bold text-white mb-2">Dashboard Financier</h3>
              <p className="text-gray-300 mb-4">Une analyse financière en temps réel, précise et dynamique.</p>
              <a href="#" className="text-indigo-400 hover:underline text-sm" aria-label="En savoir plus sur le dashboard financier">En savoir plus →</a>
            </div>
          </motion.div>
        </section>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>

        {/* SECTION TEMOIGNAGES (LAZY LOADED) */}
        <LazySection>
          <section
            id="testimonials"
            className="max-w-5xl px-4 sm:px-6 space-y-10 mx-auto"
          >
            <motion.h2
              className="text-3xl sm:text-4xl font-extrabold text-white text-center"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Témoignages
            </motion.h2>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-gray-700 bg-opacity-50 p-4 sm:p-6 rounded-lg text-center backdrop-blur-lg">
                <p className="text-gray-300 italic mb-4">&quot;Pablo a transformé notre vision en un produit numérique performant et magnifique.&quot;</p>
                <p className="text-pink-400 font-semibold">- Client A</p>
              </div>

              <div className="bg-gray-700 bg-opacity-50 p-4 sm:p-6 rounded-lg text-center backdrop-blur-lg">
                <p className="text-gray-300 italic mb-4">&quot;Une collaboration fluide et des résultats au-delà de nos espérances.&quot;</p>
                <p className="text-purple-400 font-semibold">- Client B</p>
              </div>

              <div className="bg-gray-700 bg-opacity-50 p-4 sm:p-6 rounded-lg text-center backdrop-blur-lg">
                <p className="text-gray-300 italic mb-4">&quot;Un professionnalisme irréprochable, un code propre et une UX au top.&quot;</p>
                <p className="text-indigo-400 font-semibold">- Client C</p>
              </div>
            </motion.div>
          </section>
        </LazySection>

        <div className="mx-auto w-24 h-px bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 opacity-50"></div>

        {/* SECTION CONTACT (CTA) */}
        <section
          id="contact"
          className="max-w-4xl px-4 sm:px-6 mx-auto space-y-8"
          aria-labelledby="contact-heading"
        >
          <motion.h2
            id="contact-heading"
            className="text-3xl sm:text-4xl font-extrabold text-white text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Contactez-moi
          </motion.h2>
          <motion.p
            className="text-gray-300 text-center max-w-md mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Prêt à transformer vos idées en réalités digitales ? Remplissez le formulaire ou envoyez-moi un message.
          </motion.p>
          <motion.form
            className="flex flex-col space-y-4 max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <input
              type="text"
              placeholder="Votre nom"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Votre nom"
            />
            <input
              type="email"
              placeholder="Votre email"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Votre email"
            />
            <textarea
              placeholder="Votre message"
              className="px-4 py-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
              aria-label="Votre message"
            />
            <button
              type="submit"
              className="bg-pink-600 px-8 py-3 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50"
              aria-label="Envoyer le message"
            >
              Envoyer
            </button>
          </motion.form>
        </section>
      </main>

      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-700 mt-20 z-10">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  );
}
