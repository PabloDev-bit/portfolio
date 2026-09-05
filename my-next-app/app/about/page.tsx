"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";
import Backdrop from "../(components)/Backdrop";

/* ------------------------------------------------------------------ */
/* Contenu                                                             */
/* ------------------------------------------------------------------ */

const PARCOURS = [
  {
    periode: "2024 — 2026",
    titre: "Cégep de Sherbrooke",
    texte:
      "Formation en informatique au Québec. C'est là que j'ai pris l'habitude de finir mes projets au lieu de les empiler.",
  },
  {
    periode: "Aujourd'hui",
    titre: "Bordeaux",
    texte:
      "De retour en France, à construire mes projets et à chercher l'entreprise qui m'accueillera en alternance.",
  },
  {
    periode: "Décembre 2026",
    titre: "Mastère Big Data & IA, IPSSI Bordeaux",
    texte:
      "Deux ans pour passer de l'intégration de modèles à leur mise en production, sur des volumes qui comptent.",
  },
];

const STACK = [
  {
    groupe: "Interface",
    items: ["Next.js 15 & React", "TypeScript", "Tailwind CSS", "Three.js / R3F"],
  },
  {
    groupe: "Données & IA",
    items: ["Python", "LLM & intégration IA", "SQL", "Supabase"],
  },
];

const PROJETS = [
  {
    titre: "MHNet – Premium Cleaning",
    description:
      "Site vitrine ultra-performant pour une entreprise de nettoyage suisse haut de gamme.",
    tech: ["Next.js", "Tailwind", "Framer Motion"],
  },
  {
    titre: "CostCrafter",
    description:
      "Comparateur interactif du coût de la vie pour expatriés, avec analyse de données.",
    tech: ["React", "Firebase", "Recharts"],
  },
  {
    titre: "Finance Forecast Hub",
    description:
      "Dashboard financier temps réel branché sur l'API Yahoo Finance pour la visualisation boursière.",
    tech: ["Next.js", "API Yahoo", "Data Viz"],
  },
];

