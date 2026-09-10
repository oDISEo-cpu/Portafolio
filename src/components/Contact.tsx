import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, Github, Linkedin, Send, CheckCircle } from "lucide-react";

interface ContactProps {
  darkMode: boolean;
}

export default function Contact({ darkMode }: ContactProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setIsSubmitted(false), 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    { icon: MapPin, label: "Ubicación", value: "Caracas, Venezuela", href: "#" },
    { icon: Mail, label: "Email", value: "dm30525331@gmail.com", href: "mailto:dm30525331@gmail.com" },
    { icon: Phone, label: "Teléfono", value: "+58 412 7610660", href: "tel:+584127610660" },
  ];

  const socials = [
    { icon: Github, label: "GitHub", href: "https://github.com/oDISEo-cpu", color: "hover:text-white" },
    { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/diego-alexander-molina-caro-a82757368", color: "hover:text-blue-400" },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-900" : "bg-gray-50"}`}
    >
      {/* Background */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-indigo-500" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl bg-purple-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className={`text-sm font-semibold tracking-wider uppercase ${darkMode ? "text-indigo-400" : "text-indigo-600"}`}>
            Contacto
          </span>
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold mt-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
            ¿Trabajamos <span className="gradient-text">juntos?</span>
          </h2>
          <p className={`mt-4 text-lg max-w-2xl mx-auto ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
            Estoy disponible para proyectos freelance y oportunidades full-time
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className={`flex items-center gap-4 p-4 rounded-xl transition-all ${
                    darkMode
                      ? "bg-slate-800/50 border border-slate-700 hover:border-indigo-500/50"
                      : "bg-white border border-gray-200 hover:border-indigo-300 shadow-sm"
                  }`}
                >
                  <div className="p-3 rounded-xl gradient-bg">
                    <info.icon size={20} className="text-white" />
                  </div>
                  <div>
                    <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {info.label}
                    </p>
                    <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <div>
              <h3 className={`font-semibold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>
                Sígueme
              </h3>
              <div className="flex gap-4">
                {socials.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-4 rounded-xl transition-all ${
                      darkMode
                        ? "bg-slate-800 border border-slate-700 text-gray-400 hover:border-indigo-500/50"
                        : "bg-white border border-gray-200 text-gray-600 hover:border-indigo-300 shadow-sm"
                    } ${social.color}`}
                  >
                    <social.icon size={24} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Decorative card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className={`p-6 rounded-2xl ${
                darkMode
                  ? "bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
                  : "bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-200"
              }`}
            >
              <p className="text-2xl mb-2">💡</p>
              <p className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                ¿Tienes una idea?
              </p>
              <p className={`text-sm mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                Conviértela en realidad con soluciones web inteligentes. 
                Respondo en menos de 24 horas.
              </p>
            </motion.div>
          </motion.div>

          {/* Right - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3 }}
          >
            <form
              onSubmit={handleSubmit}
              className={`p-6 md:p-8 rounded-2xl space-y-5 ${
                darkMode
                  ? "bg-slate-800/50 border border-slate-700"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              {/* Name */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none ${
                    darkMode
                      ? "bg-slate-900 border-slate-600 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="Tu nombre"
                />
              </div>

              {/* Email */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none ${
                    darkMode
                      ? "bg-slate-900 border-slate-600 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="tu@email.com"
                />
              </div>

              {/* Subject */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Asunto
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none ${
                    darkMode
                      ? "bg-slate-900 border-slate-600 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="¿En qué puedo ayudarte?"
                />
              </div>

              {/* Message */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Mensaje
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`w-full px-4 py-3 rounded-xl border transition-all focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none resize-none ${
                    darkMode
                      ? "bg-slate-900 border-slate-600 text-white placeholder-gray-500"
                      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
                  }`}
                  placeholder="Cuéntame sobre tu proyecto..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full py-3.5 gradient-bg text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : isSubmitted ? (
                  <>
                    <CheckCircle size={18} />
                    ¡Mensaje Enviado!
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Enviar Mensaje
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
