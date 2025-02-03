'use client';

import Link from 'next/link';
import { FC, ReactNode, useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface NavItemProps {
  href: string;
  children: ReactNode;
  onClick?: () => void;
}

const navItemVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  hover: { scale: 1.1, textShadow: "0px 0px 12px rgba(255,255,255,0.8)" },
};

const NavItem: FC<NavItemProps> = ({ href, children, onClick }) => {
  return (
    <motion.div
      variants={navItemVariants}
      whileHover="hover"
      className="relative"
    >
      <Link
        href={href}
        onClick={onClick}
        className="px-4 py-2 rounded-lg text-white font-semibold transition duration-300 ease-in-out"
      >
        {children}
      </Link>
      {/* Underline animé */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-400 to-purple-500 origin-left"
      />
    </motion.div>
  );
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <header className="w-full fixed top-0 left-0 right-0 z-50">
      {/* Container avec effet glassmorphism */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-black/60 to-gray-900/60 backdrop-blur-lg shadow-2xl rounded-b-xl border-b border-gray-700"
      >
        <nav className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
          {/* Logo animé */}
          <motion.div
            whileHover={{ scale: 1.1, textShadow: "0px 0px 12px rgba(255,255,255,0.8)" }}
            className="text-4xl font-extrabold text-white"
          >
            PabloDev
          </motion.div>

          {/* Menu desktop avec staggered animation */}
          <motion.div
            className="hidden md:flex space-x-8"
            initial="initial"
            animate="animate"
            variants={{
              animate: { transition: { staggerChildren: 0.1 } }
            }}
          >
            <NavItem href="/">Accueil</NavItem>
            <NavItem href="/about">À propos</NavItem>
            <NavItem href="/experience">Expérience</NavItem>
            <NavItem href="/skills">Compétences</NavItem>
            <NavItem href="/projects">Projets</NavItem>
            <NavItem href="/contact">Contact</NavItem>
          </motion.div>

          {/* Icône du menu mobile avec rotation */}
          <motion.div
            animate={{ rotate: isOpen ? 90 : 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden text-white text-3xl cursor-pointer"
            onClick={toggleMenu}
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </motion.div>
        </nav>
      </motion.div>

      {/* Menu mobile animé */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-[80px] left-0 w-full bg-gradient-to-b from-black/80 to-gray-900/80 backdrop-blur-md px-6 py-6 flex flex-col space-y-4 border-t border-gray-700"
          >
            <NavItem href="/" onClick={closeMenu}>Accueil</NavItem>
            <NavItem href="/about" onClick={closeMenu}>À propos</NavItem>
            <NavItem href="/experience" onClick={closeMenu}>Expérience</NavItem>
            <NavItem href="/skills" onClick={closeMenu}>Compétences</NavItem>
            <NavItem href="/projects" onClick={closeMenu}>Projets</NavItem>
            <NavItem href="/contact" onClick={closeMenu}>Contact</NavItem>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
