"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useVelocity,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { FiGithub, FiArrowUpRight } from "react-icons/fi";
import Backdrop from "../(components)/Backdrop";

/* ------------------------------------------------------------------ */
/* Données                                                             */
/* ------------------------------------------------------------------ */

type Categorie = "web" | "ia";

interface Projet {
  titre: string;
  description: string;
  lien: string;
  github?: string;
  image: string;
  stack: string[];
  categorie: Categorie;
  annee: string;
}

const PROJETS: Projet[] = [
  {
    titre: "MHNet – Premium Cleaning",
    description:
      "Site vitrine ultra-rapide pour une entreprise suisse de nettoyage textile haut de gamme. Design épuré, animations fluides, SEO optimisé.",
    lien: "https://site-web-mhnet.vercel.app/",
    image: "/images/mhnet.png",
    stack: ["Next.js", "Tailwind CSS", "Framer Motion"],
    categorie: "web",
    annee: "2025",
  },
  {
    titre: "CostCrafter",
    description:
      "Comparateur de coût de la vie pour expatriés. Analyse interactive des loyers, transports et alimentation dans différentes villes du monde.",
    lien: "https://costcrafters.vercel.app/",
    image: "/images/costcrafter.png",
    stack: ["React", "Firebase", "Recharts"],
    categorie: "web",
    annee: "2025",
  },
  {
    titre: "Finance Forecast Hub",
    description:
      "Dashboard financier en temps réel branché sur l'API Yahoo Finance pour visualiser tendances boursières et indicateurs économiques.",
    lien: "https://finance-forecast-hub.vercel.app/",
    image: "/images/finance.jpg",
    stack: ["Next.js", "API Yahoo", "Data Viz"],
    categorie: "web",
    annee: "2025",
  },
];

const FILTRES = [
  { id: "tous", label: "Tous" },
  { id: "web", label: "Développement web" },
  { id: "ia", label: "Intelligence artificielle" },
] as const;

type FiltreId = (typeof FILTRES)[number]["id"];

/* ------------------------------------------------------------------ */
/* Aperçu qui suit le curseur                                          */
/* ------------------------------------------------------------------ */

