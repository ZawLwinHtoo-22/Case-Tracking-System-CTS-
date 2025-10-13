import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Tracking from "./pages/Tracking";
import Login from "./pages/Login";
import ReceiveNoti from "./pages/ReceiveNoti";
import Setup from "./pages/Setup";
import Profile from "./pages/Profile";
import NewProposal from "./pages/NewProposal";
import Notification from "./pages/Notification";
import NotFound from "./pages/NotFound";
import AppRouter from "./AppRouter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
           <Route path="/login" element={<Login />} />
          <Route path="/Dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/tracking" element={<Layout><Tracking /></Layout>} />
          <Route path="/ReceiveNoti" element={<Layout><ReceiveNoti /></Layout>} />
          <Route path="/tracking/motor/new" element={<Layout><NewProposal /></Layout>} />
          <Route path="/tracking/motor/notify/:proposalId" element={<Layout><Notification /></Layout>} />
          <Route path="/setup" element={<Layout><Setup /></Layout>} />
          <Route path="/profile" element={<Layout><Profile /></Layout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
