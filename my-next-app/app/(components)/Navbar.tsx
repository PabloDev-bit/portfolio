"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

/**
 * Navbar v2
 * - Même palette (noir → indigo, accents rose/pourpre)
 * - Verre + gradient subtil, bords doux, ombres propres
 * - État scrolled (opacité/blur/border renforcés)
 * - Barre de progression de scroll (top)
 * - Hover underline fluide + highlight actif
 * - Menu mobile plein écran, blur, stagger
 * - Respect prefers-reduced-motion
 */

const NAV_LINKS: { href: string; label: string }[] = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/experience", label: "Expérience" },
  { href: "/skills", label: "Compétences" },
  { href: "/projects", label: "Projets" },
  { href: "/contact", label: "Contact" },
];

function classNames(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const prefersReduced = useReducedMotion();

  // Scroll state → renforce le glass et la border
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Barre de progression du scroll (haut de page)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 22, mass: 0.2 });

  // Variants
  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  } as const;

  const mobileVariants = {
    hidden: { opacity: 0, y: -16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
  } as const;

  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Progress bar top */}
      <motion.div
        style={{ scaleX, transformOrigin: "0% 0%" }}
        className="h-0.5 bg-gradient-to-r from-pink-600 to-purple-600/90"
      />

      {/* Shell full width */}
      <div
        className={classNames(
          "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", // container
          "pt-3"
        )}
      >
        <motion.nav
          role="navigation"
          aria-label="Navigation principale"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className={classNames(
            "relative flex items-center justify-between",
            "rounded-2xl border backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]",
            "px-4 sm:px-6 py-3",
            "bg-gradient-to-br from-white/6 via-white/4 to-transparent",
            scrolled ? "border-white/15 bg-white/8" : "border-white/10"
          )}
        >
          {/* Logo */}
          <Link href="/" className="relative isolate">
            <span className="sr-only">Accueil</span>
            <motion.div
              whileHover={prefersReduced ? undefined : { scale: 1.03 }}
              className="text-2xl sm:text-3xl font-extrabold tracking-tight bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent"
            >
              PabloDev
            </motion.div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {NAV_LINKS.map((l) => {
              const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
              return (
                <motion.div key={l.href} variants={itemVariants} initial="hidden" animate="show" className="relative">
                  <Link
                    href={l.href}
                    className={classNames(
                      "group relative inline-flex items-center px-4 py-2 text-sm font-medium",
                      "rounded-full transition-colors",
                      active ? "text-white" : "text-gray-300 hover:text-white"
                    )}
                  >
                    {/* Highlight pill for active */}
                    <span
                      className={classNames(
                        "absolute inset-0 rounded-full -z-10",
                        active
                          ? "bg-gradient-to-r from-pink-600/30 to-purple-600/30 border border-white/10 backdrop-blur"
                          : ""
                      )}
                    />
                    {l.label}
                    {/* underline on hover */}
                    <motion.span
                      aria-hidden
                      className="pointer-events-none absolute left-4 right-4 -bottom-[2px] h-[2px] rounded-full bg-gradient-to-r from-pink-500 to-purple-500 origin-left"
                      initial={{ scaleX: 0 }}
                      whileHover={prefersReduced ? undefined : { scaleX: 1 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    />
                  </Link>
                </motion.div>
              );
            })}

            {/* CTA */}
            <Link
              href="/contact"
              className="ml-1 lg:ml-2 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 shadow-[0_8px_30px_rgba(136,58,234,0.35)] hover:shadow-[0_12px_42px_rgba(136,58,234,0.55)] focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60 transition-all"
            >
              Me contacter
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={toggle}
            className="md:hidden inline-flex items-center justify-center rounded-xl p-2.5 text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-pink-400/60"
          >
            {open ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileVariants}
            className="md:hidden fixed top-[52px] sm:top-[56px] left-0 right-0 z-40"
          >
            <div className="mx-4 sm:mx-6 mt-2 rounded-2xl border border-white/10 bg-gradient-to-b from-black/70 via-[#0f0720]/80 to-[#1a0933]/80 backdrop-blur-xl shadow-2xl">
              <nav className="px-4 sm:px-6 py-4 flex flex-col">
                {NAV_LINKS.map((l, i) => {
                  const active = l.href === "/" ? pathname === "/" : pathname.startsWith(l.href);
                  return (
                    <motion.div
                      key={l.href}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: prefersReduced ? 0 : 0.04 * i, duration: 0.25 }}
                    >
                      <Link
                        onClick={close}
                        href={l.href}
                        className={classNames(
                          "block w-full px-4 py-3 rounded-xl text-base font-medium",
                          active ? "text-white bg-white/5 border border-white/10" : "text-gray-300 hover:text-white hover:bg-white/5"
                        )}
                      >
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}

                <div className="mt-2 grid grid-cols-3 gap-2 px-2">
                  <a
                    href="https://github.com/PabloDev-bit"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    <FiGithub /> GitHub
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    <FiLinkedin /> LinkedIn
                  </a>
                  <a
                    href="mailto:pablopro.dev@gmail.com"
                    className="flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-200 bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    <FiMail /> Email
                  </a>
                </div>

                <Link
                  href="/contact"
                  onClick={close}
                  className="mt-3 mb-2 mx-2 inline-flex items-center justify-center rounded-full px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-pink-600 to-purple-600 shadow-[0_8px_30px_rgba(136,58,234,0.35)] hover:shadow-[0_12px_42px_rgba(136,58,234,0.55)] transition"
                >
                  Me contacter
                </Link>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
