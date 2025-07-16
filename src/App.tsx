import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Branches from "./pages/Branches";
import Courses from "./pages/Courses";
import Layout from './components/Layout';
import About from "./pages/About";
import Notice from "./pages/Notice";
// import FacebookPosts from "./pages/FacebookPosts";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/features" element={<About />} />
            <Route path="/notice" element={<Notice />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/courses" element={<Courses />} />
            {/* <Route path="/facebook-posts" element={<FacebookPosts />} /> */}
          </Routes>
        </Layout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
