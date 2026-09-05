"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import Backdrop from "../(components)/Backdrop";

/* ------------------------------------------------------------------ */

const SERVICE_ID = "service_n17yb4c";
const TEMPLATE_ID = "template_z57vnwo";
const PUBLIC_KEY = "_BEiR54v6SUVi6O6q";

const EMAIL = "hernandez.pablo35540@gmail.com";

type Statut = "repos" | "envoi" | "envoye" | "echec";

/* ------------------------------------------------------------------ */
/* Champ de saisie : un filet, pas une boîte                           */
/* ------------------------------------------------------------------ */

function Champ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  multiline = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: string;
  multiline?: boolean;
}) {
  const commun =
    "peer w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-[1.02rem] text-white placeholder-[#5C5273] transition-colors duration-200 focus:border-[#FF3D8A] focus:outline-none focus:ring-0";

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className="mb-1 block text-[0.8rem] text-[#9C8FB8] peer-focus:text-[#FF3D8A]"
      >
        {label}
      </label>

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          rows={5}
          className={`${commun} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          autoComplete={name === "email" ? "email" : "name"}
          className={commun}
        />
      )}

      {/* Filet néon qui se déploie à la mise au point */}
      <span
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)] transition-transform duration-300 peer-focus:scale-x-100"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */

export default function ContactPage() {
  const reduced = useReducedMotion();
  const [donnees, setDonnees] = useState({ name: "", email: "", message: "" });
  const [piege, setPiege] = useState(""); // anti-robot, invisible pour l'humain
  const [statut, setStatut] = useState<Statut>("repos");

  const complet =
    donnees.name.trim().length > 1 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(donnees.email) &&
    donnees.message.trim().length > 9;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setDonnees({ ...donnees, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (piege) return; // un robot a rempli le champ caché
    if (!complet) return;

    setStatut("envoi");
    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, donnees, PUBLIC_KEY);
      setStatut("envoye");
      setDonnees({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS :", error);
      setStatut("echec");
    }
  };

  const ignite = reduced
    ? { opacity: 1 }
    : {
        opacity: [0, 1, 0.2, 1, 0.4, 1],
        transition: {
          duration: 1.1,
          times: [0, 0.08, 0.18, 0.34, 0.48, 0.72],
          ease: "easeOut" as const,
        },
      };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#060309] font-body text-[#F5EEFF] selection:bg-[#FF3D8A]/30">
      <Backdrop />

      <main className="relative z-10 mx-auto max-w-[1440px] px-5 pb-28 pt-40 sm:px-8 lg:px-12">
        {/* ---------------- Ouverture ---------------- */}
        <header className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-16">
          <motion.h1
            initial={reduced ? false : { opacity: 0 }}
            animate={ignite}
            style={{
              textShadow:
                "0 0 1px rgba(255,255,255,0.85), 0 0 14px rgba(255,61,138,0.45), 0 0 46px rgba(139,92,246,0.4), 0 0 100px rgba(139,92,246,0.2)",
            }}
            className="font-display text-[clamp(2.1rem,4.6vw,3.9rem)] font-extrabold leading-[1.02] tracking-[-0.035em] text-white lg:col-span-7"
          >
            Une offre d&apos;alternance, une question sur un projet, ou juste
            l&apos;envie d&apos;échanger.
          </motion.h1>

          <p className="max-w-[46ch] leading-relaxed text-[#CFC4E4] lg:col-span-5">
            Le formulaire arrive directement dans ma boîte. Si vous préférez
            écrire depuis votre client mail, l&apos;adresse est juste en dessous.
          </p>
        </header>

        <div className="mt-24 grid gap-16 lg:grid-cols-12 lg:gap-20">
          {/* ---------------- Coordonnées ---------------- */}
          <div className="lg:col-span-4">
            <ul>
              <li className="border-t border-white/[0.08] py-5">
                <p className="text-[0.8rem] text-[#7E7196]">Email</p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-1 inline-block border-b border-transparent font-display text-[1.05rem] text-white transition-colors duration-200 hover:border-[#FF3D8A] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
                >
                  {EMAIL}
                </a>
              </li>

              <li className="border-t border-white/[0.08] py-5">
                <p className="text-[0.8rem] text-[#7E7196]">Où je suis</p>
                <p className="mt-1 font-display text-[1.05rem] text-white">
                  Bordeaux, France
                </p>
              </li>

              <li className="border-y border-white/[0.08] py-5">
                <p className="text-[0.8rem] text-[#7E7196]">Mobilité</p>
                <p className="mt-1 font-display text-[1.05rem] text-white">
                  Bordeaux et sa région, relocalisation possible
                </p>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="https://github.com/PabloDev-bit"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#C4B5FD]/20 px-5 py-3 text-[0.88rem] text-[#C4B5FD] transition-colors duration-200 hover:border-[#FF3D8A]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
              >
                <FiGithub size={17} /> GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/pablo-hernandez-19269531a/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-[#C4B5FD]/20 px-5 py-3 text-[0.88rem] text-[#C4B5FD] transition-colors duration-200 hover:border-[#FF3D8A]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
              >
                <FiLinkedin size={17} /> LinkedIn
              </a>
            </div>

            <p className="mt-10 flex items-center gap-2.5 text-[0.85rem] text-[#CFC4E4]">
              <span className="relative flex h-2 w-2">
                {!reduced && (
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF3D8A] opacity-60" />
                )}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#FF3D8A] shadow-[0_0_10px_rgba(255,61,138,0.9)]" />
              </span>
              Alternance 24 mois, dès décembre 2026
            </p>
          </div>

          {/* ---------------- Formulaire ---------------- */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              {statut === "envoye" ? (
                <motion.div
                  key="envoye"
                  initial={reduced ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border border-[#FF3D8A]/40 px-8 py-16 text-center shadow-[0_0_60px_-24px_rgba(255,61,138,0.8)]"
                  role="status"
                >
                  <p
                    style={{
                      textShadow:
                        "0 0 1px rgba(255,255,255,0.9), 0 0 20px rgba(255,61,138,0.5), 0 0 60px rgba(139,92,246,0.4)",
                    }}
                    className="font-display text-[clamp(1.7rem,3vw,2.4rem)] font-bold tracking-tight text-white"
                  >
                    Message envoyé.
                  </p>
                  <p className="mx-auto mt-4 max-w-[38ch] leading-relaxed text-[#9C8FB8]">
                    Il est arrivé dans ma boîte. Je réponds en général sous
                    quelques jours — vérifiez vos spams si rien ne vient.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatut("repos")}
                    className="mt-10 border border-[#C4B5FD]/25 px-6 py-3 text-[0.88rem] text-[#C4B5FD] transition-colors duration-200 hover:border-[#FF3D8A]/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
                  >
                    Écrire un autre message
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="formulaire"
                  onSubmit={handleSubmit}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  noValidate
                >
                  <div className="grid gap-10 md:grid-cols-2">
                    <Champ
                      label="Votre nom"
                      name="name"
                      value={donnees.name}
                      onChange={handleChange}
                      placeholder="Camille Durand"
                    />
                    <Champ
                      label="Votre email"
                      name="email"
                      type="email"
                      value={donnees.email}
                      onChange={handleChange}
                      placeholder="camille@entreprise.fr"
                    />
                  </div>

                  <div className="mt-10">
                    <Champ
                      label="Votre message"
                      name="message"
                      value={donnees.message}
                      onChange={handleChange}
                      placeholder="Le poste, l'équipe, ce sur quoi je travaillerais…"
                      multiline
                    />
                  </div>

                  {/* Piège à robots : hors écran, jamais atteint au clavier */}
                  <div aria-hidden className="absolute -left-[9999px]">
                    <label htmlFor="societe">Ne pas remplir</label>
                    <input
                      id="societe"
                      name="societe"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={piege}
                      onChange={(e) => setPiege(e.target.value)}
                    />
                  </div>

                  <div className="mt-12 flex flex-wrap items-center gap-6">
                    <button
                      type="submit"
                      disabled={!complet || statut === "envoi"}
                      className="inline-flex items-center gap-3 border border-[#FF3D8A] px-8 py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_28px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309] disabled:cursor-not-allowed disabled:border-white/15 disabled:text-[#5C5273] disabled:shadow-none disabled:hover:bg-transparent disabled:hover:text-[#5C5273]"
                    >
                      {statut === "envoi" && (
                        <span
                          aria-hidden
                          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
                        />
                      )}
                      {statut === "envoi" ? "Envoi en cours" : "Envoyer le message"}
                    </button>

                    {!complet && (
                      <p className="text-[0.82rem] text-[#7E7196]">
                        Les trois champs sont nécessaires pour envoyer.
                      </p>
                    )}
                  </div>

                  <div aria-live="polite" className="mt-6">
                    {statut === "echec" && (
                      <p className="max-w-[52ch] text-[0.9rem] leading-relaxed text-[#FF6B6B]">
                        L&apos;envoi a échoué. Réessayez dans un instant, ou
                        écrivez-moi directement à{" "}
                        <a
                          href={`mailto:${EMAIL}`}
                          className="border-b border-[#FF6B6B]/50 text-white transition-colors hover:border-white"
                        >
                          {EMAIL}
                        </a>
                        .
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}