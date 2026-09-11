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
    title: "JavaScript Avanzado",
    provider: "Platzi",
    description: "Curso avanzado de JavaScript ES6+, asincronismo y patrones de diseño.",
    image: javascriptAvanzado,
    year: "2024",
    color: "from-orange-400 to-yellow-400"
  },
 
  {
    id: 4,
    title: "Hacking Ético",
    provider: "Udemy",
    description: "Aprende Hacking Ético: Protege y Penetra Redes",
    image: hackingEtico,
    year: "2024",
    color: "from-red-400 to-pink-400"
  },
  {
    id: 5,
    title: "Iniciación a la IA",
    provider: "BIG School",
    description: "Curso de iniciación al desarrollo con Inteligencia Artificial",
    image: iaIniciacion,
    year: "2024",
    color: "from-purple-400 to-indigo-400"
  },
  {
    id: 6,
    title: "Desarrollo con IA",
    provider: "BIG School",
    description: "Certificado de iniciación al desarrollo con IA",
    image: iaDesarrollo,
    year: "2024",
    color: "from-indigo-400 to-blue-400"
  },
  {
    id: 7,
    title: "SEO para IA y Google",
    provider: "BIGSEO",
    description: "Certificado de asistencia al curso de SEO para IA y Google",
    image: seoIaGoogle,
    year: "2024",
    color: "from-blue-400 to-cyan-400"
  },
  {
    id: 8,
    title: "Ingeniería de Datos",
    provider: "IUNAV",
    description: "Introducción a la Ingeniería de Datos - Conceptos Básicos y Herramientas",
    image: ingenieriaDatos,
    year: "2024",
    color: "from-green-400 to-emerald-400"
  },
  {
    id: 9,
    title: "Medios Audiovisuales",
    provider: "IUNAV",
    description: "Certificado en Medios Audiovisuales",
    image: mediosAudiovisuales,
    year: "2024",
    color: "from-cyan-400 to-blue-400"
  },
  {
    id: 10,
    title: "Pruebas en Aplicaciones Web",
    provider: "IUNAV",
    description: "Estrategias y Herramientas para Realizar Pruebas en Aplicaciones Web",
    image: pruebasWeb,
    year: "2024",
    color: "from-yellow-400 to-orange-400"
  }
];