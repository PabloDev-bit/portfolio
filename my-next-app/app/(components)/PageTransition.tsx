"use client";

import { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

/**
 * Transition d'entrée uniquement.
 *
 * Pas d'AnimatePresence ni d'animation de sortie : dans l'App Router, le
 * contenu est remplacé dès la navigation, donc retenir l'ancien pour le faire
 * sortir produit une fenêtre vide — l'écran noir au changement rapide de page.
 *
 * Pas de translation non plus : un transform sur ce conteneur casserait le
 * position: fixed du fond et de la navbar.
 */
export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.22, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}