import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Pencil, Plus, RotateCcw, Shield, Github, Award, User } from "lucide-react";
import { usePortfolio } from "../context/PortfolioContext";

interface AdminButtonProps {
  darkMode: boolean;
}

export default function AdminButton({ darkMode }: AdminButtonProps) {
  const { isAdminMode, toggleAdminMode, personalInfo, updatePersonalInfo } = usePortfolio();
  const [showPanel, setShowPanel] = useState(false);
  const [activeTab, setActiveTab] = useState<"info" | "actions">("info");
  const [editInfo, setEditInfo] = useState(personalInfo);

  const handleSaveInfo = () => {
    updatePersonalInfo(editInfo);
    setShowPanel(false);
  };

  const handleResetAll = () => {
    if (window.confirm("¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer.")) {
      localStorage.removeItem("portfolio_projects");
      localStorage.removeItem("portfolio_certificates");
      localStorage.removeItem("portfolio_repos");
      localStorage.removeItem("portfolio_info");
      window.location.reload();
    }
  };

  const tabs = [
    { id: "info" as const, label: "Info Personal", icon: User },
    { id: "actions" as const, label: "Acciones", icon: Settings },
  ];

  return (
    <>
      {/* Floating Admin Button */}
      <motion.button
        onClick={() => setShowPanel(!showPanel)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`fixed bottom-6 left-6 z-40 p-3.5 rounded-full shadow-2xl transition-all ${
          isAdminMode
            ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
            : darkMode
            ? "bg-slate-800 text-gray-400 border border-slate-700 hover:text-white"
            : "bg-white text-gray-500 border border-gray-200 hover:text-gray-900 shadow-lg"
        }`}
        title="Panel de Administración"
      >
        {isAdminMode ? <Shield size={20} /> : <Settings size={20} />}
        {isAdminMode && (
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        )}
      </motion.button>

      {/* Admin Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowPanel(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-2xl rounded-2xl overflow-hidden ${
                darkMode ? "bg-slate-800 border border-slate-700" : "bg-white border border-gray-200"
              } shadow-2xl max-h-[90vh] flex flex-col`}
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-700/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${isAdminMode ? "bg-amber-500/20" : darkMode ? "bg-slate-700" : "bg-gray-100"}`}>
                    <Shield size={20} className={isAdminMode ? "text-amber-400" : darkMode ? "text-gray-400" : "text-gray-500"} />
                  </div>
                  <div>
                    <h2 className={`text-lg font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      Panel de Administración
                    </h2>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {isAdminMode ? "Modo edición activo" : "Modo solo lectura"}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPanel(false)}
                  className={`p-2 rounded-lg ${darkMode ? "hover:bg-slate-700 text-gray-400" : "hover:bg-gray-100 text-gray-500"}`}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Tabs */}
              <div className={`flex border-b ${darkMode ? "border-slate-700" : "border-gray-200"}`}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 text-sm font-medium transition-all ${
                      activeTab === tab.id
                        ? darkMode
                          ? "text-indigo-400 border-b-2 border-indigo-400"
                          : "text-indigo-600 border-b-2 border-indigo-600"
                        : darkMode
                        ? "text-gray-400 hover:text-gray-300"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <tab.icon size={16} />
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeTab === "info" && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Nombre
                        </label>
                        <input
                          type="text"
                          value={editInfo.name}
                          onChange={(e) => setEditInfo({ ...editInfo, name: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                            darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Título
                        </label>
                        <input
                          type="text"
                          value={editInfo.title}
                          onChange={(e) => setEditInfo({ ...editInfo, title: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                            darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Email
                        </label>
                        <input
                          type="email"
                          value={editInfo.email}
                          onChange={(e) => setEditInfo({ ...editInfo, email: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                            darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          Teléfono
                        </label>
                        <input
                          type="text"
                          value={editInfo.phone}
                          onChange={(e) => setEditInfo({ ...editInfo, phone: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                            darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Ubicación
                      </label>
                      <input
                        type="text"
                        value={editInfo.location}
                        onChange={(e) => setEditInfo({ ...editInfo, location: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          GitHub URL
                        </label>
                        <input
                          type="url"
                          value={editInfo.github}
                          onChange={(e) => setEditInfo({ ...editInfo, github: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                            darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                          LinkedIn URL
                        </label>
                        <input
                          type="url"
                          value={editInfo.linkedin}
                          onChange={(e) => setEditInfo({ ...editInfo, linkedin: e.target.value })}
                          className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm ${
                            darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Biografía
                      </label>
                      <textarea
                        value={editInfo.bio}
                        onChange={(e) => setEditInfo({ ...editInfo, bio: e.target.value })}
                        rows={3}
                        className={`w-full px-3 py-2 rounded-lg border outline-none focus:ring-2 focus:ring-indigo-500/50 text-sm resize-none ${
                          darkMode ? "bg-slate-900 border-slate-600 text-white" : "bg-gray-50 border-gray-300 text-gray-900"
                        }`}
                      />
                    </div>

                    <div className="flex items-center gap-3">
                      <label className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        Disponible para proyectos
                      </label>
                      <button
                        onClick={() => setEditInfo({ ...editInfo, available: !editInfo.available })}
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          editInfo.available ? "bg-indigo-500" : darkMode ? "bg-slate-600" : "bg-gray-300"
                        }`}
                      >
                        <div
                          className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                            editInfo.available ? "translate-x-5" : "translate-x-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === "actions" && (
                  <div className="space-y-4">
                    {/* Admin Mode Toggle */}
                    <div className={`p-4 rounded-xl ${darkMode ? "bg-slate-900/50 border border-slate-700" : "bg-gray-50 border border-gray-200"}`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isAdminMode ? "bg-amber-500/20" : darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
                            <Pencil size={18} className={isAdminMode ? "text-amber-400" : darkMode ? "text-gray-400" : "text-gray-500"} />
                          </div>
                          <div>
                            <p className={`font-medium text-sm ${darkMode ? "text-white" : "text-gray-900"}`}>
                              Modo Edición
                            </p>
                            <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                              Permite añadir, editar y eliminar contenido
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={toggleAdminMode}
                          className={`relative w-11 h-6 rounded-full transition-colors ${
                            isAdminMode ? "bg-amber-500" : darkMode ? "bg-slate-600" : "bg-gray-300"
                          }`}
                        >
                          <div
                            className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
                              isAdminMode ? "translate-x-5" : "translate-x-0.5"
                            }`}
                          />
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className={`p-4 rounded-xl ${darkMode ? "bg-slate-900/50 border border-slate-700" : "bg-gray-50 border border-gray-200"}`}>
                      <p className={`font-medium text-sm mb-3 ${darkMode ? "text-white" : "text-gray-900"}`}>
                        Acciones Rápidas
                      </p>
                      <div className="space-y-2">
                        <a
                          href="https://github.com/oDISEo-cpu"
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                            darkMode ? "hover:bg-slate-800" : "hover:bg-gray-100"
                          }`}
                        >
                          <Github size={18} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                          <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                            Ir a mi GitHub
                          </span>
                        </a>
                      </div>
                    </div>

                    {/* Reset */}
                    <div className={`p-4 rounded-xl border ${darkMode ? "bg-red-500/5 border-red-500/20" : "bg-red-50 border-red-200"}`}>
                      <div className="flex items-center gap-3 mb-3">
                        <RotateCcw size={18} className="text-red-400" />
                        <p className={`font-medium text-sm ${darkMode ? "text-red-300" : "text-red-700"}`}>
                          Zona de Peligro
                        </p>
                      </div>
                      <p className={`text-xs mb-3 ${darkMode ? "text-red-400/70" : "text-red-600/70"}`}>
                        Restablecer todos los datos a los valores por defecto. Esta acción no se puede deshacer.
                      </p>
                      <button
                        onClick={handleResetAll}
                        className="px-4 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
                      >
                        Restablecer Todo
                      </button>
                    </div>

                    {/* Info */}
                    <div className={`p-4 rounded-xl ${darkMode ? "bg-indigo-500/5 border border-indigo-500/20" : "bg-indigo-50 border border-indigo-200"}`}>
                      <p className={`text-xs ${darkMode ? "text-indigo-300" : "text-indigo-700"}`}>
                        💡 <strong>Tip:</strong> Activa el modo edición para ver botones de editar/eliminar en proyectos, certificados y repositorios. 
                        Los cambios se guardan automáticamente en tu navegador.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              {activeTab === "info" && (
                <div className={`p-4 border-t ${darkMode ? "border-slate-700" : "border-gray-200"} flex gap-3`}>
                  <button
                    onClick={handleSaveInfo}
                    className="flex-1 py-2.5 gradient-bg text-white font-medium rounded-xl shadow-lg"
                  >
                    Guardar Cambios
                  </button>
                  <button
                    onClick={() => setShowPanel(false)}
                    className={`px-5 py-2.5 rounded-xl font-medium ${
                      darkMode ? "bg-slate-700 text-gray-300" : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    Cancelar
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
