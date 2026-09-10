import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Brain, Briefcase } from "lucide-react";

interface AboutProps {
  darkMode: boolean;
}

const stats = [
  { icon: Briefcase, label: "Proyectos", value: 3, suffix: "+" },
  { icon: Code2, label: "Tecnologías", value: 10, suffix: "+" },
  { icon: Database, label: "Años Exp.", value: 1, suffix: "+" },
  { icon: Brain, label: "Clientes", value: 5, suffix: "+" },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
}

export default function About({ darkMode }: AboutProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="about"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-indigo-500" />
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-purple-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
            Conóceme
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Sobre <span className="gradient-text">Mí</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - About text & stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className={`space-y-4 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
              <p className="text-lg leading-relaxed">
                Desarrollador Full Stack con experiencia en aplicaciones web, APIs REST, 
                automatizaciones y software personalizado. Especializado en JavaScript, 
                TypeScript, React, Node.js, Express.js y bases de datos SQL.
              </p>
              <p className="text-lg leading-relaxed">
                Experiencia en Python e integración de modelos de lenguaje locales 
                (Ollama, Gemma, Qwen). Apasionado por crear soluciones innovadoras 
                que combinen tecnología y creatividad.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className={`p-4 rounded-2xl text-center ${
                    darkMode
                      ? "bg-slate-800/50 border border-slate-700"
                      : "bg-white border border-gray-200 shadow-sm"
                  }`}
                >
                  <stat.icon size={24} className="mx-auto mb-2 text-indigo-400" />
                  <div className={`text-2xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Languages */}
            <div className={`p-6 rounded-2xl ${darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200 shadow-sm"}`}>
              <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                🌍 Idiomas
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Español</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${darkMode ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"}`}>
                    Nativo
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={darkMode ? "text-gray-300" : "text-gray-600"}>Inglés</span>
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${darkMode ? "bg-purple-500/20 text-purple-300" : "bg-purple-100 text-purple-700"}`}>
                    B2
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right - Skills bars */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
              Competencias Principales
            </h3>
            {[
              { name: "JavaScript / TypeScript", level: 90, color: "from-yellow-400 to-amber-500" },
              { name: "React / Node.js", level: 85, color: "from-blue-400 to-indigo-500" },
              { name: "Python / SQL", level: 80, color: "from-green-400 to-emerald-500" },
              { name: "IA / LLMs", level: 75, color: "from-purple-400 to-violet-500" },
              { name: "HTML5 / CSS3", level: 92, color: "from-orange-400 to-red-500" },
              { name: "APIs REST", level: 88, color: "from-cyan-400 to-teal-500" },
            ].map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex justify-between mb-2">
                  <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {skill.name}
                  </span>
                  <span className={`text-sm font-bold ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className={`h-3 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${skill.level}%` } : {}}
                    transition={{ duration: 1.5, delay: 0.6 + index * 0.1, ease: "easeOut" }}
                    className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                  />
                </div>
              </motion.div>
            ))}

            {/* Quick info cards */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className={`p-4 rounded-xl ${darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200 shadow-sm"}`}>
                <p className="text-2xl mb-1">🎯</p>
                <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Enfocado</p>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>En resultados</p>
              </div>
              <div className={`p-4 rounded-xl ${darkMode ? "bg-slate-800/50 border border-slate-700" : "bg-white border border-gray-200 shadow-sm"}`}>
                <p className="text-2xl mb-1">🚀</p>
                <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>Innovador</p>
                <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>Con IA local</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