/* ------------------------------------------------------------------ */
/* Titre de section : un filet + un intitulé, rien de plus             */
/* ------------------------------------------------------------------ */

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-14 flex items-center gap-5">
      <h2 className="font-display text-[1.35rem] font-bold tracking-tight text-white">
        {children}
      </h2>
      <span className="h-px flex-1 bg-gradient-to-r from-[#FF3D8A]/60 via-white/10 to-transparent" />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function About() {
  const reduced = useReducedMotion();

  // Le fil du parcours se remplit à mesure qu'on descend : le seul
  // moment animé de la page, et il porte une information réelle.
  const timelineRef = useRef<HTMLOListElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.3,
  });

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

      <main className="relative z-10 mx-auto max-w-[1440px] px-5 pb-28 pt-40 sm:px-8 lg:px-12">
        {/* ---------------- Ouverture ---------------- */}
        <header className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-16">
          <motion.h1
            initial={reduced ? false : { opacity: 0 }}
            animate={ignite}
            style={{
              textShadow:
                "0 0 1px rgba(255,255,255,0.85), 0 0 14px rgba(255,61,138,0.45), 0 0 46px rgba(139,92,246,0.4), 0 0 100px rgba(139,92,246,0.2)",
            }}
            className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white lg:col-span-7"
          >
            Formé au Québec, installé à Bordeaux, et du code sans interruption
            entre les deux.
          </motion.h1>

          <div className="lg:col-span-5">
            <p className="max-w-[48ch] text-[1.02rem] leading-relaxed text-[#CFC4E4]">
              Développeur full-stack, je construis des interfaces et j&apos;y
              branche de l&apos;IA quand elle sert le produit. Trois dimensions
              m&apos;occupent en ce moment : le rendu 3D dans le navigateur, les
              modèles de langage, et tout ce qui rend une page rapide.
            </p>
            <p className="mt-5 max-w-[48ch] text-[0.95rem] leading-relaxed text-[#9C8FB8]">
              Développeur full-stack · Créateur d&apos;expériences 3D ·
              Passionné d&apos;IA et de data
            </p>
          </div>
        </header>

        {/* ---------------- Parcours ---------------- */}
        <section className="mt-36">
          <SectionTitle>Le parcours</SectionTitle>

          <ol ref={timelineRef} className="relative pl-10 sm:pl-14">
            {/* Rail + remplissage néon */}
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-2 w-px bg-white/10 sm:left-[11px]"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: fill, transformOrigin: "top" }}
              className="absolute left-[7px] top-2 bottom-2 w-px bg-[#FF3D8A] shadow-[0_0_12px_rgba(255,61,138,0.8)] sm:left-[11px]"
            />

            {PARCOURS.map((etape, i) => (
              <li key={etape.titre} className="relative pb-16 last:pb-0">
                <span
                  aria-hidden
                  className="absolute -left-10 top-[9px] h-[15px] w-[15px] border border-[#FF3D8A]/60 bg-[#060309] sm:-left-14"
                />
                <p className="font-body text-[0.82rem] tracking-wide text-[#FF3D8A]">
                  {etape.periode}
                </p>
                <h3 className="mt-2 font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold tracking-tight text-white">
                  {etape.titre}
                </h3>
                <p className="mt-3 max-w-[58ch] leading-relaxed text-[#9C8FB8]">
                  {etape.texte}
                </p>
                <span className="sr-only">
                  Étape {i + 1} sur {PARCOURS.length}
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* ---------------- Stack ---------------- */}
        <section className="mt-36">
          <SectionTitle>Ce que j&apos;utilise</SectionTitle>

          <div className="grid gap-x-16 gap-y-12 md:grid-cols-2">
            {STACK.map((bloc) => (
              <div key={bloc.groupe}>
                <p className="mb-6 text-[0.85rem] tracking-wide text-[#C4B5FD]">
                  {bloc.groupe}
                </p>
                <ul>
                  {bloc.items.map((item) => (
                    <li
                      key={item}
                      className="group flex items-baseline justify-between border-t border-white/[0.08] py-4 last:border-b"
                    >
                      <span className="font-display text-[1.15rem] font-medium text-[#E4DBF5] transition-colors duration-200 group-hover:text-white">
                        {item}
                      </span>
                      <span
                        aria-hidden
                        className="h-1.5 w-1.5 rounded-full bg-[#FF3D8A]/0 transition-all duration-300 group-hover:bg-[#FF3D8A] group-hover:shadow-[0_0_10px_rgba(255,61,138,0.9)]"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Projets ---------------- */}
        <section className="mt-36">
          <SectionTitle>Projets récents</SectionTitle>

          <ul className="border-t border-white/[0.08]">
            {PROJETS.map((p, i) => (
              <li key={p.titre}>
                <Link
                  href="/projects"
                  className="group grid gap-4 border-b border-white/[0.08] py-9 transition-colors duration-300 hover:bg-white/[0.025] focus:outline-none focus-visible:bg-white/[0.04] md:grid-cols-12 md:items-baseline md:gap-8 md:px-4"
                >
                  <span className="font-body text-[0.82rem] text-[#FF3D8A]/80 md:col-span-1">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <h3 className="font-display text-[clamp(1.5rem,2.8vw,2.15rem)] font-bold leading-tight tracking-tight text-white transition-[text-shadow] duration-300 group-hover:[text-shadow:0_0_24px_rgba(255,61,138,0.55)] md:col-span-5">
                    {p.titre}
                  </h3>

                  <p className="max-w-[52ch] leading-relaxed text-[#9C8FB8] md:col-span-4">
                    {p.description}
                  </p>

                  <p className="text-[0.82rem] text-[#7E7196] md:col-span-2 md:text-right">
                    {p.tech.join(", ")}
                  </p>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/projects"
            className="mt-10 inline-block border-b border-transparent pb-1 text-[#9C8FB8] transition-colors duration-200 hover:border-[#FF3D8A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
          >
            Voir tous les projets
          </Link>
        </section>

        {/* ---------------- Clôture ---------------- */}
        <section className="mt-36 border-t border-white/10 pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="flex items-center gap-2.5 text-[0.85rem] text-[#CFC4E4]">
                <span className="relative flex h-2 w-2">
                  {!reduced && (
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF3D8A] opacity-60" />
                  )}
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]" />
                </span>
                Alternance 24 mois, Bordeaux, dès décembre 2026
              </p>
              <p className="mt-6 max-w-[42ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
                Si le poste existe, j&apos;aimerais en entendre parler.
              </p>
            </div>

            <Link
              href="/contact"
              className="inline-flex w-fit items-center border border-[#FF3D8A] px-8 py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_28px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
            >
              Me contacter
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}