"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/**
 * --------------------------------------------------
 *  Types & Sample Data
 * --------------------------------------------------
 */

type ProjectTab = "web" | "ia";

interface Project {
  title: string;
  description: string;
  link: string;
  image: string; // static thumbnail path or remote url
  stack: string[];
  type: ProjectTab;
}

// 💡  Add / modify projects here – keeps JSX nice & short
const PROJECTS: Project[] = [
  {
    title: "MHNet – Nettoyage Textile Premium",
    description:
      "Site vitrine responsive pour MHNet, entreprise suisse de nettoyage textile haut de gamme (canapés, tapis, matelas, véhicules). Conçu avec Next.js, Tailwind CSS et Framer Motion, il présente services, tarifs (CHF) et formulaire de contact dans une ambiance stellaire violette assortie au branding.",
    link: "https://site-web-mhnet.vercel.app/",
    image: "/images/mhnet.png",
    stack: ["Next.js", "Tailwind", "Framer Motion"],
    type: "web",
  },
  {
    title: "CostCrafter – Comparateur de coûts",
    description:
      "Plateforme web de comparaison urbaine interactive (logement, transport, alimentation) pour expatriés.",
    link: "https://costcrafters.vercel.app/",
    image: "/images/costcrafter.png",
    stack: ["React", "Firebase"],
    type: "web",
  },
  {
    title: "Finance Forecast Hub",
    description:
      "Dashboard en temps réel de prévisions économiques et financières utilisant l'API Yahoo Finance.",
    link: "https://finance-forecast-hub.vercel.app/",
    image: "/images/finance.jpg",
    stack: ["Next.js", "Recharts", "Express"],
    type: "web",
  },
  // Exemple IA – gardé pour l'onglet IA
  {
    title: "DocPal – IA Santé (POC)",
    description:
      "Assistant de tri des symptômes connecté à l'API de l'OMS pour suggestions de parcours de soin.",
    link: "https://docpal.ai",
    image: "/thumbs/docpal.png",
    stack: ["Python", "TensorFlow", "FastAPI"],
    type: "ia",
  },
];

/**
 * --------------------------------------------------
 *  UI Components
 * --------------------------------------------------
 */

const CardVariants = {
  initial: { y: 20, opacity: 0 },
  enter: { y: 0, opacity: 1, transition: { duration: 0.35, ease: "easeOut" } },
  exit: { y: 20, opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={CardVariants}
      whileHover={{ scale: 1.03 }}
      className="relative group rounded-2xl bg-gradient-to-br from-[#251142]/70 via-[#190d38]/80 to-[#0d0926]/90 border border-violet-800/40 overflow-hidden shadow-md hover:shadow-violet-500/30 transition-shadow duration-300"
    >
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={project.image}
          alt={project.title}
          className="h-full w-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content overlay (clickable whole card) */}
      <Link
        href={project.link}
        target="_blank"
        className="absolute inset-0 z-10" // make entire card clickable
      />

      {/* Text */}
      <div className="relative z-20 p-6 backdrop-blur-md bg-[#0d0c2d]/60">
        <h3 className="text-xl font-semibold text-slate-100 mb-1">
          {project.title}
        </h3>
        <p className="text-slate-300 text-sm leading-relaxed line-clamp-3 mb-3">
          {project.description}
        </p>

        {/* Tech stack chips */}
        <div className="flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 text-xs rounded-full bg-violet-700/30 text-violet-200"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Glow border on hover */}
      <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/0 via-purple-500/0 to-violet-600/0 group-hover:from-pink-500/30 group-hover:via-purple-500/30 group-hover:to-violet-600/30 transition-colors duration-300" />
    </motion.div>
  );
}

/**
 * --------------------------------------------------
 *  Page Component
 * --------------------------------------------------
 */
export default function ProjectsPage() {
  const [tab, setTab] = useState<ProjectTab>("web");

  const filtered = PROJECTS.filter((p) => p.type === tab);

  return (
    <section className="relative py-24 px-5 md:px-16 min-h-screen isolate overflow-hidden">
      {/* Star field background (matches hero) */}
      <svg
        className="absolute inset-0 w-full h-full -z-10 animate-pulse opacity-10"
        viewBox="0 0 1000 1000"
      >
        {Array.from({ length: 120 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * 1000}
            cy={Math.random() * 1000}
            r={Math.random() * 1.5 + 0.2}
            fill="white"
          />
        ))}
      </svg>

      <div className="mx-auto max-w-5xl text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-2">
          Mes Projets
        </h2>
        <p className="text-slate-300 mb-10">
          Un aperçu sélectionné de mes réalisations les plus récentes.
        </p>

        {/* Tabs */}
        <div className="inline-flex rounded-full bg-[#1b1734] p-1 mb-12 border border-violet-700/40">
          {([
            { id: "web", label: "Projets Web" },
            { id: "ia", label: "Projets IA" },
          ] as { id: ProjectTab; label: string }[]).map(({ id, label }) => (
            <button
              key={id}
              onClick={() => setTab(id)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-colors ${{
                true: "text-white bg-violet-700 shadow-md",
                false: "text-slate-300 hover:text-white",
              }[String(tab === id)]}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Project grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid gap-8 md:gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto max-w-6xl"
        >
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}
