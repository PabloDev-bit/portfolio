'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/* ---------------------------------------
   Types de base (optionnels)
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
  detailedDescription?: string; // Pour le contenu "étendu"
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
          velocityY: (Math.random() - 0.5) * 0.3
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
  // Gestion de l’onglet actif
  const [activeTab, setActiveTab] = useState<'web' | 'ia'>('web');

  // Pour gérer l’expansion des cartes (index du projet agrandi)
  const [expandedProjectIndex, setExpandedProjectIndex] = useState<number | null>(null);

  // Projets Web
  const webProjects: Project[] = [
    {
      title: 'Site Vitrine pour Artiste',
      description:
        'Un site statique moderne avec animations subtiles, conçu pour mettre en valeur le portfolio d’un artiste.',
      link: '#',
      detailedDescription:
        'Voici une description plus complète du site vitrine. On peut y intégrer des fonctionnalités comme un carrousel d’images, des animations plus poussées, et une mise en page responsive avancée.'
    },
    {
      title: 'Application de Recettes',
      description:
        'Une application réactive en React/Next.js, avec filtrage dynamique et design responsive.',
      link: '#',
      detailedDescription:
        'Version approfondie : l’application inclut une base de données, la possibilité d’ajouter des recettes, de filtrer par ingrédient, etc.'
    },
    {
      title: 'Blog Tech',
      description:
        'Un blog construit avec Next.js, permettant la rédaction facile d’articles et l’optimisation SEO.',
      link: '#',
      detailedDescription:
        'Dans la version détaillée, le blog propose un système de commentaires, un support multilingue, et un design personalisable.'
    }
  ];

  // Projets IA
  const iaProjects: Project[] = [
    {
      title: 'Chatbot IA avec Hugging Face',
      description: `Développement d'un chatbot conversationnel utilisant FastAPI pour le backend,
React.js pour le frontend, et les modèles Transformers de Hugging Face.
Exploration de plusieurs modèles tels que DialoGPT, OpenAssistant et DeepSeek-V3.`,
      link: '#',
      images: [
        { src: '/images/code_ia_hugging_face.webp.png', alt: 'Interface du chatbot' },
        { src: '/images/chatbot2.png', alt: 'Exemple de réponse générée' }
      ],
      detailedDescription:
        'Dans sa version complète, ce chatbot gère les tokens, la gestion de sessions, et la connexion à des APIs externes. On peut aussi optimiser le modèle via du quantization pour les CPU limités.'
    }
  ];

  // Récupérer les projets correspondant à l’onglet
  const getActiveProjects = (): Project[] =>
    activeTab === 'web' ? webProjects : iaProjects;

  // Handler pour toggler l’expansion d’une carte
  const toggleExpand = (index: number) => {
    // Si on reclique sur la même, on referme
    setExpandedProjectIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="relative min-h-screen flex flex-col font-sans text-white">
      {/* Fond gradient + particules */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900" />
      <ParticleBackground />

      {/* Contenu principal */}
      <main className="relative z-10 w-full max-w-screen-xl mx-auto px-4 py-10 flex flex-col">
        {/* Section Hero */}
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
            Naviguez entre les onglets pour découvrir mes différents projets.
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

        {/* Liste des projets (grille) */}
        <AnimatePresence mode="wait">
          <motion.section
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {getActiveProjects().map((project, index) => {
              // Savoir si la carte est ouverte
              const isExpanded = expandedProjectIndex === index;

              return (
                // Pour animer l’expansion en douceur, on utilise "layout"
                <motion.div
                  key={index}
                  layout
                  className="bg-gray-800 bg-opacity-75 rounded-xl p-6 shadow-md backdrop-blur-sm transform transition relative cursor-pointer hover:scale-[1.01]"
                >
                  {/* Titre */}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {project.title}
                  </h3>

                  {/* Description brève */}
                  <p className="text-gray-300 whitespace-pre-line">
                    {project.description}
                  </p>

                  {/* Bouton "Voir le projet" */}
                  <div className="mt-3">
                    <button
                      onClick={() => toggleExpand(index)}
                      className="text-pink-400 underline text-sm hover:text-pink-300"
                    >
                      {isExpanded ? 'Fermer le projet' : 'Voir le projet →'}
                    </button>
                  </div>

                  {/* Si la carte est déployée, afficher le contenu supplémentaire */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        key="expanded"
                        layout
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-4 overflow-hidden"
                      >
                        {/* Description plus détaillée */}
                        {project.detailedDescription && (
                          <p className="text-gray-300 text-sm whitespace-pre-line mb-4">
                            {project.detailedDescription}
                          </p>
                        )}

                        {/* Images éventuelles */}
                        {project.images && project.images.length > 0 && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                            {project.images.map((img, i) => (
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

                        {/* Lien externe si présent */}
                        {project.link && (
                          <a
                            href={project.link}
                            className="text-indigo-400 hover:underline text-sm"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Visiter le projet complet
                          </a>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </motion.section>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="relative z-10 text-center text-gray-400 text-sm py-6 border-t border-gray-700 mt-auto">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  );
}
