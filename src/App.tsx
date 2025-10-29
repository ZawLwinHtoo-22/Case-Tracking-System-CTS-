import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import ReceiveNoti from "./pages/ReceiveNoti";
import Setup from "./pages/Setup";
import OrganizationSetup from "./pages/OrganizationSetup";
import CategorySetup from "./pages/CategorySetup";
import AgentMappingSetup from "./pages/AgentMappingSetup";
import Profile from "./pages/Profile";
import NewProposal from "./pages/NewProposal";
import Notification from "./pages/Notification";
import NotFound from "./pages/NotFound";
import AppRouter from "./AppRouter";
import DepartmentSetup from "./pages/DepartmentSetup";
import UserSetup from "./pages/UserSetup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/tracking" element={<Layout><Tracking /></Layout>} />
          <Route path="/ReceiveNoti" element={<Layout><ReceiveNoti /></Layout>} />
          <Route path="/tracking/motor/new" element={<Layout><NewProposal /></Layout>} />
          <Route path="/tracking/motor/notify/:proposalId" element={<Layout><Notification /></Layout>} />
          <Route path="/setup" element={<Layout><Setup /></Layout>} />
          <Route path="/setup/organizations" element={<Layout><OrganizationSetup /></Layout>} />
          <Route path="/setup/categories" element={<Layout><CategorySetup /></Layout>} />
          <Route path="/setup/agent-mapping" element={<Layout><AgentMappingSetup /></Layout>} />
          <Route path="/setup/departments" element={<Layout><DepartmentSetup /></Layout>} />
          <Route path="/setup/users" element={<Layout><UserSetup /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
