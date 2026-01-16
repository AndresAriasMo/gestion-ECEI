import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, CheckCircle, Globe, ShieldCheck } from "lucide-react";

export default function CompaniesPage() {
  const companies = [
    { id: 1, name: "Tech Solutions Inc.", sector: "Tecnología", agreement: "Activo", status: "Validado" },
    { id: 2, name: "Global Finance", sector: "Finanzas", agreement: "En Proceso", status: "Pendiente" },
    { id: 3, name: "Eco Energy", sector: "Energía", agreement: "No Vigente", status: "Revisión Jurídica" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Directorio de Empresas</h1>
          <p className="text-muted-foreground">Gestión de convenios y perfiles empresariales.</p>
        </div>
        <Button>Registrar Empresa</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {companies.map((company) => (
          <Card key={company.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <CardTitle className="text-lg">{company.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{company.sector}</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Convenio:</span>
                <Badge variant={company.agreement === "Activo" ? "default" : "secondary"}>
                  {company.agreement}
                </Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground">Estado Legal:</span>
                <div className="flex items-center gap-1 text-primary font-medium">
                  <ShieldCheck className="h-4 w-4" />
                  {company.status}
                </div>
              </div>
              <Button variant="outline" className="w-full">Ver Detalles</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
