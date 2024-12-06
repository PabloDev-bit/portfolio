'use client'

import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto py-20 space-y-12 px-4">
      <motion.h2 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y:20 }}
        whileInView={{ opacity: 1, y:0 }}
        viewport={{ once:true }}
        transition={{ duration: 0.8 }}
      >
        À Propos de Moi
      </motion.h2>
      <motion.p 
        className="text-lg leading-relaxed text-center max-w-3xl mx-auto opacity-90"
        initial={{ opacity:0 }}
        whileInView={{ opacity:1 }}
        viewport={{ once:true }}
        transition={{ duration:1 }}
      >
        Originaire de Saint-Malo en France, étudiant au cégep de Sherbrooke (Canada), j'ai voyagé dans plusieurs pays, acquis des perspectives culturelles variées et me passionne pour la technologie dans toutes ses dimensions.
      </motion.p>
    </div>
  )
}
