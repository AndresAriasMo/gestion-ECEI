import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon, Clock, MapPin } from "lucide-react";

export default function CalendarPage() {
  const events = [
    { title: "Entrega de Primer Reporte", date: "20 de Febrero, 2024", time: "11:59 PM", type: "Entrega" },
    { title: "Visita de Seguimiento", date: "05 de Marzo, 2024", time: "02:00 PM", type: "Reunión" },
    { title: "Taller de Ética Profesional", date: "15 de Marzo, 2024", time: "08:00 AM", type: "Taller" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Calendario de Actividades</h1>
        <p className="text-muted-foreground">Fechas importantes y cronograma de prácticas.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Vista Mensual</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] flex items-center justify-center bg-muted/20 rounded-md border border-dashed">
            <p className="text-muted-foreground flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" /> Componente de Calendario Interactivo
            </p>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h3 className="font-semibold px-1">Próximos Eventos</h3>
          {events.map((event, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{event.type}</span>
                </div>
                <h4 className="font-medium mb-2">{event.title}</h4>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-3 w-3" /> {event.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" /> {event.time}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
