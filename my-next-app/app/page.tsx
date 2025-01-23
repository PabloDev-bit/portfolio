"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

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
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "#ff6ec7",
      "#9d4edd",
      "#5a189a",
      "#240046",
      "#3c096c",
      "#b5179e",
    ];
    let particles: Particle[] = [];
    let animationFrameId: number;

    function resizeCanvas() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      canvasEl.width = window.innerWidth;
      canvasEl.height = window.innerHeight;
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
          velocityY: (Math.random() - 0.5) * 0.3,
        });
      }
    }

    function drawParticles() {
      const canvasEl = canvasRef.current;
      if (!canvasEl) return;
      const ctx2d = canvasEl.getContext("2d");
      if (!ctx2d) return;

      ctx2d.clearRect(0, 0, window.innerWidth, window.innerHeight);
      for (const p of particles) {
        ctx2d.beginPath();
        ctx2d.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false);
        ctx2d.fillStyle = p.color;
        ctx2d.fill();
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

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
        !initialized ? "opacity-0" : "opacity-100"
      }`}
    />
  );
}

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen w-full font-sans text-white">
      {/* Dégradé de fond + particules */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      {/* Contenu principal */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 py-8">
        {/* 
          HERO SECTION 
          => On place le texte à gauche et la photo à droite (ou l’inverse).
        */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 max-w-5xl mx-auto">
          {/* Bloc texte */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg">
              Bonjour, je suis Pablo
            </h1>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-medium text-gray-200 mt-4">
              Développeur Web Passionné
            </h2>

            <p className="text-base sm:text-lg text-gray-300 mt-6 max-w-2xl leading-relaxed">
              J&apos;aide les entreprises à concrétiser leurs idées en créant
              des expériences numériques immersives qui allient créativité et
              technologies de pointe.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Redirigez si vous avez des pages Projets / Contact */}
              <a
                href="/projects"
                className="inline-block bg-pink-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50"
              >
                Découvrez mes projets
              </a>
              <a
                href="/contact"
                className="inline-block bg-purple-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-purple-500/50"
              >
                Contactez-moi
              </a>
            </div>
          </motion.div>

          {/* Bloc photo de profil */}
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <img
              src="/images/photoProfil.jpg"
              alt="Photo de Pablo"
              className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border-4 border-pink-500 shadow-lg object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-6 border-t border-gray-700">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  );
}
