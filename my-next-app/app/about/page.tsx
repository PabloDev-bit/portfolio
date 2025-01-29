'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt, FaGraduationCap, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGFibGl0bzM1NTQwIiwiYSI6ImNtNGRkcm5pNjBrbTkycG9uaWFybTFhMzMifQ.G92iGrmTul-F96VMmdrQAw';

const Map = dynamic(() => import('react-map-gl').then(mod => mod.Map), { ssr: false });
const Marker = dynamic(() => import('react-map-gl').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-map-gl').then(mod => mod.Popup), { ssr: false });

interface Place {
  name: string;
  coords: [number, number];
  description: string;
  image?: string;
}

const visitedPlaces: Place[] = [ /* ... (mêmes données qu'avant) ... */ ];

const About = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  // Effet de particules maison
  const Particles = () => (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {[...Array(100)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-purple-500 rounded-full"
          style={{
            width: Math.random() * 5 + 2,
            height: Math.random() * 5 + 2,
            top: Math.random() * 100 + '%',
            left: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, 100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="relative min-h-screen w-full bg-neutral-950 text-white overflow-hidden">
      <motion.div 
        className="absolute inset-0 z-0 bg-gradient-to-br from-black via-violet-900/30 to-indigo-900/20"
        style={{ y }}
      >
        <Particles />
      </motion.div>

      <main className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 flex flex-col space-y-24">
        
        {/* Section Hero */}
        <section className="text-center space-y-8 relative">
          <motion.div
            className="relative z-10"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400">
              Pablo Hernandez
            </h1>
            <div className="text-xl sm:text-2xl text-gray-300 mt-6">
              <TypeAnimation
                sequence={[
                  'Développeur Full-Stack',
                  2000,
                  'Étudiant en Informatique',
                  2000,
                  'Passionné de Technologie',
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </motion.div>
        </section>

        {/* Section Parcours */}
        <motion.section 
          className="grid md:grid-cols-2 gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
        >
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-black to-gray-900 border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <FaGraduationCap className="text-4xl text-pink-500" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Parcours Académique
              </h2>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Actuellement en immersion intensive dans le développement web moderne au Cégep de Sherbrooke, 
              je maîtrise les dernières technologies front-end et back-end.
            </p>
          </div>

          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-black to-gray-900 border border-gray-800">
            <div className="flex items-center gap-4 mb-6">
              <FaLaptopCode className="text-4xl text-purple-400" />
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Expertises
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['React/Next.js', 'Node.js/Deno', 'TypeScript', 'WebGL', 'Cloud AWS', 'CI/CD'].map((skill, i) => (
                <div key={i} className="flex items-center gap-2 group">
                  <div className="h-2 w-2 bg-pink-500 rounded-full transition-all group-hover:w-4" />
                  <span className="text-gray-300">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Section Projets */}
        <section className="space-y-16">
          <motion.h2
            className="text-4xl font-bold text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-pink-500 to-purple-500 bg-clip-text text-transparent">
              Mes Projets
            </span>
          </motion.h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                title: 'Plateforme E-commerce',
                description: 'Solution complète avec paiement sécurisé',
                tech: ['Next.js', 'Node.js', 'MongoDB']
              },
              {
                title: 'Jeu 3D',
                description: 'Moteur de jeu avec WebGL',
                tech: ['Three.js', 'WebGL', 'C++']
              },
              {
                title: 'Dashboard Financier',
                description: 'Analytics temps réel',
                tech: ['React', 'D3.js', 'WebSockets']
              }
            ].map((project, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-gray-800"
              >
                <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                <p className="text-gray-400 mb-6">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs bg-gray-800 rounded-full text-pink-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Section Carte */}
        <section className="space-y-16">
          <motion.h2
            className="text-4xl font-bold text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent">
              Mes Voyages
            </span>
          </motion.h2>

          <div className="relative h-[600px] rounded-3xl overflow-hidden border-2 border-gray-800">
            <Map
              onLoad={() => setMapLoaded(true)}
              initialViewState={{
                longitude: 0,
                latitude: 20,
                zoom: 1.5
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v11"
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              {/* ... (même code pour les marqueurs et popups) ... */}
            </Map>
          </div>
        </section>

        {/* Galerie */}
        <section className="space-y-16">
          <motion.h2
            className="text-4xl font-bold text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            
          </motion.h2>

          <div className="columns-1 md:columns-2 lg:columns-3 gap-8">
            {visitedPlaces.map((place, idx) => (
              <motion.div
                key={idx}
                className="mb-8 break-inside-avoid"
                whileHover={{ scale: 1.02 }}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden">
                  <Image
                    src={place.image || '/default.jpg'}
                    alt={place.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold">{place.name}</h3>
                    <p className="text-gray-300 text-sm mt-1">{place.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;