"use client";

import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowUpRight } from "react-icons/fi";

/********************
 * Background Particles (optimisé)
 ********************/
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number; // alpha
  c: string; // color
}

function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [ready, setReady] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    // CORRECTION ICI : 'const' au lieu de 'let' pour éviter l'erreur de build
    const dpr = typeof window !== 'undefined' ? Math.max(1, Math.min(2, window.devicePixelRatio || 1)) : 1;

    const COLORS = [
      "rgba(255,110,199,0.9)", // pink
      "rgba(157,78,221,0.85)", // purple
      "rgba(90,24,154,0.85)", // deep purple
      "rgba(60,9,108,0.85)", // indigo
    ];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      particles = [];
      // Densité contrôlée + bornes pour éviter O(N^2) trop lourd
      const area = width * height;
      const baseDensity = width < 768 ? 0.00012 : 0.00018; 
      const count = Math.max(60, Math.min(220, Math.floor(area * baseDensity)));

      for (let i = 0; i < count; i++) {
        const speed = (Math.random() * 0.4 + 0.1) * (width < 768 ? 0.8 : 1);
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          r: Math.random() * 3 + 0.8,
          a: Math.random() * 0.4 + 0.4,
          c: COLORS[(Math.random() * COLORS.length) | 0],
        });
      }
    };

    // Effet de répulsion simple autour de la souris
    const mouse = { x: -9999, y: -9999 };
    const handleMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    // Petite ligne entre particules proches
    const LINK_DIST = Math.min(140, Math.max(80, Math.floor(Math.min(width, height) * 0.18)));

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter"; // jolis blends

      // Update + points
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Répulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / (dist || 1)) * force * 0.12;
          p.vy += (dy / (dist || 1)) * force * 0.12;
        }

        p.x += p.vx;
        p.y += p.vy;
        // rebond simple
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.c;
        ctx.globalAlpha = p.a;
        ctx.fill();
      }

      // Lignes (échantillonnage léger pour perf)
      ctx.globalAlpha = 0.25;
      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // On ne regarde que quelques voisins suivants pour éviter O(N^2) complet
        for (let j = i + 1; j < Math.min(particles.length, i + 18); j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d = dx * dx + dy * dy;
          if (d < LINK_DIST * LINK_DIST) {
            const alpha = 1 - Math.sqrt(d) / LINK_DIST;
            ctx.strokeStyle = "rgba(200,160,255," + (alpha * 0.6).toFixed(3) + ")";
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
    };

    let last = performance.now();
    const loop = () => {
      if (!document.hidden && !prefersReduced) {
        const now = performance.now();
        const dt = now - last;
        if (dt >= 14) {
          last = now;
          draw();
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      init();
    };

    resize();
    init();
    setReady(true);

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseleave", handleLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseleave", handleLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [prefersReduced]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`fixed inset-0 w-full h-full pointer-events-none z-0 transition-opacity duration-700 ${
        ready ? "opacity-100" : "opacity-0"
      }`}
    />
  );
}

/********************
 * Composants UI simples
 ********************/
function PrimaryButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-flex items-center gap-2 rounded-full px-8 py-4 font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 shadow-[0_8px_30px_rgb(136,58,234,0.35)] hover:shadow-[0_12px_42px_rgba(136,58,234,0.55)] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
    >
      {children}
      <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </a>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.18]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  const auraY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    }),
    []
  );

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-[#0f0720] to-[#1a0933]" />
      <ParticleBackground />

      <main className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center py-20 lg:py-24">
            
            {/* Colonne texte */}
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "show" : "hidden"}
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08 } } }}
            >
              <motion.h1
                variants={fadeUp}
                className="text-5xl md:text-6xl xl:text-7xl font-bold leading-tight bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent tracking-tight"
              >
                Pablo, développeur full‑stack
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-gray-300 mt-6 md:mt-8 mb-8 md:mb-10 max-w-2xl leading-relaxed"
              >
                Je conçois des expériences web immersives et performantes, avec une obsession du détail et de la fluidité. Chaque ligne compte.
              </motion.p>

              {/* CTA + Socials */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 md:gap-5">
                <PrimaryButton href="/projects">Explorer mes réalisations</PrimaryButton>

                <div className="flex items-center gap-3 md:gap-4">
                  
                  {/* GITHUB */}
                  <a
                    aria-label="GitHub"
                    href="https://github.com/PabloDev-bit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
                  >
                    <FiGithub size={22} />
                  </a>
                  
                  {/* LINKEDIN */}
                  <a
                    aria-label="LinkedIn"
                    // 👇 AJOUTE TON LIEN LINKEDIN ICI (ex: https://www.linkedin.com/in/ton-profil/)
                    href="https://www.linkedin.com/in/pablo-hernandez-19269531a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
                  >
                    <FiLinkedin size={22} />
                  </a>
                  
                  {/* MAIL */}
                  <a
                    aria-label="Email"
                    href="mailto:pablopro.dev@gmail.com"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
                  >
                    <FiMail size={22} />
                  </a>

                </div>
              </motion.div>

              {/* Petit badge "Disponible" */}
              <motion.div
                variants={fadeUp}
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-200 backdrop-blur-md"
              >
                <span className="relative inline-flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping bg-pink-500" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-pink-400" />
                </span>
                Disponible pour missions & stages — Sherbrooke / Remote
              </motion.div>
            </motion.div>

            {/* Colonne image */}
            <div className="relative flex justify-center">
              <motion.div
                style={{ scale, transformOrigin: "center center" }}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                {/* Aura animée derrière la photo */}
                <motion.div
                  style={{ y: auraY }}
                  aria-hidden
                  className="absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-pink-500/25 to-purple-500/25 blur-2xl"
                />

                {/* Cadre verre + photo */}
                <div className="relative rounded-[1.5rem] p-[1px] bg-gradient-to-br from-white/20 via-white/5 to-transparent">
                  <div className="rounded-[1.45rem] bg-white/5 backdrop-blur-xl">
                    <img
                      src="/images/photoProfil.jpg"
                      alt="Portrait de Pablo, développeur full‑stack"
                      className="relative z-10 w-80 h-80 md:w-96 md:h-96 rounded-[1.4rem] object-cover border border-white/10 shadow-2xl"
                      loading="eager"
                    />
                  </div>
                </div>

                {/* Accent animé discret */}
                <motion.div
                  aria-hidden
                  className="absolute -bottom-8 -right-8 bg-gradient-to-r from-pink-600 to-purple-600 p-4 rounded-2xl shadow-xl"
                  initial={{ y: 12, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ repeat: prefersReduced ? 0 : Infinity, repeatType: "mirror", duration: 2 }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 bg-gradient-to-b from-black/40 to-transparent">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Pablo. Tous droits réservés.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="/mentions-legales" className="text-gray-400 hover:text-white transition-colors">
              Mentions légales
            </a>
            <a href="/politique-confidentialite" className="text-gray-400 hover:text-white transition-colors">
              Confidentialité
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}