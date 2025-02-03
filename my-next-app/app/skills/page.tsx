'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';

// Configuration des particules
class Particle {
  constructor(
    public x: number,
    public y: number,
    public vx: number,
    public vy: number,
    public size: number,
    public color: string,
    public alpha: number,
    public baseSize: number
  ) {}
}

const ParticleCanvas = ({ colors, behavior }: { colors: string[]; behavior: 'attract' | 'repel' | 'flock' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: -1000, y: -1000 });

  const initParticles = useCallback(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    
    particles.current = Array.from({ length: 100 }).map(() => {
      const color = colors[Math.floor(Math.random() * colors.length)];
      return new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        Math.random() * 3 + 2,
        color,
        0,
        Math.random() * 3 + 2
      );
    });
  }, [colors]);

  const updateParticles = useCallback(() => {
    particles.current.forEach((p) => {
      // Comportement différent selon la section
      switch(behavior) {
        case 'attract':
          p.vx += (mousePos.current.x - p.x) * 0.0001;
          p.vy += (mousePos.current.y - p.y) * 0.0001;
          break;
        case 'repel':
          const dx = mousePos.current.x - p.x;
          const dy = mousePos.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            p.vx -= (dx / dist) * 0.1;
            p.vy -= (dy / dist) * 0.1;
          }
          break;
        case 'flock':
          // Logique de flocking...
          break;
      }

      p.x += p.vx;
      p.y += p.vy;
      p.alpha = Math.min(p.alpha + 0.02, 0.8);
    });
  }, [behavior]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      updateParticles();

      particles.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${Math.floor(p.alpha * 255).toString(16).padStart(2, '0')}`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, [initParticles, updateParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-1000"
      onMouseMove={(e) => {
        mousePos.current = { x: e.clientX, y: e.clientY };
      }}
    />
  );
};

const SkillSection = ({ 
  title, 
  description, 
  particles, 
  theme,
  children 
}: {
  title: string;
  description: string;
  particles: { colors: string[]; behavior: 'attract' | 'repel' | 'flock' };
  theme: 'cyber' | 'neon' | 'matrix' | 'space';
  children: React.ReactNode;
}) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <motion.section 
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      onViewportEnter={() => setHovered(true)}
      onViewportLeave={() => setHovered(false)}
      viewport={{ once: true, margin: "-30% 0px" }}
    >
      <ParticleCanvas {...particles} />
      
      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          className={`p-12 rounded-3xl backdrop-blur-xl border ${
            theme === 'cyber' ? 'border-pink-500/30' :
            theme === 'neon' ? 'border-cyan-500/30' :
            'border-emerald-500/30'
          }`}
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            background: `linear-gradient(45deg, ${theme === 'cyber' ? '#1a1a1a' : '#000'}, ${theme === 'neon' ? '#000b1a' : '#00110b'})`,
            boxShadow: `0 0 50px ${theme === 'cyber' ? '#ff61d840' : '#00ff9d30'}`
          }}
        >
          <motion.h2 
            className={`text-6xl font-bold mb-8 ${
              theme === 'cyber' ? 'text-pink-400' :
              theme === 'neon' ? 'text-cyan-400' :
              'text-emerald-400'
            }`}
            animate={hovered ? { textShadow: "0 0 20px currentColor" } : {}}
            transition={{ duration: 1 }}
          >
            {title}
          </motion.h2>
          
          <motion.p
            className="text-xl text-gray-300 mb-12 max-w-3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {description}
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {children}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

const SkillCard = ({ title, description, theme }: { title: string; description: string; theme: string }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative p-8 rounded-xl backdrop-blur-lg border bg-black/20 hover:bg-black/40 transition-all"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        borderColor: isHovered ? 
          theme === 'cyber' ? '#ff61d8' : 
          theme === 'neon' ? '#00f7ff' : '#00ff9d' : 'transparent',
        y: isHovered ? -10 : 0
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 to-transparent" />
      
      <h3 className={`text-2xl font-bold mb-4 bg-gradient-to-r ${
        theme === 'cyber' ? 'from-pink-400 to-purple-400' :
        theme === 'neon' ? 'from-cyan-400 to-blue-400' :
        'from-green-400 to-emerald-400'
      } bg-clip-text text-transparent`}>
        {title}
      </h3>
      <p className="text-gray-300">{description}</p>
      
      <motion.div
        className="absolute inset-0 rounded-xl border pointer-events-none"
        animate={{
          opacity: isHovered ? 1 : 0,
          borderColor: theme === 'cyber' ? '#ff61d8' : 
                      theme === 'neon' ? '#00f7ff' : '#00ff9d'
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default function SkillsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <SkillSection
        title="Développement Web"
        description="Création d'applications modernes avec les dernières technologies"
        particles={{ colors: ['#ff61d8', '#7d6fff'], behavior: 'attract' }}
        theme="cyber"
      >
        <SkillCard
          title="React/Next.js"
          description="Applications full-stack performantes"
          theme="cyber"
        />
        <SkillCard
          title="TypeScript"
          description="Typage statique avancé"
          theme="cyber"
        />
        <SkillCard
          title="Node.js"
          description="Backend haute performance"
          theme="cyber"
        />
      </SkillSection>

      <SkillSection
        title="Intelligence Artificielle"
        description="Développement de modèles intelligents et solutions ML"
        particles={{ colors: ['#00f7ff', '#00ff9d'], behavior: 'repel' }}
        theme="neon"
      >
        <SkillCard
          title="Python/TensorFlow"
          description="Deep Learning & Réseaux de neurones"
          theme="neon"
        />
        <SkillCard
          title="Data Science"
          description="Analyse de données complexes"
          theme="neon"
        />
        <SkillCard
          title="NLP"
          description="Traitement du langage naturel"
          theme="neon"
        />
      </SkillSection>

      <SkillSection
        title="Systèmes Embarqués"
        description="Développement bas niveau et solutions matérielles"
        particles={{ colors: ['#00ff9d', '#0066ff'], behavior: 'flock' }}
        theme="matrix"
      >
        <SkillCard
          title="C++20/23"
          description="Optimisation système"
          theme="matrix"
        />
        <SkillCard
          title="Rust"
          description="Sécurité mémoire"
          theme="matrix"
        />
        <SkillCard
          title="IoT"
          description="Objets connectés"
          theme="matrix"
        />
      </SkillSection>
    </div>
  );
}
