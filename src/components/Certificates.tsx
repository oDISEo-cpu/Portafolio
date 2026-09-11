import { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, X } from 'lucide-react';
import { certificates } from '../data/certificates';

export default function Certificates() {
  const [selected, setSelected] = useState<(typeof certificates)[number] | null>(null);

  return (
    <section id="certs" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm">
            Logros
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold mt-3 text-white">
            Mis{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Certificados
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            Formación continua y certificaciones que respaldan mis habilidades
          </p>
        </div>

        {/* Grid de certificados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelected(cert)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700/60 cursor-pointer shadow-lg"
            >
              {/* Franja de color superior */}
              <div className={`h-2 bg-gradient-to-r ${cert.color}`} />

              {/* >>> AQUÍ SE MUESTRA LA IMAGEN REAL DEL CERTIFICADO <<< */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                    Ver certificado
                  </span>
                </div>
              </div>

              {/* Información */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                <p className="text-indigo-400 text-sm font-medium mt-1">{cert.provider}</p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">{cert.description}</p>
                <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm">
                  <CalendarDays size={16} />
                  <span>{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal para ver el certificado en grande al hacer clic */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-center text-white mt-4 font-semibold">
              {selected.title} — {selected.provider}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// Export adicional por si tu App.tsx lo importa como named export
export { Certificates };