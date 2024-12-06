import Link from 'next/link'
import { FC, ReactNode } from 'react'

interface NavItemProps {
  href: string
  children: ReactNode
}

const NavItem: FC<NavItemProps> = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative group text-white transition-colors duration-300 ease-in-out"
    >
      {children}
      {/* Ligne animée au survol */}
      <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-gradient-to-r from-blue-500 to-blue-300 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-in-out"></span>
    </Link>
  )
}

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 bg-black/30 backdrop-blur fixed top-0 left-0 right-0 z-20 shadow-sm">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-2xl font-bold text-white">PabloDev</div>
        <div className="flex space-x-6 text-white font-medium">
          <NavItem href="/">Accueil</NavItem>
          <NavItem href="/about">À propos</NavItem>
          <NavItem href="/skills">Expérience</NavItem>
          <NavItem href="/skills">Compétences</NavItem>
          <NavItem href="/projects">Projets</NavItem>
          <NavItem href="/contact">Contact</NavItem>
        </div>
      </nav>
    </header>
  )
}
