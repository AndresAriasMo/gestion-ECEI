import { useAuth } from "@/hooks/use-auth";
import { useStore, Document } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileCheck, 
  FileWarning, 
  FileText, // Added missing import
  Upload, 
  Eye, 
  Trash2,
  AlertCircle
} from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";

export default function DocumentsPage() {
  const { user } = useAuth();
  const process = useStore(state => state.studentProcesses["s1"]);
  const addDocument = useStore(state => state.addDocument);
  const updateDocumentStatus = useStore(state => state.updateDocumentStatus);
  const { toast } = useToast();
  
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedDocType, setSelectedDocType] = useState<Document["type"]>("hoja_vida");

  const handleUpload = () => {
    // Mock upload
    const newDoc: Document = {
      id: Math.random().toString(),
      name: `Documento ${selectedDocType}`,
      type: selectedDocType,
      status: "pending",
      url: "#",
      uploadedAt: new Date().toISOString()
    };
    addDocument("s1", newDoc);
    setIsUploadOpen(false);
    toast({
      title: "Documento cargado",
      description: "El documento ha sido enviado para revisión.",
    });
  };

  const docTypes: { value: Document["type"], label: string }[] = [
    { value: "cedula", label: "Cédula de Ciudadanía" },
    { value: "hoja_vida", label: "Hoja de Vida Institucional" },
    { value: "eps", label: "Certificado EPS" },
    { value: "arl", label: "Certificado ARL" },
  ];

  if (!user || !process) return null;

  const isCoordinator = user.role === "coordinator" || user.role === "compliance";

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-heading font-bold">Gestión Documental</h1>
          <p className="text-muted-foreground">
            {isCoordinator ? "Revisión de documentos de estudiantes." : "Carga los documentos requeridos para formalizar tu práctica."}
          </p>
        </div>
        {!isCoordinator && (
          <Dialog open={isUploadOpen} onOpenChange={setIsUploadOpen}>
            <DialogTrigger asChild>
              <Button>
                <Upload className="mr-2 h-4 w-4" /> Cargar Documento
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Cargar Documento</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label>Tipo de Documento</Label>
                  <select 
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    value={selectedDocType}
                    onChange={(e) => setSelectedDocType(e.target.value as any)}
                  >
                    {docTypes.map(t => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-2">
                  <Label>Archivo</Label>
                  <Input type="file" />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleUpload}>Subir Archivo</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Documentos {isCoordinator ? "de Ana Martínez" : "Cargados"}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {process.documents.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No hay documentos cargados aún.
              </div>
            )}
            
            {process.documents.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-muted/20 transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    doc.status === 'approved' ? 'bg-green-100 text-green-700' :
                    doc.status === 'rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {doc.status === 'approved' ? <FileCheck className="h-6 w-6" /> :
                     doc.status === 'rejected' ? <FileWarning className="h-6 w-6" /> :
                     <FileText className="h-6 w-6" />}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm">{doc.name}</h4>
                    <p className="text-xs text-muted-foreground">Subido el {new Date(doc.uploadedAt).toLocaleDateString()}</p>
                    
                    {doc.feedback && (
                      <div className="mt-2 flex items-start gap-2 text-xs text-destructive bg-destructive/5 p-2 rounded">
                        <AlertCircle className="h-3 w-3 mt-0.5" />
                        <span>{doc.feedback}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                   <Badge variant={
                     doc.status === 'approved' ? 'default' : 
                     doc.status === 'rejected' ? 'destructive' : 'secondary'
                   } className={doc.status === 'approved' ? 'bg-green-500 hover:bg-green-600' : ''}>
                     {doc.status === 'approved' ? 'Aprobado' : 
                      doc.status === 'rejected' ? 'Rechazado' : 'Pendiente'}
                   </Badge>
                   
                   <Button variant="ghost" size="icon">
                     <Eye className="h-4 w-4" />
                   </Button>

                   {isCoordinator && doc.status === 'pending' && (
                     <div className="flex gap-1 ml-2">
                        <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-green-600 border-green-200 hover:bg-green-50"
                          onClick={() => {
                            updateDocumentStatus("s1", doc.id, "approved");
                            toast({ title: "Documento Aprobado" });
                          }}
                        >
                          <FileCheck className="h-4 w-4" />
                        </Button>
                        <Dialog>
                          <DialogTrigger asChild>
                             <Button size="sm" variant="outline" className="h-8 w-8 p-0 text-red-600 border-red-200 hover:bg-red-50">
                              <FileWarning className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader><DialogTitle>Rechazar Documento</DialogTitle></DialogHeader>
                            <div className="py-4">
                              <Label>Motivo del rechazo</Label>
                              <Textarea placeholder="Ej: Documento borroso, falta firma..." id={`feedback-${doc.id}`} />
                            </div>
                            <DialogFooter>
                              <Button variant="destructive" onClick={() => {
                                const feedback = (document.getElementById(`feedback-${doc.id}`) as HTMLTextAreaElement).value;
                                updateDocumentStatus("s1", doc.id, "rejected", feedback);
                                toast({ title: "Documento Rechazado" });
                              }}>Confirmar Rechazo</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                     </div>
                   )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
