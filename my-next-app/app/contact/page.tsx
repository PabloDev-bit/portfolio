'use client';

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message envoyé !')
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white font-sans overflow-hidden">
      {/* Arrière-plan décoratif */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900 opacity-70" />

      {/* Contenu principal */}
      <main className="relative z-10 max-w-4xl mx-auto py-20 px-6">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Contactez-moi
        </motion.h1>

        <motion.p
          className="text-gray-200 text-lg md:text-xl max-w-2xl mx-auto text-center mt-6 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          Vous avez un projet, une idée ou simplement une question ? En tant que développeur web passionné, je suis prêt à donner vie à vos idées. Remplissez le formulaire ci-dessous et créons ensemble des expériences numériques inoubliables.
        </motion.p>

        <motion.form
          onSubmit={handleSubmit}
          className="mt-12 p-8 bg-gray-800 bg-opacity-70 rounded-xl shadow-xl backdrop-blur-md space-y-8"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div>
            <label className="block mb-2 font-semibold text-pink-400">Nom</label>
            <input
              type="text"
              placeholder="Votre nom"
              className="w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              aria-label="Votre nom"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-purple-400">Email</label>
            <input
              type="email"
              placeholder="Votre email"
              className="w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              aria-label="Votre email"
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-indigo-400">Message</label>
            <textarea
              placeholder="Décrivez votre projet ou votre demande..."
              className="w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              aria-label="Votre message"
            />
          </div>

          <div className="text-center mt-10">
            <button
              type="submit"
              className="inline-block bg-pink-600 px-8 py-4 rounded-full shadow-md font-semibold text-white transform hover:scale-105 transition-transform hover:shadow-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              aria-label="Envoyer le message"
            >
              Envoyer
            </button>
          </div>
        </motion.form>
      </main>

      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-700 mt-20">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  )
}
