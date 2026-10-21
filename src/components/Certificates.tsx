import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, X, Plus, Trash2, Upload } from 'lucide-react';
import { certificates } from '../data/certificates';
import { usePortfolio } from '../context/PortfolioContext';

interface CertItem {
  id: number;
  title: string;
  provider: string;
  description: string;
  image: string;
  year: string;
  color: string;
}

const STORAGE_KEY = 'custom-certificates';

const gradientOptions = [
  'from-orange-400 to-yellow-400',
  'from-red-400 to-pink-400',
  'from-purple-400 to-indigo-400',
  'from-blue-400 to-cyan-400',
  'from-green-400 to-emerald-400',
  'from-pink-400 to-rose-400',
];

export default function Certificates() {
  const { isAdminMode } = usePortfolio();
  const [selected, setSelected] = useState<CertItem | null>(null);
  const [customCerts, setCustomCerts] = useState<CertItem[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    provider: '',
    description: '',
    image: '',
    year: String(new Date().getFullYear()),
    color: gradientOptions[0],
  });

  // Carga los certificados añadidos desde el panel
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setCustomCerts(JSON.parse(saved));
    } catch (e) {
      console.error('Error al cargar certificados personalizados', e);
    }
  }, []);

  const persist = (list: CertItem[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      setCustomCerts(list);
    } catch (e) {
      alert('No se pudo guardar: la imagen ocupa demasiado para el almacenamiento del navegador. Prueba con una imagen más pequeña.');
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      alert('Sube una imagen del certificado antes de guardar.');
      return;
    }
    const nuevo: CertItem = { ...formData, id: Date.now() };
    persist([...customCerts, nuevo]);
    setFormData({
      title: '',
      provider: '',
      description: '',
      image: '',
      year: String(new Date().getFullYear()),
      color: gradientOptions[0],
    });
    setShowForm(false);
  };

  const handleDelete = (id: number) => {
    persist(customCerts.filter((c) => c.id !== id));
  };

  const handleImageFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Redimensiona y comprime para no llenar el localStorage
        const maxW = 1200;
        const scale = Math.min(1, maxW / img.width);
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        setFormData((f) => ({ ...f, image: dataUrl }));
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  // Los del código + los añadidos desde el panel
  const allCertificates: CertItem[] = [...(certificates as CertItem[]), ...customCerts];

  return (
    <section id="certs" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-amber-400 font-semibold tracking-widest uppercase text-sm">
            Logros
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold mt-3 text-white">
            Mis{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Certificados
            </span>
          </h2>
          <p className="text-slate-400 mt-4 text-lg">
            Formación continua y certificaciones que respaldan mis habilidades
          </p>
        </div>

        {/* >>> BOTÓN AÑADIR (solo con modo edición activo) <<< */}
        {isAdminMode && !showForm && (
          <div className="flex justify-center -mt-6 mb-10">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-5 py-2.5 gradient-bg text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all"
            >
              <Plus size={18} />
              Añadir Certificado
            </button>
          </div>
        )}

        {/* Modal formulario */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowForm(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-lg rounded-2xl p-6 bg-slate-800 border border-slate-700 shadow-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Nuevo Certificado</h3>
                  <button onClick={() => setShowForm(false)} className="p-2 rounded-lg hover:bg-slate-700">
                    <X size={20} className="text-gray-400" />
                  </button>
                </div>

                <form onSubmit={handleAdd} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Título *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border bg-slate-900 border-slate-600 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="Ej: Curso de Docker desde Cero"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Proveedor *</label>
                    <input
                      type="text"
                      required
                      value={formData.provider}
                      onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border bg-slate-900 border-slate-600 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
                      placeholder="Ej: Udemy, Platzi, IUNAV, BIG School"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Descripción *</label>
                    <textarea
                      required
                      rows={3}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border bg-slate-900 border-slate-600 text-white outline-none focus:ring-2 focus:ring-indigo-500/50 resize-none"
                      placeholder="De qué trata el curso o certificación..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-300">Imagen *</label>
                    <input
                      type="file"
                      id="cert-image"
                      accept="image/png,image/jpeg,image/webp"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageFile(file);
                      }}
                    />
                    <label
                      htmlFor="cert-image"
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl border border-dashed border-slate-600 bg-slate-900/60 text-gray-300 cursor-pointer hover:border-indigo-500 hover:text-indigo-400 transition-colors"
                    >
                      <Upload size={18} />
                      {formData.image ? 'Cambiar imagen' : 'Seleccionar imagen del certificado'}
                    </label>
                    {formData.image && (
                      <div className="mt-3 flex items-center gap-3">
                        <img
                          src={formData.image}
                          alt="Vista previa"
                          className="w-24 h-16 object-cover rounded-lg border border-slate-600"
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, image: '' })}
                          className="text-xs text-red-400 hover:text-red-300"
                        >
                          Quitar imagen
                        </button>
                      </div>
                    )}
                    <p className="text-xs mt-1 text-gray-500">
                      💡 La imagen se comprime automáticamente y se guarda en tu navegador.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-gray-300">Año</label>
                      <input
                        type="text"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border bg-slate-900 border-slate-600 text-white outline-none focus:ring-2 focus:ring-indigo-500/50"
                        placeholder="2026"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">Color</label>
                      <div className="flex flex-wrap gap-2">
                        {gradientOptions.map((g) => (
                          <button
                            key={g}
                            type="button"
                            onClick={() => setFormData({ ...formData, color: g })}
                            className={`w-8 h-8 rounded-lg bg-gradient-to-br ${g} transition-all ${
                              formData.color === g ? 'scale-110 ring-2 ring-white shadow-lg' : ''
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button type="submit" className="flex-1 py-2.5 gradient-bg text-white font-medium rounded-xl shadow-lg">
                      Añadir Certificado
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="px-5 py-2.5 rounded-xl font-medium bg-slate-700 text-gray-300"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid de certificados */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allCertificates.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -8 }}
              onClick={() => setSelected(cert)}
              className="group relative rounded-2xl overflow-hidden bg-slate-800/60 border border-slate-700/60 cursor-pointer shadow-lg"
            >
              {/* Eliminar (solo certificados añadidos desde el panel) */}
              {isAdminMode && customCerts.some((c) => c.id === cert.id) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(cert.id);
                  }}
                  className="absolute top-4 right-4 z-20 p-2 rounded-lg bg-red-500/90 text-white hover:bg-red-600 transition-colors shadow-lg"
                >
                  <Trash2 size={14} />
                </button>
              )}

              {/* Franja de color superior */}
              <div className={`h-2 bg-gradient-to-r ${cert.color}`} />

              {/* >>> AQUÍ SE MUESTRA LA IMAGEN REAL DEL CERTIFICADO <<< */}
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={cert.image}
                  alt={cert.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-sm font-semibold bg-white/10 backdrop-blur px-4 py-2 rounded-full border border-white/20">
                    Ver certificado
                  </span>
                </div>
              </div>

              {/* Información */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{cert.title}</h3>
                <p className="text-indigo-400 text-sm font-medium mt-1">{cert.provider}</p>
                <p className="text-slate-400 text-sm mt-3 leading-relaxed">{cert.description}</p>
                <div className="flex items-center gap-2 mt-4 text-slate-500 text-sm">
                  <CalendarDays size={16} />
                  <span>{cert.year}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal para ver el certificado en grande al hacer clic */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          onClick={() => setSelected(null)}
        >
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute -top-12 right-0 text-white bg-white/10 hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-xl shadow-2xl"
            />
            <p className="text-center text-white mt-4 font-semibold">
              {selected.title} — {selected.provider}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

// Export adicional por si tu App.tsx lo importa como named export
export { Certificates };