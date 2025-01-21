'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------------------------------
   Types (optionnels)
---------------------------------------- */
interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
}

interface Project {
  title: string;
  description: string;
  link?: string;
  images?: { src: string; alt: string }[];
  detailedDescription?: string;
}

/* ---------------------------------------
   Background particules
---------------------------------------- */
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
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
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
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
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
      className={`fixed top-0 left-0 w-full h-full pointer-events-none z-0 transition-opacity duration-500 ${
        !initialized ? 'opacity-0' : 'opacity-100'
      }`}
    />
  );
}

/* ---------------------------------------
   Composant principal Projects
---------------------------------------- */
export default function Projects() {
  const [activeTab, setActiveTab] = useState<'web' | 'ia'>('web');

  // Au lieu de "expandedProjectIndex", on gère un "selectedProject"
  // qui va déclencher l'ouverture d'une modale plein écran.
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Liste de projets Web (1 seul : CostCrafter)
  const webProjects: Project[] = [
    {
      title: 'CostCrafter - Prototype de comparaison de coûts de la vie',
      description:
        "Une application expérimentale permettant de comparer plusieurs villes selon leurs coûts (logement, transport, etc.).",
        link: "https://costcrafters.vercel.app",
      detailedDescription: `
  Technologies utilisées :
- React & TypeScript
- Mapbox (pour la carte interactive)
- RapidAPI (GeoDB + Numbeo)
- Recharts, Lucide Icons, etc.

  Limites :
- API gratuite ⇒ données parfois incomplètes ou approximatives
- Fallback si l’API échoue
- Coordonnées manquantes pour certaines villes
- Encore en phase de prototypage

  Fonctionnalités :
- Recherche de villes par nom
- Comparaison d'indicateurs (Logement, Transport, etc.)
- Carte interactive personnalisée
- Système de villes similaires
- Graphiques comparatifs



Malgré ces limitations, CostCrafter démontre une bonne intégration de React, TypeScript et l’usage d’APIs tierces.
      `,
    },
  ];

  // Éventuellement, un projet IA (Chatbot).
  const iaProjects: Project[] = [
    {
      title: 'Chatbot IA avec Hugging Face',
      description: `Développement d'un chatbot conversationnel avec FastAPI (backend),
React (frontend) et modèles Transformers. Exploration de DialoGPT, etc.`,
      link: '#',
      images: [
        { src: '/images/code_ia_hugging_face.webp.png', alt: 'Interface du chatbot' },
        { src: '/images/chatbot2.png', alt: 'Exemple de réponse générée' },
      ],
      detailedDescription:
        'Version complète : gestion de sessions, quantization pour CPU, connexion APIs externes, etc.',
    },
  ];

  // On récupère les projets selon l’onglet
  const getActiveProjects = (): Project[] =>
    activeTab === 'web' ? webProjects : iaProjects;

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white">
      {/* Fond dégradé + particules */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      {/* Contenu principal */}
      <main className="relative z-10 w-full max-w-screen-xl mx-auto px-4 py-10 flex flex-col">
        {/* Titre / Intro */}
        <section className="text-center mb-10 pt-24">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 drop-shadow-lg"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Mes Projets
          </motion.h1>
          <motion.p
            className="text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed text-lg sm:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
          >
            Voici quelques-unes de mes réalisations Web et IA.
            Cliquez sur un projet pour en savoir plus.
          </motion.p>
        </section>

        {/* Onglets Web / IA */}
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === 'web'
                ? 'bg-pink-600 hover:bg-pink-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('web')}
          >
            Projets Web
          </button>
          <button
            className={`px-6 py-2 rounded-full font-semibold transition-colors ${
              activeTab === 'ia'
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-gray-700 hover:bg-gray-600'
            }`}
            onClick={() => setActiveTab('ia')}
          >
            Projets IA
          </button>
        </div>

        {/* Grille de projets */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getActiveProjects().map((project, index) => (
              <motion.div
                key={index}
                layout
                className="bg-gray-800 bg-opacity-75 rounded-xl p-6 shadow-md backdrop-blur-sm transform transition relative hover:scale-[1.01]"
              >
                <h3 className="text-xl font-bold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-300 whitespace-pre-line">
                  {project.description}
                </p>

                {/* Bouton pour OUVRIR la modale plein écran */}
                <div className="mt-3">
                  <button
                    onClick={() => setSelectedProject(project)}
                    className="text-pink-400 underline text-sm hover:text-pink-300"
                  >
                    Voir le projet →
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-6 border-t border-gray-700 mt-auto">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>

      {/* -------------------------------------------------------
          MODALE PLEIN ÉCRAN pour le projet sélectionné
      ------------------------------------------------------- */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Conteneur du contenu */}
            <motion.div
              className="relative w-full max-w-5xl bg-gray-900 bg-opacity-90 p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              {/* Bouton Fermer */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-gray-300 hover:text-white"
              >
                ✕
              </button>

              {/* Titre */}
              <h2 className="text-2xl font-bold mb-2 text-pink-400">
                {selectedProject.title}
              </h2>

              {/* Description simple */}
              <p className="text-gray-300 mb-4">
                {selectedProject.description}
              </p>

              {/* Description détaillée (markdown-like) */}
              {selectedProject.detailedDescription && (
                <div className="text-gray-300 text-sm whitespace-pre-line mb-4">
                  {selectedProject.detailedDescription}
                </div>
              )}

              {/* Images, si présentes */}
              {selectedProject.images && selectedProject.images.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {selectedProject.images.map((img, i) => (
                    <motion.div
                      key={i}
                      className="overflow-hidden rounded-lg border border-gray-700"
                      whileHover={{ scale: 1.01 }}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-auto"
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  className="text-indigo-400 hover:underline text-sm"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visiter le projet complet
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
