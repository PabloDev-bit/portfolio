'use client';

import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Coordonnées des lieux visités
const visitedPlaces = [
  { name: 'Saint-Malo, France', coords: [48.6481, -2.0075] },
  { name: 'Sherbrooke, Canada', coords: [45.3959, -71.9192] },
  { name: 'Suisse (Berne)', coords: [46.94809, 7.44744] },
  { name: 'Londres, UK', coords: [51.5074, -0.1278] },
  { name: 'Mykonos, Grèce', coords: [37.4467, 25.3289] },
  { name: 'New York, USA', coords: [40.7128, -74.0060] },
  { name: 'Madrid, Espagne', coords: [40.4168, -3.7038] },
  { name: 'Málaga, Espagne', coords: [36.7213, -4.4214] },
  { name: 'Bruxelles, Belgique', coords: [50.8503, 4.3517] }
];

// Icône personnalisée pour les marqueurs
const customIcon = L.icon({
  iconUrl: '/marker-icon.png', // Mettre l'URL d'une icône personnalisée si souhaité
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: '/marker-shadow.png', // Idem
  shadowSize: [41, 41]
});

export default function About() {
  useEffect(() => {
    // Corriger un problème potentiel avec le SSR (Leaflet nécessite le window)
    // Généralement, rien de spécial n'est nécessaire si on est en 'use client' et en Next.js 13+
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-black via-purple-900 to-indigo-900 text-white font-sans">
      
      {/* Effet de particules optionnel (vous pouvez réutiliser ParticleBackground si souhaité) */}
      <div className="absolute inset-0 pointer-events-none z-0" />

      <main className="relative z-10 max-w-6xl mx-auto py-24 px-6 flex flex-col space-y-16">
        
        {/* Titre principal */}
        <section className="text-center space-y-6">
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-400 to-indigo-500 drop-shadow-lg"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            À Propos de Moi
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            Je m’appelle Pablo, j’ai 20 ans, originaire de Saint-Malo en France.  
            Actuellement étudiant en informatique au Cégep de Sherbrooke au Canada, je suis passionné par le développement web et les nouvelles technologies. Mes voyages m’ont permis d’explorer différentes cultures et perspectives, nourrissant ainsi ma créativité et mon sens de l’innovation.
          </motion.p>
        </section>

        {/* Présentation + Image */}
        <section className="flex flex-col md:flex-row items-center md:space-x-10 space-y-10 md:space-y-0">
          <motion.div
            className="flex-1 text-center md:text-left space-y-6"
            initial={{ opacity: 0, x:-40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8 }}
          >
            <h2 className="text-3xl font-bold text-white">
              Parcours & Motivation
            </h2>
            <p className="text-gray-300 leading-relaxed">
              Depuis mon plus jeune âge, je suis fasciné par le pouvoir de la technologie à relier les individus et à donner vie à des idées innovantes. Mon objectif est de créer des expériences numériques immersives, alliant esthétique, performance et accessibilité.
            </p>
            <p className="text-gray-300 leading-relaxed">
              Mon cursus au Cégep de Sherbrooke nourrit cette passion et m’offre les outils pour exceller dans le monde numérique. Chaque projet que j’entreprends est une opportunité d’apprendre, de m’améliorer et de repousser les limites de la créativité.
            </p>
          </motion.div>
          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity:0, x:40 }}
            whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.2 }}
          >
            <img
              src="/images/profile.jpg"
              alt="Photo de Pablo"
              className="w-48 h-48 rounded-full border-4 border-pink-500 shadow-xl transform hover:scale-105 transition-transform"
            />
          </motion.div>
        </section>

        {/* Carte Interractive: Les Voyages */}
        <section className="space-y-8">
          <motion.h2
            className="text-3xl font-bold text-center"
            initial={{ opacity: 0, y:40 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8 }}
          >
            Mes Voyages Autour du Monde
          </motion.h2>
          <motion.p
            className="text-gray-200 text-center max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.2 }}
          >
            J’ai eu la chance de visiter divers pays et villes : Suisse, Londres, Mykonos, New York, l’Espagne (Madrid, Málaga) et la Belgique. Chacune de ces destinations m’a marqué, élargi mes horizons et inspiré à créer avec davantage de sensibilité et d’ouverture culturelle.
          </motion.p>

          <motion.div
            className="w-full h-[600px] rounded-xl overflow-hidden shadow-2xl border border-purple-500/30"
            initial={{ opacity:0 }}
            whileInView={{ opacity:1 }}
            viewport={{ once:true }}
            transition={{ duration:1, delay:0.4 }}
          >
            <MapContainer
              center={[20, 0]} // Centre sur le monde
              zoom={2}
              style={{ width: '100%', height: '100%' }}
              scrollWheelZoom={true}
              className="z-10"
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {visitedPlaces.map((place, idx) => (
                <Marker key={idx} position={place.coords} icon={customIcon}>
                  <Popup>
                    <div className="text-sm text-gray-800">
                      {place.name}
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </section>
      </main>

      
    </div>
  );
}
