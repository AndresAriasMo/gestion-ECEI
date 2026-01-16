import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, User } from "lucide-react";

export default function TicketsPage() {
  const tickets = [
    { id: "TK-102", subject: "Duda sobre ARL", status: "Abierto", date: "Hoy" },
    { id: "TK-098", subject: "Cambio de empresa", status: "Cerrado", date: "Ayer" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Solicitudes y Soporte</h1>
          <p className="text-muted-foreground">Módulo de comunicación directa con coordinación.</p>
        </div>
        <Button>Nueva Solicitud</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold px-1">Mis Tickets</h3>
          {tickets.map((t) => (
            <Card key={t.id} className="cursor-pointer hover:border-primary transition-colors">
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-mono text-muted-foreground">{t.id}</span>
                  <Badge variant={t.status === "Abierto" ? "default" : "secondary"}>
                    {t.status}
                  </Badge>
                </div>
                <h4 className="font-medium">{t.subject}</h4>
                <p className="text-xs text-muted-foreground mt-1">Última actividad: {t.date}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="lg:col-span-2 flex flex-col h-[600px]">
          <CardHeader className="border-b">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Duda sobre ARL</CardTitle>
                <p className="text-xs text-muted-foreground">Conversación con Coordinación</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
            <div className="flex flex-col items-start">
              <div className="bg-muted p-3 rounded-lg rounded-tl-none max-w-[80%]">
                <p className="text-sm">Hola, tengo una duda sobre el documento de la ARL que debo subir. ¿Sirve el certificado de la empresa o debe ser el institucional?</p>
                <span className="text-[10px] text-muted-foreground mt-1 block">10:45 AM</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-primary text-primary-foreground p-3 rounded-lg rounded-tr-none max-w-[80%] shadow-sm">
                <p className="text-sm">Debe ser el certificado institucional que te enviamos al correo. Si no lo tienes, puedes solicitarlo por aquí mismo.</p>
                <span className="text-[10px] opacity-70 mt-1 block">11:02 AM</span>
              </div>
            </div>
          </CardContent>
          <div className="p-4 border-t bg-muted/10">
            <div className="flex gap-2">
              <Input placeholder="Escribe tu mensaje..." className="bg-background" />
              <Button size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
