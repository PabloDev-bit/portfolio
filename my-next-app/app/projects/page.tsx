'use client'

import { motion } from 'framer-motion'

export default function Projects() {
  const projects = [
    { title: 'Jeu Vidéo Futuriste', description: 'Un jeu 3D innovant.', tech: ['Unity', 'C#'] },
    { title: 'Site E-commerce', description: 'Plateforme réactive et scalable.', tech: ['Next.js', 'TypeScript', 'Tailwind'] },
    { title: 'Outil Cybersécurité', description: 'Analyse automatisée de vulnérabilités.', tech: ['Python', 'ML'] },
  ]
  
  return (
    <div className="max-w-6xl mx-auto py-20 px-4 space-y-12">
      <motion.h2 
        className="text-4xl font-bold text-center mb-8"
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.8}}
      >
        Mes Projets
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((proj, i) => (
          <motion.div 
            key={i} 
            className="p-6 bg-white/5 backdrop-blur rounded-lg hover:scale-105 transition transform"
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1,y:0}}
            viewport={{once:true}}
            transition={{duration:0.8, delay:i*0.2}}
          >
            <h3 className="text-2xl font-semibold">{proj.title}</h3>
            <p className="opacity-90 mt-2">{proj.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {proj.tech.map((t, idx) => (
                <span key={idx} className="bg-primary text-white px-2 py-1 rounded text-sm">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
