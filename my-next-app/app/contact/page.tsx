'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message envoyé !')
  }

  return (
    <div className="max-w-3xl mx-auto py-20 px-4">
      <motion.h2 
        className="text-4xl font-bold text-center mb-8"
        initial={{opacity:0,y:20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:0.8}}
      >
        Me Contacter
      </motion.h2>
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        initial={{opacity:0, y:20}}
        whileInView={{opacity:1,y:0}}
        viewport={{once:true}}
        transition={{duration:1}}
      >
        <div>
          <label className="block mb-2">Nom</label>
          <input 
            type="text" 
            className="w-full px-3 py-2 rounded border border-gray-700 bg-transparent text-white focus:border-primary outline-none"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Email</label>
          <input 
            type="email" 
            className="w-full px-3 py-2 rounded border border-gray-700 bg-transparent text-white focus:border-primary outline-none"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>
        <div>
          <label className="block mb-2">Message</label>
          <textarea 
            className="w-full px-3 py-2 rounded border border-gray-700 bg-transparent text-white focus:border-primary outline-none" 
            rows={5}
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          />
        </div>
        <button className="bg-primary px-6 py-3 rounded font-medium hover:bg-primary-dark transition">Envoyer</button>
      </motion.form>
    </div>
  )
}
