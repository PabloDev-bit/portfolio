// pages/About.tsx

'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import 'mapbox-gl/dist/mapbox-gl.css';
import { FaMapMarkerAlt, FaGraduationCap, FaLaptopCode, FaProjectDiagram } from 'react-icons/fa';
import type { MapProps } from 'react-map-gl';

interface Place {
  name: string;
  coords: [number, number];
  description: string;
  image?: string;
}

const visitedPlaces: Place[] = [
  {
    name: 'Saint-Malo, France',
    coords: [-2.0075, 48.6481],
    description: 'Ma ville natale, riche en histoire et en culture maritime.',
    image: '/images/saint-malo.jpg'
  },
  {
    name: 'Sherbrooke, Canada',
    coords: [-71.9192, 45.3959],
    description: 'Lieu de mes études actuelles en informatique au Cégep.',
    image: '/images/sherbrooke.jpg'
  },
  {
    name: 'Londres, UK',
    coords: [-0.1278, 51.5074],
    description: 'Immersion dans la vie cosmopolite de la capitale britannique.',
    image: '/images/londres.jpg'
  },
  {
    name: 'Mykonos, Grèce',
    coords: [25.3289, 37.4467],
    description: 'Profiter des plages magnifiques et de la vie nocturne animée.',
    image: '/images/mykonos.jpg'
  },
  {
    name: 'New York, USA',
    coords: [-74.006, 40.7128],
    description: 'Découverte de la Grosse Pomme et de ses innombrables attractions.',
    image: '/images/NewYork.jpg'
  },
  {
    name: 'Málaga, Espagne',
    coords: [-4.4214, 36.7213],
    description: 'Détente sur les plages ensoleillées et exploration culturelle.',
    image: '/images/malaga.jpg'
  },
];

const MAPBOX_TOKEN = 'pk.eyJ1IjoicGFibGl0bzM1NTQwIiwiYSI6ImNtNGRkcm5pNjBrbTkycG9uaWFybTFhMzMifQ.G92iGrmTul-F96VMmdrQAw';

