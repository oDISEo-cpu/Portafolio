// src/data/certificates.ts

// Importa las imágenes con los nombres CORRECTOS
import javascriptAvanzado from '../assets/certificates/javascript-avanzado.png';
import hackingEtico from '../assets/certificates/hacking-etico.png';
import iaIniciacion from '../assets/certificates/ia-iniciacion.png';
import iaDesarrollo from '../assets/certificates/ia-desarrollo.png';
import seoIaGoogle from '../assets/certificates/seo-ia-google.png';
import ingenieriaDatos from '../assets/certificates/ingenieria-datos.png';
import mediosAudiovisuales from '../assets/certificates/medios-audiovisuales.png';
import pruebasWeb from '../assets/certificates/pruebas-web.png';

export const certificates = [
  {
    id: 1,
    title: "Hacking Ético: Protege y Penetra Redes",
    provider: "Udemy",
    description: "Fundamentos de seguridad ofensiva y defensiva: identificación de vulnerabilidades, pruebas de penetración controladas y estrategias para proteger redes locales.",
    image: javascriptAvanzado,
    year: "2026",
    color: "from-orange-400 to-yellow-400"
  },
 
  {
    id: 4,
    title: "Hacking Ético: Malware, Virus y Troyanos",
    provider: "Udemy",
    description: "Análisis del funcionamiento de malware, virus y troyanos: cómo se propagan, cómo se detectan y cómo defender sistemas frente a estas amenazas.",
    image: hackingEtico,
    year: "2025",
    color: "from-red-400 to-pink-400"
  },
  {
    id: 5,
    title: "Iniciación a la Inteligencia Artificial",
    provider: "BIG School",
    description: "Fundamentos de IA generativa y su aplicación práctica: uso de asistentes como ChatGPT para automatización de tareas, generación de contenido y optimización de procesos.",
    image: iaIniciacion,
    year: "2026",
    color: "from-purple-400 to-indigo-400"
  },
  {
    id: 6,
    title: "Desarrollo con IA: de 0 a Producción",
    provider: "BIG School",
    description: "Jornadas formativas sobre construcción de aplicaciones con inteligencia artificial: del prototipo al despliegue en producción, integrando modelos de lenguaje y herramientas de IA en soluciones reales.",
    image: iaDesarrollo,
    year: "2026",
    color: "from-indigo-400 to-blue-400"
  },
  {
    id: 7,
    title: "SEO para IA y Google",
    provider: "BIGSEO",
    description: "Estrategias de posicionamiento en la era de la IA: generación de tráfico cualificado, visibilidad en motores de búsqueda y optimización de contenido para asistentes inteligentes.",
    image: seoIaGoogle,
    year: "2026",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 8,
    title: "Ingeniería de Datos",
    provider: "IUNAV",
    description: "Conceptos básicos y herramientas de la ingeniería de datos: pipelines, almacenamiento y procesamiento de grandes volúmenes de información para análisis y toma de decisiones.",
    image: ingenieriaDatos,
    year: "2025",
    color: "from-green-400 to-emerald-400"
  },
  {
    id: 9,
    title: "Medios Audiovisuales — Nivel I",
    provider: "IUNAV",
    description: "Producción de contenido audiovisual: fundamentos de fotografía, video y sonido para la creación de materiales multimedia de alta calidad.",
    image: mediosAudiovisuales,
    year: "2025",
    color: "from-cyan-400 to-blue-400"
  },
  {
    id: 10,
    title: "Pruebas en Aplicaciones Web",
    provider: "IUNAV",
    description: "Estrategias y herramientas de aseguramiento de calidad: diseño y ejecución de pruebas funcionales, de rendimiento y de seguridad en aplicaciones web.",
    image: pruebasWeb,
    year: "2025",
    color: "from-yellow-400 to-orange-400"
  }
];