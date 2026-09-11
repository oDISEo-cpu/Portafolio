import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Download, FolderOpen, Sparkles, Code2, Database, Brain, MapPin } from "lucide-react";

interface HeroProps {
  darkMode: boolean;
}

const techBadges = [
  { icon: "⚛️", label: "React" },
  { icon: "🟢", label: "Node.js" },
  { icon: "🐍", label: "Python" },
  { icon: "📘", label: "TypeScript" },
  { icon: "🐬", label: "MySQL" },
  { icon: "🤖", label: "AI/LLM" },
];

export default function Hero({ darkMode }: HeroProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [fotoError, setFotoError] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className={`relative min-h-screen flex items-center overflow-hidden ${
        darkMode ? "bg-slate-950" : "bg-white"
      }`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #6366F1, transparent)" }}
          animate={{ x: mousePos.x * 0.5, y: mousePos.y * 0.5 }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(circle, #8B5CF6, transparent)" }}
          animate={{ x: mousePos.x * -0.3, y: mousePos.y * -0.3 }}
          transition={{ type: "spring", stiffness: 50 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{ background: "radial-gradient(circle, #06B6D4, transparent)" }}
        />
        <div
          className={`absolute inset-0 opacity-[0.03] ${darkMode ? "opacity-[0.05]" : ""}`}
          style={{
            backgroundImage: `linear-gradient(${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px), linear-gradient(90deg, ${darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-20">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Left Content - 60% */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10"
            >
              <Sparkles size={14} className="text-indigo-400" />
              <span className={`text-sm font-medium ${darkMode ? "text-indigo-300" : "text-indigo-600"}`}>
                Disponible para proyectos
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-4"
            >
              <h1 className={`text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight ${darkMode ? "text-white" : "text-gray-900"}`}>
                Desarrollador
                <br />
                <span className="gradient-text">Full Stack</span>
              </h1>
              <p className={`text-lg sm:text-xl max-w-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Creo soluciones web inteligentes con React, Node.js, Python y automatización con IA local.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`flex items-center gap-2 ${darkMode ? "text-gray-400" : "text-gray-500"}`}
            >
              <MapPin size={16} className="text-indigo-400" />
              <span className="text-sm">Caracas, Venezuela</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-2"
            >
              {techBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium ${
                    darkMode
                      ? "bg-slate-800/80 text-gray-300 border border-slate-700"
                      : "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  <span>{badge.icon}</span>
                  <span>{badge.label}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(99, 102, 241, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
                className="px-6 py-3 gradient-bg text-white font-semibold rounded-xl shadow-lg flex items-center gap-2"
              >
                <FolderOpen size={18} />
                Ver Proyectos
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-3 font-semibold rounded-xl border-2 flex items-center gap-2 transition-all ${
                  darkMode
                    ? "border-slate-700 text-gray-300 hover:border-indigo-500 hover:text-indigo-400"
                    : "border-gray-300 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                }`}
              >
                <Download size={18} />
                Descargar CV
              </motion.button>
            </motion.div>
          </div>

          {/* Right Content - 40% */}
          <div className="lg:col-span-2 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              className="relative"
            >
              <motion.div
                animate={{
                  rotateY: mousePos.x * 0.3,
                  rotateX: -mousePos.y * 0.3,
                }}
                transition={{ type: "spring", stiffness: 100 }}
                style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
                className="relative mx-auto w-72 h-80"
              >
                <div className="absolute inset-0 rounded-3xl gradient-bg opacity-80 blur-xl" />
                <div className={`relative w-full h-full rounded-3xl overflow-hidden border-2 ${
                  darkMode ? "border-slate-700 bg-slate-800" : "border-gray-200 bg-white"
                } shadow-2xl`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center space-y-4">
                      {/* >>> FOTO CON RESPALDO AUTOMÁTICO <<< */}
                      {fotoError ? (
                        <div className="w-32 h-32 rounded-full gradient-bg flex items-center justify-center mx-auto border-4 border-purple-500/40 shadow-xl shadow-purple-500/20">
                          <span className="text-4xl font-bold text-white">DM</span>
                        </div>
                      ) : (
                        <div className="w-32 h-32 rounded-full overflow-hidden mx-auto border-4 border-purple-500/40 shadow-xl shadow-purple-500/20">
                          <img
                            src="/foto-diego.png"
                            alt="Diego Molina"
                            className="w-full h-full object-cover"
                            onError={() => setFotoError(true)}
                          />
                        </div>
                      )}
                      <div>
                        <p className={`font-bold text-lg ${darkMode ? "text-white" : "text-gray-900"}`}>Diego Molina</p>
                        <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Full Stack Developer</p>
                      </div>
                      <div className="flex justify-center gap-3">
                        <Code2 size={20} className="text-indigo-400" />
                        <Database size={20} className="text-purple-400" />
                        <Brain size={20} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center shadow-lg"
                animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Code2 size={24} className="text-white" />
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center shadow-lg"
                animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <Database size={22} className="text-white" />
              </motion.div>

              <motion.div
                className="absolute top-1/2 -right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-500 flex items-center justify-center shadow-lg"
                animate={{ y: [0, -8, 0], x: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Brain size={20} className="text-white" />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`flex flex-col items-center gap-2 ${darkMode ? "text-gray-500" : "text-gray-400"}`}
          >
            <span className="text-xs">Scroll</span>
            <ArrowDown size={16} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}