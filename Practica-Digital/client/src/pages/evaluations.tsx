import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Star, ClipboardCheck } from "lucide-react";

export default function EvaluationsPage() {
  const evals = [
    { title: "Evaluación de Desempeño 1", score: 85, status: "Completada", date: "15/02/2024" },
    { title: "Evaluación de Desempeño 2", score: 0, status: "Pendiente", date: "Pendiente" },
    { title: "Sustentación Final", score: 0, status: "Programada", date: "10/06/2024" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Evaluaciones y Calificaciones</h1>
        <p className="text-muted-foreground">Seguimiento de desempeño y rúbricas de calificación.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6">
            <p className="text-sm opacity-80">Nota Proyectada</p>
            <h3 className="text-4xl font-bold">4.2 / 5.0</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Ponderación Actual</p>
            <h3 className="text-4xl font-bold">35%</h3>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Estado Final</p>
            <h3 className="text-4xl font-bold text-green-600">En Curso</h3>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {evals.map((e, i) => (
          <Card key={i}>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                  <Star className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">{e.title}</h4>
                  <p className="text-sm text-muted-foreground">Fecha: {e.date}</p>
                </div>
              </div>
              <div className="text-right flex items-center gap-6">
                {e.score > 0 && (
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Calificación</p>
                    <Badge className="text-lg px-3">{e.score}/100</Badge>
                  </div>
                )}
                <Badge variant={e.status === "Completada" ? "default" : "outline"}>
                  {e.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
