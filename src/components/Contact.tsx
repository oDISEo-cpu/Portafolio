import { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin, Mail, Phone, Github, Linkedin,
  Send, Lightbulb, CheckCircle2, AlertCircle, Loader2,
} from "lucide-react";
import emailjs from "@emailjs/browser";

// === PEGA AQUÍ TUS 3 CLAVES DE EMAILJS ===
const EMAILJS_SERVICE_ID = "service_qvz8xuh";
const EMAILJS_TEMPLATE_ID = "template_pdqb797";
const EMAILJS_PUBLIC_KEY = "pfm1i63Sw50cnzCoP";

interface ContactProps {
  darkMode: boolean;
}

const infoCards = [
  { icon: MapPin, label: "Ubicación", value: "Caracas, Venezuela", href: "" },
  { icon: Mail, label: "Email", value: "dm30525331@gmail.com", href: "mailto:dm30525331@gmail.com" },
  { icon: Phone, label: "Teléfono", value: "+58 412 7610660", href: "tel:+584127610660" },
];

export default function Contact({ darkMode }: ContactProps) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setStatus("sent");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (err) {
      console.error("Error al enviar el mensaje:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 6000);
    }
  };

  const inputClasses = `w-full px-4 py-3 rounded-xl border outline-none transition-all focus:ring-2 focus:ring-indigo-500/50 ${
    darkMode
      ? "bg-slate-900/60 border-slate-700 text-white placeholder-gray-500"
      : "bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-400"
  }`;

  return (
    <section id="contact" className={`py-24 relative overflow-hidden ${darkMode ? "bg-slate-950" : "bg-white"}`}>
      {/* Encabezado */}
      <div className="text-center mb-16 px-4">
        <h2 className={`text-4xl sm:text-5xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
          ¿Trabajamos <span className="gradient-text">juntos?</span>
        </h2>
        <p className={`mt-4 text-lg ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
          Estoy disponible para proyectos freelance y oportunidades full-time
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
        {/* Columna izquierda: info */}
        <div className="space-y-6">
          {infoCards.map((card) => (
            <motion.div
              key={card.label}
              whileHover={{ x: 5 }}
              className={`flex items-center gap-4 p-5 rounded-2xl border ${
                darkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-gray-200 shadow-md"
              }`}
            >
              <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center shrink-0">
                <card.icon size={22} className="text-white" />
              </div>
              <div>
                <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{card.label}</p>
                {card.href ? (
                  <a
                    href={card.href}
                    className={`font-bold ${darkMode ? "text-white hover:text-indigo-400" : "text-gray-900 hover:text-indigo-600"} transition-colors`}
                  >
                    {card.value}
                  </a>
                ) : (
                  <p className={`font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>{card.value}</p>
                )}
              </div>
            </motion.div>
          ))}

          {/* Redes */}
          <div>
            <h3 className={`text-lg font-bold mb-4 ${darkMode ? "text-white" : "text-gray-900"}`}>Sígueme</h3>
            <div className="flex gap-4">
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href="https://github.com/oDISEo-cpu"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-300 hover:border-indigo-500 hover:text-indigo-400"
                    : "bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                }`}
              >
                <Github size={22} />
              </motion.a>
              <motion.a
                whileHover={{ y: -4, scale: 1.05 }}
                href="https://www.linkedin.com/in/diego-alexander-molina-caro-a82757368"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className={`w-14 h-14 rounded-xl flex items-center justify-center border transition-colors ${
                  darkMode
                    ? "bg-slate-800 border-slate-700 text-gray-300 hover:border-indigo-500 hover:text-indigo-400"
                    : "bg-white border-gray-200 text-gray-700 hover:border-indigo-500 hover:text-indigo-600"
                }`}
              >
                <Linkedin size={22} />
              </motion.a>
            </div>
          </div>

          {/* Card idea */}
          <div className={`p-6 rounded-2xl border ${
            darkMode ? "bg-indigo-500/10 border-indigo-500/20" : "bg-indigo-50 border-indigo-100"
          }`}>
            <Lightbulb size={24} className="text-yellow-400 mb-3" />
            <h3 className={`font-bold text-lg mb-2 ${darkMode ? "text-white" : "text-gray-900"}`}>
              ¿Tienes una idea?
            </h3>
            <p className={darkMode ? "text-gray-400" : "text-gray-600"}>
              Conviértela en realidad con soluciones web inteligentes. Respondo en menos de 24 horas.
            </p>
          </div>
        </div>

        {/* Columna derecha: formulario */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className={`p-8 rounded-2xl border space-y-5 ${
            darkMode ? "bg-slate-800/60 border-slate-700" : "bg-white border-gray-200 shadow-xl"
          }`}
        >
          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Nombre
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Asunto
            </label>
            <input
              type="text"
              name="subject"
              required
              value={form.subject}
              onChange={handleChange}
              placeholder="¿En qué puedo ayudarte?"
              className={inputClasses}
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-2 ${darkMode ? "text-gray-300" : "text-gray-700"}`}>
              Mensaje
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={form.message}
              onChange={handleChange}
              placeholder="Cuéntame sobre tu proyecto..."
              className={`${inputClasses} resize-none`}
            />
          </div>

          <motion.button
            whileHover={{ scale: status === "sending" ? 1 : 1.02 }}
            whileTap={{ scale: status === "sending" ? 1 : 0.98 }}
            type="submit"
            disabled={status === "sending"}
            className={`w-full py-4 gradient-bg text-white font-semibold rounded-xl flex items-center justify-center gap-2 shadow-lg transition-opacity ${
              status === "sending" ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {status === "sending" ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
            {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
          </motion.button>

          {/* Mensajes de estado */}
          {status === "sent" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400"
            >
              <CheckCircle2 size={20} />
              <p className="text-sm font-medium">¡Mensaje enviado! Te responderé lo antes posible. 🚀</p>
            </motion.div>
          )}
          {status === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400"
            >
              <AlertCircle size={20} />
              <p className="text-sm font-medium">Hubo un error al enviar. Intenta de nuevo o escríbeme directo a mi correo.</p>
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  );
}