'use client'
import { useEffect, useRef } from 'react'

interface Map3DProps {
  visitedCountries: string[];
}

export default function Map3D({ visitedCountries }: Map3DProps) {
  // Cette version simplifiée n’affiche qu’un globe statique.
  // Pour une vraie map 3D : intégrer mapbox-gl, deck.gl ou react-three-fiber (globe).
  
  return (
    <div className="w-full h-96 bg-gray-800 flex items-center justify-center rounded-lg">
      <p className="opacity-80">[Ici, une carte 3D interactive du monde avec marqueurs sur {visitedCountries.join(', ')}]</p>
    </div>
  )
}
