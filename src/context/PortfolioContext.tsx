import { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { projects as defaultProjects, Project } from "../data/projects";

export type { Project } from "../data/projects";

export interface Certificate {
  id: number;
  title: string;
  institution: string;
  date: string;
  description: string;
  credentialUrl?: string;
  gradient: string;
  icon: string;
}

export interface Repo {
  id: number;
  name: string;
  description: string;
  url: string;
  language: string;
  stars: number;
  gradient: string;
}

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  bio: string;
  available: boolean;
}

interface PortfolioContextType {
  // Projects
  projects: Project[];
  addProject: (project: Omit<Project, "id">) => void;
  updateProject: (id: number, project: Partial<Project>) => void;
  deleteProject: (id: number) => void;

  // Certificates
  certificates: Certificate[];
  addCertificate: (cert: Omit<Certificate, "id">) => void;
  updateCertificate: (id: number, cert: Partial<Certificate>) => void;
  deleteCertificate: (id: number) => void;

  // Repos
  repos: Repo[];
  addRepo: (repo: Omit<Repo, "id">) => void;
  updateRepo: (id: number, repo: Partial<Repo>) => void;
  deleteRepo: (id: number) => void;

  // Personal Info
  personalInfo: PersonalInfo;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;

  // Admin
  isAdminMode: boolean;
  toggleAdminMode: () => void;
}

const defaultCertificates: Certificate[] = [
  {
    id: 1,
    title: "JavaScript Avanzado",
    institution: "Platzi",
    date: "2024",
    description: "Curso avanzado de JavaScript ES6+, asincronismo y patrones de diseño.",
    credentialUrl: "#",
    gradient: "from-yellow-400 to-amber-500",
    icon: "📘",
  },
  {
    id: 2,
    title: "React.js Profesional",
    institution: "Udemy",
    date: "2024",
    description: "Desarrollo frontend con React, hooks, context y Redux.",
    credentialUrl: "#",
    gradient: "from-cyan-400 to-blue-500",
    icon: "⚛️",
  },
  {
    id: 3,
    title: "Node.js y Express",
    institution: "Coursera",
    date: "2024",
    description: "Backend con Node.js, Express, APIs REST y autenticación.",
    credentialUrl: "#",
    gradient: "from-green-400 to-emerald-500",
    icon: "🟢",
  },
];

const defaultRepos: Repo[] = [
  {
    id: 1,
    name: "ai-desktop-assistant",
    description: "Asistente de escritorio con IA local usando Ollama",
    url: "https://github.com/oDISEo-cpu",
    language: "Python",
    stars: 12,
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    id: 2,
    name: "psychology-management",
    description: "Sistema de gestión para consultorio psicológico",
    url: "https://github.com/oDISEo-cpu",
    language: "JavaScript",
    stars: 8,
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    id: 3,
    name: "servicios-gf",
    description: "Plataforma web de servicios profesionales",
    url: "https://github.com/oDISEo-cpu",
    language: "TypeScript",
    stars: 5,
    gradient: "from-violet-500 to-pink-500",
  },
];

const defaultPersonalInfo: PersonalInfo = {
  name: "Diego Molina",
  title: "Desarrollador Full Stack",
  location: "Caracas, Venezuela",
  email: "dm30525331@gmail.com",
  phone: "+58 412 7610660",
  github: "https://github.com/oDISEo-cpu",
  linkedin: "https://linkedin.com/in/diego-alexander-molina-caro-a82757368",
  bio: "Desarrollador Full Stack con experiencia en aplicaciones web, APIs REST, automatizaciones y software personalizado. Especializado en JavaScript, TypeScript, React, Node.js, Express.js y bases de datos SQL.",
  available: true,
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [projects, setProjects] = useLocalStorage<Project[]>("portfolio_projects", defaultProjects);
  const [certificates, setCertificates] = useLocalStorage<Certificate[]>("portfolio_certificates", defaultCertificates);
  const [repos, setRepos] = useLocalStorage<Repo[]>("portfolio_repos", defaultRepos);
  const [personalInfo, setPersonalInfo] = useLocalStorage<PersonalInfo>("portfolio_info", defaultPersonalInfo);
  const [isAdminMode, setIsAdminMode] = useLocalStorage<boolean>("portfolio_admin", false);

  const addProject = (project: Omit<Project, "id">) => {
    const newId = projects.length > 0 ? Math.max(...projects.map((p) => p.id)) + 1 : 1;
    setProjects([...projects, { ...project, id: newId }]);
  };

  const updateProject = (id: number, updates: Partial<Project>) => {
    setProjects(projects.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProject = (id: number) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const addCertificate = (cert: Omit<Certificate, "id">) => {
    const newId = certificates.length > 0 ? Math.max(...certificates.map((c) => c.id)) + 1 : 1;
    setCertificates([...certificates, { ...cert, id: newId }]);
  };

  const updateCertificate = (id: number, updates: Partial<Certificate>) => {
    setCertificates(certificates.map((c) => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCertificate = (id: number) => {
    setCertificates(certificates.filter((c) => c.id !== id));
  };

  const addRepo = (repo: Omit<Repo, "id">) => {
    const newId = repos.length > 0 ? Math.max(...repos.map((r) => r.id)) + 1 : 1;
    setRepos([...repos, { ...repo, id: newId }]);
  };

  const updateRepo = (id: number, updates: Partial<Repo>) => {
    setRepos(repos.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const deleteRepo = (id: number) => {
    setRepos(repos.filter((r) => r.id !== id));
  };

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfo({ ...personalInfo, ...info });
  };

  const toggleAdminMode = () => setIsAdminMode(!isAdminMode);

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        certificates,
        addCertificate,
        updateCertificate,
        deleteCertificate,
        repos,
        addRepo,
        updateRepo,
        deleteRepo,
        personalInfo,
        updatePersonalInfo,
        isAdminMode,
        toggleAdminMode,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
