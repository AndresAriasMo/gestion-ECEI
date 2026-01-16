import { useAuth } from "@/hooks/use-auth";
import { useStore, MOCK_VACANCIES, StudentProcess } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Briefcase, 
  FileText,
  UserCheck,
  Building
} from "lucide-react";
import { Link } from "wouter";

export default function Dashboard() {
  const { user } = useAuth();
  const process = useStore(state => state.studentProcesses["s1"]); // Mock logic for current student

  if (!user) return <div>Cargando...</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Hola, {user.name.split(" ")[0]}</h1>
          <p className="text-muted-foreground">Bienvenido al Portal de Gestión de Prácticas ECEI.</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="px-3 py-1 text-sm bg-background">
            Periodo 2024-1
          </Badge>
          <Badge variant="default" className="px-3 py-1 text-sm bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
            {user.role.replace('_', ' ').toUpperCase()}
          </Badge>
        </div>
      </div>

      {user.role === "student" && <StudentDashboard process={process} />}
      {user.role === "coordinator" && <CoordinatorDashboard />}
      {user.role === "company" && <CompanyDashboard />}
      {user.role === "program_director" && <DirectorDashboard />}
    </div>
  );
}

function StudentDashboard({ process }: { process: StudentProcess }) {
  const steps = [
    { id: "registered", label: "Registro", status: "completed" },
    { id: "academic_validation", label: "Validación Académica", status: process.academicValidation.status },
    { id: "formalization", label: "Documentación", status: process.status === "formalization" ? "current" : (process.documents.every(d => d.status === "approved") ? "completed" : "pending") },
    { id: "vacancy_selection", label: "Aplicación", status: process.selectedVacancyId ? "completed" : "pending" },
    { id: "legalization", label: "Legalización", status: process.legalization.status },
    { id: "evaluation", label: "Evaluación", status: "pending" },
  ];

  const getStepIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "current": return <Clock className="h-5 w-5 text-primary" />;
      case "rejected": return <AlertCircle className="h-5 w-5 text-destructive" />;
      default: return <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Progress Card */}
      <Card className="lg:col-span-2 border-l-4 border-l-primary shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-xl">Tu Proceso de Práctica</CardTitle>
          <CardDescription>Sigue el estado de tu solicitud paso a paso.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6 relative before:absolute before:inset-y-2 before:left-[19px] before:w-0.5 before:bg-muted-foreground/20">
            {steps.map((step) => (
              <div key={step.id} className="relative flex items-center gap-4 bg-card z-10">
                <div className={`h-10 w-10 rounded-full border-2 flex items-center justify-center shrink-0 
                  ${step.status === 'completed' ? 'bg-green-50 border-green-500' : 
                    step.status === 'current' ? 'bg-primary/10 border-primary' : 
                    step.status === 'rejected' ? 'bg-destructive/10 border-destructive' : 'bg-background border-muted-foreground/30'}`}>
                  {getStepIcon(step.status)}
                </div>
                <div className="flex-1">
                  <h4 className={`text-sm font-semibold ${step.status === 'current' ? 'text-primary' : ''}`}>{step.label}</h4>
                  {step.status === 'current' && <p className="text-xs text-muted-foreground mt-0.5">Acción requerida</p>}
                </div>
                {step.status === 'current' && (
                  <Button size="sm" variant="outline" asChild>
                    <Link href="/documents">Continuar</Link>
                  </Button>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats / Actions */}
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base font-medium flex items-center gap-2">
              <FileText className="h-4 w-4 text-primary" />
              Estado Documental
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-muted-foreground">Progreso</span>
              <span className="text-sm font-bold">33%</span>
            </div>
            <Progress value={33} className="h-2" />
            <div className="mt-4 flex gap-2">
               <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">1 Aprobado</Badge>
               <Badge variant="secondary" className="bg-red-100 text-red-700 hover:bg-red-100">1 Rechazado</Badge>
            </div>
            <Button className="w-full mt-4" variant="outline" asChild>
              <Link href="/documents">Gestionar Documentos</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
             <CardTitle className="text-base font-medium flex items-center gap-2">
              <Briefcase className="h-4 w-4 text-primary" />
              Vacantes Recientes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
             {MOCK_VACANCIES.slice(0, 2).map(v => (
               <div key={v.id} className="p-3 bg-muted/50 rounded-lg text-sm group cursor-pointer hover:bg-muted transition-colors">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{v.title}</p>
                  <p className="text-muted-foreground text-xs mt-1 truncate">{v.description}</p>
               </div>
             ))}
             <Button variant="ghost" size="sm" className="w-full text-primary hover:text-primary/80" asChild>
               <Link href="/vacancies">Ver todas</Link>
             </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function CoordinatorDashboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { title: "Por Validar", value: "12", icon: UserCheck, color: "text-blue-600 bg-blue-100" },
        { title: "Documentos Pendientes", value: "45", icon: FileText, color: "text-orange-600 bg-orange-100" },
        { title: "Empresas Nuevas", value: "3", icon: Building, color: "text-purple-600 bg-purple-100" },
        { title: "En Práctica", value: "128", icon: Briefcase, color: "text-green-600 bg-green-100" },
      ].map((stat, i) => (
        <Card key={i}>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="col-span-1 md:col-span-2 lg:col-span-3 mt-4">
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4 pb-4 border-b border-border/50">
               <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">AM</div>
               <div>
                 <p className="text-sm font-medium">Ana Martínez subió documento "Hoja de Vida"</p>
                 <p className="text-xs text-muted-foreground">Hace 10 minutos</p>
               </div>
               <Button variant="outline" size="sm" className="ml-auto">Revisar</Button>
            </div>
             <div className="flex items-center gap-4 pb-4 border-b border-border/50">
               <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold">TS</div>
               <div>
                 <p className="text-sm font-medium">Tech Solutions publicó vacante "Dev Junior"</p>
                 <p className="text-xs text-muted-foreground">Hace 1 hora</p>
               </div>
               <Button variant="outline" size="sm" className="ml-auto">Ver</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function CompanyDashboard() {
  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mis Vacantes Activas</CardTitle>
        </CardHeader>
        <CardContent>
          {MOCK_VACANCIES.map(v => (
            <div key={v.id} className="flex items-center justify-between p-4 border rounded-lg mb-2 bg-card hover:bg-muted/30 transition-colors">
              <div>
                <h4 className="font-semibold">{v.title}</h4>
                <div className="flex gap-3 text-xs text-muted-foreground mt-1">
                   <span>{v.applicants.length} postulantes</span>
                   <span>Cierre: {v.deadline}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Editar</Button>
                <Button size="sm">Ver Postulantes</Button>
              </div>
            </div>
          ))}
          <Button className="w-full mt-4" variant="outline">
            + Publicar Nueva Vacante
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function DirectorDashboard() {
  return (
    <div className="grid gap-6">
       <Card>
         <CardHeader>
           <CardTitle>Validación de Requisitos Académicos</CardTitle>
           <CardDescription>Estudiantes pendientes de aprobación para iniciar prácticas.</CardDescription>
         </CardHeader>
         <CardContent>
            <div className="rounded-md border">
              <div className="p-4 bg-muted/30 font-medium text-sm grid grid-cols-4">
                <span className="col-span-2">Estudiante</span>
                <span>Programa</span>
                <span className="text-right">Acción</span>
              </div>
              <div className="divide-y">
                {[1,2,3].map(i => (
                  <div key={i} className="p-4 grid grid-cols-4 items-center">
                    <div className="col-span-2 flex items-center gap-3">
                       <div className="h-8 w-8 rounded-full bg-slate-200"></div>
                       <div>
                         <p className="font-medium text-sm">Estudiante Ejemplo {i}</p>
                         <p className="text-xs text-muted-foreground">ID: 102030{i}</p>
                       </div>
                    </div>
                    <span className="text-sm text-muted-foreground">Ing. Sistemas</span>
                    <div className="text-right">
                       <Button size="sm">Validar</Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
         </CardContent>
       </Card>
    </div>
  );
}
