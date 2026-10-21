import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { CalendarDays, Pencil, Trash2, Plus, X } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface Certificate {
  id: number;
  title: string;
  provider: string;
  description: string;
  image: string;
  year: string;
  color: string;
}

interface CertificatesProps {
  darkMode: boolean;
}

const gradients = [
  "from-orange-400 to-yellow-400",
  "from-red-400 to-pink-400",
  "from-purple-400 to-indigo-400",
  "from-indigo-400 to-blue-400",
  "from-blue-400 to-cyan-400",
  "from-green-400 to-emerald-400",
  "from-cyan-400 to-blue-400",
  "from-yellow-400 to-orange-400",
  "from-pink-400 to-rose-400",
];

export default function Certificates({ darkMode }: CertificatesProps) {
  const { certificates, addCertificate, updateCertificate, deleteCertificate, isAdminMode } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: "",
    provider: "",
    description: "",
    image: "",
    year: String(new Date().getFullYear()),
    color: gradients[0],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      provider: "",
      description: "",
      image: "",
      year: String(new Date().getFullYear()),
      color: gradients[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateCertificate(editingId, formData);
    } else {
      addCertificate(formData as Omit<Certificate, "id">);
    }
    resetForm();
  };

  const handleEdit = (cert: Certificate) => {
    setFormData(cert);
    setEditingId(cert.id);
    setShowForm(true);
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
    darkMode
      ? "bg-slate-900 border-slate-600 text-white placeholder-gray-500"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
  }`;

  return (
    <section
      id="certs"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      {/* Encabezado */}
      <div className="text-center mb-12 px-4">
        <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm">Logros</span>
        <h2 className={`text-4xl md:text-6xl font-extrabold mt-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
          Mis{" "}
          <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Certificados
          </span>
        </h2>
        <p className={`mt-4 text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Formación continua y certificaciones que respaldan mis habilidades
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* >>> BOTÓN AÑADIR (solo en modo edición) <<< */}
        {isAdminMode && !showForm && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-8"
          >
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 gradient-bg text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={18} />
              Añadir Certificado
            </button>
          </motion.div>
        )}

        {/* Modal formulario */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={resetForm}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className={`w-full max-w-lg rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto ${
                  darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200"
                }`}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {editingId ? "Editar" : "Nuevo"} Certificado
                  </h3>
                  <button onClick={resetForm} className={`p-2 rounded-lg ${darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}>
                    <X size={20} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Título *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className={inputClasses}
                      placeholder="Ej: Hacking Ético: Protege y Penetra Redes"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Proveedor *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.provider || ""}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      className={inputClasses}
                      placeholder="Ej: Udemy, Platzi, IUNAV, BIG School"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Descripción *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className={`${inputClasses} resize-none`}
                      placeholder="De qué trata el curso o certificación..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Imagen del certificado *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.image || ""}
                      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                      className={inputClasses}
                      placeholder="/certificates/mi-nuevo-certificado.png"
                    />
                    <p className={`text-xs mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                      💡 Sube la imagen a <code>public/certificates/</code> y escribe aquí su ruta, o pega una URL externa (https://...)
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Año
                      </label>
                      <input
                        type="text"
                        value={formData.year || ""}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className={inputClasses}
                        placeholder="2026"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Color
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {gradients.map((gradient) => (
                          <button
                            key={gradient}
                            type="button"
                            onClick={() => setFormData({ ...formData, color: gradient })}
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradient} transition-all ${
                              formData.color === gradient ? "scale-110 ring-2 ring-white shadow-lg" : ""
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 py-2.5 gradient-bg text-white font-medium rounded-xl shadow-lg">
                      {editingId ? "Guardar Cambios" : "Añadir Certificado"}
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className={`px-5 py-2.5 rounded-xl font-medium ${
                        darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de certificados */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert: Certificate, index: number) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(cert)}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer border shadow-lg hover:shadow-2xl transition-all duration-300 ${
                darkMode
                  ? "bg-slate-800 border-slate-700 hover:border-indigo-500/50"
                  : "bg-white border-gray-200 hover:border-indigo-300"
              }`}
            >
              {/* Controles admin */}
              {isAdminMode && (
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button
                    onClick={(e) => { e.stopPropagation(); handleEdit(cert); }}
                    className="p-2 rounded-lg bg-blue-500/90 text-white hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteCertificate(cert.id); }}
                    className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* Franja de color */}
              <div className={`h-2 bg-gradient-to-r ${cert.color}`} />

              {/* Imagen */}
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

              {/* Info */}
              <div className="p-5">
                <h3 className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>{cert.title}</h3>
                <p className="text-indigo-400 text-sm font-medium mt-1">{cert.provider}</p>
                <p className={`text-sm mt-3 leading-relaxed line-clamp-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {cert.description}
                </p>
                <div className={`flex items-center gap-2 mt-4 text-sm ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                  <CalendarDays size={16} />
                  <span>{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Visor en grande (lightbox) */}
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