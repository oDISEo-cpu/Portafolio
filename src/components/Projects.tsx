import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Pencil, Trash2, Plus, X } from "lucide-react";
import { usePortfolio, Project } from "../context/PortfolioContext";

interface ProjectsProps {
  darkMode: boolean;
}

const categories = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "ia", label: "IA" },
  { id: "automatizacion", label: "Automatización" },
];

const gradients = [
  "from-emerald-500 to-cyan-500",
  "from-indigo-500 to-purple-500",
  "from-violet-500 to-pink-500",
  "from-blue-500 to-indigo-500",
  "from-orange-500 to-red-500",
  "from-pink-500 to-rose-500",
  "from-teal-500 to-green-500",
  "from-amber-500 to-yellow-500",
];

export default function Projects({ darkMode }: ProjectsProps) {
  const { projects, addProject, updateProject, deleteProject, isAdminMode } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeFilter, setActiveFilter] = useState("all");
  const [tilt, setTilt] = useState<{ [key: number]: { x: number; y: number } }>({});
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    tags: [],
    category: "web",
    features: [""],
    github: "",
    live: "",
    gradient: gradients[0],
  });
  const [tagInput, setTagInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt((prev) => ({ ...prev, [id]: { x: x * 10, y: y * -10 } }));
  };

  const handleMouseLeave = (id: number) => {
    setTilt((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      tags: [],
      category: "web",
      features: [""],
      github: "",
      live: "",
      gradient: gradients[0],
    });
    setTagInput("");
    setFeatureInput("");
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanFeatures = (formData.features || []).filter((f: string) => f.trim() !== "");
    const projectData = { ...formData, features: cleanFeatures };
    if (editingId) {
      updateProject(editingId, projectData);
    } else {
      addProject(projectData as Omit<Project, "id">);
    }
    resetForm();
  };

  const handleEdit = (project: Project) => {
    setFormData({ ...project, features: project.features.length > 0 ? project.features : [""] });
    setEditingId(project.id);
    setShowForm(true);
  };

  const addTag = () => {
    if (tagInput.trim()) {
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] });
      setTagInput("");
    }
  };

  const removeTag = (index: number) => {
    setFormData({ ...formData, tags: (formData.tags || []).filter((_: string, i: number) => i !== index) });
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] });
      setFeatureInput("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: (formData.features || []).filter((_: string, i: number) => i !== index) });
  };

  return (
    <section
      id="projects"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
    >
      {/* Background */}
      <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-purple-500" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl bg-cyan-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
            Portfolio
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Proyectos <span className="gradient-text">Destacados</span>
          </h2>
        </motion.div>

        {/* Filters + Admin Add */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === cat.id
                  ? "gradient-bg text-white shadow-lg shadow-indigo-500/25"
                  : darkMode
                  ? "bg-slate-800 text-gray-300 hover:bg-slate-700 border border-slate-700"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat.label}
            </motion.button>
          ))}
          {isAdminMode && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowForm(true)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30"
            >
              <Plus size={14} />
              Añadir
            </motion.button>
          )}
        </div>

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
                    {editingId ? "Editar" : "Nuevo"} Proyecto
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
                      placeholder="Nombre del proyecto"
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
                      placeholder="Descripción del proyecto..."
                    />
                  </div>

                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Categoría *
                    </label>
                    <select
                      value={formData.category || "web"}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className={`w-full px-4 py-2.5 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500/50 ${
                        darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                      }`}
                    >
                      <option value="web">Web</option>
                      <option value="ia">IA</option>
                      <option value="automatizacion">Automatización</option>
                    </select>
                  </div>

                  {/* Tags */}
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Tecnologías
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                        className={`flex-1 px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ej: React, Node.js..."
                      />
                      <button type="button" onClick={addTag} className="px-3 py-2 gradient-bg text-white text-sm rounded-lg">
                        +
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(formData.tags || []).map((tag: string, i: number) => (
                        <span key={i} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                          darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-100 text-gray-600"
                        }`}>
                          {tag}
                          <button type="button" onClick={() => removeTag(i)} className="hover:text-red-400">×</button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                      Características
                    </label>
                    <div className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
                        className={`flex-1 px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        placeholder="Ej: Autenticación segura..."
                      />
                      <button type="button" onClick={addFeature} className="px-3 py-2 gradient-bg text-white text-sm rounded-lg">
                        +
                      </button>
                    </div>
                    <div className="space-y-1">
                      {(formData.features || []).map((feature: string, i: number) => (
                        <div key={i} className={`flex items-center gap-2 px-2 py-1 rounded text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}>
                          <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                          <span className="flex-1">{feature}</span>
                          <button type="button" onClick={() => removeFeature(i)} className="text-red-400 hover:text-red-300 text-xs">✕</button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        GitHub URL
                      </label>
                      <input
                        type="url"
                        value={formData.github || ""}
                        onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        placeholder="https://github.com/..."
                      />
                    </div>
                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Demo URL
                      </label>
                      <input
                        type="url"
                        value={formData.live || ""}
                        onChange={(e) => setFormData({ ...formData, live: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  {/* Gradient */}
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
                          className={`w-9 h-9 rounded-lg bg-gradient-to-br ${gradient} transition-all ${
                            formData.gradient === gradient ? "scale-110 ring-2 ring-white shadow-lg" : ""
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 py-2.5 gradient-bg text-white font-medium rounded-xl shadow-lg">
                      {editingId ? "Guardar Cambios" : "Añadir Proyecto"}
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

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.15 }}
              onMouseMove={(e) => handleMouseMove(e, project.id)}
              onMouseLeave={() => handleMouseLeave(project.id)}
              style={{
                transform: `perspective(1000px) rotateX(${tilt[project.id]?.y || 0}deg) rotateY(${tilt[project.id]?.x || 0}deg)`,
                transition: "transform 0.1s ease-out",
              }}
              className={`group relative rounded-2xl overflow-hidden ${
                darkMode
                  ? "bg-slate-800 border border-slate-700 hover:border-indigo-500/50"
                  : "bg-white border border-gray-200 hover:border-indigo-300"
              } shadow-lg hover:shadow-2xl transition-shadow duration-300`}
            >
              {/* Admin controls */}
              {isAdminMode && (
                <div className="absolute top-4 right-4 flex gap-2 z-20">
                  <button
                    onClick={() => handleEdit(project)}
                    className="p-2 rounded-lg bg-blue-500/90 text-white hover:bg-blue-600 transition-colors shadow-lg"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => deleteProject(project.id)}
                    className="p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              )}

              {/* Project Image/Gradient Header */}
              <div className={`h-48 bg-gradient-to-br ${project.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">{project.title[0]}</span>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-white/10" />
                <div className="absolute -top-6 -left-6 w-20 h-20 rounded-full bg-white/10" />
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    {project.title}
                  </h3>
                  <motion.div
                    whileHover={{ scale: 1.2, rotate: 45 }}
                    className={`p-1.5 rounded-lg ${darkMode ? "text-gray-400" : "text-gray-500"}`}
                  >
                    <ArrowUpRight size={18} />
                  </motion.div>
                </div>

                <p className={`text-sm leading-relaxed ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {project.description}
                </p>

                {/* Features */}
                <div className="space-y-1.5">
                  {(project.features || []).slice(0, 3).map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {(project.tags || []).slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                        darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-3 pt-2">
                  {project.github && (
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-1.5 text-sm font-medium ${
                        darkMode ? "text-indigo-400 hover:text-indigo-300" : "text-indigo-600 hover:text-indigo-700"
                      }`}
                    >
                      <Github size={16} />
                      Código
                    </motion.a>
                  )}
                  {project.live && (
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center gap-1.5 text-sm font-medium ${
                        darkMode ? "text-cyan-400 hover:text-cyan-300" : "text-cyan-600 hover:text-cyan-700"
                      }`}
                    >
                      <ExternalLink size={16} />
                      Demo
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center py-16 rounded-2xl ${
              darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200"
            }`}
          >
            <p className={`text-lg font-medium ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              No hay proyectos en esta categoría
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
