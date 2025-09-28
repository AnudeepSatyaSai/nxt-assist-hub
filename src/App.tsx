import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import AIAssistant from "./pages/AIAssistant";
import Announcements from "./pages/Announcements";
import Tickets from "./pages/Tickets";
import ProfileCompletion from "./pages/ProfileCompletion";
import HostelManagement from "./pages/HostelManagement";
import MessManagement from "./pages/MessManagement";
import FacilityBooking from "./pages/FacilityBooking";
import Layout from "./components/Layout";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/complete-profile" element={<ProfileCompletion />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/hostel" element={<HostelManagement />} />
              <Route path="/mess" element={<MessManagement />} />
              <Route path="/facilities" element={<FacilityBooking />} />
              <Route path="/ai-assistant" element={<AIAssistant />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/tickets" element={<Tickets />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
