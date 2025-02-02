'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

/* ---------------------------------------
   Types et constantes
---------------------------------------- */
type ProjectTab = 'web' | 'ia';

interface ImageType {
  src: string;
  alt: string;
}

interface Project {
  title: string;
  description: string;
  link?: string;
  images?: ImageType[];
  detailedDescription: string;
}

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95 },
  hover: { scale: 1.02, rotate: -0.5 },
  tap: { scale: 0.98 },
};

/* ---------------------------------------
   Composant PhotoSection
   Section photo avec animations innovantes
---------------------------------------- */
const PhotoSection = ({ images }: { images: ImageType[] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { staggerChildren: 0.2 } }}
      className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
    >
      {images.map((image, idx) => (
        <motion.img
          key={idx}
          src={image.src}
          alt={image.alt}
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ delay: idx * 0.2, type: 'spring', stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.05, rotate: -2 }}
          className="w-full rounded-md shadow-lg"
        />
      ))}
    </motion.div>
  );
};

/* ---------------------------------------
   Composant ParticleBackground amélioré
---------------------------------------- */
const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    let frameId: number;

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 100 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 3 + 1,
        color: `rgba(255,${Math.random() * 100 + 155},${Math.random() * 100 + 155},0.8)`,
        velocity: {
          x: (Math.random() - 0.5) * 0.2,
          y: (Math.random() - 0.5) * 0.2,
        },
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(particle => {
        const dx = particle.x - mousePos.current.x;
        const dy = particle.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          particle.x += dx * 0.01;
          particle.y += dy * 0.01;
        }

        particle.x += particle.velocity.x;
        particle.y += particle.velocity.y;

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      });
      frameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    init();
    draw();
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

/* ---------------------------------------
   Composant ProjectCard animé
---------------------------------------- */
const ProjectCard = ({ project, onClick }: { project: Project; onClick: () => void }) => {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['0 1', '0.8 1'],
  });
  
  const scaleProgress = useTransform(scrollYProgress, [0, 1], [0.8, 1]);
  const opacityProgress = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

  return (
    <motion.div
      ref={cardRef}
      style={{ scale: scaleProgress, opacity: opacityProgress }}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 rounded-2xl p-6 backdrop-blur-lg border border-white/10 cursor-pointer shadow-lg transform transition duration-300 ease-in-out"
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-2xl"
        variants={{
          hover: { opacity: 1 },
          tap: { opacity: 0.5 },
        }}
      />
      <h3 className="text-xl font-bold mb-4 bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
        {project.title}
      </h3>
      <p className="text-gray-300 mb-6">{project.description}</p>
      <motion.div
        className="flex items-center gap-2 text-pink-400"
        whileHover={{ x: 5 }}
      >
        <span>Découvrir</span>
        <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          →
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

/* ---------------------------------------
   Composant principal Projects
---------------------------------------- */
export default function Projects() {
  const [activeTab, setActiveTab] = useState<ProjectTab>('web');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const containerRef = useRef(null);

  const projects: Record<ProjectTab, Project[]> = {
    web: [
      {
        title: 'CostCrafter - Comparateur de coûts',
        description: 'Plateforme interactive de comparaison urbaine',
        link: 'https://costcrafters.vercel.app',
        detailedDescription: 'Ce projet vous permet de comparer différents coûts en ville grâce à une interface intuitive et des filtres avancés.',
        images: [
          { src: '/images/costcrafters-1.jpg', alt: "Vue d'ensemble du comparateur" },
          { src: '/images/costcrafters-2.jpg', alt: 'Détail des coûts' }
        ]
      },
      {
        title: 'Finance Forecast Hub',
        description: "Site d'analyse financière et prévisions économiques",
        link: 'https://finance-forecast-hub.vercel.app/',
        detailedDescription: "Ce site est un prototype. Avec les API gratuites, il n'est pas possible d'obtenir des données précises, mais il illustre mon travail de développement et la mise en place d'une analyse financière avancée et de prévisions économiques en temps réel.",
        images: [
          { src: '/images/finance-forecast-hub-1.jpg', alt: "Vue d'ensemble de Finance Forecast Hub" },
          { src: '/images/finance-forecast-hub-2.jpg', alt: 'Graphiques financiers' }
        ]
      },
    ],
    ia: [
      {
        title: 'Chatbot IA Intelligent',
        description: 'Solution conversationnelle avancée',
        link: 'https://chatbot.example.com',
        detailedDescription: "Ce chatbot utilise l'intelligence artificielle pour offrir des réponses personnalisées et pertinentes à vos questions.",
        images: [
          { src: '/images/chatbot-1.jpg', alt: 'Interface du chatbot' },
          { src: '/images/chatbot-2.jpg', alt: 'Conversation en cours' }
        ]
      },
    ],
  };

  return (
    <div ref={containerRef} className="min-h-screen w-full overflow-hidden relative">
      {/* Fond dégradé */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-[#0f0720] to-[#1a0933]" />
      <ParticleBackground />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center mb-16"
        >
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400"
          >
            Mes Réalisations
          </motion.h1>
        </motion.section>

        {/* Navigation des onglets */}
        <motion.div
          className="flex justify-center gap-4 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {(['web', 'ia'] as const).map((tab) => (
            <motion.button
              key={tab}
              onClick={() => setActiveTab(tab)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-3 rounded-full font-semibold transition-colors duration-300 ${
                activeTab === tab 
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white'
                  : 'bg-white/5 hover:bg-white/10 text-gray-300'
              }`}
            >
              {tab === 'web' ? 'Projets Web' : 'Projets IA'}
            </motion.button>
          ))}
        </motion.div>

        {/* Grid des projets */}
        <motion.div
          key={activeTab}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: { staggerChildren: 0.1, delayChildren: 0.2 }
            },
            exit: { opacity: 0 }
          }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
        >
          {projects[activeTab].map((project, index) => (
            <motion.div
              key={index}
              variants={ANIMATION_VARIANTS}
              layoutId={`project-${index}`}
            >
              <ProjectCard 
                project={project} 
                onClick={() => setSelectedProject(project)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Modal de détail */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ backdropFilter: 'blur(0px)' }}
              animate={{ backdropFilter: 'blur(10px)' }}
              exit={{ backdropFilter: 'blur(0px)' }}
              className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            >
              <motion.div
                layoutId={`project-${projects[activeTab].indexOf(selectedProject)}`}
                className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-white/10 shadow-2xl"
                initial={{ scale: 0.9 }}
                animate={{ 
                  scale: 1,
                  transition: { type: 'spring', stiffness: 300, damping: 25 }
                }}
                exit={{ scale: 0.9 }}
                dragConstraints={containerRef}
                dragElastic={0.1}
                drag
              >
                <motion.button
                  onClick={() => setSelectedProject(null)}
                  whileHover={{ rotate: 90, scale: 1.1 }}
                  className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 transition duration-300"
                >
                  ✕
                </motion.button>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.2 } }}
                >
                  <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                    {selectedProject.title}
                  </h2>
                  <p className="text-gray-300 mb-4">
                    {selectedProject.detailedDescription}
                  </p>
                  {selectedProject.link && selectedProject.link !== '' && (
                    <a 
                      href={selectedProject.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-indigo-400 hover:underline"
                    >
                      Visiter le projet
                    </a>
                  )}
                  {selectedProject.images && selectedProject.images.length > 0 && (
                    <PhotoSection images={selectedProject.images} />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
