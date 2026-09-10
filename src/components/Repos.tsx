import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github, Star, ExternalLink, Pencil, Trash2, Plus, X, Code2 } from "lucide-react";
import { usePortfolio, Repo } from "../context/PortfolioContext";

interface ReposProps {
  darkMode: boolean;
}

const gradients = [
  "from-emerald-500 to-teal-500",
  "from-indigo-500 to-purple-500",
  "from-violet-500 to-pink-500",
  "from-cyan-500 to-blue-500",
  "from-orange-500 to-red-500",
  "from-yellow-500 to-amber-500",
  "from-pink-500 to-rose-500",
  "from-blue-500 to-indigo-500",
];

const languages = ["JavaScript", "TypeScript", "Python", "PHP", "HTML/CSS", "SQL", "Shell", "Other"];

export default function Repos({ darkMode }: ReposProps) {
  const { repos, addRepo, updateRepo, deleteRepo, isAdminMode } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Repo>>({
    name: "",
    description: "",
    url: "",
    language: "JavaScript",
    stars: 0,
    gradient: gradients[0],
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      url: "",
      language: "JavaScript",
      stars: 0,
      gradient: gradients[0],
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateRepo(editingId, formData);
    } else {
      addRepo(formData as Omit<Repo, "id">);
    }
    resetForm();
  };

  const handleEdit = (repo: Repo) => {
    setFormData(repo);
    setEditingId(repo.id);
    setShowForm(true);
  };

  const getLanguageColor = (lang: string) => {
    const colors: { [key: string]: string } = {
      JavaScript: "bg-yellow-400",
      TypeScript: "bg-blue-500",
      Python: "bg-green-500",
      PHP: "bg-purple-500",
      "HTML/CSS": "bg-orange-500",
      SQL: "bg-cyan-500",
      Shell: "bg-gray-500",
      Other: "bg-gray-400",
    };
    return colors[lang] || "bg-gray-400";
  };

  return (
    <section
      id="repos"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl bg-green-500" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-5 blur-3xl bg-indigo-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-emerald-400" : "text-emerald-600"}`}>
            Open Source
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Mis <span className="gradient-text">Repositorios</span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Proyectos y contribuciones en mi GitHub
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
              Añadir Repositorio
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
                    {editingId ? "Editar" : "Nuevo"} Repositorio
                  </h3>
                  <button onClick={resetForm} className={`p-2 rounded-lg ${darkMode ? "hover:bg-slate-700" : "hover:bg-gray-100"}`}>
                    <X size={20} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Nombre del repositorio *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="Ej: ai-desktop-assistant"
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Descripción *
                    </label>
                    <textarea
                      required
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={3}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="Descripción del repositorio..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      URL de GitHub *
                    </label>
                    <input
                      type="url"
                      required
                      value={formData.url || ""}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                      placeholder="https://github.com/usuario/repo"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Lenguaje
                      </label>
                      <select
                        value={formData.language || "JavaScript"}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                      >
                        {languages.map((lang) => (
                          <option key={lang} value={lang}>{lang}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Estrellas
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={formData.stars || 0}
                        onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) || 0 })}
                        className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                      />
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
                      {editingId ? "Guardar Cambios" : "Añadir Repositorio"}
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

        {/* Repos Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repos.map((repo, index) => (
            <motion.a
              key={repo.id}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`group relative block rounded-2xl overflow-hidden ${
                darkMode
                  ? "bg-slate-800 border border-slate-700 hover:border-emerald-500/50"
                  : "bg-white border border-gray-200 hover:border-emerald-300"
              } shadow-lg hover:shadow-2xl transition-all duration-300`}
            >
              {/* Admin controls */}
              {isAdminMode && (
                <div className="absolute top-4 right-4 flex gap-2 z-20" onClick={(e) => e.preventDefault()}>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit(repo); }}
                    className="p-2 rounded-lg bg-blue-500/90 text-white hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); deleteRepo(repo.id); }}
                    className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* Gradient header */}
              <div className={`h-24 bg-gradient-to-br ${repo.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                  <Code2 size={60} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full bg-white/10" />
              </div>

              <div className="p-5">
                {/* Repo name */}
                <div className="flex items-center gap-2 mb-2">
                  <Github size={18} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  <h3 className={`font-bold text-lg truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {repo.name}
                  </h3>
                </div>

                {/* Description */}
                <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {repo.description}
                </p>

                {/* Footer stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-full ${getLanguageColor(repo.language)}`} />
                    <span className={`text-xs font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {repo.language}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    <Star size={12} className="text-yellow-400" />
                    <span>{repo.stars}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Empty state */}
        {repos.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 rounded-2xl ${
              darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"
            }`}
          >
            <Github size={48} className={`mx-auto mb-4 ${darkMode ? "text-gray-600" : "text-gray-300"}`} />
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No hay repositorios aún
            </p>
            <p className={`text-sm mt-1 ${darkMode ? "text-gray-500" : "text-gray-400"}`}>
              Activa el modo admin para añadir repositorios
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
