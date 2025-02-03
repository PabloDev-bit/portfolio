"use client";

import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  velocityX: number;
  velocityY: number;
  alpha: number;
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [initialized, setInitialized] = useState(false);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const colors = [
      "rgba(255,110,199,0.8)",
      "rgba(157,78,221,0.8)",
      "rgba(90,24,154,0.8)",
      "rgba(60,9,108,0.8)",
    ];
    let particles: Particle[] = [];
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const init = () => {
      particles = [];
      const density = window.innerWidth < 768 ? 0.0002 : 0.0003;
      const numberOfParticles = Math.floor(window.innerWidth * window.innerHeight * density);
      
      for (let i = 0; i < numberOfParticles; i++) {
        particles.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          radius: Math.random() * 4 + 1,
          color: colors[Math.floor(Math.random() * colors.length)],
          velocityX: (Math.random() - 0.5) * 0.1,
          velocityY: (Math.random() - 0.5) * 0.1,
          alpha: Math.random() * 0.5 + 0.5,
        });
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        const dx = p.x - mousePos.current.x;
        const dy = p.y - mousePos.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = -1000 / distance;
        
        if (distance < 150) {
          p.x += force * (dx / distance);
          p.y += force * (dy / distance);
        }

        p.x += p.velocityX;
        p.y += p.velocityY;

        if (p.x < 0 || p.x > canvas.width) p.velocityX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.velocityY *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });
    };

    const animate = () => {
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", () => {
      resizeCanvas();
      init();
    });

    resizeCanvas();
    init();
    animate();
    setInitialized(true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-1000 ${
        initialized ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

export default function Home() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-[#0f0720] to-[#1a0933]" />
      <ParticleBackground />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="min-h-screen flex items-center justify-center"
          style={{ scale }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center py-24">
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 1 } },
              }}
            >
              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Pablo, développeur full-stack
                  <br />
                 
                </h1>
              </motion.div>

              <motion.p
                className="text-xl md:text-2xl text-gray-300 mt-8 mb-12 max-w-2xl leading-relaxed"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Je m&apos;appelle Pablo, développeur full-stack spécialisé dans
                la création d&apos;applications web immersives et performantes.
                Chaque ligne compte.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <a
                  href="/projects"
                  className="group relative flex items-center gap-2 bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-4 rounded-full font-semibold text-white hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300"
                >
                  Explorer mes réalisations
                  <FiArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <div className="flex gap-4">
                  <a
                    href="https://github.com/PabloDev-bit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FiGithub size={24} />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FiLinkedin size={24} />
                  </a>
                  <a
                    href="pablopro.dev@gmail.com"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <FiMail size={24} />
                  </a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="relative">
                <img
                  src="/images/photoProfil.jpg"
                  alt="Pablo Développeur"
                  className="w-80 h-80 rounded-2xl object-cover relative z-10 border-4 border-white/10 shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 blur-3xl rounded-2xl animate-pulse" />
                <motion.div
                  className="absolute -bottom-8 -right-8 bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-2xl shadow-xl"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 2,
                  }}
                >
                  
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Pablo. Tous droits réservés.
          </div>
          <div className="flex space-x-6">
            <a
              href="/mentions-legales"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Mentions légales
            </a>
            <a
              href="/politique-confidentialite"
              className="text-gray-400 hover:text-white transition-colors"
            >
              Confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}