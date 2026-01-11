"use client";

import { motion, useInView, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  FiArrowUpRight,
  FiCompass,
  FiGithub,
  FiGrid,
  FiLayers,
  FiLinkedin,
  FiMail,
  FiShield,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

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
    let width = 0,
      height = 0;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

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
      const baseDensity = width < 768 ? 0.00012 : 0.00018; // légèrement moins dense que l'original pour la perf
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
      // Pause si onglet caché ou si l'utilisateur préfère limiter l'animation
      if (!document.hidden && !prefersReduced) {
        const now = performance.now();
        const dt = now - last;
        // On limite le rafraîchissement ~60fps max
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
  // Scale doux sur la photo au scroll
  const { scrollYProgress } = useScroll();
  const prefersReduced = useReducedMotion();
  const scale = useTransform(scrollYProgress, [0, 1], prefersReduced ? [1, 1] : [1, 1.18]);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  // Parallaxe très légère sur l'aura derrière la photo
  const auraY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  // Variants d'entrée doux
  const fadeUp = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
    }),
    []
  );

  const services = [
    {
      icon: FiCompass,
      title: "Stratégie produit",
      description: "Clarifier la vision, prioriser les impacts, définir des KPIs actionnables.",
    },
    {
      icon: FiLayers,
      title: "Design & UX",
      description: "Prototypage rapide, parcours fluides, identité visuelle mémorable.",
    },
    {
      icon: FiZap,
      title: "Développement full-stack",
      description: "Next.js, Node, APIs robustes, performances et accessibilité intégrées.",
    },
    {
      icon: FiShield,
      title: "Qualité & fiabilité",
      description: "Tests, monitoring, SEO technique et livraison en continu sans stress.",
    },
  ];

  const highlights = [
    {
      title: "Plateforme SaaS immersive",
      description: "Design système complet, onboarding guidé, et performances Lighthouse > 95.",
      tag: "Produit",
    },
    {
      title: "Marketplace locale",
      description: "Moteur de recherche intelligent, dashboard analytics, intégrations paiement.",
      tag: "E-commerce",
    },
    {
      title: "Expérience événementielle",
      description: "Landing pages interactives, billetterie, et automatisations marketing.",
      tag: "Branding",
    },
  ];

  const metrics = [
    { label: "Projets livrés", value: "24+" },
    { label: "Taux de satisfaction", value: "98%" },
    { label: "Temps moyen de livraison", value: "4-6 sem." },
  ];

  const process = [
    {
      title: "Immersion",
      description: "Audit express, objectifs business, cartographie des frictions.",
    },
    {
      title: "Co-création",
      description: "Wireframes, design system, prototypes interactifs validés.",
    },
    {
      title: "Exécution",
      description: "Développement incrémental, tests continus, suivi des métriques.",
    },
    {
      title: "Activation",
      description: "Lancement, tracking, itérations rapides et optimisation SEO.",
    },
  ];

  const stack = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind",
    "Node.js",
    "PostgreSQL",
    "Framer Motion",
    "Vercel",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden font-sans text-white">
      {/* Dégradé de fond (identité conservée) */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-black via-[#0f0720] to-[#1a0933]" />
      <ParticleBackground />

      <header className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-8">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 shadow-lg" />
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-200/80">Pablo</p>
                <p className="text-base font-semibold">Portfolio 2024</p>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-200">
              <a className="hover:text-white transition" href="#expertise">
                Expertise
              </a>
              <a className="hover:text-white transition" href="#projects">
                Projets
              </a>
              <a className="hover:text-white transition" href="#process">
                Process
              </a>
              <a className="hover:text-white transition" href="#contact">
                Contact
              </a>
            </div>
            <PrimaryButton href="/contact">Démarrer un projet</PrimaryButton>
          </nav>
        </div>
      </header>

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
                Pablo, architecte d&apos;expériences digitales
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-gray-300 mt-6 md:mt-8 mb-8 md:mb-10 max-w-2xl leading-relaxed"
              >
                J&apos;accompagne les marques ambitieuses à transformer leurs idées en produits web élégants, rapides et rentables. Chaque
                interaction est pensée pour générer de l&apos;impact.
              </motion.p>

              {/* CTA + Socials */}
              <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 md:gap-5">
                <PrimaryButton href="/projects">Voir les études de cas</PrimaryButton>

                <div className="flex items-center gap-3 md:gap-4">
                  <a
                    aria-label="GitHub"
                    href="https://github.com/PabloDev-bit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
                  >
                    <FiGithub size={22} />
                  </a>
                  <a
                    aria-label="LinkedIn"
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
                  >
                    <FiLinkedin size={22} />
                  </a>
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
                Disponible pour missions &amp; stages — Sherbrooke / Remote
              </motion.div>

              <motion.div variants={fadeUp} className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                {metrics.map((metric) => (
                  <div
                    key={metric.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-6 py-4 backdrop-blur-md"
                  >
                    <p className="text-2xl font-semibold text-white">{metric.value}</p>
                    <p className="text-sm text-gray-300 mt-1">{metric.label}</p>
                  </div>
                ))}
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

        <section id="expertise" className="py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.2fr_2fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-pink-300/70">Expertise</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4">Une expérience de bout en bout</h2>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Du cadrage stratégique à la livraison, je conçois des produits digitaux qui conjuguent esthétique et performance. Chaque
                mission est une collaboration transparente, rythmée par des livrables concrets.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <div
                    key={service.title}
                    className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  >
                    <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-pink-500/60 to-purple-500/60 flex items-center justify-center">
                      <Icon size={22} />
                    </div>
                    <h3 className="text-xl font-semibold mt-4">{service.title}</h3>
                    <p className="text-sm text-gray-300 mt-3 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 lg:py-28">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-pink-300/70">Projets</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4">Des réalisations à forte valeur</h2>
            </div>
            <a href="/projects" className="inline-flex items-center gap-2 text-pink-200 hover:text-white transition">
              Découvrir tout le portfolio <FiArrowUpRight />
            </a>
          </div>
          <div className="mt-10 grid lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-6 shadow-[0_25px_70px_rgba(10,10,30,0.55)]"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-pink-300/80">{item.tag}</span>
                <h3 className="text-xl font-semibold mt-3">{item.title}</h3>
                <p className="text-sm text-gray-300 mt-3 leading-relaxed">{item.description}</p>
                <div className="mt-6 inline-flex items-center gap-2 text-sm text-pink-200">
                  Étude de cas à venir <FiArrowUpRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="process" className="py-20 lg:py-28">
          <div className="grid lg:grid-cols-[1.2fr_2fr] gap-10 lg:gap-16 items-start">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-pink-300/70">Process</p>
              <h2 className="text-3xl md:text-4xl font-semibold mt-4">Une méthode fluide, orientée résultats</h2>
              <p className="text-gray-300 mt-4 leading-relaxed">
                Chaque étape est conçue pour accélérer la prise de décision et sécuriser la livraison. Tu restes informé, impliqué, et en
                contrôle.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {process.map((step, index) => (
                <div key={step.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <span className="text-sm text-pink-300/80">0{index + 1}</span>
                  </div>
                  <p className="text-sm text-gray-300 mt-3 leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-28">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-white/10 via-white/5 to-transparent p-10 lg:p-16">
            <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-300/70">Insights</p>
                <h2 className="text-3xl md:text-4xl font-semibold mt-4">Une approche data & design</h2>
                <p className="text-gray-300 mt-4 leading-relaxed">
                  J&apos;alimente les décisions par des métriques claires et un storytelling visuel. Le résultat : des parcours conversion
                  friendly et des interfaces qui laissent une impression durable.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {stack.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gray-200"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid gap-4">
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3 text-lg font-semibold">
                    <FiTrendingUp />
                    32% de conversion en plus
                  </div>
                  <p className="text-sm text-gray-300 mt-3">
                    Optimisation UX complète + améliorations de performance et micro-interactions.
                  </p>
                </div>
                <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3 text-lg font-semibold">
                    <FiGrid />
                    Design system modulaire
                  </div>
                  <p className="text-sm text-gray-300 mt-3">
                    Une bibliothèque UI cohérente pour accélérer les itérations produit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-20 lg:py-28">
          <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-transparent p-10 lg:p-16">
            <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-pink-200/80">Collaboration</p>
                <h2 className="text-3xl md:text-4xl font-semibold mt-4">Parlons de ton prochain lancement</h2>
                <p className="text-gray-200 mt-4 leading-relaxed">
                  Dis-moi où tu veux aller. Je t&apos;aide à définir une roadmap claire et à livrer un produit qui impressionne tes clients.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <PrimaryButton href="/contact">Réserver un appel découverte</PrimaryButton>
                <a
                  href="mailto:pablopro.dev@gmail.com"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold text-white/90 hover:text-white hover:border-white/40 transition"
                >
                  <FiMail />
                  Écrire un email
                </a>
              </div>
            </div>
          </div>
        </section>
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
