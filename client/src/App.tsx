import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/layout";
import Dashboard from "@/pages/dashboard";
import DocumentsPage from "@/pages/documents";
import VacanciesPage from "@/pages/vacancies";
import CompaniesPage from "@/pages/companies";
import EvaluationsPage from "@/pages/evaluations";
import CalendarPage from "@/pages/calendar";
import TicketsPage from "@/pages/tickets";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/documents" component={DocumentsPage} />
        <Route path="/vacancies" component={VacanciesPage} />
        <Route path="/review-docs" component={DocumentsPage} />
        <Route path="/companies" component={CompaniesPage} />
        <Route path="/evaluations" component={EvaluationsPage} />
        <Route path="/calendar" component={CalendarPage} />
        <Route path="/tickets" component={TicketsPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
