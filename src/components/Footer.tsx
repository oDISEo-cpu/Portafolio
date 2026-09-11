import { motion } from "framer-motion";
import { ArrowUp, Github, Linkedin, Mail, Heart } from "lucide-react";

interface FooterProps {
  darkMode: boolean;
}

export default function Footer({ darkMode }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const quickLinks = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Repos", id: "repos" },
    { label: "Certificados", id: "certificates" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <footer className={`relative py-12 ${darkMode ? "bg-slate-950 border-t border-slate-800" : "bg-white border-t border-gray-200"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          {/* Logo & Copyright */}
          <div className="text-center md:text-left">
            <div className="flex items-center gap-3 justify-center md:justify-start mb-3">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center">
                <span className="text-white font-bold text-xs">DM</span>
              </div>
              <span className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                Diego Molina
              </span>
            </div>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              © 2026 Diego Molina. Todos los derechos reservados.
            </p>
            
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => document.getElementById(link.id)?.scrollIntoView({ behavior: "smooth" })}
                className={`text-sm transition-colors ${
                  darkMode ? "text-gray-400 hover:text-indigo-400" : "text-gray-500 hover:text-indigo-600"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-3">
            <motion.a
              href="https://github.com/oDISEo-cpu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2.5 rounded-lg transition-all ${
                darkMode
                  ? "bg-slate-800 text-gray-400 hover:text-white hover:bg-slate-700"
                  : "bg-gray-100 text-gray-500 hover:text-gray-900 hover:bg-gray-200"
              }`}
            >
              <Github size={18} />
            </motion.a>
            <motion.a
              href="https://linkedin.com/in/diego-alexander-molina-caro-a82757368"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2.5 rounded-lg transition-all ${
                darkMode
                  ? "bg-slate-800 text-gray-400 hover:text-blue-400 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-500 hover:text-blue-600 hover:bg-gray-200"
              }`}
            >
              <Linkedin size={18} />
            </motion.a>
            <motion.a
              href="mailto:dm30525331@gmail.com"
              whileHover={{ scale: 1.1, y: -2 }}
              className={`p-2.5 rounded-lg transition-all ${
                darkMode
                  ? "bg-slate-800 text-gray-400 hover:text-indigo-400 hover:bg-slate-700"
                  : "bg-gray-100 text-gray-500 hover:text-indigo-600 hover:bg-gray-200"
              }`}
            >
              <Mail size={18} />
            </motion.a>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 p-3 rounded-full gradient-bg text-white shadow-lg shadow-indigo-500/25 z-40"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
}
