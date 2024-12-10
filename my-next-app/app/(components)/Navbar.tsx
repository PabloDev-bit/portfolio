'use client';

import Link from 'next/link'
import { FC, ReactNode, useState } from 'react'
import { FaBars, FaTimes } from 'react-icons/fa'

interface NavItemProps {
  href: string
  children: ReactNode
  onClick?: () => void
}

const NavItem: FC<NavItemProps> = ({ href, children, onClick }) => {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="relative group text-white transition-colors duration-300 ease-in-out"
    >
      {children}
      {/* Ligne animée au survol */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-500 to-blue-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
    </Link>
  )
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className="w-full py-4 px-6 bg-black/30 backdrop-blur fixed top-0 left-0 right-0 z-20 shadow-sm">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        {/* Logo */}
        <div className="text-2xl font-bold text-white">
          PabloDev
        </div>

        {/* Menu icon pour mobile */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Liens (Desktop) */}
        <div className="hidden md:flex space-x-6 text-white font-medium">
          <NavItem href="/">Accueil</NavItem>
          <NavItem href="/about">À propos</NavItem>
          <NavItem href="/skills">Expérience</NavItem>
          <NavItem href="/skills">Compétences</NavItem>
          <NavItem href="/projects">Projets</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </div>

      </nav>

      {/* Menu déroulant (Mobile) */}
      {isOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full bg-black/70 backdrop-blur px-6 py-4 flex flex-col space-y-4 text-white font-medium z-10">
          <NavItem href="/" onClick={closeMenu}>Accueil</NavItem>
          <NavItem href="/about" onClick={closeMenu}>À propos</NavItem>
          <NavItem href="/skills" onClick={closeMenu}>Expérience</NavItem>
          <NavItem href="/skills" onClick={closeMenu}>Compétences</NavItem>
          <NavItem href="/projects" onClick={closeMenu}>Projets</NavItem>
          <NavItem href="/contact" onClick={closeMenu}>Contact</NavItem>
        </div>
      )}
    </header>
  )
}
