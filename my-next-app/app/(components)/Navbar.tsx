"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { FiMenu, FiX, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/about", label: "À propos" },
  { href: "/experience", label: "Expérience" },
  { href: "/skills", label: "Compétences" },
  { href: "/projects", label: "Projets" },
  { href: "/contact", label: "Contact" },
] as const;

const SOCIALS = [
  { href: "https://github.com/PabloDev-bit", label: "GitHub", Icon: FiGithub },
  {
    href: "https://www.linkedin.com/in/pablo-hernandez-19269531a/",
    label: "LinkedIn",
    Icon: FiLinkedin,
  },
  { href: "mailto:pablopro.dev@gmail.com", label: "Email", Icon: FiMail },
] as const;

function cx(...c: (string | false | null | undefined)[]) {
  return c.filter(Boolean).join(" ");
}

const isActive = (href: string, pathname: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  });

  // État "scrollé" : un seul booléen, donc un seul re-render.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Fermeture au changement de page.
  useEffect(() => setOpen(false), [pathname]);

  // Verrou du scroll + touche Échap quand le menu est ouvert.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={cx(
          "transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-white/10 bg-[#060309]/85 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <nav
          aria-label="Navigation principale"
          className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12"
        >
          {/* Marque */}
          <Link
            href="/"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
          >
            <span
              aria-hidden
              className="grid h-9 w-9 place-items-center border border-[#FF3D8A]/55 font-display text-[0.8rem] font-extrabold tracking-tight text-[#FF3D8A] shadow-[0_0_22px_-8px_rgba(255,61,138,0.9)] transition-colors duration-200 group-hover:bg-[#FF3D8A] group-hover:text-[#0B0212]"
            >
              PH
            </span>
            <span className="font-display text-[1.05rem] font-bold tracking-tight text-white">
              PabloDev
            </span>
          </Link>

          {/* Liens desktop */}
          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((l) => {
              const active = isActive(l.href, pathname);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cx(
                    "relative px-4 py-2 text-[0.9rem] transition-colors duration-200",
                    "focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]",
                    active ? "text-white" : "text-[#9C8FB8] hover:text-[#E4DBF5]"
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden
                      className="absolute inset-x-3 -bottom-[3px] h-px bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                    />
                  )}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className="ml-5 inline-flex items-center border border-[#FF3D8A] px-5 py-2.5 font-display text-[0.85rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_24px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
            >
              Me contacter
            </Link>
          </div>

          {/* Bouton mobile */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
            className="grid h-10 w-10 place-items-center border border-[#C4B5FD]/25 text-[#E4DBF5] transition-colors duration-200 hover:border-[#FF3D8A]/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309] md:hidden"
          >
            {open ? <FiX size={19} /> : <FiMenu size={19} />}
          </button>
        </nav>

        {/* Progression de lecture, visible seulement une fois lancé */}
        <motion.div
          aria-hidden
          style={{ scaleX: progress, transformOrigin: "0% 50%" }}
          className={cx(
            "h-px bg-[#FF3D8A] transition-opacity duration-300",
            scrolled ? "opacity-100" : "opacity-0"
          )}
        />
      </div>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-mobile"
            key="menu-mobile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="fixed inset-0 top-[72px] z-40 bg-[#060309]/97 backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col justify-between px-5 pb-10 pt-8 sm:px-8">
              <nav className="flex flex-col">
                {NAV_LINKS.map((l, i) => {
                  const active = isActive(l.href, pathname);
                  return (
                    <motion.div
                      key={l.href}
                      initial={reduced ? false : { opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduced ? 0 : 0.05 + i * 0.045, duration: 0.3 }}
                    >
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={cx(
                          "flex items-center gap-4 border-b border-white/[0.07] py-4 font-display text-[1.7rem] font-bold tracking-tight transition-colors",
                          active ? "text-white" : "text-[#9C8FB8]"
                        )}
                      >
                        {active && (
                          <span
                            aria-hidden
                            className="h-1.5 w-1.5 rounded-full bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]"
                          />
                        )}
                        {l.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  {SOCIALS.map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      {...(href.startsWith("mailto:")
                        ? {}
                        : { target: "_blank", rel: "noopener noreferrer" })}
                      className="grid h-11 w-11 place-items-center border border-[#C4B5FD]/20 text-[#C4B5FD] transition-colors duration-200 hover:border-[#FF3D8A]/60 hover:text-white"
                    >
                      <Icon size={19} />
                    </a>
                  ))}
                </div>

                <Link
                  href="/contact"
                  className="flex items-center justify-center border border-[#FF3D8A] py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212]"
                >
                  Me contacter
                </Link>

                <p className="flex items-center gap-2.5 text-[0.8rem] text-[#9C8FB8]">
                  <span className="h-2 w-2 rounded-full bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]" />
                  Disponible en alternance dès décembre 2026
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}