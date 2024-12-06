'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMove = (e: PointerEvent) => {
      if(cursorRef.current) {
        // On met directement la position, sans transition css lourde
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    }
    // Utilisation de pointermove pour une meilleure réactivité
    document.addEventListener('pointermove', handleMove, { passive: true })
    return () => document.removeEventListener('pointermove', handleMove)
  }, [])

  return (
    <div 
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[9999] w-6 h-6 rounded-full bg-primary/80 backdrop-blur-sm transform -translate-x-1/2 -translate-y-1/2"
      style={{ mixBlendMode: 'exclusion' }}
    />
  )
}
