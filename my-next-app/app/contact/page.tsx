"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from '@emailjs/browser';
import { FaPaperPlane, FaEnvelope, FaLinkedin, FaGithub, FaCheckCircle } from "react-icons/fa";

// =============================================================
// 1. COMPOSANT DE FOND (Particules)
// =============================================================
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animId: number;
    const dpr = window.devicePixelRatio || 1;
    const stars: { x: number; y: number; r: number; opacity: number; vx: number; vy: number }[] = [];
    
    const init = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      stars.length = 0;
      const numStars = Math.floor((window.innerWidth * window.innerHeight) / 15000); 
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          r: Math.random() * 1.5 + 0.3,
          opacity: Math.random() * 0.5 + 0.3,
          vx: (Math.random() - 0.5) * 0.05,
          vy: (Math.random() - 0.5) * 0.05,
        });
      }
    };

    const render = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const gradient = ctx.createRadialGradient(window.innerWidth/2, window.innerHeight/2, 0, window.innerWidth/2, window.innerHeight/2, window.innerWidth);
      gradient.addColorStop(0, "rgba(20, 0, 50, 0)");
      gradient.addColorStop(1, "rgba(5, 0, 20, 0.3)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0,0, window.innerWidth, window.innerHeight);

      stars.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = window.innerWidth;
        if (s.x > window.innerWidth) s.x = 0;
        if (s.y < 0) s.y = window.innerHeight;
        if (s.y > window.innerHeight) s.y = 0;
        ctx.globalAlpha = s.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      });
      animId = requestAnimationFrame(render);
    };

    init();
    render();
    window.addEventListener("resize", init);
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", init); };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[0]" />;
}

// =============================================================
// 2. PAGE CONTACT PRINCIPALE
// =============================================================
export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Configuration EmailJS
  const SERVICE_ID = 'service_n17yb4c';
  const TEMPLATE_ID = 'template_z57vnwo';
  const PUBLIC_KEY = '_BEiR54v6SUVi6O6q';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setStatus('idle');

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, formData, PUBLIC_KEY);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Erreur EmailJS:', error);
      setStatus('error');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#02000a] text-white overflow-hidden selection:bg-pink-500/30 font-sans flex items-center justify-center">
      
      {/* Fond & Particules */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#02000a] via-[#0a001f] to-[#050011]" />
      <ParticleBackground />

      {/* Cercles d'ambiance */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none" />

      <main className="relative z-10 container mx-auto px-4 py-20 w-full max-w-6xl">
        
        {/* Titre */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 drop-shadow-[0_0_25px_rgba(168,85,247,0.4)] mb-4">
            Contactez-moi
          </h1>
          {/* CORRECTION : &apos; pour l'apostrophe */}
          <p className="text-gray-400 text-lg md:text-xl">
            Un projet en tête ? Une opportunité d&apos;alternance ? <br className="hidden md:block"/>
            Lançons la communication.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          
          {/* COLONNE GAUCHE : INFOS */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-pink-500/30 transition-all duration-300 group">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="p-3 rounded-full bg-pink-500/10 text-pink-400 group-hover:bg-pink-500/20 transition-colors">
                  <FaEnvelope />
                </span>
                Coordonnées
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                   <span className="w-1.5 h-1.5 rounded-full bg-pink-500"/> 
                   hernandez.pablo35540@gmail.com
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                   <span className="w-1.5 h-1.5 rounded-full bg-purple-500"/> 
                   Sherbrooke, QC (Actuel)
                </p>
                <p className="flex items-center gap-3 hover:text-white transition-colors">
                   <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"/> 
                   Bordeaux, FR (Dès Déc. 2026)
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl hover:border-purple-500/30 transition-all duration-300">
               <h3 className="text-2xl font-bold text-white mb-6">Réseaux Sociaux</h3>
               <div className="flex gap-4">
                 <SocialBtn icon={<FaGithub />} label="GitHub" href="https://github.com/PabloDev-bit" color="hover:text-white hover:bg-black" />
                 <SocialBtn icon={<FaLinkedin />} label="LinkedIn" href="https://www.linkedin.com/in/pablo-hernandez-19269531a/" color="hover:text-white hover:bg-[#0077b5]" />
               </div>
            </div>
          </motion.div>


          {/* COLONNE DROITE : FORMULAIRE */}
          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="relative"
          >
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 rounded-3xl bg-green-500/10 border border-green-500/30 backdrop-blur-xl text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                    <FaCheckCircle className="text-4xl text-green-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Message Reçu !</h3>
                  <p className="text-gray-300">Je vous répondrai dans les plus brefs délais.</p>
                  <button 
                    onClick={() => setStatus('idle')}
                    className="mt-8 px-6 py-2 rounded-full text-sm font-semibold bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="p-8 md:p-10 rounded-3xl bg-[#0d0d12] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
                  
                  {/* Bordure animée subtile */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 opacity-50" />

                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputGroup 
                        label="Nom" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Votre nom"
                      />
                      <InputGroup 
                        label="Email" 
                        name="email" 
                        type="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="exemple@mail.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={5}
                        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:bg-white/10 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                        placeholder="Parlez-moi de votre projet..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white font-bold text-lg shadow-lg hover:shadow-purple-500/25 transform hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {isSending ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Envoi en cours...
                        </>
                      ) : (
                        <>
                          <FaPaperPlane /> Envoyer le message
                        </>
                      )}
                    </button>
                    
                    {status === 'error' && (
                      <p className="text-red-400 text-sm text-center mt-2">
                        Une erreur est survenue. Veuillez réessayer.
                      </p>
                    )}
                  </div>
                </form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// =============================================================
// COMPOSANTS UI REUTILISABLES (TYPES CORRIGÉS)
// =============================================================

// Interface explicite pour InputGroup
interface InputGroupProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
}

function InputGroup({ label, name, type = "text", value, onChange, placeholder }: InputGroupProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-400 ml-1">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-pink-500 focus:bg-white/10 focus:ring-1 focus:ring-pink-500 transition-all"
        placeholder={placeholder}
      />
    </div>
  );
}

// Interface explicite pour SocialBtn
interface SocialBtnProps {
  icon: React.ReactNode;
  label: string;
  href: string;
  color: string;
}

function SocialBtn({ icon, label, href, color }: SocialBtnProps) {
  return (
    <a 
      href={href} 
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 border border-white/10 text-gray-300 transition-all duration-300 ${color}`}
    >
      <span className="text-xl">{icon}</span>
      <span className="font-medium">{label}</span>
    </a>
  );
}