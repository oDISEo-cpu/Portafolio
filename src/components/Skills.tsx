import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { skillCategories } from "../data/skills";

interface SkillsProps {
  darkMode: boolean;
}

export default function Skills({ darkMode }: SkillsProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section
      id="skills"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-white"}`}
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-5 blur-3xl bg-gradient-to-r from-indigo-500 via-purple-500 to-cyan-500" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
            Tecnologías
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            Mi <span className="gradient-text">Tech Stack</span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Herramientas y tecnologías que domino para crear soluciones completas
          </p>
        </motion.div>

        {/* Skills Grid by Category */}
        <div className="space-y-12">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: catIndex * 0.15 }}
            >
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${category.gradient}`} />
                <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {category.name}
                </h3>
                <div className={`flex-1 h-px ${darkMode ? "bg-slate-800" : "bg-gray-200"}`} />
              </div>

              {/* Skills Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: catIndex * 0.15 + skillIndex * 0.05 }}
                    onMouseEnter={() => setHoveredSkill(skill.name)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    whileHover={{ y: -5, scale: 1.02 }}
                    className={`relative group cursor-pointer rounded-xl p-4 transition-all duration-300 ${
                      darkMode
                        ? "bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10"
                        : "bg-gray-50 border border-gray-200 hover:border-indigo-300 hover:shadow-lg hover:shadow-indigo-100"
                    }`}
                  >
                    {/* Hover gradient overlay */}
                    <div
                      className={`absolute inset-0 rounded-xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                    />

                    <div className="relative z-10">
                      <span className="text-2xl mb-2 block">{skill.icon}</span>
                      <p className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>
                        {skill.name}
                      </p>

                      {/* Level indicator on hover */}
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: hoveredSkill === skill.name ? 1 : 0,
                          height: hoveredSkill === skill.name ? "auto" : 0,
                        }}
                        className="mt-2"
                      >
                        <div className={`h-1.5 rounded-full overflow-hidden ${darkMode ? "bg-slate-700" : "bg-gray-200"}`}>
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${category.gradient}`}
                            style={{ width: `${skill.level}%` }}
                          />
                        </div>
                        <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {skill.level}%
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
