"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Backdrop from "../(components)/Backdrop";

/* ------------------------------------------------------------------ */
/* Données                                                             */
/* ------------------------------------------------------------------ */

interface Competence {
  nom: string;
  /** 4 = usage quotidien, 1 = en cours d'apprentissage */
  cran: 1 | 2 | 3 | 4;
}

interface Domaine {
  titre: string;
  description: string;
  competences: Competence[];
}

const DOMAINES: Domaine[] = [
  {
    titre: "Interface et rendu",
    description:
      "Ce que je fais le plus, et depuis le plus longtemps. Des interfaces qui chargent vite et qui tiennent sur mobile.",
    competences: [
      { nom: "React / Next.js", cran: 4 },
      { nom: "TypeScript, JavaScript ES6+", cran: 4 },
      { nom: "Tailwind CSS", cran: 4 },
      { nom: "Three.js et rendu 3D web", cran: 2 },
    ],
  },
  {
    titre: "Serveur et données",
    description:
      "Ce qui tourne derrière : les API, les bases, et la mise en ligne de tout ça.",
    competences: [
      { nom: "Node.js, Python (FastAPI)", cran: 3 },
      { nom: "SQL, PostgreSQL, Supabase", cran: 3 },
      { nom: "Git, GitHub, Vercel", cran: 3 },
      { nom: "Docker, Linux", cran: 2 },
    ],
  },
  {
    titre: "Intelligence artificielle",
    description:
      "Le terrain sur lequel je veux passer les deux prochaines années. Aujourd'hui : intégration de modèles existants.",
    competences: [
      { nom: "Python appliqué au NLP", cran: 3 },
      { nom: "Hugging Face, modèles de langage", cran: 3 },
      { nom: "Agents conversationnels", cran: 2 },
      { nom: "TensorFlow", cran: 1 },
    ],
  },
];

const LIBELLES: Record<Competence["cran"], string> = {
  4: "Quotidien",
  3: "Solide",
  2: "À l'aise",
  1: "En cours",
};

/* ------------------------------------------------------------------ */
/* Jauge à quatre crans                                                */
/* ------------------------------------------------------------------ */

function Jauge({
  cran,
  delai,
  reduced,
}: {
  cran: number;
  delai: number;
  reduced: boolean | null;
}) {
  return (
    <span aria-hidden className="flex items-center gap-1.5">
      {[1, 2, 3, 4].map((i) => {
        const allume = i <= cran;
        return (
          <motion.span
            key={i}
            initial={reduced ? false : { scaleY: 0.25, opacity: 0.35 }}
            whileInView={{ scaleY: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.4,
              delay: reduced ? 0 : delai + i * 0.06,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`block h-4 w-[3px] origin-bottom ${
              allume
                ? "bg-[#FF3D8A] shadow-[0_0_9px_rgba(255,61,138,0.85)]"
                : "bg-white/12"
            }`}
          />
        );
      })}
    </span>
  );
}

/* ------------------------------------------------------------------ */

export default function SkillsPage() {
  const reduced = useReducedMotion();

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
            Ce que je sais faire, et à quel point je le sais.
          </motion.h1>

          <p className="max-w-[46ch] leading-relaxed text-[#CFC4E4] lg:col-span-5">
            Pas de pourcentages : ils ne veulent rien dire. Quatre crans, du
            quotidien à ce que je découvre encore. Vous saurez sur quoi
            m&apos;envoyer dès la première semaine, et sur quoi j&apos;aurai
            besoin d&apos;un mois.
          </p>
        </header>

        {/* ---------------- Légende ---------------- */}
        <div className="mt-16 flex flex-wrap items-center gap-x-10 gap-y-4 border-y border-white/[0.08] py-5">
          {([4, 3, 2, 1] as const).map((c) => (
            <span key={c} className="flex items-center gap-3 text-[0.82rem] text-[#7E7196]">
              <Jauge cran={c} delai={0} reduced={reduced} />
              {LIBELLES[c]}
            </span>
          ))}
        </div>

        {/* ---------------- Domaines ---------------- */}
        <div className="mt-4">
          {DOMAINES.map((domaine) => (
            <section key={domaine.titre} className="mt-24 first:mt-20">
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                {/* Intitulé du domaine */}
                <div className="lg:col-span-4">
                  <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-bold leading-tight tracking-tight text-white">
                    {domaine.titre}
                  </h2>
                  <p className="mt-4 max-w-[42ch] leading-relaxed text-[#9C8FB8]">
                    {domaine.description}
                  </p>
                </div>

                {/* Compétences */}
                <ul className="lg:col-span-8">
                  {domaine.competences.map((c, i) => (
                    <li
                      key={c.nom}
                      className="group flex items-center justify-between gap-6 border-t border-white/[0.08] py-5 last:border-b"
                    >
                      <span className="font-display text-[1.1rem] font-medium text-[#E4DBF5] transition-colors duration-200 group-hover:text-white">
                        {c.nom}
                      </span>

                      <span className="flex shrink-0 items-center gap-5">
                        <span className="w-[5.5rem] text-right text-[0.8rem] text-[#7E7196] transition-colors duration-200 group-hover:text-[#C4B5FD]">
                          {LIBELLES[c.cran]}
                        </span>
                        <Jauge
                          cran={c.cran}
                          delai={i * 0.08}
                          reduced={reduced}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          ))}
        </div>

        {/* ---------------- Clôture ---------------- */}
        <section className="mt-32 border-t border-white/10 pt-16">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <p className="max-w-[38ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-tight tracking-tight text-white">
              La liste est honnête. Le mieux reste de regarder ce que j&apos;en
              ai fait.
            </p>

            <div className="flex flex-wrap items-center gap-8">
              <Link
                href="/projects"
                className="inline-flex items-center border border-[#FF3D8A] px-8 py-4 font-display text-[0.95rem] font-semibold tracking-wide text-[#FF3D8A] shadow-[0_0_28px_-10px_rgba(255,61,138,0.9)] transition-colors duration-200 hover:bg-[#FF3D8A] hover:text-[#0B0212] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060309]"
              >
                Voir mes projets
              </Link>

              <Link
                href="/"
                className="border-b border-transparent pb-1 text-[0.9rem] text-[#9C8FB8] transition-colors duration-200 hover:border-[#FF3D8A] hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3D8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#060309]"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}