import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Briefcase, Code2, Database, Brain, Globe, Server } from "lucide-react";

interface ExperienceProps {
  darkMode: boolean;
}

const experiences = [
  {
    title: "Freelance Full Stack Developer",
    period: "2023 - Presente",
    company: "Independiente",
    description: "Desarrollo de aplicaciones web completas, APIs REST y soluciones de automatización con IA.",
    responsibilities: [
      { icon: Globe, text: "Diseño y desarrollo de aplicaciones web responsivas con React y Node.js" },
      { icon: Server, text: "Implementación de APIs REST con Node.js y Express.js" },
      { icon: Database, text: "Gestión de bases de datos: MySQL, PostgreSQL, SQL Server" },
      { icon: Brain, text: "Automatización con Python e integración de modelos de IA local" },
      { icon: Code2, text: "Desarrollo de software personalizado según requerimientos del cliente" },
    ],
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function Experience({ darkMode }: ExperienceProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="experience"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      {/* Background */}
      <div className="absolute top-1/2 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-indigo-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
            Trayectoria
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Experiencia <span className="gradient-text">Profesional</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="relative"
            >
              {/* Timeline line */}
              <div className={`absolute left-6 md:left-8 top-0 bottom-0 w-0.5 ${darkMode ? "bg-slate-800" : "bg-gray-200"}`} />

              {/* Timeline dot */}
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute left-4 md:left-6 top-6 w-5 h-5 rounded-full gradient-bg shadow-lg shadow-indigo-500/30 z-10"
              >
                <div className="absolute inset-1 rounded-full bg-white" />
              </motion.div>

              {/* Content Card */}
              <div className={`ml-16 md:ml-20 p-6 md:p-8 rounded-2xl ${
                darkMode
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-gray-50 border border-gray-200"
              }`}>
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                  <div>
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {exp.title}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
                      {exp.company}
                    </p>
                  </div>
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                    darkMode ? "bg-indigo-500/20 text-indigo-300" : "bg-indigo-100 text-indigo-700"
                  }`}>
                    <Briefcase size={14} />
                    {exp.period}
                  </span>
                </div>

                <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {exp.description}
                </p>

                {/* Responsibilities */}
                <div className="space-y-3">
                  {exp.responsibilities.map((resp, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-xl ${
                        darkMode ? "bg-slate-900/50" : "bg-white"
                      }`}
                    >
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${exp.gradient} flex-shrink-0`}>
                        <resp.icon size={16} className="text-white" />
                      </div>
                      <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {resp.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
