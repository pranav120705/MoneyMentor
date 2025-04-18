
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout and Pages
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import Literacy from "./pages/Literacy";
import Recommendations from "./pages/Recommendations"; // updated to use localStorage data
import Insights from "./pages/Insights";
import Profile from "./pages/Profile"; // updated to store preferences
import NotFound from "./pages/NotFound";
import Predictions from "./pages/Predictions"; // updated to use localStorage data

// Initialize React Query client
const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <TooltipProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Index />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="literacy" element={<Literacy />} />
            <Route path="recommendations" element={<Recommendations />} />
            <Route path="insights" element={<Insights />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
            <Route path="predictions" element={<Predictions />} />
          </Route>
        </Routes>

        {/* Notifications */}
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
