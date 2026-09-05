"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

/* ------------------------------------------------------------------
 * Fond : halo violet piloté au curseur + trame de points + grain.
 * Aucun canvas, aucune boucle d'animation : tout est en CSS.
 * ------------------------------------------------------------------ */
function Backdrop() {
  const bloomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bloomRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight * 0.4;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Base */}
      <div className="absolute inset-0 bg-[#060309]" />

      {/* Deux nappes de lumière fixes, qui ancrent la composition */}
      <div className="absolute -left-[18%] top-[-10%] h-[70vh] w-[70vh] rounded-full bg-[#7C3AED] opacity-[0.18] blur-[130px]" />
      <div className="absolute -right-[12%] bottom-[-18%] h-[60vh] w-[60vh] rounded-full bg-[#FF3D8A] opacity-[0.12] blur-[140px]" />

      {/* Halo qui suit le curseur */}
      <div
        ref={bloomRef}
        className="absolute inset-0 transition-opacity duration-700"
        style={{
          ["--mx" as string]: "50%",
          ["--my" as string]: "40%",
          background:
            "radial-gradient(420px circle at var(--mx) var(--my), rgba(139,92,246,0.16), transparent 70%)",
        }}
      />

      {/* Trame de points, estompée sur les bords */}
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(196,181,253,0.16) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
          maskImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, #000 30%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 65% at 50% 45%, #000 30%, transparent 100%)",
        }}
      />

      {/* Grain */}
      <div
        className="absolute inset-0 opacity-[0.055] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}

/* ------------------------------------------------------------------
 * Lien social : carré filaire, pas de pastille ronde.
 * ------------------------------------------------------------------ */
function Social({
  href,
  label,
  children,
  external = true,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid h-11 w-11 place-items-center border border-[#C4B5FD]/20 text-[#C4B5FD] transition-colors duration-200 hover:border-[#FF3D8A]/60 hover:text-white hover:shadow-[0_0_24px_-6px_rgba(255,61,138,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const reduced = useReducedMotion();

  // Allumage du tube néon : le seul moment animé de la page.
  const ignite = reduced
    ? { opacity: 1 }
    : {
        opacity: [0, 1, 0.15, 1, 0.35, 1],
        transition: {
          duration: 1.15,
          times: [0, 0.08, 0.18, 0.34, 0.48, 0.72],
          ease: "easeOut" as const,
        },
      };

  const neon = {
    textShadow:
      "0 0 1px rgba(255,255,255,0.9), 0 0 14px rgba(255,61,138,0.55), 0 0 44px rgba(139,92,246,0.45), 0 0 96px rgba(139,92,246,0.22)",
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#060309] text-[#F5EEFF] font-body selection:bg-[#FF3D8A]/30">
      <Backdrop />

      <main className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-8 lg:px-12">
        <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          {/* ---------------- Colonne texte ---------------- */}
          <div>
            <motion.h1
              initial={reduced ? false : { opacity: 0 }}
              animate={ignite}
              style={neon}
              className="font-display font-extrabold leading-[0.84] tracking-[-0.045em] text-white"
            >
              <span className="block text-[clamp(3.6rem,11vw,8.5rem)]">Pablo</span>
              <span className="block text-[clamp(3.6rem,11vw,8.5rem)] text-[#F0E6FF]">
                Hernandez
              </span>
            </motion.h1>

            <div className="mt-8 flex items-center gap-5">
              <span className="h-px w-16 bg-gradient-to-r from-[#FF3D8A] to-transparent" />
              <p className="text-[0.95rem] tracking-wide text-[#C4B5FD]">
                Développeur full-stack, orienté IA et data
              </p>
            </div>

            <p className="mt-7 max-w-[46ch] text-[1.05rem] leading-relaxed text-[#CFC4E4]">
              Je conçois des interfaces web rapides et soignées, et j&apos;y branche
              des modèles d&apos;IA quand ça sert vraiment le produit. Le détail et
              la fluidité ne se négocient pas.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-5">
              <a
                href="/projects"
                className="group relative inline-flex items-center border border-[#FF3D8A] px-8 py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_28px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] hover:shadow-[0_0_46px_-8px_rgba(255,61,138,0.85)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
              >
                Voir mes projets
              </a>

              <div className="flex items-center gap-3">
                <Social href="https://github.com/PabloDev-bit" label="GitHub">
                  <FiGithub size={19} />
                </Social>
                <Social
                  href="https://www.linkedin.com/in/pablo-hernandez-19269531a/"
                  label="LinkedIn"
                >
                  <FiLinkedin size={19} />
                </Social>
                <Social
                  href="mailto:pablopro.dev@gmail.com"
                  label="Envoyer un email"
                  external={false}
                >
                  <FiMail size={19} />
                </Social>
              </div>
            </div>
          </div>

          {/* ---------------- Colonne photo ---------------- */}
          <div className="relative mx-auto w-full max-w-[380px] lg:max-w-none">
            {/* Filet décalé : aberration chromatique du cadre */}
            <div
              aria-hidden
              className="absolute -left-2 -top-2 h-full w-full border border-[#8B5CF6]/45"
            />
            <div
              aria-hidden
              className="absolute -bottom-2 -right-2 h-full w-full border border-[#FF3D8A]/35"
            />

            <div className="group relative aspect-[3/4] w-full overflow-hidden border border-white/10">
              <img
                src="/images/photoProfil.jpg"
                alt="Portrait de Pablo Hernandez"
                loading="eager"
                className="h-full w-full object-cover object-center saturate-[0.25] contrast-[1.08] transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.02] group-hover:saturate-100"
              />
              {/* Teinte violette qui se retire au survol */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-tr from-[#2A0B47]/70 via-[#7C3AED]/20 to-transparent opacity-100 transition-opacity duration-700 group-hover:opacity-0"
              />
              {/* Ombre basse pour asseoir l'image */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#060309] to-transparent"
              />
            </div>
          </div>
        </div>
      </main>

      {/* ---------------- Barre de statut + mentions ---------------- */}
      <div className="relative z-10 border-t border-white/10 bg-[#060309]/70 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-5 text-[0.82rem] text-[#9C8FB8] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
          <p className="flex items-center gap-2.5">
            <span className="relative flex h-2 w-2">
              {!reduced && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF3D8A] opacity-60" />
              )}
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]" />
            </span>
            <span className="text-[#CFC4E4]">
              Disponible en alternance 24 mois à Bordeaux, dès décembre 2026
            </span>
          </p>

          <div className="flex items-center gap-6">
            <a href="/mentions-legales" className="transition-colors hover:text-white">
              Mentions légales
            </a>
            <a
              href="/politique-confidentialite"
              className="transition-colors hover:text-white"
            >
              Confidentialité
            </a>
            <span className="hidden sm:inline">
              © {new Date().getFullYear()} Pablo
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}