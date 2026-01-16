import { useAuth } from "@/hooks/use-auth";
import { useStore } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, MapPin, DollarSign, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function VacanciesPage() {
  const { user } = useAuth();
  const vacancies = useStore(state => state.vacancies);
  const applyToVacancy = useStore(state => state.applyToVacancy);
  const { toast } = useToast();

  const handleApply = (id: string) => {
    if (!user) return;
    applyToVacancy(id, user.id);
    toast({
      title: "Postulación Exitosa",
      description: "Tu hoja de vida ha sido enviada a la empresa.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-4 md:items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Vacantes Disponibles</h1>
          <p className="text-muted-foreground">Encuentra tu práctica ideal en empresas con convenio.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Buscar por cargo, empresa..." className="pl-9" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vacancies.map((vacancy) => {
          const isApplied = vacancy.applicants.includes(user?.id || "");
          
          return (
            <Card key={vacancy.id} className="flex flex-col group hover:shadow-lg transition-all duration-300 border-muted-foreground/10 hover:border-primary/50">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <Badge variant="secondary" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                    {vacancy.programs[0]}
                  </Badge>
                  <span className="text-xs text-muted-foreground font-mono">
                    Hace 2d
                  </span>
                </div>
                <CardTitle className="text-xl group-hover:text-primary transition-colors">
                  {vacancy.title}
                </CardTitle>
                <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-1">
                  <Briefcase className="h-3 w-3" /> Tech Solutions Inc.
                </p>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {vacancy.description}
                </p>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 p-2 rounded">
                    <DollarSign className="h-4 w-4" />
                    <span className="text-xs font-medium">{vacancy.salary}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground bg-muted/50 p-2 rounded">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs font-medium">Remoto / Híbrido</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="pt-4 border-t bg-muted/5">
                <Button 
                  className="w-full" 
                  onClick={() => handleApply(vacancy.id)}
                  disabled={isApplied}
                  variant={isApplied ? "outline" : "default"}
                >
                  {isApplied ? "Postulado" : "Postularme con 1 Clic"}
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
