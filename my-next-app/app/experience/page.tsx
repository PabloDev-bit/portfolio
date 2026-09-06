"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import Backdrop from "../(components)/Backdrop";

/* ------------------------------------------------------------------ */

interface Etape {
  annee: string;
  titre: string;
  lieu: string;
  description: string;
}

const ETAPES: Etape[] = [
  {
    annee: "2024 — 2026",
    titre: "Formation académique et autodidacte",
    lieu: "Cégep de Sherbrooke, Udemy",
    description:
      "Acquisition des bases solides en informatique — algorithmique, structures de données — complétée par une formation intensive en ligne sur React et l'écosystème JavaScript moderne.",
  },
  {
    annee: "2025",
    titre: "Premiers projets full-stack",
    lieu: "ProGym Tracker, Portfolio V1",
    description:
      "Développement d'applications concrètes pour résoudre des problèmes réels. Mise en pratique de Next.js, Tailwind CSS et des bases de données SQL via Supabase.",
  },
  {
    annee: "Fin 2025",
    titre: "Exploration IA et 3D web",
    lieu: "Three.js, intégration LLM",
    description:
      "Plongée dans le web immersif avec Three.js, et début de l'intégration de modèles d'IA depuis Hugging Face dans des interfaces web réactives.",
  },
  {
    annee: "2026",
    titre: "Mastère et alternance",
    lieu: "IPSSI — Big Data & IA",
    description:
      "Préparation à l'entrée en mastère spécialisé. L'objectif : fusionner développement web performant et intelligence artificielle sur des projets à l'échelle.",
  },
];

/* ------------------------------------------------------------------ */
/* Une étape. Signale au parent quand elle traverse le centre de l'écran */
/* ------------------------------------------------------------------ */

function Etape({
  etape,
  index,
  onEnter,
}: {
  etape: Etape;
  index: number;
  onEnter: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement | null>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  return (
    <li
      ref={ref}
      className="group border-t border-white/[0.08] py-14 first:border-t-0 first:pt-0 lg:py-20"
    >
      {/* L'année réapparaît en ligne sur petit écran, où la colonne fixe disparaît */}
      <p className="mb-4 text-[0.85rem] text-[#FF3D8A] lg:hidden">{etape.annee}</p>

      <div className="flex items-baseline gap-5">
        <span
          aria-hidden
          className={`mt-1 h-px w-8 shrink-0 transition-all duration-500 ${
            inView ? "w-14 bg-[#FF3D8A]" : "bg-white/20"
          }`}
        />
        <h2 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
          {etape.titre}
        </h2>
      </div>

      <p className="mt-3 text-[0.9rem] text-[#C4B5FD] lg:pl-[52px]">
        {etape.lieu}
      </p>

      <p className="mt-5 max-w-[62ch] leading-relaxed text-[#9C8FB8] lg:pl-[52px]">
        {etape.description}
      </p>
    </li>
  );
}

/* ------------------------------------------------------------------ */

export default function ExperiencePage() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  const ignite = reduced
    ? { opacity: 1 }
    : {
        opacity: [0, 1, 0.2, 1, 0.4, 1],
        transition: {
          duration: 1.1,
          times: [0, 0.08, 0.18, 0.34, 0.48, 0.72],
          ease: "easeOut" as const,
        },
      };

  const courante = ETAPES[active];

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#060309] font-body text-[#F5EEFF] selection:bg-[#FF3D8A]/30">
      <Backdrop />

      <main className="relative z-10 mx-auto max-w-[1440px] px-5 pb-20 pt-28 sm:pb-28 sm:pt-40 sm:px-8 lg:px-12">
        {/* ---------------- Ouverture ---------------- */}
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <motion.h1
            initial={reduced ? false : { opacity: 0 }}
            animate={ignite}
            style={{
              textShadow:
                "0 0 1px rgba(255,255,255,0.85), 0 0 14px rgba(255,61,138,0.45), 0 0 46px rgba(139,92,246,0.4), 0 0 100px rgba(139,92,246,0.2)",
            }}
            className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white lg:col-span-7"
          >
            Chaque année a ajouté une couche : les bases, le produit, l&apos;IA,
            puis l&apos;échelle.
          </motion.h1>

          <p className="max-w-[46ch] leading-relaxed text-[#CFC4E4] lg:col-span-5">
            Rien de spectaculaire, juste une progression tenue. J&apos;ai commencé
            par apprendre à faire tourner du code, puis à le rendre utile, et
            maintenant à le faire tenir sur des volumes qui comptent.
          </p>
        </header>

        {/* ---------------- Chronologie ---------------- */}
        <div className="mt-20 grid gap-12 sm:mt-32 lg:grid-cols-12 lg:gap-16">
          {/* Colonne fixe : l'année en cours */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-40">
              <div className="min-h-[9rem]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={courante.annee}
                    initial={reduced ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduced ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    style={{
                      textShadow:
                        "0 0 1px rgba(255,255,255,0.7), 0 0 18px rgba(255,61,138,0.4), 0 0 60px rgba(139,92,246,0.35)",
                    }}
                    className="font-display text-[clamp(2.6rem,4.4vw,4rem)] font-extrabold leading-none tracking-[-0.04em] text-white"
                  >
                    {courante.annee}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Repères d'avancement, cliquables */}
              <ul className="mt-10 space-y-3">
                {ETAPES.map((e, i) => (
                  <li key={e.annee}>
                    <a
                      href={`#etape-${i}`}
                      className={`flex items-center gap-4 py-1 text-[0.88rem] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309] ${
                        i === active
                          ? "text-white"
                          : "text-[#7E7196] hover:text-[#C4B5FD]"
                      }`}
                    >
                      <span
                        aria-hidden
                        className={`h-px transition-all duration-500 ${
                          i === active
                            ? "w-10 bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]"
                            : "w-5 bg-white/20"
                        }`}
                      />
                      {e.titre}
                    </a>
                  </li>
                ))}
              </ul>

              <p className="mt-10 text-[0.8rem] text-[#7E7196]">
                Étape {active + 1} sur {ETAPES.length}
              </p>
            </div>
          </div>

          {/* Colonne défilante : les étapes */}
          <ol className="lg:col-span-8">
            {ETAPES.map((etape, i) => (
              <div key={etape.annee} id={`etape-${i}`} className="scroll-mt-40">
                <Etape etape={etape} index={i} onEnter={setActive} />
              </div>
            ))}
          </ol>
        </div>

        {/* ---------------- Clôture ---------------- */}
        <section className="mt-24 sm:mt-32 border-t border-white/10 pt-12 sm:pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[34ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              La suite s&apos;écrit en alternance, à partir de décembre 2026.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link
                href="/projects"
                className="inline-flex items-center border border-[#FF3D8A] px-8 py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_28px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
              >
                Voir mes projets
              </Link>

              <Link
                href="/"
                className="border-b border-transparent pb-1 text-[0.9rem] text-[#9C8FB8] transition-colors duration-200 hover:border-[#FF3D8A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}