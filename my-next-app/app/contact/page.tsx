'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import emailjs from '@emailjs/browser';

// Variants d'animation
const floatingVariants = {
  float: {
    y: [-15, 15, -15],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const particleVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: [0.4, 0.8, 0.4],
    transition: {
      delay: i * 0.1,
      duration: 2 + Math.random() * 2,
      repeat: Infinity
    }
  })
};

const formItemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2 + 0.3,
      duration: 0.6
    }
  })
};

export default function Contact() {
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setMounted(true);
      setParticles(
        Array.from({ length: 25 }, (_, i) => ({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight
        }))
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        'service_n17yb4c',
        'template_z57vnwo',
        formData,
        '_BEiR54v6SUVi6O6q'
      );
      setSuccess(true);
    } catch (error) {
      console.error('Erreur lors de l\'envoi :', error);
      alert('Une erreur s\'est produite lors de l\'envoi du message.');
    } finally {
      setIsSending(false);
    }
  };

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen flex flex-col justify-center bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white font-sans overflow-hidden">
      {/* Particules animées */}
      {particles.map(({ id, x, y }) => (
        <motion.div
          key={id}
          className="absolute w-2 h-2 bg-pink-400 rounded-full blur-[1px]"
          initial="hidden"
          animate="visible"
          variants={particleVariants}
          custom={id % 10}
          style={{ left: x, top: y }}
        />
      ))}

      <main className="relative z-10 max-w-4xl mx-auto py-20 px-6">
        <motion.div
          variants={floatingVariants}
          animate="float"
          className="relative"
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 drop-shadow-lg mb-12"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            Contactez-moi
          </motion.h1>
        </motion.div>

        <AnimatePresence mode='wait'>
          {success ? (
            <motion.div
              key="success"
              className="mt-12 p-8 bg-green-600 bg-opacity-70 rounded-xl shadow-xl backdrop-blur-md text-center text-white"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
            >
              🎉 Merci pour votre message ! Je vous répondrai dès que possible.
              <motion.div
                className="mt-4 text-4xl"
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                💌
              </motion.div>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              onSubmit={handleSubmit}
              className="mt-12 p-8 bg-gray-800 bg-opacity-70 rounded-xl shadow-xl backdrop-blur-md space-y-8 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="absolute inset-0 border-2 border-transparent rounded-xl pointer-events-none"
                animate={{
                  borderColor: ['#ec4899', '#a855f7', '#6366f1', '#ec4899'],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity
                }}
                style={{
                  background: `linear-gradient(45deg, #ec4899, #a855f7, #6366f1)`,
                  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'exclude',
                }}
              />

              {['name', 'email', 'message'].map((field, i) => (
                <motion.div
                  key={field}
                  variants={formItemVariants}
                  custom={i}
                  initial="hidden"
                  animate="visible"
                >
                  <label className={`block mb-2 font-semibold text-${{
                    name: 'pink',
                    email: 'purple',
                    message: 'indigo'
                  }[field]}-400`}>
                    {{
                      name: 'Nom',
                      email: 'Email',
                      message: 'Message'
                    }[field]}
                  </label>
                  {field !== 'message' ? (
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      placeholder={`Votre ${field === 'email' ? 'email' : 'nom'}`}
                      className="w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:shadow-lg transition-all"
                      value={formData[field as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      required
                    />
                  ) : (
                    <textarea
                      placeholder="Décrivez votre projet ou votre demande..."
                      className="w-full px-4 py-3 rounded border border-gray-700 bg-transparent text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:shadow-lg transition-all"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      required
                    />
                  )}
                </motion.div>
              ))}

              <motion.div 
                className="text-center mt-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <button
                  type="submit"
                  disabled={isSending}
                  className={`relative inline-block px-8 py-4 rounded-full shadow-md font-semibold text-white overflow-hidden transition-all ${
                    isSending ? 'bg-gray-600' : 'bg-gradient-to-r from-pink-600 to-indigo-600'
                  }`}
                >
                  <span className="relative z-10">
                    {isSending ? 'Envoi en cours...' : 'Envoyer le message'}
                  </span>
                  {isSending && (
                    <motion.div
                      className="absolute h-1 bg-purple-400 bottom-0 left-0"
                      animate={{
                        width: ['0%', '100%']
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity
                      }}
                    />
                  )}
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </main>

      <motion.footer 
        className="text-center text-gray-400 text-sm py-6 mt-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </motion.footer>
    </div>
  );
}