function CursorPreview({ projet }: { projet: Projet | null }) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const x = useSpring(mx, { stiffness: 170, damping: 22, mass: 0.5 });
  const y = useSpring(my, { stiffness: 170, damping: 22, mass: 0.5 });

  // L'inclinaison suit la vitesse horizontale du geste.
  const vx = useVelocity(x);
  const rotate = useTransform(vx, [-2200, 2200], [-14, 14], { clamp: true });
  const skew = useTransform(vx, [-2200, 2200], [-6, 6], { clamp: true });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [mx, my]);

  return (
    <motion.div
      aria-hidden
      style={{ x, y, rotate, skewX: skew }}
      className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
    >
      <div className="-translate-x-1/2 -translate-y-1/2">
        <AnimatePresence mode="popLayout">
          {projet && (
            <motion.div
              key={projet.titre}
              initial={{ opacity: 0, scale: 0.86 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[15rem] w-[24rem] overflow-hidden border border-[#FF3D8A]/40 shadow-[0_0_60px_-12px_rgba(255,61,138,0.55)]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={projet.image}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060309]/70 via-transparent to-transparent" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Une ligne de projet                                                 */
/* ------------------------------------------------------------------ */

function LigneProjet({
  projet,
  index,
  actif,
  onHover,
  reduced,
}: {
  projet: Projet;
  index: number;
  actif: boolean;
  onHover: (p: Projet | null) => void;
  reduced: boolean | null;
}) {
  return (
    <motion.li
      layout
      initial={
        reduced
          ? { opacity: 0 }
          : { opacity: 0, clipPath: "inset(0 100% 0 0)", y: 18 }
      }
      animate={
        reduced
          ? { opacity: 1 }
          : { opacity: 1, clipPath: "inset(0 0% 0 0)", y: 0 }
      }
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12 }}
      transition={{
        duration: 0.6,
        delay: reduced ? 0 : index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => onHover(projet)}
      onMouseLeave={() => onHover(null)}
      className="group relative border-b border-white/[0.08]"
    >
      {/* Filet qui traverse la rangée au survol */}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-[#FF3D8A] shadow-[0_0_12px_rgba(255,61,138,0.9)]"
        initial={false}
        animate={{ scaleX: actif ? 1 : 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      />

      <div className="grid gap-5 py-10 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-12">
        <span className="text-[0.82rem] text-[#FF3D8A]/80 md:col-span-1">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="md:col-span-5">
          <a
            href={projet.lien}
            {...(projet.lien.startsWith("http")
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="inline-flex items-baseline gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
          >
            <motion.h2
              animate={
                actif && !reduced
                  ? {
                      x: 10,
                      textShadow:
                        "0 0 1px rgba(255,255,255,0.9), 0 0 20px rgba(255,61,138,0.6), 0 0 60px rgba(139,92,246,0.45)",
                    }
                  : { x: 0, textShadow: "0 0 0px rgba(255,61,138,0)" }
              }
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-tight tracking-tight text-white"
            >
              {projet.titre}
            </motion.h2>
            <FiArrowUpRight
              className="shrink-0 text-[#FF3D8A] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              size={20}
            />
          </a>

          {/* Aperçu en ligne : mobile et tablette, là où il n'y a pas de curseur */}
          <div className="mt-5 aspect-[16/10] w-full overflow-hidden border border-white/10 lg:hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={projet.image}
              alt={`Aperçu de ${projet.titre}`}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

        <p className="max-w-[52ch] leading-relaxed text-[#9C8FB8] md:col-span-4">
          {projet.description}
        </p>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 md:col-span-2 md:flex-col md:items-end md:gap-2">
          <p className="text-[0.8rem] text-[#7E7196]">{projet.annee}</p>
          <p className="text-[0.8rem] text-[#7E7196] md:text-right">
            {projet.stack.join(", ")}
          </p>
          {projet.github && (
            <a
              href={projet.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[0.82rem] text-[#C4B5FD] transition-colors duration-200 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
            >
              <FiGithub size={15} /> Code source
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */
/* Ligne « à venir » : même grille, mais inerte                        */
/* ------------------------------------------------------------------ */

function LigneAVenir({
  index,
  reduced,
}: {
  index: number;
  reduced: boolean | null;
}) {
  return (
    <motion.li
      layout
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.6,
        delay: reduced ? 0 : index * 0.09,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="border-b border-dashed border-white/[0.12]"
    >
      <div className="grid gap-5 py-10 md:grid-cols-12 md:items-baseline md:gap-8 lg:py-12">
        <span className="text-[0.82rem] text-[#7E7196]">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="md:col-span-5">
          <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.9rem)] font-bold leading-tight tracking-tight text-[#5C5273]">
            Projet IA
          </h2>
          <p className="mt-3 inline-flex items-center gap-2.5 text-[0.82rem] text-[#C4B5FD]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C4B5FD]" />
            En cours d&apos;écriture
          </p>
        </div>

        <p className="max-w-[52ch] leading-relaxed text-[#7E7196] md:col-span-4">
          Je développe un nouveau projet autour des modèles de langage. Il
          apparaîtra ici le jour où il tournera en production, pas avant.
        </p>

        <div className="md:col-span-2 md:text-right">
          <p className="text-[0.8rem] text-[#5C5273]">2026</p>
        </div>
      </div>
    </motion.li>
  );
}

/* ------------------------------------------------------------------ */

export default function ProjectsPage() {
  const reduced = useReducedMotion();
  const [filtre, setFiltre] = useState<FiltreId>("tous");
  const [survole, setSurvole] = useState<Projet | null>(null);
  const [pointerFin, setPointerFin] = useState(false);
  const listeRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    setPointerFin(window.matchMedia("(pointer: fine)").matches);
  }, []);

  const projets =
    filtre === "tous" ? PROJETS : PROJETS.filter((p) => p.categorie === filtre);

  // Le projet IA n'existe pas encore : on l'annonce au lieu de laisser un vide.
  const afficherAVenir = filtre !== "web";
  const nombre = projets.length + (afficherAVenir ? 1 : 0);

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

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#060309] font-body text-[#F5EEFF] selection:bg-[#FF3D8A]/30">
      <Backdrop />

      {pointerFin && !reduced && (
        <CursorPreview projet={survole} />
      )}

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
            Trois projets livrés, en ligne, et que vous pouvez ouvrir tout de
            suite.
          </motion.h1>

          <p className="max-w-[46ch] leading-relaxed text-[#CFC4E4] lg:col-span-5">
            Rien n&apos;est ici pour faire nombre. Chacun répond à un besoin
            réel, tourne en production, et m&apos;a appris quelque chose que je
            n&apos;aurais pas trouvé dans un tutoriel.
          </p>
        </header>

        {/* ---------------- Filtres ---------------- */}
        <div className="mt-20 flex flex-wrap items-center gap-2">
          {FILTRES.map((f) => {
            const actif = filtre === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => setFiltre(f.id)}
                aria-pressed={actif}
                className={`relative px-5 py-2.5 text-[0.88rem] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309] ${
                  actif ? "text-[#FF3D8A]" : "text-[#7E7196] hover:text-[#C4B5FD]"
                }`}
              >
                {actif && (
                  <motion.span
                    layoutId="filtre-actif"
                    aria-hidden
                    className="absolute inset-0 border border-[#FF3D8A] shadow-[0_0_26px_-10px_rgba(255,61,138,0.9)]"
                    transition={
                      reduced
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 36 }
                    }
                  />
                )}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}

          <p className="ml-auto text-[0.8rem] text-[#7E7196]">
            {nombre} projet{nombre > 1 ? "s" : ""}
          </p>
        </div>

        {/* ---------------- Liste ---------------- */}
        <ul ref={listeRef} className="mt-8 border-t border-white/[0.08]">
          <AnimatePresence mode="popLayout" initial={false}>
            {projets.map((p, i) => (
              <LigneProjet
                key={p.titre}
                projet={p}
                index={i}
                actif={survole?.titre === p.titre}
                onHover={setSurvole}
                reduced={reduced}
              />
            ))}
            {afficherAVenir && (
              <LigneAVenir key="a-venir" index={projets.length} reduced={reduced} />
            )}
          </AnimatePresence>
        </ul>

        {/* ---------------- Clôture ---------------- */}
        <section className="mt-20 sm:mt-28 border-t border-white/10 pt-12 sm:pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[36ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              Le prochain projet, j&apos;aimerais le construire chez vous.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <a
                href="/contact"
                className="inline-flex items-center border border-[#FF3D8A] px-8 py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_28px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
              >
                Me contacter
              </a>

              <a
                href="https://github.com/PabloDev-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border-b border-transparent pb-1 text-[0.9rem] text-[#9C8FB8] transition-colors duration-200 hover:border-[#FF3D8A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
              >
                <FiGithub size={16} /> Tout le code sur GitHub
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}