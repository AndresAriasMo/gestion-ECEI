import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Role = 
  | "student" 
  | "coordinator" 
  | "program_director" 
  | "dean" 
  | "compliance" 
  | "rectory" 
  | "company";

export interface User {
  id: string;
  name: string;
  role: Role;
  program?: string;
  companyName?: string;
  avatar?: string;
}

export interface Document {
  id: string;
  name: string;
  type: "cedula" | "hoja_vida" | "eps" | "arl" | "contrato" | "acta_inicio" | "carta_presentacion" | "otro";
  status: "pending" | "approved" | "rejected";
  url: string;
  feedback?: string;
  uploadedAt: string;
}

export interface StudentProcess {
  studentId: string;
  status: "registered" | "academic_validation" | "formalization" | "vacancy_selection" | "legalization" | "in_progress" | "finished";
  academicValidation: {
    status: "pending" | "approved" | "rejected" | "observations";
    feedback?: string;
    checkedBy?: string;
    date?: string;
  };
  documents: Document[];
  selectedVacancyId?: string;
  legalization: {
    companyName?: string;
    bossName?: string;
    startDate?: string;
    endDate?: string;
    modality?: string;
    status: "pending" | "approved" | "rejected";
    deadline?: string;
  };
  evaluations: {
    eval1: { status: "pending" | "completed"; score?: number; date?: string };
    eval2: { status: "pending" | "completed"; score?: number; date?: string };
    sustentation: { status: "pending" | "completed"; score?: number; date?: string };
    compliance: { status: "pending" | "completed"; score?: number; date?: string };
  };
  finalGrade?: number;
}

export interface Vacancy {
  id: string;
  companyId: string;
  title: string;
  description: string;
  programs: string[];
  salary: string;
  functions: string;
  requirements: string;
  deadline: string;
  applicants: string[]; // student IDs
  status: "active" | "closed";
}

export interface Company {
  id: string;
  name: string;
  hasAgreement: boolean;
  legalStatus: "pending" | "approved" | "rejected";
  legalFeedback?: string;
}

// MOCK DATA

export const MOCK_USERS: User[] = [
  { id: "s1", name: "Ana Martínez", role: "student", program: "Ingeniería de Sistemas", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330" },
  { id: "c1", name: "Carlos Ruiz", role: "coordinator", program: "Escuela de Ingeniería", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" },
  { id: "d1", name: "Dra. Elena Vo", role: "program_director", program: "Ingeniería de Sistemas", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2" },
  { id: "l1", name: "Abg. Juan Pérez", role: "compliance", avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a" },
  { id: "emp1", name: "Tech Solutions", role: "company", companyName: "Tech Solutions Inc.", avatar: "https://images.unsplash.com/photo-1554774853-719586f8c277" },
];

export const INITIAL_PROCESS: StudentProcess = {
  studentId: "s1",
  status: "formalization",
  academicValidation: {
    status: "approved",
    date: "2024-01-15",
    checkedBy: "d1"
  },
  documents: [
    { id: "doc1", name: "Cédula de Ciudadanía", type: "cedula", status: "approved", url: "#", uploadedAt: "2024-01-20" },
    { id: "doc2", name: "Hoja de Vida", type: "hoja_vida", status: "pending", url: "#", uploadedAt: "2024-01-22" },
    { id: "doc3", name: "Certificado EPS", type: "eps", status: "rejected", feedback: "El documento no es legible", url: "#", uploadedAt: "2024-01-21" }
  ],
  legalization: {
    status: "pending"
  },
  evaluations: {
    eval1: { status: "pending" },
    eval2: { status: "pending" },
    sustentation: { status: "pending" },
    compliance: { status: "pending" }
  }
};

export const MOCK_VACANCIES: Vacancy[] = [
  {
    id: "v1",
    companyId: "emp1",
    title: "Desarrollador Junior Fullstack",
    description: "Buscamos estudiantes apasionados por React y Node.js.",
    programs: ["Ingeniería de Sistemas", "Ingeniería de Software"],
    salary: "$1,500,000 COP",
    functions: "Desarrollo de módulos web, pruebas unitarias.",
    requirements: "Conocimientos en JS, HTML, CSS.",
    deadline: "2024-03-01",
    applicants: [],
    status: "active"
  },
  {
    id: "v2",
    companyId: "emp1",
    title: "Analista de Datos",
    description: "Apoyo en análisis de datos comerciales.",
    programs: ["Ingeniería Industrial", "Administración"],
    salary: "$1,300,000 COP",
    functions: "Limpieza de datos, reportes en Excel/PowerBI.",
    requirements: "Excel Avanzado.",
    deadline: "2024-02-28",
    applicants: [],
    status: "active"
  }
];

// ZUSTAND STORE FOR MOCK BACKEND

interface AppState {
  currentUser: User | null;
  users: User[];
  studentProcesses: Record<string, StudentProcess>;
  vacancies: Vacancy[];
  companies: Company[];
  
  login: (userId: string) => void;
  logout: () => void;
  updateProcess: (studentId: string, updates: Partial<StudentProcess>) => void;
  addDocument: (studentId: string, doc: Document) => void;
  updateDocumentStatus: (studentId: string, docId: string, status: Document['status'], feedback?: string) => void;
  applyToVacancy: (vacancyId: string, studentId: string) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentUser: MOCK_USERS[0], // Default logged in as student
      users: MOCK_USERS,
      studentProcesses: { "s1": INITIAL_PROCESS },
      vacancies: MOCK_VACANCIES,
      companies: [
        { id: "emp1", name: "Tech Solutions Inc.", hasAgreement: true, legalStatus: "approved" },
        { id: "emp2", name: "StartUp X", hasAgreement: false, legalStatus: "pending" }
      ],

      login: (userId) => {
        const user = get().users.find(u => u.id === userId);
        if (user) set({ currentUser: user });
      },
      logout: () => set({ currentUser: null }),
      
      updateProcess: (studentId, updates) => set(state => ({
        studentProcesses: {
          ...state.studentProcesses,
          [studentId]: { ...state.studentProcesses[studentId], ...updates }
        }
      })),

      addDocument: (studentId, doc) => set(state => {
        const process = state.studentProcesses[studentId] || INITIAL_PROCESS;
        return {
          studentProcesses: {
            ...state.studentProcesses,
            [studentId]: {
              ...process,
              documents: [...process.documents, doc]
            }
          }
        };
      }),

      updateDocumentStatus: (studentId, docId, status, feedback) => set(state => {
        const process = state.studentProcesses[studentId];
        if (!process) return state;
        
        const newDocs = process.documents.map(d => 
          d.id === docId ? { ...d, status, feedback } : d
        );

        return {
          studentProcesses: {
            ...state.studentProcesses,
            [studentId]: { ...process, documents: newDocs }
          }
        };
      }),

      applyToVacancy: (vacancyId, studentId) => set(state => ({
        vacancies: state.vacancies.map(v => 
          v.id === vacancyId 
            ? { ...v, applicants: [...v.applicants, studentId] } 
            : v
        ),
        studentProcesses: {
          ...state.studentProcesses,
          [studentId]: {
             ...state.studentProcesses[studentId],
             selectedVacancyId: vacancyId
          }
        }
      }))
    }),
    {
      name: 'ecei-practicas-storage',
    }
  )
);