// Import dynamique des composants map, avec typage
const Map = dynamic<MapProps>(() => import('react-map-gl').then(mod => mod.Map), { ssr: false });
const Marker = dynamic(() => import('react-map-gl').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-map-gl').then(mod => mod.Popup), { ssr: false });

const About: React.FC = () => {
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-black via-purple-950 to-indigo-950 text-white font-sans overflow-x-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-purple-900 to-indigo-900 opacity-70" />

      <main className="relative z-10 max-w-7xl mx-auto py-24 px-4 sm:px-6 flex flex-col space-y-24">
        
        {/* Présentation */}
        <section className="text-center space-y-6">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 drop-shadow-xl"
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            À Propos de Moi
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Je m’appelle Pablo, j’ai 20 ans, originaire de Saint-Malo en France. Actuellement étudiant en informatique au Cégep de Sherbrooke au Canada, je suis passionné par le développement web et les nouvelles technologies. Mes voyages m’ont permis d’explorer différentes cultures, alimentant ainsi ma créativité et mon sens de l’innovation.
          </motion.p>
        </section>

        {/* Parcours & Compétences */}
        <section className="space-y-12">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-pink-500 text-3xl sm:text-4xl inline-block">
              <FaGraduationCap />
            </span>
            Mon Parcours
          </motion.h2>
          <motion.div
            className="flex flex-col md:flex-row md:space-x-12 space-y-12 md:space-y-0"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {/* Éducation */}
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl backdrop-blur-md hover:bg-opacity-90 transition duration-300 flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-pink-500 mb-4 flex items-center gap-2">
                <span className="inline-block text-pink-500 text-2xl sm:text-3xl"><FaGraduationCap /></span>
                Éducation
              </h3>
              <p className="text-gray-300 text-sm sm:text-base">
                Actuellement étudiant en informatique au Cégep de Sherbrooke, je me spécialise dans les technologies web modernes et les pratiques de programmation efficaces.
              </p>
            </div>
            {/* Compétences */}
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl backdrop-blur-md hover:bg-opacity-90 transition duration-300 flex-1">
              <h3 className="text-xl sm:text-2xl font-semibold text-pink-500 mb-4 flex items-center gap-2">
                <span className="inline-block text-pink-500 text-2xl sm:text-3xl"><FaLaptopCode /></span>
                Compétences
              </h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-sm sm:text-base">
                <li>Développement Web (React, TypeScript, Tailwind CSS)</li>
                <li>Programmation Backend (Node.js, Express)</li>
                <li>Gestion de Bases de Données (MongoDB, SQL)</li>
                <li>Versioning (Git, GitHub)</li>
                <li>Conception UI/UX et performance front-end</li>
              </ul>
            </div>
          </motion.div>
        </section>

        {/* Projets */}
        <section className="space-y-12">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-pink-500 text-3xl sm:text-4xl inline-block">
              <FaProjectDiagram />
            </span>
            Mes Projets
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl backdrop-blur-md hover:bg-opacity-90 transition duration-300">
              <h3 className="text-xl font-semibold text-pink-500 mb-2">Projet E-commerce</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Une plateforme rapide, fluide et intuitive pour booster la vente de produits.
              </p>
              <a
                href="#"
                className="text-pink-500 font-semibold hover:underline hover:text-pink-400 transition-colors duration-200 text-sm"
                aria-label="En savoir plus sur le Projet E-commerce"
              >
                En savoir plus →
              </a>
            </div>
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl backdrop-blur-md hover:bg-opacity-90 transition duration-300">
              <h3 className="text-xl font-semibold text-pink-500 mb-2">Jeu 3D</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Un univers captivant développé avec Unity et C#, offrant une expérience immersive.
              </p>
              <a
                href="#"
                className="text-pink-500 font-semibold hover:underline hover:text-pink-400 transition-colors duration-200 text-sm"
                aria-label="En savoir plus sur le Jeu 3D"
              >
                En savoir plus →
              </a>
            </div>
            <div className="bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl backdrop-blur-md hover:bg-opacity-90 transition duration-300">
              <h3 className="text-xl font-semibold text-pink-500 mb-2">Dashboard Financier</h3>
              <p className="text-gray-300 mb-4 text-sm sm:text-base">
                Une analyse financière en temps réel, précise et dynamique, construite avec React et D3.js.
              </p>
              <a
                href="#"
                className="text-pink-500 font-semibold hover:underline hover:text-pink-400 transition-colors duration-200 text-sm"
                aria-label="En savoir plus sur le Dashboard Financier"
              >
                En savoir plus →
              </a>
            </div>
          </motion.div>
        </section>

        {/* Carte Interactive */}
        <section className="space-y-12">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-pink-500 text-3xl sm:text-4xl inline-block">
              <FaMapMarkerAlt />
            </span>
            Mes Voyages
          </motion.h2>

          {!mapLoaded && (
            <div className="w-full h-[400px] sm:h-[600px] flex items-center justify-center text-gray-300">
              Chargement de la carte...
            </div>
          )}

          <motion.div
            className="w-full h-[400px] sm:h-[600px] rounded-xl overflow-hidden shadow-2xl border border-purple-500/30"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Map
              onLoad={() => setMapLoaded(true)}
              initialViewState={{
                longitude: 0,
                latitude: 20,
                zoom: 1.5,
              }}
              style={{ width: '100%', height: '100%' }}
              mapStyle="mapbox://styles/mapbox/dark-v10"
              mapboxAccessToken={MAPBOX_TOKEN}
              onClick={() => setSelectedPlace(null)}
            >
              {visitedPlaces.map((place, idx) => (
                <Marker
                  key={idx}
                  longitude={place.coords[0]}
                  latitude={place.coords[1]}
                  anchor="bottom"
                  onClick={(e: any) => {
                    e.originalEvent.stopPropagation();
                    setSelectedPlace(place);
                  }}
                >
                  <span className="text-pink-500 text-2xl sm:text-3xl cursor-pointer hover:scale-110 transform transition-transform duration-200 inline-block">
                    <FaMapMarkerAlt />
                  </span>
                </Marker>
              ))}

              {selectedPlace && (
                <Popup
                  longitude={selectedPlace.coords[0]}
                  latitude={selectedPlace.coords[1]}
                  anchor="top"
                  onClose={() => setSelectedPlace(null)}
                  className="max-w-xs bg-white rounded-lg shadow-lg p-4 text-gray-800"
                >
                  <h3 className="text-lg font-semibold">{selectedPlace.name}</h3>
                  <p className="mt-2 text-sm sm:text-base">{selectedPlace.description}</p>
                  {selectedPlace.image && (
                    <div className="mt-2 relative w-full h-32">
                      <Image
                        src={selectedPlace.image}
                        alt={`Photo de ${selectedPlace.name}`}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 600px) 100vw, 600px"
                      />
                    </div>
                  )}
                </Popup>
              )}
            </Map>
          </motion.div>
        </section>

        {/* Galerie de Photos */}
        <section className="space-y-12">
          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Galerie de Photos
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            {visitedPlaces.map((place, idx) => (
              <motion.div
                key={idx}
                className="relative rounded-lg overflow-hidden shadow-xl bg-gray-800 bg-opacity-80 backdrop-blur-md hover:scale-105 transition-transform duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {place.image ? (
                  <div className="relative w-full h-32 sm:h-48">
                    <Image
                      src={place.image}
                      alt={`Photo de ${place.name}`}
                      fill
                      className="object-cover"
                      sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                      priority={idx < 3}
                    />
                  </div>
                ) : (
                  <div className="w-full h-32 sm:h-48 bg-gray-700 flex items-center justify-center">
                    <span className="text-white text-sm sm:text-base">Image Non Disponible</span>
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-transparent to-transparent p-2 sm:p-4">
                  <h3 className="text-sm sm:text-lg font-semibold text-white">{place.name}</h3>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className="text-center text-gray-400 text-sm py-6 border-t border-gray-700 mt-20 z-10">
        © {new Date().getFullYear()} Pablo - Tous droits réservés.
      </footer>
    </div>
  );
};

export default About;
