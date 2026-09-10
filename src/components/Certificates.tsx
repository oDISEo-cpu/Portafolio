import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Award, ExternalLink, Calendar, Pencil, Trash2, Plus, X } from "lucide-react";
import { usePortfolio, Certificate } from "../context/PortfolioContext";

interface CertificatesProps {
  darkMode: boolean;
}

const gradients = [
  "from-yellow-400 to-amber-500",
  "from-cyan-400 to-blue-500",
  "from-green-400 to-emerald-500",
  "from-purple-400 to-violet-500",
  "from-pink-400 to-rose-500",
  "from-indigo-400 to-blue-500",
  "from-orange-400 to-red-500",
  "from-teal-400 to-cyan-500",
];

const icons = ["📘", "⚛️", "🟢", "🐍", "🏆", "🎓", "💎", "🚀", "🔥", "⭐"];

export default function Certificates({ darkMode }: CertificatesProps) {
  const { certificates, addCertificate, updateCertificate, deleteCertificate, isAdminMode } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: "",
    institution: "",
    date: "",
    description: "",
    credentialUrl: "",
    gradient: gradients[0],
    icon: icons[0],
  });

  const resetForm = () => {
    setFormData({
      title: "",
      institution: "",
      date: "",
      description: "",
      credentialUrl: "",
      gradient: gradients[0],
      icon: icons[0],
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

  return (
    <section
      id="certificates"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
    >
      {/* Background */}
      <div className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-amber-500" />
      <div className="absolute bottom-1/4 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-indigo-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-amber-400" : "text-amber-600"}`}>
            Logros
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Mis <span className="gradient-text">Certificados</span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Formación continua y certificaciones que respaldan mis habilidades
          </p>
        </motion.div>

        {/* Admin Add Button */}
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

        {/* Form Modal */}
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
                className={`w-full max-w-lg rounded-2xl p-6 ${
                  darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200"
                } shadow-2xl max-h-[90vh] overflow-y-auto`}
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
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="Ej: React Avanzado"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Institución *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.institution || ""}
                        onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ej: Udemy"
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Fecha *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.date || ""}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ej: 2024"
                      />
                    </div>
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Descripción
                    </label>
                    <textarea
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="Breve descripción del certificado..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      URL de credencial
                    </label>
                    <input
                      type="url"
                      value={formData.credentialUrl || ""}
                      onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="https://..."
                    />
                  </div>

                  {/* Icon selector */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Icono
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {icons.map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          onClick={() => setFormData({ ...formData, icon })}
                          className={`w-10 h-10 rounded-lg text-xl flex items-center justify-center transition-all ${
                            formData.icon === icon
                              ? "gradient-bg scale-110 shadow-lg"
                              : darkMode
                              ? "bg-slate-700 hover:bg-slate-600"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Gradient selector */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Color
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {gradients.map((gradient) => (
                        <button
                          key={gradient}
                          type="button"
                          onClick={() => setFormData({ ...formData, gradient })}
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${gradient} transition-all ${
                            formData.gradient === gradient ? "scale-110 ring-2 ring-white shadow-lg" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="flex-1 py-2.5 gradient-bg text-white font-medium rounded-xl shadow-lg"
                    >
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

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative rounded-2xl overflow-hidden ${
                darkMode
                  ? "bg-slate-800 border border-slate-700 hover:border-indigo-500/50"
                  : "bg-white border border-gray-200 hover:border-indigo-300"
              } shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              {/* Top gradient bar */}
              <div className={`h-2 bg-gradient-to-r ${cert.gradient}`} />

              {/* Admin controls */}
              {isAdminMode && (
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button
                    onClick={() => handleEdit(cert)}
                    className="p-2 rounded-lg bg-blue-500/90 text-white hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteCertificate(cert.id)}
                    className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              <div className="p-6">
                {/* Icon and title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${cert.gradient} flex items-center justify-center text-2xl shadow-lg flex-shrink-0`}>
                    {cert.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-bold text-lg leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {cert.title}
                    </h3>
                    <p className={`text-sm mt-0.5 ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                      {cert.institution}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {cert.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className={`flex items-center gap-1.5 text-xs ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
                    <Calendar size={12} />
                    <span>{cert.date}</span>
                  </div>
                  {cert.credentialUrl && cert.credentialUrl !== "#" && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center gap-1 text-xs font-medium ${
                        darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700"
                      }`}
                    >
                      <ExternalLink size={12} />
                      Ver credencial
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {certificates.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 rounded-2xl ${
              darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"
            }`}
          >
            <Award size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No hay certificados aún
            </p>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Activa el modo admin para añadir certificados
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
