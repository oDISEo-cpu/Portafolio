export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  category: string;
  features: string[];
  github?: string;
  live?: string;
  gradient: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Desktop Assistant",
    description: "Asistente de escritorio inteligente con procesamiento de lenguaje natural local. Integración de modelos Gemma y Qwen a través de Ollama para automatización de tareas sin dependencias externas.",
    tags: ["Python", "Ollama", "Gemma", "Qwen", "Prompt Engineering"],
    category: "ia",
    features: ["Procesamiento local de IA", "Automatización inteligente", "Sin dependencias externas", "Multi-modelo"],
    github: "https://github.com/oDISEo-cpu",
    gradient: "from-emerald-500 to-cyan-500",
  },
  {
    id: 2,
    title: "Sistema de Gestión de Psicología",
    description: "Aplicación web completa para gestión de consultorio psicológico. Permite administrar pacientes, citas, historiales clínicos y reportes con una interfaz intuitiva y segura.",
    tags: ["JavaScript", "Node.js", "Express.js", "MySQL", "HTML", "CSS"],
    category: "web",
    features: ["Gestión de pacientes", "Autenticación segura", "Base de datos relacional", "Reportes y estadísticas"],
    github: "https://github.com/oDISEo-cpu",
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    title: "ServiciosGF",
    description: "Plataforma web moderna para presentación de servicios profesionales. Diseño responsive con enfoque en rendimiento y experiencia de usuario optimizada.",
    tags: ["React", "Node.js", "HTML5", "CSS3", "Responsive"],
    category: "web",
    features: ["Diseño responsive", "Alto rendimiento", "UX intuitiva", "SEO optimizado"],
    github: "https://github.com/oDISEo-cpu",
    gradient: "from-violet-500 to-pink-500",
  },
];

export const categories = [
  { id: "all", label: "Todos" },
  { id: "web", label: "Web" },
  { id: "ia", label: "IA" },
  { id: "automatizacion", label: "Automatización" },
];
