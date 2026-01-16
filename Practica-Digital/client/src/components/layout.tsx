import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useStore, MOCK_USERS } from "@/lib/mockData";
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  CheckCircle, 
  Users, 
  LogOut, 
  Menu,
  GraduationCap,
  Building2,
  Calendar,
  MessageSquare
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { user, logout, login } = useAuth();
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Role Simulator (Dev only)
  const switchRole = (role: string) => {
    const u = MOCK_USERS.find(u => u.role === role);
    if (u) login(u.id);
  };

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/", roles: ["all"] },
    { label: "Mis Documentos", icon: FileText, href: "/documents", roles: ["student"] },
    { label: "Vacantes", icon: Briefcase, href: "/vacancies", roles: ["student", "company"] },
    { label: "Validación Académica", icon: CheckCircle, href: "/validation", roles: ["program_director", "coordinator"] },
    { label: "Gestión Documental", icon: FileText, href: "/review-docs", roles: ["coordinator", "compliance"] },
    { label: "Empresas", icon: Building2, href: "/companies", roles: ["coordinator", "compliance", "student"] },
    { label: "Evaluaciones", icon: GraduationCap, href: "/evaluations", roles: ["student", "company", "coordinator"] },
    { label: "Calendario", icon: Calendar, href: "/calendar", roles: ["all"] },
    { label: "Solicitudes", icon: MessageSquare, href: "/tickets", roles: ["student", "coordinator"] },
  ];

  const filteredNav = navItems.filter(item => 
    item.roles.includes("all") || (user && item.roles.includes(user.role))
  );

  return (
    <div className="flex min-h-screen bg-muted/20">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 flex-col fixed h-full bg-sidebar border-r border-sidebar-border text-sidebar-foreground">
        <div className="p-6 border-b border-sidebar-border/50">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-heading font-bold text-lg tracking-tight">Gestión ECEI</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {filteredNav.map((item) => (
            <Link key={item.href} href={item.href}>
              <div 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer
                  ${location === item.href 
                    ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm" 
                    : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                  }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border/50 bg-sidebar-accent/10">
          <div className="flex items-center gap-3 mb-4">
            <Avatar className="h-9 w-9 border border-sidebar-border">
              <AvatarImage src={user?.avatar} />
              <AvatarFallback className="bg-primary/20 text-primary">{user?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">{user?.name}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
          </div>
          <Button variant="outline" size="sm" className="w-full justify-start text-sidebar-foreground border-sidebar-border hover:bg-sidebar-accent hover:text-sidebar-accent-foreground" onClick={() => logout()}>
            <LogOut className="mr-2 h-4 w-4" /> Cerrar Sesión
          </Button>
          
          {/* Quick Role Switcher for Demo */}
          <div className="mt-4 pt-4 border-t border-sidebar-border/30">
            <p className="text-[10px] uppercase font-bold text-sidebar-foreground/40 mb-2">Simular Rol</p>
            <div className="grid grid-cols-2 gap-1">
              {MOCK_USERS.map(u => (
                <button 
                  key={u.id}
                  onClick={() => login(u.id)}
                  className="text-[10px] text-left px-2 py-1 rounded hover:bg-sidebar-accent/50 text-sidebar-foreground/70"
                >
                  {u.role.substring(0, 8)}..
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full z-50 bg-background border-b px-4 h-14 flex items-center justify-between">
        <span className="font-heading font-bold">Gestión ECEI</span>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 bg-sidebar text-sidebar-foreground border-r-sidebar-border">
             {/* Mobile Nav Content Same as Desktop */}
             <div className="p-6 border-b border-sidebar-border/50">
               <span className="font-heading font-bold text-lg">Gestión ECEI</span>
             </div>
             <nav className="flex-1 p-4 space-y-1">
              {filteredNav.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div 
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer
                      ${location === item.href 
                        ? "bg-sidebar-accent text-sidebar-accent-foreground" 
                        : "hover:bg-sidebar-accent/50 text-sidebar-foreground/70"
                      }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </div>
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content */}
      <main className="flex-1 md:ml-64 p-6 mt-14 md:mt-0 animate-in fade-in duration-500">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
