export interface Skill {
  name: string;
  level: number;
  category: string;
  icon: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  color: string;
  gradient: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    name: "Frontend",
    color: "blue",
    gradient: "from-blue-500 to-indigo-500",
    skills: [
      { name: "React", level: 90, category: "frontend", icon: "⚛️" },
      { name: "TypeScript", level: 85, category: "frontend", icon: "📘" },
      { name: "HTML5", level: 95, category: "frontend", icon: "🌐" },
      { name: "CSS3", level: 90, category: "frontend", icon: "🎨" },
      { name: "Responsive Design", level: 88, category: "frontend", icon: "📱" },
    ],
  },
  {
    id: "backend",
    name: "Backend",
    color: "purple",
    gradient: "from-purple-500 to-violet-500",
    skills: [
      { name: "Node.js", level: 88, category: "backend", icon: "🟢" },
      { name: "Express.js", level: 85, category: "backend", icon: "🚀" },
      { name: "REST APIs", level: 90, category: "backend", icon: "🔗" },
      { name: "PHP", level: 70, category: "backend", icon: "🐘" },
      { name: "JavaScript ES6+", level: 92, category: "backend", icon: "✨" },
    ],
  },
  {
    id: "databases",
    name: "Bases de Datos",
    color: "cyan",
    gradient: "from-cyan-500 to-teal-500",
    skills: [
      { name: "MySQL", level: 85, category: "databases", icon: "🐬" },
      { name: "PostgreSQL", level: 80, category: "databases", icon: "🐘" },
      { name: "SQL Server", level: 75, category: "databases", icon: "🗄️" },
      { name: "SQL", level: 88, category: "databases", icon: "📊" },
    ],
  },
  {
    id: "ai",
    name: "IA & Automatización",
    color: "emerald",
    gradient: "from-emerald-500 to-green-500",
    skills: [
      { name: "Ollama", level: 80, category: "ai", icon: "🤖" },
      { name: "Gemma", level: 75, category: "ai", icon: "💎" },
      { name: "Qwen", level: 75, category: "ai", icon: "🧠" },
      { name: "Python", level: 82, category: "ai", icon: "🐍" },
      { name: "LLMs Locales", level: 78, category: "ai", icon: "🏠" },
    ],
  },
  {
    id: "tools",
    name: "Herramientas",
    color: "orange",
    gradient: "from-orange-500 to-amber-500",
    skills: [
      { name: "Git", level: 88, category: "tools", icon: "🔀" },
      { name: "Docker", level: 70, category: "tools", icon: "🐳" },
      { name: "Linux", level: 82, category: "tools", icon: "🐧" },
      { name: "VS Code", level: 95, category: "tools", icon: "💻" },
      { name: "Cursor", level: 80, category: "tools", icon: "🎯" },
    ],
  },
];
