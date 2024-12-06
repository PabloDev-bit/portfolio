import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="w-full py-4 px-6 bg-black/30 backdrop-blur fixed top-0 left-0 right-0 z-20">
      <nav className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="text-xl font-bold">Pablo</div>
        <div className="space-x-4">
          <Link href="/">Accueil</Link>
          <Link href="/about">À propos</Link>
          <Link href="/skills">Expérience</Link>
          <Link href="/skills">Compétences</Link>
          <Link href="/projects">Projets</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </nav>
    </header>
  )
}
